# Phoenix project status

## Active iPhone review · Nilf quest-area map

- [Private Inn at the Crossroads preview](https://phoenix-nilf-framing-qa.krwpfbtbn8.chatgpt.site/#velen/map/nilf/3) · application `3d7c35b63e730b51cf2d6070cbc75189c555fff0` · private deployment `appgdep_6b00cdb5ce5c8191a0dd0dd0396d4243`. Public v50 remains the release baseline.
- The pilot uses assembled game-map tiles with a parchment tint, sourced location anchors and an approximate Mulbrydale approach area. See [map provenance](../dist/MAP-SOURCES.md#velen--nilfgaardian-connection-quest-area-pilot). The exact Funeral Pyres and At the Mercy of Strangers encounter positions await Xbox confirmation. World Map layer synchronization is future work.
- Updated pilot: the map opens centered on the walkthrough objective with icons only. Tap a seal to reveal one guide link, then tap the link to open its page. Safari Back should restore the camera and open label. Check that the two approach seals are easy to select, that either highlights the approximate encounter area, and that pinch and Recenter work in portrait and landscape. Physical iPhone Safari acceptance remains open.

## Active work · Progress star chart

- Public guide: **v50**, frozen application `e8b818492bbc71450453a69686bf1a7f0d3042ac`. [Release and rollback record](RELEASE-VELEN-V50-CANDIDATE.md#public-release--november-20-2026-americachicago).
- Private reference: the 75-entry Velen ledger at `7d2a80f263e8228dd6d7c544319cf9ef12d10fb4`. [Private Progress preview](https://phoenix-nilf-framing-qa.krwpfbtbn8.chatgpt.site/#progress).
- Current assignment: Jess reviews the first Velen star-chart pilot on physical iPhone Safari. [Private Progress pilot](https://phoenix-nilf-framing-qa.krwpfbtbn8.chatgpt.site/#progress) · [Draft PR #27](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/27).
- Pilot application `1d0bad1c8e614ace1e5082625455fb561d3f352f`, private deployment `appgdep_6affebef70bc8191962214887bac6bc1`. The prototype covers 3 quest planets and 4 linked moons. Current filter behavior withdraws unmatched bodies and keeps a parent visible when it has a matching moon. White Orchard opens the existing ledger.
- Local checks: 341 Node passes, zero failures, three historical-baseline checks skipped. A simulated DOM exercise verified deck counts, card activation, map branches, moon routing, camera-state restore, and withdrawal. Chromium could not launch in the local execution environment. Physical pan, pinch, layout, and Back remain for iPhone field review.
- iPhone review: Swipe to Velen, enter, pan and pinch, select Nilf, tap Funeral Pyres, and go Back. Confirm the same selection, moons, zoom and pan return. Repeat through Bloody Baron and Hunting a Witch, then use the map Back control to return to Velen’s centered system card.
- [Owner decisions](PROGRESS-STAR-CHART-DECISIONS.md) · [Build stages and acceptance gates](PROGRESS-STAR-CHART-BUILD-PLAN.md).

## Earlier Velen design and QA context

Current Regional Tools interaction: swipe or tap a side card to browse, then tap the front card to open its tool. On quest walkthroughs the closing order is guide search, framed Regional Tools, quiet Sources link, then credits. The floating wolf operates independently.

The owner approved two complete page templates on November 19, 2026, using QA build `1690b41`. Use the Velen region console for region pages and The Nilfgaardian Connection walkthrough for quest walkthroughs. Carry forward each page’s section order, card layout, spacing, framing, controls, navigation and interactions, including the shared Regional Tools deck. Supply the appropriate regional and quest content, artwork, destinations and objectives. Outstanding QA findings stay open.


**Current QA priority** is Safari on iPhone. Check portrait, landscape, touch and saved progress. Other browsers are secondary. Xbox is for in-game verification and art references only. [Velen fixes and item-by-item evidence](qa/v49/phone/README.md).

The owner approved the Velen walkthrough Regional Tools deck. PR #26 now shares it on Home, Regions, regional consoles and walkthroughs. Home and Regions follow the selected region for local tools. Physical iPhone Safari acceptance remains open.

## Historical v49 release and review

| Item | Current state |
|---|---|
| Public guide | **Velen v49**, published November 19, 2026. [Release and rollback record](RELEASE-VELEN-V49.md) |
| Published application source | `ba59252cb65800225a68297b6ce7068d3b91ff9b`, [draft PR #24](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/24) |
| Private iPhone QA candidate | [Open Home tools QA](https://phoenix-nilf-framing-qa.krwpfbtbn8.chatgpt.site/#home) · [draft PR #26](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/26) · Regional Tools build `regional-tools-frame-1`. 343 regression tests passed. [Item-level checks and open device QA](qa/v49/phone/README.md). |
| Independent review | LT delivered [v49 findings and evidence](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/25). The [fix assignment](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/25#issuecomment-7014957770) calls for a separate candidate and preview for independent retest. [QA checklist](LT-QA-VELEN-V49.md) |
| Author checks | 340 Node tests passed. Author Chromium and served-file checks are recorded in the release notes. Physical Safari and independent acceptance remain open. |
| Release scope | Velen deck, walkthrough and content expansion, number strip, regional tools, and Nilf framing pilot. Approved mockups and remaining runtime rollout are tracked separately. |
| Open work | LT findings, physical iPhone Safari, guide-wide legacy citation cleanup, forged framing beyond Nilf, and the top-to-bottom Nilf hub review. [Session calibration](SESSION-CALIBRATION.md) |

## Historical QA6 and v47 checkpoints

The following sections retain the original engineering and release notes for comparison. Use the current release table above for startup and QA.

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

### Historical publication of v47

Sites version **47** is now live. The owner authorized publishing the built slices before LT’s independent QA. The QA6 notes above document the preceding release. See [the version 47 release record](RELEASE-SESSION-3-V47.md) for exact provenance, scope, checks and follow-up.

### Historical pre-v49 walkthrough candidate

All five existing Velen walkthroughs now use the shared component. Six new source-backed cards and walkthroughs cover A Princess in Distress, Ciri’s Room, Wandering in the Dark, Magic Lamp, Ladies of the Wood, and The Whispering Hillock. The Arrival denominator remains three and retains its existing owners. Reading-only cards show stage position in the shared selector. All 339 Node tests passed against the v45, QA5 and QA6 baselines. This candidate is unpublished. Responsive browser and physical Safari checks, dedicated illustrations, and full ledger coverage remain open. Sites version 47 remains live.

### Historical unpublished framing pilot

The owner approved the framing mockups and requested a runtime QA pilot on the Nilfgaardian Connection hub and walkthrough. The review candidate starts at framing proof commit `4fede4818f7f88df3efcbcd8272c7cec8625162c`. See the [pilot review notes](framing-review/NILF-RUNTIME-QA.md). The candidate is unpublished.
