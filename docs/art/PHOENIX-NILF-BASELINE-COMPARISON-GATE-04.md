# Operation Phoenix — Nilfgaardian Connection Baseline Comparison · Gate 04

**Date:** 2026-11-23  
**Goal:** Establish existing Velen menu behavior and visual treatment as canonical for guide-wide standardization, beginning with Nilfgaardian Connection hub and walkthrough.  
**Evidence inspected:** `docs/framing-review/NILF-RUNTIME-QA.md`, `docs/art/PHOENIX-OWNER-VISUAL-AUTHORITY.md`, `docs/art/PHOENIX-MASTER-ASSET-CATALOG.md`, `dist/nilf-forged.css`, prior CSS dependency trace and `docs/PAGE-TEMPLATE-INDEX.md`.  
**Evidence limit:** Source-only review; no new browser screenshot, computed-style or physical Safari run.

## Component-by-component decisions

| Component | Decision | Source evidence | Required next check |
|---|---|---|---|
| Velen menus/accordions | KEEP | Owner establishes Velen functionality as canonical; owner visual authority specifies cream double-rim accordion and circular +/- | Identify actual runtime selector and test open/close, touch scrolling, focus and return |
| Quest illustrations and illustrated action | KEEP | `NILF-RUNTIME-QA.md` says pilot reuses existing quest art and illustrated actions | Verify actual Nilf hub/walkthrough matches owner screenshots |
| Progress, objective selector, wolf pointer | KEEP | Pilot QA states existing owners and selector are reused; CSS uses `.deck-jump::before` with `wolf-pointer.webp` | Check stage selection, mark/Undo, reload, return and focus |
| Main parchment | ALIGN | Existing `.scroll-r16`, `.reading-panel`, `.quest-hub-paper` use `curled-vellum-r16.webp` border-image; owner has locked A–E roles but exports/selector mapping remain pending | Match current rendered role to owner screenshot before replacement |
| Outer framing | ALIGN | `nilf-forged.css` scopes outline and rail/brace pseudo-elements to `[data-velen-nilf]`; not generic page component | Check computed styles and visual match; define reusable role without appearance drift |
| Text-only buttons | RESOLVE | Nilf CSS uses different `--nilf-button-cut` for hub vs walkthrough; master catalog retains B1–B10 original variants with stable per-page treatment | Compare actual screenshot and original approved references; retain function/state; do not assume pilot CSS equals B1/B2 |
| Warning panels | KEEP behavior / VERIFY visual | Nilf stylesheet frames `.sw-warning-panel`; warning stamp source mapping remains unresolved | Check warning state, prominence, dismissal/history and stamp fidelity |
| Responsive layouts | VERIFY | `NILF-RUNTIME-QA.md` prescribes 390×844 and 844×390; physical Safari pending | Check wrapping, rails, button size, horizontal gestures and scroll gutters |
| Shared component migration | NOT YET AUTHORIZED | Velen implementation is canonical, but selector-to-route coverage and cascade unresolved | Complete actual-runtime comparison and regression plan before code edits |

## Priority implementation roadmap

1. **Runtime evidence:** confirm entrypoint stylesheet order, actual matching selectors and computed styles for Nilf hub `/#velen/hub/nilf` and walkthrough `/#velen/quest/nilf/1`.
2. **Behavior regression:** preserve Velen accordion, deck, objective rail, progress and map controls exactly.
3. **Token/component inventory:** group existing CSS-native components by semantic role (menu, reading scroll, inset, standard button, illustrated action, progress, warning, frame) and identify the owner-approved artwork for each.
4. **Minimal isolated patch proposal:** replace duplicate styling with reusable references only where screenshot fidelity and behavior are demonstrably preserved.
5. **Pilot acceptance:** test both Nilf pages at phone portrait/landscape and physical Safari; then extend in controlled Velen batches, White Orchard and all existing pages.
6. **Expansion gate:** new regions only after all existing pages are aligned and the shared template is accepted.

## STOP

No design generation, source art substitution, CSS/JS/HTML change, deletion, merge or deployment. This comparison is not a browser QA result or owner acceptance.
