# PHOENIX — Owner Asset Review Decisions

## Batch 01 · 2026-11-23

Owner decisions (explicit):
- **01 Primary rolled parchment:** **HOLD**. Candidate `dist/curled-vellum-r16.webp`. Source reference identified; visual match / production acceptance NOT granted. Do not promote, replace, or delete parchment assets.
- **02 Existing accordion menu:** **APPROVE** the functional style shown in Velen/White Orchard screenshots. `dist/parchment-controls.css` is an identified CSS source, **not proof of exclusive control or final selector mapping**. Preserve cream inset, fine steel/silver border, dark circular +/- control, open/closed states. This is **visual/function approval**, not a runtime QA certificate.
- **03 Nilf forged buttons:** **HOLD**. Candidate `dist/nilf-forged.css`. Must match exact Velen/WO buttons and roles before promotion.

No creative replacements, variants, or deletions. No implementation, merge, deploy or V49/V50 change. Continue existing-source review batches; unresolved components remain on hold.

## Approval semantics
APPROVE = owner accepts identified treatment for stated role, pending exact source-selector binding and runtime QA. HOLD = no production promotion. Source-located does not imply visual match. Historical reference art remains evidence, not production authorization.


## Production approval · existing ornament families · 2026-11-23

The owner explicitly confirmed: **“These are all approved for production use.”** This confirmation applies to the three families immediately presented for review:

1. **Bottom flourishes A–J** — all 10 original approved variants, production design **LOCKED**. Rotation A→B→C→D→E→F→G→H→I→J→A.
2. **Vertical forged rail pairs V1–V9** — all 9 original approved pairs, production design **LOCKED**. Rotation V1→V4→V5→V2→V6→V7→V3→V8→V9→V1; keep paired sides together.
3. **Original forged text-only buttons B1–B10** — all 10 original approved variants, production design **LOCKED**. One assigned button variant per page; rotation B1→…→B10→B1.

**Approval scope:** These are authorized *visual production standards*. The owner does not need to reapprove the designs merely because individual exports or integrations are pending. This does **not** certify that individual production files exist, pass QA, or are deployed. Exact source/variant extraction and physical Safari checks remain technical gates, not new creative-approval gates.

**Exclusions:** Later raised/beveled redesign proofs are rejected; do not promote. No other previously held family is silently approved by this statement. No creative variants, substitutions, deletions, runtime edits, merges or deployments authorized.


## Batch 03 · production approval · 2026-11-23

Owner explicitly approved **all four** existing families/treatments for production use:
- **Parchment dividers 1–12:** APPROVED — original 12 designs; preserve exact visuals.
- **Walkthrough corners 1–12:** APPROVED — original 12 designs; preserve exact visuals.
- **Warning stamps 1, 2, 4 only:** APPROVED — do not restore or infer approval for 3, 5 or 6.
- **Walkthrough step numbers:** APPROVED — flat blue-gray serif with fine silver underline is the fixed production default; raised-marker study 1–6 is not promoted.

This is production **design approval**, not evidence that standalone exports, runtime bindings, or physical Safari QA are complete. Source identification and technical preparation remain pending. No creative generation, deletion, runtime modification, merge or deployment authorized.


## Batch 04 · map-control production approval · 2026-11-23

Owner explicitly approved the following **existing designs for production use**:
- **Map location-link rows:** 1–6 — APPROVED.
- **Map legend headers:** 1–6 — APPROVED.
- **Map Layers controls:** 1–6, with collapsed/expanded states — APPROVED.
- **Map Recenter buttons:** 1–6 — APPROVED.
- **Map Zoom in/out pairs:** **1, 2, 4, 6 only** — APPROVED; 3 and 5 remain discarded.
- **Map toolbar Back buttons:** 1–6 — APPROVED.
- **Map-layer Progress checkboxes:** 1–6, with checked/unchecked states — APPROVED.

**Scope:** original session-created visual designs, not new or reconstructed art. Production-design approval does not imply standalone variant exports exist or have passed functional, mobile or Safari QA. Locate source review sheets and original member files before extraction. No creative changes, substitutions, deletions, runtime modifications, merges or deployments authorized.


## Parchment review 02 · OWNER LOCK · 2026-11-23

Owner response to the immediately preceding five-format blank parchment mockup: **“Perfect lock this in!!!!!!!!!”**

**Approved visual authority:** the generated sheet titled **OPERATION PHOENIX — PARCHMENT REVIEW SHEET**, with five labeled empty parchment presentations:
- **A — Parchment Asset:** tall vertical full-length rolled scroll, empty reading field.
- **B — Quest / Reading Page:** broad horizontal rolled scroll.
- **C — Region Tool / Hub:** compact horizontal rolled scroll.
- **D — Map Tool Panel:** smaller utility scroll.
- **E — Walkthrough / Step List:** broad low-profile horizontal scroll.

**Shared locked appearance:** aged tan parchment, top/bottom rolled edges, distressed uneven outer edges, restrained botanical corner ornaments, warm natural weathering and stains, uncluttered blank writing field. Labels are review-sheet annotations, **not baked into production parchment**. The decorative dark sheet frame and title are presentation only, not automatically guide chrome.

