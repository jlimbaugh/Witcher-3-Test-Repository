# Phoenix — Gate 07 · Nilf visual verification readiness and accordion cascade

**Date:** 2026-11-23. **Status:** SOURCE-VERIFIED / RENDERED QA BLOCKED. Documentation-only. Order 014 remains paused.

## Rendered evidence availability
A browser engine exists in the assistant's execution environment, but the GitHub Pages site cannot be resolved from that environment. The complete runtime dependency bundle is not present locally. Therefore **no actual Nilf screenshot or computed-style measurement was obtained**, and no portrait, landscape, or Safari acceptance is claimed. Do not substitute an invented mockup or source inspection for rendered evidence.

## Verified accordion selector layers

- `dist/parchment-controls.css` gives `summary` controls a shared treatment across `.reading-panel`, `.quest-hub-paper`, `.scroll-r16` and other parchment containers; `summary::after` carries the plus/minus state and `details[open]>summary` the expanded state.
- `dist/shared-walkthrough.css` supplies a **more specific** `.sw-page details.sw-row>summary` rule and a circular green/steel `::after` control, plus its `[open]` minus state.
- `dist/quest-pages.css` also styles `.quest-preparation>summary`, `.quest-progress>summary` and the open-state marker of preparation. These must be tested in context rather than presumed identical to `.sw-row`.
- `dist/nilf-forged.css` applies frames to `.sw-row`, `.sw-selector`, `.sw-reading`, and `.sw-warning-panel`; it is not the sole owner of the accordion appearance.

## Verified ornament risk

`dist/quest-pages.css` declares `.reading-panel:before,.reading-panel:after{display:none!important}`. `dist/nilf-forged.css` assigns rail and brace backgrounds to Nilf `.reading-panel::before/::after` without a `display` override. The intended walkthrough decoration may be suppressed. This is a CSS-cascade inference requiring browser confirmation; hub `.quest-hub-paper` is not covered by the same hide rule.

## Rendered QA handoff (when runnable runtime is available)

1. Load `/#velen/hub/nilf` and `/#velen/quest/nilf/1` at **390×844** and **844×390**; record browser, branch and SHA.
2. Capture full-page screenshots and close-ups of heading, parchment edges, forged buttons, preparation/progress accordion, and walkthrough `.sw-row`.
3. In developer console, query both `getComputedStyle(el,'::before')` and `getComputedStyle(el,'::after')` for hub `.quest-hub-paper` and walkthrough `.reading-panel`: record `display`, `content`, `backgroundImage`, `backgroundSize`, `zIndex`; record whether pseudo-element actually paints.
4. Confirm that `details.sw-row` and `.quest-preparation` use correct circular controls, preserve accessible open/close state and keyboard interaction; test mobile vertical scroll vs horizontal deck gestures.
5. Inspect forged button `::before` outlines and primary illustrated actions; verify no rectangular underplate, correct paired sizes, disabled/focus/active states.
6. Compare screenshots with owner-approved Velen/WO visual evidence; record **Keep / Align / Resolve** with exact element and selector, not subjective redesign proposals.
7. Perform separate **physical iPhone Safari** owner acceptance. Headless Chrome does not certify Safari.

## STOP
No runtime CSS/JS/HTML edits, image generation, LT Order 014 banner changes, deletion, merge or deployment under this gate. Next meaningful action requires accessible runnable build or actual browser screenshots.
