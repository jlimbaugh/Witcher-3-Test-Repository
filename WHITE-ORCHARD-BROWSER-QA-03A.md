# Cmdr Browser QA — Assignment 03A
13 November 2026. Tested application: 1c91b66eeefb5ec99a357f1a18d7aeccfb53be31.

## Isolation and provenance
Private hosted QA copy: https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site
Sites source commit: 356d28e90aabde54cc13be1e484da679b8593a87; deployment succeeded.
All 145 tracked source files in dist were compared byte-for-byte to the application commit. Hosting configuration and provenance are outside dist. Two iframe layout harnesses were added only to the local development preview after packaging; they are not in the published archive.

The hosted copy correctly presents ChatGPT sign-in to an unauthenticated browser. No sign-in was completed and no hosted-application interaction is claimed. Browser tests below used the supported Sites development relay serving the same application files. This relay solved the previous standalone-server network-namespace failure. main and GitHub Pages were not changed.

## Observed browser checks
- Startup and assets: guide, card/scroll art and map terrain rendered. No application-origin console errors observed in the captured error log. Extension metadata errors were excluded. Asset loading was visually spot-checked, not a complete network-response audit.
- Detail placement: Cackler Place of Power and Gwent guidance render completion definition once on parchment, plus legacy clarification. Shared-mark text is visible on Gwent and Viper pages.
- Themes/responsiveness: Cackler checked visually at desktop in day/night; Cackler and Gwent checked at a genuine 390 CSS-pixel iframe viewport in day/night. Document scroll width 375 with 390 viewport (vertical scrollbar present), no horizontal overflow. This is a Chromium layout test, not mobile device emulation. Text measured rgb(48,42,35) on nominal panel background rgb(223,203,166); textured background was visually reviewed. No formal per-pixel contrast certification.
- Actual utility routes: Bram accessible map-list button → location panel → merchant page shows authoritative definition and legacy copy on both. Merchant page also shows applicable definitions for Willis and other non-quest service records.
- Buff/signpost: Woesong grindstone and Woesong signpost panels show the correct service/discovered meanings and legacy copy, with no added checkboxes.
- Quest-linked service: Tomira panel and merchant article do not invent a definition; related quest link remains.
- Live accessible checkbox: arrival Gwent and skull checkboxes expose definitions in accessible names; no hub-row paragraphs added.
- Save/update/Undo/reload: in the isolated preview origin, confirmed Arrived milestone to reveal rows; Gwent false → true persisted through reload while skull stayed false. Gwent true → false → Undo → reload restored true with skull still false. Gwent then returned to false. These are new UI-created records, not an imported R19 save fixture.
- Navigation: Gwent detail Return to exact hub restored hub-arrival/gwent-start and focused the originating row. Viper entered from its real hub resumed stage 2; returning restored hub-viper. Back/Forward switched between that hub and walkthrough. Console Next selected Pan in place at #home, and selected action targets matched Pan while last walkthrough resume remained Viper stage 2.
- Keyboard spot checks: Tab from console Open selected quest moved to Nearby opportunities; in narrow Gwent detail, Tab from exact-hub return moved to Regional map.

## Remaining limits
- Physical iPhone Safari, VoiceOver, touch/pinch and Xbox field accuracy are pending.
- Imported R19 browser fixture/migration was not exercised; existing model tests cover legacy preservation, and application save schema/engine are unchanged.
- No visible data-task-mark status spans existed on the sampled hub route; their updated accessible names remain source-verified, not live-certified.
- Full keyboard traversal, arbitrary direct-deep-link return semantics, exact scroll restoration at multiple offsets, and full broken-asset/network/blocked-storage matrices were not exhausted.
- Screenshots were captured for desktop and 390 px reading surfaces and shown in the conversation; not stored in this repository.

## Disposition
The two Assignment 03A presentation defects are accepted as repaired on the observed paths. Browser evidence is sufficient to proceed with the bounded content slice on the completion branch; it is NOT release acceptance, full regional completion, or a blanket pass of the remaining limits. Keep these limits on the final regional acceptance list.

LT may begin Stage B under WHITE-ORCHARD-LT-ORDERS-03B.md. Remote application-file writes remain suspended for this cycle. main/GitHub Pages release requires CaptDrunk's later approval.