**Authority and limitation:** this is a **newly generated visual mockup approved by the owner**, NOT a verified extraction of original Velen/White Orchard or GitHub parchment. Do not misrepresent it as existing original source. The owner's explicit approval authorizes these five mockup treatments as the production visual reference and supersedes the prior general parchment HOLD **only for these five treatments**. It does not promote `dist/worn-vellum-r15.svg` (explicitly rejected) or certify `dist/curled-vellum-r16.webp` as a visual match.

**Implementation gates:** preserve approved sheet/source image, obtain source-backed production-quality separate blank assets matching A–E, confirm fidelity and aspect ratios, map CSS selectors and usage roles, test responsive scaling and iPhone Safari. Do not invent a sixth family member, redraw or alter approved details, remove old assets, change runtime, merge or deploy without further direction.


## Parchment retirement and safe deletion order · 2026-11-23

Owner chose **option 2**: retire all prior parchment designs from the authorized production standard **now**, but **physically delete old files only after the five approved replacement parchment formats A–E are installed and tested**. Avoid broken reading surfaces or UI.

### Superseded files — RETIRE FROM FUTURE PRODUCTION, KEEP BYTES UNTIL SAFE
- `dist/curled-vellum-r16.webp` — currently referenced by reading/quest styles.
- `dist/worn-vellum-r15.svg` — previously rejected as visual standard; still referenced by multiple menus, warnings and controls.
- `dist/r10-paper.svg` — historical quest styling references.
- `dist/r10-haunted-scroll-concept.webp` — historical quest styling references.

**No deletion now.** Existing references may remain temporarily to preserve current guide behavior. Do not treat the retired files as approved visual standards for new work.

### Required deletion gates
1. Preserve the owner-locked five-format mockup as immutable visual reference and prepare exact faithful separate production assets A–E.
2. Install replacements with scoped CSS/runtime changes only under a separately approved implementation order; verify each existing dependency and fallback.
3. Test relevant Velen/White Orchard/Nilf routes, map tools, quest panels, menus, warnings, mobile portrait/landscape and iPhone Safari.
4. Confirm zero active references to the four retired paths across production entrypoints, CSS and manifests; review historical branches and source references separately.
5. Only then remove the four retired production files in a reviewed deletion commit; preserve historical design documents and references. No automatic deployment.

This decision authorizes the **safe retirement sequence**, not immediate removal, deployment or arbitrary creative changes.


## Typography review 01 · OWNER LOCK · 2026-11-23

Owner approved the immediately preceding five-panel **OPERATION PHOENIX — TYPOGRAPHY STANDARD SHEET**, saying **“Lock and clean up files accordingly.”** This is a locked visual composition for text on the five approved parchment roles:
- **A Primary parchment:** H1–H6 hierarchy, long-form body, note treatment.
- **B Quest / Reading:** quest heading, explanatory body and objective list.
- **C Region Tool / Hub:** region heading and navigation rows.
- **D Map Tool Panel:** map heading and layer checkbox labels.
- **E Walkthrough / Step List:** walkthrough heading and numbered objectives.

**Mandatory correction:** the mockup shows raised numbered step markers; these are NOT approved. The earlier owner-locked **flat blue-gray serif numbers with a fine silver underline** remain authoritative. Apply this correction to any production export or implementation. The sheet is an owner-approved *visual reference*, not proof of exact existing font identity, font sizes, CSS bindings, or source exports. Do not silently substitute typefaces, alter existing approved artwork, or infer production QA.

**Cleanup order:** mark superseded typography proposals and raised step-marker proofs as historical/retired for new production. Preserve the source and audit trail. Do not delete font files, CSS, assets, or screenshots while they have runtime or evidentiary dependencies. Audit selector mapping and replace/test before any physical deletion. No runtime edits, merge or deployment authorized by this docs-only registry update.


## Owner clarification · Velen canonical implementation · 2026-11-23

Owner directive: **“Menu functionality of Velen is the standard. Basically Velens artwork is 95% complete I just want to standardize every element we can to make scaling simpler.”**

**Authoritative implementation rule:** Use existing Velen menu behavior as the functional reference for guide-wide reuse: navigation, expanded/collapsed states, card selection, touch/vertical scrolling, and related menu interactions **as actually implemented and verified**. Do not replace functional Velen controls with newly invented menu behavior, static art, or alternate layouts. Velen artwork is considered **approximately 95% complete by owner assessment**; preserve and reuse it, and standardize its components rather than initiating a redesign.

**Scope of standardization:** Identify shared component roles, source selectors, art assets, style tokens, page patterns, states, and dependencies; eliminate unintended style drift through fidelity-preserving consolidation. Preserve previously locked A–E parchment/typography visual standards, A–J flourishes, V1–V9 rails, B1–B10 original button artwork, and approved map controls, subject to verified compatibility with the actual Velen reference. Existing CSS-native controls should remain functional. Document any genuine conflicts before changes rather than overwriting Velen.

**Priority change:** Audit and map reusable Velen implementations **before** treating missing individual decorative exports as blockers for all work. Recover individual exports only when actual reuse requires them. Do not reapprove already locked art or regenerate designs. No runtime change, merge, deletion or deployment is authorized by this record.
