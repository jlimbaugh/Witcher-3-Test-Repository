# PHOENIX — project status (branch `fix/wo-save-preservation`)

## Inventory WO art refinement

Owner accepted the improved Inventory layout and requested it filled and refined
with the White Orchard art scheme. Latest static proof: `design/builds-v1/inventory-wo/`.
Dark compact gear groups remain; actual WO scene/fonts/wolf and parchment guide exit
are reused. Camera-cast source art and production asset sourcing remain unresolved.
No production implementation or deployment is implied.

## Character game-art mockups — 2026-11-17

`design/character-art-pass` contains the 19-image art review set under
`design/builds-v1/art-mockups/`, with screenshot-derived character/item/skill art,
credits and reproducible source hashes. Static review only; no production-code
change or deployment. Exact per-tier art and current-game mechanics remain unverified.
Import implementation is paused until this visual review.

## Character gear-reference slice — 2026-11-17, Cmdr

`implementation/character-gear-reference` follows Character foundation `10c19937`.
Adds shared catalogue/deep links and source-version-labelled reference requirements
in gear details and previews. The retrieved v4.04 levels are not certified for current
Remastered and never block planning. Full baseline suite: 322/322, no skips, author-supplied.
No Vault/schema change. Browser, current-version data and independent QA remain open.
Visual review and source limits: `docs/CHARACTER-GEAR-REFERENCE.md`. Live stays QA6 v46.

## Character implementation checkpoint — 2026-11-17, Cmdr

Owner approved the build design as the foundation. `implementation/character-foundation`
starts the production Character page and guarded persistent Build Vault, based on
`524214359d56859b9bec7d7e0bf8023eed6356e1`. New modules share one Feline identity
catalogue; the existing index gains only a new entry script. Full suite: 317/317
with v45 and QA5 baselines, no skips (author-supplied). Stats/formulas, final art,
other sets, Skills/Alchemy, browser/Safari and independent review remain pending.
See `docs/CHARACTER-FOUNDATION.md`. QA6 v46 stays live; nothing deployed.

## Character build design mockups — 2026-11-17

`design/character-builds-v1` adds static Feline-duelist mockups (v2, 16 plates) and the owner decision
record under `design/builds-v1/`. See its README for the image gallery. This is design
review plus an isolated equipment interaction prototype: stat examples are synthetic; no production code, storage, CI
or rollback file changes. QA6 remains live. Shared-walkthrough engineering continues
separately in draft PR #7.

Last updated: 2026-11-17 (America/Chicago) by LT, in a docs-only commit on top of QA6 `804a3a2c83529fdc707ca5278fb3bcf39d50d771`.
This commit changes no application or rollback file. The QA6 application candidate is still `804a3a2c…`. This branch is the D2
investigation (`investigation/wo-save-preservation` `75768834b768e53b3acd5f912c1c2032a848b8fb`, itself QA5 `5ba73ace…` + probe)
plus the QA6 correction. Author self-review: `docs/QA6-REVIEW.md` (evidence: `author-supplied`). Decisions: `docs/QA6-REVIEW.md` §0.

| Item | State |
|---|---|
| Accepted / live build | **QA6 published as Sites version 46 on 2026-11-17**, source `0ac86e3e5932d1b37da1dcd7ab0899407e2a1438`; reviewed GitHub release `7c9bc102a0089814e792390b4b8d57edd97bc1b9`. Physical Safari acceptance pending. See `docs/RELEASE-QA6.md`. |
| Previous candidate | **Slice 2 QA5** = `5ba73ace7d05551c877021de6e6fd0a2242a1e3a` (`recovery/v45-qa5`, unchanged). Superseded by QA6 for release purposes; D2 and D4 were open against it. |
| Candidate | **QA6** = `804a3a2c83529fdc707ca5278fb3bcf39d50d771`: Slice 2 QA5 + D2 correction (White Orchard save preservation, `dist/app.js`) + D4 correction (storage-denied start-up, `dist/velen-r18.js:19`, Cmdr-authorized edit of the pinned file) + cache tags `save-guard-qa6-v45`. **Source review complete; published as version 46. Physical Safari acceptance pending.** Release files: `docs/RELEASE-FILES-QA6.sha256` (13). |
| Hosting | **Verified by Cmdr (2026-11-17):** the configured Sites project serves the current Phoenix URL, the account has owner access, and saved version 45 names source commit `a9d61c94…`, matching the baseline provenance. The live site is not built from GitHub. Also verified by Cmdr (2026-11-17): Sites uses a separate source repository, automatic publishing on push is disabled, and GitHub `main` does not control this deployment. |
| CI | PR #1 merged, including LT-reviewed strict gates. PRs #2 and #3 merged. Final combined GitHub release passed run 44148406839. |
| Deployment | **Published with owner authorization.** Existing public audience and URL preserved; no rollback performed. See release record for verification limits. |
| Pyres / Mercy | Incomplete at objective level; separate slice after iPhone verification of this release. |

