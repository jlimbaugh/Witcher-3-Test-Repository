# PHOENIX — project status (branch `recovery/v45-qa5`)

Last updated: 2026-11-16 (America/Chicago) by LT, in the commit that adds QA5 to this branch.

| Item | State |
|---|---|
| Accepted / live build | **v45** = Sites commit `a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820`. In this repo: snapshot commit `d1df0e3e2c40cad172577f4725daa7233fc8c41e` (snapshot import, not original history; `docs/PROVENANCE.md`). |
| Candidate | **Slice 2 QA5** (The Nilfgaardian Connection on the White Orchard template + app.js cache-tag fix) = the commit that adds this file. Not deployed, not published. |
| Deployment | **On hold.** No deployment without Cmdr's release decision. |
| Pyres / Mercy | Incomplete at objective level; separate slice after iPhone verification of this release. |

## Blockers before release
1. **Independent review of QA5** by Cmdr (cache fix, save handling, rollback). §11 of `docs/SLICE2-REVIEW.md` is LT's self-review (author-supplied evidence).
2. **White Orchard save-overwrite investigation** (audit finding D2: `persist()` can write blank progress after a failed read, `dist/app.js`). Source-inspection only so far; not yet reproduced against the complete application. The Velen equivalent (D1) is fixed by the QA4 save guard in `dist/velen-r18.js`.
3. **Deployment mapping unknown.** The live chatgpt.site build is not deployed from GitHub; who deploys it and from where is not established (`.openai/hosting.json` names Sites project `appgprj_6af75db3b8bc819182017faf96cfe082`, directory `dist`). GitHub Pages still serves the old R19 build from `main` (audit D3).
4. Physical iPhone/Safari acceptance (owner) after deployment verification.

## Not yet in place
- No GitHub Actions test workflow exists (Cmdr will prepare one after inspecting this layout). Do not describe automation as active until it exists.
