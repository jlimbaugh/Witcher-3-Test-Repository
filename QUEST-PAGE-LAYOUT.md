# White Orchard quest hub and walkthrough standard

Baseline: 573006b47ee294b4677a556f8d3caa87603989dd. CaptDrunk approved the side-by-side quest-flow mockup and the following questionnaire decisions. This is the implementation target for all 13 White Orchard quests.

## Quest hub

Quest cards continue to open the quest hub. Lead with a compact illustrated briefing, suggested level, short introduction and relevant warning. One prominent Start/Continue button opens the saved reading stage and names it; it never infers a reading stage from objective completion. A single Map / Quest cards / Region row follows.

The quest-progress panel starts collapsed. Nearby activities are grouped in swipeable illustrated decks, each linking to its canonical shared entry. Quest cards inside a cluster open their own hubs. Diagrams retain their distinct item artwork. Completed nearby cards move into a reopenable Completed deck. Failed and unavailable tasks remain clearly labeled among unfinished entries. Blocked prerequisites are respected.

## Walkthrough

Use a compact illustrated title, one Previous / step selector / Next navigator, current guidance and relevant warnings. Consequences remain behind spoiler controls. A compact Return to hub / Map row follows the guidance. Quest objectives are open beneath it; small objective arrows supplement swiping. Objective search, corrections, preparation, acquisition references and sources stay expandable.

The same objective panel moves between the active hub and walkthrough. This retains one canonical set of IDs, event handlers and saved records. The hub starts closed and walkthrough starts open; deliberate disclosure choices are retained during navigation. Browsing steps never marks objectives complete. Existing confirmation, choice handling, correction and Undo remain with the progress engine.

## Navigation and presentation

Preserve accepted quest images and steel/parchment styling. Remove duplicated step indexes, detached progress-update buttons and scattered shortcut rows. The special Devil by the Well reading panel adopts the common parchment structure while retaining its quest artwork. Treasure-hunt walkthroughs use the same layout, with their acquisition reference article collapsed separately.

Keep Message history in the wolf menu while reading a hub or walkthrough. Closing history returns focus to the wolf. Keep Constellation in the wolf. Return from shared diagram entries restores the originating hub, page scroll, horizontal decks and Completed disclosure. No saved-record schema changes.

## Validation

Browser QA at 375px content width: compact hub briefing; hub progress initially closed; Continue resumes the saved step; walkthrough progress initially open; one canonical objective mark visible from both screens; Undo from hub; acquisition card moves into Completed and returns after Undo; shared diagram return restores horizontal position (193px before and after); quest-card chooser Open action still points to the hub. Treasure-hunt guidance remains visible without a nested walkthrough wrapper. All 13 objective panels remain unique. All 87 automated checks pass. Browser audit confirms 13 hub panels, 13 walkthroughs, 13 unique canonical progress panels and no duplicate step navigators. Phone field acceptance remains pending. Other reported but unspecified issues remain parked.


## Approved parchment refinement — 14 November 2026

Use White Orchard's existing `curled-vellum-r16.webp` material for shared reading panels. Preserve the approved deck artwork, registry, silver frames, and card styles. Hubs separate the compact illustrated banner, briefing scroll, and nearby activity decks on the regional backdrop. Briefing scroll contains introduction, applicable risks, Continue, tools, collapsed preparation, and quest progress. Walkthrough scroll leads with current step guidance, then one Previous / selector / Next row; preparation and canonical quest progress follow as ink-divided sections. Return to hub and Map sit outside the reading scroll. The same preparation element and progress panel move between hub and walkthrough; no duplicated controls or saved records. General reading panels share this parchment default; maps, cards, navigation chrome and Constellation retain their own surfaces.

Validation: 87 existing automated checks passed; phone-width browser inspection confirmed no horizontal page overflow, 13 unique progress panels and 13 preparation sections; hub Continue, walkthrough Next, and shared preparation/progress placement worked. Existing card art files and registries unchanged. User field acceptance pending.


### Parchment control emphasis
User field feedback: plain ink disclosures blended with body text. Expandable sections now have double-ink outlines, a lightly shaded parchment face, and slate/silver embossed plus/minus markers. Objective labels have an outlined stamp-box treatment and a clear checked state. Native details and checkbox semantics, keyboard controls, records, and click handlers remain unchanged. Risk red remains reserved for warnings.

Phone-width browser checks passed: outlined preparation opens/closes; native objective confirmation commits the selected objective; checked stamp state is visible and durable Undo restores the previous mark. Page width remains within the viewport. Decorative plus/minus symbols do not duplicate accessible names. Card imagery, shared paper asset and progress logic are unchanged.


Shared rollout: moved the approved control rules into `dist/parchment-controls.css` and expanded them by parchment material scope, leaving card artwork and state handlers unchanged. Phone-width browser checks verified Progress toggle behavior, diagram acquisition control styling, source disclosure keyboard activation and no horizontal page overflow. Temporary QA page removed before packaging.
