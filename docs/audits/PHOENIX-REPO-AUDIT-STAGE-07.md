# Operation Phoenix — Repository Audit, Stage 07: Navigation, Maps, Progress Ownership, Cross-Region Integration
Date: 2026-11-23
Status: Capt source-inspection findings; Grok independent review and user acceptance pending
Scope: docs/phoenix-art-master-catalog. No runtime changes, browser tests or deployment.

## Files inspected
dist/velen-routing.js, dist/velen-entry.js, dist/velen-migration.js, dist/velen-nilf-progress.js, dist/map-data.js, dist/map-ui.js, dist/main-console.js, dist/search-model.js, dist/progression-data.js, dist/medallion.js. Related findings cross-referenced to Stage 06.

## Verified architecture
- dist/velen-routing.js restricts Velen hash routes to quest/<id>/<stage>, hub/<id>, lead/<id>, map paths, merchants and deferred; invalid paths normalize to #velen. resumeHref accepts legacy nilf/pyres/mercy reading links only.
- dist/velen-entry.js forwards historical velen.html links to index.html with normalized Velen hash using location.replace.
- dist/main-console.js creates region selection, navigation cards, shared resume state at localStorage key phoenix.guide.resume.v1, and stores carousel positions in history.state. The region selector contains additional regions, but this does not certify their implementation.
- dist/map-data.js defines a 2560x2048 White Orchard image and markers. dist/map-ui.js renders with Leaflet, includes layer/filter and cluster browse/progress behaviors, pin/merchant panel logic, and graceful message if Leaflet is unavailable.
- dist/progression-data.js defines White Orchard objective progress and a White Orchard region entry; regional registry separately describes Velen.
- dist/velen-migration.js imports legacy Velen completion/choices from phoenix.velen.arrival.v1 into phoenix.region.velen.v1, preserves the legacy record, and applies a writer/fingerprint ownership guard to avoid overwriting edited canonical data.
- dist/velen-nilf-progress.js hands ownership of velen.nilf and inn choice to the canonical record. Its comments explicitly say pyres/mercy remain legacy-owned; canonical records can be blocked if unreadable or newer-schema. Migration rollback only removes an unchanged migration-owned record.
- dist/search-model.js builds White Orchard task/step records and Velen reading-card entries, and labels Velen completion as unknown when not owned by the provided progress state. Search indexing is not proof that every guide surface is indexed.
- dist/medallion.js contains navigation, Undo and warning history with explicit blocked/unavailable persistence reporting.

## Findings
S7-F01 HIGH — Velen split ownership (canonical Nilf vs legacy Pyres/Mercy) is deliberate but increases migration, rollback and whole-region progress reconciliation risk. Do not merge keys or reset saves without preservation tests.
S7-F02 HIGH — Navigation and content authority are distributed among main console, Velen router, legacy entry redirect, reading-card routes, search and medallion. Audit route consistency, deep links, browser Back, and direct Safari opening at current deployed SHA.
S7-F03 HIGH — White Orchard Leaflet map and Velen regional/map interfaces are separate implementations. Shared UI aesthetics do not establish common map data semantics or complete marker coverage.
S7-F04 MEDIUM — Resume state is separate from objective completion, and region carousel position uses history.state. Test history restoration, reload and return navigation independently of progress.
S7-F05 MEDIUM — Search model mixes White Orchard canonical task/step data with Velen reading cards; status may be unknown or reference-only. Confirm result destination, status meaning, expansion flags and region filter behavior.
S7-F06 MEDIUM — Medallion warning/Undo UI has session-only behavior when persistence is blocked; confirm warnings, acknowledgement, Undo occupancy and save failures do not falsely imply persisted state.
S7-F07 OPEN — Map source/coordinate provenance, full Velen marker completeness, map-control art alignment and user acceptance require separate verified matrix; no visual QA was performed here.
S7-F08 OPEN — Additional region cards are not proof of functional navigation or complete map/progress implementations.

## Grok independent review
1. Pin exact candidate SHA and produce a route matrix: Home, Regions, White Orchard, Velen hub/quest/lead/map, Character, Search, Medallion, legacy velen.html, direct URLs and Back/Forward.
2. Test hash normalization and valid/invalid deep links, including stage bounds and focus/scroll restoration.
3. Audit storage-key ownership (phoenix.velen.arrival.v1, phoenix.region.velen.v1, White Orchard progress, shared resume, warning history), writes and migration rollback; preserve existing user data.
4. Compare White Orchard map markers against task IDs and current region coverage; verify pin targets, browse/progress filters and empty states.
5. Compare Velen route maps and controls with owner-approved art and desired map semantics; distinguish visual prototype from production data.
6. Verify Search and Medallion destinations, warning history, Undo and persistence-denied behavior.
7. Perform iPhone Safari portrait/landscape and returning-browser tests, with exact steps, expected/actual, screenshots, SHA and severity.
8. No application edits, merges, storage clearing or publishing during audit.

## Gate
STOP pending Grok Stage 07 review and owner approval. Proposed Stage 08: cross-stage defect reconciliation, canonical source-of-truth matrix and prioritized remediation plan.
