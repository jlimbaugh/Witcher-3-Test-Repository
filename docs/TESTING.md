# Testing

## Current (canonical/phoenix)
Run `node --test *.test.cjs` from `dist/`. The suite has 356 tests (Order 017 measurement, 2026-11-23). Without baselines, 3 are skipped (`slice2-cache-tags.test.cjs` needs `PHOENIX_QA6_BASELINE`, `PHOENIX_QA5_BASELINE` and `PHOENIX_V45_BASELINE`). CI pins the candidate total in `.github/workflows/qa6-verification.yml` and requires zero skips with all three baselines supplied. The counts below (307, 271, 233 and others) are **historical** QA6-era expectations.

# Historical: testing on branch `fix/wo-save-preservation` (QA6)

Requirements: Node.js 24 (tested with v24.22.1). No npm install; tests use only `node:test` and the Node standard library.
All commands run from `dist/`. Art and fonts are in the tree, so no extra downloads are needed.

## Commits
- v45 snapshot: `d1df0e3e2c40cad172577f4725daa7233fc8c41e`
- QA5 candidate: `5ba73ace7d05551c877021de6e6fd0a2242a1e3a` (`recovery/v45-qa5`)
- QA6 candidate: `804a3a2c83529fdc707ca5278fb3bcf39d50d771` (application files). Later docs-only commits on
  `fix/wo-save-preservation` do not change `dist/`, `docs/rollback/` or `docs/RELEASE-FILES-QA6.sha256`; check with
  `git diff --stat 804a3a2c83529fdc707ca5278fb3bcf39d50d771 HEAD -- dist docs/rollback docs/RELEASE-FILES-QA6.sha256` (expected empty).

## Commands (QA6 commit)
    cd dist
    # 1. 6-file subset                                   expected 62/62
    node --test progression.test.cjs velen.test.cjs velen-routing.test.cjs main-story.test.cjs departure.test.cjs departure-checklist.test.cjs
    # 2. subset + Slice 1                                 expected 89/89
    node --test progression.test.cjs velen.test.cjs velen-routing.test.cjs main-story.test.cjs departure.test.cjs departure-checklist.test.cjs slice1-migration.test.cjs
    # 3. Slice 2 targeted                                 expected 38 pass + 2 skipped (no baselines), 40/40 with both baselines
    node --test slice2-cache-tags.test.cjs slice2-nilf.test.cjs slice2-save-guard.test.cjs
    # 4. QA6 targeted                                     expected 63/63
    node --test wo-save-guard.test.cjs storage-denied-startup.test.cjs home-candidate.test.cjs
    # 5. full suite                                       expected 305 pass + 2 skipped; 307/307 with both baselines
    node --test *.test.cjs

## With the v45 and QA5 baselines (removes both skips; byte-compares protected files, v45/QA5 tag tables, v45 save bytes)
    git worktree add ../../v45-baseline d1df0e3e2c40cad172577f4725daa7233fc8c41e      # from dist/
    git worktree add ../../qa5-baseline 5ba73ace7d05551c877021de6e6fd0a2242a1e3a
    PHOENIX_V45_BASELINE=$(cd ../../v45-baseline/dist && pwd) PHOENIX_QA5_BASELINE=$(cd ../../qa5-baseline/dist && pwd) node --test *.test.cjs   # 307/307
    git worktree remove ../../v45-baseline; git worktree remove ../../qa5-baseline

## Browser probes (QA6; author-supplied evidence; Node >= 22 + any Chrome/Chromium, no npm packages)
    # from the repo root, with the two worktrees above at ../v45-baseline and ../qa5-baseline
    CHROME_PATH=$(command -v google-chrome || command -v chromium) PHOENIX_WO_VALID_RECORD=qa/wo-save-preservation/fixtures/valid-record.json \
      node qa/wo-save-preservation/probe.cjs --build baseline=../v45-baseline/dist --build qa5=../qa5-baseline/dist --build qa6=dist --jobs 6 --out /tmp/results.json   # 144 runs, ~14 min
    node qa/wo-save-preservation/summarize.cjs /tmp/results.json
    CHROME_PATH=... node qa/qa6-returning-browser/returning.cjs --old ../qa5-baseline/dist --old-label qa5 --new dist --viewport portrait   # also --old-label v45, --viewport landscape
    CHROME_PATH=... node qa/qa6-evidence/render.cjs qa5=../qa5-baseline/dist qa6=dist                                                         # small JPEG renders

## QA5-era commands (kept for reference)

## Commands (QA5 commit)
    cd dist
    # 1. 6-file subset                                   expected 62/62
    node --test progression.test.cjs velen.test.cjs velen-routing.test.cjs main-story.test.cjs departure.test.cjs departure-checklist.test.cjs
    # 2. subset + Slice 1                                 expected 89/89
    node --test progression.test.cjs velen.test.cjs velen-routing.test.cjs main-story.test.cjs departure.test.cjs departure-checklist.test.cjs slice1-migration.test.cjs
    # 3. Slice 2 targeted                                 expected 37 pass + 1 skipped (no baseline), 38/38 with baseline
    node --test slice2-cache-tags.test.cjs slice2-nilf.test.cjs slice2-save-guard.test.cjs
    # 4. full suite                                       expected 270 pass + 1 skipped, 271/271 with baseline
    node --test *.test.cjs

## With the v45 baseline (removes the 1 skip; byte-compares the 17 protected files and v45 tags)
    git worktree add ../../v45-baseline d1df0e3e2c40cad172577f4725daa7233fc8c41e      # from dist/: creates <repo>/../v45-baseline
    PHOENIX_V45_BASELINE=$(cd ../../v45-baseline/dist && pwd) node --test slice2-cache-tags.test.cjs slice2-nilf.test.cjs slice2-save-guard.test.cjs
    PHOENIX_V45_BASELINE=$(cd ../../v45-baseline/dist && pwd) node --test *.test.cjs
    git worktree remove ../../v45-baseline

## v45 snapshot commit
    git checkout d1df0e3e2c40cad172577f4725daa7233fc8c41e && cd dist && node --test *.test.cjs      # expected 233/233

## Code-kit-only runs (no art)
Deleting the art reproduces the code-kit condition: exactly 5 failures (art existence checks in `diagrams-art`,
`exploration-art`, `navigation-art`, `visual-system`, `warning-center`), on v45 and QA5 alike. Re-checked for QA6 (images and fonts deleted
from a copy of `dist/`): 300 pass, the same 5 fail, 2 skipped; QA5 gives the same 5.

## Hash checks
    sha256sum -c docs/MANIFEST.sha256               # every tracked file at the QA6 commit (except the manifest itself)
    sha256sum -c docs/RELEASE-FILES-QA6.sha256      # the 13 QA6 release files (dist/ files that differ from or are new since v45)
    python3 docs/rollback/restore_and_verify.py --kit <checkout of d1df0e3e…> --qa5-kit <checkout of 5ba73ace…> --self-check
    # RELEASE-FILES-QA5.sha256 describes QA5 (commit 5ba73ace) and does not match this tree by design.

## Browser checks (not runnable from this repo as-is)
`docs/qa5-evidence/qa/returning-browser-check.cjs` and `cache-server.cjs` are LT's harness (author-supplied evidence).
They need Chrome/Chromium and `playwright-core`; the harness `require`s a machine-specific path
(`/tmp/fmt/node_modules/playwright-core`) that must be adjusted. Results: `docs/qa5-evidence/logs/returning-*.txt`, `qa/reports/`.
