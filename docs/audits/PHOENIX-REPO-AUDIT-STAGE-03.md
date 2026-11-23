# Operation Phoenix — Repository Audit, Stage 03: Production Source Inventory
Date: 2026-11-23
Status: Capt initial findings; Grok independent review and user acceptance pending
Branch inspected: docs/phoenix-art-master-catalog
Audit scope: dist/ production source structure, entrypoints, declared dependencies. No runtime or asset modifications.

## Baseline
- Branch at Stage 02 completion: cc5bb2d8c00fa20829888c628ac73086690b3c4d; this report adds one documentation commit.
- Complete recursive tree: 588 blobs under dist/, totaling 137,145,798 bytes (sum of Git blob sizes).
- dist/ contains 7 HTML files: index.html, velen.html, character.html, velen-sources.html, wolf-dock-qa.html, art-white-orchard/credits.html, previews/inventory.html.
- dist/ contains 57 JavaScript files and 35 CSS files by .js/.css extension (excluding other extension types). These are inventory counts, not execution coverage.
- Repository tree has 37 files matching .test.cjs or .spec.js. Test pass/fail has not been run in this stage.
- dist/ includes images, fonts, documentation, art directories, and other assets. Asset integrity is reserved for Stage 04.

## Source-inspected entrypoints
1. dist/index.html is the primary multi-region guide shell. It declares 48 external script src references and 31 CSS link href references (counts from HTML regex inspection; inline script or conditional loads not counted). Its title is 'Witcher Field Guide · White Orchard'. Sources include white-orchard.js, map-data.js, map-ui.js, progression engine/UI, Velen modules, medallion, search, shared-walkthrough, app.js, and character-entry.js.
2. dist/velen.html is a compatibility entry page. It loads velen-routing.js and velen-entry.js; velen-entry.js redirects via location.replace to index.html plus shared Velen hash. Not an independent regional shell.
3. dist/character.html is a separate Character & Build Vault page with character.css, character-vault.js, character-gear.js, character-ui.js.
4. dist/character-entry.js transforms a Home console tile into a link to character.html on DOMContentLoaded.
5. dist/main-console.js defines regions including White Orchard, Velen, Novigrad, Oxenfurt, Skellige, Kaer Morhen, Vizima, Toussaint. Presence of region cards is not proof of completed regional content.
6. dist/regional-registry.js declares three Velen activities (nilf, pyres, mercy) and says it is a data-only registry; its comment states the Imperial Audience prerequisite is not tracked.
7. dist/BUILD-REVISION.txt identifies Session 3 combined release components and explicitly says independent QA and physical Safari acceptance pending. This file's content is a claim about that recorded build, not current acceptance proof.

## Findings
S3-F01 HIGH — The primary application is a large ordered, script-loaded HTML shell; load order and dependency contract should be tested against the exact HTML.
S3-F02 MEDIUM — Velen entrypoint is a redirect to shared shell; direct deep links and hash preservation require Safari regression tests.
S3-F03 MEDIUM — Character is a separate page with its own scripts and CSS; test navigation, state boundaries, and return paths.
S3-F04 HIGH — Visible region tiles do not imply full implementation; region content completeness must be assessed separately.
S3-F05 OPEN — Source inventory does not prove browser behavior, test results, live deployment, cache validity, or integrity of assets.
S3-F06 OPEN — Dist includes a large standalone inventory preview HTML; determine whether it is intended production content, prototype, or archive.

## Grok review checklist
1. Reproduce counts (588 dist blobs, 7 HTML, 57 JS, 35 CSS, 37 repository test files) at same commit, and identify discrepancies.
2. Parse all local CSS/JS references from dist/index.html, dist/character.html, dist/velen.html; verify every target exists and load order is valid.
3. Identify dynamic imports, assets referenced from JS/CSS, missing dependencies, and duplicated or superseded modules.
4. Test Velen legacy URL/hash redirect and Character navigation in Safari; report steps, expected vs actual.
5. Map the actual implemented routes/regions vs placeholder or pilot surfaces, with exact file references.
6. Identify the standalone inventory preview's release status.
7. No code changes or publishing; provide evidence with path, line, SHA and reproducible failures.

## Gate
STOP pending Grok independent Stage 03 report and user approval.
Proposed Stage 04: artwork and asset integrity (real binaries vs placeholders, formats, hashes, canonical source and approval mapping).
