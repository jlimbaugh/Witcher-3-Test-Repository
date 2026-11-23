# Branch Authority — Operation Phoenix

Date: 2026-11-23
Status: Active during staged repository audit

## Current Baselines

| Branch | Role | HEAD (as of audit) | Notes |
|--------|------|--------------------|-------|
| `docs/phoenix-art-master-catalog` | **Active working / art / QA branch** | `2f9bb9c` | Contains full `dist/` tree, art catalogs, monochrome sketches, QA materials. Primary branch for ongoing work. |
| `main` | Older root-level baseline / redirect | `2ed8b866` | Smaller structure. `index.html` permanently redirects to the published Sites guide. Do not treat as current production source. |

## Divergence

- Common ancestor: `de288fe9` (R19 alignment commit, 2026-11-13)
- Catalog branch is ahead by ~138 commits and behind by 5 relative to main.
- File trees are disjoint; this is expected after the catalog branch restructured into `dist/`.

## Production Source (Stage 3)

See `SOURCE-INVENTORY.md` for the current entrypoint model:
- Primary shell: `dist/index.html`
- Velen: redirect via `dist/velen.html`
- Character: separate page
- Inventory preview: classification pending

## QA & Release Safety (Stage 5)

See `QA-STATUS.md`. Existing workflow is a pinned historical QA6 guard and does not automatically certify the current catalog branch. Recorded test totals are historical.

## Rules

- No merges, deletions, or force-pushes until the staged audit is complete and an authoritative production branch is explicitly designated.
- New art assets go under `dist/art-velen/` (or a clearly named subfolder).
- Binary uploads larger than a few files should be performed locally or via zip to avoid API payload truncation.
- Publication is a separate Sites deployment step. See `DEPLOYMENT.md`.
- This document will be updated when the audit concludes and a single source of truth is chosen.

## Tags

- `baseline-catalog-2026-11-23` — catalog branch at Stage 1
- `baseline-main-2026-11-19` — main at audit start
- `ancestor-r19` — merge base `de288fe9` (to be created locally)
- `stage-03-source-inventory` — Stage 3 baseline (to be created locally)
- `stage-05-qa-safety` — Stage 5 baseline (to be created locally)
