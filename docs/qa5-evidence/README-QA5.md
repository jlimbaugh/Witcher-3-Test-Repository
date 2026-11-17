# PHOENIX v45 Slice 2 — QA5 deliverables (LT)
Correction: the `app.js` cache tag in `index.html`, plus a regression test. Not deployed or published. Slice 2 stays a candidate.
Start: QA4 deliverables zip sha256 `18642c7b…02ded7ac` (verified, see `logs/qa5-input-verification.txt`).

| Item | Path |
|---|---|
| Review note (QA4 doc + new §11 QA5 only) | `SLICE2-REVIEW.md` §11 |
| QA5 source tree (full code kit) | `PHOENIX-v45-slice2-QA5-source.zip` |
| Minimal code diff QA4 → QA5 | `slice2-corrections-qa5.diff` |
| Cumulative diff v45 → QA5 | `slice2.diff` |
| Release files + sha256 | `RELEASE-FILES-QA5.sha256` (10 files) |
| sha256 of diffs and source zip | `DELIVERABLES-QA5.sha256` |
| Rollback bundle (self-contained) | `rollback-v45-a9d61c94/` (README, restore_and_verify.py, v45 kit, manifests, reverse diff, prior freezes) |
| Test logs | `logs/` |
| Returning-browser harness, CDP reports | `qa/cache-server.cjs`, `qa/returning-browser-check.cjs`, `qa/reports/*.json`, `logs/returning-*.txt`, `logs/returning-browser-cdp-summary.txt` |
| Renders (JPEG, small) | `qa/renders/` |
