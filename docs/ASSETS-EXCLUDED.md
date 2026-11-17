# Excluded from the repository

**Art and fonts: none excluded.** All 300 binary assets are in the v45 snapshot commit (`docs/ASSETS.md`), so the
full test suite runs with art (no art-dependent failures).

Excluded from the QA5 package import (all remain in `PHOENIX-v45-slice2-QA5-deliverables.zip`,
sha256 `4e424d54d1eac92c053589cdd5f04fea0a6c0cf3ccf0fcb6b76a39fb67e86871`):
| Item | Why | Effect on testing |
|---|---|---|
| `rollback-v45-a9d61c94/v45-source-a9d61c94/` (220-file kit copy) | identical to the v45 snapshot commit | none: use `--kit <checkout>` |
| `rollback-v45-a9d61c94/prior-freezes/prefix-qa2…qa5/` (full trees) | redundant; reconstructable from diffs | none for QA5; older partial rollbacks need the ZIP or the diffs |
| `PHOENIX-v45-slice2-QA5-source.zip` (inner source zip, sha256 `f51f1d86…a7f5`) | its tree equals the QA5 commit's application files | none |

Not reproducible from the repo alone: the headless returning-browser checks need Chrome + `playwright-core`
(see `docs/TESTING.md`). Physical iPhone/Safari, Cloudflare edge caching after a real deploy, touch and VoiceOver were
never testable here.
