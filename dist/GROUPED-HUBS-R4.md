# Grouped quest hubs — R4

Baseline: ddce963. Implements the approved grouped checklist inside each quest box while retaining the horizontal bracket.

## Behavior

Expanded hubs show only populated sections, in this order: Quest walkthrough, Side quests, Contracts, POIs & exploration, Gear & services. Task order within a section follows the route registry. Rows remain names and completion marks. Each task still owns one checkbox in its fixed home; references route to that home and mirror its completion state.

Six Place of Power pages, the inn Gwent stop and the forge service page now have a direct external White Orchard map link alongside their existing compact instructions. Their Regional map navigation also opens a selected-location card with directions, a source reference, an external map link and a return to that activity guide.

The external map URL is the verified Gamer Guides regional map. It is deliberately labelled as a regional map, not an exact-pin deep link. No coordinates, marker centering, native map art or pin icons are invented.

## Validation

JavaScript syntax passed. Browser checks confirmed the griffin hub’s five section labels, no empty groups, 22 unique owner completion controls, and the Cemetery guide → selected-location card path. Horizontal navigation and stored task identities use the existing implementation. The map provider page was verified through web retrieval; its map interactions are outside this console’s QA. Real iPhone Safari and Xbox field acceptance remain pending.
