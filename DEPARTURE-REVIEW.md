# White Orchard departure review

Baseline: 23c1dd1e372d26f938d0155b7c4d0246706d5fa7. A&D artwork accepted by CaptDrunk. The approved questionnaire calls for permanent console access and walkthrough-step access, risks first, collapsed optional activities, unrecorded quests labeled for in-game verification, nonblocking warnings at the departure step, and verified returnable locations labeled separately.

The existing departure-check view is extended rather than creating another canonical task. It reads the same saved quest objectives and acquisition records. It does not infer that unrecorded tasks are unfinished, does not mark completion on opening, and does not add a departure confirmation gate. Existing progress-update confirmations remain unchanged.

Three existing cutoff quests are retained: Twisted Firestarter, Missing in Action and On Death's Bed. Complete them before speaking to Vesemir at the inn after the hunt. The crystal skull is separated as an earlier missable: collect before completing The Beast of White Orchard. A recorded earlier cutoff asks for in-game verification rather than automatically marking the item missed.

Links are added using canonical task view IDs, including the existing quest-lilac alias. Relevant steps are Lilac and Gooseberries stage 4 and Incident at White Orchard stages 1–2. One grouped risk message links to the review. Acknowledgement does not mark progress. Resolved or invalidated departure messages are pruned from the queue and history without clearing unrelated messages. Existing menu/Undo deferral is preserved. The review can return to the originating page and scroll position.

Optional exploration and diagram lists use shared entry links, with no duplicate completion controls or overall progress totals. Returnable-site labels are limited to reviewed exploration types and fixed diagram sites. Merchant stock, service access and other unverified availability are labeled separately.

Source checks: Witcher Wiki secondary-quest cutoff table and Twisted Firestarter entry; GameBanshee Lilac and Gooseberries and the previously sourced crystal-skull entry; White Orchard activity returnability checklist. Sources are linked inside the review. No story consequences are revealed.

Validation: 86 automated checks; fresh-state warning at the correct walkthrough step; acknowledgement; single console entry and one link per relevant step; risk-first review; optional list collapsed; exact walkthrough return; 375px content width without horizontal overflow. Browser QA caught and resolved a legacy view alias and duplicate initialization. Art, completion IDs and saved-record schema are unchanged. iPhone field acceptance is pending.
