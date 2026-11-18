# QA report — Progress, saves and Undo (LT pass 1)

> **Author-supplied evidence.** LT ran every check below in headless Chrome against the live v48 site. Nothing here has been independently reproduced yet. Synthetic fixtures were used only in fresh, disposable browser profiles, and no real user progress was read or changed.

- **Reviewer and date:** LT (independent QA), 2026-11-18, 13:58–14:20 CST
- **Category, issue and tested URL:** Progress, saves and Undo · #17 (parent #15) · https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site/
- **Release and source:** Phoenix v48, GitHub candidate `93a2cf9e2bf080cf6c4a02c21b959d1d6734e08c`, app tree `54d96e5a060ad3793e5444b751b664395809dfa8`.
  - The served `index.html` (with the Cloudflare challenge beacon removed) and all 81 JS/CSS files it references are byte-identical to `93a2cf9:dist`.
  - See [release/evidence/lt-pass1/build-identity.txt](../release/evidence/lt-pass1/build-identity.txt). No version string is rendered in the app.
- **Baseline:** v47, taken from `origin/release/session-3-v47` @ `175f937a` `dist/`.
  - It was served locally on 127.0.0.1, so it is not the production rollback deployment.
  - It was used only to classify findings as regressions or pre-existing.
- **Fixtures:**
  - Synthetic records were injected before first paint into a fresh `--user-data-dir`.
  - The migration fixtures are copied from repo tests: `dist/slice2-nilf.test.cjs` lines 10 and 56, and `qa/wo-save-preservation/fixtures/valid-record.json`.
- **Environment:**
  - Linux box, Google Chrome 156.0.8078.47 headless via puppeteer-core.
  - Desktop viewport 1280×900, DPR 1. A fresh profile was used for every run.
  - **No iPhone Safari, VoiceOver or Xbox observations in this report.**
- **Harness and raw results:** [evidence/lt-pass1/](evidence/lt-pass1/). Scripts are in `harness/`, and `p1…p5*.json` hold the raw outputs.

## Storage model observed (v48)

| Key | Owner / content |
| --- | --- |
| `phoenix.region.velen.v1` | Canonical Velen record, `schema:1`. Holds Nilfgaardian Connection objectives, `choices.inn`, `owners`, the handover seal and a single-step `undo`. |
| `phoenix.velen.arrival.v1` | Legacy Velen record. Still owns Funeral Pyres and At the Mercy of Strangers completion, plus the stage/last-hub pointers. |
| `phoenix.whiteorchard.interaction.v1` | White Orchard record, `version:1`. Holds `progress.objectives`, choices, `progressUndo` and navigation state. |
| Card walkthroughs (18 Velen cards such as Ladies of the Wood) | Stage checkmarks are labelled "Stage checkmarks last for this visit." Nothing is written to storage. |

## Findings

No stop findings. No save loss was observed. Every unreadable, unsupported or newer record stayed byte-for-byte unchanged across load, interaction and reload.

| Finding ID | Severity | Route and state | Repro steps | Expected | Actual | Evidence | Retest |
| --- | --- | --- | --- | --- | --- | --- | --- |
| LT48-PRG-01 | Medium | `#velen/quest/nilf/1` and `#velen` with an unreadable (`{"schema":1,"region":"velen",`) or newer (`schema:99`) `phoenix.region.velen.v1` | 1. Fresh profile. 2. Set `phoenix.region.velen.v1` to truncated JSON, or to `{"schema":99,…}`. 3. Open `#velen/quest/nilf/1`. 4. Open `#velen`. | The page explains that the saved Velen record could not be read (or is newer) and that changes are not saved. This is what already happens for an unreadable *legacy* record: "Your saved Velen record could not be read, so it is kept unchanged. Changes in this visit are not saved." | The Nilfgaardian objective rail, count and correction controls disappear (0 tracked checkboxes), and the page falls back to "Stage checkmarks last for this visit." The footer on both routes still says **"Your Velen progress saves in this browser."** The record itself is preserved byte-for-byte, so there is no data loss, but the user is told saving works and gets no explanation for the missing progress. | `p6-corrupt-nilf-top.jpg`, `p6-corrupt-nilf-footer.jpg`, `p5-live.json`, `p2-results.json` (corrupt-velen, newer-velen; compare corrupt-legacy) | **Pre-existing:** identical on v47 local (`p5-v47local.json`) |
| LT48-PRG-02 | Medium | `#velen/quest/nilf/1` with Travel, Inn and Ask done and inn outcome = peace | 1. On `#velen/quest/nilf/3`, mark Ask, choose "Settled peacefully", Confirm. 2. On `#velen/quest/nilf/1`, uncheck "Travel to Velen." 3. Read the review dialog and Confirm. | The review dialog names every recorded change, including clearing the recorded inn outcome. | The dialog lists only "3 objective marks will be removed" (Travel, Inn, Ask). After Confirm, `choices` is `{}`, so the recorded outcome was cleared without being disclosed. Undo restores both the marks and the choice. | `p5-live-uncheck-dialog.jpg`, `p3-results.json` (`u_dlg`, `u_after`, `u_afterUndo`) | **Pre-existing:** same on v47 local (`p5-v47local-uncheck-dialog.jpg`) |
| LT48-PRG-03 | Low | `#home`, `#whiteorchard`, `#progress` with an unreadable `phoenix.whiteorchard.interaction.v1` (`{broken`) | 1. Fresh profile with `{broken` in the WO key. 2. Visit `#home`, `#whiteorchard`, `#progress`, then `#quest-lilac`. | Every surface that summarizes White Orchard progress explains that the record could not be read. | Only the quest walkthrough (`#quest-lilac`) shows "Your saved White Orchard progress could not be read, so it is kept unchanged. Changes in this visit are not saved." Home, the White Orchard console and Progress show no notice, so empty progress looks real. The record was preserved. | `p3-results.json` (`cw_*`) | Not compared with v47 |
| LT48-PRG-04 | Suggestion | `#velen/quest/nilf/*` with storage denied (SecurityError) or writes failing (QuotaExceededError) | Fresh profile with `localStorage` access throwing, or `setItem` throwing for `phoenix.*`. | Per the shared design for White Orchard, progress still works in memory for the visit. | The notice is correct: "Saving is unavailable. Progress lasts for this visit only." However, the Nilfgaardian Connection loses its objective rail entirely and offers only visit-only stage checkmarks. White Orchard keeps its full tracked UI in memory. Benefit if aligned: users on Private Browsing or full storage still get catch-up, branch choices and Undo for the visit. | `p2-quota-writes-load.jpg`, `p2-results.json` (quota-writes, denied-storage) | Not compared with v47 |
| N1 (known, deferred) | — | `#quest-lilac` after a later Beast of White Orchard update | 1. Mark Lilac "Kill the ghouls." 2. On `#quest-beast`, mark "herbalist" with catch-up. 3. Return to `#quest-lilac`, wait for the quick-Undo window to close, then press "Undo last progress change". | — | **Still present.** The Lilac page's Undo reversed the Beast update, including the Lilac objectives that catch-up had added. It announced only "Entire progress update undone." and did not name the quest. This is not a new finding (see `docs/PROJECT-STATUS.md`, N1). | `p4-n1-before-undo.jpg`, `p4-n1-after-undo.jpg`, `p4-results.json` | Known deferred |

