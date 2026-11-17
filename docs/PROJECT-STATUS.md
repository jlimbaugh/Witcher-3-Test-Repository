# PHOENIX — project status (branch `investigation/wo-save-preservation`)

Last updated: 2026-11-16 (America/Chicago) by LT, in the commit that adds the D2 investigation (`qa/wo-save-preservation/`).
This branch is QA5 (`5ba73ace7d05551c877021de6e6fd0a2242a1e3a`) plus that investigation; `dist/` is unchanged from QA5.

| Item | State |
|---|---|
| Accepted / live build | **v45** = Sites commit `a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820`. In this repo: snapshot commit `d1df0e3e2c40cad172577f4725daa7233fc8c41e` (snapshot import, not original history; `docs/PROVENANCE.md`). |
| Candidate | **Slice 2 QA5** (The Nilfgaardian Connection on the White Orchard template + app.js cache-tag fix) = commit `5ba73ace7d05551c877021de6e6fd0a2242a1e3a` (`recovery/v45-qa5`). Not deployed, not published. D2 and D4 below are open against it. |
| Deployment | **On hold.** No deployment without Cmdr's release decision. |
| Pyres / Mercy | Incomplete at objective level; separate slice after iPhone verification of this release. |

## Blockers before release
1. **Independent review of QA5** by Cmdr (cache fix, save handling, rollback). §11 of `docs/SLICE2-REVIEW.md` is LT's self-review (author-supplied evidence).
2. **White Orchard save overwrite (D2) — reproduced, correction pending Cmdr's assignment.** Investigation:
   `qa/wo-save-preservation/REPORT.md` (evidence: `author-supplied`, LT probe, 80 runs, Chrome headless, 390×844 and 844×390).
   Any unusable `phoenix.whiteorchard.interaction.v1` record (invalid JSON, non-object, missing/unsupported `version`) or a
   read that throws is overwritten with defaults on the **first page load** by `persist()` (`dist/app.js:91` via `render()`
   `:319`), while the page says "Progress and your place save in this browser." Also fails on baseline: **yes** (identical;
   `app.js` lines 1–373 are the same in both commits, so live v45 is affected too — not reproduced live). Write failures are
   handled correctly. Proposed smallest correction (guard `persist()` like the Velen QA3 guard, distinct "blocked" message,
   cache-tag bump) and acceptance checks are in the report; **not implemented**. The Velen equivalent (D1) stays fixed in
   QA5 (`dist/velen-r18.js`; re-confirmed: unreadable Velen bytes kept, 0 writes).
   **New: D4 (QA5 only, also fails on baseline: no)** — when `window.localStorage` access throws, `dist/velen-r18.js:19`
   throws during start-up (`dist/app.js:380`), the initial render never runs and the start page is blank. For Cmdr's QA5 review.
3. **Deployment mapping unknown.** The live chatgpt.site build is not deployed from GitHub; who deploys it and from where is not established (`.openai/hosting.json` names Sites project `appgprj_6af75db3b8bc819182017faf96cfe082`, directory `dist`). GitHub Pages still serves the old R19 build from `main` (audit D3).
4. Physical iPhone/Safari acceptance (owner) after deployment verification.

## Not yet in place
- No GitHub Actions test workflow exists (Cmdr will prepare one after inspecting this layout). Do not describe automation as active until it exists.
