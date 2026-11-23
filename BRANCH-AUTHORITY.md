# Branch Authority — Operation Phoenix

Date: 2026-11-23
Status: Active during staged repository audit

## Current Baselines

| Branch | Role | HEAD (as of audit) | Notes |
|--------|------|--------------------|-------|
| `docs/phoenix-art-master-catalog` | **Active working / art / QA branch** | `2f9bb9c` | Contains full `dist/` tree, art catalogs, monochrome sketches, QA materials. Primary branch for ongoing work. |
| `main` | Older root-level baseline | `2ed8b866` | Smaller structure. Do not treat as current production source. |

## Rules

- No merges, deletions, or force-pushes until the staged audit is complete and an authoritative production branch is explicitly designated.
- New art assets go under `dist/art-velen/` (or a clearly named subfolder).
- Binary uploads larger than a few files should be performed locally or via zip to avoid API payload truncation.
- This document will be updated when the audit concludes and a single source of truth is chosen.

## Tags

- `baseline-catalog-2026-11-23` — catalog branch at Stage 1
- `baseline-main-2026-11-19` — main at audit start
