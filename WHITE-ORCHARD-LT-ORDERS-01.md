# Operation Phoenix — White Orchard completion: LT assignment 01

Owner: CaptDrunk. Commander: Cmdr Chad. Engineering: LT.
Date: 13 November 2026.
Baseline: de288fe9f4415bef3cab0b9eae679ccdc0f35039 (R19).
Working branch: phoenix-white-orchard-completion.

## Mission and current authority

Finish White Orchard before expanding Velen. Preserve the accepted White Orchard visual and interaction template. Velen R20 is parked and is not part of this branch.

Normal workflow: Cmdr audit and orders → LT implementation and report → Cmdr QA and coordinated corrections → CaptDrunk field acceptance and release approval. PFC is an on-call specialist for a specific obstacle or troublesome file. No standing PFC review gate, routine packets, or mandatory two-report wait.

This is the first bounded assignment, not the final project process or operating guide. Those documents follow White Orchard acceptance and must describe the workflow actually proven.

## Assignment 01: establish the technical coverage ledger

Audit the baseline before changing guide content or behavior. Cmdr owns independent gameplay research and reconciliation of missing content. LT owns the implementation inventory, link/ownership checks and engineering findings.

Create WHITE-ORCHARD-COVERAGE.md and WHITE-ORCHARD-AUDIT-LT-01.md on this branch. A completed inventory is not proof of complete regional coverage.

Starting counts observed in white-orchard.js: 59 tasks, 13 hubs, 13 quest records, 44 walkthrough stages. Earlier R6 notes assert 64 pins. Recount and report current data; do not silently treat an old report as current proof.

For each task record include:
- Exact ID and name; type; owner hub; view/deep link.
- Walkthrough stage count or compact-section content.
- Source references present; source verification remains separate.
- Links from hubs and maps; missing, orphaned, duplicate or conflicting ownership.
- Completion meaning: quest resolved, site cleared/looted, ability point drawn, service visited, signpost discovered, or informational warning. Flag ambiguous records; do not migrate or change saved marks.
- Content status: substantive guidance, compact guidance needing review, placeholder, or missing.
- Technical status and evidence; distinguish static inspection, automated check, browser observation, and untested device behavior.

Reconcile maps separately: count pins, unique task references and completion records. Multiple pins do not imply multiple independent activities. Check coordinate bounds and reference integrity; do not claim Xbox coordinate accuracy from bounds checks.

Audit actual coverage of service/NPC guidance, Gwent, six Places of Power, encounters, treasure hunts, missable items, departure checks, and later-return content. Missing candidates need research, not invented coordinates or stage dependencies. Explicitly revisit R6 exclusions such as Faithful Friend for the full-region scope. Random loose containers and repeatable loot need a documented scope boundary rather than an impossible exhaustive checklist.

## Verification

Run existing progression tests and JS syntax checks. Check task → hub → view, all local links, map → task → owner, missing assets and duplicate IDs. Inspect save loading, completion/Undo and stage-resume code for risks; do not modify the schema.

Browser checks, if available: selection stays in place, selected actions match selection, exact hub return, Back/Forward, refresh/resume, keyboard focus, 390 px layout, map filters and completed-state visibility. Record failures or unavailable checks honestly. Chromium is not physical iPhone Safari or VoiceOver. Cmdr prepares exact device checks for CaptDrunk when a candidate is ready.

## STOP boundary

Documentation and read-only audits only. Do not edit application code, artwork, game guidance, save keys, IDs, main, repository settings, or hosting. Do not merge, deploy, or copy Velen changes. Do not redesign accepted controls. If a check needs a changed fixture, use temporary local test state and report it.

Return one report with exact commit SHA, changed files, commands/results, findings by severity with file/ID and reproduction evidence, limits, and proposed first repair slice. Do not label White Orchard complete or advance to Velen. Await Cmdr's next bounded implementation order.
