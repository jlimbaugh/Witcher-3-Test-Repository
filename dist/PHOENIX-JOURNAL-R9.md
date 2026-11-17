# Phoenix R9 — Journal & Iron integration

12 November 2026 · Approved Study 03 direction · Baseline main 2512f2a5b2c6cb9bf41707cf9f12a9db0a115804

## Delivered

- Console uses the approved CDPR White Orchard scene and framed manuscript layout, engraved borders, crest badges, corner flourishes and bronze/oxblood navigation.
- Continue reads the same saved walkthrough and stage as the regional Continue control. No sample completion or fake quest state is shipped.
- Shared theme covers region pages, the horizontal quest bracket, activity groups, walkthroughs, objective cards, progress review dialogs, service panels and native map.
- Native map keeps its existing terrain, coordinates, marker icons and routing. Desktop controls sit beside it; phone controls stack above it. Expand and Escape remain available.
- Self-hosted IM Fell English headings, Alegreya default body, optional IM Fell body; included Fontsource SIL OFL licenses. These are candidates, not a claim to reproduce CDPR's proprietary typeface.
- First visit follows the device color preference. A manual theme and reading-font choice persist under phoenix-appearance-v1, separate from guide progress. Storage failure is handled without blocking navigation.
- No progression schema, engine, quest data, completion identities, stage/history logic or other repository was changed.

## Verification

All 29 progression regression tests pass. Changed JavaScript syntax checks and HTML nesting/duplicate-ID checks pass. Chromium checks covered real Continue routing, marker filtering (six Places of Power), one-open-hub behavior, opening a walkthrough, independent stage Next, and font/theme persistence after reload. Phone-width layout measured 375 px client and scroll width. Real iPhone Safari, VoiceOver and outdoor readability acceptance remain pending; PFC is unavailable.

## Art and scope

Official assets are unchanged and credited. No artbook scans or generated CDPR-style artwork were added. CDPR's current fan-content page was reviewed on 12 November 2026: https://www.cdprojektred.com/en/fan-content . The guide retains an obvious unofficial/non-endorsement footer and has no monetization. This records the project check, not legal clearance.

## Deployment

GitHub connection rejects blob writes with Resource not accessible by integration (403). Authorized repository-browser upload is used for the application files only. No repository permissions or Pages settings change is needed.
