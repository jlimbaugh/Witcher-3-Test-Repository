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
      "requirements": "Available after the Kaer Morhen tutorial.",
      "reward": "Access to the griffin investigation.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/lilacandgooseberries.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Ride with Vesemir",
          "text": "Defeat the opening ghouls. Before mounting up, use Witcher Senses to recover the sparkling crystal skull near the camp. Follow Vesemir and help the merchant at the ford."
        },
        {
          "id": "2",
          "title": "Ask at the inn",
          "text": "Speak with Elsa and the patrons about Yennefer. Take the scholar’s Gwent lesson if you want to begin collecting cards. Read the village notice board on your way out."
        },
        {
          "id": "3",
          "title": "Follow the garrison lead",
          "text": "Ride to the Nilfgaardian garrison and speak to its commander. His request opens The Beast of White Orchard. Return to the tree for the hunt and its optional branches."
        },
        {
          "id": "4",
          "title": "Leave only when ready",
          "text": "After the griffin contract, return to the inn when you are ready to advance.",
          "warning": "Before speaking to Vesemir after the hunt: finish your intended local errands. Open the departure hub first; this conversation begins the exit sequence."
        }
      ],
      "level": null,
      "map": true,
      "category": "side"
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
      "reward": "Crossbow, trophy, experience and a choice of payment.",
      "sources": [
        "https://www.gamebanshee.com/thewitcher3/walkthrough/thebeastofwhiteorchard.php"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Take the contract",
          "text": "Speak to the commander, then follow the herbalist and hunter objectives."
        },
        {
          "id": "2",
          "title": "Visit Tomira",
          "text": "Ask about buckthorn and gather it underwater in the marked river area. Check On Death’s Bed while you are at the cottage."
        },
        {
          "id": "3",
          "title": "Follow Mislav",
          "text": "Find the hunter using his tracks. Help with the wild dogs, inspect the attacked patrol, then follow the tracks to the nest and examine it."
        },
        {
          "id": "4",
          "title": "Prepare with Vesemir",
          "text": "Report to Vesemir. Prepare Thunderbolt, repair equipment and meet him at the ambush. He gives you the crossbow."
        },
        {
          "id": "5",
          "title": "Fight and report",
          "text": "Dodge the griffin’s attacks and use short openings. Follow it to the Mill when it retreats, finish the fight and loot the trophy. Report to the commander.",
          "spoiler": "Accept the offered money or refuse it for more experience. Neither choice prevents the story from continuing.",
          "warning": "After reporting, the inn conversation with Vesemir advances departure. Review the final hub before taking that step."
        }
      ],
      "level": 3,
      "map": true,
      "category": "side"
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
      "reward": "Story progression toward Vizima.",
      "sources": [
        "https://www.witcher.tools/quests/the-incident-at-white-orchard"
      ],
      "stages": [
        {
          "id": "1",
          "title": "Review first",
          "text": "Open the departure review before talking to Vesemir.",
          "warning": "The inn conversation starts the departure sequence. Finish Missing in Action, Twisted Firestarter and On Death’s Bed first if you want them completed."
        },
        {
          "id": "2",
          "title": "Speak to Vesemir",
          "text": "When ready, speak to Vesemir inside the inn and follow the scene.",
          "spoiler": "A confrontation turns into a fight. Defeat the attackers and continue through the meeting with Yennefer; the story moves toward Vizima."
        }
      ],
      "level": 2,
      "map": true,
      "category": "side"
    },
    "abandoned-1": {
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
