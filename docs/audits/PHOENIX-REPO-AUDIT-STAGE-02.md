# Operation Phoenix — Repository Audit, Stage 02
Date: 2026-11-23
Status: Capt findings — awaiting Grok independent review and user acceptance
Scope: Branch ancestry and deployment authority. No production modifications.

## Evidence
1. GitHub compare_commits(main, docs/phoenix-art-master-catalog):
   - status=diverged
   - ahead_by=138, behind_by=5
   - merge_base_commit=de288fe9f4415bef3cab0b9eae679ccdc0f35039
   - base commit=2ed8b866291dde2ca7758a64e3bf3091639ce63c
   - compare returned 300 file records; do not interpret that count as exhaustive.
2. main/index.html is a redirect document (meta refresh and JS location.replace) targeting:
   https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site
   This is evidence of an intended target, not proof of current uptime.
3. main/README.md states: Sites publishes the guide in a separate deployment step; files on main preserve older R-series guide; v49 accepted application should be reconciled to main through reviewed PR; Sites releases should record matching GitHub commit, deployment, rollback.
4. docs/phoenix-art-master-catalog/.openai/hosting.json specifies static.directory="dist". This is a configuration file, not proof of a live deployment.
5. docs/phoenix-art-master-catalog/.github/workflows/qa6-verification.yml defines verification on certain push/PR branches and manual dispatch; contains SHA guards and manifests. It is QA workflow evidence, not a deployment workflow.
6. index.html, README.md, hosting.json, workflow file were read from their exact branch paths. main lacks hosting.json and the QA6 workflow at those paths; catalog branch lacks root index.html and README.md at those paths.

## Findings
S2-F01 HIGH: Repository default branch is a redirect/legacy source, not necessarily the published application source.
S2-F02 HIGH: The catalog branch and main share an ancestor and diverged (138 ahead, 5 behind). Their disjoint file paths are explained by branch-level restructuring/deletions, but the specific change history remains to be reconstructed.
S2-F03 HIGH: Source-to-release provenance is not established for the current published Sites build. Do not claim that a branch or SHA is deployed without release/deployment evidence.
S2-F04 MEDIUM: QA6 workflow is scoped to specific branches and may not validate every current candidate; inspect coverage and current run status in a later QA stage.
S2-F05 OPEN: GitHub Pages settings and actual Sites deployment metadata were not available through the accessible GitHub endpoint; publication status remains unverified.

## Grok review requests
1. Independently verify merge base, ahead/behind, and whether branch changes intentionally replaced the old root app with dist/.
2. Identify the latest accepted application commit, release record, Sites deployment URL and deployment SHA using authoritative records; distinguish asserted vs verified.
3. Check whether GitHub Pages is active or the project is exclusively served via Sites. Provide proof, not assumptions.
4. Identify rollback SHA and current deployment's corresponding repository tree.
5. Recommend source-of-truth mapping for application, art, QA, and documentation. No merges, deploys, or changes.

## Stage gate
STOP. Await Grok report and user approval before Stage 03 (production source inventory).