## Findings
| ID | State | Also fails on baseline? | Evidence |
|---|---|---|---|
| D1 Velen unreadable save overwritten | Fixed since QA3/QA4 (`velen-r18.js` guard); re-confirmed on QA6 | yes | author-supplied (probe) |
| D2 White Orchard unusable/unreadable save overwritten | **Corrected in QA6.** Cmdr's source inspection is recorded on PR #1; release decision pending | yes | author-supplied (probe 144 runs, unit tests); Cmdr source inspection; unit and rollback checks also run in GitHub Actions on PR #1 |
| D3 GitHub Pages serves stale R19 `/velen.html` | Open. Belongs to the separate Pages-retirement work, not QA6 | n/a | audit |
| D4 Blank start page when `localStorage` access is denied (QA5 regression) | **Corrected in QA6.** Cmdr's source inspection is recorded on PR #1; release decision pending | no | author-supplied (probe, returning-browser check); Cmdr source inspection |

Cmdr's source inspection, as recorded on PR #1: D2 classifies the White Orchard record once, prevents writes while it is blocked,
fills saved state only from accepted data, and keeps the unreadable, unsupported and unavailable states apart. D4 guards the
denied `localStorage` getter at the Velen boundary without a blanket start-up catch. Coverage limits Cmdr recorded: the 144 browser
probes and the returning-browser checks are LT-supplied evidence and were not independently repeated; physical Safari and live
edge caching are untested.

## Settled decisions
- Records with a missing, string or unsupported `version` are preserved (blocked), not coerced or migrated.
- **Empty-string record (confirmed by Cmdr 2026-11-17; follows an earlier ruling whose timestamp is not independently verified):** an empty string stored under the White Orchard key is preserved as unreadable. Only a
  missing key counts as absent. Recovery or reset must be an explicit later action. QA6 already behaves this way; no code change.

## Verification and follow-up after publication
1. Source review and release decision completed. LT browser probes remain author-supplied; independent Node/rollback checks passed through GitHub CI.
2. **Sites synchronization instructions** (Cmdr, in progress). The release procedure is below; the detailed steps for
   steps 3 and 4 are not yet written down.
3. Physical iPhone/Safari acceptance (owner) after deployment verification, including a returning visit (cached v45) and the WO
   save message.

## Release procedure (Cmdr, 2026-11-17)
1. Integrate the reviewed CI and documentation changes into the QA6 branch.
2. Run the gate on that combined commit.
3. Synchronize the accepted source to the existing Sites repository.
4. Verify identical application files and record both commit identities.
5. Package and publish only after the release hold is explicitly lifted.

## Separate work (not QA6)
- **Pages retirement (D3).** GitHub Pages still serves the old R19 build from `main`. A QA6-to-`main` PR currently conflicts
  (`dist/index.html`); that conflict belongs to this work, not to QA6.
- **Repair / reset path** ("start fresh / export") for a blocked White Orchard or Velen record. Must be an explicit user action.
- **N1 (deferred, not in QA6 scope):** global Undo can reverse another quest's change without naming that quest.
- **Pyres and Mercy** conversion to the White Orchard pattern, after iPhone verification.

## Deployment update (Cmdr, 2026-11-17)

The owner approved pushing the prepared Sites commit and publishing QA6. Source was fast-forwarded from a9d61c94 to 0ac86e3e, saved as version 46, and deployed successfully. PR #3 contains the finalized synchronization and rollback procedure; its earlier in-progress wording above is historical. No GitHub main or Pages change occurred. A raw HTTP verification attempt was blocked/timed out; it did not establish a served-asset mismatch or application failure. Physical Safari acceptance and independent live asset verification remain pending.
