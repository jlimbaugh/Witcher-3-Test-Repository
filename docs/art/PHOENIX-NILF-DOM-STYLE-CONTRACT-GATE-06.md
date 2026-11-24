# Phoenix — Gate 06 · Nilf DOM-to-style contract

**2026-11-23 · Documentation-only.** Continues Gate 05 while LT Order 014 remains paused. This is **source inspection, not browser verification**.

## Verified source bindings

| Runtime element | Builder | Styles and role | Decision |
|---|---|---|---|
| Hub root | `dist/velen-nilf-ui.js` ~525–526 | `.velen-nilf-hub.quest-hub-panel[data-velen-nilf=hub]` | Preserve route and menu behavior |
| Hub heading | same ~527 | `header.quest-hub-briefing` | Preserve existing treatment; **height change belongs exclusively to paused Order 014** |
| Hub parchment | same ~529 | `article.quest-hub-paper`; `dist/quest-pages.css` scroll styling; `dist/nilf-forged.css` outer outline and ornaments | Compare owner screenshot and actual computed style before reuse |
| Walkthrough root | same ~582–583 | `.quest-page.velen-nilf-page[data-velen-nilf=walk]` | Preserve route/progress owner |
| Walkthrough reading surface | same ~588 | `article.reading-panel`; `dist/quest-pages.css` scroll styling; `dist/nilf-forged.css` pseudo-element ornaments | **Likely invisible ornaments** because `quest-pages.css` has `.reading-panel:before,.reading-panel:after{display:none!important}`; verify in browser |
| Walkthrough return link | same ~654 | `Return to hub` | Preserve |
| Walkthrough Sources | same ~657 | `.sw-source-link` | Preserve quiet placement |
| Standard forged button treatment | `dist/nilf-forged.css` | Quest-scoped `--nilf-button-cut` and `--nilf-button-end`, different hub/walk; `::before` drawn metal | Do not introduce rectangular button border; compare approved art and states |

## Standardization rule

Create **reusable semantic roles** from the existing implementation rather than inventing new variants. Shared roles: page heading, reading parchment, inset accordion, forged text action, illustrated action, steel perimeter, decorative rail/brace, progress controls, source link. **Regional illustrations, quest text, and stage content remain specific.**

Do not replace CSS-rendered art with images. Do not propagate Nilf overrides guide-wide until the exact effective selectors, screenshots, responsive behavior and interaction states are verified. Preserve distinct page-role treatments; standardization does not mean flattening all pages to one look.

## Open checks

1. In browser, inspect computed `display`, `content`, `background-image` for hub `.quest-hub-paper::before/::after` and walkthrough `.reading-panel::before/::after`.
2. Confirm `nilf-forged.css` is loaded and matched in the app's actual Velen route.
3. Compare actual Velen/Nilf screens with owner screenshots in both orientations; check touch scroll, menu toggles, progress, Undo, back navigation and wolf control.
4. Inventory exact selector ownership for accordions and illustrated actions before any CSS extraction.
5. Maintain separate Order 014 hold: **no banner height choice or fix here**.

**STOP:** No code, artwork, deployment or deletion; no Safari/browser pass claimed.
