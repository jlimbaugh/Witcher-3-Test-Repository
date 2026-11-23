# Operation Phoenix — Master Art Asset Catalog

**Reconciliation date:** 2026-11-22  
**Scope:** Witcher 3 White Orchard / Velen / Nilfgaardian Connection art-standardization program  
**Source baseline:** PHOENIX-Art-Creation-Session.md (Nov 22), subsequent user approvals in the current conversation, and GitHub `review/nilf-forged-framing` source inspection.

## Governance
- **LOCKED** = user approved visual reference, not necessarily exported, integrated, or field-tested.
- **RETAIN EXISTING** = do not redesign or generate new variants.
- **APPROVED STUDY** = approved exploration, not necessarily production default.
- **UNAPPROVED** = never silently promote to production.
- **PILOT IMPLEMENTED** = code exists; visual acceptance and production status remain distinct.
- Every approved family must preserve the established silhouette, proportions, material finish, and placement. Forged blue-gray steel plus brushed silver; worn parchment; no gold.
- New asset review: six numbered variants per sheet, one granular family at a time. User command **Lock** approves current set and advances to the next unfinished family.

## Reconciled register

| Family | Locked/available variations | Decision | Evidence | Follow-up |
|---|---|---|---|---|
| Parchment dividers | 1–12 | LOCKED | Session record | Production/export unverified |
| Walkthrough corners | 1–12 | LOCKED | Session record | Production/export unverified |
| Warning stamps | 1, 2, 4 | LOCKED | Session record | Other variants not approved |
| Walkthrough step numbers | Flat blue-gray serif; fine silver underline | LOCKED DEFAULT | Session record | Raised-marker study is not default |
| Raised walkthrough step-marker finishes | 1–6 | APPROVED STUDY | Session record | Not designated default |
| Map location-link rows | 1–6 | LOCKED | Session record | Production/export unverified |
| Map legend headers | 1–6 | LOCKED | Session record | Production/export unverified |
| Map Layers controls | 1–6; collapsed/expanded | LOCKED | Session record | Production/export unverified |
| Map Recenter buttons | 1–6 | LOCKED | Session record | Production/export unverified |
| Map Zoom in/out pairs | 1, 2, 4, 6 | LOCKED | Session record | 3 and 5 DISCARDED |
| Map toolbar Back buttons | 1–6 | LOCKED | Session record | Production/export unverified |
| Velen quest-map composition | Back/Layers/Recenter top; zoom/legend bottom | LOCKED | Session record | Illustrative terrain, not certified geography |
| Map-layer Progress checkboxes | 1–6; checked/unchecked | LOCKED | Session record | Production/export unverified |
| Body typography | #2 | LOCKED | Current conversation | Typeface identification/export pending |
| Header typography | H1–H6 | LOCKED | Current conversation | Set approved; usage mapping pending |
| Notes/context typography | N1–N6 | LOCKED | Current conversation | Set approved; usage mapping pending |
| Objective labels/metadata | O1–O6 | LOCKED | Current conversation | Set approved; usage mapping pending |
| Button label typography | Existing Velen/Nilf implementation | RETAIN EXISTING | Current conversation + GitHub CSS | No new variations |
| Section/card titles | S1–S6 | UNAPPROVED | Current conversation | Presented only; do not treat as locked |
| Nilfgaardian framing | Hub B1 / walkthrough B2 | PILOT IMPLEMENTED | GitHub review/nilf-forged-framing | Acceptance and reusable asset extraction unverified |

## Overlap adjudication — Set 01 (owner locked, 2026-11-22)
- **Standard text-only buttons B1–B10:** retain **original approved button treatment only**. The later raised / stronger-bevel treatment shown in `docs/framing-review/velen-buttons-batch-02/raised-*.jpg` is **not the production standard** and must not be promoted or propagated as a separate variant family.
- Preserve B1–B10's approved per-page rotation, silhouettes and labels from `docs/framing-review/text-only-buttons.jpg` and `text-only-buttons-b7-b10.jpg`.
- Existing implementation is **not automatically changed** by this art decision. A future implementation pass must audit any raised treatment already applied and propose a scoped correction before altering runtime CSS.
- This explicit owner decision supersedes contradictory raised-bevel language in older `ART-STANDARD.md` and framing review notes for the button family; those historical references remain preserved as evidence.

