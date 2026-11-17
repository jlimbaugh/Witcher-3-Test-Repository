# Phoenix v43 — Velen shared shell

Baseline / rollback: accepted v42, e20367c593e78c35161ec46aa789420e456496a0.

Velen now renders inside the existing application shell, reusing wolf navigation, Search, warning controls, reader, appearance and visual components. Legacy velen.html deep links redirect to the corresponding shared route. Pointer/initial entry no longer forces heading focus. Deliberate keyboard navigation retains heading focus.

Existing three activities, authored content, completion/choice/Undo ownership and phoenix.velen.arrival.v1 storage are preserved. Canonical velen-data-r18.js is unchanged. Old Continue records normalize to the shared route. Hub returns use the shared reader coordinates; revisiting the same route through Search retains its DOM and expanded foldouts. Velen styles are scoped to its view.

Validation: 205/205 Node tests pass; syntax and diff whitespace checks pass. Rendered Chromium checks at 390 and 320 px: Home → Velen, legacy deep link, wolf open/close, hub → walkthrough → return (captured 284 px → restored 284 px), and Velen → Search → White Orchard result → Return to Search with original Velen step and open preparation foldout preserved. No completion marks were changed in browser checks.

Physical iPhone Safari entry/touch/layout acceptance remains pending. No verified Velen objective model was added. Broader Velen content/template alignment and continuous rail behavior remain subsequent bounded work. Slider, readability mode and VoiceOver remain parked.
