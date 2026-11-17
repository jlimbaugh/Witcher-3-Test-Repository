"""Deterministic, static UI design plates; no gameplay calculation or app changes.
Run from repo root: python3 design/builds-v1/render_mockups.py
Uses Pillow/fontTools and existing Phoenix assets. Fonts are converted in a temp dir.
"""
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter
from fontTools.ttLib import TTFont
from pathlib import Path
import tempfile, math
ROOT=Path(__file__).resolve().parents[2]; OUT=ROOT/'design/builds-v1/art-mockups';OUT.mkdir(exist_ok=True)
# Fetch credited screenshot references into a disposable local cache; verify exact inputs.
import urllib.request, hashlib
for ref in [{'file': 'feline-loadout-reference.jpg', 'url': 'https://images.steamusercontent.com/ugc/1790721396643959419/468DAF0B0BA03E4E5FC1CE69D72098594E4EADFA/', 'credit': 'Steam Community, Cat School Build, XwZ_31', 'sha256': '43d4d64f4f659dd81cdb8c40b638fced025dcd9a1797aa65154f7248f8372c91'}, {'file': 'character-menu-reference.png', 'url': 'https://assets.rpgsite.net/images/images/000/046/037/original/TW3m_Character_NEW.png', 'credit': 'RPG Site, A look at The Witcher 3 menu overhaul', 'sha256': '57067230a89f1867f4d3c93de7a12c18c6476d8724bbd5254492a23f2bd62eba'}]:
 target=ROOT/'design/builds-v1/art'/ref['file'];target.parent.mkdir(exist_ok=True)
 if not target.exists():urllib.request.urlretrieve(ref['url'],target)
 if hashlib.sha256(target.read_bytes()).hexdigest()!=ref['sha256']:raise ValueError('Reference artwork changed: '+ref['file'])
S=2; W=390;H=844
C={'bg':'#151e21','panel':'#202c2f','panel2':'#29383a','silver':'#aebbb5','muted':'#b1bdb8','white':'#f0ecde','sage':'#a7c3a6','ink':'#302921','paper':'#e3d0a8','red':'#e4aaa0'}
tmp=tempfile.TemporaryDirectory(); fonts={}
for k,f in [('serif','im-fell-english-latin-400-normal.woff2'),('body','alegreya-latin-400-normal.woff2'),('caps','cinzel-latin-400-normal.woff2')]:
 t=TTFont(ROOT/'dist'/f);t.flavor=None;p=Path(tmp.name)/(k+'.ttf');t.save(p);fonts[k]=p
cache={}
def font(n=16,k='body'):
 key=(n,k)
 if key not in cache:cache[key]=ImageFont.truetype(str(fonts[k]),round(n*S))
 return cache[key]
def rect(x,y,w,h,fill=None,outline=None,r=0,width=1):
 fn=d.rounded_rectangle if r else d.rectangle;kw={'fill':fill,'outline':outline,'width':round(width*S)}
 if r:kw['radius']=round(r*S)
 fn((round(x*S),round(y*S),round((x+w)*S),round((y+h)*S)),**kw)
def line(x,y,x2,y2,c=None,width=1):d.line((x*S,y*S,x2*S,y2*S),fill=c or C['silver'],width=round(width*S))
def text(x,y,s,n=16,c=None,k='body',anchor=None):
 f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',round(n*S)) if any(ch in s for ch in ['→','▾','▸','✓']) else font(n,k)
 d.text((x*S,y*S),s,font=f,fill=c or C['white'],anchor=anchor)
def wrap(x,y,s,width,n=16,c=None,k='body',leading=1.25):
 words=s.split();ls=[];cur=''
 for w in words:
  test=(cur+' '+w).strip()
  if d.textlength(test,font=font(n,k))>width*S and cur:ls.append(cur);cur=w
  else:cur=test
 if cur:ls.append(cur)
 for l in ls:text(x,y,l,n,c,k);y+=n*leading
 return y
def button(x,y,w,label,primary=False,h=43):
 rect(x,y,w,h,C['sage'] if primary else C['panel2'],C['silver'],r=3)
 text(x+w/2,y+h/2,label,16,C['bg'] if primary else C['white'],anchor='mm')