## Overlap adjudication — Set 02 (owner locked, 2026-11-22)
- **Vertical forged side rails V1–V9:** retain both the original V1–V3 and vine-inspired V4–V9 families.
- Preserve the approved interleaved rotation exactly: **V1 → V4 → V5 → V2 → V6 → V7 → V3 → V8 → V9 → V1**.
- Keep left/right rails paired per page, with staggered ornament heights and quiet steel stretches. Do not remove or regenerate either family as redundant.
- This decision confirms the existing `ART-STANDARD.md` and `docs/framing-review/README.md` specifications. No runtime code changed during cataloging.

## Overlap adjudication — Set 03 (owner locked, 2026-11-22)
- **Bottom-frame flourishes A–J:** retain all ten original approved variants, with the existing **A → B → C → D → E → F → G → H → I → J → A** rotation.
- Use one centered flourish per framed box, scaled to the lower rail and kept clear of reading content and controls. Do not stack competing ornaments in the same location.
- A–C and D–J are complementary approved members of one family, **not redundant families to delete**.
- This decision confirms `ART-STANDARD.md` and `docs/framing-review/README.md`. No runtime CSS or artwork changed.

## Overlap adjudication — Set 04 (owner directive, 2026-11-22)
- **White Orchard illustration / subject-variety / gameplay-sourced artwork:** **KEEP ALL** of this type of artwork. Do not treat overlapping subject matter as grounds for deletion, replacement, or consolidation.
- **Skip** this family in the current overlap-elimination review. No preference hierarchy was chosen among the three image treatments.
- Preserve existing assets, manifests, source credits and runtime bindings. No application files changed.

## Overlap adjudication — Set 05 (owner correction, 2026-11-22)
- **B: `dist/worn-vellum-r15.svg` is NOT ACCEPTED** as an approved parchment treatment. Do not present it as approved or as an equally valid alternative. Do not delete the historical file without a separate dependency audit.
- **Parchment is an asset family**, not a two-file binary choice. Audit and display all existing parchment-family assets and their real page applications before asking for any further selection or retirement.
- `ART-STANDARD.md` currently establishes `curled-vellum-r16.webp` as the default reading material. This does not automatically approve every other parchment asset or imply that there is only one approved member of the family.
- Set 05 remains **OPEN — inventory / visual comparison pending**. No runtime code or artwork changed.

## Related approvals to verify (not counted as certified production assets)
- Prior sessions approved various button frames, inset artwork, vertical vine ornaments, and parchment-body flourishes. Exact variant-to-file mapping must be recovered before marking these cataloged as complete.
- Latest Nilfgaardian combination recalled from prior work: checkbox 02, preparation tab 02, warning seal 02; verify source reference and placement before promotion to production baseline.
- Wolf medallion: detailed wolf approved, simplified geometric treatment rejected; exact canonical source still needs verification.

## Next step — production inventory gate
1. Enumerate source and exported files in GitHub for every LOCKED family; attach exact file path, revision, and visual reference.
2. Mark each as **source located**, **export pending**, **integration pending**, **mobile QA pending**, or **accepted**. Do not infer these from a mockup or approval.
3. Resolve uncataloged historical button/ornament/inset approvals without re-creating them.
4. Produce six-variant sheets only for genuinely missing approval families, after the inventory gate.
5. Keep all changes on a review branch; no guide-wide publication without user approval.

## Source record
Original library file: `PHOENIX-Art-Creation-Session.md`, dated November 22, 2026. Its 15 entries include 13 family groups when map-control subfamilies are grouped differently; preserve its entry-level distinctions. The present register adds decisions from the current conversation and implementation context, not claims of production completeness.


## Owner update · 2026-11-23 — five-format typography visual standard

**LOCKED visual sheet:** five-panel typography reference for approved parchment roles A–E: primary long-form hierarchy/body/note; quest reading/objectives; region tools/navigation; map layers/checklists; walkthrough headings/steps. Existing Body #2, H1–H6, N1–N6 and O1–O6 approvals remain in force; exact font/CSS mapping remains unverified. Button labels preserve the existing approved treatment. This lock governs the presented five-format composition and does not independently certify previously unapproved section/card-title variants S1–S6.

**Exception:** raised numbered walkthrough markers shown in the sheet are superseded by the previously locked **flat blue-gray serif number plus fine silver underline**. Do not use the raised markers.

**Cleanup:** historical/rejected variants may be retired in registry but not physically deleted until dependency mapping, replacements and regression tests pass. Parchment A–E is also locked; four historical parchment material files are retired for future work, but retained until safe replacement. See Owner Review Decisions for detailed deletion gates.
