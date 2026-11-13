# Phoenix R16 — console rollout

Approved scope: publish to GitHub `jlimbaugh/Witcher-3-Test-Repository`, production branch `main`, Pages root. Preserve repository permissions, other repositories, and saved progress keys.

## Delivered

Console order: stone header, regional scene, Continue, thirteen quest cards, selected quest scroll, **At this stop**, **Explore the guide**. Two illustrated contextual tiles precede four permanent illustrated shortcuts, in separate curled-parchment groups. Card changes update the description and links; progress reads the existing guide completion display. No separate console progress store.

Smaller Gwent-format cards retain the reviewed illustrations and silver frames. New resizable photographic vellum has curls, fibers, creases, stains, deckled edges and thistle marginalia. New Fondamento calligraphy is the initial reading default; existing saved font choices remain respected, with Alegreya and IM Fell available. Illustrations remain separate from real HTML text and controls.

Existing R10–R15 reviewed runtime files are promoted with R16 because GitHub main was still at R9 (`4015ef2613adcdc435b96da830f2fbcb0fa4e475`). Historical root files are preserved by building on the existing Git tree. Runtime deployment maps `dist/` to GitHub root; private hosting configuration and source PNGs are excluded from the public runtime.

## Verification

- Node progression suite: 29/29 pass, including legacy completion preservation, departure semantics, correction cascades, manual failure and optional objective cases.
- JavaScript syntax checks on changed scripts pass.
- Chromium phone-sized frames: 390/390 and 320/320 document width; six tiles remain two columns. Contextual group is above permanent shortcuts.
- Card cycling changes selected title, description, quest destination and permanent hub destination.
- Selected quest walkthrough opens and resumes its saved stage; Continue retains its existing saved destination.
- Nearby opportunities opens the selected quest's permanent hub. Internal map opens with 64 guide-linked markers. Merchant section and regional constellation open.
- Reading-font change to Alegreya and back to Calligraphy updates console text.

## Remaining acceptance and improvement work

- Real iPhone Safari, VoiceOver, physical swipe/pinch, and migrated-progress browser flows have not been newly tested in R16. Automated engine coverage does not replace these checks.
- Formal contrast/large-text acceptance remains due, especially decorative labels over artwork and long titles at 320 px.
- The new scroll material is generated UI art; existing official and generated illustrations retain the source credits in ART-SOURCES.md. Final source-rights review remains open.
- White Orchard is the populated pilot; other regional constellation clusters remain planned, not full-game data.
- Nearby opportunities uses regional terrain art; a dedicated contextual location vignette and richer wax/metal details can improve fidelity to the approved concept. Function and navigation are live.
- This is a console rollout. Other page templates retain the R15 look; they have not all received the new curled parchment.