def tag(x,y,s,color=None):
 width=d.textlength(s,font=font(10,'caps'))/S+16
 rect(x,y,width,20,C['panel2'],color or C['silver'],r=8)
 text(x+8,y+4,s,10,color or C['white'],'caps');return width
paper=Image.open(ROOT/'dist/r10-haunted-scroll-concept.webp').convert('RGB').crop((190,240,870,1140))
wolf=Image.open(ROOT/'dist/visual-art/wolf-pointer.webp').convert('RGBA')
def sheet(y,h):
 tex=ImageOps.fit(paper,(round(358*S),round(h*S)));im.paste(tex,(16*S,round(y*S)));rect(16,y,358,h,None,C['silver'],r=4)
 line(23,y+7,367,y+7,'#7c8479');line(23,y+h-7,367,y+h-7,'#7c8479')
def card(y,h):rect(16,y,358,h,C['panel'],C['silver'],r=4)
def rule(y):line(28,y,362,y,'#586865')
def begin(title,subtitle='MY CURRENT BUILD',tab=0):
 global im,d
 im=Image.new('RGB',(W*S,H*S),C['bg']);d=ImageDraw.Draw(im)
 text(18,15,'PHOENIX',13,C['silver'],'caps');text(372,16,'Build Vault  →',14,anchor='ra');line(16,43,374,43,'#6b7b78')
 text(18,58,subtitle,10,C['sage'],'caps');text(18,78,title,29,k='serif')
 text(18,115,'Swords · Quen · light Alchemy',15,C['muted'])
 for i,(x,w,name) in enumerate([(16,86,'Equipment'),(106,89,'Character'),(199,75,'Alchemy'),(278,96,'Performance')]):
  rect(x,149,w,39,C['panel2'] if i==tab else C['bg'],C['silver'] if i==tab else '#455653',r=3)
  text(x+w/2,168,name,12,C['white'] if i==tab else C['muted'],anchor='mm')
 line(16,199,374,199,'#43544f')
def footer(label='Unsaved experiment · current build unchanged',actions=True):
 rect(0,752,390,92,C['bg']);line(16,752,374,752,'#71827b')
 wrap(18,760,label,278,12,C['muted']);
 if actions:button(16,794,126,'Save build',True,h=36);button(150,794,133,'Save a copy',h=36)
 wi=wolf.copy();wi.thumbnail((66*S,58*S));im.paste(wi,(307*S,775*S),wi);text(340,836,'Navigate',11,anchor='ms')
def save(name):
 # Palette PNG keeps review files small; plates are already rendered at 2x phone size.
 im.quantize(colors=192).save(OUT/name,optimize=True)
 return im.copy()
plates=[]
game=Image.open(ROOT/'design/builds-v1/art/feline-loadout-reference.jpg').convert('RGB')
skillart=Image.open(ROOT/'design/builds-v1/art/character-menu-reference.png').convert('RGB')
def artwork(image,bounds,x,y,w,h):
 tile=ImageOps.fit(image.crop(bounds),(round(w*S),round(h*S)),method=Image.Resampling.LANCZOS);im.paste(tile,(round(x*S),round(y*S)))
def portrait(image,bounds,x,y,w,h):
 tile=ImageOps.pad(image.crop(bounds),(round(w*S),round(h*S)),method=Image.Resampling.LANCZOS,color='#151e21');im.paste(tile,(round(x*S),round(y*S)))
gear_bounds=[(949,162,1028,296),(1050,162,1134,296),(1582,170,1660,292),(1688,170,1767,292),(1586,338,1663,458),(1690,338,1769,459)]
# 01 equipment
begin('Feline duelist',tab=0)
text(18,210,'EQUIPMENT',12,C['silver'],'caps');tag(279,207,'BASE GAME')
text(18,239,'Set tier',15);button(89,232,193,'Enhanced  ▾',h=34);text(18,274,'Whole set selected · override any piece below',13,C['muted'])
rect(116,302,158,220,'#263536','#697a74',r=3)
portrait(game,(1195,131,1510,965),119,305,152,214)
for gi,(x,y,title,sub) in enumerate([(18,302,'Steel sword','Enhanced'),(284,302,'Silver sword','Enhanced'),(18,378,'Chest armor','Enhanced'),(284,378,'Gauntlets','Enhanced'),(18,454,'Trousers','Basic override'),(284,454,'Boots','Enhanced')]):
 rect(x,y,88,65,C['panel'],C['silver'],r=3);artwork(game,gear_bounds[gi],x+4,y+6,25,38);wrap(x+33,y+7,title,52,11);text(x+5,y+47,sub,10,C['sage'])
