# Testing (branch `recovery/v45-qa5`)

Requirements: Node.js 24 (tested with v24.22.1). No npm install; tests use only `node:test` and the Node standard library.
All commands run from `dist/`. Art and fonts are in the tree, so no extra downloads are needed.

## Commits
- v45 snapshot: `d1df0e3e2c40cad172577f4725daa7233fc8c41e`
- QA5 candidate: the child commit of `d1df0e3e2c40cad172577f4725daa7233fc8c41e` that adds this file (`git log -1 --format=%H -- docs/TESTING.md`).

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
`exploration-art`, `navigation-art`, `visual-system`, `warning-center`), on v45 and QA5 alike.

## Hash checks
    sha256sum -c docs/MANIFEST.sha256               # every tracked file at the QA5 commit (except the manifest itself)
    sha256sum -c docs/RELEASE-FILES-QA5.sha256      # the 10 QA5 release files
    python3 docs/rollback/restore_and_verify.py --kit <checkout of d1df0e3e2c40cad172577f4725daa7233fc8c41e> --self-check

## Browser checks (not runnable from this repo as-is)
`docs/qa5-evidence/qa/returning-browser-check.cjs` and `cache-server.cjs` are LT's harness (author-supplied evidence).
They need Chrome/Chromium and `playwright-core`; the harness `require`s a machine-specific path
(`/tmp/fmt/node_modules/playwright-core`) that must be adjusted. Results: `docs/qa5-evidence/logs/returning-*.txt`, `qa/reports/`.
