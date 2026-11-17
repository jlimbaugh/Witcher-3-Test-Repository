# PHOENIX v45, Slice 2: The Nilfgaardian Connection on the White Orchard template (LT review)

- **Base:** accepted v45 code kit, commit `a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820`.
- **Read-only baseline:** `baseline-untouched/`. **Working tree:** `source/`.
- **Diff:** `slice2.diff` (`diff -ruN baseline-untouched source`, 8 files, code only, sha256 `51759c1f…`). Includes the QA2 corrections in §8.
- **QA2 corrections only:** `slice2-corrections.diff` (`diff -ruN prefix-qa2 source`, 5 files, sha256 `b7c0a0dd…`).
- **Status:** QA2 corrections applied and frozen again for Cmdr QA, then owner Safari testing. Nothing was published and no live site was changed.
- **Pre-edit inventory:** `SLICE2-INVENTORY.md`.

## 1. Files
| File | Change | Owner after Slice 2 |
|---|---|---|
| `dist/velen-nilf-objectives.js` | NEW. Nine sourced journal objectives for `velen.nilf`, plus the `inn` choice (peace/fight). The conditional fight uses `branch` and `conditionalRequires`. Every objective cites https://www.witcher.tools/quests/the-nilfgaardian-connection. Reading Hendrik's notes is a note on the final "Search the agent's hut" objective, not a separate objective. | nilf objective data |
| `dist/velen-nilf-progress.js` | NEW. Explicit progress handover of `velen.nilf` to `phoenix.region.velen.v1`. Also `load` / `commit` / `undo` over the shared `createPhoenixProgress` engine, and the guarded `rollbackHandover`. | canonical nilf progress |
| `dist/velen-nilf-ui.js` | NEW. The WO-template hub, walkthrough, progress deck, review dialog, and return-context capture/restore. Uses only `data-velen-*` hooks. | nilf presentation |
| `dist/velen-r18.js` | Minimal delegation seam (a commented block plus 7 call-site edits). See §2. | routing, console, reading position, pyres/mercy |
| `dist/app.js` | +3 lines: a guarded `PhoenixVelenNilfProgress.handover(localStorage)` call after the Slice 1 import and before `createPhoenixVelen`. | init order |
| `dist/index.html` | Three deferred script tags (`?v=nilf-slice2-v45`) after `velen-migration.js` and before `velen-routing.js`/`velen-r18.js`, plus a cache-bust on `velen-view.css`. | load order |
| `dist/velen-view.css` | +4 lines: `#velen > .scene-inner.console-r16` now paints the existing `velen-landscape-r18.webp` (fallback `velen-timber-r18.svg`) in place of the inherited `white-orchard-scene.webp`. | Velen framing |
| `dist/slice2-nilf.test.cjs` | NEW. 15 tests. | tests |

**Untouched (byte-identical, test-enforced):**
- Code: `progression-engine.js`, `progression-data.js`, `progression-ui.js`, `quest-hubs.js`, `quest-pages.js`, `velen-migration.js`, `regional-registry.js`, `velen-data-r18.js`, `velen-routing.js`, `main-console.js`, `visual-system.js`, `swipe-boxes.js`.
- WO CSS (`console-r16.css` and the others).
- All art and fonts.

No art was added, downloaded into the source, or fabricated. Art references reuse the existing manifest paths `velen-landscape-r18.webp`, `velen-timber-r18.svg` and `gwent-r15/gabor.webp`.

## 2. Ownership seam
- **State.**
  - `app.js` runs the Slice 1 import first (unchanged), then `handover()`.
  - The handover is idempotent. It is refused, with no write, for unavailable, unreadable or newer-schema storage. In that case the nilf hub falls back to the v45 legacy hub and nothing breaks.
  - It writes:
    - `activities['velen.nilf']`: imported `complete` is kept as the engine's whole-quest `legacyComplete`, with **no objective marks invented**. An unknown inn outcome stays unknown.
    - `owners = {velen.nilf: canonical, velen.pyres: legacy, velen.mercy: legacy}`.
    - A `handover` block holding the exact prior text, plus a seal.
  - It removes the Slice 1 `migration` seal. As a result, the **unchanged** Slice 1 guard classifies the record as `canonical-kept`: later legacy imports or refreshes never overwrite nilf progress, and `PhoenixVelenMigration.rollback` never removes it.
