# Velen iPhone QA candidate

Owner accepted the Regional Tools design on November 19, 2026. Use the [locked regional template](../../../REGION-DECK-TEMPLATE.md) for every region. The broader device and accessibility checks remain open.


Start at the [private Nilf hub](https://phoenix-nilf-framing-qa.krwpfbtbn8.chatgpt.site/#velen/hub/nilf). Published v49 is recorded in the [release history](../../../RELEASE-VELEN-V49.md). LT's original findings are in PR #25 and the previous implementation evidence is in [lt-fixes](../lt-fixes/).

| Item | Author verification | Remaining acceptance |
| --- | --- | --- |
| RT-01 | Five global destinations opened their intended guide pages from Velen and from walkthrough stage 3. | Physical taps and Safari Back. |
| RT-02/03 | Nine distinct tile images share the same border treatment. | Owner art review. |
| NILF-01/02 | Hub title 32 px, brief 17.6 px at widths 375, 390 and 430. Rail inset −15 px. Checked progress above preparation, shorter banner and Quest cards. Landscape checked at 844 × 390. | Physical portrait/landscape readability. |
| BTN-01 | LT measured the Previous, Next and Return to hub plates against their hit areas. See lt-fixes for screenshots and dimensions. | Inspect the rim and shadow in Safari. |
| NUM-01 | Selected 39. Underline and selected state matched. After opening a quest and returning, scroll offsets matched exactly in three trials (1110, 1163 and 1247 px). | Touch settle, wolf pointer alignment and strip height on device. |
| PRG-01/04 | With storage denied, full or corrupt, checked and undid Travel to Velen on the hub. Opened the walkthrough and verified the hub mark and walkthrough Undo in all three cases. Existing corrupt save retained. | Real Safari persistence and recovery. |
| PRG-03 | Verified the protected-save warning on Home, White Orchard console and Progress with an unreadable record. | VoiceOver reading order. |
| PRG-02 and Undo label | Recorded the fight, previewed clearing it, and cancelled. The preview named the fight and retained the choice. Reloaded Lilac after recording a Beast objective, checked the Undo label named Beast, and undid it. | Physical Safari acceptance. |
| Sources | Consolidated legacy citations and added quiet footer links. Tested the Funeral Pyres and Lilac and Gooseberries destinations. | Full guide page-by-page sweep. |
| ACC-01/02 | Updated the candlestick instruction. Direct-to-Heatherton journal status stays unconfirmed. | Verify on a fresh in-game route. Xbox is for game facts and art only. |

343 Node tests passed with all three historical baseline directories set. Author phone-size checks ran in Chromium. Physical iPhone Safari and VoiceOver remain open. To reproduce the isolated checks, copy the two adjacent HTML fixtures into a disposable copy of dist, serve that directory as the site root and open qa-phone-local.html. Each check uses disposable records in an iframe.

## Regional tools deck update

The new QA target replaces the nine-tile layout above. Eight tools use the quest-card renderer, and Search has its own field after the tools. The five global destinations retain their original routes. Run qa-menu-local.html alongside the original phone fixture in a disposable web root. Author checks at 390 × 844 (Velen console) and 844 × 390 (Nilf walkthrough) verified section focus, eight-card wrap, matching action art, absence of the tools number strip, search for Hendrik, opening the result, Return to Search and Back. Physical Safari touch, appearance and VoiceOver are pending.

## Shared Regional Tools

The owner approved the Nilf walkthrough card menu as the guide-wide Regional Tools template. Home's old Progress and Field Reference tiles and Search button now use this menu. Regions, both built regional consoles and their shared walkthroughs use the same renderer. On Home and Regions, the front region card determines the local map and merchant destination. Unbuilt regions show local tools as unavailable. White Orchard's Character and Gear shortcuts are in Preparation & departure.

Author browser QA exercised six routes at 390 × 844 and 844 × 390. Each rendered one eight-card menu with a matching illustrated action and the quiet search field. Card size, typeface, action minimum height and deck height matched the Nilf walkthrough at each viewport. Tests exercised wrap, local map routing, switching the selected region, opening warnings, opening and closing the floating wolf independently, search results and Back. The reproducible fixture is qa-regions-local.html next to the original fixture. Add ?landscape=1 for the landscape run. Physical iPhone review of the newly converted pages remains open.

Regional Tools framing (regional-tools-frame-1): all six routes in qa-regions-local.html passed at 390×844 and 844×390 in Chromium. The shared double silver perimeter, side rails, lower brace, search clearance and touch transparency were checked. Selected cards measured 196×296 throughout. All 343 Node tests passed. Physical iPhone Safari review is open.
