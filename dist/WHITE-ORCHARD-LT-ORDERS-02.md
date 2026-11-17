# White Orchard — Cmdr disposition and LT Assignment 02
13 November 2026. Working branch: phoenix-white-orchard-completion.
Baseline application: de288fe9f4415bef3cab0b9eae679ccdc0f35039.

## Disposition of LT Assignment 01
Report received. Audit is partial, not a completed technical acceptance. WHITE-ORCHARD-COVERAGE.md and WHITE-ORCHARD-AUDIT-LT-01.md are not yet retrievable from the branch. Commit the two prepared files first and return their commit SHA; do not recreate or claim that Cmdr reviewed unseen file contents.

Cmdr independently counted map-data.js: 64 markers, 64 unique marker IDs, 56 distinct referenced task IDs, zero unresolved task references. Three tasks have no direct pin: q-beast, departure-review, q-incident. Those need an intentional mapping rationale, not invented coordinates. Total task count is 59. Shared references:
- gwent-start: inn, innkeep-1
- q-viper: viper-steel, viper-silver, banditcamp-5, crypt-entrance
- q-dirty: banditcamp-4, hidden-2
- q-devil: entrance-1, entrance-2, devil-contract, yellowed-diary

Therefore 64 versus 59 is not a coverage discrepancy. Correct that finding to distinguish markers, mapped tasks and all task records.

Cmdr reran progression.test.cjs: 29/29 passed. The historical R19 total of 38 combines White Orchard and Velen model tests; it is not a fresh browser/device verification. Cmdr's local Velen R20 changes are excluded.

The baseline already has objective/choice tracking in progression-data.js, progression-engine.js and progression-ui.js. app.js requests quest or activity progress handling. Do not characterize the system as only an owner-hub Confirm checkbox. Numeric array indices for hubs are ordinary array storage, not a defect when hub.id resolution works.

## Assignment 02 — explain existing completion marks
After committing Assignment 01 documents, implement a narrow presentation change to explain non-quest marks. Do not add gameplay content in this slice.

Add explicit descriptive completion metadata for the existing 46 non-quest tasks; use one definition per task shared by all appearances. Keep the current saved Boolean, IDs, save key, owners, progression schema, confirmation behavior, counters, availability and map-hide behavior unchanged. Metadata is descriptive, not a new state machine.

Definitions:
- Services (all nine): Reviewed service — player checked the service/location and what it offers; no purchase, repair, crafting or Gwent win is required. Optional spending must never be a completion requirement.
- Six Places of Power: Ability point drawn — the first ability point has been received in game; merely visiting or viewing the guide is insufficient.
- Signposts: Discovered — the fast-travel signpost was unlocked in game.
- Yennefer's crystal skull: Collected — the item was collected in game.
- gwent-start: Reviewed Gwent stop — the player reviewed the scholar/card-shopping guidance. This existing combined record is not proof of winning a specific card or buying every card. Do not manufacture separate card ownership from its saved mark.
- departure-review: Reviewed departure checklist — player reviewed the checklist; this does not mean all listed activities were finished.
- cow-pasture-warning: Read warning — player acknowledged the warning; never instruct cow farming as completion.
- Remaining exploration sites: assign a task-specific definition by inspecting existing guidance. Clear enemies where applicable and inspect/loot the listed site; never imply every linked chest was looted just because a shared quest was marked complete. If the action cannot be established from existing content, explicitly use Reviewed location guidance and flag it for Cmdr's content audit rather than inventing an objective.

Show the definition on the activity detail page and use understandable accessible completion labels. Shared quest/map references should explain that they share the activity/quest mark, not independently verified location clearance. Preserve the accepted hub-row density: no extra repeated paragraphs in every row.

Legacy note: earlier marks are preserved as recorded. Updated labels do not retroactively verify actions. Do not reset or silently reinterpret saved records as new evidence.

## Scope and validation
Likely files: white-orchard.js, app.js, progression-ui.js and focused tests if needed. Inspect actual rendering before choosing changes. Keep shared art/CSS and Velen untouched; do not change quest progression or require spending.

Verify all non-quest records have a definition; inspect actual labels and detail rendering; check existing saved true/false marks and Undo round-trip unchanged; run existing White Orchard progression tests and syntax checks. Test shared map references and source/owner navigation without claiming independent chest completion. Report browser evidence separately from static checks. Physical iPhone, VoiceOver and Xbox remain pending unless actually tested.

## Content queue owned by Cmdr
Faithful Friend is confirmed as conditional later-story White Orchard content, absent from the current prologue inventory. Source: https://www.gamebanshee.com/thewitcher3/walkthrough/faithfulfriend.php (checked 13 November 2026). It needs spoiler-gated later-return guidance; not an arrival task or universal prologue requirement. Do not import it in Assignment 02. Exact prerequisites, other missing content, merchant/Gwent details, missables and route accuracy remain under Cmdr audit.

## STOP
Commit only to the working branch. No merge, deployment, main/settings changes, Velen work, save migration or redesign. Return exact commit, files, test results, remaining uncertain definitions and reproducible defects. Wait for Cmdr QA before another slice.
