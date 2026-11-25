# Phoenix master template inventory
2026-11-25 — Capt approved consolidation and reusable template specification. Documentation branch only; no runtime edits, merge or publication authorized. WH/RT preview remains at separate owner STOP.

## Governing sources
- ART-STANDARD.md: approved material, rotation and application rules.
- docs/ASSETS.md: existing family index; extend rather than replace.
- docs/approved-art/README.md: newer standalone review sets and Nilf Inn reference.
- docs/framing-review/README.md: legacy approved variants and placement proofs.
- docs/PAGE-TEMPLATE-INDEX.md: Velen master page contracts; full certification pending.

## Registry rules
Record stable ID, reference path, runtime path (or pending), approval evidence, surface, placement, states, rotation, component owner and verification status. Approval of a concept is not proof of a standalone production asset or shipped implementation. Preserve original approved variants and distinguish historical, rejected, candidate, locked-reference and runtime-verified status. Never infer approval from filename. Do not regenerate assets solely for cataloging.

## Batch 01 — framing and standard controls (source-derived)
| ID family | Approved reference | Rule | Runtime status |
|---|---|---|---|
| FRAME-BOTTOM A–J | docs/framing-review/box-flourishes.jpg; bottom-flourishes-d-j.jpg | Stable per box; A–J wrap; clear content | Individual runtime bindings pending audit |
| FRAME-RAIL V1–V9 | docs/framing-review/vertical-side-rails.jpg; vine-side-rails.jpg | V1,V4,V5,V2,V6,V7,V3,V8,V9; stable paired assignment per page | Pending audit |
| BUTTON-TEXT B1–B10 | docs/framing-review/text-only-buttons.jpg; text-only-buttons-b7-b10.jpg | One variant per stable page, equal peer dimensions, transparent outside rim | Pending audit |
| BUTTON-MATERIAL | docs/approved-art/simple-buttons/set-01-two-metal-review.webp; set-01-review.webp | Blue-gray steel faces, polished silver ornament, ivory labels; darkest sheet is limit | Pending audit |
| FRAME-HEADER | docs/approved-art/frames/README.md | Six approved standalone frames; independent scene inset | Individual paths pending |
| READING-SURFACE | dist/curled-vellum-r16.webp | Default reading parchment, dark ink | Named by standard; runtime verification pending |
| OBJECTIVE-CHECK 01–06 | docs/approved-art/objective-marks/set-01.webp | Open/complete paired; ink check; 02 next mockup candidate | Pending audit |
| DISCLOSURE-PAPER 01–06 | docs/approved-art/parchment-tabs/set-02.webp | Stable label and dimensions; silver plus/minus | Pending audit |
| WARNING-MARK 01,02,04 | docs/approved-art/warning-marks/set-03.webp | Triangle, oxblood seal, shield; dark pulse; 03,05,06 retired | Pending audit |
| PRIMARY-ACTION | ART-STANDARD.md; dist/home-rebuild.css | home-action-tile, centered ivory, dark overlay, silver-frame-r15.svg; phone stack | Pending audit |

IDs above are proposed registry namespaces, not renamed files. Existing approvals are carried forward, not reissued. Nilf Inn locked reference docs/approved-art/mockups/nilf-inn-three-set.webp: folded-leaf simple button 04, ivy inset frame 04, inn scene 02; live acceptance pending. Resolve how newer simple-button material references relate to B1–B10 without replacing either set by assumption.

## Next batches
Read individual family README files, extract exact accepted variants and paths, then trace runtime bindings. Map, navigation, typography, dividers, warning and other controls remain to inventory. Existing catalog contains more families than this first batch. No claim of exhaustive inventory or visual inspection. Build component specifications only after registry reconciliation; Velen certification, WO migration and Main Map sequence remain unchanged.

STOP: Capt review of registry conventions and unresolved conflicts before declaring complete master library. No production changes.

## Button reconciliation — 2026-11-25
Capt directed reconciliation and continuation. B1–B10 remain the standard text-button motif/shape rotation; six newer two-metal references govern finish and contrast, not a replacement rotation. Illustrated destination actions and parchment disclosure tabs remain separate semantic families. Preserve stable page assignment, equal peer dimensions, transparent exterior, restrained ornament, blue-gray steel, polished silver and ivory. Nilf Inn folded-leaf 04 remains a placement reference, not a global override of B1–B10. This is a documentation-level reconciliation; individual production assets and physical Safari acceptance remain pending. No runtime changes.

## Batch 02 — typography and reading surfaces
Source inspected: dist/appearance.js, dist/typography.css, dist/shared-walkthrough.css, dist/parchment-controls.css, dist/styles.css, ART-STANDARD.md.
- TYPE-BODY: default Fondamento (Calligraphy), alternatives Fell and Alegreya; fallback stacks in appearance.js; preference key phoenix-appearance-v1. Preserve user selection. Current model fixes scale at 100%; typography.css retains enlarged-size selectors, not evidence of an active size control.
- TYPE-THEME: follow device until manual day/night selection; persist manual selection. Preserve dark ink on reading parchment.
- TYPE-HIERARCHY: shared typography.css plus local walkthrough rules. Observed walkthrough title 26px/1.15, eyebrow 12px, facts 15px, objective name 16.5px/1.28, status 13px, warning body 16px/1.4; shared reading paragraphs/list line height 1.65. These are observed declarations, not computed or newly locked global sizes. Audit cascade before standardizing.
- SURFACE-READING: curled-vellum-r16.webp is approved default; paper controls scoped by material via parchment-controls.css; retain one reading scroll, dark ink, restrained approved dividers. Map, cards and navigation chrome are exceptions; retired Constellation references in art standard are historical.
- TYPE-CONTROLS: preserve wrapping, visible focus, accessible labels, minimum 44 CSS px where practical; navigation labels currently .75rem via typography.css. No new font or size decisions inferred.
- Pending: exact font binary paths, approved typography review sheet IDs, computed Safari hierarchy, contrast and actual surface bindings. No visual certification claimed.

