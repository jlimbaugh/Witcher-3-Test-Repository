# LT QA handoff · Velen v49

Start with the [release record](RELEASE-VELEN-V49.md). Test application candidate `ba59252cb65800225a68297b6ce7068d3b91ff9b` against GitHub baseline `93a2cf9` (the v48 live application). The live v49 URL is recorded there. The [framing gallery](framing-review/README.md) and [art standard](../ART-STANDARD.md) record the approved visual references.

## Required checks

| Surface | Owner decision and expected behavior |
|---|---|
| Regional deck | Numbers only. Tap or horizontal scroll settlement selects the centered quest in the same deck. Check both wrap directions, a jump to a late number, selected artwork, briefing, hub and walkthrough destinations, keyboard focus and scrolling vertically below the strip. Selection does not mark completion. |
| Number strip art | Taller strip with 68 × 64 CSS px minimum targets, fewer visible choices and the shared silver selector wolf artwork. Verify its scale and alignment in Safari. The separate floating navigation wolf retains its artwork. |
| Region Tools | The console and walkthrough tool grids offer Home, Regions, Field Reference, Progress, Constellation, Warnings and Search, plus the Velen maps and Merchants. Reuse the Merchant tile treatment, with aligned sizes and illustrated art. Verify each destination, direct navigation, Search and Warnings overlay entry and dismissal, and return to the same quest. |
| Maps and navigation | The regional map opens the guide's Velen overview. A quest route shows only the destinations pertinent to that quest, as listed on its quest card. Check quest and stage deep links and Back/return behavior. The walkthrough and hub actions use their fixed approved artwork. |
| Nilf hub scale and reading | Compare to v48 and the owner's screenshot feedback. Keep the prior scale and spacing, with only a small allowance for the frame. Inspect the briefing, progress area, related activities and next leads. Check parchment contrast, clipping, text wrapping and the compact Bloody Baron and Hunting a Witch cards. |
| Forged frames and rails | The approved box flourishes A–J and rail pairs V1–V9 follow stable rotations. Original rails V1–V3 and vine rails V4–V9 are approved. Use one rail style per page. Verify the pilot's single vine pair and centered brace on both Nilf pages, with staggered ornaments clear of the content. Approved mockups cover more pages than the runtime pilot. |
| Text controls | One raised steel variant per page, B1 on the Nilf hub and B2 on its walkthrough. Check Reference Tools, Previous/Next, progress actions and the review dialog. Peer controls should align. The forged rim is the outer silhouette, with bevel and contact shadow and no rectangular backing. Check focus, pressed and disabled states and spacing on phone. Illustrated actions keep their separate artwork. |
| Source placement | No inline Objective reference link. The Nilf hub and walkthrough each end in a quiet Sources link to the exact central index entry. White Orchard objective citations are centralized. The same convention applies guide-wide. Legacy citations in field-reference tools remain an open implementation item. |
| Walkthrough behavior | Check objective rail position on mark, warning access, related optional tasks beneath the reading content, hub return, reload, mark/Undo and save protection. Preserve arrival ownership and counts. |
| Wider template checks | DLC content is visible with its label and no expansion switch. Check for leftover routine browser-save instructions and duplicate controls, and flag any deviations. |

## Evidence and open review

- Author evidence is in the release record and [pilot checklist](framing-review/NILF-RUNTIME-QA.md). The checklist's initial unpublished status describes the first pilot. The release record gives current deployment status.
- Run independent checks on the exact candidate. Record route, steps, expected and actual result, evidence, and whether each issue also reproduces on v48. Use an isolated profile for progress changes.
- Physical Safari portrait and landscape acceptance, guide-wide source cleanup, rollout of forged framing beyond the Nilf pilot, and the owner's top-to-bottom hub design review remain open. No header/layout choice was recorded from the pending design questions.
