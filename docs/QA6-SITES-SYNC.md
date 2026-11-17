# QA6 Sites synchronization — local preparation only

Prepared and independently compared by Cmdr on November 17, 2026.

| Identity | Commit / value |
|---|---|
| Reviewed GitHub source | 4908befb43971e55497f3625faeac9bdb86aa952 |
| QA6 application origin | 804a3a2c83529fdc707ca5278fb3bcf39d50d771 |
| Actual fetched Sites main / local parent | a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820 |
| Prepared local Sites commit (not pushed) | 0ac86e3e5932d1b37da1dcd7ab0899407e2a1438 |
| Matching dist tree in both repositories | 3095f23715fb56093937d72009691d624ff7d011 |
| Files verified | 489; zero blob or Git mode differences |
| Hosting project | appgprj_6af75db3b8bc819182017faf96cfe082 |
| Hosting directory | dist |

## Evidence and scope

The actual Sites repository was cloned using a temporary credential held only in session memory. It contained the expected v45 commit and complete 48-commit history, with main exactly at that commit. Its working checkout was clean before preparation. No credential was stored in the checkout or included in this report.

All 13 changed/new dist files were fetched from the exact GitHub commit, validated against GitHub blob IDs, and staged on a local branch based on the actual Sites main. Every staged dist blob and mode was compared with the full GitHub dist tree: zero differences. Both dist trees have the same Git tree ID above. .openai/hosting.json is unchanged. No GitHub history was substituted for Sites history.

The sibling qa6-sites-sync.diff is the complete actual Sites parent-to-prepared-commit diff: 13 text files, 5 modified and 8 added; no binary changes or deletions. Its application content matches the reviewed GitHub changes. Only dist is synchronized; GitHub remains the review/CI/project-record repository.

No push to Sites, save-version, deployment packaging, publication, or audience change has occurred. The local Sites commit is not remotely accessible yet; LT reviews the complete diff and shared tree identity through this PR. No full Sites access is claimed for LT.

## Remaining release procedure

1. LT reviews this mapping and diff. Integrate this report only after review; rerun the existing gate on the combined GitHub commit. Application, rollback, and release-manifest pins remain unchanged.
2. Immediately before any Sites push, obtain a fresh credential without automatic publication and re-fetch its actual main. If it has moved from the parent above, stop and reconcile; do not overwrite changes or force-push.
3. Recheck GitHub dist tree and local Sites dist tree. GitHub docs-only integration changes the GitHub source commit, but must not change the dist tree above. Record that final GitHub commit and the actual Sites commit separately.
4. After explicit authorization for source synchronization, push the prepared history-preserving Sites commit using the supported Sites source workflow. If the helper makes an additional commit, verify its complete deployed dist tree and record the returned SHA; never deploy under an assumed SHA.
5. Before publication, use a release identity record that associates the final GitHub commit, Sites source commit, release label QA6, dist tree, and saved Sites version/deployment IDs. The existing BUILD-REVISION.txt is historical and must not be claimed to name QA6. Any change to dist to add a visible build ID requires its own reviewed manifest/pin update; it is not silently included here.
6. Package only the exact pushed source with .openai/hosting.json and its declared dist output. Save/deploy only after Cmdr's release decision and the owner's authorization; preserve the existing public audience and URL.
7. Verify the returned deployment, served asset tags, and file hashes without seeding damaged data on the owner's live origin. Then run focused physical Safari acceptance. Keep the existing v45 saved version available as recovery; code rollback does not reverse storage changes automatically.

## Access model

LT has GitHub read/write access for implementation and review. Sites authentication belongs to an authorized ChatGPT Sites session and cannot be granted to a session lacking that capability by sharing GitHub permissions. Do not share credentials. Cmdr performs Sites transport; all reviewable source, differences, and mappings belong in GitHub. If Cmdr's executor is unavailable, source transport is blocked until an authorized Sites-capable session can execute it; GitHub work can continue.
