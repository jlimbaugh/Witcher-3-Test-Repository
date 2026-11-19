# 05 · Source placement: **PASS for the Nilf pilot. FAIL (Low–Medium) for guide-wide convention: White Orchard walkthrough citations still inline and WO headings slug-style**

*Author-supplied evidence (LT). Live v49 = ba59252. iPhone emulation at 390×844 in headless Chrome. Script: `/workspace/qa48/n16.cjs` and `n17.cjs`. Raw data: `evidence/05-sources.json`.*

## Nilf pilot (in scope of PR #24)

| Check | Route | Result |
|---|---|---|
| No inline Objective reference or source links | `#velen/hub/nilf` and `#velen/quest/nilf/1`…`/8`, all `<details>` expanded | No visible external (`http…`) links in the page body ✅ |
| Hub ends in a quiet Sources link | `#velen/hub/nilf` | `Sources → velen-sources.html#nilf` (class `sw-source-link nilf-hub-sources`) ✅ |
| Walkthrough ends in a quiet Sources link | `#velen/quest/nilf/1…8` | `Sources → velen-sources.html#nilf` on every stage ✅ |
| Lands on the exact central entry | Tap Sources from the hub and from stage 3 | `/velen-sources#nilf`: `:target` = `#nilf` "The Nilfgaardian Connection", scrolled to top 16 px, outlined. Entry lists gamebanshee, witcher.tools, `witcher.fandom.com/wiki/The_Nilfgaardian_Connection#Objectives` and a web.archive.org snapshot ✅ (`evidence/05-sources-landing-nilf-390.jpg`) |
| Other Velen pages use the same convention | `#velen/quest/baron/1` → `#baron` (lands on "Bloody Baron"), `#velen/lead/baron`, `#velen/quest/witch/1` and `#velen/lead/witch` → `#witch`, `#velen/quest/pyres/1` → `#pyres` | ✅ |
| Obsolete save instruction | Nilf hub and walkthrough | "Your Velen progress saves in this browser." **removed** (it was present on v48) ✅ |

**Nilf pilot source placement: PASS.**

## Findings

- **LT49-SRC-01 (Low–Medium, also on v48). White Orchard walkthrough objective citations are still inline.** `#quest-lilac` (Lilac and Gooseberries walkthrough) shows three inline links: "Source 1 · gamebanshee.com ↗", "Source 2 · witcher.tools ↗" and "Source 3 · witcher.fandom.com" (→ `wiki/Crystal_skull`). No WO page links to the new `velen-sources.html#white-orchard` / `#q-…` entries (0 links found). The checklist states "White Orchard objective citations are centralized. The same convention applies guide-wide." The central index entries exist but the WO runtime still uses inline links. **v48: identical** (3 inline links, 0 central links), so this is not a regression. It is an incomplete rollout and should be distinguished from the open "legacy citations in field-reference tools" item.
- **LT49-SRC-02 (Low, new content in v49). WO section headings in `velen-sources.html` are slug-style, not quest titles.** Examples: "Lilac and gooseberries", "The beast of white orchard", "A frying pan spick and span", "Missing in action", "**On deaths bed**", "**Contract devil by the well**", "**Scavenger hunt viper school gear**", "The incident at white orchard". Expected: the proper title casing and punctuation used elsewhere in the guide, e.g. "On Death's Bed", "Contract: Devil by the Well", "Scavenger Hunt: Viper School Gear". Exact titles are leads to confirm against the wiki before editing. The Velen headings in the same file are correctly titled.
- **LT49-SRC-03 (Low).** `#velen/hub/pyres` (a non-Nilf tracked hub) has **no** Sources link, while its walkthrough does. Guide-wide convention gap, outside the Nilf pilot scope.
- The walkthrough's "Field Reference" link (→ `#velen`) is the Region Tools defect LT49-RT-01, not a source link.

## Duplicate controls and save copy encountered
- No duplicate Sources links. Hidden duplicate Previous/Next buttons exist in the DOM on the walkthrough (0×0, not visible). Noted in 03, not user-visible.
- No routine browser-save instructions on Nilf hub, walkthrough, Bloody Baron or Hunting a Witch pages.
