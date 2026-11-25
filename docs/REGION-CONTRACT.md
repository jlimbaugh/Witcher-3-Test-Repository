# Region contract — v0 DRAFT (not certified)

> **Status: v0 DRAFT. Not certified, not locked, and not implementation authorization.** This file proposes reusable region interfaces for Velen certification (doctrine Phase 2). **Promotion to v1 requires Capt's STOP 3 acceptance of the integrated Velen template.** Until then, nothing here may be described as working, locked or guide-wide. Velen is the master (decision 1). Future regions share the framework but carry unique content and art (decision 3).
>
> Each row separates **what exists in code today** (source-inspected at `canonical/phoenix` `2dbc0bc`; Velen-specific unless stated) from **what is only proposed**. Proposed items are design targets. They do not exist as shared, region-generic interfaces.

**Legend:**
- **Exists (Velen-specific):** implemented for Velen only, not generalized.
- **Partial:** some pieces exist, but there is no shared interface.
- **Proposed:** not implemented.

| # | Contract | Exists today (evidence) | Proposed interface (NOT implemented) | Status |
|---|---|---|---|---|
| 1 | **RegionConsole** | `velen-r18.js` `consoleView()` renders the header, resume panel, quest-card carousel with selected panel, nearby stops, activities, Region Tools and a section jump. White Orchard uses separate renderers (`main-console.js`, `console-r16.js`) | One shared console renderer driven by region data. A **six-slot action deck** using approved two-metal buttons is a *proposal*: no six-slot console deck exists in code | Partial |
| 2 | **QuestHub → QuestCard → Walkthrough(stage)** | Velen grammar `#velen/quest/<id>/<stage>`, `#velen/hub/<id>`, `#velen/lead/<id>` (`velen-routing.js`); `shared-walkthrough.js` model; objectives in `phoenix.velen.<id>.objectives.v1` with Undo; Show on Map round-trip. White Orchard uses `#whiteorchard-tree` and its own walkthrough stack | A region-generic grammar `#<region>/quest/<id>/<stage>` and one walkthrough renderer for every region | Exists (Velen-specific) |
| 3 | **ActivityDeck** | `velen-r18.js` activity decks. `regional-registry.js` defines `stableIds`, but **no UI reads the registry yet** (file comment, v44) | Decks driven by registry ids, with art per activity | Partial |
| 4 | **ServicesList** | `#velen/merchants` route; White Orchard services exist only as map marker types in `map-data.js` | A typed services list shared by regions and maps | Partial |
| 5 | **RegionalTools** | Velen tools rail in `velen-r18.js` (`regionTools()`); search in `search-ui.js` | The same destination set in every region from one definition | Exists (Velen-specific) |
| 6 | **LocationRecord** | **Does not exist.** White Orchard has 64 markers with ids in `map-data.js`; the Velen map stops in `velen-nilf-map.js` are keyed by name only | `{id:'<region>:<slug>', region, name, point:{atlas, regional}, types[], taskIds[], sources[]}`, shared by regional maps, quest maps and the future Main Map (decision 7). Marker → details → return restores `{view, center, zoom, layer, selectedId}` (decision 8) | Proposed |
| 7 | **ProgressSource** | `velen-r18.js` `regionalProgress()` (Velen). White Orchard reads `progression-engine.js` directly. Engine states are complete / failed / unavailable / blocked / unknown / available | A per-region `regionalProgress()` returning the distinct states Unfinished, Completed, Unavailable and Failed. **Missed is not implemented** and stays deferred until its definition is finalized (decision 11, choice C) | Partial |
| 8 | **SaveKey** | The existing keys are listed in [ARCHITECTURE.md](ARCHITECTURE.md#storage-protected-never-rename-or-change-schema-without-migration-and-undo-coverage). They do **not** follow one pattern: `phoenix-appearance-v1` and `phoenix.velen.map.progress` are examples | A generic pattern `phoenix.<region>.<scope>.v<schema>` **for new keys only**. Existing keys are never renamed. Any schema change needs migration code and tests. No writes over unreadable saves; Undo preserved | Proposed (new keys only) |

**Shared, not per-region** (existing, guide-wide):
- six-destination wolf navigation (`navigation-art.js`, decision 12)
- approved art language with two distinct metals (decision 13)
- curated variations within locked rules (decision 14)
- warnings
- appearance

**Acceptance per contract:** visual, functional, accessibility, regression, and **physical iPhone Safari on a private preview for each Velen pattern, repeated before public release** (decision 19). Chrome emulation is not Safari acceptance. See the Order 018 acceptance matrix (issue #37 bundle).

**Open:**
- LocationRecord storage location.
- Main Map route name.
- Missed rules.
- Whether the console deck should have six slots.