- **Legacy record.**
  - `phoenix.velen.arrival.v1` is never written by the Slice 2 modules.
  - `velen-r18.js` keeps writing it for reading position, Continue (`rememberReading`) and pyres/mercy, exactly as in v45. The only normalisation is v45's own `"undo":null`, which was verified identical against a baseline render.
  - nilf completion reads in `velen-r18.js` (unlock of the next leads, the console's completed count) go through `isComplete()` / `isUnlocked()`, which ask the nilf owner when it is owned.
  - `velen-r18.js` never reads the canonical key itself, so the Slice 1 test assertion still holds.
- **pyres / mercy.** Their v45 hubs, owners and saves are unchanged. The imported pyres/mercy snapshots inside canonical are left exactly as they were.
- **Engine reuse.**
  - `createPhoenixProgress(nilfData, {}, [])` drives the plan, catch-up, missing choices, closure and counts.
  - The dialog and deck reuse WO markup and classes (`objective-scroll-frame` / `objective-banner` / `objective-rail` / `objective-card`, `progress-dialog`, `phoenix-action` buttons), so the shared CSS, the mounted wolf pointer (`visual-system.js`) and rail sizing (`swipe-boxes.js`) apply unchanged.
  - WO document listeners (`data-objective-check`, `data-quest-state`, `data-stage-select`, …) are deliberately not used. This is test-enforced.
- **Routing and returns.**
  - Card tap: a stationary tap on the nilf console card selects it and opens `#velen/hub/nilf`. A swipe does not.
  - Hub → quest records `hubReturn {id, y, ui}`, and Return restores that hub y and its foldouts.
  - Stage Previous/Next/picker push a new history entry. Back/Forward restore the exact stage, scroll, foldouts and objective-rail position (`history.state.velenNilfUI`, written via debounced `replaceState`).
  - After a commit or undo the page re-renders in place at the same y.
- **Walkthrough.** The four authored reading stages (Arrival, Road, The Inn, Heatherton) use WO `quest-page` / `reading-panel` / `stage-panel` / `quest-step-nav` layout. Each stage has its preparation foldout and a "Journal objectives at this step" foldout. Progress is in `quest-record-host`.

## 3. Tests (code kit, Node 24)
| Suite | Before (v45 baseline) | After (Slice 2) |
|---|---|---|
| 6-file subset (`progression`, `velen`, `velen-routing`, `main-story`, `departure`, `departure-checklist`) | 62/62 | 62/62 |
| Subset + `slice1-migration.test.cjs` (includes the WO objective graph and 270 progression/branch/departure/correction scenarios) | 89/89 | 89/89 |
| Subset + Slice 1 + `slice2-nilf.test.cjs` | n/a | 104/104 |
| `node --test *.test.cjs` (code kit, no art) | 228/233 | 243/248 |
| Full suite with reference art overlaid in a temp dir (`/tmp/render-*`, not in source) | 233/233 | 248/248 |

The 5 code-kit failures are the same art-only `existsSync(item.art)` / ENOENT failures as baseline:
- `diagrams-art`
- `exploration-art`
- `navigation-art`
- `visual-system`
- `warning-center`

They pass once the 300 reference assets are present. Those assets were fetched read-only from the accepted v45 QA site, and all 300 matched the manifest sha256s.

Logs: `before-*.txt`, `after-subset.txt`, `after-subset-plus.txt`, `after-subset-plus-slice2.txt`, `after-full.txt`.

`slice2-nilf.test.cjs` covers:
- sourced objectives and https sources;
- the conditional fight (8 required, 9 when fought, closed by peace; catch-up asks for the outcome);
- handover: fresh, imported, imported choice, native record preserved, idempotent, and newer/unreadable/unavailable refused;
- completion preservation;
- pyres/mercy untouched;
- the Slice 1 guard after handover;
- commit / undo;
- unknown keys preserved;
- `rollbackHandover`: restored vs `handover-edited`, then the Slice 1 rollback applies;
- the static seam (script order, `app.js` order, no WO hooks, CSS fix);
- protected files byte-identical.

**Headless browser check:** `qa/slice2-browser-check.cjs` ran in Chrome 156 at 390×844 and 844×390. Result: **35/35 pass** (`qa/browser-check-results.txt`). It covers:
- handover on load;
- card tap → hub;
- imported completion with 0 marks;
- Start → stage 1, then Next;
- the choice review dialog (confirm disabled until an outcome is chosen);
- catch-up + fight → 3/9;
- deck Undo;
- Return to hub restores y and foldout;
- Back restores stage, y, foldout and rail;
- reload persistence;
- peace closes the fight (x/8);
- Undo restores the choice;
- nilf progress never reaches the legacy key;
- pyres tap stays select-only with canonical untouched;
- no page errors.

## 4. Rendered evidence
- `qa/renders/local-reference-render_*.png` are **local reference renders**: the code kit plus v45 public assets overlaid in a temp directory. They are not production evidence.
- **Final rendered phone/landscape QA is Cmdr's step:** Cmdr assembles the build with full assets and does the rendered QA before publication, followed by owner Safari testing.

## 5. Limits
- **Duplicated rendering.** WO's `progression-ui.js` is hard-wired to WO globals and document-wide listeners. Velen therefore re-implements the deck and dialog rendering against the same engine and markup contract instead of refactoring protected WO code. The contract's "no second checkbox model" is honoured at the state level, since there is one engine, but not at the render level. See Q2.
- **No toast.** v45 hides `.progress-toast` (`home-rebuild.css`). Undo is the deck's "Undo last progress change", the same as WO.
- **Not included:**
  - A map tool, because there is no Velen map; dead controls are avoided.
  - Speculative warnings.
  - A quest "failed" status control.
  - Changes to Funeral Pyres or John Verdun.
  - Search expansion or new quest chains.
- **Reading position stays in the legacy record.** Clearing only the canonical key, or a refused handover, falls back to the v45 nilf hub.
- **Existing v45 presentation left as is.** The Velen view's save-status line ("Your Velen progress saves in this browser.") and the empty band above the footer are v45 baseline presentation, verified on the baseline render. They are untouched.
- **Background scope.** The background fix applies to the whole `#velen` view, not just nilf. See Q3.

## 6. Open questions (for Cmdr / owner)
1. Should pyres/mercy console cards also open their hub on a stationary tap? Today they keep v45 select-only behaviour; only nilf opens its hub.
2. Should the Velen deck and dialog later be extracted, together with `progression-ui.js`, into one shared, parameterised component, instead of the current markup-compatible duplicate?
3. Is the Velen landscape background acceptable across the whole Velen view (console, pyres, mercy, leads)?
4. Stale pyres/mercy snapshots inside the canonical record come from the Slice 1 import and are explicitly not owners. Should they be pruned when those quests are converted?
5. The Velen console deck still uses its legacy swipe handler rather than `swipe-boxes.js`. Should it be converted in a later slice?
6. Should the save-status line and the empty band below the scroll be moved into the WO paper frame (a v45 presentation item outside this slice)?

## 7. Rollback
`rollback-checkpoint/` contains:
- the untouched v45 copy and sha256 list;
- `README.md` with code rollback steps (`patch -R -p1 < slice2.diff` was verified to reproduce the baseline byte-for-byte);
- the guarded storage rollback: `PhoenixVelenNilfProgress.rollbackHandover(localStorage)`, then optionally `PhoenixVelenMigration.rollback(localStorage)`.

## 8. QA2 corrections (Cmdr hold, four items plus test portability)
Before editing, `source/` was copied to `prefix-qa2/`. Corrections-only diff: `slice2-corrections.diff`.
It touches 5 files: `velen-nilf-objectives.js`, `velen-nilf-progress.js`, `velen-nilf-ui.js`, `slice2-nilf.test.cjs`, and `index.html` (cache-bust `?v=nilf-slice2-qa2-v45` on the three modules only).
`velen-r18.js`, `app.js` and `velen-view.css` are unchanged since the first freeze. The protected WO and Slice 1 files are still byte-identical to v45, now also including `medallion.js`, `home-ui.js`, `home-rebuild.css` and `guide-viewport.css`.
No renderer was added for Funeral Pyres or Mercy, and the shared-component boundary was not touched.

### 8.1 HIGH: no handover after a failed legacy import
- **Fix.** `handover()` now refuses with `legacy-not-imported` and writes nothing when there is no canonical record but the legacy key is present. With no canonical record, a readable legacy save is always imported by Slice 1 first, so this state means the import failed (`legacy-unreadable` or `save-unavailable`).
- **Effect.** The v45 fallback hub stays in charge, and Slice 1 can still import a repaired save. Fresh browsers with no legacy record are still handed over.
- **Regression tests.**
  - Node: unreadable → `legacy-unreadable` + `legacy-not-imported`, with storage byte-identical. Then repair → `imported` → `handed-over`, with the saved completion and peace outcome kept and no objective marks. A quota failure on import also blocks the handover.
  - Browser: fallback hub shown, no canonical key. Then repair + reload → handed-over hub showing "Saved complete".
- **Observed, unchanged v45 behaviour (open question Q7).** When the Velen view renders, the v45 `velen-r18.js` immediately rewrites an unreadable legacy record with its defaults. The baseline render shows the same thing. So in a real browser the next load imports those defaults and hands over. A save restored *after* that point is not re-imported, because the Slice 1 guard keeps the handed-over canonical record. Slice 2 itself writes nothing on the failed load.

### 8.2 MEDIUM: direct-Heatherton route
- **Source.** Witcher Wiki objective list, https://witcher.fandom.com/wiki/The_Nilfgaardian_Connection#Objectives. It groups "Ask about the agent…", "Defeat the baron’s men." and "Finish talking to the innkeep…" under "Unless you go straight to Heatherton".
- **Where it's cited.** The data (`routeSource`), the review dialog ("Route source ↗") and the walkthrough's Sources foldout.
- **Model** (shared engine unchanged; data only):
  - The inn question is now "What happened at the Inn at the Crossroads?". Options: peace / fight / "Went straight to Heatherton — no inn conversation".
  - "Look for the agent… in Heatherton" also carries this question, with `conditionalRequires` peace/fight → finish and direct → travel. Catch-up from any Heatherton step therefore asks which path was taken rather than guessing.
  - The inn objectives (Go to the Inn, Ask, Finish) stay required while the path is unknown, and close (not required, left unmarked) on the direct route. Totals: unknown 8, peace 8, fight 9, direct 5.
  - "Go to the Inn at the Crossroads." is also closed on the direct route, because the player never reaches the inn. The wiki lists it outside the conditional group, so this is flagged as Q8.
- **No invented inn outcome.**
  - Canonical storage keeps `choices.inn` for peace/fight only. The direct route is stored as `activities['velen.nilf'].route = 'direct-heatherton'` and only maps to the engine's path value in memory.
  - Slice 1 imports can never produce the direct route.
  - Objectives that belong to the inn conversation never offer the direct option.
- **Engine quirk handled in the owner.** The engine clears a choice whenever an objective carrying it is unchecked. The new `PhoenixVelenNilfProgress.plan()` keeps a peace/fight outcome when a Heatherton step is unchecked while the recorded inn conversation still supports it. On the direct route, unchecking "Look for…" clears the route.
- **Tests** (Node, all three paths):
  - completion: marks per path, `complete=true`;
  - Undo back to the exact prior state;
  - corrections fight→direct (inn/ask/fight/finish marks removed), Undo back to fight, fight→peace (only the fight mark removed);
  - direct→peace: inn objectives required again and **not** auto-completed (5/8), then Undo;
  - unchecking keeps the outcome.
- **Browser checks:** the direct route through the dialog gives 2/5, the inn cards show "Not required — you went straight to Heatherton. Left unmarked.", and the ask dialog offers peace/fight only.

### 8.3 MEDIUM: shared quick Undo
- **Problem.** The 3-second `.quick-undo` control belongs to the shared medallion (`medallion.js`/`home-ui.js`, unchanged), and its handler undoes WO progress.
- **Fix.** After a saved Velen commit, the Velen UI shows that same control for the same 3 seconds and marks it `data-undo-owner="velen"`. While that window is open, a capture-phase listener claims the tap and calls the Velen owner's `undo()`, so the WO handler never runs for a Velen change.
  - A WO commit or WO undo (`phoenix:progress-committed` / `phoenix:progress-undone`) ends the Velen window immediately, so a WO change is always undone by WO.
  - A Velen commit dismisses an active WO window first.
  - The medallion status line gets the same announcements.
  - The never-visible Velen `.progress-toast` (v45 hides toasts) was removed. The correction-panel Undo is unchanged.
- **Browser checks, both viewports:**
  - The Velen change shows quick Undo owned by Velen; the tap reverses Velen only, with WO storage byte-identical.
  - A no-dialog commit shows it too, and it closes after 3 s while the panel Undo stays available.
  - A WO commit shows quick Undo with WO ownership; the tap reverses WO only, with the Velen record byte-identical.
  - A WO change made inside the Velen window hands quick Undo to WO; the tap undoes WO and the Velen change is kept.

### 8.4 LOW: Sources foldout on return
`Sources & verification` is now part of the captured/restored walkthrough context (`sources`) and of the per-page memory. Browser check: open it, advance a stage, go Back → open; a closed state is also restored closed.

### 8.5 Portable test
The protected-file test no longer depends on `/workspace/...`. It checks pinned sha256s of the accepted v45 files (commit `a9d61c94`), so it always runs and never skips. If `PHOENIX_V45_BASELINE=<v45 dist dir>` is set, it also byte-compares against that directory and fails clearly when the directory is missing. The baseline path was verified with the env var set: 22/22.

### 8.6 Tests after QA2
| Suite | Result |
|---|---|
| 6-file subset | 62/62 |
| Subset + `slice1-migration` (WO graph + 270 scenarios) | 89/89 |
| `slice2-nilf.test.cjs` | 22/22, 0 skipped |
| Full suite, code kit (no art) | 250/255 (same 5 art-only failures) |
| Full suite with read-only downloaded v45 assets (temp dir, not in source) | **255/255, 0 skipped** |
| Headless Chrome original check (390×844 + 844×390) | 35/35 |
| Headless Chrome QA2 check (`qa/slice2-qa2-browser-check.cjs`, both viewports) | 43/43 |

- **Regression evidence against the pre-fix code:**
  - The new Node tests run against `prefix-qa2/`: 13/22 fail (`qa2-new-tests-against-prefix.txt`). These include the handover, direct-route, objective-data, plan-wrapper and conditional-count tests.
  - The QA2 browser check aborts on the pre-fix code at the first direct-route step, because no direct option exists (`qa/qa2-browser-check-against-prefix.txt`).
- **Logs:** `qa2-*.txt`, `qa/browser-check-results.txt`, `qa/qa2-browser-check-results.txt`.
- **Local reference renders (not production evidence):** `qa/renders/local-reference-render_qa2-*.png`. They include the Velen quick Undo (`qa2-{phone,landscape}-fix3-velen-quick-undo.png`), the WO quick Undo (`qa2-{phone,landscape}-fix3-wo-quick-undo.png`), the direct-route dialog and the fix-1 fallback hub. Final rendered phone/landscape QA remains **Cmdr's step**, then physical Safari.

### 8.7 New open questions
7. The v45 `velen-r18.js` overwrites an unreadable legacy save with defaults on its first render (baseline behaviour). Should a later slice stop that overwrite, so a corrupted save can be repaired after the first visit? Changing it alters v45 pyres/mercy saving, so it was not done here.
8. "Go to the Inn at the Crossroads." is closed (not required, unmarked) on the direct route. The wiki lists it outside the conditional group. Is closing it the preferred reading, or should it stay required?
9. The quick-Undo routing is a Velen-side adapter over the shared medallion control, with no medallion change. Should the medallion grow an owner-routing API when the shared-component boundary is agreed?

## 9. QA3 corrections (Cmdr freeze; fix 1 completed, direct-route membership sourced)
Before editing, `source/` was copied to `prefix-qa3/`. Corrections-only diff: `slice2-corrections-qa3.diff` (prefix-qa3 → source).
It touches 7 files: `velen-r18.js` (authorized save guard), `velen-nilf-objectives.js`, `velen-nilf-progress.js`, `velen-nilf-ui.js`, `slice2-nilf.test.cjs`, the new `slice2-save-guard.test.cjs`, and `index.html` (cache-bust only).
The protected WO and Slice 1 files are still byte-identical to v45 (17 pinned sha256s, unchanged). No Funeral Pyres or Mercy UI conversion, no renderer duplication, no shared-component refactor, no next-slice work, no publication.

### 9.1 Save guard in the legacy Velen writer (`velen-r18.js`, owner-authorized)
- **Problem (was Q7).** v45 `velen-r18.js` wrote its blank defaults over an unreadable `phoenix.velen.arrival.v1` on the first render. The next load then imported those blanks and handed over, so the original save could no longer be recovered.
- **Change.** Three marked edits (`QA3 save guard` comments), nothing else in the file:
  1. After the unchanged v45 loader, `legacyUnreadable` is computed once per page session, using the same rule as Slice 1's `legacy-unreadable` (stored text present, and it does not parse or is not a plain object).
  2. `save()` returns early when `legacyUnreadable` is set and shows "Your saved Velen record could not be read, so it is kept unchanged. Changes in this visit are not saved." The rest of `save()` is the v45 function byte for byte. `save()` is the only writer of the legacy key (exactly one `localStorage.setItem(key,` in the file, asserted by test).
  3. The confirm dialog's status line shows the same message instead of "Progress updated…" while guarded.
- **Behaviour.**
  - While the record is unreadable, browsing, card selection, stage navigation, completion marks and choices all work in memory only. The original bytes are never touched, and no canonical record is created (Slice 1 reports `legacy-unreadable`; Slice 2 refuses with `legacy-not-imported`).
  - Because the guard is evaluated once per load, a repair made in another tab or console mid-session is not overwritten. The next load re-evaluates it.
  - Absent, readable, partial and odd-but-valid records take the exact v45 code path.
  - The resume pointer `phoenix.guide.resume.v1` (a different key) is still written as in v45.
- **Pin updated deliberately.** `slice2-nilf.test.cjs` has `SEAM_PINS['velen-r18.js']`, with its history in a comment:
  - accepted v45: `5908676f…3c12be`;
  - Slice 2 freeze 1 + QA2: `ccaa703e…4e4200`;
  - **QA3: `a6f24728b1c25b43a28cacab2a522d9be0b27453cf3602fcacb939cbf53cb898`**.

  Any further edit fails the test until the pin is changed on purpose. (`velen-r18.js` is the Slice 2 seam file, so it is not in the 17-file v45 pin list.)
- **Cache-bust.** `index.html` now loads `velen-r18.js?v=nilf-slice2-qa3-v45` and the three nilf modules `?v=nilf-slice2-qa3-v45`. Note: the first freeze and QA2 had left `velen-r18.js` on its v43 query string even though the seam had changed it. That is corrected here, so a cached older `velen-r18.js` cannot pair with the new modules.
- **Tests.**
  - **Node, `slice2-save-guard.test.cjs`, 8/8.** It runs the real `velen-r18.js` loader and `save()` excerpts with the real data module, Slice 1 import and Slice 2 handover, in `app.js` order. It checks:
    - static: v45 `save()` behind a single guard clause, one writer;
    - five unreadable forms (bad JSON, `[]`, `null`, `42`, `"hello"`): first visit plus two reloads with navigation and interaction attempts keep the exact bytes and create no canonical record, while the v45 writer would have overwritten them; then repair → `imported` → `handed-over` with saved completion and outcome;
    - valid records (absent, `{}`, partial, full, odd, choices-only): writes byte-identical to the v45 writer across 7 interaction steps;
    - a newer canonical record with unreadable legacy: bytes kept.
  - **Headless Chrome, `qa/slice2-save-guard-browser-check.cjs`, 20/20, at 390×844 and 844×390.** Per viewport:
    - unreadable legacy, then first visit plus two reloads, each running console → select Funeral Pyres card → Pyres hub → mark Pyres resolved (confirm) → Mercy hub → record the Mercy decision → Mercy and Pyres walkthrough stages → nilf hub: 27 checkpoints, all with the original bytes and no canonical record, guard message shown, v45 fallback nilf hub;
    - repair → reload → import + handover, handed-over hub shows "Saved complete", repaired completion and choices kept, Pyres saving normal again;
    - two valid records: 9 legacy writes each, byte-identical to the accepted v45 build (`/tmp/render-base`).
  - The QA2 browser check now also asserts that the broken bytes survive the first render and a reload (fix 1).
  - **Against `prefix-qa3/`:** the guard Node test fails 7/8 (`qa3-new-tests-against-prefix.txt`). The browser guard check fails 8/20: bytes overwritten at the first checkpoint, the blank defaults imported, and the repaired save not imported. The valid-record byte-identity checks pass on both builds (`qa/qa3-save-guard-against-prefix.txt`).

### 9.2 Direct-route membership, sourced
**Sources checked 2026-11-16:**
| Source | What it says about bypassing the inn |
|---|---|
| Witcher Wiki objective list, https://witcher.fandom.com/wiki/The_Nilfgaardian_Connection#Objectives (live page blocks automated fetches; read via search-index excerpts) and the full archived copy https://web.archive.org/web/20260110001207/https://witcher.fandom.com/wiki/The_Nilfgaardian_Connection | "Travel to Velen." and "Go to the Inn at the Crossroads." are listed for every path. "Ask about the agent…", "Defeat the baron's men." (if hostile) and "Finish talking to the innkeep…" are grouped under **"Unless you go straight to Heatherton:"**. Then "Look for the agent…", "Talk to the survivor…", "Find…", "Search…". |
| witcher.tools, https://www.witcher.tools/quests/the-nilfgaardian-connection | Lists the inn-route objectives in order; does not describe the bypass. |
| Game8, https://game8.co/games/Witcher3/archives/275617 | Walkthrough via the inn; does not describe the bypass. |
| GameBanshee, https://www.gamebanshee.com/thewitcher3/walkthrough/thenilfgaardianconnection.php | Walkthrough via the inn; does not describe the bypass. |
| Gamer Guides, https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/walkthrough/velen/the-niflgaardian-connection | Walkthrough via the inn; does not describe the bypass. |
| Reddit r/witcher thread "What happens if u go Heatherton directly without asking about Hendrik to innkeeper" (https://www.reddit.com/r/witcher/comments/nigh2s/) | The title confirms the route exists; the thread content could not be retrieved, so it is not used as evidence. |

**Decision.**
- **Go to the Inn at the Crossroads stays required on every path (was Q8).** The wiki keeps it outside the conditional group, and no second source shows it closing, so the evidence is not conclusive. It is never marked automatically. On the direct route its card reads "Still required on the direct route — not marked automatically. Mark it when your journal shows it complete."
- **Ask / Defeat / Finish close on the direct route.** This rests on the wiki alone (live page plus archive). The other four sources do not describe the bypass but do not contradict it either. Stated plainly: there is a single primary source for these three.
- **Totals:** unknown 8, peace 8, fight 9, **direct 6** (was 5). Catch-up on the direct route from "Search…" marks travel, look, survivor, find and search (5/6); the quest completes once Go to the Inn is marked.
- **Citations in data:** `routeSource`, `routeArchive` and `routeCrossCheck` are exported by `PhoenixVelenNilfObjectives`, and every inn-route row carries `routeSource`. The evidence block sits at the top of `velen-nilf-objectives.js`. The walkthrough Sources foldout links the wiki list and the archived snapshot, and the dialog links "Route source ↗".

**Skipped vs completed.**
- **Data.** Skipped objectives are never stored as done. The canonical record carries `route:'direct-heatherton'` plus `bypassed:['velen.nilf:ask','velen.nilf:fight','velen.nilf:finish']` (rewritten on each commit, removed when the route changes), and `objectives` holds only real marks.
- **UI.** Skipped cards read "Not required — you went straight to Heatherton. Left unmarked." with a disabled checkbox. The Go to the Inn card stays an open, enabled checkbox with the still-required note. The banner counts 2/6, not 5/5.
- **Tests:**
  - membership comes from the sourced list;
  - `bypassed` is stored and never counted;
  - every path completes, with Undo;
  - fight→direct changes exactly ask/fight/finish;
  - direct→peace gives 5/8, and Undo returns to 5/6.
- **Browser:** banner 2/6, ask closed, inn still required and unchecked, `bypassed` stored.

### 9.3 Undo adapter
Kept as is (QA2 §8.3), as instructed. No owner-routing API was built in the medallion. Q9 stays open for when the shared-component boundary is agreed.

### 9.4 Tests after QA3
| Suite | Result |
|---|---|
| 6-file subset | 62/62 |
| Subset + `slice1-migration` | 89/89 |
| `slice2-nilf.test.cjs` + `slice2-save-guard.test.cjs` | 24/24 + 8/8, 0 skipped |
| Full suite, code kit (no art) | 260/265 (same 5 art-only failures) |
| Full suite with read-only downloaded v45 assets (temp dir, not in source) | **265/265, 0 skipped** |
| Headless Chrome original check (both viewports) | 35/35 |
| Headless Chrome QA2 check (updated for QA3 expectations) | 45/45 |
| Headless Chrome save-guard check (new) | 20/20 |

- **Logs:** `qa3-*.txt`, `qa/qa3-*-results.txt`.
- **Local reference renders (not production evidence):** `qa/renders/qa3-{phone,landscape}-save-guard-message.png`, `qa3-{phone,landscape}-direct-route-2of6.png` and `qa3-{phone,landscape}-inn-still-required.png`.
- **Observation for Cmdr:** the guard message uses v45's existing save-status line, which sits below the walkthrough scroll near the footer. It is visible, but it is not prominent. Its placement and styling were left as in v45 to keep the change narrow.
- Final rendered phone/landscape QA remains **Cmdr's step**, then physical Safari.

### 9.5 Open questions after QA3
- Q7: resolved by the save guard (§9.1).
- Q8: resolved by evidence. Go to the Inn stays required (§9.2).
- Q9 (medallion owner-routing API): still open, intentionally deferred.

## 10. QA4 correction (direct-route completion)
Before editing, `source/` was copied to `prefix-qa4/`. The corrections-only diff is `slice2-corrections-qa4.diff` (prefix-qa4 → source, 357 lines). It touches 5 files:

| File | Lines added / removed | Change |
|---|---|---|
| `velen-nilf-objectives.js` | +6 / −5 | data |
| `velen-nilf-progress.js` | +33 / −9 | owner |
| `velen-nilf-ui.js` | +13 / −4 | text and states |
| `slice2-nilf.test.cjs` | +88 / −25 | tests |
| `index.html` | +1 / −1 | cache-bust `?v=nilf-slice2-qa4-v45` on the three nilf modules |

These were left alone:
- `velen-r18.js` and its save guard (still pinned at `a6f24728…`);
- the quick-Undo adapter;
- `app.js`;
- the 17 protected v45 files.

### 10.1 Problem
Cmdr's report: on the direct route, recording the final search reached 5/6 but the quest stayed incomplete. "Record whole quest complete" then filled "Go to the Inn at the Crossroads." as completed, although this route bypassed the inn.

### 10.2 Fix
**The inn objective is unconfirmed on the direct route.**
- The wiki lists the objective outside the "Unless you go straight to Heatherton" group but does not say what happens to it on the bypass. So on the direct route its journal status is treated as unconfirmed: neither required nor marked.
- Data: `branch:['inn',['peace','fight',undefined]]` plus `unconfirmedOn:'direct'`.
- It stays required while the route is unknown and on peace and fight, so those totals are unchanged at 8, 8 and 9. The direct total is 5.
- It is not part of the bypassed group (`route` is unset), so the record keeps the two apart: `bypassed` = ask/fight/finish, and the new `unconfirmed` = [inn]. Both lists exist only on the direct route.
- The card reads "Unconfirmed on the direct route — the sources do not establish its journal status, so it is neither required nor marked." The checkbox is unchecked and disabled. The QA3 "Still required…" text is gone.

**Completion on the direct route.**
- Recording the final search (it includes reading Hendrik's notes, which finishes the quest per the cited walkthrough) now completes the quest at 5/5. The inn objective is not marked.
- **Explicit confirmation.** "Record whole quest complete" on the direct route, or with the direct route chosen in its dialog, records a confirmed whole-quest completion:
  - it fills no objective mark and records no inn outcome;
  - the dialog says so;
  - it is stored as `activities['velen.nilf'].confirmedComplete = true`, separate from `objectives` and from imported `legacyComplete`;
  - in memory it is the engine's whole-quest mark plus a `confirmed` flag (`toProgress`/`load`), so the shared engine stays unchanged.
- **On screen.**
  - The summary reads "Quest progress · Confirmed complete · 2/5 objectives recorded".
  - The banner still counts only recorded marks (2/5).
  - Unrecorded objectives read "Not individually recorded — your confirmed quest completion covers it".
  - A note states that unrecorded objectives stay unmarked and that Go to the Inn stays unconfirmed.
- **Removing.** "Remove whole-quest completion" on a confirmed quest removes only the confirmation; recorded marks are kept, and the dialog shows the completion loss.
- **Route changes.** A confirmation belongs to the direct route. Changing the route drops it, and it never turns into imported legacy completion. One Undo restores everything (the snapshot includes `confirmedComplete`).
- **Peace, fight and unknown routes keep the shared engine's existing whole-quest behaviour unchanged.**
- **Route-correction side effect.** Because Go to the Inn is not required on the direct route, correcting fight/peace → direct also removes a recorded Go to the Inn mark, as QA2 did. The review dialog lists it ("objective marks will be removed"), and Undo restores it.
- **Stable key order.** `write()` re-appends `bypassed`/`unconfirmed`, so Undo restores the exact bytes. This only affects direct-route records.

### 10.3 Regression tests
**Node (`slice2-nilf.test.cjs`, now 27).**
- Direct route:
  - membership: inn is unconfirmed, not in the bypassed group;
  - totals: unknown 8, peace 8, fight 9, direct 5;
  - catch-up from the search gives 5/5 and complete, with inn unmarked and not markable, no `choices.inn`, `unconfirmed`=[inn], and no `confirmedComplete`.
- **QA4 regression:**
  - with 2/5 recorded on the direct route, a whole-quest confirmation adds no catch-up, affected or missing choices;
  - it gives `complete`, `confirmedComplete:true` and `legacyComplete:false`, with objectives still only travel and look, no inn mark and no inn outcome;
  - Undo restores the exact prior record (byte-compare, ignoring the one-level `undo` slot);
  - with the route unknown, choosing direct in the dialog confirms with zero marks, and Undo restores it exactly.
- Removing a confirmation keeps marks. direct→peace drops the confirmation without creating legacy completion. Each step is undone exactly, and recording more objectives keeps the confirmation.
- **Other routes unchanged.** A fixed matrix runs in a separate process: plans, commits and undos on unknown/peace/fight, fresh and from imported legacy completion, 125 trace entries in total. Its sha256 must equal `a2f98352…387204`, the hash generated from the QA3 freeze (`prefix-qa4`). With `PHOENIX_SLICE2_QA3_DIST` set, the test also replays against that tree; this was run and passed. A deliberate mutation (always writing `confirmedComplete:false` into the snapshot) makes the test fail.
- **Against `prefix-qa4`:** 6/27 fail, namely the direct-route and QA4 tests (`qa4-new-tests-against-prefix.txt`). The other-routes trace passes there, as it should.

**Headless Chrome (`qa/slice2-qa4-browser-check.cjs`, new, 28/28, at 390×844 and 844×390).**
- Search recorded on the direct route: 5/5, "Quest complete", inn unchecked/disabled/"Unconfirmed…", no inn mark or outcome.
- Confirmation at 2/5: the dialog text, the stored fields, "Confirmed complete · 2/5 objectives recorded", and the panel Undo restoring the exact prior record and re-rendering 2/5.
- Peace whole-quest, fight whole-quest, peace catch-up then removal, and unknown-route Go to the Inn produce canonical bytes identical to the QA3 build (`/tmp/render-preqa4`).
- The QA2 check now expects 2/5 and the unconfirmed inn state on the direct route.

### 10.4 Tests after QA4
| Suite | Result |
|---|---|
| 6-file subset | 62/62 |
| Subset + `slice1-migration` | 89/89 |
| `slice2-nilf` + `slice2-save-guard` | 27/27 + 8/8 (also 35/35 with no env vars set) |
| Full suite, code kit (no art) | 263/268 (same 5 art-only failures) |
| Full suite with read-only downloaded v45 assets (temp dir, not in source) | **268/268, 0 skipped** |
| Headless: original check | 35/35 |
| Headless: QA2 check | 45/45 |
| Headless: save guard | 20/20 |
| Headless: QA4 check (new) | 28/28 |

- **Logs:** `qa4-*.txt`, `qa/qa4-*-results.txt`.
- **Renders (JPEG, local reference only):**
  - `qa/renders/qa4-phone-direct-route-complete.jpg`
  - `qa/renders/qa4-landscape-direct-route-complete-1-status.jpg` (summary/banner)
  - `qa/renders/qa4-landscape-direct-route-complete-2-inn.jpg` (inn card)

  The QA3 render `qa3-*-inn-still-required.png` is superseded by these and kept only as history.
- Final phone/landscape QA remains Cmdr's step, then physical Safari acceptance.

## 11. QA5 correction (app.js cache tag; owner/Cmdr release blocker)
Scope: one entry-point edit plus one regression test, starting from the hash-verified QA4 deliverables
(`PHOENIX-v45-slice2-QA4-deliverables.zip` sha256 `18642c7b892ae1a5df2afede4cc23523121752a3b3a396748f5ab10402ded7ac`;
its source zip `bdc000db…f266d8` is byte-identical to the frozen `/workspace/v45/source`). No application logic changed.
Pyres/Mercy untouched and still incomplete at objective level. Not deployed or published.
This section was written by LT for its own correction (self-review). It does not replace PFC's corrected §1–§10.

**Defect (QA4).** `app.js` changed in Slice 2 (the handover call, `app.js:377-379`), but `index.html` still loaded it as
`app.js?v=regional-foundation-v45`, the v45 URL. With long-lived caching, a returning browser runs the cached v45
`app.js` next to the new modules. The handover never runs, so the Nilfgaardian hub falls back to the v45 view and shows no
objective controls.

**Fix.** `index.html` line 2 (col 3100): `app.js?v=regional-foundation-v45` → `app.js?v=nilf-slice2-qa5-v45`.
That is the only application-file change (`slice2-corrections-qa5.diff`, 139 lines including the new test).

**Entry-point audit (every packaged HTML / manifest / precache).**
| Entry point | Loads | Result |
|---|---|---|
| `index.html` | all app scripts/styles | app.js tag was stale → **fixed**; other changed/new refs already distinct (below) |
| `velen.html` | `velen-routing.js`, `velen-entry.js` (both v45-unchanged; links to `index.html#velen`) | no change needed; file byte-identical to v45 |
| `wolf-dock-qa.html` | iframe `/#gear-diagrams` (= index.html), no scripts | inherits index.html; no change |
| `art-white-orchard/credits.html` | images only | no change |
| service worker / precache / web manifest | none exist (no `serviceWorker`, `caches.`, `importScripts`; the 5 `manifest.json` files are art manifests) | n/a |
| dynamic loaders | no script is injected at runtime (only `img.src`) | n/a |

Tags of every Slice 2 file vs v45:
| File | v45 tag | QA5 tag | Distinct |
|---|---|---|---|
| `app.js` | `regional-foundation-v45` | `nilf-slice2-qa5-v45` | yes (QA5 fix) |
| `velen-r18.js` | `velen-shell-v43` | `nilf-slice2-qa3-v45` | yes |
| `velen-view.css` | `velen-shell-v43` | `nilf-slice2-v45` | yes |
| `velen-nilf-objectives.js` / `-progress.js` / `-ui.js` | (new) | `nilf-slice2-qa4-v45` | yes (new URLs) |

**Protected files.** None of the four HTML entry points is in the 17-file `PROTECTED` table (`slice2-nilf.test.cjs:134-152`).
`index.html` was already a Slice 2 file. No conflict, and the 17 files are unchanged (pinned test plus a byte-compare with `PHOENIX_V45_BASELINE`).
`SEAM_PINS['velen-r18.js']` stays `a6f24728…cb898`, because `velen-r18.js` is unchanged since QA3.

**Regression test (new) `slice2-cache-tags.test.cjs`.** For every `*.html` in `dist/`, every local script or stylesheet
whose bytes differ from v45, or that is new, must carry a `?v=` tag different from the one v45 used. The v45 tags and
sha256s of all 75 v45 refs are pinned in the file, so the test needs no baseline path. With `PHOENIX_V45_BASELINE` set,
the pins are also re-derived from the v45 tree and must match. The test asserts `app.js` = `nilf-slice2-qa5-v45`.
Control: the same test on the QA4 tree fails with `index.html: app.js changed since v45 but still uses the v45 tag ?v=regional-foundation-v45`.
No existing test asserted tags, so no pins needed updating.

**Tests (Node 24.22.1).**
| Suite | Result |
|---|---|
| 6-file subset | 62/62 |
| Subset + `slice1-migration` | 89/89 |
| `slice2-cache-tags` + `slice2-nilf` + `slice2-save-guard` | 37/38 + 1 skipped (baseline env not set); 38/38 with `PHOENIX_V45_BASELINE` |
| Full suite, code kit (no art) | 265/271, 1 skipped (same 5 art-only failures) |
| Full suite with read-only v45 assets | 270/271 + 1 skipped; **271/271** with `PHOENIX_V45_BASELINE` |
| Reference: v45 baseline, full with assets | 233/233 |
| Reference: QA4 rerun, full with assets | 268/268 |
| Headless (QA4 suites re-run on QA5, full assets) | original 35/35, QA2 45/45, QA4 28/28, save guard 20/20 |

**Returning-browser check (headless Chrome, persistent profile, 390×844 and 844×390, full assets).** Session 1 serves
v45 with `Cache-Control: public, max-age=31536000, immutable`. HTML is served `no-cache`. A v45 Velen save is seeded,
and v45 imports it. The browser is closed, and the server switches to the candidate build on the same origin.
Session 2 reopens the same profile (CDP Network log plus server log):
- **QA5: 38/38.** `app.js?v=nilf-slice2-qa5-v45` was fetched from the server (200, not from disk cache). All 6 changed
  or new files came from the server, while 71 unchanged v45 files came from the disk cache, which shows the cache was in use.
  - The handover ran on the first load.
  - Tapping the Nilfgaardian card opens the hub, where the "Quest progress" section starts collapsed. Expanding it shows 9 objective controls.
  - Marking Travel was recorded canonically and persisted after reload.
  - Return → Velen console → card → hub kept it, and so did history back and forward.
  - No page errors.
- **QA4 control: 18/32.** `app.js?v=regional-foundation-v45` came **from the disk cache** (the old v45 app.js; the server
  never saw the request). The handover did not run. The card tap stayed on `#velen`. Going directly to `#velen/hub/nilf` shows the v45
  fallback hub with no progress section and 0 objective controls. This reproduces the blocker.
- Supplementary run with the policy the live v45 host serves today (`public, max-age=0, must-revalidate` + ETag): QA5 38/38
  and QA4 38/38, because the browser revalidates. Under that header Chrome does not show the QA4 defect. The tag fix still matters for
  the Cloudflare edge (`cf-cache-status: HIT` keyed by URL), for any longer cache policy, and for Safari heuristics, none of which can be tested here.

**Release file list (QA5).** Changed: `app.js`, `index.html`, `velen-r18.js`, `velen-view.css`. New:
`velen-nilf-objectives.js`, `velen-nilf-progress.js`, `velen-nilf-ui.js`, `slice2-nilf.test.cjs`,
`slice2-save-guard.test.cjs`, `slice2-cache-tags.test.cjs`. sha256 values are in `RELEASE-FILES-QA5.sha256`.

**Rollback.** `rollback-v45-a9d61c94/` is self-contained. It holds the full v45 kit (220 files, sha256-verified), the manifests,
the reverse diff, `restore_and_verify.py` (tested: the QA5 copy plus assets was restored byte-identical to v45 plus assets), the prior freezes
`prefix-qa2…qa5` and all correction diffs. Storage is never deleted. See the bundle README §3. QA5 adds no storage fields.

**Not testable here.** Physical iPhone/Safari (owner), the Cloudflare edge cache after a real deploy, touch and VoiceOver.
