# QA6 — White Orchard save preservation (D2) + storage-denied start-up (D4) — **author self-review (LT)**

**Evidence label for everything in this document: `author-supplied`** (LT wrote the change and ran every check below). It is
not an independent review; Cmdr's independent review starts from the commit and the acceptance checks below.
Source line references are `source-inspection` of the QA6 tree unless stated otherwise.

| | |
|---|---|
| Branch | `fix/wo-save-preservation`, based on `investigation/wo-save-preservation` `75768834b768e53b3acd5f912c1c2032a848b8fb` (QA5 `5ba73ace…` + D2 investigation) |
| Compared against | v45 snapshot `d1df0e3e2c40cad172577f4725daa7233fc8c41e`; QA5 `5ba73ace7d05551c877021de6e6fd0a2242a1e3a` |
| Orders | Cmdr QA6 orders (owner-relayed): D2 correction, D4 correction, verification, docs. No deployment, workflow, merge, Pages change or publishing. |
| Cmdr decisions applied | Records with a missing, string or unsupported `version` are **preserved** (blocked), not coerced or migrated. An empty-string record is preserved as unreadable (settled 2026-11-16, see §0). |
| Runs | 2026-11-16 ~8:00–8:25 PM CST; Google Chrome 156.0.8078.47 headless; Node v24.22.1 |

## 0. Decisions (Cmdr)
Recorded here as the QA6 decision record. Each entry quotes or restates Cmdr's ruling as relayed by the owner.

| Date (America/Chicago) | Decision | Effect on QA6 |
|---|---|---|
| 2026-11-16 | Records with a missing, string or unsupported `version` are preserved (blocked), not coerced or migrated. | Implemented in `dist/app.js` (status `unsupported`, §1.1). |
| 2026-11-16, after QA6 delivery | "Preserve an empty-string record as unreadable. Only a missing key counts as absent. Recovery or reset must be an explicit later action." | Matches QA6 as built (status `unreadable`, §1.1). No code change. Recovery or reset is a separate later item (§8). |

Review status (2026-11-17): Cmdr's independent review of QA6 is in progress. Cmdr's source inspection and coverage limits are
recorded in the description of draft PR #1; see `docs/PROJECT-STATUS.md`. This document remains LT's self-review.

## 1. Application changes (vs QA5 `5ba73ace`)

| File | Change |
|---|---|
| `dist/app.js` | D2. One read + classification of `phoenix.whiteorchard.interaction.v1` (`:66`); `saved` = accepted record only (`:67`); `saveBlocked` (`:68`); all saved fields populated from `saved` only (`:69-91`); `persist()` skips `setItem` while blocked (`:94-100`); one status helper `SAVE_MESSAGES` / `saveStatus()` / `showSaveStatus()` (`:103-105`) used by `persist()` and `reflect()` (`:213`). |
| `dist/velen-r18.js` | D4. Line 19 only: guarded acquisition `const nilfStorage=(()=>{try{return localStorage;}catch(error){…stand-in whose getItem/setItem/removeItem re-throw that error…}})();` passed as `storage:nilfStorage`. Line count unchanged (52). |
| `dist/index.html` | Cache tags only: `app.js?v=save-guard-qa6-v45` (was `nilf-slice2-qa5-v45`), `velen-r18.js?v=save-guard-qa6-v45` (was `nilf-slice2-qa3-v45`). |

No other application file changed. Protected files (17, pinned in `dist/slice2-nilf.test.cjs`): untouched, test-enforced.
`index.html` is the only HTML entry point that loads `app.js` or `velen-r18.js` (`velen.html`, `credits.html`,
`wolf-dock-qa.html` checked; the last embeds `index.html`). No service worker or precache list exists.