text(123,529,'Illustration follows chest set',11,C['muted'])
text(123,546,'Exact pieces shown in slots',11,C['muted'])
sheet(561,119);text(29,574,'Set effects & requirements',21,C['ink'],'serif')
wrap(29,607,'Show active bonuses, missing pieces and unmet requirements for this exact loadout.',328,15,C['ink'])
text(29,648,'Gear reference  →       Review crafting pieces  →',14,C['ink'])
text(18,700,'Next upgrade',12,C['sage'],'caps');text(18,721,'Inspect your next gear upgrade →',16)
footer();plates.append(('Equipment',save('01-equipment.png')))
# 02 skills
begin('Feline duelist',tab=1)
text(18,210,'CHARACTER & SKILLS',12,C['silver'],'caps')
card(238,67);text(28,249,'Level 29   ·   Velen',18);text(28,276,'Points: 6 available · 24 invested',14,C['sage']);text(301,277,'Edit profile →',12)
text(18,323,'Learned skills',22,k='serif');text(18,352,'Combat       Signs       Alchemy       General',14,C['muted'])
for i in range(3):
 for j in range(3):
  x=24+j*118;y=382+i*55;rect(x,y,105,44,C['panel2'] if i<2 else C['panel'],'#74827b',r=3)
  artwork(skillart,(180+j*100,300+i*100,245+j*100,360+i*100),x+4,y+5,32,32);text(x+40,y+9,['Learned','Planned','Locked'][min(i,2)],10,C['white'] if i<2 else C['muted']);text(x+95,y+27,'2/3' if i<2 else '0/3',11,C['sage'],anchor='ra')
text(18,551,'Equipped slots & mutagens',21,k='serif')
for j in range(6):
 x=20+j*59;rect(x,585,51,48,C['panel2'],C['silver'],r=3);artwork(skillart,(1045,151+(j%3)*100,1104,207+(j%3)*100),x+8,590,35,35)
card(650,83);text(29,660,'Mutations',21,k='serif');text(351,667,'Plan / inspect →',12,C['sage'],anchor='ra');text(29,692,'Locked choices show unlock requirements.',14,C['muted']);text(29,713,'All learned ranks count toward your budget.',12,C['muted'])
footer('Skill names & ranks here are layout placeholders');plates.append(('Character',save('02-character.png')))
# 03 alchemy
begin('Feline duelist',tab=2)
text(18,210,'PREPARATION',12,C['silver'],'caps');text(18,235,'Effects feed the live stat sheet.',17,C['muted'])
for y,title,desc,active in [(277,'Potions','Choose preparations for this build',True),(373,'Decoctions','Inspect effects and toxicity cost',False),(469,'Oils & bombs','Select a preparation for the target',True)]:
 card(y,82);artwork(game,(960,530,1024,596),30,y+12,36,48);text(78,y+12,title,23,k='serif');wrap(78,y+42,desc,195,12,C['muted']);text(350,y+16,'Choose →',14,C['sage'],anchor='ra')
 if active:tag(289,y+47,'SELECTED',C['sage'])
sheet(577,132);text(29,591,'Toxicity & active effects',22,C['ink'],'serif')
wrap(29,627,'Show capacity, selected effects and any conflicts. Combat switches live in Conditions.',328,16,C['ink'])
text(29,681,'Open shared Alchemy reference  →',15,C['ink'])
footer();plates.append(('Alchemy',save('03-alchemy.png')))
# 04 performance
begin('Feline duelist',tab=3)
text(18,209,'LIVE PERFORMANCE',12,C['silver'],'caps');text(18,233,'Baseline: saved “Feline — before edits”',15,C['muted'])
card(264,192);text(29,276,'Conditions',22,k='serif');text(353,282,'3 active  −',14,C['sage'],anchor='ra')
for y,label,on in [(313,'Quen active',True),(350,'Selected potion active',True),(387,'Target status effect',True)]:
 text(29,y,label,16);rect(315,y,42,23,C['sage'] if on else C['panel2'],C['silver'],r=11);d.ellipse(((339 if on else 318)*S,(y+3)*S,(354 if on else 333)*S,(y+19)*S),fill=C['bg'])
