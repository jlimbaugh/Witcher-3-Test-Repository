# PFC review package — Phoenix R7

CaptDrunk requested: build the questionnaire rules, test, then PFC review for improvement.

## Mission

Review this White Orchard pilot for defects and practical improvements. Do not edit, deploy, expand to another region, change permissions, or rewrite the accepted decisions. Return one report after reviewing the complete package. No PFC report has been received for R7 yet.

Live entry: https://jlimbaugh.github.io/Witcher-3-Test-Repository/#whiteorchard-tree

Repository: jlimbaugh/Witcher-3-Test-Repository, main. Previous baseline: fc768e2. The final release commit is supplied with the handoff; resolve that commit before reviewing. The ZIP contains matching source and SHA256SUMS.txt for reproducibility.

## Read in order

1. PHOENIX-QUESTIONNAIRE-R7.md — accepted behavior; overrides old ownership/routing rules.
2. PHOENIX-QA-R7.md — builder evidence and explicit limitations.
3. progression-data.js — 85 authored objective cards, prerequisites, conditional branches, milestones and three departure-sensitive quests.
4. progression-engine.js — pure transaction planning, availability, corrections and counts.
5. progression-ui.js, app.js, map-ui.js — dialogs, decks, groups, shared marks, navigation and map panels.
6. progression.test.cjs — run `node --test progression.test.cjs` from the source directory.
7. MAP-SOURCES.md, MAP-COVERAGE-R6.json and LEAFLET-LICENSE.txt — map provenance and coverage. Older release notes are historical.

## Priority adversarial cases

- Fresh progress versus migrated R6 completion: preserve marks but never invent story milestones or choices. Unknown progress must not be called confirmed.
- Finish a later objective after skipping guide updates. Review required ancestors, parallel paths, selected branches and missing choices; cancel must change nothing.
- Firestarter bribe versus Axii versus fight. Changing an existing choice must remove incompatible completion marks. Do not auto-complete alternate or optional objectives.
- Cargo escape fails Cargo only. Optional objectives must not prevent quest completion or contaminate the required denominator.
- Complete the last required objective, then undo. Compare the entire record, milestones and route notices, including after reload.
- Uncheck an upstream objective. Check the preview of dependent objectives and milestones across quests; verify correction and Undo.
- Active Missing in Action plus unstarted On Death's Bed at departure: preview Failed versus Unavailable accurately before confirmation. Undo and correction must restore availability.
- Main-map completeness versus cluster-only map. Show all markers must actually leave cluster scope. Service/signpost/station pins must stay map utilities.
- Shared activity checked from either cluster: both marks/counts update, activity stays in route order, guide returns to the initiating cluster.
- Multiple open groups plus horizontal and vertical tree scroll: exact return, browser Back, deep links and reload.
- Map pin → guide → map through both link and browser Back: same geographic viewport, zoom, type/search/completed filters and cluster.
- Merchant panel → specific Economy entry → map return. Verify flags against sources; do not accept invented inventory or uniqueness claims.
- Route notice opens the correct group and highlights the row; clears only the notice. Stale notices after progress corrections deserve scrutiny.
- Long contract deck on iPhone: horizontal swipe stays inside the deck, chapter/objective jump, reachable checkboxes, native modal scrolling, VoiceOver labels/focus and no permanent toast obstruction.

## Known content gaps — scrutinize these first

The mechanics are a tested pilot, not an accepted game-state oracle. Card labels are concise authored equivalents, not verified verbatim Xbox journal strings. The well contract is normalized from a source list containing duplicate/alternate conditions. Parallel order, skipped investigations and alternative starts require in-game validation before this can be a canonical journal tracker.

Level +5 filtering exists for recorded quest levels; many encounter levels are not yet encoded. Geographic access is not combat readiness. The route list is editorial and still needs a second-playthrough efficiency audit. Do not interpret a hidden row as proof no missable opportunity exists.

Three sourced departure risks are encoded for White Orchard. Conditions beyond this region are outside scope. Real iPhone Safari, VoiceOver, touch and Xbox acceptance have not been completed by the builder.

## Report format

For each defect: ID, severity, exact location, preconditions, reproduction steps, expected versus actual, evidence, and bounded suggested fix. Separate observed defects, source-model concerns and optional design improvements. End with acceptance blockers and recommended next pass. Do not rubber-stamp based only on the builder's tests.
