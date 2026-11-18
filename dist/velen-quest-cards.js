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
      start:'Accept Keira’s request after lifting the Fyke Isle curse. Resolve Lynch Mob first if you want to intervene at Hangman’s Alley.',
      completion:'Deliver the package and finish the evening with Keira.',
      sources:[guide+'afavorforafriend.php'],
      stages:[
        {title:'Find the missing package',place:'Hangman’s Alley',actions:['Use Witcher Senses to follow the wagon tracks off the road.','Take Keira’s package beside the damaged wagon. Inspect the trader’s trail if you want the optional evidence.'],links:[['Lynch Mob','lynch-mob']]},
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
    },
    'thou-shalt-not-pass': {
      name:'Thou Shalt Not Pass',kind:side,place:'Border Post bridge or Oxenfurt’s Western Gate',
      art:'art-velen/thou-shalt-not-pass.webp',
      briefing:'Secure a pass and show it to a Redanian guard to cross the Pontar.',
      start:'Approach a guard at the Border Post bridge or Oxenfurt’s Western Gate.',
      completion:'Present an accepted pass to a guard at either crossing.',
      sources:[guide+'thoushaltnotpass.php',field+'thou-shalt-not-pass'],
      stages:[
        {title:'Get a pass accepted by the guards',place:'Crow’s Perch and Border Post',actions:['If you already have a pass, go straight to the guard.','For an official pass, ask the Baron before heading to see Tamara during Family Matters, or earn a Letter of Safe Conduct from the captain on a qualifying Woodland Beast route.','For a forged pass, buy one during Fake Papers.'],note:'If the Woodland Beast captain withholds your reward, use the Baron or merchant route instead. A forged pass obtained later from Gregor during A Deadly Plot also works.',links:[['Family Matters','family-matters'],['Contract: Woodland Beast','woodland-beast'],['Fake Papers','fake-papers']]},
        {title:'Show your papers',place:'Border Post bridge or Oxenfurt’s Western Gate',actions:['Return to a Redanian guard at either crossing and show your pass.','Continue once the guard admits you and the journal records the crossing quest as complete.']}
      ]
    },
    'fake-papers': {
      name:'Fake Papers',kind:side,place:'Refugee camp south of the Border Post',
      art:'art-velen/fake-papers.webp',
      briefing:'Buy a forged Transit Pass from the shady merchant, with or without a discount.',
      start:'Speak to the shady merchant on the Velen side of the Border Post.',
      completion:'Buy the forged Transit Pass from the merchant.',
      sources:[guide+'fakepapers.php',field+'fake-papers','https://witcher.fandom.com/wiki/Fake_Papers'],
      stages:[
        {title:'Choose how to buy the forged pass',place:'Border Post refugee camp',warning:'If Albin dies, reporting his death to the merchant ends the deal. Keep that dialogue closed if you still want to buy the forged pass.',actions:['Pay 100 crowns outright or ask for another option and use Axii with Delusion rank 1 to pay 50.','For the 25-crown price, help Albin in Bitter Harvest and return after he survives.','If Albin dies, skip the report about his death and buy the pass at full price if the deal is still open.'],note:'An official pass can get you across the border. Fake Papers itself completes when you buy the forged pass.',links:[['Bitter Harvest','bitter-harvest'],['Thou Shalt Not Pass','thou-shalt-not-pass']]}
      ]
    },
    'bitter-harvest': {
      name:'Bitter Harvest',kind:side,level:9,place:'Battlefield southeast of the Border Post',
      art:'art-velen/bitter-harvest.webp',
      briefing:'Protect Albin Hart and his scavengers while they work the battlefield.',
      start:'Speak to Albin at the battlefield, either on your own or after meeting the merchant in Fake Papers.',
      completion:'Defeat the necrophage waves and resolve the encounter with the surviving scavengers.',
      sources:[guide+'bitterharvest.php','https://witcher.fandom.com/wiki/Bitter_Harvest'],
      stages:[
        {title:'Prepare before accepting Albin’s job',place:'Battlefield camp',warning:'Accepting starts the attack. Save beforehand if you want to retry for the Fake Papers discount. That discount requires Albin himself to survive.',actions:['Find Albin at the battlefield southeast of the checkpoint.','Prepare for ghouls and a rotfiend, then agree to defend the scavengers.']},
        {title:'Defend the scavengers and resolve the job',place:'Battlefield',actions:['Stay near Albin and intercept the necrophages attacking the crew. Back away from the rotfiend when it is about to burst.','Once the waves are clear, speak to Albin if he survives. If he dies, see the encounter through and check the journal outcome.'],note:'If Albin lives, return to the merchant for the discount. If the whole crew dies, Bitter Harvest fails. An official pass remains available through the other quest routes.',links:[['Fake Papers','fake-papers'],['Thou Shalt Not Pass','thou-shalt-not-pass']]}
      ]
    },
    'wild-at-heart': {
      name: "Wild at Heart",
      kind: "Side quest",
      place: "Blackbough",
      art: "art-velen/wild-at-heart.webp",
      briefing: "Investigate Hanna’s disappearance and decide how far to pursue the trail.",
      start: "Read the Missing Wife notice or speak to Niellen in Blackbough.",
      completion: "Resolve Hanna’s disappearance by reporting back to Niellen or resolving the confrontation in his lair.",
      sources: ["https://www.gamebanshee.com/thewitcher3/walkthrough/wildatheart.php", "https://witcher.fandom.com/wiki/Wild_at_Heart"],
      level: 7,
      stages: [
        {"title": "Speak with Niellen", "place": "Blackbough", "actions": ["Agree to look for Hanna. Ask the villagers what they saw, then search the woods northwest of Blackbough."]},
        {"title": "Respond to Margrit’s offer", "place": "Woods near Blackbough", "actions": ["Defeat the wolves. Margrit will offer to pay you to stop looking.", "For the short route, take the offer and report Hanna dead to Niellen. To learn what happened, stay in the woods and inspect the body, claw marks and tracks."], "warning": "Reporting back to Niellen on Margrit’s terms ends the quest early."},
        {"title": "Resolve the confrontation", "place": "Cave below the isolated shack", "actions": ["On the investigation route, follow the clues to the shack and read the notes. Enter the cave beneath it at night.", "Fight the werewolf. When Margrit intervenes, choose whether to protect her or let Niellen take revenge."], "note": "Cursed Oil and Moon Dust help against a werewolf. If you let Niellen take revenge, follow him outside afterward to resolve the quest."}
      ]
    },
    'a-greedy-god': {
      name: "A Greedy God",
      kind: "Side quest",
      place: "Ruins south of Wastrel Manor",
      art: "art-velen/a-greedy-god.webp",
      briefing: "Find out why the Allgod refuses the villagers’ offerings.",
      start: "Speak to Dagmar and Preben at the ruins. Bring the Eye of Nehaleni from Wandering in the Dark.",
      completion: "Decide what to do with the sylvan and report back to the villagers.",
      sources: ["https://www.gamebanshee.com/thewitcher3/walkthrough/greedygod.php", "https://witcher.fandom.com/wiki/A_Greedy_God"],
      level: 7,
      stages: [
        {"title": "Investigate the altar", "place": "Wastrel Manor ruins", "actions": ["Speak to the villagers and address the Allgod at the altar.", "Use Witcher Senses to find the bottle and follow its scent to the illusory rubble. Dispel it with the Eye of Nehaleni."], "links": [["Wandering in the Dark", "wandering-in-the-dark"]]},
        {"title": "Resolve the offerings dispute", "place": "Hidden cellar and altar", "actions": ["Enter the cellar. Convince the sylvan to accept poorer offerings, leave him to his demands, or fight him.", "Return to Dagmar and Preben. If the sylvan lives, decide whether to tell them about the cellar."]}
      ]
    },
    'a-dogs-life': {
      name: "A Dog’s Life",
      kind: "Side quest",
      place: "Road near Drudge and the village",
      art: "art-velen/a-dogs-life.webp",
      briefing: "Rescue a dog and follow it to the house it is trying to reach.",
      start: "Find the dog being attacked by wolves on the road near Drudge.",
      completion: "Find and take Druzus the Hermit’s Notes from the hidden container.",
      sources: ["https://www.gamebanshee.com/thewitcher3/walkthrough/adogslife.php"],
      stages: [
        {"title": "Rescue and follow the dog", "place": "Road to Drudge", "actions": ["Drive off the wolves and examine the dog for the key it carries.", "Follow the dog to the house in Drudge and defeat the bandits there."]},
        {"title": "Open the hidden container", "place": "House in Drudge", "actions": ["Search the house with Witcher Senses. Check the loose floorboards and open the container with the dog’s key.", "Take Druzus the Hermit’s Notes to finish the quest."]}
      ]
    },
    'forefathers-eve': {
      name: "Forefathers’ Eve",
      kind: "Side quest",
      place: "Fyke Isle and Crookback Bog",
      art: "art-velen/forefathers-eve.webp",
      briefing: "Protect the Pellar’s ritual and decide how to respond when the witch hunters interrupt.",
      start: "After A Towerful of Mice, speak to the Pellar near Keira’s cottage or by the forge at Crow’s Perch, depending on Family Matters progress.",
      completion: "Resolve the interruption, then lay Ambros to rest and report back if you chose to defend the Pellar.",
      sources: ["https://www.gamebanshee.com/thewitcher3/walkthrough/forefatherseve.php", "https://witcher.fandom.com/wiki/Forefathers%27_Eve"],
      level: 7,
      stages: [
        {"title": "Attend the ritual", "place": "Fyke Isle stone circle", "actions": ["Meet the Pellar around midnight and speak to him to start the rite.", "Defeat the drowners and water hag that come to the circle."], "links": [["A Towerful of Mice", "towerful-of-mice"]]},
        {"title": "Decide whether to intervene", "place": "Fyke Isle stone circle", "actions": ["When the witch hunters arrive, step aside to end your part in the ritual or defend the Pellar.", "If you defend him, defeat the hunters and the wraiths that appear, then speak to the Pellar about Ambros."], "warning": "Stepping aside ends the quest here and costs access to the Pellar’s trading services."},
        {"title": "Lay Ambros to rest", "place": "Crookback Bog and the Pellar’s hut", "actions": ["On the defense route, search the marked swamp with Witcher Senses. Examine Ambros’s body and burn it with Igni.", "Report back to the Pellar at his hut."]}
      ]
    },
    'death-by-fire': {
      name: "Death by Fire",
      kind: "Side quest",
      place: "Road west of Codgers’ Quarry",
      level: 10,
      art: "art-velen/death-by-fire.webp",
      briefing: "Rescue the elf trapped in a burning hut.",
      start: "Approach the burning hut west of Codgers’ Quarry.",
      completion: "Free the elf and speak with her.",
      sources: ["https://www.witcher.tools/quests/death-by-fire", "https://www.gamebanshee.com/thewitcher3/walkthrough/deathbyfire.php"],
      stages: [
        {"title": "Intervene at the burning hut", "place": "Codgers’ Quarry road", "actions": ["Challenge the bandits and defeat them. Use Aard on the barricaded door to free the elf.", "Speak to the survivor once she’s outside."], "warning": "Handle this encounter when you find it. Walking away forfeits the rescue.", "note": "The survivor points you to an optional payment hidden in the wood behind the hut."}
      ]
    },
    'lynch-mob': {
      name: "Lynch Mob",
      kind: "Side quest",
      place: "Hangman’s Alley",
      level: 7,
      art: "art-velen/lynch-mob.webp",
      briefing: "Decide whether to intervene when villagers threaten a captured Nilfgaardian deserter.",
      start: "Approach the villagers near the Hangman’s Alley signpost before starting A Favor for a Friend.",
      completion: "Resolve the encounter. If you intervene, defend the deserter and speak with him afterward.",
      sources: ["https://www.witcher.tools/quests/lynch-mob", "https://witcher.fandom.com/wiki/Lynch_Mob"],
      stages: [
        {"title": "Decide the deserter’s fate", "place": "Hangman’s Alley", "actions": ["Speak to the ringleader. To intervene, demand the man’s release and stand your ground when the villagers refuse.", "Defeat the attackers and speak to the deserter. If you stand aside, the villagers hang him."], "warning": "Passing by without intervening can end the encounter. Resolve it before starting A Favor for a Friend.", "links": [["A Favor for a Friend", "favor-for-a-friend"]]}
      ]
    },
    'defender-of-the-faith': {
      name: "Defender of the Faith",
      kind: "Side quest",
      place: "Road between Blackbough and Crow’s Perch",
      level: 10,
      art: "art-velen/defender-of-the-faith.webp",
      briefing: "Restore roadside shrines and confront the people knocking them down.",
      start: "Speak to the woman beside the overturned shrine between Blackbough and Crow’s Perch.",
      completion: "Restore the first two shrines and resolve the confrontation at the final shrine.",
      sources: ["https://www.gamebanshee.com/thewitcher3/walkthrough/defenderofthefaith.php", "https://www.witcher.tools/quests/defender-of-the-faith"],
      stages: [
        {"title": "Restore the roadside shrines", "place": "Blackbough road and marked shrines", "actions": ["Set the first shrine upright after speaking to the woman. Follow the quest markers and restore the next damaged shrine."]},
        {"title": "Confront the vandals", "place": "Final shrine", "actions": ["Hear the students out. Insist they stop vandalizing the shrines and defeat them when they attack."], "warning": "Choosing to stay out of the dispute fails the quest. Completing it unlocks Last Rites.", "links": [["Last Rites", "last-rites"]]}
      ]
    },
    'last-rites': {
      name: "Last Rites",
      kind: "Side quest",
      place: "Bridge north of Blackbough",
      level: 9,
      art: "art-velen/last-rites.webp",
      briefing: "Carry a wedding ring to Jackamar’s grave and return to Blackbough.",
      start: "Complete Defender of the Faith, then find the old woman across the bridge north of Blackbough at night.",
      completion: "Place the ring on Jackamar’s grave and speak with Lessy in Blackbough.",
      sources: ["https://www.witcher.tools/quests/last-rites", "https://witcher.fandom.com/wiki/Last_Rites"],
      stages: [
        {"title": "Accept the ring", "place": "Bridge north of Blackbough", "actions": ["Speak to the woman at night and agree to deliver her wedding ring."], "links": [["Defender of the Faith", "defender-of-the-faith"]]},
        {"title": "Find Jackamar’s grave", "place": "Cemetery near the Pellar’s hut", "actions": ["Head northwest from the bridge. Clear any ghouls and use Witcher Senses to identify Jackamar’s grave.", "Place the ring at the grave, then find Lessy outside her hut in Blackbough to finish."], "note": "If you have Keira’s Magic Lamp, use it at the grave after placing the ring to see an optional scene."}
      ]
    },
    'fools-gold': {
      name: "Fools’ Gold",
      kind: "Side quest",
      place: "Lurtch and the hog hut",
      level: 6,
      art: "art-velen/fools-gold.webp",
      briefing: "Investigate Lurtch’s curse and help Yontek return the stolen gold.",
      start: "Speak to the bandits southeast of the Lurtch signpost. This quest comes from the free Fools’ Gold add-on.",
      completion: "Lift the curse and decide whether to defend Yontek when the villagers turn on him.",
      sources: ["https://www.gamebanshee.com/thewitcher3/walkthrough/foolsgold.php","https://witcher.fandom.com/wiki/Fools%27_Gold"],
      stages: [
        {"title":"Protect Yontek and investigate the pigs","place":"Lurtch","actions":["Intervene when the bandits threaten Yontek. Defeat them and ask him about the villagers.","Examine a pig with Witcher Senses, then speak to Yontek again to get the hog hut key."],"warning":"Walking away when the bandits threaten Yontek closes the quest."},
        {"title":"Investigate the hog hut","place":"Cave between Reardon Manor and Toderas","actions":["Clear the bandits and use Yontek’s key on the inner door.","Follow the tracks to Igor, examine the missing gold’s pedestal, and ask him about it. Return to Lurtch and drive off the wolves."]},
        {"title":"Escort the herd and lift the curse","place":"Lurtch windmill and hog hut","actions":["Ask Yontek about the gold. Use Axii on the pigs in the huts and gather the herd at the windmill.","Mount up and escort the herd to the hog hut, clearing nekkers along the route. Gather the pigs in the circle and enter the temple to return the gold.","Once the villagers are human again, decide whether to defend Yontek or let them punish him."],"warning":"A nekker warrior joins the escort fight. Prepare before starting the escort."}
      ]
    },
    'truth-is-in-the-stars': {
      name: "The Truth Is in the Stars",
      kind: "Side quest",
      place: "Benek and the cave to its southeast",
      art: "art-velen/truth-is-in-the-stars.webp",
      briefing: "Bring a soothsayer food and dragonsroot to hear his prophecy.",
      start: "Speak to the old sage at the roadside shrine near Benek. An Oxenfurt notice can point you there.",
      completion: "Deliver the dragonsroot and hear the sage’s second reading.",
      sources: ["https://www.gamebanshee.com/thewitcher3/walkthrough/thetruthisinthestars.php","https://www.witcher.tools/quests/the-truth-is-in-the-stars"],
      stages: [
        {"title":"Hear the first reading","place":"Roadside shrine near Benek","actions":["Give the sage food. Ask about the first reading and agree to find dragonsroot."]},
        {"title":"Collect and deliver dragonsroot","place":"Cave southeast of Benek","actions":["Clear the ghouls in the marked cave. Find dragonsroot toward the back with Witcher Senses.","Bring it to the sage for the second reading."]}
      ]
    },
    'hazardous-goods': {
      name: "Hazardous Goods",
      kind: "Side quest",
      place: "Road northwest of Lurtch",
      art: "art-velen/hazardous-goods.webp",
      briefing: "Free Gert Borel from his overturned cart and decide what to do with the cargo.",
      start: "Find the overturned cart on the main road northwest of Lurtch. If Ghosts of the Past is active and the cart encounter is absent, finish that quest first.",
      completion: "Resolve the encounter at the cart. Gert’s later appearance is optional.",
      sources: ["https://witcher.fandom.com/wiki/Hazardous_Goods","https://wiki.eso-ui.com/index.php/Witcher_3%3AHazardous_Goods"],
      stages: [
        {"title":"Rescue Gert and resolve the cart encounter","place":"Road northwest of Lurtch","actions":["Kill the ghouls and speak to Gert Borel.","Choose whether to burn the cart and bodies. If you agree to burn them, cast Igni on the cart before leaving."],"warning":"Once the encounter starts, straying too far before resolving it can fail the quest.","note":"Several in-game weeks later, Gert can appear between Reardon Manor and Benek near the nekker nests. If you find him, you can grant or refuse his last request. The cart quest can already be complete.","links":[["Ghosts of the Past","ghosts-of-the-past"]]}
      ]
    },
    'witcher-wannabe': {
      name: "Witcher Wannabe",
      kind: "Side quest",
      place: "Lindenvale and its cemetery",
      level: 10,
      art: "art-velen/witcher-wannabe.webp",
      briefing: "Find the man posing as a witcher and decide what to tell the villagers.",
      start: "Complete Contract: The Merry Widow and allow at least five in-game days to pass. Speak to the ealdorman near Lindenvale’s notice board.",
      completion: "Decide the impostor’s fate when the villagers arrive.",
      sources: ["https://www.gamebanshee.com/thewitcher3/walkthrough/witcherwannabe.php","https://witcher.fandom.com/wiki/Witcher_Wannabe"],
      stages: [
        {"title":"Follow the ealdorman’s lead","place":"Lindenvale","actions":["Speak to the ealdorman about the other witcher and head to the cemetery east of town."],"links":[["Contract: The Merry Widow","merry-widow"]]},
        {"title":"Find the impostor and decide his fate","place":"Lindenvale cemetery","actions":["Defeat the ghoul. Follow the footprints behind the chapel with Witcher Senses to find the impostor.","Choose whether to expose him or cover for him. Then choose whether he leaves the village or stays to work for the ealdorman."]}
      ]
    },
    'loves-cruel-snares': {
      name: "Love’s Cruel Snares",
      kind: "Side quest",
      place: "Boatyard north of Condyle",
      level: 10,
      art: "art-velen/loves-cruel-snares.webp",
      briefing: "Find out what happened to the woman’s fiancé while he was checking his snares.",
      start: "Clear the abandoned boatyard between Refugees’ Camp and Condyle and the pirate camp on the peninsula west of it. Speak to the woman by the road.",
      completion: "Find the missing man and report back to the woman.",
      sources: ["https://www.witcher.tools/quests/loves-cruel-snares","https://witcher.fandom.com/wiki/Love%27s_Cruel_Snares"],
      stages: [
        {"title":"Follow the tracks to the snares","place":"Woods near Condyle","actions":["Agree to search. Follow the tracks with Witcher Senses, defeat the wild dogs and examine the body."],"warning":"Leaving the area after accepting the search can fail the quest."},
        {"title":"Return with the news","place":"Road near the boatyard","actions":["Tell the woman what happened. Accept her 40 crowns or decline the money for more XP."]}
      ]
    },
    'blood-ties': {
      name: "Blood Ties",
      kind: "Side quest",
      place: "Nilfgaardian Army Group Center Camp and nearby swamp",
      art: "art-velen/blood-ties.webp",
      briefing: "Investigate what happened to a Nilfgaardian mother’s missing son.",
      start: "Speak to the woman at the Nilfgaardian Army Group Center Camp.",
      completion: "Find the letter that confirms her son’s fate and report back.",
      sources: ["https://www.gamebanshee.com/thewitcher3/walkthrough/bloodties.php","https://witcher.fandom.com/wiki/Blood_Ties"],
      stages: [
        {"title":"Question the quartermaster","place":"Nilfgaardian Army Group Center Camp","actions":["Ask Eggebracht about the missing cavalryman. Use Delusion rank 2 or pay 150 crowns to get him to talk if he withholds the lead."],"note":"Depending on how you resolved Patrol Gone Missing, asking him directly can be enough.","links":[["Contract: Patrol Gone Missing","patrol-gone-missing"]]},
        {"title":"Find proof in the swamp","place":"Northwest of the House of Respite","actions":["Examine the dead horse and tracks. Follow the trail past the first body to the hanged men. Inspect the red-haired man and take the unsent letter beneath him."]},
        {"title":"Report to the mother","place":"Nilfgaardian Army Group Center Camp","actions":["Return to the woman and choose whether to tell her he deserted or say he died in battle. Either answer finishes the quest."]}
      ]
    },
    'races-crows-perch': {
      name: "Races: Crow’s Perch",
      kind: "Side quest",
      place: "Crossroads west of Crow’s Perch",
      art: "art-velen/races-crows-perch.webp",
      briefing: "Win all three races to collect a saddle, saddlebags and blinders for Roach.",
      start: "Read the Horse Races notice at Crow’s Perch or speak to Radko at the crossroads east of Blackbough.",
      completion: "Win once against each of Radko’s three riders.",
      sources: ["https://www.witcher.tools/quests/races-crows-perch","https://witcher.fandom.com/wiki/Races%3A_Crow%27s_Perch"],
      stages: [
        {"title":"Enter the races","place":"Crossroads east of Blackbough","actions":["Speak to Radko, choose a rider and place a wager. Follow the marked course and stay inside the checkpoints."],"warning":"Finish the races before The Isle of Mists if you can. The quest and Radko can temporarily disappear afterward.","note":"A win pays back double your stake plus that rider’s first-win prize."},
        {"title":"Beat Stuttering Matko","place":"Crow’s Perch race course","actions":["Win against Matko for the Racing Saddle and 20 bonus crowns."]},
        {"title":"Beat Iron-Arse Hans","place":"Crow’s Perch race course","actions":["Win against Hans for the Saddlebags and 30 bonus crowns."]},
        {"title":"Beat Black Bogdan","place":"Crow’s Perch race course","actions":["Win against Bogdan for the Horse Blinders and 40 bonus crowns."]}
      ]
    },
    'fists-of-fury-velen': {
      name: "Fists of Fury: Velen",
      kind: "Side quest",
      place: "Inn at the Crossroads, Lindenvale, Blackbough and Crow’s Perch",
      level: 11,
      art: "art-velen/fists-of-fury-velen.webp",
      briefing: "Beat three local fighters and challenge Sergeant Ardal for the Velen title.",
      start: "Read the Fist Fights notice at Crow’s Perch or talk to a bookie at a fight venue.",
      completion: "Defeat Smithy, Stan Fishgulper, Jonah and Sergeant Ardal.",
      sources: ["https://www.witcher.tools/quests/fists-of-fury-velen","https://witcher.fandom.com/wiki/Fists_of_Fury%3A_Velen"],
      stages: [
        {"title":"Beat Smithy","place":"Inn at the Crossroads","actions":["Talk to the bookie and place a wager. Counter Smithy after his swings. The first three opponents can be beaten in any order."]},
        {"title":"Beat Stan Fishgulper","place":"Lindenvale inn","actions":["If you want to let him win for the food prize, wager the minimum, throw the first bout and beat him in a rematch.","If you win outright, you can offer him five crowns afterward."],"warning":"Decide how much to wager before the bout. Fishgulper asks you to throw the match after your bet is placed."},
        {"title":"Beat Jonah","place":"Blackbough","actions":["Arrange the bout with the bookie. Block or counter Jonah’s attacks and strike when his guard opens."]},
        {"title":"Win the Velen title","place":"Crow’s Perch","actions":["After beating the three local fighters, challenge Sergeant Ardal at Crow’s Perch and win the title."]}
      ]
    }
  });
})(window);
