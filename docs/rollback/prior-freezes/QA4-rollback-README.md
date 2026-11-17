# v45 Slice 2 rollback checkpoint

`v45-source-a9d61c94/` is a copy of the untouched accepted v45 code kit (commit `a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820`).
`v45-source-a9d61c94.sha256` lists its 220 files. Verify it with:

    cd rollback-checkpoint && sha256sum -c v45-source-a9d61c94.sha256

(QA3: corrected. The listed paths start with `v45-source-a9d61c94/`, so run this from `rollback-checkpoint/`, not from inside the copy. Verified: 220/220 OK.)

## 1. Code rollback
Replace the deployed `dist/` code files (Slice 2 including the QA2 and QA3 corrections) with the copies in `v45-source-a9d61c94/dist/`. Then delete the three
Slice 2 files: `velen-nilf-objectives.js`, `velen-nilf-progress.js` and `velen-nilf-ui.js` (plus `slice2-nilf.test.cjs` and `slice2-save-guard.test.cjs` from the kit). Restoring the v45 `velen-r18.js` also removes the QA3 save guard.
Art and fonts are unchanged by Slice 2, so no asset rollback is needed.
You can also reverse-apply the diff: `cd source && patch -R -p1 < ../slice2.diff`, run from a tree whose root holds `dist/`.

## 2. Storage rollback (browsers that already ran Slice 2)
Slice 2 writes only `phoenix.region.velen.v1`. It never writes the legacy key `phoenix.velen.arrival.v1`, so
pyres/mercy progress and the v45 Velen view's reading position need no storage rollback.

Run the rollback while the Slice 2 code is still loaded, before swapping code, from the browser console or a one-off maintenance script:

    PhoenixVelenNilfProgress.rollbackHandover(localStorage)

| Result | Meaning |
|---|---|
| `{status:'restored', restored:true}` | The canonical record was unchanged since the handover, so the exact pre-handover text is restored. If there was no canonical record before, the key is removed. |
| `{status:'handover-edited', restored:false}` | Nilfgaardian Connection progress was recorded after the handover. The record is preserved (no data loss). The v45 code ignores the `owners`/`handover` fields, and nilf completion then still comes from the legacy key. |
| `{status:'not-handed-over'}` / `'absent'` / `'canonical-unreadable'` / `'newer-canonical'` / `'storage-unavailable'` | Nothing is written. |

Optional, after a `restored` result: run the Slice 1 guarded rollback, which is unchanged:

    PhoenixVelenMigration.rollback(localStorage)

It removes only an unchanged, sealed Slice 1 import record and preserves everything else.

Both rollbacks are guarded by content seals (cyrb53 fingerprints). Neither one overwrites edits made after the write it reverses.

## 3. QA2 corrections only (back to the first Slice 2 freeze)
`prefix-qa2/` (next to `source/`) is the exact first-freeze Slice 2 tree. To drop only the QA2 corrections, run `cd source && patch -R -p1 < ../slice2-corrections.diff`, or copy the five files listed in that diff back from `prefix-qa2/dist/`.

Storage needs no special step. Records written by the QA2 code differ from first-freeze records only by an optional `activities['velen.nilf'].route` (`'direct-heatherton'`). The first-freeze code ignores that field, so it would show such a quest as needing the inn outcome again. No inn outcome is invented either way.

`rollbackHandover` is unchanged. It still restores the exact pre-handover text while the record is unchanged since the handover, and it preserves the record (`handover-edited`) once any progress has been recorded. That includes a direct-route record.

## 4. QA3 corrections only (back to the QA2 freeze)
`prefix-qa3/` is the exact QA2-freeze tree. To drop only the QA3 corrections, run `cd source && patch -R -p1 < ../slice2-corrections-qa3.diff`, or copy the seven files listed in that diff back from `prefix-qa3/dist/` (`slice2-save-guard.test.cjs` is new, so delete it).

**Storage.**
- **The save guard writes nothing.** It only stops `velen-r18.js` from overwriting an unreadable `phoenix.velen.arrival.v1`, so there is nothing to undo. After rolling back, the pre-QA3 (and v45) writer will again replace an unreadable legacy record with defaults on the first render. Repair a damaged record before rolling back if it matters.
- **Direct-route records.** QA3 canonical records may carry `activities['velen.nilf'].bypassed` (a list of ask/fight/finish ids) next to `route:'direct-heatherton'`. The QA2 code ignores `bypassed`. It would treat Go to the Inn as closed again on the direct route (direct total 5), because it read that objective as route-only. No marks are invented either way, and `rollbackHandover` is unchanged.

Code pin: `slice2-nilf.test.cjs` `SEAM_PINS['velen-r18.js']` must match the `velen-r18.js` that is deployed. Prior values are listed in the comment above it.

## 5. QA4 correction only (back to the QA3 freeze)
`prefix-qa4/` is the exact QA3-freeze tree. To drop only the QA4 correction, run `cd source && patch -R -p1 < ../slice2-corrections-qa4.diff`, or copy the five files listed in that diff back from `prefix-qa4/dist/`. `velen-r18.js` is unchanged by QA4, so `SEAM_PINS` stays the same.

**Storage.** QA4 canonical records may carry two fields on `activities['velen.nilf']`. Both exist only with `route:'direct-heatherton'`:
- `unconfirmed` (a list containing the Go to the Inn id);
- `confirmedComplete:true`.

If you roll back to the QA3 code:
- QA3 ignores both fields and treats Go to the Inn as required on the direct route.
- A direct-route quest completed at 5/5, or by confirmation, then shows as incomplete (5/6, or x/6) until Go to the Inn is marked.
- No mark or inn outcome is invented either way, and nothing needs to be rewritten.

`rollbackHandover` is unchanged, and it preserves any record edited after the handover.
