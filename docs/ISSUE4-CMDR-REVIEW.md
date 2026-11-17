# Shared walkthrough checkpoint review

2026-11-17, Cmdr. PR #7 remains WIP into `implementation/shared-walkthrough-v1`.
Reviewed input: `adb2f507fbbc4f6002b4e871d90c0b1bedde6e9e` (LT).
Live remains QA6, Sites version 46. No merge or deployment is authorized here.

## Results and evidence

| Check | Result | Evidence |
|---|---|---|
| Exact checkout and LT manifest | PASS before edits; clean checkout at the full input SHA | Independent |
| Full suite with v45, QA5 and QA6 baselines | 322/322, no skips, no failures on LT's application | Independent |
| Pending-warning malformed entry | `[{}]` was accepted, then overwritten with `[]` by pruning | Independently reproduced using the checkpoint's exact guard functions; source inspection of startup pruning |
| Follow-up suite after fixing validation | 323/323, no skips, no failures | Cmdr-run, includes Cmdr-authored code; requires another officer's review |
| Full candidate-to-QA6 file rollback | PASS, all paths, bytes and executable modes match | Cmdr-authored tool and Cmdr-run checks; requires another officer's review |
| Wrong start, extra file, modified file or changed executable mode | Exit 3, no writes | Cmdr-run rollback checks |
| Browser journeys / denied storage / content reachability | BLOCKED before any page loaded | Chromium cannot create its process-singleton socket in this environment |
| Visual parity, contrast, physical Safari | NOT VERIFIED | No new images or browser claims |
| CI candidate identity pin | Deliberately unchanged; candidate cannot pass the frozen QA6 pin | Source inspection |

The baseline question for the pending-warning defect is **yes, by source inspection**:
QA6 also loads pending lists and prunes/writes them without semantic validation.
The new guard was intended to preserve damaged records but accepted any object,
including `{}` and arrays. Validation now requires the fields produced by the
pending-warning writer, while leaving valid records and the existing keys in use.
This is a pre-existing warning-record preservation gap, not objective-progress loss.

## Changes in this follow-up

- Tighten pending-warning validation in protected `home-ui.js`; add a malformed-entry
  regression and deliberately update only that candidate pin. Historical pins remain.
- Allow `CHROME_PATH` in the CDP harness; report browser startup failures explicitly.
- Reachability harness waits for the actual requested quest view and mounted adapter,
  and compares text without case sensitivity because setup headings are uppercased.
  This fixes identified harness defects; it does not establish content parity.
- Replace the journey assertion containing `|| true` with an actual comparison of
  objective progress and counts before and after acknowledging a warning.
- Add a ten-file candidate release manifest and full candidate/QA6 inventories.
- Add a separate rollback tool. Existing QA6/v45 rollback material is untouched.

## Candidate-to-QA6 rollback

Use a separate disposable directory first. QA6 kit must be the exact checkout of
`804a3a2c83529fdc707ca5278fb3bcf39d50d771`. Paths below are placeholders.

```sh
python3 tools/issue4/rollback-to-qa6.py --dist /path/to/candidate/dist --qa6-kit /path/to/qa6-checkout --dry-run
python3 tools/issue4/rollback-to-qa6.py --dist /path/to/candidate/dist --qa6-kit /path/to/qa6-checkout
```

The script checks full inventories before any mutation, restores seven changed files,
removes three candidate-only files and verifies the complete QA6 file inventory.
It refuses an unexpected starting tree with exit 3, and offers no force option.
It operates on files only: no browser storage, Sites deployment or audience changes.
File-copy failure can interrupt a restore; keep the candidate and QA6 checkouts intact
and use the saved QA6 Sites version for a hosting rollback if a release is authorized.

## Remaining acceptance work, in order

1. Run corrected reachability in an environment that can start Chrome; investigate all
   missing text rather than treating the harness fixes as proof. Include all WO quests,
   optional objectives, setup stages and route-dependent content.
2. Run journeys, save probes and cached upgrade on the final application bytes at both
   phone sizes. LT's earlier browser results remain author-supplied and pre-follow-up.
3. Produce paired WO/Velen renders against the approved mockups and measure contrast.
   Verify keyboard semantics, focus, no overflow and no floating-wolf overlap.
4. Resolve whether falling back to the stage's first objective after a closed tab meets
   the owner's last-viewed requirement; no new storage is silently authorized.
5. Independently review Cmdr's pending-warning fix and rollback tooling.
6. Only after the candidate checks pass, make a separate reviewed CI pin/totals update.
   Current expected follow-up total is 323; do not lower checks or weaken ancestry.
7. Keep draft until engineering review is complete; physical Safari remains an owner
   acceptance step. No merge or publish is part of this checkpoint.

Evidence summaries: `docs/issue4-evidence/unit-summary.json` and `rollback-checks.json`.