text(29,424,'Conditions saved with this build',13,C['muted'])
text(18,474,'ILLUSTRATIVE VALUES · NOT VERIFIED',10,C['sage'],'caps')
for i,(name,value,delta) in enumerate([('Attack power','1,240','+120'),('Armor','280','−15'),('Sign intensity','45%','+10 pp'),('Stamina recovery','12/s','+2/s'),('Toxicity','45 / 100','+10')]):
 y=502+i*36;text(20,y,name,16);text(270,y,value,17,anchor='ra');text(365,y,delta+'  ›',15,C['sage'],anchor='ra');line(20,y+29,370,y+29,'#3a4e49')
text(18,694,'Target assumptions  ▸',17);text(18,719,'Same conditions applied to both builds',13,C['muted'])
footer();plates.append(('Performance',save('04-performance.png')))
# 05 picker
begin('Choose chest armor','EQUIPMENT / CHEST SLOT',tab=0)
card(213,44);text(29,224,'Search Witcher sets & vetted alternatives',15,C['muted'])
text(18,276,'Family: Feline  ▾        Tier: Enhanced  ▾',16)
for y,title,sub,picked in [(318,'Feline armor','Basic · BASE GAME',False),(389,'Enhanced Feline armor','Selected tier · BASE GAME',True),(460,'Superior Feline armor','Unmet requirements shown · BASE GAME',False)]:
 rect(16,y,358,60,C['panel2'] if picked else C['panel'],C['sage'] if picked else '#667871',r=3)
 text(30,y+9,title,20,k='serif');text(30,y+35,sub,12,C['sage'] if picked else C['muted']);text(352,y+20,'✓' if picked else '›',21,anchor='ra')
sheet(544,148);text(29,558,'Enhanced Feline armor',22,C['ink'],'serif')
wrap(29,593,'Key effects, requirements and the impact on set bonuses appear here.',326,16,C['ink'])
text(29,654,'Full gear page  →     Acquisition guide  →',15,C['ink'])
button(16,711,172,'Cancel');button(202,711,172,'Preview change',True)
footer('Picker concept · no change until you apply the preview',False);plates.append(('Slot picker',save('05-slot-picker.png')))
# 06 vault
begin('Build Vault','CHARACTER / SAVED BUILDS',tab=0)
text(18,212,'Search your builds…',16,C['muted']);line(18,245,371,245,'#7b8a83')
button(16,263,171,'School  ▾',h=39);button(201,263,173,'Playstyle  ▾',h=39)
for y,title,status,desc in [(322,'Feline duelist','CURRENT BUILD','Swords · Quen · light Alchemy'),(466,'Feline — Sign experiment','SAVED EXPERIMENT','Mixed set · alternate skill allocation')]:
 card(y,126)
 art=ImageOps.fit(game.crop((1195,131,1510,965)),(60*S,98*S));im.paste(art,(26*S,(y+14)*S));rect(26,y+14,60,98,None,C['silver'])
 tag(98,y+13,status,C['sage']);text(98,y+43,title,20,k='serif');wrap(98,y+73,desc,253,14,C['muted']);text(350,y+104,'Open build →',13,C['sage'],anchor='ra')
