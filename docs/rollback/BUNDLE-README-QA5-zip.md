# PHOENIX v45 Slice 2 (QA5) — self-contained rollback bundle

Target of a full rollback: the accepted v45 release, commit `a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820`.
Built by LT on 2026-11-16 from the hash-verified box copy of the v45 code kit (`rollback-checkpoint/v45-source-a9d61c94`,
identical to `baseline-untouched`, 220/220 sha256 OK). Nothing in this bundle has been deployed.

## 0. Contents
| Path | What |
|---|---|
| `v45-source-a9d61c94/` | Full accepted v45 code kit (220 files, includes `dist/`). Art/fonts are not in the kit and are not changed by Slice 2. |
| `manifests/v45-source-a9d61c94.sha256` | sha256 of all 220 kit files (paths start with `v45-source-a9d61c94/`). |
| `manifests/v45-restored-files.sha256` | v45 sha256 of the 4 files Slice 2 changed. |
| `manifests/qa5-release-files.sha256` | sha256 of the 10 QA5 release files (expected on the target before rollback). |
| `manifests/delete-added-files.txt` | The 6 files Slice 2 added; a full rollback deletes them. |
| `slice2-reverse-qa5-to-v45.diff` | Reverse unified diff, QA5 → v45 (`diff -ruN source baseline-untouched`). |
| `restore_and_verify.py` | Restore + sha256 verification script (files only; never touches browser storage). |
| `prior-freezes/` | Earlier rollback points: `prefix-qa2/` (first freeze), `prefix-qa3/` (QA2 freeze), `prefix-qa4/` (QA3 freeze), `prefix-qa5/` (QA4 freeze), their correction diffs (`slice2-corrections.diff`, `-qa3`, `-qa4`, `-qa5`) and the QA4 rollback README (`QA4-rollback-README.md`, kept unchanged for history; its §2–§5 storage notes still apply). |

Chain check (run by LT): QA4 source `-R slice2-corrections-qa4.diff` = `prefix-qa4`; `prefix-qa4 -R -qa3` = `prefix-qa3`;
`prefix-qa3 -R slice2-corrections.diff` = `prefix-qa2`; `prefix-qa5 + slice2-corrections-qa5.diff` = QA5 source; QA5 `-R slice2.diff` = v45.

## 1. Release files touched by Slice 2 (QA5)
Changed (restore the v45 copy):

| File | v45 sha256 | QA5 sha256 |
|---|---|---|
| `dist/app.js` | `dc471ec3efa2c41c1e56e0ee414737afa51ad1f5c4da0525cf873e61d5dac64a` | `e8fb57a86511c1eb1a17e8d746ec2045aab91d1fb86bf454cc044e9bbbfd26f2` |
| `dist/index.html` | `7664c678131ee21667c844ce0ec56f8316c5985796c365af38b9fa45bfb7e89d` | `673f1b8f73cb9a3dd619ed7aeb88c787d93b9a2d1b8c54b45d57d06e13cce4de` |
| `dist/velen-r18.js` | `5908676ffe5f29503e1fc40cc867dc6eadfda63cbc2f96b404d51c31ce3c12be` | `a6f24728b1c25b43a28cacab2a522d9be0b27453cf3602fcacb939cbf53cb898` |
| `dist/velen-view.css` | `a4784bcf5b667d4da921d0c781d8937a341d63d9c40707abc649dbcc0b1828a3` | `4b171890a5cef380db134efef891ad7518f0a0150510aed1ccdda6a8bc74e2cc` |

Added (delete): `dist/velen-nilf-objectives.js`, `dist/velen-nilf-progress.js`, `dist/velen-nilf-ui.js`,
`dist/slice2-nilf.test.cjs`, `dist/slice2-save-guard.test.cjs`, `dist/slice2-cache-tags.test.cjs`.

Restoring v45 `index.html` also restores the v45 cache tags (`app.js?v=regional-foundation-v45`,
`velen-r18.js?v=velen-shell-v43`, `velen-view.css?v=velen-shell-v43`, no nilf modules). Browsers that cached the
v45 files under those URLs will use them, which is correct after a rollback; browsers that only ever saw Slice 2 fetch
them fresh. No v45 file is reused under a Slice 2 URL, so no stale mix is possible in that direction.

## 2. Code rollback (files)
Order matters: run the **storage step (§3) first** while the Slice 2 code is still deployed, if you want it.

    python3 restore_and_verify.py --self-check                 # bundle integrity (220 files)
    python3 restore_and_verify.py --dist <deployed dist> --dry-run
    python3 restore_and_verify.py --dist <deployed dist>        # restore 4, delete 6, verify
    python3 restore_and_verify.py --verify-only --dist <dir>    # re-check at any time

The script aborts (exit 3) unless the target holds the exact QA5 release files (`--force` overrides, e.g. when rolling
back a QA4 deployment). After restoring, it verifies the 4 restored files, the absence of the 6 added files and every
one of the 181 v45 kit files under `dist/` by sha256; exit 0 = PASS. Tested on a copy of QA5 + full assets: result was
byte-identical to v45 + the same assets (`logs/qa5-rollback-restore-test.txt`).

Alternative: `cd <tree holding dist/> && patch -p1 < slice2-reverse-qa5-to-v45.diff` (then delete any empty added files).

Partial rollbacks: QA5 only (back to QA4) = copy `prior-freezes/prefix-qa5/dist/index.html` and delete
`dist/slice2-cache-tags.test.cjs` — **but that reintroduces the QA4 stale-`app.js` defect**; do not deploy QA4 that way.
Older points: see `prior-freezes/QA4-rollback-README.md` §3–§5.

## 3. Storage (browsers that already ran Slice 2) — never delete user localStorage
The file rollback above does not and cannot touch browser storage. Do **not** clear site data as a rollback step.

- Keys: legacy `phoenix.velen.arrival.v1` (owned by the v45 Velen view; Slice 2 never writes it) and canonical
  `phoenix.region.velen.v1` (Slice 1 import; Slice 2 hands `velen.nilf` ownership to it).
- Optional, before swapping code, in the browser console: `PhoenixVelenNilfProgress.rollbackHandover(localStorage)`.
  - `restored` — canonical record unchanged since the handover; the exact pre-handover text is put back.
  - `handover-edited` — Nilfgaardian progress was recorded after the handover; the record is **kept** (no data loss).
  - other statuses write nothing.
- Optional after `restored`: Slice 1 guarded rollback `PhoenixVelenMigration.rollback(localStorage)` — removes only an
  unchanged, sealed Slice 1 import record (cyrb53 fingerprint); preserves everything else.
- If you skip the storage step: v45 code ignores the `owners`/`handover` fields. The v45 Slice 1 import (unchanged file,
  runs on every load) returns `canonical-kept` and does not overwrite the Slice 2 record. Nilfgaardian completion in the
  v45 view then comes from the legacy key; objective marks recorded under Slice 2 stay in the canonical record
  (invisible to v45, visible again if Slice 2 returns). Verified in `logs/qa5-storage-rollback-check.txt`.
- QA5 adds no storage fields; QA4/QA3/QA2 field notes in `prior-freezes/QA4-rollback-README.md` §3–§5 still apply.
