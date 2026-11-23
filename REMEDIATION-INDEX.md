# Remediation Index — Operation Phoenix

Date: 2026-11-23
Status: Planning baseline — Stage 8 independently reviewed; Gate A open
Branch: docs/phoenix-art-master-catalog

This is the living list of prioritized items from the Stage 8 consolidated register.  
**No remediation is authorized until the relevant gate is explicitly approved.**

## Gate Status

- **Gate A**: Open — release provenance (deployed SHA + rollback target) unresolved. See Stage 9 report.
- Gates B–F: Not started.

## Release Blockers (P0)

| ID | Item | Current Disposition |
|----|------|---------------------|
| P0-01 | Production/deployment SHA and authoritative source not established | Open (Gate A blocker) |
| P0-02 | Velen progress split (canonical Nilf vs. legacy Pyres/Mercy); rollback risk | Open |
| P0-03 | 59 monochrome sketches not ingested as real GitHub binaries | Partially addressed — tiny placeholders deleted; real binaries still local only |
| P0-04 | Current candidate independent QA, physical iPhone Safari, and served-asset integrity not certified | Open |

## High Priorities (P1)

| ID | Item | Current Disposition |
|----|------|---------------------|
| P1-01 | Locked art families lack verified canonical-to-export-to-integrated mapping | Open |
| P1-02 | Navigation, redirects, Character page, deep links, and search may diverge | Open |
| P1-03 | White Orchard and Velen maps differ; complete Velen map not established | Open |
| P1-04 | Quest coverage and accuracy not certified; historical ledgers are not current | Open |
| P1-05 | Region cards are not proof of implemented regions | Open |

## Medium Priorities (P2)

| ID | Item | Current Disposition |
|----|------|---------------------|
| P2-01 | CI is pinned historical QA6 guard; may omit current candidate | Open |
| P2-02 | Unclassified inventory preview | Open |
| P2-03 | Branch sprawl and undocumented canonical source ownership | Open |
| P2-04 | Search status, warning history, and Undo can be session-only under storage restrictions | Open |

## Remediation Gates (proposed)

- **Gate A**: Validate evidence, candidate SHA, and source/deployment/rollback provenance. **Status: Open.**
- **Gate B**: Preserve and verify storage ownership and rollback safety.
- **Gate C**: Inventory and ingest genuine approved binary assets.
- **Gate D**: Validate route, quest, map, search, and region matrices.
- **Gate E**: Fix owner-approved defects in small isolated batches.
- **Gate F**: Independent QA, physical iPhone Safari/VoiceOver, owner sign-off.

Update this file as items are addressed or waived.
