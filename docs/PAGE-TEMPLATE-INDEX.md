# Phoenix page templates

Baseline: published v48 plus the owner-approved regional deck and number strip at `011b00563067ff192313338c3bce88d2089f90e4`. Velen is the canonical reference for regional decks and supplies the approved walkthrough refinements. White Orchard remains a reference for its existing presentation and behavior. Preserve the White Orchard implementation and consider individual elements for incorporation with explicit owner approval. Use the table to choose the template before building. A prototype or planned surface requires its own acceptance before becoming a standard.

Companion requirements: [Regional decks](REGION-DECK-TEMPLATE.md), [Quest and activity artwork](QUEST-CARD-ART-TEMPLATE.md), [Illustration standard](../ART-STANDARD.md).

## Shared page contract

- Reuse the region shell, typography, scroll treatment, steel and silver controls, and the existing white-space rhythm. Follow saved font, appearance and reduced-motion preferences. Desktop changes must not remove mobile touch targets.
- Preserve Home, Regions, and wolf navigation where the shell provides them. Give the page one clear title and predictable return actions. A deep link, direct entry, reload, or Back/Forward must resolve the same logical owner and stage. Preserve returning scroll and focus where the existing flow supports them.
- Identify the actual quest, task, location or item with a stable ID. Routes and cross-references use those IDs. Keep sourced facts, estimates, spoilers and unverified details distinguishable. A card uses subject-specific art. Repeated actions use stable icons or illustrations.
- Keep reading, previewing, selection, and completion independent. Progress changes use the existing owner, guarded storage, confirmation when needed, and Undo. Report storage failures without replacing unreadable data. A new page must not silently create a duplicate progress owner.
- On touch: allow vertical travel outside horizontal controls. Horizontal rail controls need legible labels, visible focus and sufficient gutters. Selectable targets should be at least 44 CSS px where practical. Keep fixed controls clear of the safe area and of the last actionable content.
- Test compact phone portrait and landscape, and desktop keyboard. Verify focus, labels, contrast, no page overflow, routes, empty states and content correctness. iPhone Safari acceptance and desktop/browser tests are separate evidence. Check returning-browser cache tags when changing shipped assets.

## Home and region pages

| Surface | Layout and data | Interaction and acceptance | Source |
| --- | --- | --- | --- |
| Main Home | Continue near the top, illustrated region choices, whole-game progress and field-reference shortcuts where available | Continue follows a valid saved destination. Empty or unsupported state has a safe fallback. Keep regional and activity totals honest | `main-console.js`, `home-ui.js` |
| Region selector | Region choices with stable label, artwork and destination. Expansion entries remain distinct | Swiping or focusing a card never writes progress. Selecting an available region opens its own console. Incomplete regions are labeled | `index.html#regions`, `main-console.js` |
| Region console | Region heading, Continue, illustrated deck, numbered strip below the deck, selected quest briefing and contextual actions | Number strip wraps both ways, browses independently, and selects on tap. Keep Walkthrough and Hub action art fixed and quest art distinct. Verify return to the same card | `velen-r18.js`, `desk-r11.js`, `deck-jump.js` |
| Quest hub or card | Quest title, art, briefing, place, suggested level when sourced, progress ownership, completion rule, walkthrough, nearby or related content | Open the actual quest and its active stage. A tracked hub may change completion through its owner. An informational card exposes the guide and completion rule without granting a mark | `quest-hubs.js`, `velen-r18.js` |
| Quest walkthrough | Compact illustrated header, fixed wolf pointer, warning state, objective rail, instructions, contextual details and choices, related quests, return tools, text Sources link to the quest’s anchor | Native snap lands under the wolf. Checking a box preserves position. Keep optional tasks under their owner and consequential choices by the affected step. Required count and stage position are distinct. Temporary marks are labeled | `shared-walkthrough.js`, `shared-walkthrough.css`, `quest-pages.js` |
| Sources index | Regional list with one stable anchor per quest and links to the verified references | Sources link belongs at the bottom of the user-facing page. Deep link lands on the right entry. Keep credits and guide citations available without expanding navigation copy | `velen-sources.html` |

## Tasks, maps and regional reference

