# Region contract — v0 DRAFT

> **Status:** draft for Velen certification (doctrine Phase 2). It becomes v1 only after Capt's STOP 3 acceptance of the integrated Velen template. It describes reusable shapes; it does not authorize code changes. Velen is the master (decision 1). Future regions share this framework with unique content and art (decision 3).

| # | Contract | Required behavior | Current reference implementation |
|---|---|---|---|
| 1 | **RegionConsole** | Region header and art plate; six-slot action deck using approved two-metal buttons; resume via `phoenix.guide.resume.v1` | `velen-r18.js` `consoleView()` |
| 2 | **QuestHub → QuestCard → Walkthrough(stage)** | Route grammar `#<region>/quest/<id>/<stage>`, `hub/<id>`, `lead/<id>`; return-to-hub restores position; objectives with Undo; Show on Map round-trip | `velen-routing.js`, `shared-walkthrough.js`, `velen-quest-cards.js` |
| 3 | **ActivityDeck** | Typed activities with stable ids from the regional registry; art per activity | `velen-r18.js` decks, `regional-registry.js` `stableIds` |
| 4 | **ServicesList** | Merchants, armourers and similar, as typed locations | `#velen/merchants` |
| 5 | **RegionalTools** | Search, maps and jump rail with the same destinations in every region | `velen-r18.js` tools rail, `search-ui.js` |
| 6 | **LocationRecord** *(not yet implemented)* | `{id:'<region>:<slug>', region, name, point:{atlas, regional}, types[], taskIds[], sources[]}`, shared by regional maps, quest maps and the future Main Map (decision 7). Marker → details → return restores `{view, center, zoom, layer, selectedId}` (decision 8) | WO `map-data.js` ids (seed); Velen stops currently name-keyed |
| 7 | **ProgressSource** | Per-region `regionalProgress()` rows using the distinct states Unfinished, Completed, Unavailable and Failed. **Missed is not implemented** until its definition is finalized (decision 11, choice C) | `velen-r18.js` `regionalProgress()` |
| 8 | **SaveKey** | `phoenix.<region>.<scope>.v<schema>`; migration code plus tests before any schema change; no writes over unreadable saves; Undo preserved | see [ARCHITECTURE.md](ARCHITECTURE.md#storage-protected-never-rename-or-change-schema-without-migration-and-undo-coverage) |

**Shared, not per-region:**
- six-destination wolf navigation (decision 12)
- approved art language with two distinct metals (decision 13)
- curated variations within locked rules (decision 14)
- warnings
- appearance

**Acceptance per contract:** visual, functional, accessibility, regression, and physical iPhone Safari on a private preview (decision 19). See the Order 018 acceptance matrix (issue #37 bundle).

**Open:**
- LocationRecord storage location.
- Main Map route name.
- Missed rules.