## Button doctrine — Family 01 LOCKED by Capt
Standard B1–B10 text buttons serve routine actions and secondary/local navigation (Back, Return to Hub), not major illustrated destinations, disclosures or progress marks. Retain separate warning/destructive semantic treatments and specialized controls. Use newer two-metal finish, stable page rotation, equal peer dimensions and transparent exterior. Runtime verification pending.

## Family 02 — owner rejection of ornate frame
Capt explicitly rejected docs/framing-review/primary-action.jpg as framing for buttons containing inset world art. Retire this reference from that application; preserve historical evidence, do not delete binary or change runtime. Existing B1–B10 and content-panel frame approvals unaffected. Proposed replacement direction: thin silver perimeter, restrained corners, artwork dominant, ivory label, subtle depth. Replacement frame requires owner visual approval; Family 02 remains open. No implementation authorized.

## Button doctrine — Family 03 LOCKED by Capt
Retain all six designs in docs/approved-art/parchment-tabs/set-02.webp, matching collapsed plus and expanded minus states. One stable variation per page, independent of B1–B10. Exclusive use: expand/collapse information in place; never navigate, execute actions or modify progress. Preserve label and dimensions across states. Runtime verification pending.

## Family 04 — Search artwork rejected
Capt rejected dist/visual-art/region-tools/search.svg as destination artwork. Retain Search functionality and approved menu placement. Exclude this asset from future approved destination assignments; preserve historical file until authorized implementation. Replacement concept proposed: in-world investigation still life, lens and handwritten clues, restrained palette. No replacement approved or generated; WH/RT preview acceptance remains pending.

## Family 04 — Search replacement selection
Capt delegated final selection; Cmdr selected generated lighthouse option 2 (generation b875a6cf-ee7d-4efa-8943-20afa7f8cd32). Eldberg-inspired freestanding stone lighthouse, amber beacon, blue-gray coastal landscape. Permanent shared Search identity, no rotation. Supersedes magnifying lens concept. Artwork binary capture and production framing/integration remain pending; no runtime changes.

## Family 05 — LOCKED by Capt
Retain six variants in docs/framing-review/map-location-link/default.webp. Exclusive navigation from selected map marker to associated guide page. One consistent variant throughout Main Map; live wrapping location text, fixed trailing chevron, visible focus. No progress mutation. Understated link rather than raised button. Light/parchment adaptations and runtime implementation pending.

## Family 06 — LOCKED by Capt
Retain six treatments in docs/framing-review/objective-rail/default.webp. Numbered objective/walkthrough navigation only; large touch targets, wolf pointer, horizontal snap scrolling and bidirectional wrapping. Selection and completion distinct; selection never mutates progress. Stable variant per walkthrough page; no redundant Previous/Next on rail. Light/parchment adaptation and runtime verification pending.

## Family 07 — LOCKED by Capt
Retain approved objective-marks/set-01.webp and framing-review/status-marks/status-marks.webp designs. Interactive checkboxes exclusively control task/objective completion; status marks informational. Oxblood reserved for risk/warnings. Stable checkbox style per walkthrough; recognizable status symbols guide-wide; preserve three-second Undo. Failed, Missed and Unavailable distinct; final Missed mark deferred to Progress state-design gate. Runtime verification pending.

## Family 08 — LOCKED by Capt
Retain six warning-wolf/default.webp variants and warning-marks/set-03.webp 01,02,04 only. Silver wolf; unread badge alone pulses oxblood, stops on explicit acknowledgment; opening does not acknowledge and acknowledgment does not resolve risk. Static high contrast reduced-motion alternative; active warnings before history. Light/parchment adaptations and runtime verification pending.

## Family 09 — Zoom artwork LOCKED by Capt
All six new matched plus/minus pairs approved (generation 3e90394f-dd8c-471a-932f-b5947b5fbb49): refined bevel, clipped corner, inset diamond, split leaf, interlaced end, stepped steel. Supersedes prior Zoom selection; original sheet not recovered. Match pair dimensions, frames and materials. Binary capture and runtime integration pending. Remaining Family 09 application rules await explicit approval.

## Family 09 — application doctrine LOCKED by Capt
Back, Layers and Recenter match frame variation; one permanent Main Map decorative theme. Back restores exact walkthrough return state; Recenter restores opening view for entry context; Layers controls visibility; Progress toggles visibility only, never completion; Zoom matched pairs; Legend & Coverage disclosure in place. Silver icons, ivory labels, restrained steel frames, no inset world art. Binary capture of new Zoom sheet, light/parchment adaptations and runtime verification pending.

## Ornament Family 01 — LOCKED by Capt
Retain P01–P06 and D01–D06 in docs/framing-review/dividers/phoenix-parchment.webp and phoenix-dark-stone.webp. Major section boundaries only; stable rotation by section; match underlying surface; preserve proportions and fine detail; live headings; decorative only. Earlier studies and riveted crescent excluded. Production extraction and iPhone verification pending.
