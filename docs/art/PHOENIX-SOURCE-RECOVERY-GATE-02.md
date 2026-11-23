# Phoenix — Source Recovery Gate 02: Repository Evidence

**Date:** 2026-11-23. **Inspected:** branch `docs/art-production-registry-stage1` at `44a3891fa7196697db36e7631fc2854703a83c62`; Git tree `8096854dc0f073cf3399f6f778e937f8e72cece4` (**901 entries, not truncated**). This is a source-location pass, not a visual fidelity or production export certification.

## Located reference sheets (exact repository paths)

| Locked family | Existing review reference | Source finding | Export readiness |
|---|---|---|---|
| Bottom flourishes A–C | `docs/framing-review/box-flourishes.jpg` | Composite JPG located | Clean A/B/C individual sources NOT LOCATED |
| Bottom flourishes D–J | `docs/framing-review/bottom-flourishes-d-j.jpg` | Composite JPG located | Clean D–J individual sources NOT LOCATED |
| Vertical rails V1–V3 | `docs/framing-review/vertical-side-rails.jpg` | Composite JPG located | Separate paired originals NOT LOCATED |
| Vertical rails V4–V9 | `docs/framing-review/vine-side-rails.jpg` | Composite JPG located | Separate paired originals NOT LOCATED |
| Forged buttons B1–B6 | `docs/framing-review/text-only-buttons.jpg` | Composite JPG located | Individual originals and states NOT LOCATED |
| Forged buttons B7–B10 | `docs/framing-review/text-only-buttons-b7-b10.jpg` | Composite JPG located | Individual originals and states NOT LOCATED |
| Nilf pilot | `docs/framing-review/nilf-box-framing.jpg`, `dist/visual-art/nilf-forged/brace.svg`, `dist/visual-art/nilf-forged/rail.svg`, `dist/nilf-forged.css` | Existing pilot/reference files located | Does not establish B1–B10/V1–V9/A–J exports |
| Map frame concept | `docs/framing-review/regional-map.jpg` | Composite JPG located | Does not establish map controls 1–6 |
| Divider 1–12, corner 1–12, stamps 1/2/4 | Owner approval and catalog; no filename in inspected tree identifying source sheet or per-member export | SOURCE UNRESOLVED | BLOCKED until original source recovered |
| Seven map control families | `docs/art/PHOENIX-MAP-CONTROL-REVIEW-BATCH-04.md` | Approval/evidence record located; no corresponding per-variant files identified in inspected tree | SOURCE UNRESOLVED |
| Parchment A–E | Owner-approved generated five-panel review in conversation; `dist/curled-vellum-r16.webp`, `dist/worn-vellum-r15.svg`, `dist/r10-paper.svg`, `dist/r10-haunted-scroll-concept.webp` are retired legacy assets | Owner-approved new production reference; no separate A–E exports located | BLOCKED on fidelity-preserving export and mapping |
| Typography A–E | Owner-approved generated five-panel review in conversation; `dist/typography.css` and other CSS exist | No certified computed-style mapping; raised numerals in review are overridden by flat approved step style | BLOCKED on selector/type mapping |

**Additional reference evidence:** `docs/framing-review/velen-box-batch-01/` and `velen-box-batch-02/` contain quest-specific JPG mockups, not reusable clean ornament exports; `velen-vertical-batch-02/` contains more reading/sheet JPG references; `velen-buttons-batch-02/raised-*.jpg` is explicitly rejected as production button treatment.

## Specific implementation path to inspect next

1. Match `dist/nilf-forged.css` and `dist/visual-art/nilf-forged/{brace,rail}.svg` to actual Nilf hub/walkthrough selectors; label pilot-only versus reusable family members.
2. Map the four retired parchment paths through `dist/console-r16.css`, `dist/quest-pages.css`, `dist/typography.css`, `dist/parchment-controls.css`, `dist/guide-art-r15.css`, `dist/home-rebuild.css`, `dist/weathered-r10.css`. Do not delete while referenced.
3. Locate owner-approved original source files from session/archive if available. Git tree absence means **not found in this branch**, not proof of nonexistence.
4. Preserve approved page behavior from `docs/PAGE-TEMPLATE-INDEX.md` and existing White Orchard/Velen art.

## Reconciliation warning

Some older source documents still say parchment is HOLD or describe `curled-vellum-r16.webp` as APPROVED DEFAULT, and `docs/art/PHOENIX-MAP-CONTROL-REVIEW-BATCH-04.md` says awaiting owner approval. These are historical snapshots. **The later explicit owner decisions in `PHOENIX-OWNER-REVIEW-DECISIONS.md` supersede those approval statuses**, but do not establish exported files or deployed code.

## STOP

No creative changes, crops masquerading as transparent exports, runtime modifications, deletions, merges or deployment. No new artwork is proven necessary. Recover original source, then create fidelity-verified exports on a review branch with owner acceptance.
