# Operation Phoenix — Repository Audit, Stage 05: Tests, CI, QA, Release Safety
Date: 2026-11-23
Status: Capt source audit for Grok independent review; awaiting owner acceptance
Scope: docs/phoenix-art-master-catalog source tree and QA/release records. Read-only application audit. No tests executed or deployment contacted in this stage.

## Verified source inventory
- Complete recursive Git tree inspected at tree SHA 33063b76440fd6dc706d7c9c94cea9398e6882d1.
- 37 dist/*.test.cjs test files; includes progression, save guards, storage-denied startup, Velen, search, warnings, navigation, swipe/gesture, walkthrough, Character, and rendering tests.
- One tracked GitHub Actions workflow: .github/workflows/qa6-verification.yml.
- scripts/ci-verify.cjs has selftest, manifest coverage and strict test modes; strict TAP summaries require exact test/pass totals and zero fail, cancelled, skipped, todo.
- docs/MANIFEST.sha256, docs/RELEASE-FILES-QA6.sha256 and numerous rollback and asset manifests are present. Presence is not current hash verification.
- docs/rollback/restore_and_verify.py and README.md document QA6→QA5 and QA6→v45 restoration with source checks, hashes, and a dry-run option.

## Exact release record evidence
- docs/RELEASE-QA6.md reports QA6 publication November 17, Sites v46, deployment succeeded, 233/271/307 test gates, zero skips, and explicitly states physical Safari, live edge behavior, touch, VoiceOver and independent served-asset verification remained untested.
- docs/RELEASE-SESSION-3-V47.md reports v47 deployment and 338 tests passing; independent LT QA, physical Safari, and served-asset verification pending.
- docs/RELEASE-VELEN-V49.md reports v49 published November 19 before independent LT QA; 340 automated tests passed, author Chromium checks; independent LT QA and physical iPhone Safari acceptance remained open.
- docs/QA6-REVIEW.md labels its QA6 evidence author-supplied, not independent.
- docs/rollback/README.md cautions that rollback is files-only and must not delete user localStorage. Reverting to v45 can restore prior save-corruption risk, as noted in release record.

## CI configuration inspection
- .github/workflows/qa6-verification.yml triggers on pushes to ci/qa6-independent-checks and fix/wo-save-preservation; PRs targeting fix/wo-save-preservation or main; and manual dispatch.
- It checks ancestry and dist/docs rollback SHA against QA6 commit 804a3a2c83529fdc707ca5278fb3bcf39d50d771, verifies manifests, runs v45=233, QA5=271, candidate=307 test totals, and tests rollback on disposable copies.
- This is a historical pinned QA6 guard, not an automatic certification of the current review branch or latest release. No current workflow run or status was fetched in this stage.

## Findings
S5-F01 HIGH: Existing workflow is pinned to historical QA6 and restricted branch triggers; it cannot be assumed to certify the latest art-catalog or application candidate.
S5-F02 HIGH: Published v49 release record explicitly says independent LT QA and physical iPhone Safari acceptance remained open at publication.
S5-F03 HIGH: Browser progress safety depends on preserving localStorage; rollback procedures are file-only and historical targets may reintroduce known issues. Require preservation and migration checks before release.
S5-F04 MEDIUM: Test files and passing release records exist, but current HEAD tests, hash checks, served bytes, and live deployment state were not executed or independently verified here.
S5-F05 MEDIUM: Distinct evidence classes must be tracked separately: author Chromium tests, independent QA, iPhone Safari touch/VoiceOver, served-asset hashes, and release approval.
S5-F06 OPEN: Confirm current candidate CI coverage and latest successful run; historical 307/338/340 test totals should not be extrapolated to newer commits.

## Grok independent review
1. Pin exact application candidate SHA and compare it with deployed Sites source SHA; identify any unreviewed delta.
2. Run all tests against candidate HEAD; provide command, environment, full TAP totals, failures/skips, and log artifacts.
3. Reproduce strict CI guard and manifest coverage; confirm QA6 workflow's applicability to candidate or recommend a separately scoped check.
4. Verify save-preservation and storage-denied behaviors on existing browser data without clearing storage.
5. Verify rollback with disposable copies only; check SHA, migration effects and risks of older target.
6. Independently test live Safari portrait/landscape, touch gestures, VoiceOver, cache/returning browser, direct Velen route, Undo, and progress persistence.
7. Verify release-to-deployment provenance and served hashes; do not infer from release docs alone.
8. Identify all open QA/approval gates with severity, reproducible steps and exact files; do not deploy or alter runtime.

## Stage gate
STOP pending Grok Stage 05 review and user approval. Proposed Stage 06: quest and region content completeness, canonical data and references.
