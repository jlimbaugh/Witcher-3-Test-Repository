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
