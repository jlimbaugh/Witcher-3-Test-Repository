# 07 · Save and Undo behaviour: **PASS for saves and Undo (no save loss). PRG-01..04 and N1 re-checked: all still apply (PRG-01 changed form)**

*Author-supplied evidence (LT). Live v49 = ba59252, compared with v48 `93a2cf9` served locally. Each fixture ran in a fresh isolated `/tmp` Chrome profile. The v48-pass suites (`p1`–`p4`) were re-run unchanged against both builds (desktop 1280×900), plus a new touch-emulated 390 px mark → reload → Undo run (`n21.cjs`). Scripts are in `evidence/scripts/`. Results: `evidence/07-{v49,v48}-p{1..4}-results.json` and `07-undo-{v49,v48}.json`.*

## Core behaviour (v49)

| Check | Steps | Result | v48 |
|---|---|---|---|
| Mark persists | Mark Travel → `objectives['velen.nilf:travel']='done'`, 1 of 8; reload | Persists, count 1 of 8, hash kept | same |
| Back / Forward | `nilf/1` ↔ `nilf/4` | Hash and mark restored | same |
| Cancel is clean | Open the review dialog, Cancel | Storage byte-identical, box unchecked | same |
| Catch-up and choice | On stage 3 (tap), mark Ask, pick "Fought", Confirm | Travel, Inn and Ask done, `choices.inn=fight`, "3 of 9". **Objective rail stays present and in view** (9 boxes, top 324 px at 390) | same |
| Undo after reload | Reload, then tap "Undo last progress change" | Full update reversed (objectives `{}`, choices `{}`, "0 of 8"), announces "Entire progress update undone." **Persists after a further reload** | same |
| Undo depth | Second Undo | Disabled (one level by design) | same |
| Hub return | Mark Travel on stage 1, open `#velen/hub/nilf` | Hub shows "Quest progress · 1/8" and "Continue walkthrough · Step 1 · Arrival" | same |
| Switch outcome | Fight → Peace via Record / review choice | Lists "1 objective marks will be removed: Defeat the baron's men"; 3 of 8, and back to 3 of 9 | same |
| Undo owner isolation | Velen change then WO change; Velen Undo | Reverses only Velen; WO unchanged | same |
| Funeral Pyres legacy owner | Resolve | `complete.pyres=true` survives reload; Nilf record byte-identical | same (v49 no longer shows the "Arrival pilot · 1 / 3 activities resolved" label on `#velen`) |
| Unreadable / unsupported records never overwritten | Truncated canonical Velen, `schema:99` Velen, non-JSON legacy Velen, `{broken` WO, WO `version:2` | Preserved through load, check attempts and reload | same |
| Migration fixtures | Legacy `complete.nilf`, legacy `inn:fight`, v45 WO `valid-record.json` | Import and load as on v48 ("0 of 9" for the fight import). A new mark persists | same |
| Obsolete save copy | All Velen fixtures | "Your Velen progress saves in this browser." and "Progress and your place save in this browser." are **gone** in v49 | present on v48 |
| Console | All routes | No page errors; only the `/favicon.ico` 404 | same |

**No save loss, no overwrite of pre-existing data, and no unusable progress controls in emulation, so no STOP finding.**

## Re-check of the v48 findings

| ID | v49 status | Detail | v48 |
|---|---|---|---|
| **LT48-PRG-01** (Medium) unreadable or newer canonical Velen record | **Still applies, in a changed form** | With a truncated or `schema:99` `phoenix.region.velen.v1`, the Nilf objective rail, count and correction controls still **disappear** (0 tracked checkboxes; "Stage checkmarks last for this visit"). v49 removed the misleading "Your Velen progress saves in this browser." footer, but there is **still no notice** that the record could not be read or is newer. The legacy-record case does show one: "Your saved Velen record could not be read, so it is kept unchanged. Changes in this visit are not saved." The record is preserved byte-for-byte. Screens: `07-v49-corrupt-velen-load.jpg` and `07-v48-corrupt-velen-load.jpg` | Rail also gone, plus the misleading footer |
| **LT48-PRG-02** (Medium) Travel uncheck clears the inn outcome without saying so | **Still applies, unchanged** | Uncheck Travel after Ask plus Peace: the dialog says only "3 objective marks will be removed" (Travel, Inn, Ask). After Confirm, `choices` = `{}`. Undo restores the marks and `inn=peace` | identical |
| **LT48-PRG-03** (Low) unreadable WO record has no notice on summary surfaces | **Still applies, unchanged** | With `{broken` WO: `#home`, `#whiteorchard` and `#progress` show no notice. Only `#quest-lilac` shows "Your saved White Orchard progress could not be read…". Record preserved | identical |
| **LT48-PRG-04** (Suggestion) storage denied or quota: Nilf loses its tracked rail | **Still applies, unchanged** | Quota (`setItem` throws) and denied (`SecurityError`): notice "Saving is unavailable. Progress lasts for this visit only." is correct, but the Nilf objective rail disappears (0 tracked inputs) and only visit-only stage checkmarks remain. WO keeps its in-memory tracked UI. The denied case now also shows "Saved progress could not be read. Changes in this visit are not saved." (wording changed from v48's "Saving is unavailable: this browser did not allow…") | same behaviour |
| **N1** (known, deferred) Lilac-page Undo reverses a later Beast update | **Still present** | Undo on `#quest-lilac` reverses the Beast catch-up update. It announces "Entire progress update undone." without naming the quest | identical |

"Rail disappearing" from the brief is exactly the PRG-01 and PRG-04 conditions above. In normal storage the rail stays visible after every mark.

## Not run
- Physical Safari, Private Browsing and the returning-browser upgrade (v48 → v49 cached record): **OPEN**.
- "Record whole quest complete" was not driven to completion. Pyres and Mercy were not exhaustively tested.
- Undo across a branch change followed by a reload was not tested beyond the cases above.
