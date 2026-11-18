'use strict';

(function (root) {
  root.PhoenixVelenQuestCards = {
    baron: {
      art:'art-velen/baron.webp',
      briefing: 'Follow Hendrik’s lead to Crow’s Perch and find out what the Baron knows about Ciri.',
      completion: 'Finish the audience with the Baron. The handoff is Ciri’s Story: The King of the Wolves.',
      sources: [
        'https://www.witcher.tools/quests/bloody-baron',
        'https://witcher.fandom.com/wiki/Bloody_Baron_(quest)'
      ],
      stages: [
        {
          title: 'Approach Crow’s Perch',
          place: 'Castle Village',
          warning: 'The inn encounter determines how you enter Crow’s Perch. Follow the route your game presents.',
          actions: [
            'Follow the quest marker to Crow’s Perch.',
            'If the guards admit you, follow the sergeant. If they refuse entry, find the old villager in the settlement or locate the shrine yourself.'
          ],
          note: 'The villager offers directions for 15 crowns. Both approaches lead to the same audience.'
        },
        {
          title: 'Enter the keep',
          place: 'Crow’s Perch',
          actions: [
            'If admitted, continue with the escort to the Baron.',
            'If turned away, find the cave entrance at the water by the shrine. Swim through, follow the cave and climb out through the old well.',
            'On the cave route, be ready for a water hag. Continue to the Baron when you reach the courtyard.'
          ]
        },
        {
          title: 'Speak with the Baron',
          links: [['Ciri’s Room','ciris-room']],
          place: 'Baron’s chambers',
          actions: [
            'Ask the Baron about Ciri and finish the conversation.',
            'When control passes to Ciri, continue in Ciri’s Story: The King of the Wolves.'
          ]
        }
      ]
    },
    witch: {
      art:'art-velen/witch.webp',
      briefing: 'Follow the second lead from Hendrik’s notes to Midcopse and find the witch’s cottage.',
      completion: 'Finish the conversation with Keira about Ciri and the masked mage. Continue in Wandering in the Dark.',
      sources: [
        'https://www.witcher.tools/quests/hunting-a-witch',
        'https://www.gamebanshee.com/thewitcher3/walkthrough/huntingawitch.php'
      ],
      stages: [
        {
          title: 'Find a lead in Midcopse',
          place: 'Midcopse',
          actions: [
            'Visit during daylight. Listen to the women by the fire from far enough away that they keep talking, or ask a villager for directions.',
            'If you already know the cottage’s location, ride there directly.'
          ],
          note: 'If you ask the woman’s husband, you can spend 50 crowns or use Axii with rank 1 Delusion. Eavesdropping costs nothing.'
        },
        {
          title: 'Follow the trail to the cottage',
          place: 'North of Midcopse',
          actions: [
            'Follow the marked trail past the pond, the lone boulder and the abandoned cart.',
            'Reach the cottage and let the conversation with the waiting villagers play out.'
          ],
          note: 'Watch for nekkers along the approach.'
        },
        {
          title: 'Search the cottage',
          place: 'Forest Hut',
          actions: [
            'Enter the cottage and use Witcher Senses.',
            'Interact with the skull to open the portal, then step through.'
          ]
        },
        {
          title: 'Talk to Keira',
          links: [['Wandering in the Dark','wandering-in-the-dark']],
          place: 'Beyond the portal',
          actions: [
            'Head up the steps to Keira and ask about Ciri.',
            'Finish the conversation about the masked mage. Travel with Keira now or arrange to meet her at the ruins.'
          ],
          note: 'If you need supplies or repairs, meet her later so you can prepare for Wandering in the Dark.'
        }
      ]
    }
  };
  Object.assign(root.PhoenixVelenQuestCards, {
    princess: {
      art:'art-velen/princess.webp',
      name:'A Princess in Distress', kind:'Main quest', level:5, place:'Pellar’s hut near Blackbough',
      briefing:'Find Princess so the Pellar can continue the investigation into Anna and Tamara.',
      start:'Speak to the Pellar about Anna’s talisman during Family Matters.',
      completion:'Bring Princess back and speak with the Pellar to resume Family Matters.',
      sources:['https://www.witcher.tools/quests/a-princess-in-distress'],
      stages:[
        {title:'Find Princess',place:'Woods near the Pellar’s hut',actions:['Take and equip the Pellar’s bell.','Follow the tracks and bleating with Witcher Senses. Clear any wolves on the trail.']},
        {title:'Bring Princess home',place:'Woods and Pellar’s hut',actions:['Ring the bell close to Princess and repeat when she strays.','Protect her from the bear near its cave, then lead her to the Pellar and speak with him.']}
      ]
    },
    'ciris-room': {
      art:'art-velen/ciris-room.webp',
      name:'Ciri’s Room', kind:'Side quest', level:5, place:'Crow’s Perch',
      briefing:'Search Ciri’s old room and speak with Gretka about her stay.',
      start:'Look for the quest after hearing the Baron’s first account of Ciri.',
      completion:'Read the book from Ciri’s room and give Gretka her spinning top.',
      sources:['https://www.gamebanshee.com/thewitcher3/walkthrough/cirisroom.php','https://witcher.fandom.com/wiki/Ciri%27s_Room'],
      stages:[
        {title:'Search Ciri’s room',place:'Crow’s Perch, across from the kitchen',warning:'Finish this quest before starting The Isle of Mists.',actions:['Use Witcher Senses to find the spinning top, discarded clothes and the book.','Collect the top and read The Natural Obscurity of Curses from your inventory.']},
        {title:'Speak with Gretka',place:'Kitchen at Crow’s Perch',actions:['Cross the hall and ask Gretka about Ciri.','Return the spinning top to Gretka.']}
      ]
    },
    'wandering-in-the-dark': {
      art:'art-velen/wandering-in-the-dark.webp',
      name:'Wandering in the Dark', kind:'Main quest', place:'Elven ruins',
      briefing:'Explore the elven mage’s ruins with Keira and follow the Wild Hunt.',
      start:'At the end of Hunting a Witch, travel with Keira or meet her at the ruins.',
      completion:'Hear the mage’s final message and clear the illusory exit with the Eye of Nehaleni.',
      sources:['https://www.gamebanshee.com/thewitcher3/walkthrough/wanderinginthedark.php'],
      stages:[
        {title:'Regroup with Keira',place:'Ruins entrance and rat chamber',warning:'Avoid the poison gas and keep open flames away from it.',actions:['Enter the ruins with Keira. If you use her first portal, it separates you from her.','Follow her voice and the quest marker. Destroy the two rat nests with Igni or bombs.']},
        {title:'Trace the mage’s signs',place:'Projection and flooded chambers',actions:['Follow the swallow markings to the next projection.','Find both horse symbols along the submerged route and the climb back to Keira.','Examine the swallow beside the portal, pass through, and defeat the golem.']},
        {title:'Survive the White Frost',place:'Wild Hunt chambers',actions:['Activate the next portal at its swallow symbol.','Stay inside Keira’s shield and deal with the hounds while she closes the rifts.','Fight Nithral. When he shields himself, clear the summoned hounds, then attack again when his shield drops.']},
        {title:'Find the way out',place:'Final projection and ruins exit',actions:['Hear the final projection’s message about Crookback Bog.','Examine the illusory doorway and use the Eye of Nehaleni Keira gives you.','Agree to help with the lamp if you want to continue that side quest before leaving.'],links:[['Magic Lamp','magic-lamp'],['Ladies of the Wood','ladies-of-the-wood']]}
      ]
    },
    'magic-lamp': {
      art:'art-velen/magic-lamp.webp',
      name:'Magic Lamp', kind:'Side quest', place:'Elven ruins',
      briefing:'Help Keira find the lamp promised to her by the elven mage.',
      start:'Agree to help when Keira asks at the end of Wandering in the Dark.',
      completion:'Follow Keira out of the ruins after she retrieves the lamp.',
      sources:['https://www.gamebanshee.com/thewitcher3/walkthrough/magiclamp.php'],
      stages:[
        {title:'Read the statue riddle',place:'Statue chamber',actions:['Follow Keira to the locked door and examine its inscription.','Use the instruments and dogs to distinguish the four statues.']},
        {title:'Open the door',place:'Statue chamber',actions:['Face the statues and number them from left to right.','Light them in this order: third, second, fourth, first.'],warning:'A wrong lighting order summons a wraith.'},
        {title:'Recover the lamp and leave',place:'Sepulcher and ruins exit',actions:['Follow Keira through the door so she can collect the lamp.','Read the Sage’s Notes nearby if you want the explanation, then leave the ruins with Keira.']}
      ]
    },
    'ladies-of-the-wood': {
      art:'art-velen/ladies-of-the-wood.webp',
      name:'Ladies of the Wood', kind:'Main quest', place:'Crookback Bog',
      briefing:'Follow Ciri’s trail to the orphans and learn what the Crones know.',
      start:'Read the book Keira gives you during Wandering in the Dark.',
      completion:'Resolve the Hillock, return to the ealdorman, and hear the Crones’ account.',
      sources:['https://www.gamebanshee.com/thewitcher3/walkthrough/ladiesofthewood.php'],
      stages:[
        {title:'Follow the Trail of Treats',place:'Crookback Bog shrine',actions:['Use Witcher Senses to follow the treats from the shrine to the orphan village.','Ask about Johnny. Offer the children food or find them in hide-and-seek to distract Gran, then speak with Travik.']},
        {title:'Help Johnny recover his voice',place:'Johnny’s burrow and the raven’s nest',actions:['Clear the bog creatures and follow the footprints to Johnny’s burrow.','Follow Johnny, climb to the nest, and take the sealed bottle and raven feather.','Return the bottle to Johnny and escort him back to Gran.'],note:'Keep the raven feather for the Hillock if you choose that route.'},
        {title:'Hear the Crones’ request',place:'Orphan village and Downwarren',actions:['Follow Gran to the tapestry and hear the Crones’ offer.','Show the dagger to Downwarren’s ealdorman, then investigate the Whispering Hillock.'],links:[['The Whispering Hillock','whispering-hillock']]},
        {title:'Return with the outcome',place:'Downwarren and the orphan village',actions:['Return to Downwarren after resolving the Hillock and speak with the ealdorman.','Take the payment he gives you to the Crones and listen to their account of Ciri.']}
      ]
    },
    'whispering-hillock': {
      art:'art-velen/whispering-hillock.webp',
      name:'The Whispering Hillock', kind:'Quest', place:'The Ancient Oak',
      briefing:'Find what lives beneath the oak and decide how to resolve the spirit’s request.',
      start:'Follow the ealdorman’s lead during Ladies of the Wood. This route assumes you visit the Hillock in that order.',
      completion:'Resolve the spirit’s fate and return to the ealdorman when Ladies of the Wood directs you back.',
      sources:['https://www.gamebanshee.com/thewitcher3/walkthrough/thewhisperinghillock.php'],
      stages:[
        {title:'Reach the spirit',place:'Cave under the Hillock',actions:['Approach the oak and locate the cave entrance. Watch for wolves and the werewolf.','Swim through the cave and speak to the spirit at the heart of the tree.']},
        {title:'Choose how to resolve the spirit',place:'Heart of the tree',warning:'The choice can affect the orphans, Downwarren, Anna and the Baron. Save before committing if you want to revisit your decision.',actions:['To fight, deal with the endrega and strike the heart when the roots open.','To pursue the ritual, gather the raven feather and the woman’s remains. Use Axii on a black mare and ride it to the rear cave entrance.','At the ritual, decide whether to free the spirit, trick it, or attack.'],note:'The release route and consequences depend on when you approach the Hillock. These instructions follow the Downwarren objective.'}
      ]
    }
  });

  const main='Main quest', side='Side quest';
  const field='https://www.witcher.tools/quests/';
  const guide='https://www.gamebanshee.com/thewitcher3/walkthrough/';
  Object.assign(root.PhoenixVelenQuestCards,{
    'king-of-the-wolves': {
      art:'art-velen/king-of-the-wolves.webp',
      name:'Ciri’s Story: The King of the Wolves',kind:main,place:'Riverbed near Lindenvale',
      briefing:'Play as Ciri and help Gretka get through wolf country.',
      start:'Hear the Baron’s first account in Bloody Baron.',
      completion:'Defeat the Wolf King and finish the scene that brings Ciri and Gretka to Crow’s Perch.',
      sources:[field+'ciris-story-the-king-of-the-wolves'],
      stages:[
        {title:'Rescue Gretka',place:'Riverbed',actions:['Follow the riverbed and defeat the wolves beneath Gretka’s tree.','Talk her down and follow her toward Lindenvale. Clear the packs along the route.']},
        {title:'Identify the monster and prepare',place:'Body in the riverbed',actions:['Examine the victim’s chest, leg and belly. Identify the werewolf.','Gather the ingredients the quest marks. For the werewolf oil, collect three wolfsbane, two fool’s parsley, a wolf’s liver and dog tallow.']},
        {title:'Defeat the Wolf King',place:'Beyond the cave',actions:['Follow Gretka through the cave. Draw the werewolf away from the villager and defeat it.','Finish the conversation with the survivor.'],links:[['Family Matters','family-matters'],['Ciri’s Room','ciris-room']]}
      ]
    },
    'family-matters': {
      art:'art-velen/family-matters.webp',
      name:'Family Matters',kind:main,place:'Crow’s Perch',
      briefing:'Investigate the disappearance of Anna and Tamara while the Baron fills in Ciri’s story.',
      start:'Continue the conversation after the Baron’s first Ciri flashback.',
      completion:'Report Anna’s fate to the Baron and finish his final flashback.',
      sources:[guide+'familymatters.php'],
      stages:[
        {title:'Search the rooms and consult the Pellar',place:'Crow’s Perch and Blackbough',actions:['Search Anna’s and Tamara’s rooms with Witcher Senses. Follow the scent to the talisman and ask the Baron about it.','Visit the Pellar near Blackbough. Deal with the men outside, then show him the talisman.','Find his goat and return for the augury.'],links:[['A Princess in Distress','princess']]},
        {title:'Resolve the botchling encounter',place:'Crow’s Perch',actions:['Return to the burning keep. Help Oswin and the horses if you choose, then confront the Baron.','At the burial site, decide whether to lift the curse or kill the botchling.','To lift the curse, escort the Baron with the child, fight off wraiths, use Axii when it agitates and wait at the grave after the burial. To kill it, take its blood to the Pellar and protect the ritual while keeping the fires lit.']},
        {title:'Follow the trail to Voytek',place:'Smokehouse and fisherman’s hut',actions:['Follow the lubberkin and inspect the smokehouse clues and dead horse, or follow the location learned through the Pellar’s ritual.','Question Voytek and report back at Crow’s Perch to hear the next part of Ciri’s story.','Visit Tamara in Oxenfurt if desired.'],links:[['Ciri’s Story: The Race','ciris-race']]},
        {title:'Bring the Baron news of Anna',place:'Crookback Bog and Crow’s Perch',actions:['Complete the witch and Crones investigation to learn what happened to Anna.','Tell the Baron what you learned. Finish the last Ciri flashback and hear the Baron’s request.'],links:[['Ladies of the Wood','ladies-of-the-wood'],['Ciri’s Story: Out of the Shadows','out-of-the-shadows'],['Return to Crookback Bog','return-to-crookback-bog']]}
      ]
    },
    'ciris-race': {
      art:'art-velen/ciris-race.webp',
      name:'Ciri’s Story: The Race',kind:main,place:'Abandoned Tower',
      briefing:'Ride against the Baron during his second flashback.',
      start:'Report to the Baron after questioning Voytek in Family Matters.',
      completion:'Reach the tower and watch the basilisk interrupt the race.',
      sources:[field+'ciris-story-the-race'],
      stages:[{title:'Race to the tower',place:'Velen woodland track',actions:['Finish the wager scene and ride the marked route to the tower.','Keep to the track and use a gallop on clear stretches. Either finish order advances the story.'],links:[['Family Matters','family-matters']]}]
    },
    'out-of-the-shadows': {
      art:'art-velen/out-of-the-shadows.webp',
      name:'Ciri’s Story: Out of the Shadows',kind:main,place:'Abandoned Tower',
      briefing:'Resume Ciri’s encounter with the basilisk and rescue the Baron.',
      start:'Tell the Baron what happened to Anna during Family Matters.',
      completion:'Finish the rescue and Ciri’s farewell at Crow’s Perch.',
      sources:[field+'ciris-story-out-of-the-shadows'],
      stages:[
        {title:'Fight the basilisk',place:'Foot of the tower',actions:['Dodge while the basilisk is airborne. Attack when it lands and turns toward the Baron.','After it takes the Baron, approach and climb the rocks at the tower to trigger the rescue.']},
        {title:'Finish the Baron’s account',place:'Crow’s Perch',actions:['Watch Ciri’s departure for Novigrad.','Back as Geralt, hear the Baron’s plan to return to the bog.'],links:[['Return to Crookback Bog','return-to-crookback-bog']]}
      ]
    },
    'return-to-crookback-bog': {
      art:'art-velen/return-to-crookback-bog.webp',
      name:'Return to Crookback Bog',kind:side,level:9,place:'Downwarren and Crookback Bog',
      briefing:'Join the Baron and Tamara in their search for Anna.',
      start:'Take up the Baron’s request after Family Matters and meet him at Downwarren.',
      completion:'Resolve Anna’s fate and collect the reward at Crow’s Perch.',
      sources:[guide+'returntocrookbackbog.php',field+'return-to-crookback-bog'],
      stages:[
        {title:'Meet the Baron and reach Anna',place:'Downwarren and orphan village',warning:'Finish this quest before starting The Isle of Mists.',actions:['Speak with the ealdorman and follow the Baron through the bog.','Help the witch hunters in the orphan village, then defend the group against the next attack, including the fiend.']},
        {title:'Resolve Anna’s condition',place:'Orphan village',actions:['If Anna is human, let the Baron and Tamara finish the scene.','If Anna is cursed, look for Johnny near his burrow. Follow his tracks if he is gone, then search the cellar under the Crones’ tapestry.','Choose the doll with the hollyhock flower and return to Anna.'],note:'The Hillock outcome determines which route you get. The right doll gives Anna time for a farewell, but does not save her life.'},
        {title:'Collect your payment',place:'Crow’s Perch',actions:['Return to the keep. Follow the quest marker and collect payment from the Baron or his sergeant as the outcome dictates.']}
      ]
    },
    'fleeing-the-bog': {
      art:'art-velen/fleeing-the-bog.webp',
      name:'Ciri’s Story: Fleeing the Bog',kind:main,level:5,place:'Crookback Bog',
      briefing:'Escape the Crones’ territory as Ciri.',
      start:'Hear the Crones’ account near the end of Ladies of the Wood.',
      completion:'Reach the marked escape point and return to Geralt’s conversation.',
      sources:[field+'ciris-story-fleeing-the-bog'],
      stages:[{title:'Run through the bog',place:'Crones’ village and escape path',actions:['As soon as you regain control, follow the quest route away from the hut.','Use Ciri’s dodge to pass enemies and keep moving until the escape scene triggers.'],links:[['Ladies of the Wood','ladies-of-the-wood']]}]
    },
    'keira-invitation': {
      art:'art-velen/keira-invitation.webp',
      name:'An Invitation from Keira Metz',kind:side,place:'Keira’s cottage',
      briefing:'Find out why Keira invited you back after the ruins.',
      start:'After Keira’s invitation, return to her cottage near Midcopse.',
      completion:'Accept the Fyke Isle investigation and receive the lamp and xenovox.',
      sources:[guide+'aninvitationfromkeirametz.php'],
      stages:[{title:'Accept the Fyke Isle investigation',place:'Keira’s cottage',actions:['Ask Keira why she invited you.','Agree to investigate Fyke Isle. Take the magic lamp and xenovox.'],links:[['A Towerful of Mice','towerful-of-mice']]}]
    },
    'towerful-of-mice': {
      art:'art-velen/towerful-of-mice.webp',
      name:'A Towerful of Mice',kind:side,level:6,place:'Fyke Isle',
      briefing:'Investigate the hauntings at the tower and decide how to lift the curse.',
      start:'Accept Keira’s request at her cottage.',
      completion:'Lift the curse and report to Keira.',
      sources:[guide+'aninvitationfromkeirametz.php',field+'a-towerful-of-mice'],
      stages:[
        {title:'Cross to Fyke Isle',place:'Lake shore and island',warning:'Finish this quest before starting The Isle of Mists.',actions:['Cross to the island and head to the tower.','Equip the lamp and use it at the hauntings as you explore. Watch the looter’s haunting inside the tower before confronting Anabelle if you want evidence to challenge her.']},
        {title:'Find the laboratory and hear Anabelle',place:'Tower upper floors',actions:['Use Witcher Senses to locate the hidden laboratory entrance and open it.','Use the lamp to speak with Anabelle and decide whether to trust her.']},
        {title:'Lift the curse',place:'Fyke Isle and Oreton',warning:'Carrying the remains to Graham and bringing Graham to the tower lead to different outcomes.',actions:['If you accept the request, deliver Anabelle’s remains to Graham in Oreton.','If you refuse, withstand her attacks and speak with Graham. Bring him to the tower and accompany him to Anabelle.','Return to Keira after resolving the curse.'],links:[['A Favor for a Friend','favor-for-a-friend']]}
      ]
    },
    'favor-for-a-friend': {
      art:'art-velen/favor-for-a-friend.webp',
      name:'A Favor for a Friend',kind:side,level:6,place:'Hangman’s Alley',
      briefing:'Find Keira’s missing delivery and bring it back to her cottage.',
      start:'Accept Keira’s request after lifting the Fyke Isle curse.',
      completion:'Deliver the package and finish the evening with Keira.',
      sources:[guide+'afavorforafriend.php'],
      stages:[
        {title:'Find the missing package',place:'Hangman’s Alley',actions:['Use Witcher Senses to follow the wagon tracks off the road.','Take Keira’s package beside the damaged wagon. Inspect the trader’s trail if you want the optional evidence.']},
        {title:'Return to Keira',place:'Cottage and glade',actions:['Deliver the package and ride with Keira to the glade.','Finish the conversation and evening. Your answer to her invitation does not prevent the next quest.'],links:[['For the Advancement of Learning','advancement-of-learning']]}
      ]
    },
    'advancement-of-learning': {
      art:'art-velen/advancement-of-learning.webp',
      name:'For the Advancement of Learning',kind:side,level:8,place:'Fyke Isle tower',
      briefing:'Find Keira with Alexander’s research and decide what happens next.',
      start:'Follow Keira to Fyke Isle after A Favor for a Friend.',
      completion:'Resolve the confrontation outside the tower.',
      sources:[guide+'fortheadvancementoflearning.php',field+'for-the-advancement-of-learning'],
      stages:[
        {title:'Find Keira at the tower',place:'Fyke Isle',actions:['Return to the tower and speak to Keira about Alexander’s notes.']},
        {title:'Choose Keira’s destination',place:'Tower entrance',warning:'Resolve this quest before The Isle of Mists. Sending Keira to Radovid or forcing a fight can cost her life.',actions:['If you want her help later, question her plan to approach Radovid and offer her refuge at Kaer Morhen.','Finish the conversation. Letting her leave for Radovid or provoking combat resolves the quest on a different path.']}
      ]
    }
  });
  const cards=root.PhoenixVelenQuestCards;
  cards.baron.stages.at(-1).links.unshift(['Ciri’s Story: The King of the Wolves','king-of-the-wolves']);
  cards.princess.stages.at(-1).links=[['Family Matters','family-matters']];
  cards['ladies-of-the-wood'].stages.at(-1).links=[['Ciri’s Story: Fleeing the Bog','fleeing-the-bog']];
  cards['magic-lamp'].stages.at(-1).links=[['An Invitation from Keira Metz','keira-invitation']];
  cards['wandering-in-the-dark'].stages.at(-1).links.push(['An Invitation from Keira Metz','keira-invitation']);
  const contract='Witcher contract';
  Object.assign(root.PhoenixVelenQuestCards,{
    shrieker: {
      name:'Contract: Shrieker',kind:contract,level:8,place:'Crow’s Perch',
      art:'art-velen/shrieker.webp',
      briefing:'Track the cockatrice that killed Borzoy outside Crow’s Perch.',
      start:'Read the notice at Crow’s Perch, then speak with Chet and Symko.',
      completion:'Take the cockatrice trophy back to Chet and settle the payment.',
      sources:[guide+'contract-shrieker.php'],
      stages:[
        {title:'Interview Chet and Symko',place:'Crow’s Perch',actions:['Take the contract from the notice board.','Speak with Chet about the fee and ask Symko what he saw.']},
        {title:'Track the wounded cockatrice',place:'Fields outside Crow’s Perch',actions:['Use Witcher Senses at the attack site to find the blood and tracks.','Follow the trail to the cave. Equip a Samum, Grapeshot or Dancing Star before entering.']},
        {title:'Drive it out and take the trophy',place:'Cave and surrounding fields',actions:['Throw a bomb toward the ledge to flush the cockatrice from the cave.','Exit the cave, follow the creature and defeat it. Loot the trophy, then return to Chet.'],note:'Draconid Oil is useful if you have it. Choose whether to accept or waive Chet’s fee.'}
      ]
    },
    'jenny-o-the-woods': {
      name:'Contract: Jenny o’ the Woods',kind:contract,level:10,place:'Midcopse',
      art:'art-velen/jenny-o-the-woods.webp',
      briefing:'Investigate the haunting north of Midcopse and put Zula’s spirit to rest.',
      start:'Take the notice from the Midcopse board and find Ealdorman Bolko.',
      completion:'Collect the nightwraith trophy and return to Bolko.',
      sources:[guide+'contract-jennyothewoods.php','https://witchersaga.com/quests/contract-jenny-o-the-woods/'],
      stages:[
        {title:'Talk to the witnesses',place:'Midcopse',actions:['Speak to Bolko about the contract and question Agneta.','Head to the marked fields and find the cloth scrap and tracks with Witcher Senses.']},
        {title:'Identify the nightwraith',place:'Fields north of Midcopse',actions:['Follow the tracks to the blood and knife, then follow the drag marks to the shallow grave.','Read Zula’s letter. Return to Bolko and ask about the names and where the lovers met.']},
        {title:'Summon and defeat Jenny',place:'Lovers’ meeting spot',actions:['At night, interact with the fire to burn the letter and the dried blood from the knife.','Use Yrden and Specter Oil if available. Dispatch the summoned copies quickly to limit her healing.','Loot the trophy and collect the reward from Bolko.']}
      ]
    },
    'merry-widow': {
      name:'Contract: The Merry Widow',kind:contract,level:10,place:'Lindenvale',
      art:'art-velen/merry-widow.webp',
      briefing:'Investigate disturbed graves and the disappearance of the miller’s son.',
      start:'Take the cemetery notice at Lindenvale and speak with the gravedigger.',
      completion:'Bring the grave hag trophy back to the gravedigger.',
      sources:[guide+'contract-themerrywidow.php',field+'contract-the-merry-widow'],
      stages:[
        {title:'Search the cemetery',place:'Lindenvale cemetery',actions:['Ask the gravedigger about the missing child and agree on a fee.','Clear the creatures at the cemetery. Inspect the graves with Witcher Senses and follow the cadaverine scent.']},
        {title:'Find a way to lure the grave hag',place:'Abandoned cottage',actions:['Search the cottage and examine the tools, pot and skulls.','Take the quest-marked skulls and set them at the cemetery altar. Wait until nightfall.']},
        {title:'Defeat Mourntart',place:'Lindenvale cemetery',actions:['Kill the grave hag and take her trophy. Necrophage Oil can help if you have it.','Return to the gravedigger to report the outcome and collect the fee.']}
      ]
    },
    'swamp-thing': {
      name:'Contract: Swamp Thing',kind:contract,level:12,place:'Downwarren and Crookback Bog',
      art:'art-velen/swamp-thing.webp',
      briefing:'Follow Leslav’s lead to the foglet behind the disappearances in the bog.',
      start:'Read the swamp monster notice at Downwarren or speak to Leslav at his marked bog camp.',
      completion:'Take the foglet trophy to Leslav and resolve his payment.',
      sources:[guide+'contract-swampthing.php',field+'contract-swamp-thing'],
      stages:[
        {title:'Interview Leslav and inspect the trail',place:'Crookback Bog',actions:['Speak with Leslav about the fog and agree on the fee.','Use Witcher Senses on the marked bodies to identify the foglet. Keep moving through the hazardous mist.']},
        {title:'Enter the foglet’s cave',place:'Bog cave entrances',actions:['Use the Eye of Nehaleni to dispel the false rocks if you have it.','If you do not have the Eye, follow the alternative entrance to the west.'],links:[['Wandering in the Dark','wandering-in-the-dark']]},
        {title:'Kill Ignis Fatuus and collect the fee',place:'Foglet cave and Leslav’s camp',actions:['Clear the lesser foglet if encountered. Fight Ignis Fatuus, watch for attacks from the mist, and use Quen or Necrophage Oil if needed.','Take the trophy and return to Leslav. If he asks for a week to raise the payment, decide whether to wait and collect later.']}
      ]
    }
  });
  Object.assign(root.PhoenixVelenQuestCards,{
    'patrol-gone-missing': {
      name:'Contract: Patrol Gone Missing',kind:contract,level:7,place:'Nilfgaardian Army Group Center Camp',
      art:'art-velen/patrol-gone-missing.webp',
      briefing:'Find the missing Nilfgaardian scouts and track the wyvern that attacked them.',
      start:'Read the missing soldiers notice at the army camp and speak with Quartermaster Eggebracht.',
      completion:'Take the wyvern trophy and report to Eggebracht.',
      sources:[guide+'contract-patrolgonemissing.php',field+'contract-patrol-gone-missing'],
      stages:[
        {title:'Take the assignment',place:'Nilfgaardian Army Group Center Camp',actions:['Read the notice and speak to Eggebracht in the adjacent tent.','Cross the lake to the scouts’ marked camp.']},
        {title:'Follow the scouts’ trail',place:'Abandoned scout camp',actions:['Use Witcher Senses to examine the camp. Follow the tracks southwest.','Examine the poisoned corpse and follow the draconid evidence to the wyvern.']},
        {title:'Kill the wyvern and report back',place:'Wyvern territory and army camp',actions:['Defeat the wyvern and loot the trophy. Use Draconid Oil if available.','Return to Eggebracht to report the patrol’s fate and resolve the reward.'],note:'Optional before returning: follow the evidence past the wyvern to the cave and inspect the bodies. This opens dialogue about the patrol’s orders and the option to refuse payment.'}
      ]
    },
    'mysterious-tracks': {
      name:'Contract: Mysterious Tracks',kind:contract,level:20,place:'Lindenvale',
      art:'art-velen/mysterious-tracks.webp',
      briefing:'Investigate the wolf kills and lure the Howler into its lair.',
      start:'Take the notice in Lindenvale and speak to the hunter.',
      completion:'Return the Howler’s trophy to the hunter and collect the reward.',
      sources:[guide+'contract-mysterioustracks.php','https://witcher.fandom.com/wiki/Contract%3A_Mysterious_Tracks'],
      stages:[
        {title:'Track the creature',place:'Forest near Lindenvale',actions:['Examine the dead wolves and follow the tracks to the tree.','Inspect the fur and follow its scent to the high cave opening.']},
        {title:'Investigate the lair',place:'Cave below the hill',actions:['Find the accessible opening farther north and drop into the cave.','Inspect the dead fiend and the signs of a fight to identify the chort.']},
        {title:'Prepare and place the lure',place:'Hill around the cave',actions:['Make Chort Lure in Alchemy with fiend dung and two crow’s eye. Search the hill if either ingredient is missing.','Equip the lure and apply it at all four marked sites. Re-enter the cave and wait for the Howler.']},
        {title:'Defeat the Howler',place:'Cave and Lindenvale',actions:['Defeat the chort. Relict Oil and Quen can help in the tight cave.','Loot its trophy and return to the hunter for the reward.']}
      ]
    },
    'byways-murders': {
      name:'Contract: The Mystery of the Byways Murders',kind:contract,level:22,place:'Oreton and Byways',
      art:'art-velen/byways-murders.webp',
      briefing:'Find the missing Nilfgaardian patrol and uncover the vampire lair beneath Byways.',
      start:'Take the missing soldiers notice in Oreton and speak with Milan Noran.',
      completion:'Kill Sarasti, report to Bytomir and return to Noran for payment.',
      sources:[guide+'contract-themysteryofthebywaysmurders.php','https://www.gamesradar.com/witcher-3-contracts-list-guide/'],
      stages:[
        {title:'Investigate the missing patrol',place:'Oreton and Byways',actions:['Speak with Milan Noran at Oreton and travel to Byways.','Defeat the ghouls and question the villagers. Keep investigating when they blame the ghouls.']},
        {title:'Find the entrance to the ruins',place:'Byways',actions:['Inspect the dead soldiers with Witcher Senses and follow the blood scent to the locked house.','Speak with Bytomir for the key. Examine the fur and enter the tunnels below.']},
        {title:'Kill Sarasti and report back',place:'Elven ruins, Byways and Oreton',actions:['Fight the ekimmara Sarasti. Vampire Oil can help if available. Loot its trophy.','Tell Bytomir the threat has passed and collect the agreed fee from Noran.']}
      ]
    },
    'phantom-of-the-trade-route': {
      name:'Contract: Phantom of the Trade Route',kind:contract,level:23,place:'Benek',
      art:'art-velen/phantom-of-the-trade-route.webp',
      briefing:'Find Benek’s missing guides and defeat the royal wyvern guarding the trade route.',
      start:'Speak to the refugee in Benek about the missing caravan guides.',
      completion:'Loot the royal wyvern trophy and return to the refugee.',
      sources:[guide+'contract-phantomofthetraderoute.php'],
      stages:[
        {title:'Find the missing guides',place:'Benek and the cave north of the village',actions:['Talk with the refugee and follow the quest marker to the cave.','Ask the two survivors what happened. Continue toward the nests east of the cave.']},
        {title:'Clear the nests',place:'Wyvern nesting ground',actions:['Defeat the two wyverns guarding the area.','Destroy both marked nests with bombs. The second nest triggers the royal wyvern’s arrival.'],warning:'Prepare before destroying the second nest. It brings out the royal wyvern.'},
        {title:'Defeat the royal wyvern',place:'Nesting ground and Benek',actions:['Kill the royal wyvern and take its trophy. Use Draconid Oil if available.','Finish the encounter with the survivors, then return to the refugee for payment.']}
      ]
    }
  });
  Object.assign(root.PhoenixVelenQuestCards,{
    'woodland-beast': {
      name:'Contract: Woodland Beast',kind:contract,level:6,place:'Border Post and north Velen woods',
      art:'art-velen/woodland-beast.webp',
      briefing:'Investigate attacks on Redanian transports near the Pontar crossing.',
      start:'Read the notice at the Velen Border Post and speak with the guard captain.',
      completion:'Resolve the Scoia’tael encounter and report back to the guard captain.',
      sources:[guide+'contract-woodlandbeast.php'],
      stages:[
        {title:'Investigate the attacked transport',place:'Border Post and forest road',actions:['Take the notice and ask the captain where the transport was attacked.','Clear the alghouls at the site. Inspect the bodies and wagon with Witcher Senses to find the tracks.']},
        {title:'Resolve the woodland encounter',place:'Scoia’tael forest camp',actions:['Follow the footprints to the elves. Yield your weapons to speak with Vernossiel or choose to fight.','If you fight, take a squirrel tail as evidence before returning. If you spare the elves, decide what to tell the captain.']},
        {title:'Report to the captain',place:'Border Post',actions:['If you spare the elves, identify them to the captain for a pass or conceal their involvement and forgo his reward.','If you fought them, present the squirrel tail for the pass and payment.']}
      ]
    },
    'griffin-from-the-highlands': {
      name:'Contract: The Griffin from the Highlands',kind:contract,level:24,place:'Crow’s Perch and northern hills',
      art:'art-velen/griffin-from-the-highlands.webp',
      briefing:'Hunt the archgriffin and recover the gland Yoana needs to harden her armor.',
      start:'Advance Master Armorers until Yoana asks for the gland, then read the griffin notice at Crow’s Perch.',
      completion:'Hand the trophy to the quartermaster. Deliver the separate acid gland to Yoana through Master Armorers.',
      sources:[guide+'contract-thegriffinfromthehighlands.php',guide+'masterarmorers.php'],
      stages:[
        {title:'Pick up Yoana’s lead',place:'Crow’s Perch',actions:['After Yoana asks for the acid gland, take the contract from the notice board.','Go to the marked attack site north of Crow’s Perch.'],links:[['Master Armorers','master-armorers']]},
        {title:'Track and kill the archgriffin',place:'Highland nest',actions:['Use Witcher Senses to inspect the corpse and follow the blood to the nest.','Defeat the archgriffin. Hybrid Oil can help if available. Take both the trophy and the acid gland.']},
        {title:'Turn in the trophy',place:'Crow’s Perch',actions:['Speak with the quartermaster to finish the contract.','Take the gland to Yoana to continue the armor quest.'],links:[['Master Armorers','master-armorers']]}
      ]
    },
    'beast-of-honorton': {
      name:'Contract: The Beast of Honorton',kind:contract,level:25,place:'Honorton',
      art:'art-velen/beast-of-honorton.webp',
      briefing:'Investigate the notice from Honorton and find out why the village has gone quiet.',
      start:'Read the notice at Crow’s Perch and ride to Honorton.',
      completion:'Clear the alghouls and follow the journal handoff to Where the Cat and Wolf Play…',
      sources:[guide+'contract-thebeastofhonorton.php'],
      stages:[
        {title:'Follow the Honorton notice',place:'Crow’s Perch and Honorton',actions:['Collect the contract notice and ride to Honorton to find the ealdorman.','Approach the village ready to fight necrophages.']},
        {title:'Clear the village and follow the new lead',place:'Honorton',actions:['Defeat the alghouls at the scene.','When the journal changes, continue in Where the Cat and Wolf Play…'],note:'This entry stops at the journal handoff. The next card covers the investigation and the choice. There is no second monster hunt for the same scene.',links:[['Where the Cat and Wolf Play…','where-the-cat-and-wolf-play']]}
      ]
    },
    'missing-brother': {
      name:'Contract: Missing Brother',kind:contract,level:33,place:'Inn at the Crossroads and old mine',
      art:'art-velen/missing-brother.webp',
      briefing:'Find Mikkel’s trail in the old mine and defeat Harrisi, the venomous arachas.',
      start:'Read Bruno’s notice and speak with him inside the Inn at the Crossroads.',
      completion:'Take Harrisi’s trophy and settle the payment with Bruno.',
      sources:[guide+'contract-missingbrother.php','https://wiki.eso-ui.com/index.php/Witcher_3%3AContract%3A_Missing_Brother'],
      stages:[
        {title:'Find the mine and the survivor',place:'Old mine near the Inn at the Crossroads',actions:['Talk to Bruno and follow the tracks into the mine with Witcher Senses.','Find the farmer’s wife. Use the nearby lever from the south side to lower the raised bridge.']},
        {title:'Destroy the egg clusters',place:'Inner mine tunnels',actions:['Inspect the blood, remains and eggs to identify the arachas.','Sweep the marked branches for egg clusters and destroy them with Signs before approaching the lair.'],warning:'Eggs left intact can hatch during the fight. Clear the optional egg objective first if you want fewer enemies.'},
        {title:'Defeat Harrisi and return to Bruno',place:'Arachas lair and Inn at the Crossroads',actions:['Inspect Mikkel’s boot and prepare for Harrisi’s attack. Golden Oriole helps against her poison.','Loot the trophy and return to Bruno. Resolve his payment dispute through the dialogue you prefer.']}
      ]
    },
    'master-armorers': {
      name:'Master Armorers',kind:side,place:'Crow’s Perch and Undvik',
      art:'art-velen/master-armorers.webp',
      briefing:'Recover the Undvik tools and help Yoana prove her work at Crow’s Perch.',
      start:'Ask Fergus and Yoana about master armor at Crow’s Perch.',
      completion:'Help Yoana finish the armor and take part in the test to unlock her master armorer services.',
      sources:[guide+'masterarmorers.php'],
      stages:[
        {title:'Recover the smithing tools',place:'Clan Tordarroch Forge, Undvik',actions:['Speak with Fergus and Yoana about the tools. Travel to Undvik when you can reach Skellige.','Enter the cave near the forge, deal with the ice troll and collect the tools from the chest.']},
        {title:'Get the acid gland for Yoana',place:'Crow’s Perch and the highlands',actions:['Return the tools to Crow’s Perch and speak with Yoana about her armor.','Hunt the archgriffin and bring the gland to Yoana. The contract trophy goes separately to the quartermaster.'],links:[['Contract: The Griffin from the Highlands','griffin-from-the-highlands']]},
        {title:'Take part in the armor test',place:'Crow’s Perch forge',actions:['Agree to wear Yoana’s armor for the comparison. Finish the scene and confirm her services are available.','Return later if Yoana offers to finish a reward piece.'],warning:'Refusing the armor test can fail this quest and block the master armorer unlock.'}
      ]
    },
    'where-the-cat-and-wolf-play': {
      name:'Where the Cat and Wolf Play…',kind:side,level:25,place:'Honorton and Oreton',
      art:'art-velen/where-the-cat-and-wolf-play.webp',
      briefing:'Investigate Honorton, find the survivor and decide how to deal with Gaetan.',
      start:'Follow the journal after clearing Honorton in Contract: The Beast of Honorton.',
      completion:'Resolve the encounter with Gaetan and escort Millie to her aunt in Oreton.',
      sources:[guide+'contract-thebeastofhonorton.php',field+'where-the-cat-and-wolf-play'],
      stages:[
        {title:'Find and speak to the survivor',place:'Honorton',actions:['Investigate the village with Witcher Senses and follow the girl’s tracks. Pick up her doll along the trail.','Give Millie the doll or use the available Axii dialogue so she can tell you what happened.']},
        {title:'Track Gaetan and decide his fate',place:'Ritual circle and shrine',actions:['Follow the tracks east from the ritual circle to the shrine and hear Gaetan’s account.','Spare him to unlock Take What You Want, or choose to fight.'],warning:'If you fight and let Gaetan drink first, he can blind you with a bomb. Killing him closes the stash quest route.',links:[['Take What You Want','take-what-you-want']]},
        {title:'Take Millie to Oreton',place:'Honorton and Oreton',actions:['Return to Millie and escort her to her aunt in Oreton.','Decide whether to leave money for her care. A later visit can uncover her thank-you card.']}
      ]
    },
    'take-what-you-want': {
      name:'Take What You Want',kind:side,place:'Forest Hut, north of Keira’s cottage',
      art:'art-velen/take-what-you-want.webp',
      briefing:'Find Gaetan’s stash and take the steel sword he left behind.',
      start:'Spare Gaetan during Where the Cat and Wolf Play… and follow the stash lead he gives you.',
      completion:'Open Gaetan’s stash chest and recover Teigr.',
      sources:[field+'take-what-you-want','https://witcher.fandom.com/wiki/Take_What_You_Want'],
      stages:[
        {title:'Reach the stash entrance',place:'Forest Hut',warning:'This reward route is available only if Gaetan survived Honorton.',actions:['Follow the marker north of Keira’s cottage to the opening near Forest Hut.','Clear the bandits gathered around the entrance.'],links:[['Where the Cat and Wolf Play…','where-the-cat-and-wolf-play']]},
        {title:'Collect Teigr',place:'Underground hideout',actions:['Climb into the hideout and open the chest for Teigr, the letter and the crowns.'],note:'Inspecting the trophies in the alcove is optional.'}
      ]
    },
    'fall-of-the-house-of-reardon': {
      name:'The Fall of the House of Reardon',kind:side,place:'Lindenvale and Reardon Manor',
      art:'art-velen/fall-of-the-house-of-reardon.webp',
      briefing:'Help Dolores reclaim her family estate and investigate what happened there.',
      start:'Read the Lindenvale notice or speak to Dolores in the village for her lockbox key.',
      completion:'Resolve the manor encounter and report back to Dolores in Lindenvale.',
      sources:[guide+'thefallofthehouseofreardon.php','https://witcher.fandom.com/wiki/The_Fall_of_the_House_of_Reardon'],
      stages:[
        {title:'Take Dolores’s request',place:'Lindenvale',warning:'Finish this quest before starting The Isle of Mists.',actions:['Talk to Dolores about Reardon Manor and take the key to her lockbox.','Ride to the estate.']},
        {title:'Resolve the manor encounter',place:'Reardon Manor',actions:['If wraiths occupy the grounds, clear them. Yrden helps make them vulnerable.','If the grounds are trapped and Letho is alive in your world state, use Witcher Senses to check for traps and investigate the barn. Follow Ghosts of the Past for Letho’s route.'],links:[['Ghosts of the Past','ghosts-of-the-past']]},
        {title:'Report to Dolores',place:'Reardon Manor and Lindenvale tavern',note:'The lockbox and Humbert’s fate are optional. Find the sturdy barn key in the northwest house and investigate the writing in the barn to locate the lockbox. For Humbert, look behind the barn for the cellar stairs and break the weak wall inside.',actions:['Return to Dolores at the Lindenvale tavern. Geralt shares any discoveries you made about Humbert.']}
      ]
    },
    'ghosts-of-the-past': {
      name:'Ghosts of the Past',kind:side,level:6,place:'Reardon Manor and Lindenvale',
      art:'art-velen/ghosts-of-the-past.webp',
      briefing:'Help Letho deal with the bounty hunters and decide where he should go afterward.',
      start:'Visit Reardon Manor while Letho is alive in the imported or simulated Witcher 2 world state.',
      completion:'Resolve Letho’s pursuit and finish his final conversation if you accompany him.',
      sources:[field+'ghosts-of-the-past','https://allthings.how/the-witcher-3-ghosts-of-the-past-every-choice-and-how-to-save-letho/'],
      stages:[
        {title:'Meet Letho and fend off the hunters',place:'Reardon Manor barn',warning:'Finish before The Isle of Mists. If wraiths are at the manor because Letho is dead in your world state, this quest is unavailable.',actions:['Spot and avoid or disarm the traps with Witcher Senses. Inspect the ladder in the barn to reach Letho.','Fight the bounty hunters when they arrive.'],links:[['The Fall of the House of Reardon','fall-of-the-house-of-reardon']]},
        {title:'Follow Letho to Louis',place:'Louis’s camp',warning:'Agree to accompany Letho and stay with him on the ride if you want to see the route through and recruit him later.',actions:['Ride with Letho to Louis and defeat his men.','Learn where Arnout Vester’s group is and follow Letho to Lindenvale.']},
        {title:'Resolve the standoff',place:'Lindenvale',warning:'Letho is feigning death. Fighting Vester’s men ruins the ruse.',actions:['To let the ruse work, say you want no trouble and tell Vester’s group to take Letho’s medallion as proof.','When Letho wakes, offer him shelter at Kaer Morhen if you want him to join the battle there.']}
      ]
    },
    'eternal-fires-shadow': {
      name:'In the Eternal Fire’s Shadow',kind:side,level:15,place:'Devil’s Pit',
      art:'art-velen/eternal-fires-shadow.webp',
      briefing:'Investigate the sealed mine at Devil’s Pit and free it from the Red Miasmal.',
      start:'Talk to the Eternal Fire deacon outside Devil’s Pit. This quest was added in update 4.0.',
      completion:'Defeat possessed Reinald and the Red Miasmal, then resolve Reinald’s final conversation.',
      sources:['https://witcher.fandom.com/wiki/In_the_Eternal_Fire%27s_Shadow','https://www.itechguides.com/in-the-eternal-fires-shadow-walkthrough-the-witcher-3/'],
      stages:[
        {title:'Open the mine',place:'Devil’s Pit entrance',actions:['Speak to the deacon at the gate and enter the quarry.','Clear the deserters and use the deacon’s key at the mine doors.']},
        {title:'Read Reinald’s trail',place:'Devil’s Pit mine',actions:['Read the letters and investigate the side passages with Witcher Senses. Look for the notes before opening the salt cavern.','If you collect the recipe and ingredients, brew Reinald’s Philter. Keep it for Geralt if you want to use it in the fight.'],note:'The letters explain what happened in the mine and how to fight the spirit. Brewing the Philter is optional.'},
        {title:'Defeat the Red Miasmal',place:'Salt cavern',actions:['Free Reinald with Aard. Place Yrden and hit possessed Reinald with Aard while he is in the trap to weaken the possession.','When the Red Miasmal emerges, defeat it and deal with the plague victims it summons.']},
        {title:'Resolve Reinald’s fate',place:'Salt cavern',warning:'If you bring the deacon in, your dialogue can determine whether he survives.',actions:['Speak to Reinald’s spirit and decide whether to bring in the deacon.','To keep the deacon alive if you bring him in, defend him as innocent and say that he can do good without the church.'],note:'You receive the Forgotten Wolven diagrams regardless of the ending. The follow-up scavenger hunt continues in Kaer Morhen.'}
      ]
    }
  });
})(window);
