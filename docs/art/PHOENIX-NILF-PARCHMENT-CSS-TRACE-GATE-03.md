# Phoenix — Nilf Framing and Parchment CSS Trace · Gate 03

**Date:** 2026-11-23. **Method:** direct source inspection of CSS files on `docs/art-production-registry-stage1`; **no browser computed-style or Safari proof**. This report supersedes no owner visual approval.

## Nilf pilot: exact source-to-selector map

| Existing source | Exact CSS scope | Effect | Interpretation |
|---|---|---|---|
| `dist/nilf-forged.css` | `#velen-screen [data-velen-nilf] > :is(.quest-hub-paper,.reading-panel)` `::before` | `visual-art/nilf-forged/rail.svg` at left 22% plus `brace.svg` center bottom, with sizes 11×75px and 112×20px | Existing left rail and bottom brace **pilot**, not certified as all V1–V9/A–J |
| Same | `::after` on same panel selector | `rail.svg` at left 65%, then `transform:scaleX(-1)` | Mirrored right rail effect; do not confuse with separate original paired exports |
| Same | `#velen-screen [data-velen-nilf] > :is(.quest-hub-paper,.quest-hub-nearby,.reading-panel)` | 2px steel outline | Outer framing added around existing parchment; explicitly preserves existing border-image |
| Same | `[data-velen-nilf="hub"]` vs `[data-velen-nilf="walk"]` body selectors | Two different CSS `--nilf-button-end` and `--nilf-button-cut` treatments; `::before` draws forged button | **Pilot-specific CSS**, not verified B1–B10 original exports; separate from approved page-wide rotation |
| Same | `.quest-hub-tools,.quest-page-tools` | 2-column grid, 8px gap | Scoped layout pilot |
| Same | `.deck-jump::before` | `visual-art/wolf-pointer.webp` | Existing pointer, not floating medallion asset |

## Parchment: exact direct URL references and roles

| CSS file | Selector / role | Material | Implication |
|---|---|---|---|
| `dist/console-r16.css` | `.console-r16 .scroll-r16` | `curled-vellum-r16.webp` as **border-image** with slice `155 100 150 100 fill` | Main scroll uses stretchable nine-slice border, not a plain background |
| `dist/quest-pages.css` | `.reading-panel,.quest-hub-paper,#quest-q-devil.quest-page .reading-panel` | `curled-vellum-r16.webp` border-image, with `!important` | Quest/reading parchment also nine-slice; mobile widths changed in media query |
| `dist/quest-pages.css` | `#quest-q-devil.quest-page .reading-panel`, `.quest-page .quest-step-picker select` | `worn-vellum-r15.svg` backgrounds | Historical fallback or competing rule; actual winner requires cascade inspection |
| `dist/typography.css` | `.appearance-settings-panel` | `worn-vellum-r15.svg` background | Appearance menu dependency |
| `dist/parchment-controls.css` | Shared parchment `select` | `worn-vellum-r15.svg` background | Control dependency, **not** main parchment border |
| `dist/guide-art-r15.css` | `#quest-q-devil .reading-panel` | `r10-haunted-scroll-concept.webp` plus `worn-vellum-r15.svg` | Historical special-case composite; cascade and load order unresolved |
| `dist/guide-art-r15.css` | `#whiteorchard-map .atlas-tools` | `worn-vellum-r15.svg` | White Orchard map tools dependency |
| `dist/home-rebuild.css` | `.medallion-warning,.medallion-history` | `worn-vellum-r15.svg` | Warning/history overlay dependency |
| `dist/weathered-r10.css` | `#quest-q-devil .reading-panel` | `r10-haunted-scroll-concept.webp` plus `r10-paper.svg` | Earlier special-case rule; not proof it wins cascade |

## Shared functional controls are CSS-native

- `dist/parchment-controls.css` provides shared `summary` styling, circular plus/minus via `summary:after`, checked/unchecked checkbox visuals, focus, disabled and `select` styling. These controls are **CSS-native**, not necessarily missing image exports.
- `dist/quest-pages.css` supplies quest hub and walkthrough layout, controls, reading panel border-image, and mobile overrides. CSS-native structure and states should not be flattened into decorative image files.
- `dist/nilf-forged.css` button visuals are CSS-generated `::before` backgrounds and clipping. Preserve interactive states and text as live HTML.

## Findings and constraints

1. **NO deletion now:** the four retired parchment material paths still have CSS references. Retired means not an approved *future* visual design, not safe to delete.
2. **NO automatic visual equivalence:** a newly locked parchment A–E mockup does not prove that its production rendering can be achieved by simply swapping the old nine-slice image.
3. **Potential CSS conflict requiring QA:** `dist/quest-pages.css` disables `.reading-panel:before,:after` using `display:none!important`, while `dist/nilf-forged.css` places rail/brace decorations on these pseudo-elements. Whether Nilf ornaments actually render requires computed-style/load-order verification, not assumption.
4. **Potential approval conflict:** `dist/nilf-forged.css` defines distinct hub and walkthrough button shapes, while owner-locked B1–B10 rule calls for one stable text-button variant per page. Do not promote the pilot to site-wide default without exact comparison.
5. **Source recovery still open:** neither the two pilot SVGs nor the CSS-generated buttons prove full A–J/V1–V9/B1–B10 production exports.
6. **Current code and screenshot fidelity:** untested in this source pass. Do not claim rendered results, missing decorations, or broken pages without browser QA.

## Next technical gate

Trace stylesheet inclusion and order from actual entrypoints, verify which selectors match Nilf hub/walk and WO/Velen surfaces, then run browser computed-style and screenshot comparisons (portrait/landscape). Only after that can we prepare a minimal scoped implementation plan for approved A–E parchment and B/V/A variants.

## STOP

No art regeneration, runtime CSS/JS/HTML changes, file deletion, merge or deployment. V49/V50 and the published guide remain untouched.
