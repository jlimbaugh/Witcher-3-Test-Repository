# Phoenix — Post Batch 04 Production Export Gap Audit

**Date:** 2026-11-23. **Scope:** Existing created/approved art only. Documentation audit, not an export or implementation.

## Production design approved; individual exports not established

| Priority | Family | Approved members | Evidence in repo | Individual export status |
|---|---|---|---|---|
| 1 | Bottom flourishes | A–J | `docs/framing-review/box-flourishes.jpg`; `bottom-flourishes-d-j.jpg` | NOT MAPPED |
| 1 | Vertical rail pairs | V1–V9 | `vertical-side-rails.jpg`; `vine-side-rails.jpg` | NOT MAPPED |
| 1 | Original text-only buttons | B1–B10 | `text-only-buttons.jpg`; `text-only-buttons-b7-b10.jpg` | NOT MAPPED |
| 2 | Parchment dividers | 1–12 | Nov 22 session approval; master catalog | SOURCE SHEETS NOT RECOVERED |
| 2 | Walkthrough corners | 1–12 | Nov 22 session approval; master catalog | SOURCE SHEETS NOT RECOVERED |
| 2 | Warning stamps | 1, 2, 4 | Nov 22 session approval; master catalog | SOURCE SHEETS NOT RECOVERED |
| 2 | Flat step numbers | one default | Nov 22 session approval; master catalog | CSS / font mapping unverified |
| 3 | Map location links | 1–6 | Nov 22 session approval; master catalog | SOURCE SHEETS NOT RECOVERED |
| 3 | Map legend headers | 1–6 | Nov 22 session approval; master catalog | SOURCE SHEETS NOT RECOVERED |
| 3 | Map Layers | 1–6, open/closed | Nov 22 session approval; master catalog | SOURCE SHEETS NOT RECOVERED |
| 3 | Map Recenter | 1–6 | Nov 22 session approval; master catalog | SOURCE SHEETS NOT RECOVERED |
| 3 | Map Zoom | 1, 2, 4, 6 | Nov 22 session approval; master catalog | SOURCE SHEETS NOT RECOVERED |
| 3 | Map Back | 1–6 | Nov 22 session approval; master catalog | SOURCE SHEETS NOT RECOVERED |
| 3 | Map Progress checkboxes | 1–6, checked/unchecked | Nov 22 session approval; master catalog | SOURCE SHEETS NOT RECOVERED |

**Do not mistake** `dist/map-icon-*.png` marker files for approved map control variants; `dist/visual-art/nilf-forged/brace.svg` and `rail.svg` for all A–J/V1–V9; or static JPEG contact sheets for transparent individual production exports. An individual export may exist outside the inspected repository or in an unreviewed branch; absence from current mapping is not proof it never existed.

## Other remaining decisions (not yet production certified)

- **Typography:** Body #2, H1–H6 headers, N1–N6 notes, O1–O6 objective labels were historically locked; exact font/CSS role mapping unresolved. Button labels retain existing Velen/Nilf treatment. Section/card title S1–S6 **UNAPPROVED**.
- **Parchment:** current owner's **HOLD** on primary rolled parchment; do not promote alternatives. `dist/worn-vellum-r15.svg` **NOT ACCEPTED**. Do not delete without dependency scan.
- **Nilf forged button CSS:** current owner's **HOLD**. This is separate from approval of original B1–B10 art.
- **Accordions:** approved functional visual treatment; selector/source verification and Safari QA pending.
- **Raised step-marker finishes 1–6:** study only; flat step number is production default.
- **Raised B button redesign proofs:** rejected for production.
- **Detailed wolf medallion:** historical approval, exact source mapping pending.
- **Illustrations:** preserve all White Orchard art families and existing Velen art; do not deduplicate.

## Source recovery / technical preparation order

1. Recover **original layered/editable source or clean per-member files** behind known framing sheets A–J, V1–V9, B1–B10. Do not crop JPEG review composites and claim clean, transparent production art.
2. Recover original Nov 22 session-generated sheets for dividers, corners, stamps and map controls from source/session records; check Git branches and available files. If absent, mark **SOURCE UNRESOLVED** rather than regenerating.
3. For each verified member record source SHA, exact visual ID, dimensions, alpha, usage, runtime selector and interaction states. Prepare only fidelity-preserving exports from original source.
4. Compare actual unchanged runtime to owner screenshots; then perform physical iPhone Safari QA. No release until explicit owner authorization.

## Missing new artwork determination

**ZERO new designs authorized or proven necessary by this audit.** The observed gap is **recovering originals, extracting production-ready members, and mapping functions**, not creating additional six-member families.

## STOP

No image generation, creative alterations, file deletion, CSS/runtime change, merge or deployment. This audit does not certify any individual export.
