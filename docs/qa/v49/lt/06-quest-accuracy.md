# 06 · Quest accuracy: The Nilfgaardian Connection and links to Bloody Baron and Hunting a Witch: **PASS (no wrong branch). Two low-severity wording leads**

*Author-supplied evidence (LT). Rendered text captured from live v49 (`evidence/06-nilf-rendered-content.json`, script `/workspace/qa48/n18.cjs` and `n19.cjs`). Checked against the Witcher Wiki (Fandom), read through the MediaWiki API (`api.php?action=parse&prop=wikitext`) on 2026-11-19 because the normal page fetch was blocked (403). Unverified items are labelled **lead**. No levels, rewards or routes were invented or added.*

Wiki references:
- https://witcher.fandom.com/wiki/The_Nilfgaardian_Connection
- https://witcher.fandom.com/wiki/Bloody_Baron_(quest)
- https://witcher.fandom.com/wiki/Hunting_a_Witch
- https://witcher.fandom.com/wiki/Funeral_Pyres
- https://witcher.fandom.com/wiki/At_the_Mercy_of_Strangers
- https://witcher.fandom.com/wiki/Blood_Ties

## Objective list (hub "Quest progress", 9 objectives, "0/8 required")

| # | Guide (v49) | Wiki "Objectives" | Match |
|---|---|---|---|
| 1 | Travel to Velen. | Travel to Velen. | ✅ |
| 2 | Go to the Inn at the Crossroads. | Go to the Inn at the Crossroads. | ✅ |
| 3 | Ask about the agent called Hendrik at the Inn at the Crossroads. (VIA THE INN) | Under "Unless you go straight to Heatherton" | ✅ |
| 4 | Defeat the baron's men. (IF YOU FOUGHT; route-dependent, not counted) | Under "If hostile to the Baron's men" | ✅ conditional handled correctly, so 8 required |
| 5 | Finish talking to the innkeep about the agent called Hendrik. (VIA THE INN) | same, inn branch | ✅ |
| 6 | Look for the agent called Hendrik in the village of Heatherton. | Listed **inside** the inn branch | ⚠ lead (below) |
| 7 | Talk to the survivor and learn what happened in the village. | same | ✅ |
| 8 | Find the agent called Hendrik. | same | ✅ |
| 9 | Search the agent's hut using your Witcher Senses. | same | ✅ |

## Story facts

| Claim on page | Wiki | Result |
|---|---|---|
| Suggested level 5 | Infobox `level = 5` | ✅ |
| Follows Imperial Audience; arrive at Hanged Man's Tree | `previous = Imperial Audience`; fast travel to Hanged Man's Tree | ✅ |
| Route through Mulbrydale to the Inn at the Crossroads | "proceed through Mulbrydale and across the river to the Inn at the Crossroads" | ✅ |
| Funeral Pyres: priest west of Mulbrydale | Funeral Pyres infobox `location = West of Mulbrydale`; priest on the road west of Mulbrydale | ✅ |
| At the Mercy of Strangers: John Verdun on the riverbank on the approach to the inn | "Along the riverbank, on the road between Mulbrydale and Inn at the Crossroads … John Verdun" | ✅ |
| Inn: resolve the Baron's men's interruption, then finish with the innkeeper. Hub choice "Settled peacefully / Fought" | Three dialogue options. Hostile leads to "Defeat the baron's men"; otherwise peaceful. Both continue to Hendrik | ✅ This is an **approach consequence, not a permanent failure**: the wiki says the choice only changes how easy Crow's Perch entry is in Bloody Baron, and "none of your actions will make things impossible later on." The lead card says "The way the inn confrontation ended can affect the approach," which is consistent |
| Heatherton: rabid dogs, survivor, Hendrik's body and boots for the key, rug (examine or Aard), candlestick reveals hidden compartment, read Hendrik's notes, two leads | Same sequence (wiki: candlestick reveals "a hidden trunk with Hendrik's notes") | ✅ |
| Reading the notes finishes the quest and gives two leads | "The quest will then complete … choose which of the two new quests" | ✅ |
| Next leads: Bloody Baron (`#velen/lead/baron`) and Hunting a Witch (`#velen/lead/witch`), either order | Infobox `next = Bloody Baron / Hunting a Witch`. Bloody Baron "can be completed before or after Hunting a Witch" | ✅ |
| Bloody Baron lead: level 6, Crow's Perch, handoff to Ciri's Story: The King of the Wolves | `level = 6`, `location = Crow's Perch`, `next = Ciri's Story: The King of the Wolves` | ✅ |
| Hunting a Witch lead: level 5, Midcopse, continues in Wandering in the Dark | `level = 5`, `location = Northeast of Midcopse`, `next = Wandering in the Dark` | ✅ |
| Deck order: 1 Nilfgaardian Connection, 2 Funeral Pyres, 3 Bloody Baron, 4 Hunting a Witch | Consistent with the story order | ✅ |
| "Blood Ties" in the Velen deck (card 40) | Real Velen secondary quest (Nilfgaardian Army 'Center' camp) | ✅ exists (content not reviewed) |
| No Lambert or Keira claims in this quest | None on the page | ✅ |

## Leads (unverified or wording, Low, also on v48)
- **LT49-ACC-01 (Low, lead, also on v48).** The objective 9 note says "Includes finding the **hidden ledger** and reading Hendrik's notes" (`velen-nilf-objectives.js:33`, identical in v48). The wiki describes a hidden **trunk** or compartment containing Hendrik's notes, and no ledger. The walkthrough page itself correctly says "hidden compartment." Suggested fix: match the walkthrough wording. Confirm in-game or with Xbox before editing.
- **LT49-ACC-02 (Low, lead, also on v48).** In the wiki objective list, "Look for the agent called Hendrik in the village of Heatherton" sits inside the "Unless you go straight to Heatherton" branch. The guide shows it as a plain Heatherton objective, not tagged "via the inn", and offers a "Record / review choice" there. Behaviour for a player who goes straight to Heatherton was not tested end-to-end. Lead for Xbox confirmation.
- Journal and reward claims: the guide makes **no** XP or crown claims for this quest (wiki: 100 XP). Nothing needs Xbox confirmation beyond the two leads above.
- Stale "beyond this arrival pilot" copy still exists in `velen-data-r18.js` lead data but was **not displayed** on the Velen console or the Bloody Baron and Hunting a Witch lead pages in v49. This is legacy cleanup, not a user-visible defect.

## Routing note (Low, also on v48)
`#velen/quest/nilf/5`…`/8` (stage numbers past the four reading stages) render stage 1 "Arrival" while leaving the hash at `/5`–`/8`. Same on v48. No wrong branch results; cosmetic deep-link handling.

**No STOP finding: no wrong quest branch.** Regional walkthrough set coverage beyond Nilf, Bloody Baron, Hunting a Witch, Funeral Pyres, Love's Cruel Snares and Blood Ties (destinations only): **UNTESTED**.
