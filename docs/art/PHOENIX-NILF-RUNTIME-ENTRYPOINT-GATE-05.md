# Phoenix — Nilf Runtime Entrypoint & CSS Cascade Gate 05

**Date:** 2026-11-23. **Scope:** Source-level runtime wiring inspection on `docs/art-production-registry-stage1`. **No browser execution, screenshots, or physical Safari QA performed.**

## Confirmed entrypoint and order

`dist/index.html` contains the application script `velen-nilf-ui.js?v=velen-rail-tools-3` and the late stylesheet list in this relevant order:

1. `quest-pages.css?v=type-v40`
2. `parchment-controls.css?v=type-v40`
3. `typography.css?v=type-v40`
4. `shared-walkthrough.css?v=regional-wrap-catchup-16`
5. `nilf-forged.css?v=velen-rail-tools-3`

The separate `dist/velen.html` entry references `velen-entry.js` and `velen-routing.js`; its own source does not directly include `nilf-forged.css`. Do not assume `velen.html` independently loads all styles; trace its navigation to `index.html` before conclusions.

## Nilf component construction

`dist/velen-nilf-ui.js` creates a hub root with class `velen-nilf-hub quest-hub-panel` and `root.dataset.velenNilf='hub'`, and a walkthrough root with class `quest-page velen-nilf-page` and `root.dataset.velenNilf='walk'`. The walkthrough includes a return-to-hub link and a Sources link. Its progress and stage controls are built on the existing Velen Nilf owner. These are direct source findings, not proof of live behavior.

## Confirmed cascade concern requiring computed-style verification

`dist/quest-pages.css` includes:
```css
.reading-panel:before,.reading-panel:after{display:none!important}
```
`dist/nilf-forged.css` later assigns `background-image` to `#velen-screen [data-velen-nilf] > :is(.quest-hub-paper,.reading-panel)::before` and `::after`, but does **not** set `display`. Later stylesheet order does not override the earlier `display:none!important` property. If the Nilf `.reading-panel` is the matching element, the pseudo-element remains hidden unless another matching declaration overrides that display. This is a source-grounded likely defect, **not a confirmed screenshot defect**. The `.quest-hub-paper` may have different effective rules.

## Scope and safety

- The Nilf stylesheet is quest-scoped; do not extract it globally before verifying the actual Velen page.
- Nilf hub/walk have different CSS button silhouettes; compare with owner-approved Velen art before consolidating.
- Velen menus and accordion behavior remain canonical and must not be redesigned.
- Existing `curled-vellum-r16.webp` border-image and retired background materials remain referenced. Do not delete.
- Next gate: browser-computed `display`, `backgroundImage`, `content`, actual matched element, screenshot and touch behavior at 390×844 and 844×390. Physical iPhone Safari acceptance separate.

**STOP:** No runtime edit, new artwork, deletion, merge, or deployment.
