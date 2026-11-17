# Shared walkthrough v1 (issue #4) - implementation record

Branch: `impl/issue-4-shared-walkthrough`, created from `implementation/shared-walkthrough-v1` (e7b8c2d,
"Accept WO-based walkthrough mockups for implementation"). Target of the implementation PR: `fix/wo-save-preservation`.
Author: LT (PHOENIX Lead Technician). Reviewer: Cmdr (independent review). Physical Safari checks stay with the owner.

This file is written before any protected file is edited (issue #4 build order 9) and is updated in the same PR with
results, limitations and the review checklist.

## What the issue orders (summary)

- One production walkthrough component with regional adapters for the White Orchard (WO) walkthroughs and
  The Nilfgaardian Connection (velen.nilf). Beast / Nilf first, then every affected WO walkthrough.
  Excluded: Pyres, Mercy, hub redesign, alternate Velen UI, P3.
- Match the approved mockups at 7ffd7fc: artwork, dimensions, hierarchy, semi-free horizontal scroll with centred
  snapping, fixed selector wolf, selected-only completion checkbox, inline warning expansion, actions first, optional /
  nearby and information dropdowns, navigation-only floating wolf, next-unfinished, last-viewed restoration.
- Keep the progress engines, confirmation and catch-up, route ownership, Undo, URL / deep link / return behaviour.
  Reading or selecting never records completion or a route choice.
- Totals and membership come from the recorded route (8 / 9 / 5 for velen.nilf), never hard-coded.
- Keep every stage reachable, including stages with no journal objective (for example taking the griffin contract).
- "Got it" only after auditing warning history ownership; reuse it; keep acknowledgment separate from completion;
  isolate the persistence change in its own commit.
- Keep every QA6 save guard. P2 is decided A (no route-choice cards; WO Story & correction controls).

## Design: rendering adapters, existing owners

`dist/shared-walkthrough.js` renders one layout from two adapters. It owns no progress, no choices and no storage.

| Need | Existing owner reused |
|---|---|
| Mark / unmark an objective, catch-up, confirmation dialog, Undo toast (WO) | `progression-ui.js` document handler for `input[data-objective-check]` |
| Same (velen.nilf) | `velen-nilf-ui.js` document handler for `input[data-velen-check]` |
| Optional objective status (WO) | `select[data-objective-skip]` handler in `progression-ui.js` |
| Story & correction controls (WO) | `data-story-update`, `data-undo-deck`, `data-quest-state`, `data-reconcile-legacy`, `data-edit-choice` |
| Story & correction controls (Velen) | `data-velen-quest`, `data-velen-undo`, `data-velen-reconcile`, `data-velen-edit-choice` |
| Reading position (stage) | existing routes `#<quest view>/<stage>` (`state.stageByView`) and `#velen/quest/nilf/<n>` (`phoenix.velen.arrival.v1` reading stage, existing guarded writer) |
| Nearby entries (WO) | stage `detours`, `PhoenixNearbyModel` status, `a[data-optional-stop]` return marker from `quest-pages.js` |
| Warning text | `PhoenixWarningCatalog` (context, short, consequence, cutoff, prevention), else the stage warning |
| Warning acknowledgment | medallion history (`phoenix.whiteorchard.warningHistory.v1`, written by `home-ui.js`) - see audit below |

Selection inside a stage (which objective box is selected) is kept in `history.state` and in memory for the page
session. No new storage key is added. Across a closed tab the stage is restored from the existing reading-stage
records and the first selector objective of that stage is selected.

Objective-to-stage map: the WO data has no such map, so LT authored one (`WO_STAGE_MAP` in the component; unit-tested
for full coverage). Stages with no required objective are attached as "Before this" / "Afterwards" blocks inside the
Information dropdown of the nearest selector objective, so they stay reachable without marks or totals.

## Protected files that need intentional edits (listed before editing)

| File | Pinned by | Why it must change | Kind of change |
|---|---|---|---|
| `dist/medallion.js` | PROTECTED (v45 sha) | Q6 A: the floating wolf is navigation only on shared walkthrough pages; queued global warnings must stay reachable (Warnings card) and visible as a pending mark rather than disappear. Also one new method to record a single acknowledgment for the selector wolf (Q3 B "Got it"). | rendering + one API method; no storage access in this file |
| `dist/home-ui.js` | PROTECTED (v45 sha) | Audit finding: it reads `warningHistory.v1` / `pendingWarnings.v1` and on a parse failure starts from an empty list and later overwrites the saved value. "Got it" adds writes to the same key, so the read must be guarded first (QA6 rule: never overwrite an unreadable record). | persistence guard, isolated commit |
| `dist/slice2-nilf.test.cjs` | release list | Move the two files above from the v45 PROTECTED table to a candidate pin table with history and reasons. No other pin changes. | test pins |
| `dist/slice2-cache-tags.test.cjs` | release list | `app.js` changes (one seam line), so its tag must move off `save-guard-qa6-v45`; add a candidate tag table and a stale-tag regression. | test |
| `dist/app.js`, `dist/index.html` | release list (QA6) | one seam line after the Velen view is created; new asset tags | seam + tags |

Not edited: progression engine, data and UI, quest-pages.js, velen-r18.js (SEAM pin unchanged), velen-nilf-*.js,
migration and handover. No content or progression change.

## Warning acknowledgment audit (build order 6)

- Owner: `medallion.js` keeps `records` ({id, text, href, at}); `acknowledgeWarning()` acknowledges every queued item
  at once and hands the list to `opts.onWarningHistory`. `home-ui.js` persists it to
  `phoenix.whiteorchard.warningHistory.v1` and paints "Acknowledged warnings for this guide".
- Enqueuers: `exploration-ui.js` (`crystal-skull-cutoff` on the Beast page), `departure.js` (`departure-risk:<ids>`),
  `home-ui.js` pending failed / unavailable notices (`phoenix.whiteorchard.pendingWarnings.v1`).
- Readers: `quest-pages.js riskVisible()` hides optional-stop risk notes once `crystal-skull-cutoff` or a matching
  `departure-risk:` id is in the history.
- Reuse: the selector "Got it" appends one record to the same history (no new key). The Crystal Skull warning reuses the
  existing id `crystal-skull-cutoff`, so the existing readers treat it the same way. Other objective warnings use
  internal ids `walkthrough-warning:<region>:<risk>`; ids are never displayed.
- Unread rule: unread unless the history holds a record with the same id AND the same text; a materially changed
  warning text is therefore unread again.
- "Mark as new" stays a mockup proposal (Cmdr) and is not implemented.
- Failure behaviour (to be verified): if the saved history is unreadable or storage is denied, nothing is written;
  "Got it" works in memory for the visit and says so.
