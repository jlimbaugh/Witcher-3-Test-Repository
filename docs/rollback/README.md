# Rollback — QA6 → QA5, QA6 → accepted v45 (and the QA5 → v45 procedure)

## QA6 (branch `fix/wo-save-preservation`)
Targets: **QA5** commit `5ba73ace7d05551c877021de6e6fd0a2242a1e3a`, or **v45** snapshot `d1df0e3e2c40cad172577f4725daa7233fc8c41e`
(= Sites commit `a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820`). Files only; never delete user localStorage. QA6 writes no new
storage records (it only stops writing a White Orchard record it cannot use), so no storage rollback is needed for QA6.

    git worktree add /tmp/v45-kit d1df0e3e2c40cad172577f4725daa7233fc8c41e
    git worktree add /tmp/qa5-kit 5ba73ace7d05551c877021de6e6fd0a2242a1e3a
    python3 docs/rollback/restore_and_verify.py --kit /tmp/v45-kit --qa5-kit /tmp/qa5-kit --self-check                 # 220 v45 + 487 QA5 kit files, 0 mismatches
    # QA6 -> QA5: restore 6, delete 2, verify 487 QA5 dist files
    python3 docs/rollback/restore_and_verify.py --kit /tmp/v45-kit --qa5-kit /tmp/qa5-kit --from qa6 --to qa5 --dist <deployed dist> [--dry-run]
    # QA6 -> v45: restore 5, delete 8, verify 181 v45 dist files
    python3 docs/rollback/restore_and_verify.py --kit /tmp/v45-kit --from qa6 --to v45 --dist <deployed dist> [--dry-run]
Exit 0 = PASS; exit 3 = target is not the QA6 release (`--force` overrides). Tested on copies of the QA6 `dist/`: both
rollbacks PASS and `diff -r` is byte-identical to the QA5 / v45 `dist/` (`qa/qa6-evidence/logs/rollback-test.txt`).

In git: `git diff --stat 5ba73ace7d05551c877021de6e6fd0a2242a1e3a <QA6 commit> -- dist/` (6 changed + 2 added files);
`git checkout 5ba73ace7d05551c877021de6e6fd0a2242a1e3a -- dist/ && git rm dist/wo-save-guard.test.cjs dist/storage-denied-startup.test.cjs`
(working-tree rollback; do not push to main).

QA6 manifests (in `manifests/`): `qa6-release-files.sha256` (13, = `docs/RELEASE-FILES-QA6.sha256`),
`qa5-dist-5ba73ace.sha256` (487 QA5 dist files), `qa5-restored-files-from-qa6.sha256` (6), `delete-added-files-qa6-to-qa5.txt` (2),
`v45-restored-files-from-qa6.sha256` (5), `delete-added-files-qa6-to-v45.txt` (8). Diffs: `qa6-reverse-to-qa5.diff`,
`qa6-reverse-to-v45.diff` (dist/ only, `git diff`).

---

## QA5 → accepted v45 (unchanged procedure; the script defaults are `--from qa5 --to v45`)

**Rollback target:** v45 snapshot commit `d1df0e3e2c40cad172577f4725daa7233fc8c41e` on this branch (= Sites commit `a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820`).
Files only; never delete user localStorage (see §3 of `BUNDLE-README-QA5-zip.md`, unchanged from the QA5 ZIP).

## In git
    git diff --stat d1df0e3e2c40cad172577f4725daa7233fc8c41e <QA5 commit> -- dist/        # 4 changed + 6 added files
    git checkout d1df0e3e2c40cad172577f4725daa7233fc8c41e -- dist/ && git rm dist/velen-nilf-*.js dist/slice2-*.test.cjs   # working-tree rollback (do not push to main)

## On a deployed directory (script)
    git worktree add /tmp/v45-kit d1df0e3e2c40cad172577f4725daa7233fc8c41e
    python3 docs/rollback/restore_and_verify.py --kit /tmp/v45-kit --self-check            # 220 kit files, 0 mismatches
    python3 docs/rollback/restore_and_verify.py --kit /tmp/v45-kit --dist <deployed dist> --dry-run
    python3 docs/rollback/restore_and_verify.py --kit /tmp/v45-kit --dist <deployed dist>  # restore 4, delete 6, verify 181
Exit 0 = PASS. Exit 3 = target is not the QA5 release (`--force` overrides). The script is the QA5 bundle script with one
addition, `--kit`, so it can use a checkout of the snapshot commit instead of the bundled kit copy.

## Contents
| Path | What |
|---|---|
| `restore_and_verify.py` | restore + sha256 verification (adds `--kit`) |
| `manifests/` | v45 kit sha256 (220), v45 restored files (4), QA5 release files (10), files to delete (6) |
| `slice2-reverse-qa5-to-v45.diff` | reverse unified diff QA5 → v45 |
| `slice2.diff` | cumulative diff v45 → QA5 |
| `prior-freezes/` | correction diffs (first freeze, QA3, QA4, QA5) and the QA4 rollback README |
| `BUNDLE-README-QA5-zip.md` | the ZIP bundle's README, verbatim (storage rollback §3) |

Excluded from the repo: the full prior-freeze trees `prefix-qa2…qa5` (3.2 MB each, reconstructable from this branch plus
the correction diffs) — they remain in `PHOENIX-v45-slice2-QA5-deliverables.zip`. See `docs/ASSETS-EXCLUDED.md`.
