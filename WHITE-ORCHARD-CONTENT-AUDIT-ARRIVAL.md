# White Orchard content audit — arrival slice
13 November 2026. Cmdr Chad. Scope: arrival content only; not the full missing-content inventory.

## Verified findings
1. gwent-start describes only a generic card reward. Specify Zoltan Chivay, a neutral close-combat card of strength 5, won from Aldert Geert. The reviewed-guidance Boolean is not a card ownership record.
2. Older guidance describes recovery beneath Hanged Man's Tree. CDPR currently lists an Xbox issue where it can fail to appear. Recommend playing the scholar before departure. Do not claim permanent universal loss or guaranteed recovery.
3. Card-shopping guidance lacks names and explains neither Elsa's departure nor Bram's role. The Complete Edition guide identifies Elsa as the early vendor and Bram near Woesong Bridge as the later vendor. It lists Decoy, Catapult, Blue Stripes Commando, Crinfrid Reavers Dragon Hunter and Foltest: Lord Commander of the North for Elsa. Its Bram listing omits Decoy even though other references describe shared inventory. Do not promise identical full inventories, duplicate copies, fixed prices or stock refresh exploits.
4. poi-4 uses a generic detour introduction for a one-time opening-camp item. Replace this with explicit immediate pickup guidance using Witcher Senses after the opening ghoul fight. The existing action is substantially right; improve findability and warning placement.
5. Crystal-skull disappearance at griffin-quest completion is reported by retrieved reference snippets, but full wiki pages failed to load. Treat the precise cutoff and later dialogue conditions as pending verification. The safe actionable instruction is collect it immediately at the start. Do not invent an automatic failure/departure rule.
6. shopkeeper-1 is a map utility and may open a merchant/location panel instead of its FIELD NOTE. Content must reach the actual rendered vendor surface. Inspect economy-merchants routing and any separate merchant registry before patching text.
7. The existing departure review names three risk quests; completeness and exact cutoff logic require a separate full quest-source audit. Do not declare that list exhaustive from this arrival slice.

## Sources checked
- Complete Edition guide: https://www.primagames.com/eguides/the-witcher-3-wild-hunt-the-complete-edition-eguide/gwent/the-gwentlefolk-of-the-northern-realms/the-gwentlefolk-of-white-orchard
  Retrieved page names the early vendor/card list, scholar reward and later vendor. Exact stock/prices remain Xbox field checks.
- CDPR Xbox support: https://support.cdprojektred.com/en/witcher-3/xbox/gameplay/issue/3038/zoltan-chivay-card-does-not-appear-under-the-hanged-mans-tree-in-velen
  Retrieved full page acknowledges missing fallback card. This is a current issue report, not proof every Xbox save is affected.
- Zoltan card: https://witcher.fandom.com/wiki/Zoltan_Chivay_(gwent_card)
  Retrieved full page supports reward, strength, row and intended fallback.
- Crystal-skull candidate: https://witcher.fandom.com/wiki/Crystal_skull
  Search snippets support opening camp and reported cutoff; full retrieval failed (402). No precise cutoff or later-story dialogue dependency is approved from this source alone.

## Other regional gaps still open
Faithful Friend conditional later-return guidance; per-quest choices/cutoffs; exploration enemy/site specifics and route ordering; all service NPCs (including Tomira's actual rendered surfaces); six stone identities and map locations; unique gear and missables; source quality across generic entries; end-to-end device acceptance. This is a work queue, not a certified exhaustive omission list.

## Assignment 02 browser status
13 November attempt: cloud review browser could not connect to local HTTP server (ERR_CONNECTION_REFUSED). No browser rendering pass. Model/static checks at 1db7cbc remain supporting evidence. Obtain LT's local browser observations against the exact branch commit, with Cmdr reviewing returned evidence. No public deployment is authorized to solve this.
