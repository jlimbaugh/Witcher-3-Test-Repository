from pathlib import Path
root=Path(__file__).resolve().parents[2]
s=(root/'design/builds-v1/render_art_mockups.py').read_text();s=s[:s.index('# 01 equipment')].replace("OUT=ROOT/'design/builds-v1/art-mockups'","OUT=ROOT/'design/builds-v1/game-parity'")
exec(compile(s,'helpers','exec'),globals())
owner_skills=Image.open(root.parent/'upload/IMG_2995.jpeg').convert('RGB')
owner_nodes=[(267,389),(430,390),(187,442),(516,445),(275,499),(431,501),(358,550),(198,595),(278,597),(439,597),(516,599),(288,684),(361,649),(224,739),(375,743),(515,745),(300,790)]
begin('Feline duelist',tab=0)
portrait=ImageOps.pad(game.crop((1195,131,1510,965)),(176*S,439*S),color=C['bg']);im.paste(portrait,(106*S,233*S))
for gi,(x,y) in enumerate([(22,251),(69,251),(295,251),(340,251),(295,319),(340,319)]):
 rect(x-2,y-3,39,58,None,'#69766e');artwork(game,gear_bounds[gi],x,y,35,49)
text(63,319,'Weapons',11,C['muted'],anchor='mm');text(330,389,'Armor',11,C['muted'],anchor='mm')
for i,t in enumerate(['Preparations','Quick use']):
 y=403+i*95;rect(20,y,85,73,None,'#69766e')
 for j in range(2):artwork(game,(960+j*110,530,1024+j*110,596),25+j*40,y+8,31,35)
 text(62,y+60,t,10,C['muted'],anchor='mm')
text(329,442,'Vitality',11,C['muted'],anchor='mm');text(329,465,'—',20,anchor='mm');text(329,505,'Toxicity',11,C['muted'],anchor='mm');text(329,528,'—',20,anchor='mm')
text(195,680,'Representative Feline illustration',12,C['muted'],anchor='mm');button(18,704,167,'Inspect slot');button(198,704,174,'Planning options');footer();save('equipment.png')
begin('Feline duelist',tab=1);text(18,213,'COMBAT    SIGNS    ALCHEMY    GENERAL',11,C['silver'],'caps');text(18,244,'Learned tree · Combat',21,k='serif')
nodes=[(72,285),(195,285),(35,338),(135,338),(320,338),(95,392),(235,392),(165,444),(36,491),(101,491),(235,491),(320,491),(106,542),(188,542),(50,590),(190,590),(304,590)]
edges=[(0,2),(0,3),(1,3),(1,4),(2,5),(3,5),(3,6),(4,6),(5,7),(6,7),(5,8),(5,9),(6,10),(6,11),(8,12),(9,12),(7,13),(10,13),(11,16),(12,14),(13,15),(15,16)]
for a,b in edges:line(nodes[a][0]+14,nodes[a][1]+14,nodes[b][0]+14,nodes[b][1]+14,'#9f6966')
for i,(x,y) in enumerate(nodes):
 rect(x,y,29,29,'#511f26','#b77477');cx,cy=owner_nodes[i];artwork(owner_skills,(cx-16,cy-16,cx+16,cy+16),x+3,y+3,23,23)
text(18,638,'Points available: 4 · illustrative allocation',13,C['muted']);button(18,684,354,'Equipped groups & mutations →',h=47);footer();save('character-tree.png')
begin('Equipped skills','CHARACTER / ACTIVE GROUPS',tab=1)
for group,(x,y,color) in enumerate([(35,244,'#a8666a'),(226,244,'#a8666a'),(35,441,'#a8666a'),(226,441,'#6d9b61')]):
 text(x,y,'Group '+str(group+1),15,C['muted']);mx=x+20;my=y+99
 d.polygon([(mx*S,(my-14)*S),((mx+14)*S,my*S),(mx*S,(my+14)*S),((mx-14)*S,my*S)],fill='#39252c',outline=color)
 for j in range(3):
  sy=y+29+j*44;line(mx+14,my,x+74,sy+15,color);rect(x+74,sy,33,33,'#302329',color);cx,cy=[(945,395),(945,466),(945,535)][j];artwork(owner_skills,(cx-19,cy-19,cx+19,cy+19),x+78,sy+4,25,25)
 text(x,y+167,'Mutagen-linked bonus',12,color)
button(18,655,354,'Mutation planning / requirements',h=45);text(18,714,'Four groups · three skills each',14,C['muted']);footer();save('equipped-groups.png')
for photo,name,title_ in [('IMG_2994.jpeg','equipment','Inventory reference and phone adaptation'),('IMG_2995.jpeg','character-tree','Character reference and phone adaptation')]:
 board=Image.new('RGB',(1200,1000),C['bg']);bd=ImageDraw.Draw(board);bd.text((25,20),title_,font=font(16,'serif'),fill=C['white']);ref=ImageOps.contain(Image.open(root.parent/'upload'/photo).convert('RGB'),(750,820));board.paste(ref,(15,100));adapt=ImageOps.contain(Image.open(OUT/(name+'.png')).convert('RGB'),(390,844));board.paste(adapt,(790,100));bd.text((25,950),'Owner photo is the layout reference; icons and values remain provisional.',font=font(8),fill=C['muted']);board.quantize(colors=192).save(OUT/(name+'-comparison.png'),optimize=True)
print('Five review images rendered')
