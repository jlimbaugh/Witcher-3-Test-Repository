# Phoenix R7 — builder QA record

12 November 2026 · Cmdr Chad

## Delivered

Thirteen quest hubs, 85 objective cards and 64 map pins. Shared completion replaces owner-only marks. Optional groups collapse independently and show counts. Services/signposts/stations remain on the main map with compact panels. Cluster maps open guides directly. Recorded objectives and story milestones drive a bounded availability model; transactional review, choices, correction, catch-up and Undo are implemented.

Source files and scopes are listed in PHOENIX-PFC-BRIEF-R7.md. Official splash/art assets, repository permissions and other repositories were not changed.

## Automated evidence

`node --test progression.test.cjs`: 14 passed, 0 failed.

Cases: valid acyclic objective graph; required-only catch-up; choice gating; parallel hunt branches; departure failures/unavailability; cross-quest correction; legacy completion without invented milestones; Cargo escape isolation; declined catch-up not granting story facts; skipped optional counts; correcting a departed story; incompatible branch removal; chosen escort-path catch-up; optional closure after quest completion.

JS syntax checks passed for app, map controller, progression data, engine and UI.

## Browser evidence (Chromium preview)

- First arrival objective required confirmation of the arrival milestone.
- Jumping to the garrison objective offered the three missing intermediate required steps and garrison milestone. Confirmation changed 1/8 to 5/8; one Undo restored 1/8.
- Overall Firestarter completion blocked confirmation until a path was chosen. Bribe produced 5/5 complete; escort card stayed visible as Unavailable — alternate path chosen.
- Missing in Action's cluster rendered only its eligible pins (11 in the test state). No merchant/signpost checklist rows.
- Cackler nest pin opened its compact guide directly. Return link restored image geometry exactly in a measured pass: x346, y94, width538, height431 relative to map canvas, same cluster and filters.
- Browser Back restored the map and scope. A measured second pass differed by one rendered horizontal pixel after Leaflet center rounding; dimensions and vertical position matched. Real-device tolerance remains unaccepted.
- Willis panel showed the quest connection and Economy link; that link reached the Willis entry.
- Cemetery completion checked in the Viper cluster appeared checked in the griffin cluster. Test mark then cleared.
- Two optional groups stayed open after a guide return. A focused-link return restored tree x0/y1058 exactly.
- Active Missing in Action plus unfinished On Death's Bed: departure preview listed Failed for Missing and Unavailable for Death's Bed before confirmation. Confirming showed Failed; Undo restored the active 1/5 record.
- 390 px iframe: body clientWidth375 and scrollWidth375. Objective rail286 px; card263 px. No horizontal page overflow. This is not a Safari/touch/VoiceOver test.
- Source-linked objective search/jump, separate optional count, and update controls present. Undo toast expires after eight seconds; the progress deck retains an Undo control.

## Test-state discipline

Browser actions changed preview-origin sample progress, never a player's game save. Published-origin acceptance smoke should avoid modifying Capt's stored completion. R6 storage key and IDs are retained; new progression state is additive. Legacy completed quests are labeled Saved complete — objectives unconfirmed until reviewed.

## Limits

These checks validate selected interaction paths, not every permutation. Exact journal fidelity, optional/parallel prerequisite truth, encounter eligibility, best route order and real iPhone/Xbox behavior remain PFC/field-review targets. No external PFC opinion has been obtained or represented as completed.
