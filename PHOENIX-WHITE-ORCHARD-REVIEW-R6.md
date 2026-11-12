# Operation Phoenix — White Orchard integrated review R6

12 November 2026 · Cmdr Chad · Owner: CaptDrunk

## Result

The native map is complete against the bounded, credited core inventory and integrated with the quest-first console. This is a reviewable pilot, not final iPhone or Xbox acceptance. Keep White Orchard as the pilot before copying the template to another region.

- 64 interactive pins, 17 marker filters, 59 activities, 13 fixed quest hubs, 44 walkthrough stages.
- All 57 original source records reconciled: two village enhancement records normalized to one physical point, leaving 56 core pins. Eight extension pins produce 64 total. Death by Fire already had a sourced position.
- Original CDPR terrain and symbols are served locally with Leaflet. No external map site, iframe or CDN is needed.
- Every pin opens its activity's assigned hub and row. Multiple pins can share one activity, so 64 pins do not mean 64 independent completion records.
- The discovery/service index now searches the mapped compact pages and routes to their hubs instead of listing only two sample locations.
- Existing task IDs and saved-progress key retained. Stage navigation remains separate from completion.

## Evidence from this build

| Check | Result |
| --- | --- |
| Syntax: app, map controller, route data | Passed |
| Source reconciliation | 57 records point to existing markers |
| Pin identities, coordinate bounds, mapped task/home references | All 64 passed |
| Owning hub, content and source for each activity | All 59 passed |
| Monster-nest filter | Three pins |
| New Cackler nest pin → Missing in Action hub → compact page | Passed |
| Exact tree return | Vertical 1045 px and horizontal 0 px restored; one hub remained open |
| Completion visibility | Nest filter 3 → 2 on completion; Show completed restored 3 |
| Keyboard Enter on completed nest pin | Returned to assigned hub; test completion then cleared |
| All markers after restoring test state | 64 visible |
| 390 px iframe in Chromium | Body client/scroll widths both 375 px; map 331 × 464 px; 64 pins; no broken map images |
| Preview runtime inspection | No application errors observed; browser-extension metadata errors excluded |

The phone-width iframe is a layout check, not Safari, VoiceOver or real touch testing. Prior R5 checks of map pan/zoom, deep-link focus exceptions, saved filters and keyboard navigation remain supporting evidence, not a substitute for this release's device acceptance.

## Consolidated improvement list

| Priority | Finding and evidence | Next action |
| --- | --- | --- |
| High: acceptance | No real iPhone Safari/VoiceOver or Xbox coordinate verification has been performed. | Field-test pan, pinch, clustered-pin tapping, browser Back, completion persistence and exact return on Capt's phone; compare representative pin positions in game. |
| High: content | Newly added encounter pages are compact sourced field notes. They do not certify enemy levels, stage availability or optimal route order. The selected-quest level +5 rule is editorial, not an eligibility engine. | Validate each assigned cluster against game progression before calling the route complete. Put specific risks at their triggering actions. |
| Medium: hub density | Missing in Action and Devil by the Well each own 11 activities. Signposts and services add checklist length. | Assess scrolling on the phone. Preserve the approved groups and fixed homes; only change presentation after field feedback. |
| Medium: map density | Sixty-four 44 px hit areas overlap at regional zoom, especially around the village. | Use filters, zoom and accessible marker list now. Evaluate touch selection before choosing any deconfliction treatment that could break in-game continuity. |
| Medium: completion meaning | Service visits, signposts and multiple quest-related pins use the same activity completion model. A hidden pin may reflect a completed shared quest, not independently looted ground. | Explain shared completion in coverage notes; decide later whether visit-only utility records should be visually distinct. Do not silently migrate saved progress. |
| Medium: presentation | Official scene artwork remains shared across many pages; new compact intros are functional and sometimes generic. | Later art/editorial pass should give important quests their location/character identity while retaining legibility and the accepted splash. |
| Low: navigation decision | Next/Previous still create browser-history entries. This preserves current behavior but can make Back traverse stages. | Owner field feedback should settle push versus replace; do not change it as part of map coverage. |

## Scope boundaries

Excluded intentionally: epilogue-only events including Faithful Friend, repeatable honeycombs, hollow-tree loot and loose unmarked containers. Core map coverage is complete against the specified dataset, not a promise of every lootable object in the game. Quest-start pins indicate the credited recorded location, not live NPC tracking. Departure uses the inn as an orientation anchor.

No repository permissions, Pages settings or other repositories were changed. No later region was built. The next acceptance target is this integrated White Orchard pilot.

## Audit files

- MAP-COVERAGE-R6.json: per-record reconciliation and exclusions.
- MAP-SOURCES.md: source commits, conversion, licences and credits.
- white-orchard.js: fixed homes and guide content.
- map-data.js: retained source coordinates and projected positions.

## Sources

Core map: https://github.com/witcher3map/witcher3map at 437241a978a13a1ca9114301d9ef887fadf4f260.

Extension: https://github.com/root-BB/witcher3map at b023eb7e882915308dfd4e20cb75249005902d5a.

Terrain: https://github.com/witcher3map/witcher3map-maps at df7fa74609df7587afc324e569d2574cf5b4f1ec.

Nest guidance: https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/monster-nests and the linked map-source records; treasure associations also checked against https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/hidden-treasure-white-orchard. Source pages in the activity registry provide the per-page references. See MAP-SOURCES.md for attribution and adaptation terms.
