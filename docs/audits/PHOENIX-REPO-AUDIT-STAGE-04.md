# Operation Phoenix — Repository Audit, Stage 04: Art and Asset Integrity
Date: 2026-11-23
Status: Capt findings for Grok independent review; no production modification
Scope: docs/phoenix-art-master-catalog full recursive tree, exact art catalog and source registers.

## Inventory verified
- Git tree at inspection: 5c65bfd7974630c0c919f7725858d12c06a86178 (tree SHA, not commit SHA); truncated=false.
- 477 files with extensions webp, png, svg, jpg, woff2, ttf: 348 WebP, 40 PNG, 21 SVG, 64 JPG, 3 WOFF2, 1 TTF.
- Therefore 473 image assets and 4 font files; 21 directories contain image files.
- No zero-byte images. No identical Git blob SHA among the 473 image paths. This excludes byte-identical duplicates only; does NOT exclude visually redundant assets or images encoded differently.
- Tiny image candidates:
  * dist/art-velen/monochrome-sketches/sketch-anna.webp: 16 bytes; blob 6101ec063c0c52834543e21c39dd0137be3d9fef
  * dist/art-velen/monochrome-sketches/sketch-archer.webp: 18 bytes; blob 4e87f63466450468145177455af7203fdbcc30b8
  * assets/parchment-sketches/sketch-detlaff.webp: 200 bytes; blob 2c16c2317167d0572f51d1c3c622c933d458822c
  * dist/art-velen/monochrome-sketches.zip: 50 bytes; not counted as image.
- These file sizes and the source register indicate placeholders, not validated portraits. A binary decoder test on the GitHub files was not performed in this stage.
- The user-uploaded 59-image archive was previously locally validated and repackaged; the GitHub register explicitly says binary ingestion pending. Owner subsequently authorized production use, not deployment.

## Approval governance verified in exact sources
- docs/art/PHOENIX-MASTER-ASSET-CATALOG.md defines LOCKED as visual approval, not necessarily export, integration, or field acceptance.
- Locked: parchment dividers 1–12; walkthrough corners 1–12; warning stamps 1,2,4; map controls and checkbox families; body typography #2; header H1–H6; notes N1–N6; objective O1–O6.
- Original text-only button B1–B10 treatment retained; later raised/beveled set rejected as production default.
- Vertical rails V1–V9 retained, rotation V1→V4→V5→V2→V6→V7→V3→V8→V9.
- Bottom flourishes A–J retained with A→J rotation.
- White Orchard artwork: KEEP ALL; do not consolidate merely because subjects overlap.
- Parchment Set 05 remains OPEN: dist/worn-vellum-r15.svg explicitly NOT ACCEPTED; dist/curled-vellum-r16.webp documented as default reading material. Do not delete historical file without dependency review.
- Section/card title typography S1–S6 UNAPPROVED; Nilf B1/B2 is PILOT IMPLEMENTED, not certified as accepted production.
- docs/art/PHOENIX-PRODUCTION-INVENTORY-PASS-01.md is explicitly a partial source inventory; some binary files are listed as unverified, not missing.
- ART-STANDARD.md contains older potentially contradictory button treatment instructions; master catalog says owner decision supersedes older raised-bevel language.

## Findings
S4-F01 HIGH: 59 approved portrait WebPs are not installed as real GitHub image files; three small WebPs and a 50-byte ZIP are suspect placeholders. No runtime binding to these paths until upload and hash/decode checks.
S4-F02 HIGH: Locked visual families lack complete canonical source/export/integration/mobile-QA mapping; approvals cannot be equated with deployment.
S4-F03 MEDIUM: Art governance documents include historical contradictions (especially raised button bevel), requiring owner-approved precedence rather than silent reinterpretation.
S4-F04 MEDIUM: Rejected worn vellum is present and may be referenced by styles; preserve until a dependency-controlled replacement is approved.
S4-F05 INFO: 473 image paths have unique Git blob hashes. This proves no byte-identical duplicates in this tree, not visual uniqueness.
S4-F06 OPEN: File magic, decode, dimensions, compression, attribution, image-to-task fidelity, CSS references, and Safari rendering have not been comprehensively validated by this source inventory.

## Grok independent review checklist
1. Reproduce all counts and exact SHA/size evidence at a pinned commit; flag branch drift.
2. Inspect suspect tiny WebP and ZIP bytes; confirm actual validity and references.
3. Validate every production image via magic/decode/dimensions and verify every CSS/JS/HTML referenced asset path.
4. Build approved-family-to-file mapping with separate statuses: reference found, export found, integrated, browser QA, user accepted.
5. Audit parchment family fully; locate all uses of rejected worn-vellum-r15.svg and identify approved alternatives without changes.
6. Identify any historical raised-button implementation violating the newer approved standard; report paths and screenshots.
7. Check source provenance, credits, font licenses, crop and accessibility requirements.
8. No modifications, deletions, uploads, merges, or deployment during independent review.

## Stage gate
STOP pending Grok Stage 04 report and user approval. Proposed Stage 05: tests, CI, QA and release safety.
