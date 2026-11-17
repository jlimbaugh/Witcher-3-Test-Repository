# QA6 publication record

Published November 17, 2026 by Cmdr after explicit owner approval.

| Identity | Value |
|---|---|
| GitHub reviewed release | 7c9bc102a0089814e792390b4b8d57edd97bc1b9 |
| QA6 original application commit | 804a3a2c83529fdc707ca5278fb3bcf39d50d771 |
| Sites source commit | 0ac86e3e5932d1b37da1dcd7ab0899407e2a1438 |
| Sites source parent | a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820 |
| Exact dist tree in both sources | 3095f23715fb56093937d72009691d624ff7d011 |
| Saved Sites version | 46 |
| Saved version ID | appgprj_6af75db3b8bc819182017faf96cfe082~appgver_dd2d0d6c70448191b750133a0da118c4 |
| Deployment ID | appgdep_6afc9d9b2a4481918c3377e752e9250d |
| Deployment result | succeeded, 2026-11-17T18:32:06.523732Z |
| URL | https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site |
| Audience | public, unchanged |

## Verification

- Before push, actual Sites main was rechecked at the exact v45 parent. Normal fast-forward push succeeded; remote main was rechecked at the prepared commit. No force-push.
- Publication archive held .openai/hosting.json plus all 489 dist files. Every file byte and executable mode matched the prepared source before upload.
- Local tar hash: c970c97d3c0fd071592bb021b952fffeacd7db1a9efd26f667e40d7307a44a35. Sites stores its own archive representation with hash 66ce9fd929581e9860753c726722b51aa7befcf493cd4c9b687a588801519312 and 490 files; these are distinct archive representations, not a claim of equal tar bytes.
- Native Sites publication returned success for the saved version/source above. No extra deployment or rollback was started.
- Final GitHub run 44148406839 passed exact 233/271/307 totals, zero skips, manifests and both rollback checks.
- LT's browser matrix and returning-browser runs remain author-supplied. Physical Safari, live edge behavior, touch and VoiceOver remain untested.
- Independent raw HTTP asset verification could not complete: requests were blocked (403) or timed out, and the web reader could not access the site. No served hash mismatch or app malfunction was established by those failures. Do not claim that served assets or live navigation have been independently verified.

## Next acceptance

Open the canonical URL on iPhone Safari without clearing site data. Verify Home renders, enter Velen and The Nilfgaardian Connection hub, expand Quest progress, mark one objective, reload and return to confirm persistence. Use Undo if the test mark does not reflect actual game progress. Check previous Pyres/Mercy completion remains. Report the exact screen and observed behavior for defects.

Recovery remains saved version 45 under the reviewed procedure in QA6-SITES-SYNC.md. It reintroduces known unreadable-save overwrite behavior and may not display newer canonical Nilfgaardian progress. Do not delete browser records or assume code rollback reverses migrations.

GitHub main and Pages remain unchanged. The old Pages Velen route remains a separate retirement task. BUILD-REVISION.txt and the site title are historical labels; the actual deployment identity is this record plus the native saved-version source, not the hostname or title.
