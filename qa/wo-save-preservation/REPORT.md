# White Orchard save preservation (audit finding D2) — investigation report

> **QA6 addendum (branch `fix/wo-save-preservation`):** the correction proposed below has been implemented as QA6, with
> Cmdr's decision that missing/string/unsupported versions are preserved, and D4 corrected at `dist/velen-r18.js:19`.
> The probe was extended (`--build label=dir`, empty-string input, Velen at both viewports, `d4:` flow) and re-run on
> v45 / QA5 / QA6: `qa/wo-save-preservation/qa6/` (144 runs). Self-review and matrix: `docs/QA6-REVIEW.md`. Everything
> below this note is the original investigation report, unchanged.


**Author:** LT. **Evidence label for every runtime result below:** `author-supplied` (LT's own probe runs, not independent review).
Source references are `source-inspection` unless a write stack from the probe is quoted.
**Scope:** reproduce and document D2. No application change, no deployment, no workflow, no merge, no Pages change.

| | |
|---|---|
| Candidate (QA5) | `5ba73ace7d05551c877021de6e6fd0a2242a1e3a` (`recovery/v45-qa5`) |
| Baseline (v45 snapshot) | `d1df0e3e2c40cad172577f4725daa7233fc8c41e` |
| Branch of this report | `investigation/wo-save-preservation`, parent `5ba73ace…`; `dist/` unchanged |
| Probe run | 2026-11-16 7:19 PM CST; Google Chrome 156.0.8078.47 headless, Node v24.22.1; 80 runs, fresh throwaway profile per run |
| Viewports | 390×844 and 844×390 (mobile emulation) for every White Orchard case; Velen cases 390×844 |
| Valid record fixture | `fixtures/valid-record.json`, sha256 `1c55d017171f31bda61c156a7150d770aa7aa38def32e96f81e172a3da9c0dbf`, produced through the normal UI on the baseline (Lilac and Gooseberries: tick "ride", confirm; the engine also completes "ghouls") |

`dist/app.js` lines 1–373 are byte-identical in both commits (QA5 only inserts three lines at 377–379), so every White Orchard
line number below applies to both commits. The key name is confirmed as `phoenix.whiteorchard.interaction.v1` (`dist/app.js:46`).

## Verdict

**D2 reproduces on both commits, identically. Also fails on baseline: yes.** Any stored White Orchard record the loader cannot use
— invalid JSON, a non-object, an object without `version: 1`, an unsupported version, or a record whose read throws — is
overwritten on the **first page load**, before the user touches anything, and the page says
"Progress and your place save in this browser." Nothing is ever deleted (`removeItem`/`clear`: 0 calls in all 80 runs); the
data loss is entirely by overwrite from `persist()`.

## Mechanism (source, both commits)

| Step | Location |
|---|---|
| Load: `JSON.parse` of the record; anything other than `saved.version === 1` silently falls back to defaults; parse/read error sets `saveAvailable = false` | `dist/app.js:61-85` (guard at `:65`, catch at `:85`) |
| Second and third independent re-reads take `progress`, `groupOpen`, `routeUpdates`, `progressUndo`, `mapContext`, `noticeRead` from the record **without the version check** | `dist/app.js:86`, `:87` |
| `persist()` writes unconditionally and then sets `saveAvailable = true`, which erases the earlier failure flag; the message follows the flag | `dist/app.js:90-94` (`setItem` at `:91`, message at `:93`) |
| Every `render()` calls `persist()`, including the initial render at start-up | `dist/app.js:319` (initial call `:383` QA5 / `:380` baseline) |
| Message also written by `reflect()` from the same flag | `dist/app.js:202` |
| Other writers seen in the stacks (all go through `persist()`): scroll/return restore, progress apply, Undo | `dist/app.js:327`; `dist/progression-ui.js:14` (`apply`), `:17` (`undoLast`) |

Observed write stack for the first overwrite (every overwritten case, both commits):
`persist (app.js:91:23) < render (app.js:319:15) < app.js` start-up — phase `load`, i.e. before any interaction.

## Finding table

"Overwritten" = stored bytes differ from the seeded bytes after load and remain so through two reloads. Results were the same
in both viewports for every case. Write counts are for the White Orchard key (or the Velen key for Velen rows) across
load → interaction → 2 reloads. Full per-phase bytes and write stacks: `results.json`; condensed: `summary.json`.

| # | Input (stored before load) | Baseline d1df0e3e | QA5 5ba73ace | Byte preservation | Message accuracy | Source |
|---|---|---|---|---|---|---|
| 1 | Invalid JSON, `not json {` | Overwritten at load with defaults (objectives `{}`), 14 writes | Same | **No** (both) | **Inaccurate**: "Progress and your place save in this browser." while it has just replaced the user's record | `app.js:64,85,91,93,319` |
| 2 | Invalid JSON, valid record truncated mid-way | Same as 1 | Same | **No** | **Inaccurate** | same |
| 3 | `[]` | Overwritten at load (defaults), 14 writes | Same | **No** | **Inaccurate** (no failure is even detected: `:65` falls through) | `app.js:65,91,319` |
| 4 | `"hello"` | Same as 3 | Same | **No** | **Inaccurate** | same |
| 5 | `null` | Same as 3 | Same | **No** | **Inaccurate** | same |
| 6 | `42` | Same as 3 | Same | **No** | **Inaccurate** | same |
| 7 | `{"foo":1}` (object missing required fields) | Same as 3 | Same | **No** | **Inaccurate** | same |
| 8 | Populated record with `version: 2` | Overwritten at load as `version: 1`; objectives kept (via `:86`), version marker lost | Same | **No** | **Inaccurate** (no notice that an unsupported record was converted) | `app.js:65,86,87,91` |
| 9 | `version: 2` with divergent fields (`completed.q-lilac: true`, `selectedHub: hub-missing`) | Overwritten: objectives kept, `completed` and `selectedHub` silently discarded, rewritten as `version: 1` | Same | **No**; partial silent import | **Inaccurate** | `app.js:65-78` vs `:86-87` |
| 10 | Populated record with `version: "1"` (string) | Same as 8 | Same | **No** | **Inaccurate** | `app.js:65` |
| 11 | Populated record with no `version` | Same as 8 | Same | **No** | **Inaccurate** | `app.js:65` |
| 12 | Valid populated record (fixture) | Read correctly; rewritten in normalised form at load (expected: `completed` key order, `stageByView` default added); objectives survive interaction (tick → confirm → Undo) and 2 reloads | Same; final bytes **identical to baseline** in both viewports (sha256 `780bf350…`) | Content preserved; bytes normalised (expected v45 behaviour) | Accurate | `app.js:61-79,91` |
| 13 | No record | Default record written at load, 14 writes | Same; final bytes identical to baseline (`2ee5531e…`) | n/a | Accurate | `app.js:80-84,91` |
| 14 | Read failure: `getItem` throws for the key, persistently | Overwritten at load with defaults; 14 writes | Same | **No** | **Inaccurate**: failure flag set at `:85` is reset by `persist()` at `:91`; user sees "save in this browser" | `app.js:62,85,86,87,91` |
| 15 | Read failure on the first load only (storage works again on reload) | Overwritten at load; after reload 1 the record holds defaults, so the original progress is **gone** once storage recovers | Same | **No** — data loss | **Inaccurate** | same |
| 16 | Write failure for the key (`QuotaExceededError`) | Bytes kept; 14 writes refused; in-session progress, Undo still work | Same | **Yes** | Accurate: "Saving is unavailable. Changes last for this visit only." | `app.js:91-93` |
| 17 | Write failure for every key (quota) | Bytes kept; 14 refused | Same | **Yes** | Accurate (White Orchard and Velen both report unavailable) | `app.js:91-93`; `velen-r18.js` save() |
| 18 | `window.localStorage` access itself throws (storage blocked) | Bytes kept; home renders; "Saving is unavailable…" | Bytes kept, **but start-up aborts**: uncaught `SecurityError` at `velen-r18.js:19` (via `app.js:380`), initial `render()` never runs, the start page is **blank** (no view visible) until the user navigates; save message empty after load and both reloads | **Yes** (both) | Baseline accurate; QA5 shows no message after load | see D4 below |
| V1 | Velen `phoenix.velen.arrival.v1` = `{"stage":` | Overwritten at load, 6 writes, "Your Velen progress saves in this browser." | **Bytes kept** through Velen view, quest, return, 2 reloads; 0 writes; "Your saved Velen record could not be read, so it is kept unchanged. Changes in this visit are not saved." | Baseline No / QA5 **Yes** | Baseline inaccurate / QA5 accurate | `velen-r18.js:13` (guard), `:21` (save) |
| V2 | Velen = `[1,2]` | Overwritten | Bytes kept, guard message | Baseline No / QA5 Yes | as V1 | same |
| V3 | Velen = `"x"` | Overwritten | Bytes kept, guard message | Baseline No / QA5 Yes | as V1 | same |
| V4 | Velen absent | Default written | Same, identical final bytes (`bc657eb3…`) | n/a | Accurate | same |

No page errors in any run except row 18 on QA5 (three uncaught `SecurityError`s: load, reload 1, reload 2). The only
other log entries were `favicon.ico` 404s from the probe's static server.

## Read vs write failure — answers to order item 4

* **Can a failed read lead to later writes of defaults? Yes, on both commits, immediately.** A read that throws (rows 14–15) or
  returns unusable data (rows 1–11) leaves defaults in memory; the start-up `render()` → `persist()` writes them over the
  stored record within the first page load. Row 15 shows the worst case: a one-off read failure permanently replaces the
  user's progress even though storage is healthy again on the next visit.
* **Write failures are handled correctly** on both commits (rows 16–17): no bytes change, and the message is accurate.
* **Status message:** `persist()` re-derives `saveAvailable` from the *write* only, so read failures are never reported; there is
  no "blocked" state distinct from "unavailable".

## Additional finding — D4 (new, QA5 only): blank start page when storage access is denied

* Also fails on baseline: **no**. Evidence: `author-supplied` (rows 18; screenshot check, both builds).
* `dist/velen-r18.js:19` (QA5) evaluates `storage: localStorage` outside any `try` while building the Nilfgaardian UI. When the
  `localStorage` getter throws (browser set to block site data/cookies; some embedded or privacy contexts), the exception
  escapes `window.createPhoenixVelen(...)` at `dist/app.js:380`, so `app.js:381-383` (views refresh, `phoenix:views-ready`
  listener, initial `updateTree(); render();`) never run. Result: no view is shown on load; the page is header + footer only.
* Baseline handles the same condition (home renders, "Saving is unavailable" when a save is attempted).
* Not a D2 item and not in this assignment's scope to fix; reported for Cmdr's QA5 review because it is a QA5 regression in a
  condition that Safari can produce. Smallest likely fix (not implemented): wrap the `createPhoenixVelen` call at `app.js:380` so start-up
  continues (touches only `app.js`), and/or obtain storage inside a `try` at `velen-r18.js:19`. `velen-r18.js` is pinned in
  `dist/slice2-nilf.test.cjs` (QA5 pin), so an edit there must be reported before it is made.

## Proposed correction for D2 (NOT implemented)

Mirror the QA3/QA4 Velen guard in `dist/app.js` only; no other file needs to change for D2.

1. **Classify once at load** (replace the three reads at `:62`, `:86`, `:87` with one read): `readFailed` if `getItem` throws;
   `unreadable` if the text exists and `JSON.parse` throws, or the value is not a plain object, or `version !== 1`
   (covers rows 1–11 and 14–15). Absent ⇒ normal (legacy pilot import at `:80-84` unchanged).
2. **Populate `progress`, `groupOpen`, `routeUpdates`, `progressUndo`, `mapContext`, `noticeRead` from the same parsed, accepted
   record** — never from a record that failed the version check (removes the partial import of rows 8–11).
3. **Guard `persist()`** (`:90`): if `readFailed || unreadable`, do not call `setItem` for the key, keep state in memory, set the
   message, return. Valid/absent records go through the existing line `:91` unchanged, so valid-save bytes stay identical to v45.
4. **Three distinct messages** (`:93` and `:202`, one helper): normal "Progress and your place save in this browser."; write failure
   (existing) "Saving is unavailable. Changes last for this visit only."; blocked (new) e.g. "Your saved White Orchard progress
   could not be read, so it is kept unchanged. Changes in this visit are not saved." Do not let a successful write elsewhere
   clear the blocked state.
5. **Repair path:** none in this correction (same as the Velen guard). A user-confirmed "start fresh / export the unreadable
   record" action is a separate, later item.
6. **Cache tag:** bump `app.js?v=` in `dist/index.html` to a new distinct value (e.g. `wo-save-guard-qa6-v45`); `index.html` is the only HTML
   file that loads `app.js` (checked with grep on QA5; `wolf-dock-qa.html` embeds `index.html`).
7. Decision for Cmdr: treat records with **missing** or **string** `version` as unsupported (preserve, block) — recommended,
   because v45 already ignores everything except `progress` in them — or migrate them. There is no evidence in the snapshot of
   any shipped writer that omitted `version`.

`app.js` is not among the protected files pinned in `dist/slice2-nilf.test.cjs` (17 protected + the `velen-r18.js` pin); `index.html` is changed only on the
cache-tag line, as in QA5.

### Acceptance checks (proposed)

1. Rows 1–11, 14 and 15 above: stored bytes **byte-identical** before load, after load, after interaction (hub → quest →
   back → tick → confirm → Undo → home) and after reload 1 and 2, both viewports; zero `setItem` calls for the key.
2. Blocked message shown for rows 1–11, 14–15; normal message never shown while blocked; in-session progress and Undo still work.
3. Row 12 (valid) and row 13 (absent): final bytes **identical to baseline** (`780bf350…`, `2ee5531e…`) through the same flow.
4. Rows 16–17 (write failure): unchanged behaviour — bytes kept, "Saving is unavailable…".
5. No write of defaults after any read failure (row 15 must keep the original bytes after storage recovers on reload).
6. Velen guard intact: V1–V3 bytes kept with the guard message, V4 identical to baseline; `slice2-save-guard.test.cjs` passes.
7. Unit tests (Node, no browser) in a new `wo-save-guard.test.cjs` covering classification and the `persist()` guard; full suite
   with `PHOENIX_V45_BASELINE` set stays green (currently 271/271 on QA5).
8. Cache tag: `slice2-cache-tags.test.cjs` (or its successor) fails if `app.js` changes without a new `?v=`; returning-browser
   check (cached QA5 → new `app.js` fetched).
9. If D4 is taken into the same correction: row 18 renders the start page with "Saving is unavailable…" and no uncaught error.

## How to run the probe

Requirements: Node ≥ 22 (uses the built-in `WebSocket`; no npm packages) and any Chrome/Chromium. Each run creates and deletes
its own temporary profile; nothing touches an existing browser profile.

```sh
# from a checkout of this branch (its dist/ is QA5 5ba73ace, unchanged)
git worktree add ../wo-baseline d1df0e3e2c40cad172577f4725daa7233fc8c41e   # baseline checkout
CHROME_PATH="$(command -v google-chrome || command -v chromium)" \
PHOENIX_DIST_BASELINE=../wo-baseline/dist \
PHOENIX_DIST_CANDIDATE=dist \
PHOENIX_WO_VALID_RECORD=qa/wo-save-preservation/fixtures/valid-record.json \
node qa/wo-save-preservation/probe.cjs --jobs 4 --out qa/wo-save-preservation/results.json
node qa/wo-save-preservation/summarize.cjs qa/wo-save-preservation/results.json   # writes summary.json, prints the table
```

Options: `--only <substring>` runs matching cases (e.g. `--only fault:`), `--jobs N` parallel browsers. Without
`PHOENIX_WO_VALID_RECORD` the probe first generates a valid record through the UI on the first build listed. The run takes
about 8 minutes at `--jobs 4`.

What it does per run: seed the key on a blank same-origin page → snapshot all `localStorage` (via DevTools `DOMStorage`, not the
page) → install a pre-page script that logs every `setItem`/`removeItem`/`clear` (key, full value for the White Orchard and Velen
keys, stack) through a DevTools binding and optionally injects the fault → load `index.html` → snapshot → hub → quest → back →
tick objective → confirm → snapshot → Undo → home → snapshot → reload ×2 with snapshots. Save-status text
(`[data-save-message]`, `#velen-save-status`) and visible views are captured at each snapshot, plus uncaught exceptions and
console/log errors.

## Not tested / limits

* Physical iPhone Safari, WebKit's storage partitioning/ITP 7-day eviction, Safari Private Browsing, and real quota exhaustion:
  untested. Read and write failures were **simulated** by overriding `Storage.prototype` / the `localStorage` getter in Chrome; the
  exception types match what browsers throw, but the trigger conditions on iOS were not reproduced.
* Touch input and VoiceOver: not exercised (probe uses DOM `click()`).
* The live site was not probed (order: never test damaged records on the owner's profile); live v45 `dist/app.js` is
  byte-identical to the baseline snapshot, so D2 is expected there too (`source-inspection` + snapshot identity, not reproduced live).
* Other keys (`phoenix.guide.resume.v1`, `phoenix.whiteorchard.pendingWarnings.v1`, `phoenix.region.velen.v1`, Velen keys) are
  captured per phase in `results.json` but were not seeded with damaged data in this assignment.
