# White Orchard main-story content slice

Approved scope: Lilac and Gooseberries, The Beast of White Orchard, The Incident at White Orchard. Natural reading checkpoints, direct instructions with expandable detail, brief contextual detours, visible options with consequences hidden, and conditional reward references. Approved artwork and shared parchment controls retained.

## Implementation

- Lilac: 7 reading checkpoints; griffin hunt: 11; inn departure: 4.
- Existing stage IDs retained (Lilac 1–4, Beast 1–5, Incident 1–2) alongside new descriptive IDs. Existing saved positions resolve; expanded reading does not migrate or infer objective completion.
- Main quests retain their canonical task and objective IDs, maps, and progress records.
- Shared stage renderer supports expandable guidance, plain choice options, contextual links and hidden consequence text. Reward disclosures include non-choice and separately hidden choice reward tables.
- Hub skull warnings clear when the independent skull acquisition is recorded or the griffin quest is complete; departure hub warning follows inn-quest completion.
- Departure link injection skips an equivalent existing link.

## Source audit — 14 November 2026

Published source pages are linked individually in each quest. They are reference verification, not an Xbox runtime test.

| Topic | Sources | Finding |
| --- | --- | --- |
| Lilac route and opening rewards | GameBanshee Lilac and Gooseberries; witcher.tools Lilac | Opening ghouls 250 XP, exterior fistfight 350 XP, departure conclusion 150 XP are reference amounts; optional Bram payment versus food kept conditional. |
| Griffin route | GameBanshee Beast; Guides4Gamers Beast | Herbalist and hunter branches, patrol/nest investigation, preparation, ambush, retreat, trophy and timed hand-in covered. |
| Griffin payout | GameBanshee, GosuNoob, Guides4Gamers, witcher.tools | First three list 150 crowns; witcher.tools lists 250. Base 300 XP with coin / 500 XP without is commonly listed, with XP variation in other reports. No guaranteed current Xbox payout or combined total claimed. |
| Thunderbolt ingredients | Prima Games potions appendix | Basic recipe: 1 dwarven spirit, 2 cortinarius, 1 endrega embryo. Tutorial supplies preparation; check inventory when tutorials are disabled. |
| Skull cutoff | Witcher Wiki Crystal skull and existing shared entry | Before completion of Beast; do not conflate with later inn departure. |
| Inn fight and departure | GameBanshee Incident, Gamepressure Incident, witcher.tools Incident | 300 XP fight reference; subsequent 150 XP belongs to Lilac. Three recorded side-quest risks remain in the canonical departure review. |

## Verification

87 existing automated checks plus 4 new route integrity checks passed. New checks guard persisted stage IDs, all contextual targets and stage references, independent early-warning records, and unchanged checklist identities. Departure checks re-run after duplicate-link prevention: passed.

Phone-width browser QA: hub skull warning visible; saved old reading step resolved; expanded Lilac and Beast selection worked; skull detour returned to exact origin; Lilac → Beast → Lilac departure → Incident handoffs correct; consequence and conditional reward disclosures closed by default; reward table and reading pages fit viewport; 13 canonical progress panels retained; reading through final inn stage left its record at 0/1; duplicate departure link removed.

Open: user Xbox field acceptance; exact current reward payouts. LT art/usability findings remain a separate review and were not preemptively implemented.
