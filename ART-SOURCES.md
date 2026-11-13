# White Orchard pilot R1

Official art: © CD PROJEKT RED. Original assets downloaded unchanged from https://www.thewitcher.com/us/en/witcher3

White Orchard scene: https://public.cdn.cdpr.app/static/thewitcher.com/media/screenshots/witcher3/full/witcher3_en_screenshot_screenshot_32_1920x1080_1433341638.png

Splash key art: https://public.cdn.cdpr.app/thewitcher/media/wallpaper/2010/1920x1080/The_Witcher_3_RE_1920x1080_Wallpaper_EN_q70_1920x1080.png

The village screenshot is atmospheric, not an exact depiction of Willis’s forge. This statement described the original R1 baseline. Current card and scroll illustrations are generated guide concept art, as documented below; they are not official CDPR assets.

Archived baseline: commit c7b21181e9b0c9f4e33f5c387470bf2249125bd7. The active application is a clean regional pilot. Older Systems, Builds, Maps, and quest content are removed from active routing. Splash composition and key artwork retained; inactive splash categories are explicitly planned.

Pilot routes: Regions → White Orchard → Map / Quests / Points of Interest → Twisted Firestarter / Willis’s forge → Walkthrough. One saved completion identity shared between quest, walkthrough, list and location. Map illustration and pins are pending.

Quest references: https://www.gamebanshee.com/thewitcher3/walkthrough/twistedfirestarter.php and https://witcher.fandom.com/wiki/Twisted_Firestarter

Content and presentation require Capt acceptance before this becomes a regional template. No independent Xbox field test claimed.

## Interaction pilot R1

The same official CDPR assets remain unchanged. The active build now includes a four-block story tree, fixed activity homes, six pilot activities, stage navigation and resume, hub-only completion, exact-return state, and labelled map-routing tests. See INTERACTION-PILOT-R1.md for identities, sources, behavior and limits. No geographic map, game icon set, authentic font or complete regional route is claimed.

## Native White Orchard map (R5)

The local in-game terrain raster and original game marker PNGs are documented in MAP-SOURCES.md, including extraction credits, source commits, coordinate transformation, CC BY-NC-SA coordinate attribution and the separate Leaflet BSD licence. Map navigation no longer points to an external map site.

## R10 review assets
r10-haunted-scroll-concept.png is an original generated decorative concept made for this review. It depicts generic haunted scroll ornament and is not official CDPR art, geography, or a verified noonwraith depiction. The scene and map assets above remain unchanged. r10-*.svg are original code-drawn material/object studies, not game emblems. Quest-specific official banners and per-plaque art remain pending. The earlier 'no generated imagery' statement describes the historical baseline, not this explicitly labeled test branch.

## R13 illustrated quest deck
Thirteen original card illustrations were generated with the built-in image tool, using the owner's supplied stone/silver/creeping-wraith-hand composition as a material reference. These are guide concept illustrations, not official CDPR art or evidence of game geography, exact equipment appearances, heraldry or creature anatomy. Official scene and native-map assets remain unchanged. File names, subject prompts, dimensions, byte sizes and SHA-256 hashes are in art-r13/MANIFEST.json. WebP conversion preserves image dimensions and provides compressed delivery; the artwork is not embedded into controls or text. Titles, navigation, completion marks and all practical guidance remain HTML.


## R14 runtime derivatives

Original pixels are retained under source-assets in the source repository, outside the served application. Runtime card derivatives are 512 × 768 WebP; hub thumbnails are 192 × 288. Scene and haunted-scroll WebP derivatives preserve composition and use quality 84. No regeneration or art substitution occurred in this optimization pass. Generated pictures are concepts, not canonical evidence. CDPR fan-content and asset licensing review remains pending before public release. See source-assets and art-r13/MANIFEST-R14.json for provenance and hashes.


## R15 — Gwent selectors and shared guide materials

The 13 R13 quest illustrations remain generated guide concepts. Their shared Gwent-inspired frame is new SVG/CSS interface artwork, not an extracted official card frame. Existing source pictures were not regenerated.

Six official GWENT card illustrations were retrieved on November 12, 2026 from CDPR's own Card Reveals page: https://www.playgwent.com/en/card-reveals . Local metadata, exact direct source URLs, card names, dimensions and SHA-256 values are in gwent-r15/MANIFEST.json. Original JPEGs are preserved in source-assets/gwent-r15; runtime files are proportionally resized WebP derivatives. Copyright remains with CD PROJEKT RED and the relevant rights holders. No new licence or ownership is asserted.

- Ivo of Belhaven: temporary Quests console illustration.
- Lyrian Cavalry: Regions and travel navigation.
- Vysogota of Corvo: map/journal navigation.
- Isbel of Hagge: constellation navigation and header.
- Gabor Zigrin: merchant category illustration.
- Woodland Spirit: discovery index illustration.

These are decorative navigation/category illustrations, not portraits identifying the guide's NPCs, geographical evidence, recommended Gwent deck choices, or quest-level data. Their original game values are not used as guide state. All guide names and category badges are separate live HTML. Other task pages use their own quest picture or contextual owner-hub art; field acceptance of picture suitability remains open.

The currently published fan-content guidelines were consulted on November 12, 2026: https://www.cdprojektred.com/en/fan-content . They describe noncommercial fan websites and require clear unofficial identification; they also defer to the applicable agreements. The site retains its unofficial notice. This source check is not a claim of blanket legal clearance or asset-specific permission for a future public release.

Silver frames/rules and worn-vellum textures are repo-native SVG/CSS interface assets authored for this guide. Existing terrain, map coordinates, icons, font licences and official scene credits remain governed by their separate source notes.

## R16 console material and lettering

- `curled-vellum-r16.webp`: generated guide UI material, derived from the approved Phoenix console reference. Source PNG is retained in `source-assets/curled-vellum-r16.png`. Prompt: one blank front-facing unrolled ivory medieval vellum scroll, curled top/bottom, deckled sides, fibers, creases, water stains, tiny margin ink/blood flecks and faded thistle marginalia; empty readable center, no text or UI, transparent background. Generated with built-in image generation; WebP derivative quality 84. It is decorative; live text/controls are separate HTML.
- `fondamento-r16.ttf`: Fondamento Regular, downloaded from the official Google Fonts repository, `https://github.com/google/fonts/tree/main/ofl/fondamento`. SIL Open Font License retained as `FONDAMENTO-OFL.txt`. Broad-pen readable lettering is the new default when no font preference is saved. Existing saved font choices are preserved; all three reading-font choices work on console text.
- `console-constellation-r16.svg`: original code-native navigation illustration, a decorative stellar route diagram, not quest data.
- All quest and merchant artwork reused from the R13/R15 sources above. No replacement of the locked quest illustrations.
