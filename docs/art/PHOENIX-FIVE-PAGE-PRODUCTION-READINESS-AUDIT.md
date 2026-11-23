# Operation Phoenix — Five-Page Production Readiness Audit

**Date:** 2026-11-23  
**Status:** Documentation-only source-backed production readiness audit; NOT implementation or release approval.  
**Authority:** `PHOENIX-OWNER-REVIEW-DECISIONS.md`, `PHOENIX-MASTER-ASSET-CATALOG.md`, `PHOENIX-PRODUCTION-ASSET-REGISTRY.md`, `PHOENIX-POST-BATCH04-EXPORT-GAP-AUDIT.md`, `docs/PAGE-TEMPLATE-INDEX.md`, `PHOENIX-PARCHMENT-TYPOGRAPHY-DEPENDENCIES.md`.  
**Scope:** Quest Hub, Walkthrough, Warning Panel, Region Information, Map Information. No new creative work.

## Approval versus readiness

- **LOCKED design** is not a recovered original file, separate production export, deployed CSS or owner-tested Safari page.
- The **five blank parchment formats A–E** and **five-panel typography visual composition** are owner-locked. Their mockups are newly generated references, not verified original GitHub exports. Exact production file creation and CSS mapping are pending.
- All old parchment files are retired for *future* production but physically retained until verified replacement and zero runtime references.
- **Flat blue-gray serif step numbers with fine silver underline** supersede the raised numerals shown in the typography mockup.
- Existing B1–B10 buttons, V1–V9 rails and A–J flourishes are owner-locked. Composite review JPEGs are NOT individual clean exports.
- Unapproved S1–S6 section/card title studies, rejected raised buttons, zoom 3/5 and warning stamps 3/5/6 must not enter production.

## Readiness matrix

| Page family | Existing accepted layout / code reference | Locked components to reuse | Unresolved source/export/implementation gates | QA gates | Status |
|---|---|---|---|---|---|
| Quest Hub / Quest Card | `docs/PAGE-TEMPLATE-INDEX.md`: quest title, subject art, briefing, place, suggested level when sourced, progress owner, completion rule, walkthrough/nearby actions. `quest-hubs.js`, `velen-r18.js`; Nilf hub pilot `dist/nilf-forged.css` | Parchment B, typography, B1–B10 text buttons, V1–V9 paired rails, A–J flourishes, existing subject art | Separate clean B/V/A exports not mapped; parchment B export not established; approved CSS-selector fidelity unverified; Nilf B1 pilot not certified as complete family | Correct stage/return, progress ownership, button consistency, phone portrait/landscape, physical Safari | **AMBER — DESIGN LOCKED / PRODUCTION NOT CERTIFIED** |
| Walkthrough | `shared-walkthrough.js`, `shared-walkthrough.css`, `quest-pages.js`; compact header, wolf pointer, warnings, objective rail, contextual choices, Sources at bottom | Parchment E, typography, dividers 1–12, corners 1–12, flat step number, B/V/A families | Original divider/corner source sheets not recovered; separate exports unverified; CSS mapping for step number, reading text and parchment pending | Stage snap under wolf, checklist scroll retention, warning placement, focus, safe area, Safari | **AMBER** |
| Warning Panel | `medallion.js`, `warning-center.js`, walkthrough warning state; existing `dist/home-rebuild.css` and parchment-related CSS | Warning stamps **1,2,4 only**, approved typography and parchment roles where used | Stamp originals not recovered; no clean individual export mapping; replacement of retired vellum references pending; exact wolf/medallion asset mapping unresolved | Acknowledge, queue/history, distinction from navigation and Undo, contrast, phone Safari | **AMBER** |
| Region Information / Hub | `docs/PAGE-TEMPLATE-INDEX.md` region console and regional reference; `velen-r18.js`, `desk-r11.js`, `deck-jump.js`; region art and controls | Parchment C, typography, B1–B10 buttons, V1–V9 rails, A–J flourishes; preserve all WO/Velen subject artwork | Approved visual-to-selector binding and production exports pending; layout consistency with WO/Velen not physically certified | Card selection, numbered strip wrap, return to selection, vertical gutters and swipe behavior, Safari | **AMBER** |
| Map Information / Controls | `map-ui.js`, `map-data.js`; browse first, optional session-only progress filter; approved Back/Layers/Recenter top and zoom/legend bottom | Parchment D, location links 1–6, legend 1–6, Layers 1–6, Recenter 1–6, Zoom **1,2,4,6**, Back 1–6, Progress checkboxes 1–6 | Original Nov 22 control source sheets not recovered; individual control/state exports not mapped; map marker PNGs are NOT control exports; actual control bindings and mobile layout not certified | Pins open owners, layer toggle, recenter/zoom, empty filtered state, touch gestures, exact return, Safari | **AMBER** |

**Interpretation:** Amber means an approved design with outstanding production evidence, not a known failure. No family is certified GREEN from the inspected source records.

## Source recovery queue — no new designs

1. Recover exact original layered or clean member sources for **B1–B10**, **V1–V9** and **A–J** from the existing framing sheets and history. Do not crop JPEG composites and call them clean exports.
2. Recover Nov 22 original source sheets for **dividers 1–12**, **corners 1–12**, **stamps 1/2/4**, and **all seven map-control families**. If unavailable, mark SOURCE UNRESOLVED; do not regenerate.
3. Preserve the two newly locked **parchment/typography review sheets** as reference evidence, then create and verify A–E production assets against those references only through a separately approved production implementation.
4. Map exact CSS selectors, loaded stylesheets, source revision, export paths, states, dimensions and transparency for each verified member; document gaps as PENDING.
5. Implement replacements in an isolated review branch, test WO/Velen/Nilf and iPhone Safari, then verify zero active dependencies before deleting the four retired parchment files.

## Explicit STOP

No source art generated, altered, deleted or deployed. No CSS, JS, HTML, font, published site, main branch or V49/V50 release changed. This audit is not owner Safari acceptance or a production release certificate.
