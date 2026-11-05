/* Portrait policy for the shared scene host.
 *
 * The authored landscape drawing is the safe composition for every current
 * scene. Its objects, connectors, camera, chart geometry and animated paths
 * share one coordinate system. Splitting those objects into automatically
 * packed rows broke that relationship, even when text bounds passed QA.
 *
 * Returning null explicitly selects lesson-layout's authored-aspect fallback:
 * fit the whole drawing, retain its viewBox, and centre the lesson using
 * --vl-spare. Do not wrap, clip, translate or reorder the scene's children.
 * A future portrait composition must be authored and checked with its routes
 * and every animation state before prepare() can opt that scene in.
 * Keep the hooks used by scene-host.js so playback needs no special cases.
 */
(() => {
  'use strict';
  window.VL_PORTRAIT = {
    prepare() { return null; },
    beforeStep() {},
    refresh() {}
  };
})();
