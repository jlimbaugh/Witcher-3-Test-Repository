# Phoenix — Parchment and Typography Dependency Audit

**Audit status:** source-level evidence; **no rendered or Safari acceptance**  
**Source ref:** `docs/art-production-registry-stage1`, inspected against the existing `dist/` CSS.  
**Rules:** [Master Catalog](PHOENIX-MASTER-ASSET-CATALOG.md), [Production Registry](PHOENIX-PRODUCTION-ASSET-REGISTRY.md), [Art Standard](../../ART-STANDARD.md). No production file has been edited.

## Parchment asset dependencies

| Material | Decision | Confirmed source references | Risk / action |
|---|---|---|---|
| `dist/curled-vellum-r16.webp` | APPROVED DEFAULT reading material | `dist/console-r16.css` `.console-r16 .scroll-r16`; `dist/quest-pages.css` reading border-image | Preserve; verify computed use and crop on phone |
| `dist/worn-vellum-r15.svg` | **NOT ACCEPTED** for production as a chosen parchment design; historical file | `dist/typography.css` `.appearance-settings-panel`; `dist/parchment-controls.css` parchment `select`; `dist/quest-pages.css` `.quest-step-picker select`; `dist/guide-art-r15.css` `#quest-q-devil .reading-panel` and `#whiteorchard-map .atlas-tools`; `dist/home-rebuild.css` `.medallion-warning,.medallion-history` | **Dependency present. Do not delete.** Need browser reachability and owner-approved replacement before changes |
| `dist/r10-paper.svg` | Historical/candidate, no approval inferred | `dist/weathered-r10.css` `#quest-q-devil .reading-panel` | Preserve pending route and cascade review |
| `dist/r10-haunted-scroll-concept.webp` | Historical/candidate, no approval inferred | `dist/weathered-r10.css` and `dist/guide-art-r15.css` `#quest-q-devil .reading-panel` | Preserve pending Devil by the Well route review |
| CSS parchment fills and gradients | Existing material treatments, not separate export approvals | `dist/parchment-controls.css` `summary`, checkbox labels, selectors; `dist/nilf-forged.css` Nilf reading panel framing | Preserve until owner compares rendered material with locked references |

**Interpretation:** a reference in a CSS file proves a dependency, **not** that the stylesheet loads on every route or wins the cascade. Before any replacement, inspect stylesheet loading order, matched selectors and computed backgrounds on affected routes. The original catalog explicitly leaves the parchment-family comparison OPEN.

## Typography implementation map — evidence vs approval

| Runtime element | Current source evidence | Approval status |
|---|---|---|
| Default body | `dist/phoenix-journal.css` `:root --body:Alegreya,Georgia,serif`, `body font:1.1875rem/1.55 var(--body)` | Runtime fact, **not yet mapped to locked Body #2** |
| Main headings | `dist/phoenix-journal.css` `h1,h2` use Fell; `h1` font-size 4.375rem; later selectors override contextually | Runtime fact; **H1–H6 mapping pending** |
| Guide wordmark | `dist/guide-art-r15.css` `.wordmark` uses Cinzel | Runtime fact; no new approval inferred |
| Quest-stage headings | `dist/typography.css` `.quest-page .stage-content>h2` 1.8rem / 1.25, ink-rule after | Runtime fact; approved H style not yet matched |
| Reading body | `dist/typography.css` `.reading-panel :is(p,li),.quest-hub-description` line-height 1.65 | Runtime fact; Body #2 match unverified |
| Notes / context | `dist/reading-pilot.css` `.reading-pilot-step` and `dist/typography.css` `.action-group-title` | Candidates only; N1–N6 mapping pending |
| Objective labels / metadata | `dist/parchment-controls.css` checkbox labels and `dist/typography.css` objective controls | Candidates only; O1–O6 mapping pending |
| Standard button labels | Existing CSS; Master Catalog says **RETAIN EXISTING** | Do not create new type variants |
| Section/card titles S1–S6 | Master Catalog says **UNAPPROVED** | Do not implement |

The repository includes font binaries for Alegreya, Cinzel, IM Fell English, and Fondamento. **Do not distribute font binaries** in reference packets; link to existing repository paths only. Typeface existence does not prove that a locked mockup maps to that typeface.

## Findings and next gates

1. **PARCH-01 / HIGH:** Rejected `worn-vellum-r15.svg` still has stylesheet references. No deletion or silent substitution. Enumerate which references actually render and determine replacements by owner comparison.
2. **PARCH-02 / OPEN:** Complete inventory of parchment material assets and actual page applications; historical Devil by the Well scroll is not an approved universal replacement.
3. **TYPE-01 / HIGH:** Locked Body #2, H1–H6, N1–N6, O1–O6 lack exact mockup-to-selector and size mappings. Recover source proofs before changing CSS.
4. **TYPE-02 / PRESERVE:** Button label typography stays as implemented unless owner separately changes the lock.
5. **QA / PENDING:** Compare phone portrait/landscape, enlarged type, light/dark appearance and focus; physical Safari acceptance remains owner-only.

## STOP

Documentation-only audit. No application CSS, assets, test baselines, published sites, or approved art changed. Order 014 remains independent. V49/V50 frozen.
