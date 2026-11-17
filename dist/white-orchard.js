'use strict';
window.PHOENIX_ROUTE = {
  "tasks": {
    "q-lilac": {
      "name": "Lilac and Gooseberries",
      "home": "hub-arrival",
      "view": "quest-q-lilac",
      "type": "quest",
      "intro": "War has scattered the trail. Follow Vesemir toward the first lead on Yennefer.",
      "why": "The main-story starting point; collect village leads before riding to the garrison.",
      "requirements": "Begins after the opening dream and tutorial. Follow the search through White Orchard; the griffin hunt is a separate quest within this route.",
      "reward": "Opening combat, the inn confrontation and the final departure award experience. Optional choices offer coin or food; see the reward breakdown.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/lilacandgooseberries.php",
        "https://www.witcher.tools/quests/lilac-and-gooseberries",
        "https://witcher.fandom.com/wiki/Crystal_skull"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Clear the camp and check the ground",
          "text": "Defeat the ghouls with your silver sword. Before following Vesemir, use Witcher Senses to inspect the opening campsite and collect the sparkling crystal skull.",
          "warning": "The optional crystal skull disappears after The Beast of White Orchard is completed. Collect it now if you want it.",
          "details": [
            {
              "title": "Combat and finding the skull",
              "paragraphs": [
                "Keep the ghouls in front of you, dodge their lunges, and use brief attacks rather than trading hits. Quen gives you room to recover from a mistake.",
                "After combat, search the ground around the campsite using Witcher Senses. Finding the skull and marking it acquired are separate from completing this reading step."
              ]
            }
          ],
          "detours": [
            {
              "task": "poi-4",
              "label": "Crystal skull · exact entry and location"
            }
          ]
        },
        {
          "id": "ford",
          "title": "Ride with Vesemir to the ford",
          "text": "Mount Roach and follow Vesemir along the road. After the merchant encounter, choose whether to accept his offered reward, then continue toward White Orchard’s inn.",
          "options": [
            "Accept the merchant’s reward.",
            "Refuse the reward."
          ],
          "spoiler": "Taking Bram’s payment gives 50 crowns. Refusing it lets you mention his recommendation to Elsa for four roasted chicken legs. Either option continues the search."
        },
        {
          "id": "2",
          "title": "Find the lead inside the inn",
          "text": "Ask Elsa about Yennefer, then speak to Gaunter O’Dimm inside the common room. His information points you toward the Nilfgaardian garrison.",
          "details": [
            {
              "title": "Optional conversations and Gwent",
              "paragraphs": [
                "You may also question the peasants or speak with the scholar, Aldert Geert. His introductory Gwent match is optional; take it here if you want to learn the rules.",
                "Check Elsa’s shop if you want supplies or cards. These are optional purchases, not prerequisites for the garrison lead."
              ]
            }
          ],
          "detours": [
            {
              "task": "gwent-start",
              "label": "Gwent introduction · existing shared entry"
            }
          ]
        },
        {
          "id": "brawl",
          "title": "Handle the confrontation outside",
          "text": "Leave the inn and deal with the men waiting outside. This encounter uses fists: keep the group in view, defend, and counter with short openings before setting off.",
          "options": [
            "Use the available Axii response.",
            "Choose another reply and face the confrontation."
          ],
          "spoiler": "The fight occurs either way. A successful Axii response removes one participant from the fight; the remaining men still need defeating.",
          "details": [
            {
              "title": "If the group crowds you",
              "paragraphs": [
                "Move away from the nearest attacker to keep space. Avoid backing into scenery, and do not chase one opponent while the others are behind you."
              ]
            }
          ],
          "detours": [
            {
              "task": "q-firestarter",
              "label": "Village detour · Twisted Firestarter"
            },
            {
              "task": "grindstone-village",
              "label": "Village grindstone · preparation stop"
            }
          ]
        },
        {
          "id": "3",
          "title": "Question the garrison commander",
          "text": "Travel northwest to the Nilfgaardian garrison. Speak to the guards, enter, and find the commander beside the quartermaster’s area. Ask about Yennefer to receive the griffin contract.",
          "details": [
            {
              "title": "Along the road",
              "paragraphs": [
                "Stay on the marked route if you want the direct approach. The riverbank pan errand and the roadside cargo request can be handled as optional stops; neither is needed to speak to the commander."
              ]
            }
          ],
          "detours": [
            {
              "task": "q-pan",
              "label": "Riverbank detour · A Frying Pan, Spick and Span"
            },
            {
              "task": "q-cargo",
              "label": "Roadside detour · Precious Cargo"
            }
          ]
        },
        {
          "id": "hunt",
          "title": "Complete the griffin investigation",
          "text": "Open The Beast of White Orchard for the herbalist, hunter, ambush and reward hand-in. Return to this route’s departure checkpoint after reporting the kill.",
          "links": [
            {
              "task": "q-beast",
              "label": "Continue with The Beast of White Orchard",
              "stage": "1"
            }
          ],
          "details": [
            {
              "title": "Reading position and quest progress",
              "paragraphs": [
                "The hunt has its own walkthrough and objective records. Opening it does not complete this quest or any hunt objectives. Record what you have actually done in the game."
              ]
            }
          ]
        },
        {
          "id": "4",
          "title": "Review the region before the inn",
          "text": "After the griffin hand-in, open the departure review. Finish the local quests you want, then use The Incident at White Orchard for the final inn sequence.",
          "warning": "Speaking to Vesemir at the inn after the griffin hand-in starts the departure sequence. Finish Missing in Action, Twisted Firestarter and On Death’s Bed beforehand; unfinished versions fail by Imperial Audience.",
          "links": [
            {
              "task": "departure-review",
              "label": "Open departure review"
            },
            {
              "task": "q-incident",
              "label": "Continue to the inn departure",
              "stage": "1"
            }
          ],
          "details": [
            {
              "title": "Returning later",
              "paragraphs": [
                "White Orchard can be revisited later, but returning does not restore failed quests. The departure review distinguishes confirmed cutoff risks from returnable locations."
              ]
            }
          ]
        }
      ],
      "level": 1,
      "map": true,
      "category": "main",
      "verification": "Route cross-checked against published walkthroughs on 14 November 2026. XP amounts are published reference values, not guaranteed payouts for every difficulty, level or edition. Xbox field confirmation remains open.",
      "startWarning": {
        "activity": "poi-4",
        "untilQuest": "q-beast",
        "text": "Optional missable: collect Yennefer’s crystal skull at the opening campsite before completing The Beast of White Orchard."
      },
      "rewardData": {
        "note": "Reference amounts for the ordinary opening route. Optional and mutually exclusive rewards are not added together as a guaranteed total.",
        "items": [
          [
            "Opening ghoul encounter",
            "250 XP · published reference value"
          ],
          [
            "Fistfight outside the inn",
            "350 XP · published reference value"
          ],
          [
            "End of the departure sequence",
            "150 XP · attributed to this quest; do not also count it as the inn fight reward"
          ]
        ],
        "choices": [
          [
            "Bram: accept payment",
            "50 crowns"
          ],
          [
            "Bram: refuse, then mention him to Elsa",
            "Four roasted chicken legs instead of the coin"
          ]
        ]
      }
    },
    "q-missing": {
      "name": "Missing in Action",
      "home": "hub-missing",
      "view": "quest-q-missing",
      "type": "quest",
      "intro": "A brother is missing among the battlefield dead. Dune needs someone who can search without becoming another casualty.",
      "why": "Pairs with the eastern battlefield approach and the nearby Cackler Bridge discovery.",
      "requirements": "Speak to Dune in the Ransacked Village; complete before the prologue departure.",
      "reward": "A resolved family search and quest experience.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/missinginaction.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Find Dune",
          "text": "Speak to Dune in the Ransacked Village, then meet him and Hussar by the battlefield."
        },
        {
          "id": "2",
          "title": "Search the shields",
          "text": "Clear the ghouls in the search area. Use Witcher Senses to inspect shields bearing the White Orchard flower. Let Hussar pick up the trail."
        },
        {
          "id": "3",
          "title": "Follow Hussar",
          "text": "Follow the dog to the shelter and inspect what it has found.",
          "spoiler": "Bastien survived with help from the Nilfgaardian Rhosyn. You can urge Dune to shelter both men or take only his brother. Choose before closing the conversation."
        }
      ],
      "level": null,
      "map": true,
      "category": "side"
    },
    "q-pan": {
      "name": "A Frying Pan, Spick and Span",
      "home": "hub-pan",
      "view": "quest-q-pan",
      "type": "quest",
      "intro": "A small household favor hides the traces of a much stranger night.",
      "why": "A short riverbank stop on the road toward the garrison; no planned fight.",
      "requirements": "Speak to the old woman outside the locked riverbank cottage.",
      "reward": "Food and a little experience.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/afryingpanspickandspan.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Hear the request",
          "text": "Speak to the old woman by the locked cottage and agree to recover her pan."
        },
        {
          "id": "2",
          "title": "Search the cottage",
          "text": "Break the door with Aard. Use Witcher Senses to examine the room and recover the pan. Check the containers before leaving."
        },
        {
          "id": "3",
          "title": "Return the pan",
          "text": "Hand the pan back to the woman.",
          "spoiler": "The corpse, burned papers and silver monocle hint at a secret meeting. Examining them adds context; the pan is the task’s objective."
        }
      ],
      "level": null,
      "map": true,
      "category": "side"
    },
    "q-cargo": {
      "name": "Precious Cargo",
      "home": "hub-cargo",
      "view": "quest-q-cargo",
      "type": "quest",
      "intro": "A stranded merchant asks for a small box. The wreck may tell a different story.",
      "why": "Investigate while making the garrison approach rather than riding back solely for this errand.",
      "requirements": "Speak to the roadside merchant near the garrison approach.",
      "reward": "Crowns; the resolution changes what you retain.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/preciouscargo.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Inspect the wreck",
          "text": "Accept the request. Follow the road and tracks with Witcher Senses; inspect the cart, horse and body in the marsh."
        },
        {
          "id": "2",
          "title": "Recover the box",
          "text": "Find the locked strongbox near the wreck. Return to the merchant with the evidence examined."
        },
        {
          "id": "3",
          "title": "Resolve the claim",
          "text": "Save before reporting back. Decide how to answer his account.",
          "warning": "If you challenge his story, be ready to mount Roach immediately for a pursuit.",
          "spoiler": "Handing over the box ends the job. Exposing the lie starts a chase; ride alongside and strike to stop him. Afterwards you can turn him in, release him with the medicine, or release him while keeping it."
        }
      ],
      "level": null,
      "map": true,
      "category": "side"
    },
    "q-death": {
      "name": "On Death’s Bed",
      "home": "hub-death",
      "view": "quest-q-death",
      "type": "quest",
      "intro": "Tomira is caring for a woman the griffin left dying. A witcher’s remedy carries its own uncertainty.",
      "why": "Handle during the herbalist lead; brewing Swallow also prepares your own supplies.",
      "requirements": "Begin the griffin investigation, then ask Tomira about Lena. Finish before departure.",
      "reward": "Crowns, alchemy supplies and a formula.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/ondeathsbed.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Ask Tomira",
          "text": "During the herbalist visit for the griffin hunt, ask about the injured woman and the possibility of using Swallow."
        },
        {
          "id": "2",
          "title": "Brew Swallow",
          "text": "Use the Alchemy menu: 1 dwarven spirit, 5 celandine and 1 drowner brain. Gather any missing ingredients before returning."
        },
        {
          "id": "3",
          "title": "Deliver through Tomira",
          "text": "Talk to Tomira to give the potion; do not try to use it directly on Lena.",
          "warning": "Complete the hand-in before the inn departure sequence.",
          "spoiler": "The quest closes without an immediate recovery. A later encounter in Velen can reveal the consequences; giving the potion is not a promise of a healthy recovery."
        }
      ],
      "level": 2,
      "map": true,
      "category": "side"
    },
    "q-devil": {
      "name": "Contract: Devil by the Well",
      "home": "hub-devil",
      "view": "quest-q-devil",
      "type": "quest",
      "intro": "A village needs its well. Something bound to the abandoned settlement will not let the living use it.",
      "why": "A compact early contract; pair its southern approach with the two southern Places of Power if ready.",
      "requirements": "Read the notice board and speak to Odolan. Prepare for a noonwraith.",
      "reward": "Contract payment and a noonwraith trophy.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/contract-devilbythewell.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Meet the client",
          "text": "Speak to Odolan and settle the fee before investigating the Abandoned Village."
        },
        {
          "id": "2",
          "title": "Identify the haunting",
          "text": "Inspect the burned ground and houses with Witcher Senses. Read the diary and the noonwraith Bestiary entry; examine the body at the well."
        },
        {
          "id": "3",
          "title": "Recover the bracelet",
          "text": "Jump into the well’s water. Retrieve the bracelet from the pool, then climb and swim through the exit passages."
        },
        {
          "id": "4",
          "title": "Prepare before burning",
          "text": "Repair your silver sword. Use Yrden, and Specter Oil if you can brew it.",
          "warning": "Burning the remains and bracelet summons the noonwraith. Prepare and save before interacting."
        },
        {
          "id": "5",
          "title": "Finish the contract",
          "text": "Fight in Yrden; clear its copies, loot the remains and report to Odolan.",
          "spoiler": "You may take the negotiated fee or refuse it for an amethyst. Tomira can provide additional context about the dead couple after her cottage becomes available."
        }
      ],
      "level": 2,
      "map": true,
      "category": "contract"
    },
    "q-beast": {
      "name": "The Beast of White Orchard",
      "home": "hub-hunt",
      "view": "quest-q-beast",
      "type": "quest",
      "intro": "The road to Yennefer runs through a griffin’s hunting ground. Learn what happened before setting the trap.",
      "why": "The main-story backbone for herbalist, hunter, equipment and northern discovery branches.",
      "requirements": "Speak to the Nilfgaardian commander during Lilac and Gooseberries.",
      "reward": "Vesemir supplies the crossbow. Loot the griffin trophy, then choose the commander’s payment. Conditional amounts are listed separately.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/thebeastofwhiteorchard.php",
        "https://guides4gamers.com/witcher-3-wild-hunt/quests/the-beast-of-white-orchard/",
        "https://www.gosunoob.com/witcher-3/the-beast-of-white-orchard/",
        "https://www.witcher.tools/quests/the-beast-of-white-orchard",
        "https://primagames.com/eguides/the-witcher-3-wild-hunt-eguide/appendices-and-compendiums/inventory/alchemic-creations-and-recipes/potions"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Take the griffin contract",
          "text": "Speak to the garrison commander during the search for Yennefer. Follow up on the herbalist and hunter leads; you can handle these two branches in either order.",
          "details": [
            {
              "title": "Plan the outing",
              "paragraphs": [
                "Tomira provides the buckthorn lead, while Mislav provides the patrol location. Finding the herb early can skip the herbalist objective in-game; do not mark a conversation complete unless it happened."
              ]
            }
          ]
        },
        {
          "id": "2",
          "title": "Visit Tomira",
          "text": "At Tomira’s cottage, ask where buckthorn grows. Her advice points you toward the riverbed. You can also ask about her patient before leaving.",
          "detours": [
            {
              "task": "q-death",
              "label": "At the cottage · On Death’s Bed"
            }
          ],
          "details": [
            {
              "title": "Optional patient quest",
              "paragraphs": [
                "On Death’s Bed is a separate quest with its own potion and hand-in. Open its entry for the instructions; the griffin quest does not require completing it."
              ]
            }
          ]
        },
        {
          "id": "river",
          "title": "Gather buckthorn underwater",
          "text": "Enter the marked river area, dive, and use Witcher Senses to find buckthorn on the riverbed. Pick it, then return to the surface.",
          "details": [
            {
              "title": "If you cannot find the plant",
              "paragraphs": [
                "Check that the buckthorn objective is tracked and search the bottom inside its marked area. Watch your breath meter and surface between searches; carrying the herb is what advances this branch."
              ]
            }
          ]
        },
        {
          "id": "3",
          "title": "Find Mislav and choose the dog detour",
          "text": "At the hunter’s house, knock and inspect the tracks with Witcher Senses. Follow them to Mislav, ask about the soldiers, and choose whether to help with the wild dogs.",
          "options": [
            "Help Mislav with the dogs.",
            "Say you are in a hurry and ask for the patrol site."
          ],
          "spoiler": "Helping and talking afterward provides additional experience and an optional personal story. Skipping the dogs still lets you continue the required investigation.",
          "details": [
            {
              "title": "If you help",
              "paragraphs": [
                "Follow Mislav to the pack, keep the dogs in front of you, and use your steel sword. Speak to him after combat before continuing."
              ]
            }
          ]
        },
        {
          "id": "patrol",
          "title": "Investigate the patrol site",
          "text": "Follow Mislav to the attack site. Examine the highlighted clues with Witcher Senses, then pick up the soldiers’ footprints leading away.",
          "details": [
            {
              "title": "If the objective does not advance",
              "paragraphs": [
                "Inspect the bloodied ground and other highlighted evidence, then locate the outgoing tracks. Follow the trail across the broken bridge and up the slope rather than returning to the hunter."
              ]
            }
          ]
        },
        {
          "id": "nest",
          "title": "Examine the griffin nest",
          "text": "Follow the footprints uphill to the nest. Inspect the dead griffin and work through the available examination prompts until Geralt finishes his assessment.",
          "details": [
            {
              "title": "Finish the inspection",
              "paragraphs": [
                "Check the highlighted remains, bones and nearby bodies if the search area remains active. Do not leave after only glancing at the first clue."
              ]
            }
          ],
          "spoiler": "The investigation establishes why the surviving griffin began attacking people: the soldiers killed its mate. This explains the hunt without changing the required confrontation.",
          "detours": [
            {
              "task": "pop-bridge",
              "label": "Optional nearby stop · Broken Bridge Place of Power"
            }
          ]
        },
        {
          "id": "4",
          "title": "Prepare with Vesemir",
          "text": "With buckthorn gathered and the nest examined, return to Vesemir by the inn. Discuss the plan and prepare for the ambush before telling him you are ready.",
          "details": [
            {
              "title": "Thunderbolt and equipment",
              "paragraphs": [
                "Follow the Alchemy tutorial if enabled, and check your inventory if tutorials are off. The basic Thunderbolt recipe uses 1 dwarven spirit, 2 cortinarius and 1 endrega embryo; the quest supplies the tutorial preparation. Equip the potion if you plan to use it.",
                "Repair your silver sword, equip food or a healing potion you already have, and leave room to dodge. This encounter does not require a particular build or crafted witcher set."
              ]
            }
          ],
          "detours": [
            {
              "task": "loc-forge",
              "label": "Willis’s forge · repairs and access requirements"
            },
            {
              "task": "q-viper",
              "label": "Optional gear route · Viper diagrams"
            }
          ]
        },
        {
          "id": "ambush",
          "title": "Meet Vesemir at the field",
          "text": "Travel to the marked ambush field. Finish your preparation before choosing the ready response. Vesemir gives you the crossbow for the encounter.",
          "details": [
            {
              "title": "Set up your tools",
              "paragraphs": [
                "Check the crossbow in your ranged slot and follow the on-screen firing prompt. Keep your silver sword equipped for the griffin. You can delay the ready response while sorting your loadout."
              ]
            }
          ]
        },
        {
          "id": "5",
          "title": "Fight the griffin and follow its retreat",
          "text": "Use the silver sword, dodge clear of the griffin’s attacks, and strike briefly during openings. Use the crossbow when it is airborne. When it retreats toward the Mill, follow the quest marker and finish the fight.",
          "details": [
            {
              "title": "Practical combat rhythm",
              "paragraphs": [
                "Keep Quen available if it helps your playstyle. Move sideways from the approach of a diving attack, then close only after the landing. Aard can help interrupt the beast at close range; avoid spending all your stamina when you need a defensive Sign.",
                "Do not stay under its wings swinging continuously. Back away, watch the next attack, and take a few safe hits. The second location is still part of the same hunt, not another quest."
              ]
            }
          ]
        },
        {
          "id": "trophy",
          "title": "Loot the trophy and check the early cutoff",
          "text": "Search the griffin’s corpse and take its trophy. Before reporting to the commander, check whether you collected the crystal skull at the opening campsite.",
          "warning": "Collect the optional crystal skull before completing the griffin quest. If it is already acquired, continue to the garrison.",
          "detours": [
            {
              "task": "poi-4",
              "label": "Check crystal skull entry and location"
            }
          ],
          "details": [
            {
              "title": "If the marker stays on the corpse",
              "paragraphs": [
                "Return to the body and inspect its loot. Killing the griffin and taking the quest trophy are separate actions; keep the trophy until the report is complete."
              ]
            }
          ]
        },
        {
          "id": "payment",
          "title": "Report to the commander",
          "text": "Return to the garrison with the trophy. Listen to the information, then choose whether to accept the offered coin. After the hand-in, open the departure review before approaching Vesemir at the inn.",
          "options": [
            "Take the coin.",
            "Turn down the coin."
          ],
          "warning": "The payment reply is timed. Decide before the dialogue timer expires; the exact reward comparison is behind Consequences below.",
          "spoiler": "Published reference values: accepting gives 300 XP plus 150 crowns in GameBanshee, GosuNoob and Guides4Gamers; witcher.tools instead lists 250 crowns. Refusing is listed as 500 XP with no coin. Some guides report differing XP. Current Xbox payout remains unconfirmed. Both replies continue the story.",
          "links": [
            {
              "task": "departure-review",
              "label": "Review before departure"
            },
            {
              "task": "q-lilac",
              "label": "Return to Lilac and Gooseberries",
              "stage": "4"
            }
          ]
        }
      ],
      "level": 3,
      "map": true,
      "category": "main",
      "verification": "Investigation and encounter route cross-checked on 14 November 2026. Published sources disagree on the crown payout and some XP amounts; reference figures below are labeled accordingly. Do not treat them as an Xbox payout guarantee.",
      "startWarning": {
        "activity": "poi-4",
        "untilQuest": "q-beast",
        "text": "Before completing this hunt, collect the optional crystal skull if wanted. Its cutoff comes before the inn departure."
      },
      "rewardData": {
        "note": "Cross-checked reference values; actual XP can differ with game conditions. No combined total is asserted.",
        "items": [
          [
            "Help with the wild dogs and speak with Mislav",
            "350 XP · published reference value"
          ],
          [
            "Complete the nest investigation",
            "500 XP · published reference value"
          ],
          [
            "At the ambush",
            "Crossbow supplied by Vesemir"
          ],
          [
            "Loot the griffin",
            "Griffin trophy; inspect the remaining drops in game"
          ]
        ],
        "choices": [
          [
            "Take the commander’s coin",
            "Reference: 300 XP + 150 crowns. Source discrepancy: witcher.tools lists 250 crowns; current Xbox amount unconfirmed."
          ],
          [
            "Refuse the commander’s coin",
            "Reference: 500 XP, no crowns. Published XP reports vary; current Xbox amount unconfirmed."
          ]
        ]
      }
    },
    "q-viper": {
      "name": "Scavenger Hunt: Viper School Gear",
      "home": "hub-viper",
      "view": "quest-q-viper",
      "type": "quest",
      "intro": "Two lost sword diagrams trace a witcher’s unfinished journey. Recover them before deciding what you can afford to craft.",
      "why": "The silver diagram shares the cemetery outing; the steel diagram pairs with the eastern ruins.",
      "requirements": "Loot either diagram to begin. Listed quest level 6; individual fights still need a readiness check.",
      "reward": "Viper steel and silver sword diagrams; crafting costs are separate.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/viperschoolgear.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Recover the steel diagram",
          "text": "Clear the deserters at the ruined fort east of White Orchard. Search the chest for the steel sword diagram and read the accompanying report."
        },
        {
          "id": "2",
          "title": "Recover the silver diagram",
          "text": "At the cemetery north of the Mill, deal with the wraith and enter the crypt. Loot the silver sword diagram and Kolgrim’s letter.",
          "warning": "The cemetery wraith is a level-7 encounter in the reference route. The hunt’s +5 allowance does not guarantee an easy fight."
        },
        {
          "id": "3",
          "title": "Check crafting costs",
          "text": "Both diagrams complete the hunt. At an appropriate craftsman, compare the material and crown cost before ordering either sword. Finding a diagram does not give you a crafted weapon."
        }
      ],
      "level": 6,
      "map": true,
      "category": "gear"
    },
    "q-temerian": {
      "name": "Temerian Valuables",
      "home": "hub-temerian",
      "view": "quest-q-temerian",
      "type": "quest",
      "intro": "A river chest points toward hidden military valuables.",
      "why": "Pair with the Mill and cemetery outing; it shares the final stash with Deserter Gold.",
      "requirements": "Recover the key from the corpse by the river bridge, then inspect the underwater chest.",
      "reward": "Treasure and saleable loot; contents can vary.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/temerianvaluables.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Recover key and orders",
          "text": "Search the corpse on the bridge’s west bank for the Temerian Lily Key. Open the river chest and read the blood-soaked orders."
        },
        {
          "id": "2",
          "title": "Search the Mill cellar",
          "text": "Follow the quest marker to the building near the Mill. Clear the boards, use Aard on the cellar entrance and loot the marked containers."
        },
        {
          "id": "3",
          "title": "Check the shared stash",
          "text": "Deserter Gold shares this cellar. Keep the key for its sealed chest."
        }
      ],
      "level": 4,
      "map": true,
      "category": "exploration"
    },
    "q-deserter": {
      "name": "Deserter Gold",
      "home": "hub-deserter",
      "view": "quest-q-deserter",
      "type": "quest",
      "intro": "A spy’s notes point toward plunder hidden at the Mill.",
      "why": "Read the notes during the northern outing, then combine the cellar visit with Temerian Valuables.",
      "requirements": "Read the Spy’s Notes at the northern camp.",
      "reward": "Access to the same Mill stash used by Temerian Valuables.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/temerianvaluables.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Read the Spy’s Notes",
          "text": "Loot and read the notes at the northern spy camp. Track the newly listed objective."
        },
        {
          "id": "2",
          "title": "Check the Mill stash",
          "text": "Follow the marker to the Mill cellar. Use Aard to clear the entrance. The sealed chest requires the Temerian Lily Key from the riverside corpse."
        },
        {
          "id": "3",
          "title": "Avoid a duplicate trip",
          "text": "Check remaining containers and your journal if Temerian Valuables already brought you here."
        }
      ],
      "level": 3,
      "map": true,
      "category": "exploration"
    },
    "q-dirty": {
      "name": "Dirty Funds",
      "home": "hub-dirty",
      "view": "quest-q-dirty",
      "type": "quest",
      "intro": "Someone has been taking the peasants’ last coin. Their notes give you a trail to the camp.",
      "why": "A northern loot detour after the hunter and cemetery outing, if the bandits are manageable.",
      "requirements": "Read the Scrawled Notes in the abandoned camp.",
      "reward": "Bandit-camp treasure and saleable equipment.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/dirtyfunds.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Read the notes",
          "text": "Search the abandoned camp in northern White Orchard. Read the Scrawled Notes to mark the bandits’ camp."
        },
        {
          "id": "2",
          "title": "Approach the camp",
          "text": "Follow the objective east. Fight from the edge so the group cannot surround you; handle the shielded leader with care."
        },
        {
          "id": "3",
          "title": "Claim the funds",
          "text": "Search the chests in the leader’s tent. Loot the equipment you can carry, then sell or dismantle it according to what you need."
        }
      ],
      "level": 2,
      "map": true,
      "category": "exploration"
    },
    "q-firestarter": {
      "name": "Twisted Firestarter",
      "home": "hub-firestarter",
      "view": "walkthrough-firestarter",
      "type": "quest",
      "intro": "The forge is cold. Willis wants the person responsible found.",
      "why": "Resolve while handling village business; the forge is also a natural repair stop.",
      "requirements": "Speak to Willis. Complete before the prologue departure.",
      "reward": "Quest reward; outcome depends on your choice.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/twistedfirestarter.php"
      ],
      "stages": [
        {
          "id": "forge",
          "title": "Begin at the forge",
          "text": "Agree to investigate for Willis. Search behind his workshop with Witcher Senses."
        },
        {
          "id": "trail",
          "title": "Pick up the trail",
          "text": "Follow the prints to the water and look beyond the bridge for the bloodied continuation. Be ready for drowners."
        },
        {
          "id": "suspect",
          "title": "Find the wounded villager",
          "text": "Follow the remaining tracks into the village. Save before the confrontation.",
          "spoiler": "Napp offers a bribe. Accept it to conceal his involvement, or refuse and bring him back. Axii offers another way to secure cooperation. Returning him to Willis leads to the soldiers taking him for execution."
        },
        {
          "id": "return",
          "title": "Return to Willis",
          "text": "Resolve the investigation according to your chosen response. Mark completion in the hub when you are done."
        }
      ],
      "level": null,
      "map": true,
      "category": "side"
    },
    "loc-forge": {
      "completionDefinition": "Reviewed service — checked the service/location and what it offers. Purchase, repair, crafting or a Gwent win is not required.",
      "name": "Willis’s forge",
      "home": "hub-firestarter",
      "view": "activity-loc-forge",
      "type": "service",
      "intro": "A useful pause beside an unfinished investigation.",
      "why": "Repair while speaking with Willis instead of making a separate service trip.",
      "requirements": "Bring equipment needing repair and check the displayed cost.",
      "reward": "A chance to restore equipment condition; services cost crowns.",
      "sections": [
        [
          "Location",
          "Willis’s workshop in White Orchard village."
        ],
        [
          "Preparation",
          "Bring equipment needing repair and check the displayed cost."
        ],
        [
          "Action",
          "Speak to Willis to inspect available repairs and crafting. His investigation is a separate task in this hub."
        ],
        [
          "Reward",
          "A chance to restore equipment condition; services cost crowns."
        ]
      ],
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/location-whiteorchard.php"
      ],
      "map": true,
      "category": "gear",
      "locationMap": "#whiteorchard-map/loc-forge"
    },
    "gwent-start": {
      "completionDefinition": "Reviewed Gwent stop — reviewed the scholar/card-shopping guidance. This mark does not prove a specific card was won or every card purchased.",
      "name": "Play the scholar and check inn cards",
      "home": "hub-arrival",
      "view": "activity-gwent-start",
      "type": "discovery",
      "intro": "A quiet table is the beginning of a much longer collection.",
      "why": "You are already asking about Yennefer at the inn.",
      "requirements": "Bring a small card budget. This is an optional collection stop.",
      "reward": "A card from the scholar and purchased cards for your early deck.",
      "sections": [
        [
          "Location",
          "Aldert Geert at the White Orchard inn; Elsa’s trade inventory."
        ],
        [
          "Preparation",
          "Bring a small card budget. This is an optional collection stop."
        ],
        [
          "Action",
          "Take the Gwent lesson and win against the scholar. Check cards for sale before the departure sequence."
        ],
        [
          "Reward",
          "A card from the scholar and purchased cards for your early deck."
        ]
      ],
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/collectemall.php"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "#whiteorchard-map/gwent-start"
    },
    "pop-cemetery": {
      "completionDefinition": "Ability point drawn — the first ability point was received in game. Visiting or viewing the guide alone is not enough.",
      "name": "Cemetery Place of Power",
      "home": "hub-hunt",
      "view": "activity-pop-cemetery",
      "type": "discovery",
      "intro": "A standing stone on the same outing as the silver diagram.",
      "why": "Combine the draw with the crypt visit.",
      "requirements": "A wraith guards the approach; check your silver sword.",
      "reward": "One ability point on first draw; temporary Sign buff.",
      "sections": [
        [
          "Location",
          "Cemetery north of the Mill."
        ],
        [
          "Preparation",
          "A wraith guards the approach; check your silver sword."
        ],
        [
          "Action",
          "Drive off the wraith and hold the draw interaction at the stone."
        ],
        [
          "Reward",
          "One ability point on first draw; temporary Sign buff."
        ]
      ],
      "sources": [
        "https://witcher3.mmorpg-life.com/white-orchard-places-of-power/guides/"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "#whiteorchard-map/pop-cemetery"
    },
    "pop-north": {
      "completionDefinition": "Ability point drawn — the first ability point was received in game. Visiting or viewing the guide alone is not enough.",
      "name": "Northern woods Place of Power",
      "home": "hub-viper",
      "view": "activity-pop-north",
      "type": "discovery",
      "intro": "One more stone beyond the chapel.",
      "why": "Continue north after the cemetery.",
      "requirements": "Ghouls gather near a nest.",
      "reward": "One ability point on first draw.",
      "sections": [
        [
          "Location",
          "Woods north of the cemetery chapel."
        ],
        [
          "Preparation",
          "Ghouls gather near a nest."
        ],
        [
          "Action",
          "Clear nearby threats, then draw from the stone."
        ],
        [
          "Reward",
          "One ability point on first draw."
        ]
      ],
      "sources": [
        "https://witcher3.mmorpg-life.com/white-orchard-places-of-power/guides/"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "#whiteorchard-map/pop-north"
    },
    "pop-cackler": {
      "completionDefinition": "Ability point drawn — the first ability point was received in game. Visiting or viewing the guide alone is not enough.",
      "name": "Cackler Bridge Place of Power",
      "home": "hub-missing",
      "view": "activity-pop-cackler",
      "type": "discovery",
      "intro": "A permanent reward on the battlefield’s northern loop.",
      "why": "Pair with Dune’s battlefield search.",
      "requirements": "Expect ghouls by the nest.",
      "reward": "One ability point on first draw.",
      "sections": [
        [
          "Location",
          "Northeast of Cackler Bridge."
        ],
        [
          "Preparation",
          "Expect ghouls by the nest."
        ],
        [
          "Action",
          "Clear the immediate enemies and draw from the stone."
        ],
        [
          "Reward",
          "One ability point on first draw."
        ]
      ],
      "sources": [
        "https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/place-of-power-locations"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "#whiteorchard-map/pop-cackler"
    },
    "pop-sawmill": {
      "completionDefinition": "Ability point drawn — the first ability point was received in game. Visiting or viewing the guide alone is not enough.",
      "name": "Sawmill Place of Power",
      "home": "hub-cargo",
      "view": "activity-pop-sawmill",
      "type": "discovery",
      "intro": "A stone between the roads to the garrison.",
      "why": "An optional diversion during the garrison approach.",
      "requirements": "Expect a wraith; return later if the fight is beyond you.",
      "reward": "One ability point on first draw.",
      "sections": [
        [
          "Location",
          "Northeast of the Sawmill, between the garrison roads."
        ],
        [
          "Preparation",
          "Expect a wraith; return later if the fight is beyond you."
        ],
        [
          "Action",
          "Defeat the guardian and draw."
        ],
        [
          "Reward",
          "One ability point on first draw."
        ]
      ],
      "sources": [
        "https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/place-of-power-locations"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "#whiteorchard-map/pop-sawmill"
    },
    "pop-bear": {
      "completionDefinition": "Ability point drawn — the first ability point was received in game. Visiting or viewing the guide alone is not enough.",
      "name": "Southern bear-guarded Place of Power",
      "home": "hub-devil",
      "view": "activity-pop-bear",
      "type": "discovery",
      "intro": "Power waits off the southern road.",
      "why": "A detour on the Abandoned Village outing.",
      "requirements": "A bear guards it; leave space to dodge.",
      "reward": "One ability point on first draw.",
      "sections": [
        [
          "Location",
          "East of the Abandoned Village."
        ],
        [
          "Preparation",
          "A bear guards it; leave space to dodge."
        ],
        [
          "Action",
          "Handle the bear before drawing from the stone."
        ],
        [
          "Reward",
          "One ability point on first draw."
        ]
      ],
      "sources": [
        "https://witcher3.mmorpg-life.com/white-orchard-places-of-power/guides/"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "#whiteorchard-map/pop-bear"
    },
    "pop-bridge": {
      "completionDefinition": "Ability point drawn — the first ability point was received in game. Visiting or viewing the guide alone is not enough.",
      "name": "Broken Bridge Place of Power",
      "home": "hub-devil",
      "view": "activity-pop-bridge",
      "type": "discovery",
      "intro": "A quieter stone beyond the broken crossing.",
      "why": "A southern-loop reward.",
      "requirements": "The reference route lists no fixed guardian; check the approach.",
      "reward": "One ability point on first draw.",
      "sections": [
        [
          "Location",
          "Cross Broken Bridge and follow the uphill trail southwest, then south."
        ],
        [
          "Preparation",
          "The reference route lists no fixed guardian; check the approach."
        ],
        [
          "Action",
          "Find the stone just east of the trail and draw."
        ],
        [
          "Reward",
          "One ability point on first draw."
        ]
      ],
      "sources": [
        "https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/place-of-power-locations"
      ],
      "map": true,
      "category": "exploration",
      "locationMap": "#whiteorchard-map/pop-bridge"
    },
    "departure-review": {
      "completionDefinition": "Reviewed departure checklist — reviewed the checklist. This does not mean every listed activity was finished.",
      "name": "Review before leaving White Orchard",
      "home": "hub-departure",
      "view": "activity-departure-review",
      "type": "discovery",
      "intro": "Take one last look at unfinished business before the road changes.",
      "why": "A deliberate stopping point after the griffin reward.",
      "requirements": "Review the three departure-sensitive errands: Twisted Firestarter, Missing in Action and On Death’s Bed.",
      "reward": "A final chance to choose your prologue stopping point.",
      "sections": [
        [
          "Location",
          "Before speaking to Vesemir at the inn after the hunt."
        ],
        [
          "Preparation",
          "Review the three departure-sensitive errands: Twisted Firestarter, Missing in Action and On Death’s Bed."
        ],
        [
          "Action",
          "Open their home hubs and finish what you intend to do. Also review the pan, cargo, contract, cards and six stones. This checklist does not automatically complete any task."
        ],
        [
          "Reward",
          "A final chance to choose your prologue stopping point."
        ]
      ],
      "sources": [
        "https://witcher3.th.gl/checklist/missables",
        "https://www.neoseeker.com/the-witcher-3-wild-hunt/White_Orchard_Secondary_Quests"
      ],
      "map": true,
      "category": "preparation"
    },
    "q-incident": {
      "name": "The Incident at White Orchard",
      "home": "hub-departure",
      "view": "quest-q-incident",
      "type": "quest",
      "intro": "The search is about to leave the village behind.",
      "why": "The main-story exit after your final review.",
      "requirements": "Complete the griffin contract and decide which local tasks you want finished.",
      "reward": "300 XP for defeating the inn attackers, using published reference values. The later 150 XP belongs to the conclusion of Lilac and Gooseberries.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/theincidentatwhiteorchard.php",
        "https://www.gamepressure.com/thewitcher3/incident-in-the-white-orchard/z677ce",
        "https://www.witcher.tools/quests/the-incident-at-white-orchard"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Review before talking to Vesemir",
          "text": "Open the departure review and check your in-game journal. Finish any departure-sensitive quests you want before initiating the final conversation at the inn.",
          "warning": "This conversation starts the exit sequence. Missing in Action, Twisted Firestarter and On Death’s Bed must be finished first if you want to avoid their failure at Imperial Audience.",
          "links": [
            {
              "task": "departure-review",
              "label": "Open departure review"
            }
          ],
          "details": [
            {
              "title": "One review, shared records",
              "paragraphs": [
                "The review reads the same completion records as the quest pages. Check unrecorded entries in the game; opening a warning or reading a walkthrough does not resolve it."
              ]
            }
          ]
        },
        {
          "id": "2",
          "title": "Speak to Vesemir when ready",
          "text": "After reporting the griffin kill, talk to Vesemir inside the inn. Prepare for an immediate fight; this is not the earlier conversation used to plan the griffin ambush.",
          "warning": "Starting this conversation commits you to the inn and departure sequence. Make your preparations first.",
          "details": [
            {
              "title": "Before starting",
              "paragraphs": [
                "Repair your steel sword and equip healing supplies you already use. Keep a manual game save if you want the option to revisit your pre-departure state."
              ]
            }
          ],
          "spoiler": "The confrontation becomes lethal. The guide cannot prevent it by choosing a different conciliatory response."
        },
        {
          "id": "fight",
          "title": "Defeat the attackers",
          "text": "Use your steel sword against the hostile humans. Keep them in front of you, make room to dodge, and defeat the group alongside Vesemir.",
          "details": [
            {
              "title": "If you are surrounded",
              "paragraphs": [
                "Move toward open floor rather than attacking into several enemies at once. Quen can cover a mistake; short attacks and a retreat are safer than remaining trapped between opponents."
              ]
            }
          ]
        },
        {
          "id": "depart",
          "title": "Follow the departure scenes",
          "text": "After the fight, follow the scenes outside the inn and onward to Vizima. Continue with Imperial Audience in the game; that walkthrough is outside this content slice.",
          "spoiler": "Yennefer arrives with a Nilfgaardian escort. Geralt travels with her to meet the emperor while Vesemir heads toward Kaer Morhen.",
          "details": [
            {
              "title": "Recording the handoff",
              "paragraphs": [
                "Record the inn fight in this quest and the departure in Lilac and Gooseberries only after they happen. Reading this final page does not change either record. White Orchard becomes revisitable later, but failed side quests are not restored."
              ]
            }
          ],
          "links": [
            {
              "task": "q-lilac",
              "label": "Lilac and Gooseberries · departure record",
              "stage": "4"
            }
          ]
        }
      ],
      "level": 2,
      "map": true,
      "category": "main",
      "verification": "Inn sequence and 300 XP reference cross-checked on 14 November 2026. This is a short combat transition, not a separate regional cleanup window. XP and Xbox field acceptance remain subject to in-game confirmation.",
      "startWarning": {
        "untilQuest": "q-incident",
        "text": "Departure trigger: finish Missing in Action, Twisted Firestarter and On Death’s Bed before speaking to Vesemir after the griffin hand-in. They can fail when the sequence reaches Imperial Audience."
      },
      "rewardData": {
        "note": "Keep the inn fight and the enclosing main quest separate when comparing rewards.",
        "items": [
          [
            "Defeat the inn attackers",
            "300 XP · published reference value"
          ],
          [
            "Subsequent departure",
            "150 XP belongs to Lilac and Gooseberries; not an additional reward of this quest"
          ]
        ]
      }
    },
    "abandoned-1": {
      "completionDefinition": "Threats cleared and residents returned.",
      "name": "Abandoned shrine · southeast road",
      "home": "hub-devil",
      "view": "activity-abandoned-1",
      "type": "discovery",
      "category": "exploration",
      "intro": "Abandoned shrine · southeast road is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Contract: Devil by the Well. Check the approach and your supplies before committing.",
      "requirements": "Inspect the hostiles before engaging. Do not confuse this event with the permanently ruined Abandoned Village.",
      "reward": "A restored settlement and service access.",
      "sections": [
        [
          "Location",
          "South of Ford. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Inspect the hostiles before engaging. Do not confuse this event with the permanently ruined Abandoned Village."
        ],
        [
          "Action",
          "Remove the immediate threats and let the residents return. Recheck the restored area for services before marking it complete."
        ],
        [
          "Reward",
          "A restored settlement and service access."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/abandoned-1"
    },
    "abandoned-2": {
      "completionDefinition": "Threats cleared and residents returned.",
      "name": "Abandoned site · west of Sawmill",
      "home": "hub-cargo",
      "view": "activity-abandoned-2",
      "type": "discovery",
      "category": "exploration",
      "intro": "Abandoned site · west of Sawmill is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Precious Cargo. Check the approach and your supplies before committing.",
      "requirements": "Inspect the hostiles before engaging. Do not confuse this event with the permanently ruined Abandoned Village.",
      "reward": "A restored settlement and service access.",
      "sections": [
        [
          "Location",
          "West of Sawmill. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Inspect the hostiles before engaging. Do not confuse this event with the permanently ruined Abandoned Village."
        ],
        [
          "Action",
          "Remove the immediate threats and let the residents return. Recheck the restored area for services before marking it complete."
        ],
        [
          "Reward",
          "A restored settlement and service access."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/abandoned-2"
    },
    "armourerstable-1": {
      "completionDefinition": "Reviewed service — checked the service/location and what it offers. Purchase, repair, crafting or a Gwent win is not required.",
      "name": "Armorer’s table · Near Nilfgaardian Garrison",
      "home": "hub-hunt",
      "view": "activity-armourerstable-1",
      "type": "service",
      "category": "gear",
      "intro": "Armorer’s table · Near Nilfgaardian Garrison is one of the stops along this part of the Path.",
      "why": "A suggested detour while following The Beast of White Orchard. Check the approach and your supplies before committing.",
      "requirements": "Touch the table before a planned fight.",
      "reward": "Temporary armor improvement.",
      "sections": [
        [
          "Location",
          "Near Nilfgaardian Garrison. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Touch the table before a planned fight."
        ],
        [
          "Action",
          "Use the table and check the temporary armor buff. Revisit when the buff expires."
        ],
        [
          "Reward",
          "Temporary armor improvement."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/armourerstable-1"
    },
    "banditcamp-1": {
      "completionDefinition": "Camp cleared and listed loot collected.",
      "name": "Bandit camp · Southwest of Broken Bridge",
      "home": "hub-devil",
      "view": "activity-banditcamp-1",
      "type": "discovery",
      "category": "exploration",
      "intro": "Bandit camp · Southwest of Broken Bridge is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Contract: Devil by the Well. Check the approach and your supplies before committing.",
      "requirements": "Repair your steel sword and inspect enemy levels. Retreat if this is beyond your current readiness.",
      "reward": "Saleable loot; contents vary.",
      "sections": [
        [
          "Location",
          "Southwest of Broken Bridge. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Repair your steel sword and inspect enemy levels. Retreat if this is beyond your current readiness."
        ],
        [
          "Action",
          "Approach from the edge, avoid being surrounded, then search the tents and marked containers. Mark complete after collecting the loot."
        ],
        [
          "Reward",
          "Saleable loot; contents vary."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/banditcamp-1"
    },
    "banditcamp-2": {
      "completionDefinition": "Camp cleared and listed loot collected.",
      "name": "Bandit camp · South of Ford",
      "home": "hub-devil",
      "view": "activity-banditcamp-2",
      "type": "discovery",
      "category": "exploration",
      "intro": "Bandit camp · South of Ford is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Contract: Devil by the Well. Check the approach and your supplies before committing.",
      "requirements": "Repair your steel sword and inspect enemy levels. Retreat if this is beyond your current readiness.",
      "reward": "Saleable loot; contents vary.",
      "sections": [
        [
          "Location",
          "South of Ford. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Repair your steel sword and inspect enemy levels. Retreat if this is beyond your current readiness."
        ],
        [
          "Action",
          "Approach from the edge, avoid being surrounded, then search the tents and marked containers. Mark complete after collecting the loot."
        ],
        [
          "Reward",
          "Saleable loot; contents vary."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/banditcamp-2"
    },
    "banditcamp-3": {
      "completionDefinition": "Camp cleared and listed loot collected.",
      "name": "Bandit camp · Northwest of Sawmill",
      "home": "hub-cargo",
      "view": "activity-banditcamp-3",
      "type": "discovery",
      "category": "exploration",
      "intro": "Bandit camp · Northwest of Sawmill is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Precious Cargo. Check the approach and your supplies before committing.",
      "requirements": "Repair your steel sword and inspect enemy levels. Retreat if this is beyond your current readiness.",
      "reward": "Saleable loot; contents vary.",
      "sections": [
        [
          "Location",
          "Northwest of Sawmill. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Repair your steel sword and inspect enemy levels. Retreat if this is beyond your current readiness."
        ],
        [
          "Action",
          "Approach from the edge, avoid being surrounded, then search the tents and marked containers. Mark complete after collecting the loot."
        ],
        [
          "Reward",
          "Saleable loot; contents vary."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/banditcamp-3"
    },
    "banditcamp-6": {
      "completionDefinition": "Camp cleared and listed loot collected.",
      "name": "Bandit camp · Southwest of Crossroads",
      "home": "hub-missing",
      "view": "activity-banditcamp-6",
      "type": "discovery",
      "category": "exploration",
      "intro": "Bandit camp · Southwest of Crossroads is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Missing in Action. Check the approach and your supplies before committing.",
      "requirements": "Repair your steel sword and inspect enemy levels. Retreat if this is beyond your current readiness.",
      "reward": "Saleable loot; contents vary.",
      "sections": [
        [
          "Location",
          "Southwest of Crossroads. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Repair your steel sword and inspect enemy levels. Retreat if this is beyond your current readiness."
        ],
        [
          "Action",
          "Approach from the edge, avoid being surrounded, then search the tents and marked containers. Mark complete after collecting the loot."
        ],
        [
          "Reward",
          "Saleable loot; contents vary."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/banditcamp-6"
    },
    "blacksmith-1": {
      "completionDefinition": "Reviewed service — checked the service/location and what it offers. Purchase, repair, crafting or a Gwent win is not required.",
      "name": "Garrison blacksmith · Near Nilfgaardian Garrison",
      "home": "hub-hunt",
      "view": "activity-blacksmith-1",
      "type": "service",
      "category": "gear",
      "intro": "Garrison blacksmith · Near Nilfgaardian Garrison is one of the stops along this part of the Path.",
      "why": "A suggested detour while following The Beast of White Orchard. Check the approach and your supplies before committing.",
      "requirements": "Check diagrams, materials and crown cost before commissioning a weapon.",
      "reward": "Weapon services; costs are shown in the trade menu.",
      "sections": [
        [
          "Location",
          "Near Nilfgaardian Garrison. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Check diagrams, materials and crown cost before commissioning a weapon."
        ],
        [
          "Action",
          "Speak to the craftsman to repair, craft or dismantle. Finding a diagram does not give you the finished sword."
        ],
        [
          "Reward",
          "Weapon services; costs are shown in the trade menu."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/blacksmith-1"
    },
    "grindstone-village": {
      "completionDefinition": "Reviewed service — checked the service/location and what it offers. Purchase, repair, crafting or a Gwent win is not required.",
      "name": "Grindstone · West of Woesong Bridge",
      "home": "hub-firestarter",
      "view": "activity-grindstone-village",
      "type": "service",
      "category": "gear",
      "intro": "Grindstone · West of Woesong Bridge is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Twisted Firestarter. Check the approach and your supplies before committing.",
      "requirements": "Use while preparing equipment for a nearby fight.",
      "reward": "Temporary weapon damage improvement.",
      "sections": [
        [
          "Location",
          "West of Woesong Bridge. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Use while preparing equipment for a nearby fight."
        ],
        [
          "Action",
          "Sharpen the blade and check the temporary weapon buff. This is a reusable service, not a cleared encounter."
        ],
        [
          "Reward",
          "Temporary weapon damage improvement."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/grindstone-village"
    },
    "grindstone-3": {
      "completionDefinition": "Reviewed service — checked the service/location and what it offers. Purchase, repair, crafting or a Gwent win is not required.",
      "name": "Grindstone · West of Sawmill",
      "home": "hub-cargo",
      "view": "activity-grindstone-3",
      "type": "service",
      "category": "gear",
      "intro": "Grindstone · West of Sawmill is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Precious Cargo. Check the approach and your supplies before committing.",
      "requirements": "Use while preparing equipment for a nearby fight.",
      "reward": "Temporary weapon damage improvement.",
      "sections": [
        [
          "Location",
          "West of Sawmill. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Use while preparing equipment for a nearby fight."
        ],
        [
          "Action",
          "Sharpen the blade and check the temporary weapon buff. This is a reusable service, not a cleared encounter."
        ],
        [
          "Reward",
          "Temporary weapon damage improvement."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/grindstone-3"
    },
    "grindstone-4": {
      "completionDefinition": "Reviewed service — checked the service/location and what it offers. Purchase, repair, crafting or a Gwent win is not required.",
      "name": "Grindstone · Near Nilfgaardian Garrison",
      "home": "hub-hunt",
      "view": "activity-grindstone-4",
      "type": "service",
      "category": "gear",
      "intro": "Grindstone · Near Nilfgaardian Garrison is one of the stops along this part of the Path.",
      "why": "A suggested detour while following The Beast of White Orchard. Check the approach and your supplies before committing.",
      "requirements": "Use while preparing equipment for a nearby fight.",
      "reward": "Temporary weapon damage improvement.",
      "sections": [
        [
          "Location",
          "Near Nilfgaardian Garrison. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Use while preparing equipment for a nearby fight."
        ],
        [
          "Action",
          "Sharpen the blade and check the temporary weapon buff. This is a reusable service, not a cleared encounter."
        ],
        [
          "Reward",
          "Temporary weapon damage improvement."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/grindstone-4"
    },
    "guarded-1": {
      "completionDefinition": "Guarded site cleared and listed containers searched.",
      "name": "Guarded treasure · Southeast of Woesong Bridge",
      "home": "hub-devil",
      "view": "activity-guarded-1",
      "type": "discovery",
      "category": "exploration",
      "intro": "Guarded treasure · Southeast of Woesong Bridge is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Contract: Devil by the Well. Check the approach and your supplies before committing.",
      "requirements": "Look for the guardian and check its level before approaching the cache.",
      "reward": "Cached loot; no fixed item quality is promised.",
      "sections": [
        [
          "Location",
          "Southeast of Woesong Bridge. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Look for the guardian and check its level before approaching the cache."
        ],
        [
          "Action",
          "Clear the immediate threat or return later. Search all containers at the marker before marking the stop complete."
        ],
        [
          "Reward",
          "Cached loot; no fixed item quality is promised."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/guarded-1"
    },
    "guarded-2": {
      "completionDefinition": "Guarded site cleared and listed containers searched.",
      "name": "Guarded treasure · Southwest of Nilfgaardian Garrison",
      "home": "hub-cargo",
      "view": "activity-guarded-2",
      "type": "discovery",
      "category": "exploration",
      "intro": "Guarded treasure · Southwest of Nilfgaardian Garrison is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Precious Cargo. Check the approach and your supplies before committing.",
      "requirements": "Look for the guardian and check its level before approaching the cache.",
      "reward": "Cached loot; no fixed item quality is promised.",
      "sections": [
        [
          "Location",
          "Southwest of Nilfgaardian Garrison. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Look for the guardian and check its level before approaching the cache."
        ],
        [
          "Action",
          "Clear the immediate threat or return later. Search all containers at the marker before marking the stop complete."
        ],
        [
          "Reward",
          "Cached loot; no fixed item quality is promised."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/guarded-2"
    },
    "guarded-3": {
      "completionDefinition": "Guarded site cleared and listed containers searched.",
      "name": "Guarded treasure · North of Mill",
      "home": "hub-viper",
      "view": "activity-guarded-3",
      "type": "discovery",
      "category": "exploration",
      "intro": "Guarded treasure · North of Mill is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Scavenger Hunt: Viper School Gear. Check the approach and your supplies before committing.",
      "requirements": "Look for the guardian and check its level before approaching the cache.",
      "reward": "Cached loot; no fixed item quality is promised.",
      "sections": [
        [
          "Location",
          "North of Mill. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Look for the guardian and check its level before approaching the cache."
        ],
        [
          "Action",
          "Clear the immediate threat or return later. Search all containers at the marker before marking the stop complete."
        ],
        [
          "Reward",
          "Cached loot; no fixed item quality is promised."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/guarded-3"
    },
    "guarded-4": {
      "completionDefinition": "Guarded site cleared and listed containers searched.",
      "name": "Guarded treasure · Southeast of Nilfgaardian Garrison",
      "home": "hub-hunt",
      "view": "activity-guarded-4",
      "type": "discovery",
      "category": "exploration",
      "intro": "Guarded treasure · Southeast of Nilfgaardian Garrison is one of the stops along this part of the Path.",
      "why": "A suggested detour while following The Beast of White Orchard. Check the approach and your supplies before committing.",
      "requirements": "Look for the guardian and check its level before approaching the cache.",
      "reward": "Cached loot; no fixed item quality is promised.",
      "sections": [
        [
          "Location",
          "Southeast of Nilfgaardian Garrison. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Look for the guardian and check its level before approaching the cache."
        ],
        [
          "Action",
          "Clear the immediate threat or return later. Search all containers at the marker before marking the stop complete."
        ],
        [
          "Reward",
          "Cached loot; no fixed item quality is promised."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/guarded-4"
    },
    "guarded-5": {
      "completionDefinition": "Guarded site cleared and listed containers searched.",
      "name": "Guarded treasure · South of Ransacked Village",
      "home": "hub-missing",
      "view": "activity-guarded-5",
      "type": "discovery",
      "category": "exploration",
      "intro": "Guarded treasure · South of Ransacked Village is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Missing in Action. Check the approach and your supplies before committing.",
      "requirements": "Look for the guardian and check its level before approaching the cache.",
      "reward": "Cached loot; no fixed item quality is promised.",
      "sections": [
        [
          "Location",
          "South of Ransacked Village. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Look for the guardian and check its level before approaching the cache."
        ],
        [
          "Action",
          "Clear the immediate threat or return later. Search all containers at the marker before marking the stop complete."
        ],
        [
          "Reward",
          "Cached loot; no fixed item quality is promised."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/guarded-5"
    },
    "herbalist-2": {
      "completionDefinition": "Reviewed service — checked the service/location and what it offers. Purchase, repair, crafting or a Gwent win is not required.",
      "name": "Shrine herbalist · Southwest of Ford",
      "home": "hub-devil",
      "view": "activity-herbalist-2",
      "type": "service",
      "category": "gear",
      "intro": "Shrine herbalist · Southwest of Ford is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Contract: Devil by the Well. Check the approach and your supplies before committing.",
      "requirements": "This service requires the surrounding abandoned site to be restored.",
      "reward": "Alchemy supplies; availability and prices depend on stock.",
      "sections": [
        [
          "Location",
          "Southwest of Ford. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "This service requires the surrounding abandoned site to be restored."
        ],
        [
          "Action",
          "After residents return, speak to the herbalist for ingredients and available formulas. Check stock before buying."
        ],
        [
          "Reward",
          "Alchemy supplies; availability and prices depend on stock."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/herbalist-2"
    },
    "monsternest-1": {
      "completionDefinition": "Nest destroyed and remains looted; killing nearby enemies alone is insufficient.",
      "name": "Ghoul nest · north of the cemetery",
      "home": "hub-viper",
      "view": "activity-monsternest-1",
      "type": "discovery",
      "category": "exploration",
      "intro": "Ghoul nest · north of the cemetery is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Scavenger Hunt: Viper School Gear. Check the approach and your supplies before committing.",
      "requirements": "Carry a nest-destroying bomb such as Samum, Grapeshot or Dancing Star.",
      "reward": "Nest loot and a cleared infestation.",
      "sections": [
        [
          "Location",
          "North of Mill. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Carry a nest-destroying bomb such as Samum, Grapeshot or Dancing Star."
        ],
        [
          "Action",
          "Clear the ghouls, interact with the nest to plant a bomb, then loot after the explosion. Be ready for another enemy."
        ],
        [
          "Reward",
          "Nest loot and a cleared infestation."
        ]
      ],
      "sources": [
        "https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/monster-nests"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/monsternest-1"
    },
    "monsternest-2": {
      "completionDefinition": "Nest destroyed and remains looted; killing nearby enemies alone is insufficient.",
      "name": "Ghoul nest · Cackler Bridge",
      "home": "hub-missing",
      "view": "activity-monsternest-2",
      "type": "discovery",
      "category": "exploration",
      "intro": "Ghoul nest · Cackler Bridge is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Missing in Action. Check the approach and your supplies before committing.",
      "requirements": "Carry a nest-destroying bomb such as Samum, Grapeshot or Dancing Star.",
      "reward": "Nest loot and a cleared infestation.",
      "sections": [
        [
          "Location",
          "East of Cackler Bridge. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Carry a nest-destroying bomb such as Samum, Grapeshot or Dancing Star."
        ],
        [
          "Action",
          "Clear the ghouls, interact with the nest to plant a bomb, then loot after the explosion. Be ready for another enemy."
        ],
        [
          "Reward",
          "Nest loot and a cleared infestation."
        ]
      ],
      "sources": [
        "https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/monster-nests"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/monsternest-2"
    },
    "monsternest-3": {
      "completionDefinition": "Nest destroyed and remains looted; killing nearby enemies alone is insufficient.",
      "name": "Ghoul nest · east of Crossroads",
      "home": "hub-missing",
      "view": "activity-monsternest-3",
      "type": "discovery",
      "category": "exploration",
      "intro": "Ghoul nest · east of Crossroads is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Missing in Action. Check the approach and your supplies before committing.",
      "requirements": "Carry a nest-destroying bomb such as Samum, Grapeshot or Dancing Star.",
      "reward": "Nest loot and a cleared infestation.",
      "sections": [
        [
          "Location",
          "East of Crossroads. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Carry a nest-destroying bomb such as Samum, Grapeshot or Dancing Star."
        ],
        [
          "Action",
          "Clear the ghouls, interact with the nest to plant a bomb, then loot after the explosion. Be ready for another enemy."
        ],
        [
          "Reward",
          "Nest loot and a cleared infestation."
        ]
      ],
      "sources": [
        "https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/white-orchard/activities/monster-nests"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/monsternest-3"
    },
    "poi-1": {
      "completionDefinition": "Battlefield loot search performed; Missing in Action objectives remain separate.",
      "name": "Battlefield search · north of Ransacked Village",
      "home": "hub-missing",
      "view": "activity-poi-1",
      "type": "discovery",
      "category": "exploration",
      "intro": "Battlefield search · north of Ransacked Village is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Missing in Action. Check the approach and your supplies before committing.",
      "requirements": "Expect battlefield scavengers. Keep space for useful loot.",
      "reward": "Loot and documents along the battlefield route.",
      "sections": [
        [
          "Location",
          "East of Cackler Bridge. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Expect battlefield scavengers. Keep space for useful loot."
        ],
        [
          "Action",
          "Search bodies and containers along Dune’s outing. Collect documents you find; finish the marked brother-search objectives separately."
        ],
        [
          "Reward",
          "Loot and documents along the battlefield route."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/poi-1"
    },
    "poi-4": {
      "completionDefinition": "Collected — Yennefer’s crystal skull was collected in game.",
      "name": "Yennefer’s crystal skull",
      "home": "hub-arrival",
      "view": "activity-poi-4",
      "type": "discovery",
      "category": "exploration",
      "intro": "Yennefer’s crystal skull is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Lilac and Gooseberries. Check the approach and your supplies before committing.",
      "requirements": "Check the opening campsite before riding on.",
      "reward": "An optional personal item.",
      "sections": [
        [
          "Location",
          "Near Crossroads. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Check the opening campsite before riding on."
        ],
        [
          "Action",
          "Use Witcher Senses near the opening camp and collect the crystal skull. This is an optional keepsake, not an equipment upgrade."
        ],
        [
          "Reward",
          "An optional personal item."
        ]
      ],
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/lilacandgooseberries.php"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/poi-4"
    },
    "shopkeeper-1": {
      "completionDefinition": "Reviewed service — checked the service/location and what it offers. Purchase, repair, crafting or a Gwent win is not required.",
      "name": "Bram · cards and riding supplies",
      "home": "hub-arrival",
      "view": "activity-shopkeeper-1",
      "type": "service",
      "category": "gear",
      "intro": "Bram · cards and riding supplies is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Lilac and Gooseberries. Check the approach and your supplies before committing.",
      "requirements": "Review current needs and prices before spending.",
      "reward": "Trade access; purchases cost crowns.",
      "sections": [
        [
          "Location",
          "Near Woesong Bridge. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Review current needs and prices before spending."
        ],
        [
          "Action",
          "Inspect Gwent cards, crafting goods and riding equipment. Compare available capacity upgrades before buying; sell or keep loot according to your needs."
        ],
        [
          "Reward",
          "Trade access; purchases cost crowns."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/shopkeeper-1"
    },
    "shopkeeper-2": {
      "completionDefinition": "Reviewed service — checked the service/location and what it offers. Purchase, repair, crafting or a Gwent win is not required.",
      "name": "Sawmill merchant",
      "home": "hub-cargo",
      "view": "activity-shopkeeper-2",
      "type": "service",
      "category": "gear",
      "intro": "Sawmill merchant is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Precious Cargo. Check the approach and your supplies before committing.",
      "requirements": "This merchant appears after the nearby abandoned site is restored.",
      "reward": "Trade access; purchases cost crowns.",
      "sections": [
        [
          "Location",
          "West of Sawmill. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "This merchant appears after the nearby abandoned site is restored."
        ],
        [
          "Action",
          "Inspect the merchant’s goods, sell unwanted items where appropriate, and keep the materials you still need."
        ],
        [
          "Reward",
          "Trade access; purchases cost crowns."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/shopkeeper-2"
    },
    "signpost-1": {
      "completionDefinition": "Discovered — the fast-travel signpost was unlocked in game.",
      "name": "Abandoned Village signpost",
      "home": "hub-devil",
      "view": "activity-signpost-1",
      "type": "discovery",
      "category": "exploration",
      "intro": "Abandoned Village signpost is one of the stops along this part of the Path.",
      "why": "A travel anchor for Contract: Devil by the Well. It helps you return without retracing the entire road.",
      "requirements": "Reach the signpost safely; it is an orientation stop, not a combat reward.",
      "reward": "A reusable travel reference.",
      "sections": [
        [
          "Location",
          "Near Abandoned Village. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Reach the signpost safely; it is an orientation stop, not a combat reward."
        ],
        [
          "Action",
          "Approach the signpost to discover it in-game. Use discovered signposts for fast travel when you need to return along this route. Mark this guide entry once visited."
        ],
        [
          "Reward",
          "A reusable travel reference."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/signpost-1"
    },
    "signpost-2": {
      "completionDefinition": "Discovered — the fast-travel signpost was unlocked in game.",
      "name": "Broken Bridge signpost",
      "home": "hub-devil",
      "view": "activity-signpost-2",
      "type": "discovery",
      "category": "exploration",
      "intro": "Broken Bridge signpost is one of the stops along this part of the Path.",
      "why": "A travel anchor for Contract: Devil by the Well. It helps you return without retracing the entire road.",
      "requirements": "Reach the signpost safely; it is an orientation stop, not a combat reward.",
      "reward": "A reusable travel reference.",
      "sections": [
        [
          "Location",
          "Near Broken Bridge. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Reach the signpost safely; it is an orientation stop, not a combat reward."
        ],
        [
          "Action",
          "Approach the signpost to discover it in-game. Use discovered signposts for fast travel when you need to return along this route. Mark this guide entry once visited."
        ],
        [
          "Reward",
          "A reusable travel reference."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/signpost-2"
    },
    "signpost-3": {
      "completionDefinition": "Discovered — the fast-travel signpost was unlocked in game.",
      "name": "Woesong Bridge signpost",
      "home": "hub-arrival",
      "view": "activity-signpost-3",
      "type": "discovery",
      "category": "exploration",
      "intro": "Woesong Bridge signpost is one of the stops along this part of the Path.",
      "why": "A travel anchor for Lilac and Gooseberries. It helps you return without retracing the entire road.",
      "requirements": "Reach the signpost safely; it is an orientation stop, not a combat reward.",
      "reward": "A reusable travel reference.",
      "sections": [
        [
          "Location",
          "Near Woesong Bridge. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Reach the signpost safely; it is an orientation stop, not a combat reward."
        ],
        [
          "Action",
          "Approach the signpost to discover it in-game. Use discovered signposts for fast travel when you need to return along this route. Mark this guide entry once visited."
        ],
        [
          "Reward",
          "A reusable travel reference."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/signpost-3"
    },
    "signpost-4": {
      "completionDefinition": "Discovered — the fast-travel signpost was unlocked in game.",
      "name": "Sawmill signpost",
      "home": "hub-cargo",
      "view": "activity-signpost-4",
      "type": "discovery",
      "category": "exploration",
      "intro": "Sawmill signpost is one of the stops along this part of the Path.",
      "why": "A travel anchor for Precious Cargo. It helps you return without retracing the entire road.",
      "requirements": "Reach the signpost safely; it is an orientation stop, not a combat reward.",
      "reward": "A reusable travel reference.",
      "sections": [
        [
          "Location",
          "Near Sawmill. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Reach the signpost safely; it is an orientation stop, not a combat reward."
        ],
        [
          "Action",
          "Approach the signpost to discover it in-game. Use discovered signposts for fast travel when you need to return along this route. Mark this guide entry once visited."
        ],
        [
          "Reward",
          "A reusable travel reference."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/signpost-4"
    },
    "signpost-5": {
      "completionDefinition": "Discovered — the fast-travel signpost was unlocked in game.",
      "name": "Mill signpost",
      "home": "hub-temerian",
      "view": "activity-signpost-5",
      "type": "discovery",
      "category": "exploration",
      "intro": "Mill signpost is one of the stops along this part of the Path.",
      "why": "A travel anchor for Temerian Valuables. It helps you return without retracing the entire road.",
      "requirements": "Reach the signpost safely; it is an orientation stop, not a combat reward.",
      "reward": "A reusable travel reference.",
      "sections": [
        [
          "Location",
          "Near Mill. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Reach the signpost safely; it is an orientation stop, not a combat reward."
        ],
        [
          "Action",
          "Approach the signpost to discover it in-game. Use discovered signposts for fast travel when you need to return along this route. Mark this guide entry once visited."
        ],
        [
          "Reward",
          "A reusable travel reference."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/signpost-5"
    },
    "signpost-6": {
      "completionDefinition": "Discovered — the fast-travel signpost was unlocked in game.",
      "name": "Nilfgaardian Garrison signpost",
      "home": "hub-hunt",
      "view": "activity-signpost-6",
      "type": "discovery",
      "category": "exploration",
      "intro": "Nilfgaardian Garrison signpost is one of the stops along this part of the Path.",
      "why": "A travel anchor for The Beast of White Orchard. It helps you return without retracing the entire road.",
      "requirements": "Reach the signpost safely; it is an orientation stop, not a combat reward.",
      "reward": "A reusable travel reference.",
      "sections": [
        [
          "Location",
          "Near Nilfgaardian Garrison. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Reach the signpost safely; it is an orientation stop, not a combat reward."
        ],
        [
          "Action",
          "Approach the signpost to discover it in-game. Use discovered signposts for fast travel when you need to return along this route. Mark this guide entry once visited."
        ],
        [
          "Reward",
          "A reusable travel reference."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/signpost-6"
    },
    "signpost-7": {
      "completionDefinition": "Discovered — the fast-travel signpost was unlocked in game.",
      "name": "Cackler Bridge signpost",
      "home": "hub-missing",
      "view": "activity-signpost-7",
      "type": "discovery",
      "category": "exploration",
      "intro": "Cackler Bridge signpost is one of the stops along this part of the Path.",
      "why": "A travel anchor for Missing in Action. It helps you return without retracing the entire road.",
      "requirements": "Reach the signpost safely; it is an orientation stop, not a combat reward.",
      "reward": "A reusable travel reference.",
      "sections": [
        [
          "Location",
          "Near Cackler Bridge. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Reach the signpost safely; it is an orientation stop, not a combat reward."
        ],
        [
          "Action",
          "Approach the signpost to discover it in-game. Use discovered signposts for fast travel when you need to return along this route. Mark this guide entry once visited."
        ],
        [
          "Reward",
          "A reusable travel reference."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/signpost-7"
    },
    "signpost-8": {
      "completionDefinition": "Discovered — the fast-travel signpost was unlocked in game.",
      "name": "Crossroads signpost",
      "home": "hub-missing",
      "view": "activity-signpost-8",
      "type": "discovery",
      "category": "exploration",
      "intro": "Crossroads signpost is one of the stops along this part of the Path.",
      "why": "A travel anchor for Missing in Action. It helps you return without retracing the entire road.",
      "requirements": "Reach the signpost safely; it is an orientation stop, not a combat reward.",
      "reward": "A reusable travel reference.",
      "sections": [
        [
          "Location",
          "Near Crossroads. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Reach the signpost safely; it is an orientation stop, not a combat reward."
        ],
        [
          "Action",
          "Approach the signpost to discover it in-game. Use discovered signposts for fast travel when you need to return along this route. Mark this guide entry once visited."
        ],
        [
          "Reward",
          "A reusable travel reference."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/signpost-8"
    },
    "signpost-9": {
      "completionDefinition": "Discovered — the fast-travel signpost was unlocked in game.",
      "name": "Ford signpost",
      "home": "hub-missing",
      "view": "activity-signpost-9",
      "type": "discovery",
      "category": "exploration",
      "intro": "Ford signpost is one of the stops along this part of the Path.",
      "why": "A travel anchor for Missing in Action. It helps you return without retracing the entire road.",
      "requirements": "Reach the signpost safely; it is an orientation stop, not a combat reward.",
      "reward": "A reusable travel reference.",
      "sections": [
        [
          "Location",
          "Near Ford. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Reach the signpost safely; it is an orientation stop, not a combat reward."
        ],
        [
          "Action",
          "Approach the signpost to discover it in-game. Use discovered signposts for fast travel when you need to return along this route. Mark this guide entry once visited."
        ],
        [
          "Reward",
          "A reusable travel reference."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/signpost-9"
    },
    "signpost-10": {
      "completionDefinition": "Discovered — the fast-travel signpost was unlocked in game.",
      "name": "Ransacked Village signpost",
      "home": "hub-missing",
      "view": "activity-signpost-10",
      "type": "discovery",
      "category": "exploration",
      "intro": "Ransacked Village signpost is one of the stops along this part of the Path.",
      "why": "A travel anchor for Missing in Action. It helps you return without retracing the entire road.",
      "requirements": "Reach the signpost safely; it is an orientation stop, not a combat reward.",
      "reward": "A reusable travel reference.",
      "sections": [
        [
          "Location",
          "Near Ransacked Village. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Reach the signpost safely; it is an orientation stop, not a combat reward."
        ],
        [
          "Action",
          "Approach the signpost to discover it in-game. Use discovered signposts for fast travel when you need to return along this route. Mark this guide entry once visited."
        ],
        [
          "Reward",
          "A reusable travel reference."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/signpost-10"
    },
    "smugglers-1": {
      "completionDefinition": "Listed cache containers looted.",
      "name": "Smugglers’ cache · South of Ford",
      "home": "hub-devil",
      "view": "activity-smugglers-1",
      "type": "discovery",
      "category": "exploration",
      "intro": "Smugglers’ cache · South of Ford is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Contract: Devil by the Well. Check the approach and your supplies before committing.",
      "requirements": "Check shore access and threats; if diving, watch your breath and leave a clear return route.",
      "reward": "Recovered goods; contents vary.",
      "sections": [
        [
          "Location",
          "South of Ford. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Check shore access and threats; if diving, watch your breath and leave a clear return route."
        ],
        [
          "Action",
          "Use Witcher Senses to locate the marked containers. Collect the goods and return to safe ground before sorting equipment."
        ],
        [
          "Reward",
          "Recovered goods; contents vary."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/smugglers-1"
    },
    "spoils-1": {
      "completionDefinition": "Listed cache containers looted.",
      "name": "Spoils of war · East of Nilfgaardian Garrison",
      "home": "hub-hunt",
      "view": "activity-spoils-1",
      "type": "discovery",
      "category": "exploration",
      "intro": "Spoils of war · East of Nilfgaardian Garrison is one of the stops along this part of the Path.",
      "why": "A suggested detour while following The Beast of White Orchard. Check the approach and your supplies before committing.",
      "requirements": "Check shore access and threats; if diving, watch your breath and leave a clear return route.",
      "reward": "Recovered goods; contents vary.",
      "sections": [
        [
          "Location",
          "East of Nilfgaardian Garrison. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "Check shore access and threats; if diving, watch your breath and leave a clear return route."
        ],
        [
          "Action",
          "Use Witcher Senses to locate the marked containers. Collect the goods and return to safe ground before sorting equipment."
        ],
        [
          "Reward",
          "Recovered goods; contents vary."
        ]
      ],
      "sources": [
        "https://github.com/witcher3map/witcher3map/blob/437241a978a13a1ca9114301d9ef887fadf4f260/assets/scripts/custom/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/spoils-1"
    },
    "cow-pasture-warning": {
      "completionDefinition": "Read warning — acknowledged the warning. Cow farming is never required.",
      "name": "Cow pasture · farming warning",
      "home": "hub-arrival",
      "view": "activity-cow-pasture-warning",
      "type": "discovery",
      "category": "exploration",
      "intro": "Cow pasture · farming warning is one of the stops along this part of the Path.",
      "why": "A suggested detour while following Lilac and Gooseberries. Check the approach and your supplies before committing.",
      "requirements": "This is a caution, not a recommended early combat encounter.",
      "reward": "Avoid an unnecessary high-risk fight.",
      "sections": [
        [
          "Location",
          "Near Woesong Bridge. Open the local map for the recorded position; follow terrain and roads when approaching."
        ],
        [
          "Preparation",
          "This is a caution, not a recommended early combat encounter."
        ],
        [
          "Action",
          "Do not repeatedly farm the village cows for income. That can trigger an overlevelled defensive monster; leave the area rather than treating it as part of this route."
        ],
        [
          "Reward",
          "Avoid an unnecessary high-risk fight."
        ]
      ],
      "sources": [
        "https://github.com/root-BB/witcher3map/blob/b023eb7e882915308dfd4e20cb75249005902d5a/files/scripts/mapdata-white_orchard.js"
      ],
      "map": true,
      "locationMap": "#whiteorchard-map/cow-pasture-warning"
    }
  },
  "hubs": [
    {
      "id": "hub-arrival",
      "name": "Lilac and Gooseberries",
      "label": "MAIN STORY / ARRIVAL",
      "group": 0,
      "items": [
        "q-lilac",
        "gwent-start",
        "q-firestarter",
        "q-missing",
        "q-pan",
        "q-cargo",
        "poi-4",
        "shopkeeper-1",
        "signpost-3",
        "cow-pasture-warning"
      ]
    },
    {
      "id": "hub-firestarter",
      "name": "Twisted Firestarter",
      "label": "SECONDARY QUEST",
      "group": 0,
      "side": true,
      "items": [
        "loc-forge",
        "q-firestarter",
        "grindstone-village"
      ]
    },
    {
      "id": "hub-missing",
      "name": "Missing in Action",
      "label": "SECONDARY QUEST",
      "group": 0,
      "side": true,
      "items": [
        "q-missing",
        "poi-1",
        "monsternest-3",
        "pop-cackler",
        "monsternest-2",
        "banditcamp-6",
        "guarded-5",
        "signpost-7",
        "signpost-8",
        "signpost-9",
        "signpost-10"
      ]
    },
    {
      "id": "hub-pan",
      "name": "A Frying Pan, Spick and Span",
      "label": "SECONDARY QUEST",
      "group": 0,
      "side": true,
      "items": [
        "q-pan",
        "q-cargo"
      ]
    },
    {
      "id": "hub-cargo",
      "name": "Precious Cargo",
      "label": "SECONDARY QUEST",
      "group": 0,
      "side": true,
      "items": [
        "q-cargo",
        "pop-sawmill",
        "abandoned-2",
        "banditcamp-3",
        "grindstone-3",
        "guarded-2",
        "shopkeeper-2",
        "signpost-4"
      ]
    },
    {
      "id": "hub-hunt",
      "name": "The Beast of White Orchard",
      "label": "MAIN STORY / GRIFFIN HUNT",
      "group": 1,
      "items": [
        "q-death",
        "q-devil",
        "q-viper",
        "q-beast",
        "q-dirty",
        "pop-cemetery",
        "q-temerian",
        "armourerstable-1",
        "blacksmith-1",
        "grindstone-4",
        "guarded-4",
        "signpost-6",
        "spoils-1"
      ]
    },
    {
      "id": "hub-death",
      "name": "On Death’s Bed",
      "label": "SECONDARY QUEST / LEVEL 2",
      "group": 1,
      "side": true,
      "items": [
        "q-death"
      ]
    },
    {
      "id": "hub-devil",
      "name": "Contract: Devil by the Well",
      "label": "CONTRACT / LEVEL 2",
      "group": 1,
      "side": true,
      "items": [
        "q-devil",
        "pop-bear",
        "pop-bridge",
        "abandoned-1",
        "banditcamp-1",
        "banditcamp-2",
        "guarded-1",
        "herbalist-2",
        "signpost-1",
        "signpost-2",
        "smugglers-1"
      ]
    },
    {
      "id": "hub-viper",
      "name": "Scavenger Hunt: Viper School Gear",
      "label": "TREASURE HUNT / LEVEL 6",
      "group": 1,
      "side": true,
      "items": [
        "pop-cemetery",
        "q-viper",
        "pop-north",
        "monsternest-1",
        "guarded-3"
      ]
    },
    {
      "id": "hub-temerian",
      "name": "Temerian Valuables",
      "label": "TREASURE HUNT / LEVEL 4",
      "group": 1,
      "side": true,
      "items": [
        "q-temerian",
        "q-deserter",
        "signpost-5"
      ]
    },
    {
      "id": "hub-deserter",
      "name": "Deserter Gold",
      "label": "TREASURE HUNT / LEVEL 3",
      "group": 1,
      "side": true,
      "items": [
        "q-deserter",
        "q-temerian"
      ]
    },
    {
      "id": "hub-dirty",
      "name": "Dirty Funds",
      "label": "TREASURE HUNT / LEVEL 2",
      "group": 1,
      "side": true,
      "items": [
        "q-dirty"
      ]
    },
    {
      "id": "hub-departure",
      "name": "The Incident at White Orchard",
      "label": "MAIN STORY / DEPARTURE",
      "group": 2,
      "items": [
        "q-firestarter",
        "q-missing",
        "q-pan",
        "q-cargo",
        "q-death",
        "departure-review",
        "q-incident"
      ],
      "mapAnchor": "gwent-start"
    }
  ],
  "groups": [
    "Arrival and first leads",
    "Preparing the griffin hunt",
    "Before the road"
  ]
};
