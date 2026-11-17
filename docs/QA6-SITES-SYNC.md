# QA6 Sites synchronization: local preparation only

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

## Sites-checkout evidence (Cmdr executed; not independently executed by LT)

Collected from the actual source checkout on November 17, 2026 using git rev-parse, git show, git rev-list, git diff --stat, and git show for hosting.json. These are Cmdr-executed source observations, not claims that LT has inspected the Sites objects.

| Observation | Exact result |
|---|---|
| v45 full repository tree | 5835717e1440e01369700a1670d4a450525ffd79 |
| v45 dist tree | d9affb25748fab360a962ffb141543bb5e336761 |
| v45 reachable commit count | 48 |
| Prepared full repository tree | 41eea51851ecb017dae288791bda390b5597ccf1 |
| Prepared dist tree | 3095f23715fb56093937d72009691d624ff7d011 |
| Prepared reachable commit count | 49 |
| Prepared commit parent | a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820 |
| Prepared subject | Prepare reviewed QA6 from GitHub 4908befb without deployment |
| hosting.json blob at parent AND prepared commit | 028a42c5b75736b6c3352e7e9442c31b7140e5c5 |

The v45 dist tree equals LT's expected GitHub snapshot tree. The prepared commit's parent is the actual Sites v45 main; its subject explicitly identifies the reviewed GitHub source.

Whole-repository diff stat (not limited by a path filter):

```text
 dist/app.js                          |  40 ++-
 dist/home-candidate.test.cjs         |   2 +-
 dist/index.html                      |   2 +-
 dist/slice2-cache-tags.test.cjs      | 153 ++++++++
 dist/slice2-nilf.test.cjs            | 322 +++++++++++++++++
 dist/slice2-save-guard.test.cjs      |  78 ++++
 dist/storage-denied-startup.test.cjs |  52 +++
 dist/velen-nilf-objectives.js        |  41 +++
 dist/velen-nilf-progress.js          | 145 ++++++++
 dist/velen-nilf-ui.js                | 676 +++++++++++++++++++++++++++++++++++
 dist/velen-r18.js                    |  32 +-
 dist/velen-view.css                  |   4 +
 dist/wo-save-guard.test.cjs          | 167 +++++++++
 13 files changed, 1689 insertions(+), 25 deletions(-)
```

Unchanged hosting.json:

```json
{"project_id":"appgprj_6af75db3b8bc819182017faf96cfe082","static":{"directory":"dist"}}
```

## Rollback decision and exact restore action

**Decision owner:** Cmdr coordinates rollback; the owner may order it immediately. Publication authorization should include this contingency so restoration does not wait for another confirmation after a failed check. That authorization has not yet been requested or granted by this document.

**Triggers:** a wrong served build or asset hash, a reproducible new save-preservation failure, uncaught startup errors/blank view, broken critical Home/Velen/quest navigation, or failure to verify a healthy publication. A minor deferred content/layout issue alone does not automatically trigger rollback. A failing deployment attempt requires checking what actually became live before acting.

**On a failed post-deploy check:** stop further release changes; preserve the existing audience and URL; capture the failure without manipulating the owner's saved data; enact the authorized rollback. Do not reset localStorage or force-push source history.

**Known recovery target:** existing saved Sites version **45**, source a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820. Its archive was rechecked through Sites on November 17: archive-backed, 482 entries, SHA-256 2263c4a4784c10510084620d80ea6248acc8c37aef7e374853f0b5e65a432802.

When authorized, refresh the site's current access state and preserve its public audience. Call Sites deploy_site_version with exactly:

```json
{"project_id":"appgprj_6af75db3b8bc819182017faf96cfe082","version_id":"appgprj_6af75db3b8bc819182017faf96cfe082~appgver_7ede0a342b208191826fd1f84116b617"}
```

This republishes the existing archive-backed version; do not rebuild, re-save it, or substitute a deployment ID for the saved-version ID. If the returned deployment is pending/building/publishing, poll get_deployment_status with the returned deployment ID and the same project ID until terminal. Verify restored source/version, key assets, and critical navigation. If restoration fails, keep the release stopped and report the exact failed deployment; do not change audience to work around it.

This restore action does not rewind the Sites source branch or browser data. Record the active version and source-head divergence after rollback. Slice 2 canonical records may remain and must be preserved; v45 may ignore progress recorded only in the newer owner. Any data recovery uses separately reviewed guarded procedures, never blanket deletion.

**Known limitation:** v45 predates the D1/D2 save guards. Rolling back reintroduces those defects for unreadable records. Cmdr must weigh a reported regression against that loss of protection; a forward correction may be preferable. Do not describe v45 as free of known save risks.
