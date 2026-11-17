# Phoenix R18 — Velen Arrival Pilot

Entry: `velen.html` from the existing Regions screen. White Orchard runtime engine and progress data are unchanged.

## Delivered

- Regional console with three illustrated, selectable Gwent-inspired cards; selection stays in place, opening is explicit.
- Four-stage Nilfgaardian Connection guide; separate Funeral Pyres guide and compact John Verdun encounter.
- Permanent owner hubs, confirm/cancel completion, persisted Undo, separate last-viewed stages and optional recorded decisions.
- Read-only completion references, main-quest completion correction independent of side marks, two next-lead summaries.
- Compact innkeeper and deferred-content pages; clear pilot boundaries and concept-art labels.
- Worn scroll materials, timber and iron/silver framing, readable calligraphy, shared font/theme preferences, 48px orbit controls.

## Validation

38 automated tests passed: 29 existing White Orchard progression checks and 9 Velen checks. Run from public repository root: `node --test progression.test.cjs velen.test.cjs` (private source layout: `node --test tests/progression.test.cjs dist/velen.test.cjs`). New JS syntax checked.

Chromium checks: stage viewing leaves completion untouched; Cancel leaves record unchanged; confirmed completion persists after reload; Undo reverses completion; Funeral Pyres owner mark mirrors into the main hub without completing the main quest; choice save and blank clear survive reload; Back/Forward returns to the expected hub/stage. Narrow 320/390px iframe layouts show no horizontal overflow, no broken illustrations, and 48px orbit controls.

## LT review orders — review only

Review the current main commit and live `velen.html`. Do not merge, deploy, change permissions or edit other repositories. Return confirmed defects with route, reproduction, expected/actual and severity; distinguish suspicions from observed failures.

1. Verify all three cards select in place; action links and resume maintain their distinct destinations.
2. Exercise each owner mark, Cancel, Confirm, reload, correction and Undo. Ensure no White Orchard save changes.
3. Navigate hub → walkthrough → stages → exact hub return, then Back/Forward, including nonzero scroll positions.
4. Record and clear both optional decisions, reload and Undo. Neither should infer completion.
5. Check Regions ↔ Velen, long titles, fonts/themes, keyboard selection and reduced motion.
6. Review quest facts, John’s local warning, inn dialogue spoiler placement, permanent owners and deferred content.
7. Review art crops, parchment legibility and phone controls; report concept art weaknesses separately from functional defects.

## Still pending

Real iPhone Safari/VoiceOver and physical gestures; blocked-storage device checks; final official quest-specific artwork/terms; Xbox field acceptance; full Baron/witch branches. Velen main map and constellation remain later work. Read VELEN-R18-SOURCES.md for source links and art provenance.
