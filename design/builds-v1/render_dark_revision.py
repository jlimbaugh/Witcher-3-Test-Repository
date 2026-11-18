from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[2]
cache=Path('/tmp/phoenix-reference-art');target=root/'design/builds-v1/art';target.mkdir(exist_ok=True)
for p in cache.glob('*'):shutil.copyfile(p,target/p.name)
s=(root/'design/builds-v1/render_art_mockups.py').read_text().replace("OUT=ROOT/'design/builds-v1/art-mockups'","OUT=ROOT/'design/builds-v1/dark-revision'")
s=s.replace("'ink':'#302921'","'ink':'#f0ecde'")
a=s.index('def sheet(y,h):');b=s.index('def card(y,h):',a)
s=s[:a]+"def sheet(y,h):\n rect(16,y,358,h,C['panel'],C['silver'],r=3)\n"+s[b:]
exec(compile(s,'art-render','exec'),globals())
# Equipment: guide exits alone get the parchment treatment.
begin('Feline duelist',tab=0)
text(18,210,'EQUIPPED LOADOUT',12,C['silver'],'caps')
portrait(game,(1195,131,1510,965),115,252,160,310)
for gi,(x,y) in enumerate([(18,260),(284,260),(18,365),(284,365),(18,470),(284,470)]):
 rect(x,y,88,83,C['panel'],C['silver'],r=2);artwork(game,gear_bounds[gi],x+26,y+5,34,45);text(x+44,y+64,['Steel','Silver','Chest','Gloves','Trousers','Boots'][gi],12,anchor='mm')
text(195,574,'Feline set illustration',12,C['muted'],anchor='mm')
card(599,72);text(29,611,'Selected piece: chest armor',21,k='serif');text(29,643,'Tier / upgrades / requirements  →',14,C['silver'])
# Real parchment is reserved for a guide destination.
tex=ImageOps.fit(paper,(358*S,48*S));im.paste(tex,(16*S,688*S));text(28,702,'Open shared Gear guide →',16,'#302921')
footer();save('01-equipment.png')
begin('Feline duelist',tab=1)
text(18,211,'COMBAT     SIGNS     ALCHEMY     GENERAL',12,C['silver'],'caps')
text(18,242,'Learned tree · Combat selected',21,k='serif')
for row in range(4):
 for col in range(5):
  x=20+col*71;y=280+row*49;rect(x,y,62,44,'#302122','#a67d78',r=2);artwork(skillart,(182+col*98,303+(row%3)*100,242+col*98,357+(row%3)*100),x+13,y+4,35,34)
text(18,488,'Equipped skills & mutagens',22,k='serif')
for row in range(2):
 for col in range(6):
  x=20+col*59;y=529+row*52;rect(x,y,50,44,'#252c31',['#b7837d','#b7837d','#b7837d','#7ca2ba','#7ca2ba','#7ca2ba'][col]);artwork(skillart,(1045,151+(col%3)*100,1104,207+(col%3)*100),x+8,y+5,33,33)
card(644,87);text(29,657,'Mutations',22,k='serif');text(29,692,'Plan locked choices · inspect requirements →',14,C['muted'])
footer('Tree icons are reference art; ranks remain illustrative');save('02-character.png')
begin('Compare builds','BASELINE VS CANDIDATE',tab=3)
card(213,112);text(29,224,'Baseline',13,C['silver'],'caps');text(205,224,'Candidate',13,C['silver'],'caps');text(29,251,'Feline duelist',19,k='serif');text(205,251,'Sign experiment',19,k='serif');text(29,289,'Swords / Quen',14,C['muted']);text(205,289,'Mixed gear / Signs',14,C['muted'])
card(340,66);text(29,352,'Same conditions for both builds',19,k='serif');text(29,379,'Quen active · identical target assumptions',14,C['sage'])
text(18,425,'ILLUSTRATIVE VALUES · NOT GAME RESULTS',10,C['silver'],'caps')
text(18,458,'STAT',11);text(215,458,'BASE',11,anchor='ra');text(292,458,'NEW',11,anchor='ra');text(369,458,'CHANGE',11,anchor='ra')
for i,(name,b,c,delta) in enumerate([('Attack','1,240','1,180','−60'),('Armor','280','295','+15'),('Signs','45%','65%','+20 pp'),('Stamina','12/s','12/s','0'),('Toxicity','45','45','0')]):
 y=492+i*36;text(19,y,name,17);text(215,y,b,16,anchor='ra');text(292,y,c,16,anchor='ra');text(369,y,delta,15,C['silver'],anchor='ra');line(19,y+29,369,y+29,'#53645c')
text(18,696,'Inspect contributors or change conditions →',14,C['muted'])
footer('Comparison does not replace your current build',False);save('17-build-comparison.png')
print('Dark revision complete')
