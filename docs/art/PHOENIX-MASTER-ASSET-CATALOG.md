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