### 1.1 Classification (D2)
| Stored value | Status | Writes this session | Message |
|---|---|---|---|
| key absent (`getItem` → `null`) | `absent` → v45 fresh / legacy-pilot path, unchanged | normal | "Progress and your place save in this browser." |
| plain object, `typeof version === 'number' && version === 1` | `accepted` | normal (v45 bytes) | same |
| not parseable JSON (including the empty string), or JSON that is not a plain object (`[]`, `"x"`, `null`, `42`) | `unreadable` | **none** | "Your saved White Orchard progress could not be read, so it is kept unchanged. Changes in this visit are not saved." |
| plain object with missing / non-numeric / unsupported `version` (`{"foo":1}`, `"1"`, `2`, `0`, `null`) | `unsupported` | **none** | "Your saved White Orchard progress is in a format this guide cannot use, so it is kept unchanged. Changes in this visit are not saved." |
| `getItem` throws, or the `localStorage` getter throws | `storage-unavailable` | **none** | "Saving is unavailable: this browser did not allow saved progress to be read. Changes in this visit are not saved." (does not claim the bytes were preserved) |
| accepted/absent, but `setItem` throws | `write-failed` (v45 behaviour, recovers after a later successful write) | refused | "Saving is unavailable. Changes last for this visit only." |

The three blocked states are fixed for the page session; a successful write of another key cannot clear them (no write of
this key is attempted). In-memory progress, Undo and navigation keep working (probe: tick → confirm → Undo all succeed in
every blocked row). Each message element also carries `data-save-state` with the status name (used by tests and probes).

**One deliberate behaviour change outside the order's table:** an **empty string** stored under the key was treated as
absent by v45 (`if (raw)`) and overwritten with defaults; QA6 treats it as `unreadable` (preserved, blocked), because it
is present but not a v1 record. No shipped writer stores an empty string. **Settled by Cmdr (§0):** an empty-string record is
preserved as unreadable; only a missing key counts as absent; recovery or reset must be an explicit later action.

### 1.2 Why `velen-r18.js` (pinned) was changed (D4)
Cmdr authorized the edit and preferred a narrow guard at the failing boundary. The failing expression is the bare
`localStorage` getter read in `velen-r18.js:19` (QA5). Guarding it there is the only place that keeps start-up going
without catching anything else: `createPhoenixVelen()` at `app.js:391` is **not** wrapped, so any unrelated init error
still surfaces (test-enforced). The stand-in re-throws the browser's original `SecurityError` on every call, which
`velen-nilf-progress.js` already reports as `storage-unavailable`, so the Nilfgaardian owner is refused and the hub
falls back to the v45 legacy hub (the documented Slice 2 fallback), where `save()` reports "Saving is unavailable.
Progress lasts for this visit only." With working storage `nilfStorage` **is** `localStorage` (test-enforced).

Pin history in `dist/slice2-nilf.test.cjs` (`SEAM_PINS`):
- QA3 save guard: `a6f24728b1c25b43a28cacab2a522d9be0b27453cf3602fcacb939cbf53cb898` (old)
- QA6 D4 storage guard: `ef05afb54503496f6982ab106116a36a96ac779624207b31eab9cfebbfb3d94d` (new)

### 1.3 Tests added / changed
| File | Change |
|---|---|
| `dist/wo-save-guard.test.cjs` | NEW, 28 tests. Runs the real `app.js` loader/persist/status region in a VM with the real route, progression data and engine against a logging Storage double. 14 unusable inputs × 3 sessions (bytes identical, 0 writes, blocked message only, nothing imported); in-memory tick + Undo while blocked; blocked survives other writes; read throws (always / first load only); access denied; write failure (key / all) = v45; accepted record populates every field from that record; valid/absent/legacy-pilot/odd-routeUpdates final bytes pinned to v45 and byte-compared with the v45 region when `PHOENIX_V45_BASELINE` is set; single status writer; single read. |
| `dist/storage-denied-startup.test.cjs` | NEW, 6 tests. Executes the guarded acquisition extracted from `velen-r18.js` with a throwing `localStorage` getter; the real Nilfgaardian owner (load/handover/commit/undo/rollback) returns `storage-unavailable` without throwing; the WO loader/persist completes; start-up order unchanged and `createPhoenixVelen()` not wrapped in a blanket catch. |
| `dist/slice2-cache-tags.test.cjs` | QA5-only assertion replaced: files changed since QA5 must carry a tag distinct from **both** QA5 and v45 (pinned QA5 table, optional `PHOENIX_QA5_BASELINE` re-derivation); `app.js` and `velen-r18.js` must carry `save-guard-qa6-v45`. |
| `dist/slice2-nilf.test.cjs` | `SEAM_PINS` updated deliberately (above), with pin history. |
| `dist/home-candidate.test.cjs` | The existing `persist()` VM test supplies the new `saveBlocked:null` variable (its assertions unchanged). Not a protected file. |

