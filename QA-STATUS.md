# QA & Release Safety Status — Operation Phoenix

Date: 2026-11-23
Status: Stage 5 findings recorded — current-HEAD certification still open
Branch: docs/phoenix-art-master-catalog

## Existing Infrastructure

- 37 test files under `dist/` (progression, save guards, Velen, search, warnings, navigation, walkthrough, Character, etc.).
- One GitHub Actions workflow: `.github/workflows/qa6-verification.yml`.
- SHA-256 manifests and rollback scripts under `docs/rollback/`.
- Strict test runner (`scripts/ci-verify.cjs`) with exact pass/fail requirements.

## Important Limitation

The QA6 workflow is a **pinned historical guard**:
- Triggers only on specific branches (`ci/qa6-independent-checks`, `fix/wo-save-preservation`, PRs to those or `main`).
- Pins and checks tree equality against QA6 commit `804a3a2c83529fdc707ca5278fb3bcf39d50d771`.
- Enforces historical test totals (v45=233, QA5=271, candidate=307).

It does **not** automatically certify later art-catalog or application changes on the current branch.

## Open Acceptance Gates (from release records)

- Independent LT QA
- Physical iPhone Safari testing (portrait/landscape, touch, VoiceOver)
- Live served-asset verification
- Fresh test run against current HEAD (historical totals 307/338/340 must not be extrapolated)

## Rules

- Any new release candidate must run the full test suite against its own HEAD and record the result.
- Rollback is file-only; never clear user localStorage without an explicit migration plan.
- Recorded historical passes are useful controls but are not current certification.
