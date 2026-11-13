# Phoenix Home candidate — Cmdr QA

Date: 13 November 2026
Baseline: 1c91b66eeefb5ec99a357f1a18d7aeccfb53be31
Exact local candidate: c5d8042a1b573767e4f19481420a711c53622f13
Disposition: local review candidate. No remote application writes, merge, deployment, main, Velen, or story-content edits.

## Delivered

- Engine-backed selected quest: description, next required objective on the selected branch, required/optional counts, sourced level or unknown, canonical departure-risk notice. Legacy completion is identified without claiming its individual objectives were verified.
- Three selected-quest actions: walkthrough with existing stage resume, owning hub, cluster map. Existing card selection and history behavior retained.
- Compact current-region HUD with expandable category display filters. Filters are session-only. Whole-journey disclosure identifies unintegrated regions; Gwent collection has no invented percentage.
- Horizontal compact shortcuts. Regional map and Merchants work; Build, Gear and Alchemy are explicitly unavailable noninteractive tiles.
- Browse/Filter cluster map: immutable membership includes utility records and shared recommendations before hub-row filtering. Browse ignores progress eligibility. Current marker filters and completion visibility still apply. Empty filtered state has Browse and Update Progress buttons. Exact cluster return link corrected. Mode travels in history/capture, stripped from serialized progress context.
- Medallion: navigation fan, immediate canonical atomic Undo, full 3000ms visibility plus 900ms fade; reduced motion retains 3000ms and skips fade. FIFO warnings require acknowledgement, survive active Undo and reject cancelled cross-mode gestures.
- Warnings revalidate against current engine state after immediate or durable Undo. No independent 3900ms warning timer, no timer handles in the progress blob, no duplicated restoration handler.
- Acknowledged warning history and pending warning descriptors are stored under separate browser keys. Related guide pages show historical notices; pending descriptors are revalidated on load. History persistence/reload integration has source review, not full live browser certification in this pass.

## Executed verification

- Syntax: separately checked app.js, map-ui.js, progression-ui.js, console-r16.js, home-ui.js, home-panel.js, home-metrics.js and medallion.js.
- node progression.test.cjs: 29/29 pass.
- node home-candidate.test.cjs: 21/21 pass. Controlled DOM/timer unit harness executes the real medallion module, not a browser engine.
- Chromium live: startup and selection-in-place, selected quest three action routes, cluster Browse (15 pins for sampled Missing in Action cluster), progress Filter (11 in that recorded profile), medallion navigation, Back restoration, exact cluster return.
- Chromium live: first Missing in Action objective confirmed using existing review dialog, medallion Undo immediately reversed the atomic change; objective returned to unchecked. Test progress restored by that Undo.
- 390px iframe fixture (375px document content plus browser scrollbar): HUD expansion, category visibility toggle, day/night themes and page-width measurement; scrollWidth equals clientWidth. This is not a physical iPhone test.
- Startup log review showed browser-extension metadata messages; no application error observed.
- Application data files unchanged.

## Remaining acceptance work

- CSS disc is temporary medallion art, not final credited Witcher artwork. The fan is a functional candidate, not final Gwent art direction.
- Physical Safari, touch gestures, VoiceOver, Xbox, exhaustive focus/reduced-motion browser matrix and pending/history reload integration remain to verify.
- Full Home visual acceptance remains Capt's decision; unavailable systems destinations and Gwent card inventory remain explicit product gaps.
- White Orchard content completeness is not claimed. Stage B, Constellation redesign, merchant NPC cast and Velen expansion remain parked.

## Reproduce

Use an isolated checkout of the baseline, then run:

    git apply --check phoenix-home-candidate.patch
    git apply phoenix-home-candidate.patch
    node progression.test.cjs
    node home-candidate.test.cjs

Check each JS file individually with node --check. The zip includes the complete runnable source tree and assets, unified patch, this report, source hash manifest and screenshot evidence. It excludes preview-only fixtures, hosting configuration, Git internals and duplicate dist output.

## Branch implementation

Capt authorized applying this candidate with “Implement the changes.” All eleven candidate files are being committed atomically on phoenix-white-orchard-completion, preserving the newer branch documentation. This supersedes the earlier LT-only local-delivery hold for this Cmdr implementation. Main and hosting remain unchanged. The local candidate identity above records the exact tested source; remote blob hashes must match it before handoff.