New tests against QA5's `app.js`/`velen-r18.js`/`index.html`: 28 of 39 fail as intended
(`qa/qa6-evidence/logs/new-tests-against-qa5-app-files.tap`). Note: the write-failure test fails on QA5 only because it
also checks the new `data-save-state` attribute; QA5's write-failure bytes and text are the same as QA6's.

## 2. Test results (Node v24.22.1, from `dist/`; logs in `qa/qa6-evidence/logs/`)
| Command | Result |
|---|---|
| `node --test *.test.cjs` | 307 tests: 305 pass, 0 fail, 2 skipped (the two baseline re-derivations) |
| `PHOENIX_V45_BASELINE=<v45>/dist node --test *.test.cjs` | 307: 306 pass, 1 skipped (QA5 table) |
| `PHOENIX_V45_BASELINE=<v45>/dist PHOENIX_QA5_BASELINE=<qa5>/dist node --test *.test.cjs` | **307/307 pass**, 0 skipped |
| 6-file subset / + Slice 1 | 62/62, 89/89 |
| Slice 2 targeted (3 files) | 38 pass + 2 skipped (no baselines) |
| QA6 targeted (`wo-save-guard`, `storage-denied-startup`, `home-candidate`) | 63/63 |

## 3. D2 matrix (probe, 144 runs, both viewports, throwaway profiles)
`qa/wo-save-preservation/probe.cjs` (extended: `--build label=dir`, empty-string input, Velen at both viewports, `d4:` flow).
Flow per run: seed → load → hub → quest → back → tick objective → confirm → Undo → home → reload ×2; stored bytes
captured at every phase via DevTools (not the page), every `setItem`/`removeItem`/`clear` logged with stack, page errors
and save-status text recorded. Cell = bytes through reload 2 (`kept` = identical to the seed), White Orchard-key writes
(`w`), messages seen, page errors, final sha256 prefix. Both viewports gave identical results in every row.
Full data: `qa/wo-save-preservation/qa6/results.json.gz`, `summary.json`, `table.md`.

