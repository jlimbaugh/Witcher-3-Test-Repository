# LT independent QA: Velen v49 (PR #24): SUMMARY

*All evidence is author-supplied (LT). Headless Chrome via puppeteer-core with isolated `/tmp` profiles and iPhone UA/touch emulation. **No physical iPhone Safari or VoiceOver.** Review-only: no application code, PR #24, Pages, workflows or deployment were touched.*

## ⚠ STOP finding
**LT49-RT-01: blocked navigation in Region Tools (High, v49 only).** On the Velen console and on every Velen walkthrough, the **Home, Regions, Field Reference, Progress and Constellation** tiles all link to `#velen`, because `velen-r18.js` `artTile()` → `link()` → `sharedHash()` rewrites non-Velen hashes to `#velen`. Readers cannot reach those five destinations from Region Tools. The floating wolf menu still reaches all five, which is the workaround. See `04-region-tools.md`.

No save loss, wrong quest branch or unusable mobile progress control was found.

## Build verification (00)
The live site serves **GitHub `ba59252cb65800225a68297b6ce7068d3b91ff9b`**. 540 of 548 files are byte-identical. The 7 HTML files match once the host-injected Cloudflare beacon is stripped. `BUILD-REVISION.txt` is the deployment provenance file naming ba59252. The PR #24 tip `cd6783ff628801a1f84b81064a3b74de4760c2a6` has identical `dist/` (docs-only commits after ba59252). It is not v48 (`93a2cf9e2bf080cf6c4a02c21b959d1d6734e08c`); 86 served files differ. The Sites source `02daa30f…` is **not independently verifiable** by LT, and the served BUILD-REVISION does not name it.

## Per-item results

| Item | Result | Defects (severity) | Reproduces on v48? |
|---|---|---|---|
| (a) Number strip and pointer | **PASS** | LT49-NUM-01 selected number has no visual state apart from the pointer (Low). Back-to-top on return (Low, pre-existing) | NUM-01: n/a (no strip on v48). Back-to-top: **yes** |
| (b) Nilf page scale and readability | **FAIL** | LT49-NILF-01 hub H1 −17.5% and briefing −9%, against "keep prior scale" (Medium, owner judgment). LT49-NILF-02 vine rails touch Start walkthrough, Reference tools and Preparation by about 4 px (Low) | No (v49 changes) |
| (c) Button depth (raised text-only) | **FAIL** | LT49-BTN-01 Return to hub and hub Previous/Next plates collapse to a 27×24 chip (CSS collision with `visual-system.css` purpose-icon `::before`) (Medium) | No |
| (d) Region Tools | **FAIL (STOP)** | LT49-RT-01 five tiles → `#velen` (High). LT49-RT-02 Warnings and Search tiles framed differently (Low). LT49-RT-03 Search reuses the Field Reference art; Route maps is a plain line SVG (Low). Search, Warnings, Route maps and Merchants pass, with dismissal and return position | No (grid is new) |
| (e) Source placement | **PASS (Nilf pilot)** / guide-wide gaps | Nilf hub and all walkthrough stages end in Sources → `velen-sources.html#nilf`, landing on the exact entry; no inline links; obsolete save copy removed. LT49-SRC-01 WO walkthrough citations still inline (Low–Med). LT49-SRC-02 WO headings in `velen-sources.html` slug-style, e.g. "On deaths bed" (Low). LT49-SRC-03 Pyres hub has no Sources link (Low) | SRC-01: **yes**. SRC-02: no (new content). SRC-03: n/a |
| (f) Quest accuracy (Nilf → Bloody Baron / Hunting a Witch) | **PASS** | All 9 objectives, level 5, Baron L6 → King of the Wolves, Witch L5 → Wandering in the Dark, and inn choice as an approach consequence all match the wiki. Leads: LT49-ACC-01 "hidden ledger" wording, LT49-ACC-02 "Look for Hendrik" branch tag (Low) | Leads: **yes** (identical text) |
| (g) Save and Undo | **PASS** (no loss) | PRG-01 **still applies** (rail disappears and now has no notice at all; misleading footer removed). PRG-02, PRG-03, PRG-04 and N1 **still apply**, unchanged | **yes** (all pre-existing) |
| Physical iPhone Safari (portrait and landscape) | **OPEN / UNTESTED** | Emulation only | — |
| VoiceOver | **OPEN / UNTESTED** | Chrome AX tree only: 40 named strip buttons, polite counter, no unnamed controls on Nilf pages | — |
| Per-quest map relevance across all 40 quests; wider template checks (DLC labels) | **UNTESTED** | Spot checks only | — |

## Recommended next actions (for Cmdr and the owner; LT made no changes)
1. **Fix LT49-RT-01 before wider rollout.** Region Tools global tiles should bypass `sharedHash` (use the raw `#home`, `#regions`, `#field-reference`, `#progress` and `#whiteorchard-constellation`, or the `index.html#` prefix `link()` already honours).
2. Fix LT49-BTN-01 by scoping the forged `::before` so the purpose-icon rule cannot size it (or move the plate to another pseudo or wrapper).
3. The owner decides on LT49-NILF-01 type scale and NILF-02 rail clearance during the top-to-bottom design review.
4. Carry PRG-01 to PRG-04 and N1 forward as open; PRG-01 now needs a "record could not be read" notice.
5. Physical Safari and VoiceOver pass by the owner or PFC (`08-device-open.md`).
