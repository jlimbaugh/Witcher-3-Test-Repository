# Native White Orchard map — R5

Baseline: 520281e. Replaces the external-map navigation compromise with an interactive map served entirely by the guide repository.

## Delivered

- Extracted in-game White Orchard terrain, locally hosted as a 2560×2048 WebP; original marker PNGs; original geography retained.
- Local Leaflet 1.9.4, pan/zoom, whole-region fit, expanded-map view, type filter, quest/location search, selected-quest mapped-area jump, show/hide completed and an accessible marker list.
- Twelve sourced pins: six Places of Power, two Viper diagrams, forge, scholar, Tomira and notice board. Eight noninteractive landmark labels aid orientation.
- Each pin opens its assigned existing quest hub and task row. Completion remains controlled only in the hub. Both Viper diagram pins share the existing Viper quest completion record.
- Content-page map links focus their mapped task or mapped stops in its home hub. Missing positions are acknowledged rather than invented. Explicit location deep links reveal their target even if completion/filter settings would normally hide it.
- Map filters and view save in the existing browser save; prior completion IDs and walkthrough state remain intact.
- Credits, dataset adaptation licence, asset provenance and Leaflet licence are included. See MAP-SOURCES.md and LEAFLET-LICENSE.txt.

## Checks performed

JavaScript syntax; all pin coordinates finite/in bounds; every pin references an existing task; map image load; zoom buttons; mouse drag panning; marker-type and name filters; quest-name search; selected-area jump; reload preserves filters; Cemetery pin → exact home/task; completion hidden/revealed; completed location deep-link focus; Forge pin keyboard Enter → correct home/task after a keyboard fix.

At a 390×844 CSS viewport inside Chromium, the expanded map rendered all 12 pins and the page had no horizontal overflow (375px client and scroll widths). The map occupied 355×428px and the whole-region image fit its width. No runtime errors from the preview origin were observed.

## Remaining acceptance

Real iPhone Safari, native touch pinch/drag, assistive technology and Xbox position verification are not certified by these checks. This first map covers guide-linked stops, not every regional map marker. Further markers require a verified position, an assigned hub and content before being added.
