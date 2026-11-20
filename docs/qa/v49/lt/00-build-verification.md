# 00 · Build verification (LT independent QA, Velen v49)

*Author-supplied evidence (LT). Checked from the box on 2026-11-19 at about 8:52–8:54 AM Central (CST).*

## Result: the live site serves the v49 candidate `ba59252cb65800225a68297b6ce7068d3b91ff9b`

- Live URL: https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site/ (Cloudflare, `cache-control: public, max-age=0, must-revalidate`).
- **548 application files** (every file under `dist/` at ba59252, excluding `*.test.cjs`) were downloaded and compared by SHA-256 to `git show ba59252:dist/<file>`.
  - **540 files are byte-identical.**
  - **7 HTML files** (`index.html`, `velen.html`, `velen-sources.html`, `character.html`, `previews/inventory.html`, `art-white-orchard/credits.html`, `wolf-dock-qa.html`) answer `307` to their `.html` path and redirect to the extensionless route. After following the redirect they differ **only** by a 1,114-byte Cloudflare challenge-platform `<script>` injected by the host. With that removed, all seven match ba59252 exactly.
  - **`BUILD-REVISION.txt` differs as expected:** the served copy is the deployment provenance file (below). The repo copy at ba59252 still carries the older "Session 3 combined release" text. This matches the release record ("deployment provenance added to BUILD-REVISION.txt").
- Cache-tagged URLs fetched exactly as the page requests them also match ba59252, for example `deck-jump.js?v=velen-rail-tools-3`, `nilf-forged.css?v=velen-rail-tools-3`, `velen-r18.js?v=velen-rail-tools-5`, `velen-nilf-ui.js?v=velen-rail-tools-3` and `velen-quest-cards.js?v=velen-review-33`.
- Served `BUILD-REVISION.txt`:
  ```
  Phoenix Velen regional release
  GitHub candidate: ba59252cb65800225a68297b6ce7068d3b91ff9b
  Previous Sites release: v48
  Previous Sites source: 2d14fa6e75c4b1d5b1991564fe8fd75edd075177
  Previous GitHub application baseline: 93a2cf9
  Owner authorized publication before independent LT QA.
  ```
  The served file names the GitHub candidate but **does not name the Sites source** `02daa30f3799a45cd5b01433e777c1ac39d0b804` cited in the PR #24 assignment comment. LT has no Sites access, so the Sites source SHA is **not independently verified**. Only the served bytes are.

## PR tip and v48 relationship

- PR #24 tip (re-fetched): `cd6783ff628801a1f84b81064a3b74de4760c2a6`. `git diff ba59252 cd6783f -- dist` is empty, so the **application code at the PR tip is identical to ba59252**. The six commits after ba59252 change only docs.
- v48 baseline `93a2cf9e2bf080cf6c4a02c21b959d1d6734e08c`: **86 of the 548 served files differ from v48**. These are 54 new Velen card WebPs, `deck-jump.js` and `nilf-forged.css` (both new), the forged rail and brace SVGs, and changes to velen-r18, velen-quest-cards, velen-nilf-ui, shared-walkthrough, main-console, search, the index cache tags, and others. The live site is therefore **not** v48.
- Cache-tag changes from v48 to v49 in `index.html` include: `deck-jump.js?v=velen-rail-tools-3` (new), `nilf-forged.css?v=velen-rail-tools-3` (new), `velen-r18.js` quest-action-art-12 → velen-rail-tools-5, `velen-nilf-ui.js` velen-quest-art-11 → velen-rail-tools-3, `velen-quest-cards.js` velen-quest-art-11 → velen-review-33, `progression-ui.js` objective-progress-v35 → nilf-qa-fixes-2, and `velen-routing.js` velen-shell-v43 → quest-route-maps-35.

## Document conflicts noted (not test failures)

- `docs/RELEASE-VELEN-V49.md` records v49 as published, and the served bytes confirm it.
- Earlier docs on the PR (`NILF-RUNTIME-QA.md` "initial unpublished status") describe the first pilot. `LT-QA-VELEN-V49.md` says the release record governs. No conflict remains with what is served.

Raw data: `evidence/00-served-vs-ba59252.tsv` (file, HTTP code, v49 match, v48 match) and `evidence/00-served-BUILD-REVISION.txt`.

**Testing target for this pass:** the live site, which is v49 = ba59252. v48 comparisons use the local `93a2cf9` copy served from the box.
