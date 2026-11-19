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

Record future template approvals in the relevant template and link them from the page template index and this calibration page. Record scope and verification state so approval of a mockup does not get reported as acceptance of the running guide. Physical iPhone Safari acceptance remains open.

## Nilf hub review · approved top section

- Shorten the full-width illustration banner so the briefing and walkthrough action sit higher on iPhone.
- Keep a short quest briefing above Start or Continue walkthrough.
- Keep Quest Cards below the walkthrough action. Regions is available through the wolf menu.

These are approved design choices for the next Nilf hub build. Exact banner height and the remaining hub sections are open for review.

### Questions and selected answers

| Question | Selected answer |
|---|---|
| How should the quest illustration and title fit at the top of the hub on iPhone? | **Shorter banner.** Keep the full-width illustration and bring the briefing and walkthrough action higher. |
| What should the parchment show before Start or Continue walkthrough? | **Short briefing.** Keep a one- or two-sentence quest setup above the action. |
| Where should Quest Cards and Regions sit on the hub? | **Keep Quest Cards only.** Give the hub a direct return to its quest deck and use the wolf menu for Regions. |

## Capture a decision or test result

Use the existing task PR or issue for working notes. Keep screenshots, test scripts and results together in the candidate’s evidence folder and link them by finding ID. For a reusable design decision, record the owner’s answer in the applicable template and link to it here. For a one-page decision, the question-and-answer table above is an example.

| Record | Copy these fields into the relevant thread or document |
|---|---|
| Decision | Question · owner’s answer · affected pages · approved example or screenshot · template link · open details |
| Defect | Finding ID · build and device · page/route · steps · expected · observed · evidence |
| Fix and retest | Finding ID · candidate SHA and preview · original steps retried · result (pass/fail/untested) · tester and environment · evidence · remaining checks |
| Session handoff | Active task link · last verified commit · what changed · unresolved items · next action and owner |

Example: **LT49-RT-01** — five Region Tools tiles led to Velen. The [original report](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/af5213244960a91f239554ecb5549ab5f8ca8a60/docs/qa/v49/lt/SUMMARY.md) holds the reproduction and evidence. The [implementation assignment](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/25#issuecomment-7014957770) names the two entry points to retest. Append candidate results to the fix PR under that same ID.

When work moves to a new PR or a release goes live, update the current-work links in [Project Status](PROJECT-STATUS.md) and the [repository front page](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/main/README.md). A preview, a published build, and physical-device acceptance each get their own evidence.
