# PHOENIX v45 snapshot — provenance (recovery branch `recovery/v45-qa5`)

**This commit is a snapshot import. It is NOT the original development history.**

## What this commit is
- A byte-for-byte import of the accepted PHOENIX **v45** code kit (220 files: repository-root review notes,
  `.openai/hosting.json`, and the full `dist/` site tree, which is the static site root per `.openai/hosting.json`).
- Accepted v45 = Sites commit `a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820` (Slice 1 Velen data migration integrated).
- Every imported file is listed with its sha256 in `docs/v45-snapshot.sha256` (`sha256sum -c docs/v45-snapshot.sha256`
  from the repository root must report 220 OK).

## Original commits that are NOT in GitHub
These commits exist only in the Sites (chatgpt.site) project history. They were never pushed to this repository and
cannot be recreated here. No attempt was made to fabricate them; this commit stands in for their combined tree.

| Commit | Meaning |
|---|---|
| `a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820` | accepted v45 (Slice 1 integrated) — the content of this snapshot |
| `16286447108a19c96199b45461a945c15b6aa2d2` | v44 Sites commit the v44 Code Kit was verified against (tree `a7fec9c75988e60a86065c69039661ad4a0ccdc8`) |
| `a853e8b6a6f3ffbe7d053f8bcd69d8376c311da3` | "exact tested application source" named in `dist/BUILD-REVISION.txt` |

## How the snapshot was produced (chain of custody)
1. v44 Code Kit ZIP, verified file-by-file (git blob + sha256, `VERIFY.py`) against Sites commit `16286447…`.
2. v45 integration diff `integration-v44-to-v45.diff` (sha256 `1fe058cb4c1b1402e97ebc3c96021658bce35d9f868024d0df3efed1b9d354f4`)
   applied → v45 tree; its changed-file sha256s match `CHECKPOINT.json` (`base 16286447…`, `integrated_commit a9d61c94…`).
3. The resulting tree (`baseline-untouched`) was kept read-only and is byte-identical (220/220) to
   `rollback-v45-a9d61c94/v45-source-a9d61c94/` inside `PHOENIX-v45-slice2-QA5-deliverables.zip`
   (sha256 `4e424d54d1eac92c053589cdd5f04fea0a6c0cf3ccf0fcb6b76a39fb67e86871`). That bundle copy is what was imported.
4. The live v45 site was compared earlier (read-only GitHub/live audit): all 181 `dist/` files match the live build;
   four HTML pages differ only by a host-injected Cloudflare script.

## Parent commit and removed legacy files
- Parent: `phoenix-white-orchard-completion` @ `26a2dc9b841ae75b3cbb22ff95eed056dab8de16`, the "Application revision"
  named in v45 `dist/BUILD-REVISION.txt`. It is the nearest ancestor present in GitHub, so existing history is preserved
  (this branch only adds commits on top of it; no history was rewritten).
- The 158 files tracked at `26a2dc9b` (the older flat R-series site at the repository root, listed in
  `docs/legacy-inherited-26a2dc9b.txt`) are **removed from the tree in this commit** so that the tree equals the v45
  snapshot. They remain available in history at `26a2dc9b` and on their original branch.

## Tree of this commit
= the 220 verified v45 code-kit files (`docs/v45-snapshot.sha256`)
+ 300 binary art/font files fetched read-only from the accepted v45 site (`docs/ASSETS.md`, `docs/v45-assets.sha256`)
+ these provenance documents (`docs/`). Nothing else.

## Authorship and dates
- Author/committer: neutral identity `PHOENIX recovery import (LT) <phoenix-recovery@invalid>`; timestamps are the real
  time the commit was made (2026-11-16, America/Chicago). No dates were back-dated and no original author was impersonated.
- Prepared by LT (PHOENIX Lead Technician) under the owner's recovery order of 2026-11-16. Nothing was deployed;
  `main`, other branches, Pages settings, workflows, releases and tags were not touched.
