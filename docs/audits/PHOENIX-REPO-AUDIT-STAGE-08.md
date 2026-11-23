# Operation Phoenix — Repository Audit, Stage 08: Consolidated Defect Register and Remediation Plan
Date: 2026-11-23
Status: Capt consolidation draft for Grok independent review and owner acceptance
Branch: docs/phoenix-art-master-catalog
Scope: Reconciliation of the seven existing audit reports, not new code verification. No production modifications or deployments.

## Evidence boundary
Source reports: docs/audits/PHOENIX-REPO-AUDIT-STAGE-01.md through STAGE-07.md, reopened on this branch before consolidation.
The stages are largely source/inventory inspections. They do NOT establish current browser behavior, a fresh test pass, live deployment provenance, external gameplay accuracy, or acceptance. The findings below are grouped risks and evidence gaps, not 42 independent confirmed runtime defects.
All Stage 01–07 reports explicitly await Grok review and user acceptance; no independent QA verdict has been provided to this consolidation.

## Consolidated prioritized register
ID | Priority | Evidence and source findings | Disposition / acceptance evidence
--- | --- | --- | ---
P0-01 | Release blocker | Production/deployment SHA and authoritative source not established; main and catalog branch diverged (S1-F01, S2-F01/F02/F03/F05) | Grok to identify accepted candidate commit, actual served deployment, exact source tree and rollback target; do not merge/deploy until matched.
P0-02 | Release blocker | Progress is split between legacy and canonical Velen records; rollback can reintroduce old risks (S5-F03, S6-F04, S7-F01) | Build storage-key owner matrix; test import/handover/undo/rollback on disposable copies with preexisting user saves; no clearing or overwriting.
P0-03 | Release blocker for portrait use | 59-image monochrome archive not ingested as real GitHub production binaries; tiny placeholders and tiny ZIP remain (S1-F04, S4-F01) | Verify original archive and file list, approved names, upload transport, actual binary bytes, WebP decoding and hashes before wiring images.
P0-04 | Release blocker | Current candidate independent QA, physical iPhone Safari and served-asset integrity not certified (S2-F03, S3-F05, S5-F01/F02/F04/F06) | Candidate SHA-pinned full tests, independent QA, real Safari/VoiceOver/returning-browser evidence, deployment checks.
P1-01 | High | Locked art families lack verified canonical-to-export-to-integrated mapping (S4-F02/F03/F04/F06) | Art matrix with source, owner decision, file, dimensions, implementation location, screenshot, Safari pass; no unapproved substitution.
P1-02 | High | Navigation, redirects, separate Character page, deep links and search may diverge (S3-F01/F02/F03, S7-F02/F04/F05/F06) | Route/dependency matrix and full navigation regression, including browser Back, reload, focus, history and save denial.
P1-03 | High | White Orchard and Velen maps differ in model and coverage; complete Velen map not established (S6-F07, S7-F03/F07) | Map inventory, pin-to-task linkage, routes, source provenance, empty states and mobile visual review.
P1-04 | High | Quest coverage and accuracy not certified; historical White Orchard ledger and Velen pilot do not reflect every current change (S3-F04, S6-F01/F02/F03/F05/F06/F08) | Recount current data, enumerate cards and stage ownership, verify quest-specific gameplay claims against appropriate sources and Xbox field evidence.
P1-05 | High | Region cards are not proof of implemented regions (S3-F04, S6-F07, S7-F08) | Region-by-region functionality and completeness matrix, mark planned vs partial vs complete.
P2-01 | Medium | CI triggers/pinned QA6 gate may omit current candidate (S2-F04, S5-F01/F05) | Define SHA-pinned candidate verification and report current run status; preserve historical QA6 safeguards.
P2-02 | Medium | Unclassified inventory preview and archival modules (S3-F06) | Mark production, preview, archived, or unused based on actual links/imports; do not delete without approval.
P2-03 | Medium | Branch sprawl and undocumented canonical source ownership (S1-F02/F03) | Branch/asset/source authority matrix, owner disposition before pruning.
P2-04 | Medium | Search status, warning history and Undo can be session-only or unknown under storage restrictions (S7-F05/F06) | Verify UI truthfulness and accessibility under denial; report expected/actual.

Priority definitions: P0 = must resolve or explicitly waive before related release; P1 = required for final standardized region acceptance; P2 = maintainability or scoped quality gate. These are proposed planning priorities, not an assertion every item is a currently reproducible bug.

## Canonical source-of-truth matrix — PROPOSED, pending independent verification
Domain | Current evidence | Proposed authority rule
--- | --- | ---
Deployed app | Stage 02: deployment source unverified | Exact served deployment SHA + release manifest, not branch name or README alone
Production source | Stage 03: dist/index.html primary shell on catalog branch | SHA-pinned tested candidate tree
White Orchard quest data | Stage 06: dist/white-orchard.js and dist/progression-data.js | Current code plus gameplay-verified ledger; historic R19 counts only baseline
Velen legacy owners | Stages 06–07: dist/velen-data-r18.js, dist/velen-r18.js | Legacy pyres/mercy until explicit, tested handover
Velen canonical Nilf | Stage 07: dist/velen-nilf-progress.js, dist/velen-migration.js | Canonical record with migration ownership and data preservation
Velen reading cards | Stage 06: dist/velen-quest-cards.js | Current source with separate verified progress/route matrix
Maps | Stage 07: dist/map-data.js/map-ui.js for White Orchard; Velen route/map modules separately | Region-specific source, no implied cross-region parity
Art approvals | Stage 04: docs/art/PHOENIX-MASTER-ASSET-CATALOG.md | Owner-locked decisions supersede contradictory older art text; only verified binary exports are production assets
QA | Stage 05: tests, CI workflow, release docs | Current SHA-pinned logs plus independent QA and physical Safari evidence
Rollback | Stage 05: docs/rollback and scripts | Verified safe restore for candidate, no browser progress clearing

## Proposed remediation sequence — no execution authorization
Gate A: Grok validates Stage 01–08 evidence, candidate SHA, and source/deployment/rollback provenance.
Gate B: Preserve and verify storage ownership and rollback safety before any code integration.
Gate C: Inventory and ingest genuine approved binary assets; resolve visual approval-to-production mapping without replacing approved art.
Gate D: Validate route, quest, map, search, and region matrices; classify missing versus intentionally deferred work.
Gate E: Fix owner-approved defects in small isolated batches with SHA-pinned tests and screenshots.
Gate F: Independent Grok QA, physical iPhone Safari/VoiceOver acceptance, owner signoff; only then consider publication.
Do not combine unreviewed art, save schema, and deployment changes in one patch.

## Grok independent review deliverable
1. Mark each P0/P1/P2 entry Confirmed / Rejected / Needs evidence, citing exact SHA/path/line and reproducible steps where applicable.
2. Identify duplicate findings and any missing cross-stage risk.
3. Reconcile authoritative app/deployment/rollback SHAs and actual branch roles.
4. Validate storage-owner and approved-art matrices.
5. Return proposed issue list with scope, acceptance tests, risk, dependencies, and review sequence.
6. Do not modify production, merge, deploy, clear storage or delete assets.

## STOP
Await Grok's independent Stage 08 consolidation review and owner approval. This document is not authorization to execute remediation.
