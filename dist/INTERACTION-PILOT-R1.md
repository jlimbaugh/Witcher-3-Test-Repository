# White Orchard interaction pilot R1

Baseline: d4c5f7dc02b0a026e54b6f5a4981ea9a5001dcfe. This revision implements a bounded interaction prototype after LT review R1, not complete regional content.

## Stable ownership

| Activity ID | Home hub | Content |
|---|---|---|
| q-lilac | hub-arrival | quest-lilac |
| q-firestarter | hub-firestarter | quest-firestarter / walkthrough-firestarter |
| loc-forge | hub-firestarter | location-forge |
| q-beast | hub-hunt | quest-beast |
| pop-cemetery | hub-hunt | discovery-cemetery |
| departure-review | hub-departure | departure-check |

Arrival recommends loc-forge, but its link goes to the Firestarter hub. Departure recommends pop-cemetery, but its link goes to the hunt hub. Shared references have a read-only status mark; the authoritative home contains the single completion control and direct content link. No explanatory labels clutter the rows.

## Prototype behavior

- Three story groups with four permanent hub blocks; arrival has a village side branch.
- Current window plus next story group; Earlier/Later browse other groups without marking completion. Direct hub links reveal the target group and next group, expand its hub and scroll the target into view. Nodes retain stable DOM IDs.
- Exactly one expanded cluster, or none if the player closes it.
- Hub rows contain only activity name and completion control/status. Completed rows remain visible.
- Six unique pilot activities counted as raw completed/total, explicitly not regional completion percentage.
- Previous/Next and stage selection navigate only. Firestarter has four stages, with stored last viewed stage. Quest and walkthrough pages have no completion controls.
- Map page provides labelled routing-test links, type/search/completed filters, and selected-hub jump. No geography, game icon replication, coordinates or real cartography is claimed.
- Return to hub and browser Back restore the saved expanded cluster and scroll position. Programmatic focus uses preventScroll so it does not displace the restored viewport.
- Continue prioritizes the last walkthrough at its last viewed stage. Before any walkthrough has been opened it falls back to the last content page or selected hub. The selected hub is separately shown on the regional landing.

## Save state

New localStorage key: phoenix.whiteorchard.interaction.v1; version 1. Activity completion is keyed by the stable IDs above. Other state: selected/expanded hub, story window, tree return snapshot, last stage/content, map filters. If no new save exists, the previous pilot key phoenix.whiteorchard.pilot.v1 is read and its firestarter true value maps to q-firestarter. The legacy key is never overwritten or deleted. No other historical save keys are touched. Save failure leaves in-memory navigation usable and reports the persistence limit.

Browser history entries also carry their own tree snapshot. This prevents a later hub selection from silently changing where an older Back entry returns.

## Content rationale and limits

This is hand-curated test data, not an automated opportunity-selection engine. Arrival and the village branch demonstrate convenient town business; the hunt demonstrates a level-3 story anchor and the cemetery's referenced level-7 encounter within the +5 allowance. The encounter warning is next to the approach instruction. An unlevelled discovery is not assumed safe merely because it has no journal level.

References: https://witcher.fandom.com/wiki/The_Beast_of_White_Orchard ; https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/place-of-power-locations ; https://www.gamebanshee.com/thewitcher3/walkthrough/lilacandgooseberries.php ; existing Firestarter source links retained in the content.

No complete rewards/availability/missables inventory, encounter safety certification, authentic font claim, new region, or production template acceptance is implied. Official CDPR art and the approved splash remain. New detail views use the same regional scene until art direction is refined.

## Verification for this revision

- JavaScript syntax, unique static IDs, and internal route roots checked.
- Browser: one expanded hub; owner-only completion controls (six unique task controls, none on content pages); shared cemetery status reflected under both hunt and departure; shared references route to the owner hub.
- Explicit return matched a saved 399 px tree scroll; browser Back matched a separate 274 px scroll and the changed departure hub after entering through a hunt deep link. A deep-link/history override defect was found and corrected during these checks.
- Four walkthrough stages: Previous/Next, stage selector, final-stage boundary, one stage visible, stage resume after leaving/reopening and reload; Next left an incomplete task incomplete.
- Regional Continue resumed the last walkthrough at stage 3. Pilot activity count remained 0/6 after restoring test completion marks.
- Map routing tests: type and name filtering; completed discovery hidden by default, shown when requested; filter state survived a refresh; direct link revealed its target group and owner hub.
- Basic Tab/Enter hub activation passed. No pilot-origin errors were returned by the browser log check.

Not claimed: independent iPhone Safari test, complete narrow-viewport QA, full accessibility audit, forced storage-failure/corrupt-save/multi-tab tests, independent Xbox content validation, real map geography or automated opportunity-selection logic. Legacy-key import is implemented and code-reviewed; no seeded browser migration test is claimed.
