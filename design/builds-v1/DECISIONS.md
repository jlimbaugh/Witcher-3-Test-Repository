# Build design decisions — owner discussion, 2026-11-17

Recorded by Cmdr. Decisions below are agreed scope and interaction direction.
The visual plates are proposals for review, not an implemented or accepted app.

| Area | Agreed decision |
|---|---|
| Location | Builds and Gear under Character, within Field Reference |
| Opening | Active build first; one explicit current in-game designation |
| Build screens | Selecting a designated/saved build opens its own screen and controls |
| Menu organization | Follow in-game equipment/character menus as practical on a phone, with all supported build factors |
| Tabs | Equipment, Character/Skills, Alchemy, Performance |
| Equipment choices | Full-screen, game-inspired picker |
| Scope | Witcher-set weapons/armor across tiers; non-set gear only when justified by a recommended build |
| Mixing | Freely mix supported pieces; show active and lost set bonuses |
| Exceptions | Vetted non-set items available in any saved build, with inclusion explained |
| Tier control | Whole-set tier with individual-piece overrides |
| Other factors | Skills, slots, mutagens, mutations, set effects, runes, glyphs, enchantments, potions, decoctions, toxicity and supported conditional effects |
| Skills | Learned tree separate from equipped slots; all invested ranks count, even unequipped; identify when a reset is needed |
| Requirements | Show level, point and unlock requirements; unrestricted experiments remain supported |
| Profile | Small manual profile: level, available skill points and story region; ask for other details when needed |
| Stats | Full stat sheet, values plus signed changes against a pinned baseline |
| Explanation | Tap stat for contributors, calculation and shared mechanics link; estimates clearly labelled |
| Baseline | Snapshot of current edits or another saved Vault build |
| Conditions | Expandable panel and active count; live buffs, debuffs and combat-condition controls; save with each build |
| Comparisons | Same conditions first; explicit option to compare each build's saved conditions |
| Target | Baseline output plus target assumptions; simple controls first, advanced expandable; do not imply verified enemy damage |
| Vault | Several named builds; illustrated cards, school/playstyle filters, current pinned first |
| Saving | Draft until Save or Save a copy; preserve original recommendations |
| Current build | Explicit Set as my current build with differences preview |
| Discovery | Playstyle or Witcher school, both reaching the same shared build page |
| Recommended examples | Two distinct playstyles per Witcher gear set |
| Recommended preview | Feel, strengths, weaknesses and preparation needs first; preview then copy to Vault |
| Progression | Milestones and practical next steps, with benefit/tradeoff explanation and direct links |
| Try an upgrade | Temporary preview, then Apply or Cancel |
| Shared references | Compact summary in editor; full gear, skill, alchemy, mechanics, merchant and quest details on shared pages |
| Return behavior | Restore draft, selected slot, conditions and comparison state |
| Gear acquisition | Source and direct guide link; Add to crafting plan where applicable |
| Crafting | One active shared plan, combined requirements, duplicate handling explained; select pieces/tiers and preview changes first |
| Inventory | No owned-material tracking |
| Crafting details | Craftsman capability and verified costs versus estimates distinguished |
| Backup | Individual-build or Vault export/import, preview and name-conflict handling; no silent current-build designation |
| Content | All base-game and DLC content included and visible; label Base Game / Hearts of Stone / Blood and Wine |
| Removed choice | Per-build content scope and DLC switches are superseded; school/playstyle filters and condition controls remain |
| First visual example | Owner's Feline duelist: swords, Quen, light Alchemy |
| Art | Phoenix dark palette, silver framing, worn parchment accents; equipment/skills grid needs owner visual review |

## Implementation boundaries

No real stat formula, item eligibility, stacking rule or enemy defense is validated
by this design record. Use verified data before implementation, disclose estimates,
and never invent exact performance to populate the UI. Example numbers are explicitly
illustrative. Real state persistence requires the existing save-preservation standard,
export/import validation and independent review. No cloud account or subscription is
introduced by the Vault design.

Earlier questions that returned empty answers were not approvals. Later choices
resolve the full-screen picker; no silent default is inferred for an unanswered item.