| Input | v45 baseline d1df0e3e | QA5 5ba73ace | QA6 |
|---|---|---|---|
| absent | no seed, 14w, normal, 2ee5531e | no seed, 14w, normal, 2ee5531e | no seed, 14w, normal, 2ee5531e |
| d4:localStorage-access-denied | kept, 0w, write-failed, 1c55d017 | kept, 0w, (empty)+write-failed, 8 errors, BLANK start, 1c55d017 | kept, 0w, storage-unavailable, 1c55d017 |
| fault:localStorage-access-throws | kept, 0w, write-failed, 1c55d017 | kept, 0w, (empty)+write-failed, 3 errors, BLANK start, 1c55d017 | kept, 0w, storage-unavailable, 1c55d017 |
| fault:read-throws-first-load-only | overwritten@load, 14w, normal, 2ee5531e | overwritten@load, 14w, normal, 2ee5531e | overwritten@reload-1, 4w, storage-unavailable+normal, 838201ed |
| fault:read-throws-wo-key | overwritten@load, 14w, normal, 264ba932 | overwritten@load, 14w, normal, 264ba932 | kept, 0w, storage-unavailable, 1c55d017 |
| fault:write-throws-all-keys-quota | kept, 0w/14refused, write-failed, 1c55d017 | kept, 0w/14refused, write-failed, 1c55d017 | kept, 0w/14refused, write-failed, 1c55d017 |
| fault:write-throws-wo-key-quota | kept, 0w/14refused, write-failed, 1c55d017 | kept, 0w/14refused, write-failed, 1c55d017 | kept, 0w/14refused, write-failed, 1c55d017 |
| invalid-json-empty-string | overwritten@load, 14w, normal, 2ee5531e | overwritten@load, 14w, normal, 2ee5531e | kept, 0w, blocked-unreadable, e3b0c442 |
| invalid-json-text | overwritten@load, 14w, normal, 2ee5531e | overwritten@load, 14w, normal, 2ee5531e | kept, 0w, blocked-unreadable, c3f07c17 |
| invalid-json-truncated | overwritten@load, 14w, normal, 2ee5531e | overwritten@load, 14w, normal, 2ee5531e | kept, 0w, blocked-unreadable, 30b4f5ac |
| shape-array | overwritten@load, 14w, normal, 2ee5531e | overwritten@load, 14w, normal, 2ee5531e | kept, 0w, blocked-unreadable, 4f53cda1 |
| shape-null | overwritten@load, 14w, normal, 2ee5531e | overwritten@load, 14w, normal, 2ee5531e | kept, 0w, blocked-unreadable, 74234e98 |
| shape-number | overwritten@load, 14w, normal, 2ee5531e | overwritten@load, 14w, normal, 2ee5531e | kept, 0w, blocked-unreadable, 73475cb4 |
| shape-object-missing-fields | overwritten@load, 14w, normal, 2ee5531e | overwritten@load, 14w, normal, 2ee5531e | kept, 0w, blocked-unsupported, 37a76343 |
| shape-string | overwritten@load, 14w, normal, 2ee5531e | overwritten@load, 14w, normal, 2ee5531e | kept, 0w, blocked-unreadable, 5aa762ae |
| valid-populated | overwritten@load, 14w, normal, 780bf350 | overwritten@load, 14w, normal, 780bf350 | overwritten@load, 14w, normal, 780bf350 |
| velen-invalid-json | overwritten@load, 6w, Velen normal, bc657eb3 | kept, 0w, Velen guard, 790848db | kept, 0w, Velen guard, 790848db |
| velen-shape-array | overwritten@load, 6w, Velen normal, bc657eb3 | kept, 0w, Velen guard, 49a64717 | kept, 0w, Velen guard, 49a64717 |
| velen-shape-string | overwritten@load, 6w, Velen normal, bc657eb3 | kept, 0w, Velen guard, ba2df490 | kept, 0w, Velen guard, ba2df490 |
| velen-valid-absent | no seed, 6w, Velen normal, bc657eb3 | no seed, 6w, Velen normal, bc657eb3 | no seed, 6w, Velen normal, bc657eb3 |
| version-2-divergent | overwritten@load, 14w, normal, 780bf350 | overwritten@load, 14w, normal, 780bf350 | kept, 0w, blocked-unsupported, 2550eb1a |
| version-2-populated | overwritten@load, 14w, normal, 780bf350 | overwritten@load, 14w, normal, 780bf350 | kept, 0w, blocked-unsupported, 11b3595e |
| version-missing-populated | overwritten@load, 14w, normal, 780bf350 | overwritten@load, 14w, normal, 780bf350 | kept, 0w, blocked-unsupported, b38af1f9 |
| version-string-1-populated | overwritten@load, 14w, normal, 780bf350 | overwritten@load, 14w, normal, 780bf350 | kept, 0w, blocked-unsupported, 2764717e |

Notes: `valid-populated` "overwritten@load" is v45's normal normalisation of a valid record (content kept; final bytes
`780bf350…` identical in all three builds). `absent` final `2ee5531e…` identical in all three. `fault:read-throws-first-load-only`
on QA6: the seed bytes stay identical through the whole failed session (0 writes); on reload 1 storage works, the record is
accepted and saved in v45's normalised form with its progress intact (`q-lilac:ghouls`, `q-lilac:ride` done) — only key
order and the `stageByView` default differ from the seed, exactly as for a valid record. Baseline and QA5 lose that
progress. `removeItem`/`clear`: 0 calls in all 144 runs.

