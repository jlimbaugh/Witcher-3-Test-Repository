# Phoenix session calibration

Read [Project Status](PROJECT-STATUS.md) first, then use this page alongside [PHOENIX-SESSION-START.md](PHOENIX-SESSION-START.md). For Velen v49, use the [release record](RELEASE-VELEN-V49.md) and [LT QA checklist](LT-QA-VELEN-V49.md) for the exact release, baseline and open work.

## Carry decisions through the build

1. Before editing, collect the owner's approved decisions and reported defects in one checklist. Give each item its route, approved reference, expected result, scope, and verification method. Record open design questions separately. Compare the current rendered build with the reference before editing, especially when preserving scale, spacing, artwork or control behavior.
2. Fix related items as a batch. Before handing the build back, verify each checklist row in the actual rendered application. Open collapsed controls, exercise normal navigation, use matching viewports for before and after, and inspect the final rendered styles when legacy CSS can override them.
3. Record the exact candidate and baseline with item-level evidence. Distinguish automated tests, author browser checks, independent review, and physical iPhone Safari acceptance. Mark unverified items pending and state the blocker. A regression suite passing does not establish visual or touch acceptance.
4. Consolidate decisions, fixes, unresolved defects, and evidence in a single linked QA handoff before sending it for review. Apply later feedback to that checklist so the owner does not have to restate settled decisions. Update the page template and this startup reference when a template decision is approved.

## Template decision lookup

Start with the [page template index](PAGE-TEMPLATE-INDEX.md) for any page work, the [regional deck template](REGION-DECK-TEMPLATE.md) for deck behavior, and the [art standard](../ART-STANDARD.md) for fixed art, approved rotations and variant rules. Read the [framing gallery](framing-review/README.md) for the visual reference and the [quest card art template](QUEST-CARD-ART-TEMPLATE.md) for subject-specific cards.

| Template | Decisions to carry forward |
|---|---|
| Regional deck | Velen is the canonical deck template. Numbers only, wrap both ways, select on tap or scroll settle, and update the featured quest and its actions. Preserve vertical scroll and use the approved silver selector wolf. In v49, Velen number targets are at least 68 × 64 CSS px. |
| Framing and scale | Keep the accepted parchment, legibility, scale and layout. Add only the clearance needed for forged trim. Box flourishes A–J and original and vine rail pairs V1–V9 are approved. Use one rail style per page. The runtime forged-frame pilot covers the Nilf hub and walkthrough. |
| Buttons | Pick one stable standard text-button variant per page from B1–B10. Peer controls align. The forged rim forms the visible outer perimeter, with bevel and contact shadow and clear space around the silhouette. Illustrated hub and walkthrough actions use their approved fixed artwork. |
| Region Tools and maps | Match the wolf menu's choices and use the illustrated Merchant tile treatment across regional tools. Preserve the floating wolf artwork. The map for a quest shows its pertinent listed locations, and Region Tools opens the regional overview. |
| Quest reading and sources | Preserve objective position on mark, keep related optional tasks beneath the reading content, and use the existing progress owner. Put citations on the central Sources page and use one quiet Sources link at the end of the reading page. Guide-wide legacy citation cleanup is open. |
| Shared copy and content | Include DLC content with its label. Remove expansion toggles and routine browser-save instructions from the template. Record any leftover instances as defects. |

Record future template approvals in the relevant template and link them from the page template index and this calibration page. Record scope and verification state so approval of a mockup does not get reported as acceptance of the running guide. The top-to-bottom Nilf hub design review and physical iPhone Safari acceptance are still open.
