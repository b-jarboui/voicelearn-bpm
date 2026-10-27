// Style engine support: shared icons and the px scaler used by the looks (no course content here).
// A moment appears when sentence `at` starts. Styles decide how each moment type looks and moves.
// Moment types: title, item (part of a group), question, formula, issue, compare, statement.
window.LAB = {
  sections: [],
  icons: {
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    eq: '<path d="M5 9h14M5 15h14"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
    one: '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M11 9l2-1v8"/>',
    link: '<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
    gauge: '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/>',
    chart: '<path d="M5 19V9M10 19V5M15 19v-7M20 19v-4"/>',
    users: '<circle cx="9" cy="9" r="3"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M16 6a3 3 0 0 1 0 6M17 19a6 6 0 0 0-2-4"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    dash: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 15l3-3 3 2 4-5"/>',
    brain: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    audit: '<path d="M7 3h7l4 4v14H7z"/><path d="M10 12h5M10 16h5M14 3v4h4"/>',
    flag: '<path d="M5 21V4h11l-2 4 2 4H5"/>',
    route: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h7a3 3 0 0 1 0 6H10a3 3 0 0 0 0 6h7"/>',
    key: '<circle cx="8" cy="14" r="4"/><path d="M11 11l8-8M16 6l3 3M14 8l2 2"/>',
    loop: '<path d="M20 12a8 8 0 1 1-3-6.2"/><path d="M20 4v5h-5"/>',
  },
  // Make every px size scale with the screen: the harness sets --k (1 = normal, larger in full screen).
  k(css) { return css.replace(/(-?\d*\.?\d+)px/g, "calc($1px*var(--k,1))"); },
  icon(k, cls = "") {
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${this.icons[k] || ""}</svg>`;
  },
};
// Each style registers here: { id, name, note, mount(el), load(section), step(i) }
window.STYLES = [];
