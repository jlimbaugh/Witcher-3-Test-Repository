# Navigation, Maps & Progress Ownership Status — Operation Phoenix

Date: 2026-11-23
Status: Stage 7 findings recorded — end-to-end regression testing still required
Branch: docs/phoenix-art-master-catalog

## Velen Progress Ownership (Split)

Deliberate dual ownership:
- **Canonical regional record**: Nilfgaardian Connection (`velen.nilf`) and its inn choice. Handed over via `velen-nilf-progress.js`.
- **Legacy ownership**: Funeral Pyres (`velen.pyres`) and At the Mercy of Strangers (`velen.mercy`) remain on the older arrival key.

`velen-migration.js` imports legacy data into the canonical record and includes ownership guards to avoid overwriting edited data. Migration rollback only removes an unchanged migration-owned record.

**Do not merge keys or reset saves without preservation tests.**

## Maps

- **White Orchard**: Coordinate-based Leaflet map (`map-data.js` + `map-ui.js`) with task-linked markers.
- **Velen**: Regional routing and newer map interfaces. Separate implementation.

Shared visual styling does not establish identical behavior or complete marker coverage.

## Navigation Authority

Distributed across:
- Main console (`main-console.js`)
- Velen router and entry redirect (`velen-routing.js`, `velen-entry.js`)
- Reading-card routes
- Search model
- Medallion (navigation, Undo, warning history)

Resume state is separate from objective completion. Region carousel position uses `history.state`.

## Rules

- End-to-end regression testing (deep links, browser Back, progress preservation, map behavior) is required before further consolidation.
- Additional region cards do not prove functional navigation or complete map/progress implementations.
- Preserve existing user localStorage during any testing or rollback.