text(18,620,'Find a recommended build',22,k='serif');text(18,651,'Browse by playstyle or Witcher school  →',16)
button(16,699,171,'Import / export');button(201,699,173,'New experiment',True)
footer('Each card opens its own build screen and controls',False);plates.append(('Build Vault',save('06-build-vault.png')))
# 07 preview
begin('Feline duelist','RECOMMENDED BUILD / PREVIEW',tab=0)
sheet(214,218);text(29,230,'Fast blades. Measured risks.',25,C['ink'],'serif')
wrap(29,270,'A mobile sword-focused playstyle with Quen and light Alchemy support.',329,18,C['ink'])
text(29,331,'Strengths',16,C['ink'],'caps');wrap(29,355,'Quick pressure and flexible preparation.',328,16,C['ink'])
text(29,388,'Tradeoff: staying exposed can be costly.',16,C['ink'])
card(452,115);text(29,466,'Milestones & next steps',23,k='serif');wrap(29,500,'See the next useful skill, gear upgrade or unlock, with its benefit and a direct guide link.',328,16,C['muted'])
text(18,591,'Shared build page',12,C['sage'],'caps')
text(18,618,'Preparation & combat routine  →',18);text(18,652,'Gear, skills & full requirements  →',18)
button(16,699,171,'Compare');button(201,699,173,'Copy to Vault',True)
footer('Recommended original stays unchanged',False);plates.append(('Build preview',save('07-build-preview.png')))
# 08 crafting
begin('Review crafting pieces','BUILD → SHARED CRAFTING PLAN',tab=0)
text(18,212,'Choose what to add',23,k='serif');wrap(18,246,'Select pieces and target tiers before changing your existing plan.',350,16,C['muted'])
for y,label,tier,on in [(307,'Chest armor','Enhanced',True),(377,'Trousers','Enhanced · upgrade from Basic',True),(447,'Silver sword','Enhanced',False)]:
 card(y,60);rect(28,y+17,25,25,C['sage'] if on else C['panel2'],C['silver'],r=3)
 if on:text(40,y+30,'✓',18,C['bg'],anchor='mm')
 text(66,y+8,label,20,k='serif');text(66,y+34,tier,14,C['muted'])
sheet(532,150);text(29,547,'One shared crafting plan',23,C['ink'],'serif')
wrap(29,584,'Preview additions and duplicate requirements before applying. Materials you own are not tracked.',326,16,C['ink'])
text(29,645,'Craftsman & cost details  →',16,C['ink'])
button(16,704,171,'Back to build');button(201,704,173,'Preview plan',True)
footer('Preview first · your existing plan stays intact',False);plates.append(('Crafting handoff',save('08-crafting-handoff.png')))
# landscape comparison design, not a resized portrait
im=Image.new('RGB',(844*S,390*S),C['bg']);d=ImageDraw.Draw(im)
text(18,14,'PHOENIX  /  Feline duelist',21,k='serif');text(824,20,'Performance · illustrative values',13,C['muted'],anchor='ra');line(16,49,827,49,'#74877d')
rect(16,65,236,254,C['panel'],C['silver'],r=4);text(30,78,'Conditions · 3 active',22,k='serif')
for y,s in [(122,'✓  Quen active'),(157,'✓  Selected potion active'),(192,'✓  Target status effect')]:text(30,y,s,16)
text(30,240,'Same conditions for both builds',13,C['sage']);text(30,277,'Target assumptions  ▸',17)
text(277,72,'Baseline: Feline — before edits',15,C['muted'])
for i,(name,v,delta) in enumerate([('Attack power','1,240','+120'),('Armor','280','−15'),('Sign intensity','45%','+10 pp'),('Stamina recovery','12/s','+2/s'),('Toxicity','45 / 100','+10')]):
 y=108+i*39;text(278,y,name,17);text(652,y,v,17,anchor='ra');text(810,y,delta+'  ›',16,C['sage'],anchor='ra');line(278,y+31,812,y+31,'#41564b')
