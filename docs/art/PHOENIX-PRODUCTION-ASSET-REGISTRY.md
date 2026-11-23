# Operation Phoenix — Art Production Registry · Inventory Gate 1

**Status:** READ-ONLY EVIDENCE RECONCILIATION; not a production release certificate  
**Tree inspected:** `docs/phoenix-art-master-catalog` @ `e9c506565972af1ceb1425921cf1f5ed46286c6f` (recursive Git tree, 845 tracked blobs; not truncated)  
**Authority:** [Master Art Asset Catalog](PHOENIX-MASTER-ASSET-CATALOG.md), [Art Standard](../../ART-STANDARD.md), [Framing Gallery](../framing-review/README.md), [Page Templates](../PAGE-TEMPLATE-INDEX.md). Where older framing proofs conflict, the November 22 owner adjudications in the Master Catalog prevail.

## How to read the register

Each row separates **visual approval** from **file location**, **individual export**, **runtime integration**, and **physical iPhone Safari acceptance**. “Not located” means no matching *individual variant export* was identified in this inspected Git tree; it does not prove an export never existed outside the repository. Sheet JPEGs are review references, **not** individual transparent production assets. Existing runtime CSS/SVGs do not prove fidelity to all variants.

| Family / IDs | Owner decision | Verified reference or existing file | Individual production export | Runtime / physical acceptance | Next gate |
|---|---|---|---|---|---|
| Text-only buttons B1–B6 | LOCKED, original treatment | `docs/framing-review/text-only-buttons.jpg` | Not located per variant | Nilf B1/B2 pilot only; physical pending | Recover source artwork; export B1–B6 separately; match dimensions/states |
| Text-only buttons B7–B10 | LOCKED, original treatment | `docs/framing-review/text-only-buttons-b7-b10.jpg` | Not located per variant | Not certified | Export B7–B10; stable page assignment |
| Bottom flourishes A–C | LOCKED | `docs/framing-review/box-flourishes.jpg` | Not located per variant | Nilf brace `dist/visual-art/nilf-forged/brace.svg` exists; NOT certified as A–C export | Recover and map individual motifs |
| Bottom flourishes D–J | LOCKED | `docs/framing-review/bottom-flourishes-d-j.jpg` | Not located per variant | Not certified | Export D–J; retain A→J fixed rotation |
| Vertical rail pairs V1–V3 | LOCKED | `docs/framing-review/vertical-side-rails.jpg` | Not located per pair | Nilf rail `dist/visual-art/nilf-forged/rail.svg` exists; NOT certified as V1–V3 export | Left/right paired exports |
| Vertical rail pairs V4–V9 | LOCKED | `docs/framing-review/vine-side-rails.jpg` | Not located per pair | Not certified | Left/right paired exports; preserve interleaved rotation |
| Parchment dividers 1–12 | LOCKED | Master catalog / session approval record | Individual files not mapped | Unverified | Recover original reference sheet and exact exports |
| Walkthrough corners 1–12 | LOCKED | Master catalog / session approval record | Individual files not mapped | Unverified | Recover original reference sheet and exact exports |
| Warning stamps 1,2,4 | LOCKED; other options NOT approved | Master catalog / session approval record | Individual files not mapped | Unverified | Locate exact source/exports; reject other variants |
| Walkthrough step number | LOCKED default: flat blue-gray serif, fine silver underline | Master catalog | CSS mapping not certified | Unverified | Identify exact CSS and test readability |
| Raised step markers 1–6 | APPROVED STUDY only | Master catalog | Not applicable for default | NOT default | Preserve as study; do not deploy |
| Map controls: location links, legend, Layers, Recenter, toolbar Back, Progress checkboxes | LOCKED 1–6 per family | Master catalog / session record | Individual variants not mapped | Unverified | Recover sheets and map controls to actual UI |
| Map zoom pairs | LOCKED 1,2,4,6; 3 and 5 DISCARDED | Master catalog / session record | Individual variants not mapped | Unverified | Export only approved four |
| Quest-map control composition | LOCKED | Master catalog | Composition, not a standalone export | Not certified | Compare live layout with approval |
| Body typography #2 | LOCKED | Master catalog; font files in `dist/` | Exact typeface/style mapping unresolved | Not certified | Map approved proof to CSS and font |
| Headers H1–H6; notes N1–N6; objectives O1–O6 | LOCKED | Master catalog | Exact mappings unresolved | Not certified | Map styles to selectors, sizes and page families |
| Button label typography | RETAIN EXISTING | `dist/typography.css`, existing Nilf/Velen CSS | No new export required | Existing runtime; acceptance not certified | Do not redesign |
| Section/card titles S1–S6 | UNAPPROVED | Master catalog | DO NOT EXPORT | Not for production | Owner approval required |
| Nilf framing B1 hub / B2 walkthrough | PILOT IMPLEMENTED | `dist/visual-art/nilf-forged/brace.svg`, `rail.svg`; `dist/nilf-forged.css` | Reusable family extraction unverified | Browser and physical Safari acceptance open | Verify current rendered pilot |
| Default reading parchment | APPROVED DEFAULT | `dist/curled-vellum-r16.webp` | Existing file | Site-wide use not audited | Dependency/usage inventory |
| Historical vellum | NOT ACCEPTED | `dist/worn-vellum-r15.svg` | Existing historical file | DO NOT PROMOTE | Retain pending dependency audit |
| Other parchment candidates | UNDECIDED | `dist/r10-paper.svg`, `dist/r10-haunted-scroll-concept.webp` are named candidate files, not approvals | Existing files | Usage/approval not established | Full material-family inventory before retirement |
| Wolf pointer | Preserve existing shared art | `dist/visual-art/wolf-pointer.webp` | Existing file | Physical QA open | Verify rendering/size |
| Wolf medallion | Detailed approved; simplified rejected | `dist/wolf-medallion-silver.png`, `dist/wolf-medallion.svg` | Existing files; canonical mapping unverified | Not certified | Compare reference and runtime |
| White Orchard illustration families | KEEP ALL | `dist/art-white-orchard/` (57), `dist/art-white-orchard-illustrated/` (59), `dist/art-white-orchard-variety/` (31) | 147 tracked files across directories, NOT 147 distinct subjects | Existing integrations not individually audited | No deletion or deduplication |
| Velen illustration family | Preserve existing subject art | `dist/art-velen/` (73 files) | Existing files | Crop/binding/physical QA open | Verify against quest IDs and subject fidelity |
| Map marker icon set | Existing runtime assets, not proof of approval of new map-control families | 23 `dist/map-icon-*.png` files | Existing files | Not individually certified | Separate map markers from map UI controls |