## 4. D4 (storage access denied) — `d4:` flow, both viewports
Home → Velen → Nilfgaardian hub → quest → back → back → Home → reload ×2, `localStorage` getter throwing `SecurityError`.
| Build | Start page | Velen route | Page errors | Messages |
|---|---|---|---|---|
| v45 | renders (`home`) | works | 0 | WO "Saving is unavailable. Changes last…" |
| QA5 | **blank** (no view) | Velen screen empty, `TypeError … innerText` per step | 8 per run | WO empty after load |
| QA6 | renders (`home`), also after both reloads | works (Velen console, hub, quest, return) | **0** | WO `storage-unavailable`; Velen "Saving is unavailable. Progress lasts for this visit only." |

With storage denied the Nilfgaardian hub shows the v45 legacy hub (documented fallback), because no record can be read or
saved. Renders: `qa/qa6-evidence/renders/` (QA5 vs QA6; 390×844 and 844×390).

## 5. Velen damaged-record guard (QA4/QA3) re-run
`velen-invalid-json`, `velen-shape-array`, `velen-shape-string`: QA6 = QA5 at both viewports — bytes kept, 0 writes, guard
message. `velen-valid-absent`: identical final bytes in all three builds (`bc657eb3…`). `slice2-save-guard.test.cjs` passes.

## 6. Returning-browser check (`qa/qa6-returning-browser/returning.cjs`, results in `results/`)
One persistent throwaway profile; session 1 loads the old build with long-lived caching (HTML `no-cache`+ETag, everything
else `public, max-age=31536000, immutable`); browser closed; files swapped to QA6 on the same origin; session 2 same profile.
| Run | Result |
|---|---|
| v45 → QA6, 390×844 / 844×390 | 13/13, 13/13 |
| QA5 → QA6, 390×844 / 844×390 | 13/13, 13/13 |
| Control: QA5 → QA6 files but QA5 tags left in `index.html` (390×844) | 3/13 — cached QA5 `app.js`/`velen-r18.js` served from disk cache, unreadable WO record overwritten, blank start page with storage denied |

Proven in every passing run: `app.js?v=save-guard-qa6-v45` and `velen-r18.js?v=save-guard-qa6-v45` fetched from the
network (200, not from cache); every file unchanged since the old build served from the HTTP cache with no server request
(75 for QA5 → QA6, 71 for v45 → QA6, where the 6 Slice 2 files are also new); QA6 behaviour active — unreadable WO bytes kept with 0 writes through load, hub and reload and the
`unreadable` status shown; with storage denied the start page renders, Velen → hub → quest → back → back works, accurate
messages, 0 uncaught errors.

## 7. Rollback (`docs/rollback/`, test log `qa/qa6-evidence/logs/rollback-test.txt`)
`restore_and_verify.py` gains `--from qa5|qa6`, `--to v45|qa5`, `--qa5-kit` (defaults reproduce QA5 behaviour).
On copies of the QA6 `dist/`: QA6 → QA5 PASS (6 restored, 2 deleted, 487 QA5 files verified) and `diff -r` byte-identical
to QA5 `dist/`; QA6 → v45 PASS (5 restored, 8 deleted, 181 v45 files verified) and `diff -r` byte-identical to v45 `dist/`;
wrong source refused (exit 3); the QA5 → v45 default still passes. Files only — no rollback touches browser storage.
QA6 writes nothing new to storage, so no storage rollback is needed for QA6 itself.

## 8. Not tested / limits
- Physical iPhone Safari, WebKit storage partitioning / ITP eviction, Private Browsing, real quota exhaustion: untested.
  Read failures, write failures and denied access were **simulated** in Chrome (`Storage.prototype` overrides, a throwing
  `localStorage` getter); the exception types match browsers', but the iOS triggers were not reproduced.
- Real CDN/edge caching after a deploy (Cloudflare): untested; the returning-browser check uses a local server.
- Touch input and VoiceOver: not exercised (probes use DOM `click()`).
- The live site was not probed (order: never test damaged records on the owner's profile).
- There is no repair path for a blocked record (same as the Velen guard); a user-confirmed "start fresh / export" action
  is a separate, later item. A user with an unusable record keeps seeing the blocked message until it is repaired or cleared.
- Other keys (`phoenix.guide.resume.v1`, warnings, reading fold-outs, Velen canonical) were not seeded with damaged data.
