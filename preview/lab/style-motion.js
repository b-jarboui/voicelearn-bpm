// FILE: lab/style-motion.js
/*
 * VoiceLearn - Motion Explainer v2
 * OPER621 Business Process Management
 *
 * Flat geometric teaching animations.
 * Narration-synchronised, seekable and idempotent.
 *
 * Requires:
 *   window.LAB
 *   window.gsap 3.12.5
 *
 * No GSAP plugins or external assets.
 */
 
(() => {
  "use strict";
 
  const ID = "motion";
  const NAME = "Motion Explainer";
  const NOTE =
    "Understand concepts through kinetic typography, " +
    "animated comparisons and moving process flows.";
 
  const STYLE_ID = "vl-motion-v2";
  const NS = "http://www.w3.org/2000/svg";
 
  const G = () => window.gsap;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const finite = (v, fallback = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };
 
  function reduced() {
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
 
  function el(tag, cls = "", value = null) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (value !== null) n.textContent = String(value);
    return n;
  }
 
  function svgEl(tag, attrs = {}) {
    const n = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => {
      n.setAttribute(k, String(v));
    });
    return n;
  }
 
  function decorative(n) {
    n.setAttribute("aria-hidden", "true");
    return n;
  }
 
  const CSS = `
.vm-root {
  --vm-bg:#f4f8fb;
  --vm-surface:#ffffff;
  --vm-ink:#142c40;
  --vm-muted:#405669;
  --vm-teal:#08776f;
  --vm-coral:#b63e43;
  --vm-yellow:#ffd36c;
  --vm-blue:#1766a0;
  --vm-good:#176b4b;
  --vm-bad:#a63232;
  --vm-line:#bdced7;
  --vm-soft:#e7f3f4;
  --vm-warm:#fff0e8;
  --vm-bad-bg:#fff0ee;
  --vm-good-bg:#e7f5ed;
  --vm-on:#ffffff;
  position:relative;
  isolation:isolate;
  width:100%;
  height:100%;
  min-width:0;
  min-height:0;
  overflow:hidden;
  background:var(--vm-bg);
  color:var(--vm-ink);
  font-family:"Atkinson Hyperlegible",system-ui,sans-serif;
  line-height:1.45;
  container-type:size;
}
 
body .player .look.vm-root {
  background:var(--vm-bg) !important;
}
 
.vm-root,
.vm-root *,
.vm-root *::before,
.vm-root *::after {
  box-sizing:border-box;
}
 
.vm-root .vm-stage {
  position:absolute;
  inset:0;
  overflow:hidden;
}
 
.vm-root .vm-scene {
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:12px;
  overflow:hidden;
  visibility:hidden;
}
 
.vm-root .vm-scene.vm-active {
  visibility:visible;
}
 
.vm-root .vm-fit {
  position:relative;
  flex:none;
  width:100%;
  max-width:880px;
  transform-origin:center center;
}
 
.vm-root .vm-content {
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:18px;
  width:100%;
  min-width:0;
}
 
.vm-root .vm-moment {
  position:relative;
  min-width:0;
  overflow-wrap:anywhere;
}
 
.vm-root .vm-kicker {
  display:inline-block;
  align-self:flex-start;
  margin:0 0 9px;
  padding:5px 10px;
  border-radius:5px;
  background:var(--vm-teal);
  color:var(--vm-on);
  font-size:12px;
  font-weight:800;
  line-height:1.3;
  letter-spacing:.065em;
  text-transform:uppercase;
}
 
.vm-root h2,
.vm-root h3,
.vm-root p {
  margin:0;
}
 
.vm-root h2,
.vm-root h3 {
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-weight:800;
  letter-spacing:-.035em;
}
 
.vm-root h2 {
  font-size:clamp(29px,4.7cqw,53px);
  line-height:1.12;
  text-wrap:balance;
}
 
.vm-root h3 {
  font-size:clamp(23px,3.2cqw,37px);
  line-height:1.17;
}
 
.vm-root p {
  font-size:clamp(17px,2.1cqw,23px);
  line-height:1.48;
}
 
.vm-root .vm-reveal {
  min-width:0;
}
 
.vm-root .vm-hero {
  position:relative;
  display:grid;
  grid-template-columns:minmax(0,1fr) 180px;
  gap:24px;
  align-items:center;
  min-height:210px;
}
 
.vm-root .vm-hero-copy {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:12px;
  min-width:0;
}
 
.vm-root .vm-hero h2 {
  max-width:25ch;
}
 
.vm-root .vm-hero-art {
  position:relative;
  width:180px;
  height:180px;
}
 
.vm-root .vm-shape {
  position:absolute;
  display:block;
  transform-origin:center center;
}
 
.vm-root .vm-shape-a {
  width:118px;
  height:118px;
  left:22px;
  top:18px;
  border-radius:30px;
  background:var(--vm-teal);
  transform:rotate(-12deg);
}
 
.vm-root .vm-shape-b {
  width:75px;
  height:75px;
  right:0;
  bottom:13px;
  border-radius:50%;
  background:var(--vm-yellow);
}
 
.vm-root .vm-shape-c {
  width:42px;
  height:42px;
  left:0;
  bottom:21px;
  border-radius:12px;
  background:var(--vm-coral);
  transform:rotate(18deg);
}
 
.vm-root .vm-shape-d {
  width:70px;
  height:13px;
  left:61px;
  top:76px;
  border-radius:8px;
  background:var(--vm-surface);
  transform:rotate(-12deg);
}
 
.vm-root .vm-cover-note {
  color:var(--vm-muted);
  font-size:17px;
}
 
.vm-root .vm-title {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:12px;
  max-width:820px;
}
 
.vm-root .vm-title h2 {
  max-width:28ch;
}
 
.vm-root .vm-title-accent {
  display:block;
  width:min(100%,420px);
  height:11px;
  border-radius:6px;
  background:var(--vm-yellow);
  transform-origin:left center;
}
 
.vm-root .vm-key {
  position:relative;
  display:inline;
  z-index:0;
  color:#10212e;
  white-space:normal;
}
 
.vm-root .vm-key::before {
  content:"";
  position:absolute;
  z-index:-1;
  left:-.08em;
  right:-.08em;
  top:.1em;
  bottom:.03em;
  border-radius:.12em;
  background:var(--vm-yellow);
  transform-origin:left center;
}
 
.vm-root .vm-item {
  display:grid;
  grid-template-columns:104px minmax(0,1fr);
  gap:24px;
  align-items:center;
}
 
.vm-root .vm-icon-disc {
  display:grid;
  place-items:center;
  width:96px;
  height:96px;
  border-radius:50%;
  background:var(--vm-teal);
  color:var(--vm-on);
}
 
.vm-root .vm-icon-disc svg {
  display:block;
  width:49px;
  height:49px;
}
 
.vm-root .vm-item-body {
  display:flex;
  flex-direction:column;
  gap:11px;
  min-width:0;
}
 
.vm-root .vm-item-index {
  align-self:flex-start;
  padding:5px 11px;
  border-radius:30px;
  background:var(--vm-yellow);
  color:#493400;
  font-size:13px;
  font-weight:800;
}
 
.vm-root .vm-question {
  display:grid;
  grid-template-columns:88px minmax(0,1fr);
  gap:19px;
  align-items:center;
  max-width:850px;
}
 
.vm-root .vm-question-icon {
  display:grid;
  place-items:center;
  width:82px;
  height:82px;
  border-radius:22px;
  background:var(--vm-coral);
  color:var(--vm-on);
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-size:58px;
  font-weight:800;
  line-height:1;
}
 
.vm-root .vm-question h2 {
  max-width:27ch;
}
 
.vm-root .vm-statement {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:13px;
  max-width:820px;
}
 
.vm-root .vm-statement p {
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-size:clamp(25px,3.8cqw,43px);
  font-weight:800;
  line-height:1.25;
  letter-spacing:-.025em;
}
 
.vm-root .vm-statement-bar {
  width:min(100%,540px);
  height:12px;
  border-radius:7px;
  background:var(--vm-yellow);
  transform-origin:left center;
}
 
.vm-root .vm-formula {
  display:flex;
  flex-direction:column;
  gap:14px;
  max-width:760px;
}
 
.vm-root .vm-fraction {
  display:grid;
  grid-template-rows:auto 7px auto;
  gap:12px;
  width:100%;
  text-align:center;
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-size:clamp(24px,3.5cqw,40px);
  font-weight:800;
  line-height:1.28;
}
 
.vm-root .vm-fraction-rule {
  height:7px;
  border-radius:5px;
  background:var(--vm-teal);
  transform-origin:left center;
}
 
.vm-root .vm-issue-list {
  display:flex;
  flex-direction:column;
  gap:12px;
}
 
.vm-root .vm-issue {
  display:grid;
  grid-template-columns:46px minmax(0,1fr);
  gap:13px;
  align-items:start;
  padding:17px 19px;
  border-radius:14px;
  border-left:7px solid var(--vm-coral);
  background:var(--vm-bad-bg);
}
 
.vm-root .vm-issue-icon {
  display:grid;
  place-items:center;
  width:40px;
  height:40px;
  border-radius:12px;
  background:var(--vm-coral);
  color:var(--vm-on);
  font-size:25px;
  font-weight:800;
}
 
.vm-root .vm-issue-body {
  display:flex;
  flex-direction:column;
  gap:10px;
}
 
.vm-root .vm-effect {
  align-self:flex-start;
  padding:5px 10px;
  border-radius:6px;
  background:var(--vm-coral);
  color:var(--vm-on);
  font-size:14px;
  font-weight:800;
}
 
.vm-root .vm-pair {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:18px;
}
 
.vm-root .vm-compare {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:13px;
  min-width:0;
  padding:19px;
  border-radius:17px;
  background:var(--vm-soft);
  border-top:8px solid var(--vm-teal);
}
 
.vm-root .vm-compare[data-side="b"] {
  background:var(--vm-warm);
  border-top-color:var(--vm-coral);
}
 
.vm-root .vm-compare .vm-kicker {
  margin:0;
}
 
.vm-root .vm-compare[data-side="b"] .vm-kicker {
  background:var(--vm-coral);
}
 
.vm-root .vm-compare p {
  font-size:clamp(16px,1.9cqw,21px);
}
 
.vm-root .vm-direction {
  align-self:flex-start;
  display:grid;
  place-items:center;
  width:40px;
  height:40px;
  border-radius:50%;
  background:var(--vm-teal);
  color:var(--vm-on);
  font-size:26px;
  font-weight:800;
}
 
.vm-root .vm-compare[data-side="b"] .vm-direction {
  background:var(--vm-coral);
}
 
.vm-root .vm-diagram {
  display:flex;
  flex-direction:column;
  gap:12px;
  width:100%;
}
 
.vm-root .vm-diagram .vm-kicker {
  margin:0;
}
 
.vm-root .vm-diagram-frame {
  position:relative;
  width:100%;
  min-width:0;
  padding:14px;
  border:2px solid var(--vm-line);
  border-radius:16px;
  background:var(--vm-surface);
  color:var(--vm-ink);
}
 
.vm-root .vm-diagram-frame svg.dg {
  display:block;
  width:100%;
  height:auto;
  max-height:300px;
  margin:auto;
  overflow:visible;
}
 
.vm-root .vm-diagram-caption {
  color:var(--vm-muted);
  font-size:clamp(15px,1.7cqw,19px);
  line-height:1.45;
}
 
.vm-root svg.dg text {
  fill:var(--vm-ink);
}
 
.vm-root svg.dg text[fill="#10131a"] {
  fill:var(--vm-ink);
}
 
.vm-root svg.dg text[fill="#FFB84D"] {
  fill:var(--vm-teal);
  font-weight:800;
}
 
.vm-root svg.dg rect[fill="rgba(255,255,255,.10)"],
.vm-root svg.dg rect[fill="rgba(255,255,255,.08)"],
.vm-root svg.dg rect[fill="rgba(255,255,255,.06)"],
.vm-root svg.dg rect[fill="rgba(255,255,255,.04)"] {
  fill:var(--vm-soft);
}
 
.vm-root svg.dg rect[stroke="rgba(255,255,255,.55)"],
.vm-root svg.dg rect[stroke="rgba(255,255,255,.3)"],
.vm-root svg.dg rect[stroke="rgba(255,255,255,.25)"],
.vm-root svg.dg rect[stroke="rgba(255,255,255,.2)"] {
  stroke:var(--vm-teal);
}
 
.vm-root svg.dg path[stroke="rgba(255,255,255,.55)"] {
  stroke:var(--vm-teal);
}
 
.vm-root svg.dg path[fill="rgba(255,255,255,.55)"] {
  fill:var(--vm-teal);
}
 
.vm-root svg.dg [stroke="#FFB84D"] {
  stroke:#c27a00;
}
 
.vm-root svg.dg :not(text)[fill="#FFB84D"] {
  fill:var(--vm-yellow);
}
 
.vm-root svg.dg [stroke="#FF6B6B"] {
  stroke:var(--vm-bad);
}
 
.vm-root svg.dg [fill="#FF6B6B"] {
  fill:var(--vm-bad);
}
 
.vm-root svg.dg [stroke="#3DD68C"] {
  stroke:var(--vm-good);
}
 
.vm-root svg.dg [fill="#3DD68C"] {
  fill:var(--vm-good);
}
 
.vm-root .vm-token {
  pointer-events:none;
  fill:var(--vm-coral);
  stroke:var(--vm-surface);
  stroke-width:2;
}
 
.vm-root .vm-transition {
  position:absolute;
  z-index:20;
  left:0;
  right:0;
  top:48%;
  height:9px;
  pointer-events:none;
  background:var(--vm-teal);
  visibility:hidden;
}
 
.vm-root .vm-transition::after {
  content:"";
  position:absolute;
  right:0;
  top:0;
  width:22%;
  height:100%;
  background:var(--vm-yellow);
}
 
@container (max-width:500px) {
  .vm-root .vm-content {
    gap:14px;
  }
 
  .vm-root .vm-hero {
    grid-template-columns:minmax(0,1fr);
    gap:12px;
    min-height:0;
  }
 
  .vm-root .vm-hero-art {
    width:125px;
    height:125px;
    margin:auto;
    transform:scale(.8);
    transform-origin:center center;
  }
 
  .vm-root .vm-item {
    grid-template-columns:62px minmax(0,1fr);
    gap:12px;
  }
 
  .vm-root .vm-icon-disc {
    width:60px;
    height:60px;
  }
 
  .vm-root .vm-icon-disc svg {
    width:32px;
    height:32px;
  }
 
  .vm-root .vm-question {
    grid-template-columns:52px minmax(0,1fr);
    gap:12px;
  }
 
  .vm-root .vm-question-icon {
    width:50px;
    height:50px;
    border-radius:13px;
    font-size:37px;
  }
 
  .vm-root .vm-pair {
    grid-template-columns:1fr;
    gap:11px;
  }
 
  .vm-root .vm-compare {
    padding:12px 14px;
    gap:8px;
  }
 
  .vm-root .vm-issue {
    padding:12px;
  }
 
  .vm-root .vm-diagram-frame {
    padding:7px;
  }
}
 
@container (max-height:380px) {
  .vm-root .vm-content {
    gap:9px;
  }
 
  .vm-root .vm-hero {
    grid-template-columns:minmax(0,1fr) 115px;
    gap:12px;
    min-height:0;
  }
 
  .vm-root .vm-hero-art {
    width:115px;
    height:115px;
    transform:scale(.7);
    transform-origin:center center;
  }
 
  .vm-root .vm-diagram {
    gap:6px;
  }
 
  .vm-root .vm-diagram-frame {
    padding:6px;
  }
 
  .vm-root .vm-diagram-frame svg.dg {
    max-height:50cqh;
  }
 
  .vm-root .vm-kicker {
    margin-bottom:4px;
  }
}
 
:root[data-theme="dark"] .vm-root {
  --vm-bg:#10212e;
  --vm-surface:#1a3040;
  --vm-ink:#f3f8fb;
  --vm-muted:#d0e0e9;
  --vm-teal:#19a99e;
  --vm-coral:#f17478;
  --vm-yellow:#ffd36c;
  --vm-blue:#8acbff;
  --vm-good:#85e3b2;
  --vm-bad:#ff9c9c;
  --vm-line:#425a69;
  --vm-soft:#233f49;
  --vm-warm:#453333;
  --vm-bad-bg:#432b36;
  --vm-good-bg:#24463d;
  --vm-on:#10212e;
}
 
@media (prefers-color-scheme:dark) {
  :root:not([data-theme="light"]) .vm-root {
    --vm-bg:#10212e;
    --vm-surface:#1a3040;
    --vm-ink:#f3f8fb;
    --vm-muted:#d0e0e9;
    --vm-teal:#19a99e;
    --vm-coral:#f17478;
    --vm-yellow:#ffd36c;
    --vm-blue:#8acbff;
    --vm-good:#85e3b2;
    --vm-bad:#ff9c9c;
    --vm-line:#425a69;
    --vm-soft:#233f49;
    --vm-warm:#453333;
    --vm-bad-bg:#432b36;
    --vm-good-bg:#24463d;
    --vm-on:#10212e;
  }
}
 
@media (prefers-reduced-motion:reduce) {
  .vm-root *,
  .vm-root *::before,
  .vm-root *::after {
    animation:none !important;
    transition:none !important;
  }
}
`;
 
  function installCSS() {
    if (document.getElementById(STYLE_ID)) return;
 
    const style = el("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }
 
  function reveal(parent, child) {
    child.classList.add("vm-reveal");
    parent.appendChild(child);
    return child;
  }
 
  /*
   * Safe kinetic typography.
   *
   * m.key is preferred.
   * Otherwise a short leading phrase is selected.
   *
   * No authored text is interpreted as HTML.
   */
 
  function keyPhrase(value, explicit) {
    const source = String(value ?? "");
    const requested = String(explicit ?? "").trim();
 
    if (requested) {
      const at = source.toLowerCase().indexOf(
        requested.toLowerCase()
      );
 
      if (at >= 0) {
        return {
          start: at,
          end: at + requested.length
        };
      }
    }
 
    const words = source.match(/\S+/g) || [];
    if (!words.length) return null;
 
    const stop = new Set([
      "a", "an", "the", "this", "that",
      "these", "those", "how", "why",
      "what", "when", "where", "who",
      "is", "are", "was", "were",
      "to", "of", "in", "on", "for",
      "and", "or", "with", "from"
    ]);
 
    let chosen = words[0];
 
    for (const word of words) {
      const clean = word.toLowerCase().replace(
        /[^a-z0-9-]/g,
        ""
      );
 
      if (!stop.has(clean) && clean.length > 2) {
        chosen = word;
        break;
      }
    }
 
    const start = source.indexOf(chosen);
 
    return {
      start,
      end: start + chosen.length
    };
  }
 
  function kinetic(tag, value, explicit) {
    const n = el(tag);
    const source = String(value ?? "");
    const range = keyPhrase(source, explicit);
 
    if (!range || range.start < 0) {
      n.textContent = source;
      return n;
    }
 
    n.appendChild(
      document.createTextNode(
        source.slice(0, range.start)
      )
    );
 
    const key = el(
      "span",
      "vm-key",
      source.slice(range.start, range.end)
    );
 
    n.appendChild(key);
 
    n.appendChild(
      document.createTextNode(
        source.slice(range.end)
      )
    );
 
    return n;
  }
 
  function makeArt() {
    const art = decorative(
      el("div", "vm-hero-art")
    );
 
    ["a", "b", "c", "d"].forEach(k => {
      art.appendChild(
        el("span", `vm-shape vm-shape-${k}`)
      );
    });
 
    return art;
  }
 
  function makeCover() {
    const e = el("article", "vm-moment vm-hero");
    const copy = el("div", "vm-hero-copy");
 
    const lesson =
      typeof section?.lesson === "string"
        ? section.lesson
        : section?.lesson?.title || "";
 
    if (lesson) {
      reveal(
        copy,
        el("span", "vm-kicker", lesson)
      );
    }
 
    reveal(
      copy,
      kinetic(
        "h2",
        section?.title || "Ready to learn",
        section?.key
      )
    );
 
    reveal(
      copy,
      el(
        "p",
        "vm-cover-note",
        "Press Play to begin listening."
      )
    );
 
    e.append(copy, makeArt());
    return e;
  }
 
  function makeTitle(m) {
    const e = el("article", "vm-moment vm-title");
 
    if (m.kicker) {
      reveal(
        e,
        el("span", "vm-kicker", m.kicker)
      );
    }
 
    reveal(
      e,
      kinetic("h2", m.text, m.key)
    );
 
    e.appendChild(
      decorative(
        el("span", "vm-title-accent")
      )
    );
 
    return e;
  }
 
  function makeIcon(name) {
    const disc = decorative(
      el("span", "vm-icon-disc")
    );
 
    try {
      if (typeof window.LAB?.icon === "function") {
        const known = new Set([
          "target", "check", "eq", "clock", "one",
          "link", "gauge", "chart", "users", "flask",
          "layers", "dash", "brain", "audit", "flag",
          "route", "key", "loop"
        ]);
 
        const safe = known.has(name) ? name : "layers";
 
        disc.innerHTML = window.LAB.icon(
          safe,
          "vm-line-icon"
        );
      }
    } catch (_) {
      disc.replaceChildren();
    }
 
    return disc;
  }
 
  function makeItem(m) {
    const e = el("article", "vm-moment vm-item");
    const body = el("div", "vm-item-body");
 
    reveal(
      body,
      kinetic("h3", m.title, m.key)
    );
 
    reveal(
      body,
      el("p", "", m.text)
    );
 
    if (m.n !== undefined && m.n !== null) {
      reveal(
        body,
        el(
          "span",
          "vm-item-index",
          m.of
            ? `${m.n} of ${m.of}`
            : String(m.n)
        )
      );
    }
 
    e.append(makeIcon(m.icon), body);
    return e;
  }
 
  function makeQuestion(m) {
    const e = el(
      "article",
      "vm-moment vm-question"
    );
 
    e.appendChild(
      decorative(
        el("span", "vm-question-icon", "?")
      )
    );
 
    reveal(
      e,
      kinetic("h2", m.text, m.key)
    );
 
    return e;
  }
 
  function makeStatement(m) {
    const e = el(
      "article",
      "vm-moment vm-statement"
    );
 
    reveal(
      e,
      el(
        "span",
        "vm-kicker",
        "Key takeaway"
      )
    );
 
    reveal(
      e,
      kinetic("p", m.text, m.key)
    );
 
    e.appendChild(
      decorative(
        el("span", "vm-statement-bar")
      )
    );
 
    return e;
  }
 
  function makeFormula(m) {
    const e = el(
      "article",
      "vm-moment vm-formula"
    );
 
    reveal(
      e,
      el(
        "span",
        "vm-kicker",
        m.label || "The calculation"
      )
    );
 
    const fraction = el("div", "vm-fraction");
 
    fraction.setAttribute("role", "group");
    fraction.setAttribute(
      "aria-label",
      `${m.num ?? ""} divided by ${m.den ?? ""}`
    );
 
    const numerator = reveal(
      fraction,
      el("div", "", m.num)
    );
 
    numerator.setAttribute("aria-hidden", "true");
 
    fraction.appendChild(
      decorative(
        el("span", "vm-fraction-rule")
      )
    );
 
    const denominator = reveal(
      fraction,
      el("div", "", m.den)
    );
 
    denominator.setAttribute(
      "aria-hidden",
      "true"
    );
 
    e.appendChild(fraction);
    return e;
  }
 
  function makeIssue(m) {
    const e = el("article", "vm-moment vm-issue");
 
    e.appendChild(
      decorative(
        el("span", "vm-issue-icon", "!")
      )
    );
 
    const body = el("div", "vm-issue-body");
 
    reveal(
      body,
      el("p", "", m.text)
    );
 
    if (m.effect) {
      reveal(
        body,
        el("span", "vm-effect", m.effect)
      );
    }
 
    e.appendChild(body);
    return e;
  }
 
  function makeCompare(m) {
    const e = el(
      "article",
      "vm-moment vm-compare"
    );
 
    e.dataset.side =
      m.side === "b" ? "b" : "a";
 
    if (m.dir === "up" || m.dir === "down") {
      e.appendChild(
        decorative(
          el(
            "span",
            "vm-direction",
            m.dir === "up" ? "\u2191" : "\u2193"
          )
        )
      );
    }
 
    reveal(
      e,
      el(
        "span",
        "vm-kicker",
        m.label || "Comparison"
      )
    );
 
    reveal(
      e,
      el("p", "", m.note)
    );
 
    return e;
  }
 
  function makeDiagram(m) {
    const e = el(
      "article",
      "vm-moment vm-diagram"
    );
 
    reveal(
      e,
      el(
        "span",
        "vm-kicker",
        m.kicker || "Process view"
      )
    );
 
    const frame = el(
      "div",
      "vm-diagram-frame"
    );
 
    /*
     * Trusted authored SVG from diagrams.js.
     */
    if (typeof m.svg === "string") {
      frame.innerHTML = m.svg;
    }
 
    e.appendChild(frame);
 
    if (m.caption) {
      reveal(
        e,
        el(
          "p",
          "vm-diagram-caption",
          m.caption
        )
      );
    }
 
    return e;
  }
 
  function makeMoment(m) {
    switch (m?.type) {
      case "title": return makeTitle(m);
      case "item": return makeItem(m);
      case "question": return makeQuestion(m);
      case "statement": return makeStatement(m);
      case "formula": return makeFormula(m);
      case "issue": return makeIssue(m);
      case "compare": return makeCompare(m);
      case "diagram": return makeDiagram(m);
      default:
        return makeStatement({
          text: m?.text || m?.title || m?.note || "",
          key: m?.key
        });
    }
  }
 
  function pathLength(path) {
    try {
      const n = path.getTotalLength();
      return Number.isFinite(n) && n > 0 ? n : 0;
    } catch (_) {
      return 0;
    }
  }
 
  function bounds(n) {
    try {
      return n.getBBox();
    } catch (_) {
      return null;
    }
  }
 
  function diagramParts(rootSvg) {
    const parts = [];
 
    const drawable = new Set([
      "rect", "circle", "ellipse", "line",
      "polyline", "polygon", "path", "text"
    ]);
 
    function walk(parent) {
      let previous = null;
 
      for (const child of Array.from(parent.children)) {
        const tag = child.localName?.toLowerCase();
 
        if (tag === "g") {
          walk(child);
          previous = null;
          continue;
        }
 
        if (!drawable.has(tag)) {
          previous = null;
          continue;
        }
 
        const fill = (
          child.getAttribute("fill") || ""
        ).toLowerCase();
 
        const stroke = (
          child.getAttribute("stroke") || ""
        ).toLowerCase();
 
        const edge =
          tag === "path" &&
          (fill === "none" || fill === "") &&
          Boolean(stroke) &&
          stroke !== "none";
 
        const head =
          tag === "path" &&
          fill !== "none" &&
          fill !== "";
 
        if (
          tag === "text" &&
          previous?.kind === "node"
        ) {
          previous.elements.push(child);
          continue;
        }
 
        if (
          head &&
          previous?.kind === "edge"
        ) {
          previous.elements.push(child);
          continue;
        }
 
        const part = {
          kind: edge ? "edge" : "node",
          elements: [child]
        };
 
        parts.push(part);
        previous = part;
      }
    }
 
    walk(rootSvg);
 
    /*
     * Reorder connectors after their source
     * boxes, correcting swimlane SVG ordering.
     */
 
    const nodes = parts.filter(p => p.kind === "node");
    const edges = parts.filter(p => p.kind === "edge");
 
    const groups = new Map();
    const unmatched = [];
 
    edges.forEach(edge => {
      let start = null;
 
      try {
        start = edge.elements[0].getPointAtLength(0);
      } catch (_) {
        start = null;
      }
 
      let selected = null;
      let area = Infinity;
 
      if (start) {
        nodes.forEach(node => {
          const b = bounds(node.elements[0]);
          if (!b) return;
 
          const inside =
            start.x >= b.x - 3 &&
            start.x <= b.x + b.width + 3 &&
            start.y >= b.y - 3 &&
            start.y <= b.y + b.height + 3;
 
          const a = b.width * b.height;
 
          if (inside && a < area) {
            area = a;
            selected = node;
          }
        });
      }
 
      if (selected) {
        if (!groups.has(selected)) {
          groups.set(selected, []);
        }
 
        groups.get(selected).push(edge);
      } else {
        unmatched.push(edge);
      }
    });
 
    const ordered = [];
 
    nodes.forEach(node => {
      ordered.push(node);
      ordered.push(...(groups.get(node) || []));
    });
 
    ordered.push(...unmatched);
 
    return ordered;
  }
 
  function compactParts(parts, maximum = 24) {
    if (parts.length <= maximum) return parts;
 
    const size = Math.ceil(parts.length / maximum);
    const result = [];
 
    for (let i = 0; i < parts.length; i += size) {
      const group = parts.slice(i, i + size);
 
      result.push({
        kind: group.every(p => p.kind === "edge")
          ? "edge"
          : "mixed",
        elements: group.flatMap(p => p.elements),
        members: group
      });
    }
 
    return result;
  }
 
  /*
   * Identify genuine flow-box diagrams.
   *
   * Equal-sized stroked rectangles and multiple
   * connecting edges indicate a process flow.
   *
   * Tokens move through box centres in their
   * authored sequence.
   */
 
  function flowPoints(rootSvg, parts) {
    const edges = parts.filter(p => p.kind === "edge");
 
    if (edges.length < 2) return null;
 
    const rects = Array.from(
      rootSvg.querySelectorAll("rect")
    ).filter(r => {
      const b = bounds(r);
      const stroke = r.getAttribute("stroke");
 
      return Boolean(
        b &&
        b.width > 15 &&
        b.width < 300 &&
        b.height > 10 &&
        stroke &&
        stroke !== "none"
      );
    });
 
    if (rects.length < 2) return null;
 
    const boxes = rects.map(r => bounds(r));
    const first = boxes[0];
 
    const sameSize = boxes.every(b =>
      Math.abs(b.width - first.width) <= 4 &&
      Math.abs(b.height - first.height) <= 4
    );
 
    if (!sameSize) return null;
 
    return boxes.map(b => ({
      x: b.x + b.width / 2,
      y: b.y + b.height / 2
    }));
  }
 
  function preferredEdge(parts) {
    const edges = parts
      .filter(p => p.kind === "edge")
      .map(p => p.elements[0])
      .filter(p => pathLength(p) > 12);
 
    return edges.find(p =>
      (
        p.getAttribute("stroke") || ""
      ).toUpperCase() === "#FFB84D"
    ) || null;
  }
 
  function prepareToken(rootSvg, parts) {
    const points = flowPoints(rootSvg, parts);
 
    if (points && points.length >= 2) {
      const token = decorative(svgEl("circle", {
        cx: 0,
        cy: 0,
        r: 5,
        class: "vm-token"
      }));
 
      rootSvg.appendChild(token);
 
      return {
        mode: "boxes",
        token,
        points
      };
    }
 
    const edge = preferredEdge(parts);
 
    if (!edge) return null;
 
    const length = pathLength(edge);
    if (!length) return null;
 
    const token = decorative(svgEl("circle", {
      cx: 0,
      cy: 0,
      r: 5,
      class: "vm-token"
    }));
 
    rootSvg.appendChild(token);
 
    return {
      mode: "path",
      token,
      path: edge,
      length
    };
  }
 
  function prepareScene(scene) {
    scene.diagrams = [];
 
    scene.content.querySelectorAll("svg.dg").forEach(s => {
      const raw = diagramParts(s);
 
      scene.diagrams.push({
        svg: s,
        parts: compactParts(raw),
        token: prepareToken(s, raw)
      });
    });
 
    scene.svgTransforms = new Map();
 
    scene.content.querySelectorAll("svg *").forEach(n => {
      scene.svgTransforms.set(
        n,
        n.getAttribute("transform")
      );
    });
  }
 
  function drawEdge(tl, path, at, duration) {
    const length = pathLength(path);
 
    if (!length) {
      tl.fromTo(
        path,
        { opacity: 0 },
        {
          opacity: 1,
          duration: .15,
          immediateRender: true
        },
        at
      );
      return;
    }
 
    const dash = path.style.strokeDasharray;
    const offset = path.style.strokeDashoffset;
 
    tl.fromTo(
      path,
      {
        strokeDasharray: `${length} ${length}`,
        strokeDashoffset: length,
        opacity: 1
      },
      {
        strokeDashoffset: 0,
        duration,
        ease: "power1.inOut",
        immediateRender: true
      },
      at
    );
 
    tl.set(
      path,
      {
        strokeDasharray: dash || "",
        strokeDashoffset: offset || ""
      },
      at + duration
    );
  }
 
  function revealPart(tl, part, at, duration) {
    const members = part.members || [part];
 
    if (part.kind !== "edge") {
      tl.fromTo(
        part.elements,
        {
          opacity: 0,
          y: 6,
          scale: .94
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          ease: "power2.out",
          immediateRender: true
        },
        at
      );
 
      return;
    }
 
    const paths = [];
    const other = [];
 
    members.forEach(member => {
      member.elements.forEach(n => {
        const fill = (
          n.getAttribute("fill") || ""
        ).toLowerCase();
 
        if (
          n.localName === "path" &&
          (fill === "none" || fill === "")
        ) {
          paths.push(n);
        } else {
          other.push(n);
        }
      });
    });
 
    if (paths.length === 1) {
      drawEdge(tl, paths[0], at, duration);
    } else if (paths.length) {
      tl.fromTo(
        paths,
        { opacity: 0 },
        {
          opacity: 1,
          duration,
          immediateRender: true
        },
        at
      );
    }
 
    if (other.length) {
      tl.fromTo(
        other,
        { opacity: 0 },
        {
          opacity: 1,
          duration: .15,
          immediateRender: true
        },
        at + duration * .7
      );
    }
  }
 
  /*
   * Bar and progress-fill animations.
   *
   * Rectangles without a stroke are treated as
   * filled bars when their geometry is wide
   * enough to be a meaningful horizontal fill.
   */
 
  function animateBars(tl, scene) {
    const bars = Array.from(
      scene.content.querySelectorAll(
        "svg.dg rect:not([stroke])"
      )
    ).filter(r => {
      const b = bounds(r);
 
      return Boolean(
        b &&
        b.width >= 18 &&
        b.height > 0 &&
        b.width >= b.height * 1.6
      );
    }).slice(0, 12);
 
    bars.forEach((bar, i) => {
      tl.fromTo(
        bar,
        {
          scaleX: 0,
          transformOrigin: "0% 50%"
        },
        {
          scaleX: 1,
          duration: .65,
          ease: "power2.out",
          immediateRender: true
        },
        .35 + i * .12
      );
    });
  }
 
  /*
   * Count up numeric minute labels.
   *
   * Only labels explicitly ending in "min"
   * or "mins" are modified.
   */
 
  function animateMinutes(tl, scene) {
    const labels = Array.from(
      scene.content.querySelectorAll("svg.dg text")
    ).filter(n =>
      /^\s*\d+(?:\.\d+)?\s*mins?\s*$/i.test(
        n.textContent || ""
      )
    ).slice(0, 12);
 
    labels.forEach((text, i) => {
      const original = text.textContent;
      const match = original.match(
        /(\d+(?:\.\d+)?)\s*(mins?)/i
      );
 
      if (!match) return;
 
      const target = finite(match[1]);
      const unit = match[2];
      const decimals = match[1].includes(".")
        ? match[1].split(".")[1].length
        : 0;
 
      const state = { value: 0 };
 
      tl.fromTo(
        state,
        { value: 0 },
        {
          value: target,
          duration: .85,
          ease: "power1.out",
          onUpdate: () => {
            text.textContent =
              state.value.toFixed(decimals) +
              " " + unit;
          },
          onComplete: () => {
            text.textContent = original;
          }
        },
        .4 + i * .1
      );
    });
  }
 
  function animateToken(tl, entry, at) {
    if (!entry) return;
 
    const token = entry.token;
 
    if (entry.mode === "boxes") {
      const points = entry.points;
      const first = points[0];
 
      token.setAttribute("cx", 0);
      token.setAttribute("cy", 0);
 
      tl.set(
        token,
        {
          x: first.x,
          y: first.y,
          opacity: 1
        },
        at
      );
 
      const steps = points.slice(1).map(p => ({
        x: p.x,
        y: p.y,
        duration: .3,
        ease: "power1.inOut"
      }));
 
      tl.to(
        token,
        {
          keyframes: steps
        },
        at
      );
 
      tl.to(
        token,
        {
          opacity: 0,
          duration: .18
        },
        at + steps.length * .3
      );
 
      return;
    }
 
    if (entry.mode === "path") {
      const start = entry.path.getPointAtLength(0);
 
      token.setAttribute("cx", 0);
      token.setAttribute("cy", 0);
 
      const state = { progress: 0 };
 
      tl.set(
        token,
        {
          x: start.x,
          y: start.y,
          opacity: 1
        },
        at
      );
 
      tl.to(
        state,
        {
          progress: 1,
          duration: .85,
          ease: "power1.inOut",
          onUpdate: () => {
            const p = entry.path.getPointAtLength(
              state.progress * entry.length
            );
 
            G()?.set(token, {
              x: p.x,
              y: p.y
            });
          }
        },
        at
      );
 
      tl.to(
        token,
        {
          opacity: 0,
          duration: .18
        },
        at + .85
      );
    }
  }
 
  function animateDiagram(tl, scene) {
    scene.diagrams.forEach((diagram, di) => {
      const parts = diagram.parts;
      if (!parts.length) return;
 
      const start = .22 + di * .15;
 
      const duration = clamp(
        String(
          section?.sentences?.[scene.at] || ""
        ).length / 16 * .7,
        2.5,
        5
      );
 
      const interval = duration / parts.length;
 
      parts.forEach((part, i) => {
        revealPart(
          tl,
          part,
          start + i * interval,
          Math.max(.12, interval * .9)
        );
      });
 
      if (diagram.token) {
        animateToken(
          tl,
          diagram.token,
          start + duration
        );
      }
    });
 
    animateBars(tl, scene);
    animateMinutes(tl, scene);
  }
 
  /*
   * Sentence-indexed issue and comparison
   * reveals, matching the Whiteboard contract.
   */
 
  function prepareGates(scene) {
    scene.gates = [];
 
    const issues = Array.from(
      scene.content.querySelectorAll(".vm-issue")
    );
 
    issues.forEach((element, k) => {
      scene.gates.push({
        element,
        at: scene.at + k
      });
    });
 
    const compares = Array.from(
      scene.content.querySelectorAll(".vm-compare")
    );
 
    compares.forEach((element, k) => {
      scene.gates.push({
        element,
        at: scene.at + (
          element.dataset.side === "b"
            ? Math.max(1, k)
            : k
        )
      });
    });
 
    const next = scenes.find(s => s.at > scene.at);
 
    const limit = next
      ? next.at - 1
      : Math.max(
          scene.at,
          (section?.sentences?.length || 1) - 1
        );
 
    scene.gates.forEach(gate => {
      gate.at = Math.min(gate.at, limit);
    });
  }
 
  function applyGates(scene, index, animate = false) {
    const g = G();
 
    scene.gates.forEach(gate => {
      const visible = index >= gate.at;
 
      if (!visible) {
        g?.killTweensOf(gate.element);
 
        if (g) {
          g.set(gate.element, {
            opacity: 0,
            y: 12
          });
        } else {
          gate.element.style.opacity = "0";
          gate.element.style.transform = "translateY(12px)";
        }
 
        gate.element.setAttribute("aria-hidden", "true");
        gate.element.inert = true;
        return;
      }
 
      gate.element.removeAttribute("aria-hidden");
      gate.element.inert = false;
 
      if (animate && g) {
        g.fromTo(
          gate.element,
          {
            opacity: 0,
            y: 12
          },
          {
            opacity: 1,
            y: 0,
            duration: .42,
            ease: "power2.out",
            overwrite: true
          }
        );
      } else if (g) {
        g.set(gate.element, {
          opacity: 1,
          y: 0
        });
      } else {
        gate.element.style.opacity = "1";
        gate.element.style.transform = "";
      }
    });
  }
 
  function animateScene(scene) {
    const g = G();
    if (!g) return;
 
    const tl = g.timeline({
      paused: true
    });
 
    scene.timeline = tl;
 
    const reveals = Array.from(
      scene.content.querySelectorAll(".vm-reveal")
    ).filter(n => !n.closest(".vm-issue,.vm-compare"));
 
    reveals.slice(0, 16).forEach((target, i) => {
      tl.fromTo(
        target,
        {
          opacity: 0,
          x: -24,
          y: 9
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: .46,
          ease: "power3.out",
          immediateRender: true
        },
        .08 + i * .15
      );
    });
 
    /*
     * Preserve authored CSS rotations.
     * Only opacity and scale are animated.
     */
 
    const shapes = Array.from(
      scene.content.querySelectorAll(".vm-shape")
    );
 
    shapes.forEach((shape, i) => {
      tl.fromTo(
        shape,
        {
          opacity: 0,
          scale: .25
        },
        {
          opacity: 1,
          scale: 1,
          duration: .52,
          ease: "back.out(1.3)",
          immediateRender: true
        },
        .12 + i * .16
      );
    });
 
    scene.content.querySelectorAll(
      ".vm-icon-disc,.vm-question-icon"
    ).forEach((icon, i) => {
      tl.fromTo(
        icon,
        {
          opacity: 0,
          scale: .5
        },
        {
          opacity: 1,
          scale: 1,
          duration: .5,
          ease: "back.out(1.3)",
          immediateRender: true
        },
        .1 + i * .18
      );
    });
 
    scene.content.querySelectorAll(
      ".vm-title-accent,.vm-statement-bar,.vm-fraction-rule"
    ).forEach((bar, i) => {
      tl.fromTo(
        bar,
        {
          opacity: 0,
          scaleX: 0
        },
        {
          opacity: 1,
          scaleX: 1,
          duration: .6,
          ease: "power2.out",
          immediateRender: true
        },
        .5 + i * .12
      );
    });
 
    /*
     * Kinetic keyword colour block.
     *
     * The highlight grows beneath the word,
     * without animating font size or layout.
     */
 
    scene.content.querySelectorAll(
      ".vm-key"
    ).forEach((key, i) => {
      tl.fromTo(
        key,
        {
          opacity: .65,
          scaleX: .92,
          transformOrigin: "0% 50%"
        },
        {
          opacity: 1,
          scaleX: 1,
          duration: .42,
          ease: "power2.out",
          immediateRender: true
        },
        .38 + i * .12
      );
    });
 
    animateDiagram(tl, scene);
 
    tl.eventCallback("onComplete", () => {
      scene.complete = true;
    });
 
    tl.play(0);
  }
 
  function finishScene(scene) {
    if (!scene) return;
 
    scene.timeline?.kill();
    scene.timeline = null;
 
    const g = G();
 
    if (g) {
      const elements = scene.content.querySelectorAll("*");
 
      g.killTweensOf(elements);
 
      g.set(elements, {
        clearProps:
          "opacity,transform,strokeDasharray,strokeDashoffset,clipPath"
      });
    } else {
      scene.content.querySelectorAll("*").forEach(n => {
        n.style.opacity = "";
        n.style.transform = "";
        n.style.strokeDasharray = "";
        n.style.strokeDashoffset = "";
      });
    }
 
    scene.svgTransforms?.forEach((original, element) => {
      if (original === null) {
        element.removeAttribute("transform");
      } else {
        element.setAttribute("transform", original);
      }
    });
 
    scene.diagrams.forEach(diagram => {
      if (diagram.token) {
        diagram.token.token.style.opacity = "0";
        diagram.token.token.style.transform = "";
      }
    });
 
    /*
     * Restore exact authored minute labels.
     */
 
    scene.minuteLabels?.forEach(([n, value]) => {
      n.textContent = value;
    });
 
    scene.complete = true;
  }
 
  function hideScene(scene) {
    if (!scene) return;
 
    scene.timeline?.kill();
    scene.timeline = null;
 
    scene.el.classList.remove("vm-active");
    scene.el.style.visibility = "hidden";
    scene.el.style.opacity = "0";
    scene.el.setAttribute("aria-hidden", "true");
    scene.el.inert = true;
  }
 
  function showScene(scene) {
    scene.el.classList.add("vm-active");
    scene.el.style.visibility = "visible";
    scene.el.style.opacity = "1";
    scene.el.removeAttribute("aria-hidden");
    scene.el.inert = false;
  }
 
  function fitScene(scene) {
    if (!root || !scene?.fit) return;
 
    const w = root.clientWidth;
    const h = root.clientHeight;
 
    if (w <= 0 || h <= 0) return;
 
    const marginX = w < 500 ? 18 : 44;
    const marginY = h < 380 ? 12 : 32;
 
    const availableW = Math.max(1, w - marginX);
    const availableH = Math.max(1, h - marginY);
 
    const fit = scene.fit;
    fit.style.transform = "none";
 
    const naturalW = Math.min(880, availableW);
    fit.style.width = naturalW + "px";
 
    const measuredW = Math.max(
      naturalW,
      scene.content.scrollWidth
    );
 
    const measuredH = Math.max(
      1,
      scene.content.scrollHeight
    );
 
    const scale = Math.min(
      1,
      availableW / measuredW,
      availableH / measuredH
    );
 
    fit.style.transform =
      `scale(${Math.max(.05, scale)})`;
  }
 
  let root = null;
  let stage = null;
  let band = null;
  let section = null;
  let scenes = [];
  let currentScene = -1;
  let lastSentence = null;
  let observer = null;
  let resizeFrame = 0;
  let transition = null;
  let generation = 0;
 
  function resetBand() {
    if (!band) return;
 
    band.style.visibility = "hidden";
 
    if (G()) {
      G().set(band, {
        x: 0,
        xPercent: -105
      });
    } else {
      band.style.transform = "translateX(-105%)";
    }
  }
 
  function cancelWork() {
    generation++;
 
    if (resizeFrame) {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = 0;
    }
 
    transition?.kill();
    transition = null;
 
    scenes.forEach(scene => {
      scene.timeline?.kill();
      scene.timeline = null;
 
      if (G()) {
        G().killTweensOf(scene.el);
        G().killTweensOf(
          scene.content.querySelectorAll("*")
        );
      }
    });
 
    resetBand();
  }
 
  function disconnected() {
    if (stage?.isConnected) return false;
 
    observer?.disconnect();
    observer = null;
 
    cancelWork();
 
    root?.classList.remove("vm-root");
    root?.removeAttribute("aria-label");
    root?.removeAttribute("role");
 
    return true;
  }
 
  function onResize() {
    if (disconnected()) return;
 
    if (resizeFrame) {
      cancelAnimationFrame(resizeFrame);
    }
 
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
 
      if (disconnected()) return;
 
      scenes.forEach(fitScene);
    });
  }
 
  function mount(target) {
    cancelWork();
 
    observer?.disconnect();
    observer = null;
 
    if (root) {
      root.classList.remove("vm-root");
      root.removeAttribute("aria-label");
      root.removeAttribute("role");
    }
 
    root = target || null;
    stage = null;
    band = null;
    section = null;
    scenes = [];
    currentScene = -1;
    lastSentence = null;
 
    if (!root) return;
 
    installCSS();
 
    root.classList.add("vm-root");
    root.setAttribute("role", "group");
    root.setAttribute(
      "aria-label",
      "Motion Explainer lesson visuals"
    );
 
    root.replaceChildren();
 
    stage = el("div", "vm-stage");
    band = decorative(el("div", "vm-transition"));
 
    root.append(stage, band);
 
    resetBand();
 
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(onResize);
      observer.observe(root);
    }
 
    const mountedStage = stage;
 
    document.fonts?.ready?.then(() => {
      if (stage === mountedStage && stage?.isConnected) {
        onResize();
      }
    });
  }
 
  function buildScene(at, moments) {
    const sceneEl = el("section", "vm-scene");
    sceneEl.setAttribute("aria-hidden", "true");
    sceneEl.inert = true;
 
    const fit = el("div", "vm-fit");
    const content = el("div", "vm-content");
 
    fit.appendChild(content);
    sceneEl.appendChild(fit);
 
    let previousCompare = null;
    let pair = null;
    let issueList = null;
 
    moments.forEach(m => {
      const item = makeMoment(m);
 
      if (m.type === "issue") {
        pair = null;
        previousCompare = null;
 
        if (!issueList) {
          issueList = el("div", "vm-issue-list");
          content.appendChild(issueList);
        }
 
        issueList.appendChild(item);
        return;
      }
 
      issueList = null;
 
      if (m.type === "compare" && previousCompare) {
        if (!pair) {
          pair = el("div", "vm-pair");
 
          content.insertBefore(
            pair,
            previousCompare
          );
 
          pair.appendChild(previousCompare);
        }
 
        pair.appendChild(item);
      } else {
        pair = null;
        content.appendChild(item);
      }
 
      previousCompare =
        m.type === "compare" ? item : null;
    });
 
    stage.appendChild(sceneEl);
 
    const scene = {
      at,
      el: sceneEl,
      fit,
      content,
      type: moments[0]?.type || "statement",
      diagrams: [],
      gates: [],
      timeline: null,
      complete: false,
      svgTransforms: new Map(),
      minuteLabels: []
    };
 
    prepareScene(scene);
 
    scene.minuteLabels = Array.from(
      content.querySelectorAll("svg.dg text")
    ).filter(n =>
      /^\s*\d+(?:\.\d+)?\s*mins?\s*$/i.test(
        n.textContent || ""
      )
    ).map(n => [n, n.textContent]);
 
    return scene;
  }
 
  function buildCover() {
    const scene = buildScene(-1, []);
    scene.content.appendChild(makeCover());
    scene.type = "cover";
    return scene;
  }
 
  function load(data) {
    try {
      if (!root || !stage || disconnected()) return;
 
      cancelWork();
 
      section = data || {
        lesson: "",
        title: "",
        sentences: [],
        moments: []
      };
 
      scenes = [];
      currentScene = -1;
      lastSentence = null;
 
      stage.replaceChildren();
 
      scenes.push(buildCover());
 
      const sentences = Array.isArray(section.sentences)
        ? section.sentences
        : [];
 
      const moments = Array.isArray(section.moments)
        ? section.moments
        : [];
 
      const groups = new Map();
 
      moments.forEach(m => {
        if (!m || typeof m !== "object") return;
 
        const at = Math.trunc(
          finite(m.at, -1)
        );
 
        if (at < 0 || at >= sentences.length) return;
 
        if (!groups.has(at)) groups.set(at, []);
        groups.get(at).push(m);
      });
 
      Array.from(groups.keys())
        .sort((a, b) => a - b)
        .forEach(at => {
          scenes.push(
            buildScene(at, groups.get(at))
          );
        });
 
      scenes.forEach(scene => {
        prepareGates(scene);
        finishScene(scene);
        hideScene(scene);
        fitScene(scene);
      });
 
      step(-1);
    } catch (_) {
      /*
       * Invalid visual content must never
       * interrupt narration.
       */
    }
  }
 
  function sceneForSentence(index) {
    let result = 0;
 
    for (let j = 1; j < scenes.length; j++) {
      if (scenes[j].at <= index) {
        result = j;
      } else {
        break;
      }
    }
 
    return result;
  }
 
  /*
   * Thin transition band.
   *
   * Used only when the scene type changes.
   * Same-type scenes receive direct reveals.
   *
   * The band never covers the teaching content.
   */
 
  function bandTransition(previous, target, token) {
    const g = G();
 
    if (!g || !band) {
      hideScene(previous);
      showScene(target);
      animateScene(target);
      return;
    }
 
    band.style.visibility = "visible";
 
    const tl = g.timeline({
      onComplete: () => {
        if (token !== generation) return;
        resetBand();
        transition = null;
      }
    });
 
    transition = tl;
 
    tl.set(band, {
      x: 0,
      xPercent: -105
    });
 
    tl.to(band, {
      xPercent: 105,
      duration: .34,
      ease: "power2.inOut"
    });
 
    tl.call(() => {
      if (token !== generation) return;
      resetBand();
    });
  }
 
  function step(i) {
    try {
      if (!root || !section || !scenes.length) return;
      if (disconnected()) return;
 
      const sentences = Array.isArray(section.sentences)
        ? section.sentences
        : [];
 
      const requested = Math.trunc(
        finite(i, -1)
      );
 
      const index = clamp(
        requested,
        -1,
        Math.max(-1, sentences.length - 1)
      );
 
      const targetIndex = sceneForSentence(index);
      const target = scenes[targetIndex];
 
      if (targetIndex === currentScene) {
        if (index !== lastSentence) {
          applyGates(
            target,
            index,
            index === lastSentence + 1 &&
              !reduced()
          );
        }
 
        lastSentence = index;
        return;
      }
 
      const previousIndex = currentScene;
 
      const previous =
        previousIndex >= 0
          ? scenes[previousIndex]
          : null;
 
      const adjacentForward =
        previousIndex >= 0 &&
        targetIndex === previousIndex + 1;
 
      const initial = previousIndex === -1;
 
      const animate =
        !reduced() &&
        Boolean(G()) &&
        (adjacentForward || initial);
 
      const typeChanged =
        Boolean(
          previous &&
          previous.type !== target.type
        );
 
      const token = ++generation;
 
      transition?.kill();
      transition = null;
      resetBand();
 
      if (previous) {
        finishScene(previous);
      }
 
      scenes.forEach((scene, j) => {
        if (
          j !== targetIndex &&
          j !== previousIndex
        ) {
          hideScene(scene);
        }
      });
 
      currentScene = targetIndex;
      lastSentence = index;
 
      finishScene(target);
      fitScene(target);
 
      if (previous) hideScene(previous);
 
      showScene(target);
 
      /*
       * Seeking and reduced motion always
       * show the final state immediately.
       */
 
      if (!animate) {
        finishScene(target);
        applyGates(target, index, false);
        return;
      }
 
      applyGates(target, index, false);
 
      target.complete = false;
      animateScene(target);
 
      applyGates(target, index, false);
 
      /*
       * A thin band appears only on an actual
       * change of teaching scene type.
       */
 
      if (typeChanged) {
        bandTransition(previous, target, token);
      }
    } catch (_) {
      /*
       * step() must never throw.
       */
    }
  }
 
  /*
   * Idempotent registration.
   */
 
  window.STYLES = window.STYLES || [];
 
  if (!window.STYLES.some(s => s.id === ID)) {
    window.STYLES.push({
      id: ID,
      name: NAME,
      note: NOTE,
      mount,
      load,
      step
    });
  }
})();