| Surface | Layout and data | Interaction and acceptance | Source |
| --- | --- | --- | --- |
| Activities and discoveries | Parchment framed category rail with centered pointer. Category deck with task cards, numbered jump strip, route order and completed group | Open a category or select a stop directly. Completed stops remain accessible. Art represents the exact camp, nest, treasure, service, or enemy | `exploration-ui.js`, `exploration-data.js`, `visual-system.js` |
| Task detail | Title and specific scene, location, preparation or threat, actions, outcome/reward if sourced, completion definition and parent links | Preserve the owner on return. Mark complete only via explicit progress action. Spot-check threat, route and item conditions against sources | `exploration-ui.js`, `quest-pages.js` |
| Contracts | Use quest card and walkthrough. Include notice or giver, suggested level, actual target, investigation clues, combat preparation, trophy and reward handoff | Card depicts the target. Cover optional tactics and payment choices separately from required objectives. Verify starting location, warning and endpoint | `velen-quest-cards.js` |
| Regional map and cluster map | Legible markers with names, categories, owner, locations, zoom and list access. Browse mode first and temporary progress filtering where supported | Pins open corresponding guide entries. Check empty filtered state, mode reset, zoom, phone gestures and exact return. Unverified pins stay marked pending | `map-ui.js`, `map-data.js` |
| Departure review | Current region and departure milestone, relevant misses, optional opportunities, warnings and next region | Present known cutoff conditions before departure. Separate completed, open and unavailable items. Preserve independent progress and allow review before confirming changes | `departure.js` |
| Constellation | Region, quest and task nodes with readable edges, state and alternate access where available | Open node owner and return to selection. Verify incomplete and failed distinction and shared nodes. Visual experiments remain review-only until accepted | `index.html`, `app.js` |

## Field tools and Character

| Surface | Layout and data | Interaction and acceptance | Source |
| --- | --- | --- | --- |
| Field Reference | Entry categories for Economy and merchants, Character and gear, combat, alchemy, maps and other available systems | Visible routes open their intended section. Reserved areas and partial data need explicit scope | `main-console.js`, `home-ui.js` |
| Merchants and services | Location-led cards and detail, service type, verified inventory or capability, timing if sourced, map and region links | Distinguish fixed services and version-dependent stock. Verify exact region, service and return behavior. Missing inventory does not become a claimed price | Regional data and section entries |
| Diagram browser and diagram detail | Search or alphabetical jump, diagram rails, selected item, source and location, level and requirements when verified | Retain filters and selection on return. Test no matches, key terms, links to gear and local map. Reuse the approved alphabetical control for names | `diagrams-ui.js`, `diagrams-compass.js` |
| Character and Build Vault | Equipment and skill planning panels where supported, stat previews with evidence labels, requirement details, named builds and save controls | Separate preview and saved build. Check reload and import/export where available, validation, mobile columns, and supported gear scope. The Inventory preview remains a separate QA item | `character.html`, `character-ui.js`, `character-vault.js`, `character-gear.js` |
| Search | Compact overlay with results, query state, supported filters and clear empty result text | Escape or Back closes safely. Opening a result reaches its owner, and Return to Search restores query and filters where supported | `search-ui.js`, `search-model.js` |
| Progress and recovery | Whole and regional activity summaries, explicit filtered lists, status controls, safe save feedback, journal and calibration where available | Protect existing saves, classify alternate branches correctly, keep Undo exact, preview consequential changes. Development fixtures use isolated storage | `progression-ui.js`, `progression-engine.js` |
| Warning and wolf overlays | Navigation deck, distinct contextual warning pointer, warning acknowledgement and history where available | Navigation stays distinct from progress. Test warning ordering, focus, dismiss, history, Undo behavior and vertical safe area | `medallion.js`, `warning-center.js`, `shared-walkthrough.js` |
| Empty, error or unsupported view | Explain what is unavailable and present a safe return route | Never assert a feature or record exists based on missing data. Check invalid URLs, unknown IDs, denied storage and interrupted navigation | `index.html`, individual route modules |

## Before copying or extending a page

1. Record the page type, accepted reference route, normalized content fields, owner IDs, entry and return routes, empty state and art source.
2. List every required interaction and which shared module already owns it. Reuse shared components and styling. Record deltas before changing them.
3. Build and check the page on the development branch and use the Safari site for visual acceptance. Keep the published QA baseline available for comparison.
4. Record any owner-approved change here or in the linked template and update session-start guidance when the workflow changes.

Velen coverage, Gwent, advanced build simulation, crafting and other incomplete systems must be scoped from their implemented baseline and outstanding requirements. This index is the standard for extending an accepted page family. It does not certify every listed behavior as shipped or tested.