line(16,337,827,337,'#74877d');button(16,347,125,'Save build',True,h=34);button(152,347,140,'Save a copy',h=34);text(316,356,'Unsaved experiment · current build unchanged',14,C['muted']);text(810,356,'Navigate',14,anchor='ra')
save('09-performance-landscape.png')
# Contact sheet with legible titles; full plates remain available separately.
board=Image.new('RGB',(1120,1370),C['bg']);bd=ImageDraw.Draw(board)
boardfont=ImageFont.truetype(str(fonts['serif']),34);smallfont=ImageFont.truetype(str(fonts['body']),18)
bd.text((30,18),'PHOENIX · Character & Build Vault',font=boardfont,fill=C['white']);bd.text((30,62),'Feline duelist / art pass v3 / screenshot-derived game art / illustrative data, not the live application',font=smallfont,fill=C['muted'])
for i,(label,plate) in enumerate(plates):
 x=28+(i%4)*274;y=110+(i//4)*620;bd.text((x,y),str(i+1).zfill(2)+'  '+label,font=smallfont,fill=C['white']);thumb=plate.resize((248,537),Image.Resampling.LANCZOS);board.paste(thumb,(x,y+32))
board.quantize(colors=192).save(OUT/'00-overview.png',optimize=True)
# Detailed stat contributor panel: arithmetic is illustrative, never game data.
begin('Attack power breakdown','PERFORMANCE / SHARED MECHANICS',tab=3)
text(18,213,'ILLUSTRATIVE CALCULATION ONLY',10,C['sage'],'caps')
card(249,96);text(30,265,'1,240',38,k='serif');text(352,279,'+120 vs baseline',17,C['sage'],anchor='ra');text(30,314,'Tap any contributor to open its shared entry',14,C['muted'])
for y,title,amount in [(372,'Equipment contribution','1,000'),(417,'Skill contribution','+140'),(462,'Active effects','+100')]:
 text(22,y,title,18);text(363,y,amount+'  ›',18,C['sage'],anchor='ra');line(22,y+35,367,y+35,'#52685c')
sheet(532,136);text(29,546,'Calculation',23,C['ink'],'serif');text(29,584,'1,000 + 140 + 100 = 1,240',24,C['ink']);wrap(29,627,'Real formulas, stacking and uncertainty will be verified before implementation.',327,15,C['ink'])
text(18,696,'Open shared Combat mechanics  →',17)
footer();save('10-stat-breakdown.png')
begin('Target assumptions','PERFORMANCE / TARGET CONTROLS',tab=3)
card(216,129);text(30,230,'Comparison scenario',23,k='serif');text(30,273,'Target type: Monster  ▾',18);text(30,310,'Apply the same target to both builds',15,C['sage'])
card(367,157);text(30,382,'Simple conditions',23,k='serif')
for y,label in [(425,'Target affected by selected status'),(468,'Oil matches the target')]:
 wrap(30,y,label,262,16);rect(321,y,34,23,C['panel2'],C['silver'],r=11)
sheet(550,146);text(29,565,'Advanced assumptions  +',23,C['ink'],'serif');wrap(29,607,'Expand supported armor, resistance and other target inputs. Estimates stay clearly labelled.',329,16,C['ink']);text(29,663,'Shared enemy & mechanics reference  →',14,C['ink'])
footer('Conditions saved with this build');save('11-target-assumptions.png')
# Revision 2: the owner confirmed these states after reviewing the first plates.
revision_plates=[('Character + mutations',plates[1][1])]
begin('Mutation planning','CHARACTER / MUTATIONS',tab=1)
text(18,213,'EXPERIMENT · NOT YET UNLOCKED',10,C['sage'],'caps')
card(248,124);text(30,263,'Selected mutation',26,k='serif');wrap(30,305,'Plan this choice now. Its effects can be explored without claiming it is unlocked in your game.',328,16,C['muted'])
sheet(397,166);text(29,413,'Requirements not met',24,C['ink'],'serif');wrap(29,454,'Required quest, research and point costs appear here once verified.',328,17,C['ink']);text(29,520,'Open shared mutation unlock guide →',14,C['ink'])
text(18,590,'Effects in this experiment',21,k='serif');wrap(18,627,'The stat sheet identifies planned effects and keeps your current in-game setup separate.',350,17,C['muted'])
button(16,699,171,'Back to Character');button(201,699,173,'Use in experiment',True)
footer('Planning does not mark quests or unlocks complete',False);revision_plates.append(('Mutation planning',save('12-mutation-planning.png')))
begin('Chest armor upgrades','EQUIPMENT / SELECTED GEAR SLOT',tab=0)
card(213,89);text(29,228,'Enhanced Feline armor',25,k='serif');text(29,266,'Item details  →       Shared upgrade reference  →',13,C['sage'])
text(18,323,'Installed upgrades',22,k='serif')
for y,label,action in [(365,'Occupied slot · Upgrade A','Replace'),(432,'Empty compatible slot','Choose')]:
 card(y,54);text(29,y+16,label,17);text(352,y+18,action+' →',13,C['sage'],anchor='ra')
sheet(513,157);text(29,529,'Runes, glyphs & enchantments',21,C['ink'],'serif');wrap(29,570,'Only controls relevant to this item appear. Replacement previews show what comes out and what goes in.',327,16,C['ink']);text(29,639,'Full upgrade mechanics & requirements →',14,C['ink'])
text(18,698,'Upgrade labels are illustrative placeholders.',14,C['muted'])
footer();revision_plates.append(('Gear-slot upgrades',save('13-gear-upgrades.png')))
begin('Preview replacement','EQUIPMENT / CHANGE PREVIEW',tab=0)
text(18,211,'REVIEW BEFORE APPLYING',11,C['sage'],'caps')
card(245,109);text(29,259,'Outgoing: Upgrade A',20,k='serif');text(29,296,'Incoming: Upgrade B',20,C['sage'],k='serif');text(29,329,'Illustrative upgrade names and values',12,C['muted'])
text(18,376,'Affected stats',22,k='serif')
for y,label,before,after in [(419,'Attack power','1,240','1,300'),(464,'Sign intensity','45%','40%')]:
 text(22,y,label,18);text(362,y,before+' → '+after,15,C['silver'],anchor='ra');line(22,y+33,368,y+33,'#50665b')
sheet(519,117);text(29,534,'Requirements & set effects',22,C['ink'],'serif');wrap(29,575,'List changed requirements, active or lost bonuses, and any replacement restrictions here.',328,15,C['ink'])
text(18,659,'Complete stat sheet  +',18)
button(16,706,171,'Cancel');button(201,706,173,'Apply to draft',True)
footer('Applying changes the draft; Save remains separate',False);revision_plates.append(('Replacement preview',save('14-replacement-preview.png')))
board=Image.new('RGB',(1120,760),C['bg']);bd=ImageDraw.Draw(board)
bd.text((28,16),'PHOENIX · Build refinements / art pass',font=boardfont,fill=C['white']);bd.text((28,59),'Confirmed planning, gear-slot controls and affected-stats-first replacement preview',font=smallfont,fill=C['muted'])
for i,(label,plate) in enumerate(revision_plates):
 x=28+i*274;y=105;bd.text((x,y),label,font=smallfont,fill=C['white']);board.paste(plate.resize((248,537),Image.Resampling.LANCZOS),(x,y+32))
board.quantize(colors=192).save(OUT/'00-revision-overview.png',optimize=True)
# Backup and designation states complete the requested review flow.
for filename,title_,sub,body,primary in [
 ('15-import-preview.png','Review Vault import','BUILD VAULT / IMPORT', ['File validated; no changes saved yet.','Incoming: Feline experiment','Name conflict: choose a new name.','Your current build stays designated.'],'Review renamed copy'),
 ('16-designation-review.png','Set current build','BUILD VAULT / DESIGNATION',['Current: Feline duelist','Proposed: Feline — Sign experiment','Review changed gear, skills and conditions.','Your saved original remains available.'],'Set as current'),
 ('17-build-comparison.png','Compare builds','PERFORMANCE / COMPARISON',['Baseline: your pinned Feline build','Candidate: Feline — Sign experiment','Same combat conditions applied.','Inspect each changed stat and contributor.'],'Return to editor')]:
 begin(title_,sub,tab=3 if filename.startswith('17') else 0)
 portrait(game,(1195,131,1510,965),24,219,105,235)
 text(149,230,'Feline set',25,k='serif');wrap(149,275,'Game artwork reference. Exact equipment stays in the slots.',213,16,C['muted'])
 sheet(477,205);text(29,493,'Review before applying',23,C['ink'],'serif')
 for i,row in enumerate(body):wrap(29,534+i*32,row,327,16,C['ink'])
 button(16,701,171,'Cancel');button(201,701,173,primary,True)
 footer('Design state · no actual import or save performed',False);save(filename)
print('Rendered 19 art-review plates')
