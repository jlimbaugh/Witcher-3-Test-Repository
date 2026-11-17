# Home visual restoration and wolf navigation — QA 02

13 November 2026. Application baseline: 9b68fdd7da88184329fd18bc8a8d3b4a7c0c7da9.
Working branch: phoenix-white-orchard-completion. Capt accepted the other Home behavior and authorized these visual corrections with “Correct, proceed.”

## Changes

- Phone header hides the four duplicate destination links only after the medallion is initialized. PHOENIX, reading font and appearance controls remain. Desktop retains its navigation; without JavaScript the original header links remain.
- Selected quest, HUD and field-kit sections reuse the approved R16 curled vellum. Selected-quest action buttons restore illustrated art and R15 silver frames. The compact horizontal kit uses the existing map, merchant and quest artwork; unavailable systems remain honest noninteractive tiles. Previous/Next kit controls provide keyboard access alongside native scrolling.
- The pendant uses a new original code-native silver-wolf SVG with eye glow and a short warning hum. It is fan-interface art, not an extracted or official CDPR medallion; provenance is recorded in ART-SOURCES.md. No haptics or audio are required.
- Four illustrated Gwent-inspired cards fan above the pendant: Home, Quests, Regions, Constellation. Labels remain HTML and controls remain native buttons. Card bounds were adjusted after observing clipping at phone width.
- During Undo or warnings, a separate Navigation button keeps all four routes accessible. Opening navigation neither executes Undo nor acknowledges a warning. The warning's wolf button closes its fan before focusing acknowledgement. FIFO and the single canonical Undo handler remain intact.
- Existing 3000ms Undo visibility and 900ms fade remain; reduced motion skips animated treatments. Status text now reflects expiration or durable Undo rather than continuing to announce a stale quick-Undo offer.
- Mobile quest-card controls reserve horizontal space beside the pendant. Header font selector shows its full chosen label. Versioned Home asset URLs avoid stale preview resources.

## Executed checks

- node --check home-ui.js, medallion.js and home-candidate.test.cjs, each checked separately: pass.
- node progression.test.cjs: 29/29 pass.
- node home-candidate.test.cjs: 25/25 pass. Four additional tests cover warning-mode navigation, navigation during Undo without consuming it, illustrated scaffold, and focus on returning from navigation to warning acknowledgement. The existing controlled DOM/timer harness executes the real module, not a browser engine.
- Chromium desktop: selected information remains, restored parchment/illustrated actions visible, HUD expands, four fan destinations and Escape dismissal work.
- Chromium 390px iframe (375px content plus scrollbar): compact header, restored scroll sections, kit Previous/Next scrolling, all four fan cards within content width. Measured card bounds: approximately 17–355px within 375px. Page scrollWidth equals clientWidth.
- Mobile quest Next button measured right edge 270px; pendant left edge 275px at the sampled viewport position, with no overlap.
- Real fan Quests navigation works with phone header destinations hidden. A reversible test activity mark showed both quick Undo and separate Navigation; canonical toast Undo restored the original unchecked mark.
- Day/night rendering of the restored mobile journal remains readable. No quest, progression, map data, saved keys or Velen edits were made.

## Limits and release disposition

Physical iPhone Safari, VoiceOver, hardware touch and on-device motion remain Capt's field acceptance. Warning navigation/focus and reduced-motion semantics have behavioral tests; no claim of exhaustive browser accessibility or game accuracy is made. This does not complete White Orchard content or build the parked constellation/NPC concepts. The wolf drawing and fan presentation remain subject to visual acceptance.

Apply complete files atomically to the working branch and preserve main. Update only the existing owner-private review Site, with its audience unchanged. The screenshot evidence is from the exact local application sources used for this revision; Git blob verification must confirm remote content before handoff.
