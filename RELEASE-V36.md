# Phoenix v36 — objective pointer and focus treatment

Owner requested removal of the blue focus rectangle around the objective selection rail and a larger, artfully inspired pointer. Replace the plain triangle with original silver SVG scrollwork and a faceted spearhead, 144x64 CSS pixels, centered above the cards. Extra spacing keeps its point clear of objective content. The SVG is decorative and cannot intercept taps. Native rail outlines are suppressed; keyboard focus subtly brightens the existing outer frame, with individual button and checkbox focus retained.

Progress counts, saves, objective behavior, warnings, and compass remain unchanged. VoiceOver permanently parked.

Base/rollback: v35, dbf3169eb06a6dc5299a3837fc19069cea0a3579.

Verification: 163/163 checks pass. Rendered 390x844 preview confirms rail outline-style:none and decorative SVG pointer 144x64, with objective completion unchanged.
