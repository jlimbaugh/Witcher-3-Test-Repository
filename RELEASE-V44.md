# Phoenix v44 — warning alerts and takeover

Baseline / rollback: v43, 9adc49549de6f8ab8a630bdee23af22e6b511cd3.

Alert queue now flashes the existing wolf without automatically rendering an alert popup. Tapping a flashing wolf acknowledges all currently valid queued alerts and opens full-screen Warnings. Acknowledgement saves alert history only; it does not complete or resolve game risks. Old history access uses the same takeover. Normal destination navigation retains its accepted popup form.

Warnings retains canonical unresolved risks, unknown verification guidance, consequences and cutoff wording. It adds distinct open/unknown counts and links to existing quest objective progress or activity completion owners. Shared full-detail overlays remain contextual, explicitly opened controls.

Wolf and Return restore the source page/step/reader position. A correction trip returns to the saved Warnings list position. Same-quest correction restores prior foldouts and objective rail position; reopening is deferred beyond the originating click so outside-click dismissal cannot close it again. No quest data, objective rail design, save schema or appearance settings changed.

Checks: 206/206 Node tests; JS syntax and whitespace checks. Chromium rendered 390x844 and 844x390: no automatic alert popup; wolf opens takeover; cross-quest correction, same-quest correction, and Return; source reader 782 -> 782; warning list restored at its saved position. Ordinary navigation remains a popup. Physical iPhone Safari acceptance pending. VoiceOver, readability mode and scale slider remain parked.