## Passed checks (v48 live, desktop Chromium)

1. **Tracked marks persist.**
   - Marking Nilf "Travel to Velen." writes `objectives['velen.nilf:travel']='done'` and moves the count from 0 to 1 of 8.
   - The mark and count survive a reload.
   - Back and Forward between `nilf/1` and `nilf/4` restore the hash, and the mark stays.
2. **Cancel is clean.** Cancelling the review dialog leaves the stored record byte-identical and the checkbox unchecked.
3. **Catch-up and choice in one update.**
   - Marking Ask with catch-up and "Fought" records Inn, Ask and Travel plus `choices.inn=fight`.
   - The count moves to "3 of 9", because the fight route adds "Defeat the baron's men."
4. **Undo restores the full update.**
   - "Undo last progress change" reverses the entire update, including the choice, and announces "Entire progress update undone."
   - A second Undo is disabled, because Undo is one level deep by design.
5. **Quick Undo is owned by Velen.** After a Velen commit, quick Undo is visible with `data-undo-owner="velen"` and reverses only the Velen update.
6. **Catch-up off.** With catch-up unchecked, only the selected objective is marked.
7. **Switching the outcome.**
   - Fight → Peace via "Record / review choice" lists "1 objective marks will be removed: Defeat the baron's men."
   - After Confirm, the count is 3 of 8. Peace → Fight changes it to 3 of 9.
8. **Undo stays with its owner.** After a Velen change followed by a White Orchard change, Velen Undo reversed only the Velen change. The White Orchard record was unchanged.
9. **Funeral Pyres (legacy owner).**
   - Resolving it opens "Confirm recorded progress… Other activities remain unchanged."
   - After Confirm, `complete.pyres=true` survives a reload, and `#velen` shows "1 / 3 activities resolved".
   - The canonical Nilf record stays byte-identical, so the quests remain isolated.
10. **Visit-only card marks.**
    - The Ladies of the Wood stage 1 checkbox writes nothing to storage.
    - It stays checked while moving between stages in the same visit and clears on reload, as the on-page copy says.
11. **Unreadable or unsupported records are never overwritten.** This held across load, check attempts and reload for:
    - truncated canonical Velen (`schema` 1)
    - `schema:99` Velen
    - non-JSON legacy Velen
    - `{broken` WO
    - WO `version:2`
12. **Legacy Velen notice.** An unreadable legacy Velen record shows a correct notice, and Nilf keeps saving to the canonical record.
13. **Denied storage notice.** With storage denied (SecurityError), there are no page errors and a clear notice: "Saving is unavailable: this browser did not allow saved progress to be read. Changes in this visit are not saved."
14. **Migration fixtures.**
    - Legacy `complete.nilf:true` imports into a canonical `origin.kind:"legacy-import"` record with `legacyComplete:true`, shown as "Saved complete — objectives unconfirmed".
    - Legacy `choices.inn:"fight"` imports as `choices.inn.value="fight"`, and the count becomes "0 of 9".
    - The legacy record is kept (pointers only change on navigation).
    - The v45 WO fixture `valid-record.json` loads, and a new mark persists.
15. **Console output.** No page errors on any route tested. The only console error is the site-wide `/favicon.ico` 404.

## Not run / coverage limits

- Physical iPhone Safari and returning-browser (v47 → v48 cached upgrade) persistence were not run.
- Exhaustive mutually-exclusive outcome checks were not run for White Orchard choices; Nilf was used as the representative.
- "Record whole quest complete" was opened but not driven to completion.
- Pyres and Mercy stage and choice controls were not exhaustively tested.
- Repair/reset paths for blocked records are not covered (still a later item).
- Undo after reload was not tested.

## Verdict

**Pass with findings.** Saves are protected: no fixture caused loss or overwrite.

- Velen and White Orchard persistence, catch-up, outcome switching and Undo behave correctly.
- Two Medium transparency defects remain:
  - PRG-01: a misleading "saves in this browser" message when the Velen record cannot be read.
  - PRG-02: clearing the inn outcome is not disclosed.
- Both are pre-existing in v47, so neither is a v48 regression.
- N1 remains as known.
