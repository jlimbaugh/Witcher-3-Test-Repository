# Home rebuild — Cmdr QA 01 and continuation order
13 November 2026. Application baseline: 1c91b66eeefb5ec99a357f1a18d7aeccfb53be31.
Standing design/build order: WHITE-ORCHARD-HOME-REBUILD-ORDERS-01.md (480b5c2).
Branch: phoenix-white-orchard-completion.

## Disposition
Partial work received. NOT apply-ready and NOT accepted as a working Home candidate. No application changes applied.
The metrics module is complete text, but the map delivery omits focusHub, capture/restore, controls and setClusterMode implementations, while index.html contains only labels/ellipsis. A /tmp file in LT's environment is not accessible evidence or delivery.
Do not request another authorization after each internal foundation module. The standing order already authorizes finishing the bounded Home candidate locally. Continue through metrics/HUD, panel/actions, medallion and map controls; return complete executable diffs or a specific technical blocker.

## Correction 1 — Browse membership must survive UI filtering
app.js currently mutates hub.items before map creation:
- removes mapOnly services/buffs/signposts and the warning;
- adds shared recommendations.
Therefore hub.items.slice() inside map-ui.js is NOT the original cluster inventory. It cannot by itself fulfill Browse all known assigned cluster pins.
Preserve a separate immutable original membership snapshot before the hub-row filtering, then combine it with current explicit recommendations where appropriate. Or derive a separate map membership registry without changing the rendered hub rows. Include mapped task homes and approved shared membership; deduplicate task IDs and keep each task's existing multiple physical pins.
Do not bypass this by showing all regional pins.
Tests must include at least one assigned service, buff/signpost, shared recommendation and duplicate-location task, plus exclusion of another cluster's unrelated pins. Compare fresh and recorded progress: Browse membership is stable, Filter remains engine-driven.

## Correction 2 — mode state is session-only
The proposal initializes clusterMode from state.map and restores it from mapContext. app.js persists the whole state and reloads mapContext. Merely calling it session-only does not make it so.
Keep the mode in ephemeral UI/history state; do not persist it in the authoritative progress blob or a permanent preference. Reconcile old contexts without crashing. Back/Forward and exact return restore the mode for that navigation entry; a new fresh session uses Browse. Preserve map pan/zoom and existing type/search/completed settings.
Normalize mode values to browse or progress-filtered; do not trust arbitrary stored strings.

## Correction 3 — controls and empty state must be real
Deliver valid HTML buttons with type, accessible names and pressed/selected state. Controls apply only to a cluster scope; Whole region / Show all markers remains clearly regional.
Filter's empty state needs actual working Browse and Update Progress controls, not only status text saying they exist.
Switching modes must never record story facts, clear a completion mark, change eligibility, leak regional scope or strand focus.
The complete patch must include all listeners, synchronization, focusHub behavior and capture/restore logic.

## Correction 4 — metrics need focused tests
29 existing progression tests do not validate home-metrics.js.
Use explicit ID/category rules rather than matching display names with /scavenger|valuables|deserter|dirty funds|treasure/. Renaming or translating a title must not change accounting.
Preserve unique task identity across hubs and pins. Services, signposts, warnings, reviewed-guidance and departure-review do not count. Treasure/scavenger hunts belong to Exploration only. This classification is confirmed by Cmdr; no owner question needed.
Test category membership, all-excluded marks, duplicate appearances, partial completion, fresh and legacy state, and no input mutation. Do not change counts merely because the display filter changes.
Define completion versus failed/closed/branch-inapplicable explicitly; display those states honestly instead of leaving a reachable-looking next objective for a closed path.
Velen has guide content, but is not integrated into these metrics. Say not integrated into this overview, not nonexistent or universally unavailable.
Gwent line: Collection not tracked yet is approved for the candidate; no 0%, invented denominator or inference from gwent-start. A real collection metric remains a full-acceptance gap.

## Cmdr decisions — no owner questions needed
- Build/Gear/Alchemy: preserve functioning Map/Merchants shortcuts. Where no actual destination exists, a candidate may show compact noninteractive status tiles explicitly labelled Not available in this build. Never give them fake links. Record these as incomplete requirements, not finished Home features. Do not omit the whole working row. Final acceptance still requires valid destinations.
- Treasure/scavenger classification: Exploration only.
- Gwent unavailable wording: approved as above.
- Medallion: locked Witcher identity, not a neutral ring as the final design. No appropriately identified medallion asset was found by the current repository filename/credits check. Cmdr owns final asset sourcing with LT support; do not ask Capt to upload one as a prerequisite. Build a replaceable art slot and complete the actual state/control behavior locally, flagging the art gap. A missing image is not a reason to stop the state-machine work, and a temporary art treatment must be clearly identified in the report.
- Continue HUD/panel/medallion under the existing state contract. No permission loop for already-authorized work.

## Delivery and validation
Return actual unified diffs with paths and complete hunks, including script loading and every new file, no omitted key hunks or local artifact references. Split into numbered file-sized messages if necessary. No remote writes, push, merge, deployment or Site update.
Add meaningful pure tests for the map selector and medallion transitions, including fresh Browse membership, filter empty controls, mode history, 3000ms plus fade, atomic latest Undo, FIFO warnings/acknowledgement, and tap-transition cancellation.
Use the supported Sites preview relay for local browser work when available; do not retry the known standalone-server isolation loop. State actual test/diff identity and limits.
Return one coherent candidate report with completed features, incomplete advertised destinations/metrics/art, fresh checks and exact local patch identity. This is still a partial candidate until all accepted Home requirements are implemented and Cmdr/Capt review it.
Standing boundaries remain: saved schema/IDs/quest source content/Velen unchanged; arrival-content/constellation rebuild/merchant NPC work parked. STOP after the complete candidate for Cmdr QA.
