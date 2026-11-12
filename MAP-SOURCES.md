# White Orchard map — sources, credits and scope

This is an unofficial fan work and is not approved or endorsed by CD PROJEKT RED. This guide is noncommercial. Game terrain and original marker icons remain the property of CD PROJEKT RED.

## Terrain and marker icons

Terrain source: https://github.com/witcher3map/witcher3map-maps, commit df7fa74609df7587afc324e569d2574cf5b4f1ec. The White Orchard zoom-4 raster tiles were assembled with TMS row orientation into a 2560 × 2048 WebP, quality 90. No terrain, roads, buildings or geography were redrawn. Source tiles were produced with gdal2tiles. Thanks to DesignGears and hhrhhr for map and asset extraction.

Original game icon PNGs were copied from https://github.com/witcher3map/witcher3map, commit 437241a978a13a1ca9114301d9ef887fadf4f260: pop, poi, armourer, gwent, herbalist and notice. No font assets or complete website UI were imported.

CD PROJEKT RED fan-content guidelines: https://www.cdprojektred.com/en/fan-content

## Marker coordinates

The 12 initial marker positions and eight orientation-label positions are adapted from assets/scripts/custom/mapdata-white_orchard.js in the witcher3map repository above. Created by untamed0, with mcarver and other contributors. Upstream project: https://github.com/witcher3map/witcher3map

The adapted coordinate dataset in map-data.js is distributed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0: https://creativecommons.org/licenses/by-nc-sa/4.0/

Changes: a guide-linked subset was selected, display names were written for this console, stable activity IDs were attached, and the source’s web-Mercator coordinates were converted to the local raster coordinate system. Original source coordinates remain in the dataset for audit. Copyright in the game assets is separate from this dataset licence.

At source zoom 4, the Mercator world is 4096 pixels wide. The exported terrain occupies x=0…2560 and y=2048…4096. For source latitude/longitude, project at zoom 4; local map coordinates are [4096 - projectedY, projectedX]. No hand-guessed marker coordinates are used.

## Mapping library

Leaflet 1.9.4 is vendored locally from the npm package leaflet@1.9.4. Copyright (c) 2010–2023 Volodymyr Agafonkin and (c) 2010–2011 CloudMade. BSD 2-Clause licence: see LEAFLET-LICENSE.txt. Documentation: https://leafletjs.com/reference-1.9.4.html

The console’s map controls and quest integration are newly written in map-ui.js. The map image, icons, library and coordinate data are served by this repository. No map iframe, external map service or CDN is needed during use.

## Coverage and validation limits

Initial pins: six Places of Power; Viper steel and silver diagrams; Willis’s forge; scholar at the inn; Tomira’s cottage; village notice board. Orientation labels are noninteractive landmarks, not additional completion records. Both Viper diagram pins share the existing Viper quest’s completion record. Every interactive pin routes to an existing activity’s fixed hub.

This is a sourced first map, not a complete inventory of all regional markers and not a claim of independent Xbox coordinate verification. Quests without a sourced pin have no invented NPC marker. Selected-quest-area controls use mapped stops assigned to that hub; if none exist, the UI says so and shows the region.

Completed pins are hidden by default, with a show-completed filter. A guide-to-map deep link deliberately reveals and highlights its target even when filters would otherwise hide it. Changing filters or choosing Whole region clears that focus exception.
