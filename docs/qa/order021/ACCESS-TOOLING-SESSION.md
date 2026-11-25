# Operation Phoenix — Session access and tooling record (Order 021)

**Date:** 2026-11-24. **Authority:** Capt authorized Cmdr to diagnose and fix GitHub access, with results documented in session files. **Owner:** Capt. **Executor:** Cmdr (ChatGPT). **Status:** Workflow write access confirmed; CI Stage 2 not yet published.

## Working rules adopted by Capt
- GitHub is the project source of truth and handoff location. Keep reports, code, PR reviews, and reproducible evidence in GitHub issues, PRs and session documents.
- Eliminate routine ZIP/git-bundle handoffs. Existing bundles are historical evidence only.
- LT is unavailable until Saturday; Cmdr may perform authorized engineering, subject to Capt's release gates.
- Do not merge PR #41 or any CI PR, publish to Sites or Pages, or archive art/CSS without separate Capt approval.

## Verified diagnostic evidence
- Authenticated GitHub identity: `jlimbaugh`; repository `jlimbaugh/Witcher-3-Test-Repository` reports `push=true`. Plugin app-specific permission: Allow all actions (not proof of OAuth workflow scope).
- `canonical/phoenix` baseline: `2dbc0bcf88aa531957212c4ee7d19cfff9ad0e7d` before test. Diagnostic branch `diagnostics/order021-workflow-access` created from that exact SHA.
- Workflow path: `.github/workflows/qa6-verification.yml`, original blob `8cf746d3a1ed000bb665c2331eb5c6e638eb0ab9`.
- Isolated workflow write **succeeded** via GitHub connector: commit `0d9cc166841b790794c4678c1af017abc66060f1` (changed workflow name only).
- Workflow file restored to **identical original blob** via commit `0075db9a2f5df6428a17db63361ba497eebca859`. No workflow behavior change is retained in the diagnostic branch.
- LT's separate local Git credential was denied workflow-file push. This does **not** describe the permissions of the current ChatGPT GitHub connection.
- Current connector supports branch creation, contents writes, tree/commit creation, but not a native arbitrary git-bundle import. The model's local container has no authenticated git push channel. A source-equivalent CI repair can be published through connector operations, but exact LT commit SHAs should not be promised unless independently reproduced.

## Next gate
- Use Order 021 Stage 2 evidence to implement the CI workflow + manifest on a **new CI-only branch**, verify content against LT's supplied source, open a **draft** PR against `canonical/phoenix`, and require real GitHub Actions evidence for candidate 356/356 zero skipped, historical baselines, manifest, rollback, negative checks.
- **STOP 21-B:** Cmdr QA, then Capt's separate decision. No merge or publication implied by this diagnostic.

## Verification limitations
- The isolated write proves workflow write capability; it does not establish the complete CI patch's correctness or GitHub Actions success.
- The diagnostic branch is not intended for merging. This report should be incorporated into canonical session records through a separately reviewed documentation PR or an explicitly approved docs update, rather than merging the diagnostic history.

## SESSION STOP — 2026-11-24, Capt-directed pause

**Disposition:** PAUSED / SAFE STOP. Capt has no remaining ChatGPT Work mode usage and explicitly ordered a documented stopping point. **Do not resume engineering automatically.** Resume only on Capt's instruction.

### Exact GitHub state at stop
- Canonical base remains the known `2dbc0bcf88aa531957212c4ee7d19cfff9ad0e7d` reference used to create both branches; recheck current remote SHA before resuming.
- CI branch `ci/order021-canonical-verification-cmdr` was created from that base. **No Stage 2 CI repair files have been committed to it.** No CI draft PR and no Stage 2 GitHub Actions run.
- Diagnostic branch `diagnostics/order021-workflow-access` contains successful workflow-write test `0d9cc166841b790794c4678c1af017abc66060f1`, its exact-file restoration `0075db9a2f5df6428a17db63361ba497eebca859`, and this session document. Do not merge this diagnostic branch.
- Stage 1 documentation-only draft PR #41 remains unmerged as last checked; verify again on resume. No authorization for merges, public deployments, or asset/CSS changes.

### Source and known blocker
- Original LT package: `LT-Order021-Stage2-Bundle.zip` (user-uploaded in conversation; not published as GitHub source). Source commits: `ec541879fcb64bd65678da6f94d2199adfe38e1e`, then `c5f0ab30737c4ac41c21dc09b1004f46b3a480fb`.
- Intended changes are exactly two paths: `.github/workflows/qa6-verification.yml` and `docs/MANIFEST.sha256`. LT reports 356/356 local checks, but **no GitHub Actions verification**.
- ChatGPT GitHub connector can write workflow files; the blocked capability is importing/transferring the exact local patched file contents or Git bundle from container into the connector. No Work mode usage available at pause. Do not conflate this with missing repository write permissions.
- Detailed inspection in issue #40 comments `7148036765` and `7148060794`.

### Resume sequence — do not skip gates
1. Read this record and GitHub issue #40; confirm canonical, PR #41, and both branch heads before changes.
2. Obtain a trusted path for **both complete patched files** from LT's exact package (e.g., Work mode when available, or another explicitly authorized file transfer method). Do not reconstruct from guesses or post incomplete changes.
3. Independently compare the transferred contents against the two LT patches; commit only the two approved paths to the CI-only branch; open a **draft PR targeting canonical/phoenix**.
4. Collect actual GitHub Actions evidence: candidate 356/356 zero skipped, historical V45/QA5/QA6, source-based V50 integrity, manifest, rollback, expected-failure negative checks. Investigate any failures without claiming a pass.
5. **STOP 21-B** for Cmdr independent QA and Capt's separate merge decision. Do not merge or deploy without express approval.

**Resume prompt:** “Resume Operation Phoenix Order 021 Stage 2 from the documented 2026-11-24 STOP in `docs/qa/order021/ACCESS-TOOLING-SESSION.md` on `diagnostics/order021-workflow-access`. Read issue #40. Verify remote state and continue only the approved CI-only transfer and draft PR. No merges or deployment.”
