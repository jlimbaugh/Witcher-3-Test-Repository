# Velen Arrival Pilot — R18

Baseline: accepted White Orchard R17 (5093d59). This pilot is independent of White Orchard progression and uses browser key `phoenix.velen.arrival.v1`.

## Content and ownership

The Nilfgaardian Connection is one permanent quest owner with four walkthrough stages: Arrival, Road, The Inn, Heatherton. Funeral Pyres and At the Mercy of Strangers retain separate owner hubs. Locations are context tags, not completion owners. Only explicit owner-hub confirmation records completion. Viewing stages and recording optional decisions never completes a quest.

The pilot ends after Hendrik’s notes. Bloody Baron and Hunting a Witch have next-lead summaries only. The full branches, Velen map and constellation are not implemented in this pass. Counts describe three pilot activities, not all Velen content.

## Research references

- Main quest: https://www.gamebanshee.com/thewitcher3/walkthrough/thenilfgaardianconnection.php
- Main quest cross-check: https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/walkthrough/velen/the-niflgaardian-connection
- Funeral Pyres: https://www.gamebanshee.com/thewitcher3/walkthrough/funeralpyres.php
- John Verdun encounter: https://witcher.fandom.com/wiki/At_the_Mercy_of_Strangers
- Regional visual reference: https://archive.org/details/the-witcher-3-wild-hunt-artbook

Exact scaled rewards are omitted. John Verdun has no invented suggested level. His danger warning belongs to the encounter, not a regional timer. The inn dialogue affects the later Crow’s Perch approach without blocking the main story. Consequential outcome text stays in spoiler disclosures. Missing Brother (33) is deferred; Lornruk is deferred. Wild at Heart is not called too high-level. Innkeeper card stock, named Gwent reward and prerequisites remain unverified.

## Artwork provenance and limitations

`velen-landscape-r18.webp`, `velen-pyres-r18.webp`, and `velen-mercy-r18.webp` are generated concept illustrations made for this test build, not official CDPR screenshots or artbook reproductions. The approved mockup informed their material treatment. Original PNGs are retained in the private source repository under source-assets; production uses compressed WebP derivatives (approximately 551 KB combined).

Art briefs: war-scarred northern Velen landscape with gallows and distant settlement; priest beside battlefield funeral pyres; bound man at a muddy riverbank. Weathered timber, iron, muted countryside and worn parchment unify the console. Landscape composition is illustrative and is not a geographic map. Next-lead tiles reuse regional art with focal crops; Heatherton lacks a dedicated frost illustration. Official final quest-specific assets remain unselected and their reuse terms unconfirmed. The pre-existing merchant tile retains its existing shared asset credit.

`velen-timber-r18.svg` is original code-native interface texture. Existing parchment, silver frames and local fonts are reused from the accepted guide.

## Verification limits

Automated model tests and Chromium desktop / narrow iframe layout checks are available. Real iPhone Safari, VoiceOver, physical swipe discrimination, Xbox field accuracy, blocked-storage browser acceptance and exhaustive history sequences remain pending. Browser-local storage does not sync across devices or hosts. This separate pilot currently stores a binary resolved mark rather than the White Orchard objective-dependency engine; future region integration must preserve both save formats explicitly.
