# Operation Phoenix — Repository Audit, Stage 01
Date: 2026-11-23
Status: Capt initial findings — awaiting Grok independent review and user acceptance
Scope: GitHub repository structure, branches, and two full recursive trees. Read-only audit; this report is the sole new file.
Repository: jlimbaugh/Witcher-3-Test-Repository

## Verified evidence
- GitHub permissions response: admin=true, maintain=true, push=true, triage=true, pull=true.
- 35 branches returned by branches API (per_page=100); none marked protected in that response.
- main HEAD: 2ed8b866291dde2ca7758a64e3bf3091639ce63c
- docs/phoenix-art-master-catalog HEAD at inspection: 18f93866746101f34bf4a7267765a9466a6313e1
- Both recursive Git trees reported truncated=false.
- main: 143 total tree entries; 139 blobs; 13,684,664 summed blob bytes.
- docs/phoenix-art-master-catalog: 880 total tree entries; 832 blobs; 170,647,864 summed blob bytes.
- main extensions: 39 webp, 24 png, 10 svg, 16 js, 13 css, 20 md, 2 html, 2 cjs.
- catalog branch extensions: 348 webp, 40 png, 21 svg, 59 js, 36 css, 85 md, 8 html, 48 cjs, 64 jpg, 1 zip, and other types.
- Comparing exact case-sensitive paths in the two trees: 832 catalog-only blobs, 139 main-only blobs, 0 common paths. This does NOT by itself establish commit ancestry, deployment configuration, or why histories differ.
- The catalog branch contains docs/art/ material and many additional runtime/QA files; main contains older root-level assets and releases.

## Findings for independent review
F01 — CRITICAL TO BASELINE SELECTION: main and the catalog branch have disjoint path inventories. Confirm history/ancestry and identify the actual deployed site source before interpreting either as canonical.
F02 — REVIEW REQUIRED: 35 branches with multiple design, QA, release, and review lines. Classify active, archival, superseded, and protected workflows without deleting branches.
F03 — REVIEW REQUIRED: many assets, documents, and tests exist on review branch; audit production completeness against approved art, not simply image count.
F04 — INCOMPLETE VERIFICATION: read/write permissions verified; binary asset upload transport is NOT established by these permission checks.

## Grok independent review checklist
1. Reproduce branch count and both recursive tree inventories; flag any changed HEADs.
2. Verify whether the two branches share an ancestor, and whether main is deployed from its root, dist, or another source (GitHub Pages settings and deployment workflows).
3. Classify current authoritative branch(es) for live guide, QA, and approved art. Do not infer from branch names.
4. Explain the disjoint file-path result and whether it is expected.
5. Report discrepancies with GitHub URLs, full SHAs, and exact paths.
6. No edits, merges, branch deletions, asset replacements, or publishing during this review.

## Stage gate
STOP after Stage 01. Await Grok review and user acceptance before Stage 02.
Proposed Stage 02: provenance, branch ancestry, and deployment/build authority; Stage 03: production source inventory; Stage 04: art/asset integrity; Stage 05: tests, QA, and safety; later stages: content completeness, navigation/maps, and final consolidation.
