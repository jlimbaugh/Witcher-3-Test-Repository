# Velen v50 quest update candidate

- Frozen reviewed application source: `e8b818492bbc71450453a69686bf1a7f0d3042ac` (draft PR #26).
- Frozen application Git tree: `c176469c1c39d072a74b89aaf10e5763d0be5b1e`. Matches the accepted batch 14 application byte-for-byte.
- Scope: the 70 accepted walkthrough and hub-progress entries and earlier shared changes already present in the same private candidate. Regional aggregate progress and the coverage audit are follow-up work.
- Public baseline and intended rollback: Sites v49, source `02daa30f3799a45cd5b01433e777c1ac39d0b804`, deployment `appgdep_6afe992d558c8191ad23907f78478800` (succeeded), archive hash `sha256:530c58907607680141cee53be76ded7c81211478ce73e14ebdeccfe9665f885f`. GitHub application baseline `ba59252cb65800225a68297b6ce7068d3b91ff9b`.
- Local release-preparation check: `node scripts/ci-verify.cjs test dist 344` with the v45, QA5 and QA6 baseline directories. 344 passed, zero failures or skips. Includes source checks for LT49-RT-01 and automated save-guard, migration, and Undo checks. No physical-device or independent exact-candidate retest was run here.

## Release checks still open

- Independent exact-candidate retest of PR #25 findings, starting with LT49-RT-01 from the Velen console and walkthrough. Record pass/fail or explicit deferral by finding ID.
- Returning iPhone Safari upgrade from v49 with a disposable existing-save profile, including caching, retained progress, and Undo. Prior batch passes are quest-page acceptance evidence.
- Verify v49 rollback against progress written by this candidate without changing the public deployment. The saved rollback version is available; a complete rehearsal remains open.
- Record the bounded release decision and publish only after these checks. The public site still serves v49.

## Cross-version storage rehearsal

The public build marker still identifies v49 application commit `ba59252cb65800225a68297b6ce7068d3b91ff9b`. Using the exact v49 and v50 source modules with disposable storage, v49 created an existing Nilf record, v50 read it and recorded progress, and v49 read and undid the v50 write for the peace, fight, and direct routes. The legacy Arrival record remained byte-for-byte identical. A new Griffin School Gear objective record remained in storage during the v49 module rollback and was visible again in v50. v49 does not display that new tracker.

This completes the targeted storage rehearsal for those paths. It leaves the returning-browser cache and interaction checks, physical Safari upgrade, and independent candidate retest open. No public release or rollback was performed.