### Approved rotation rules (not optional)

- Buttons: B1→B2→…→B10→B1, **one stable variant per page**, same style for peer standard text buttons; illustrated actions are separate.
- Flourishes: A→B→C→D→E→F→G→H→I→J→A, one centered bottom flourish per framed box.
- Rail pairs: V1→V4→V5→V2→V6→V7→V3→V8→V9→V1, left/right kept together.
- Preserve existing White Orchard artwork and all historical references; do not silently treat overlap as redundancy.

### Explicit exclusions / conflicting evidence

- `docs/framing-review/velen-buttons-batch-02/raised-01.jpg` through `raised-05.jpg`: **HISTORICAL / NOT PRODUCTION**. These later raised proofs are superseded by the November 22 owner decision to retain the original B1–B10 designs. The older gallery's “approved” language for the raised proof is not authoritative for production.
- `dist/worn-vellum-r15.svg`: **NOT ACCEPTED**, retain until dependency review.
- Section/card title S1–S6: **UNAPPROVED**.
- Do not distribute or copy font binaries as part of a standalone reference packet; repository file inventory only.

## Existing files and evidence

The tree contains `dist/alegreya-latin-400-normal.woff2`, `dist/cinzel-latin-400-normal.woff2`, `dist/im-fell-english-latin-400-normal.woff2`, `dist/fondamento-r16.ttf` and accompanying license text for three font families. The exact approved typography #2 / H / N / O mapping is **not established by the mere presence of these files**.

`dist/visual-art/` has ten tracked files, including `iron-button-frame.webp`, `ink-rule.svg`, `wolf-pointer.webp`, `nilf-forged/brace.svg`, `nilf-forged/rail.svg` and five action icons. These are existing runtime candidates, **not** B1–B10 or V1–V9 complete exports.

Review sheets and page-level concept proofs are under `docs/framing-review/` (47 tracked files including Markdown). They should remain review/evidence files, not be moved into the production asset directory.

## Proposed future per-asset production manifest

Each exported asset should receive: `asset_id`, `family`, `variant`, `approval_status`, `source_reference_path`, `source_revision`, `export_path`, `format`, `pixel_or_viewbox_dimensions`, `alpha/background`, `left_right_pair`, `rotation_rule`, `runtime_selector_or_binding`, `qa_browser`, `qa_safari`, `sha256`, and `notes`. Fill unknown fields with `PENDING`; never guess.

## STOP / next gate

This is **documentation only**. No assets were generated, moved, removed or deployed; no runtime code changed. Before exporting: identify source files for each approved sheet, audit parchment dependencies and resolve variant-to-export naming. Before integration: compare individual exports to owner-approved visuals, then test at phone size. Production and Safari acceptance require separate owner approval. V49/V50 remains frozen.
