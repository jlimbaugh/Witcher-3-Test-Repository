from pathlib import Path
from PIL import Image,ImageOps
import base64,io,html
root=Path.cwd()
out=root/'responsive'
def uri(data,mime):
    return 'data:'+mime+';base64,'+base64.b64encode(data).decode()
def bitmap(image,size,quality=80):
    image.thumbnail(size)
    buf=io.BytesIO()
    image.save(buf,'WEBP',quality=quality)
    return uri(buf.getvalue(),'image/webp')
def asset(name,size):
    return bitmap(Image.open(root/'dist'/name),size)
def photo(num):
    return ImageOps.exif_transpose(Image.open(root/'upload'/f'IMG_{num}.jpeg'))
weapons=photo(2997)
armor=photo(2998)
groups=[
 ('Weapons',weapons,[('Steel weapon',(393,63,530,333),3,None,'green'),('Silver sword',(623,60,749,332),3,None,'green'),('Bolts',(396,439,514,675),0,76,'blue'),('Ranged weapon',(619,445,748,675),0,None,'green')]),
 ('Consumables',weapons,[('Consumable 1',(393,804,520,946),0,4,'amber'),('Consumable 2',(624,805,750,947),0,5,'amber'),('Consumable 3',(393,990,519,1115),0,4,'amber'),('Consumable 4',(624,986,754,1116),0,3,'amber')]),
 ('Quick slots',weapons,[('Bombs',(393,1229,520,1365),0,4,'amber'),('Pockets',(621,1224,750,1368),0,None,'iron')]),
 ('Armor',armor,[('Chest armor',(427,35,559,274),3,None,'green'),('Gloves',(651,32,793,275),1,None,'green'),('Trousers',(425,385,556,630),2,None,'green'),('Boots',(651,390,795,629),1,None,'green')]),
 ('Roach',armor,[('Trophy',(422,767,559,902),0,None,'amber'),('Saddlebags',(650,765,786,905),0,None,'iron'),('Saddle',(421,977,559,1109),0,None,'iron'),('Horse blinders',(649,978,785,1110),0,None,'iron')])]
sections=[]
for title,im,items in groups:
    tiles=[]
    for name,box,pips,count,quality in items:
        art=bitmap(im.crop(box),(92,120))
        sockets=''.join('<i></i>' for _ in range(pips))
        marks=f'<span class="pips" aria-label="{pips} sockets, occupancy unverified">{sockets}</span>' if pips else ''
        number=f'<b aria-label="quantity {count}">{count}</b>' if count else ''
        tiles.append(f'<figure><div class="tile {quality}"><img src="{art}" alt="">{marks}{number}</div><figcaption>{name}</figcaption></figure>')
    sections.append('<section class="group"><h2>'+title+'</h2><div class="tiles">'+''.join(tiles)+'</div></section>')
s=(out/'template.html').read_text()
for i,section in enumerate(sections): s=s.replace('@GROUP'+str(i)+'@',section)
for token,file in [('JOURNAL','alegreya-latin-400-normal.woff2'),('TITLE','im-fell-english-latin-400-normal.woff2'),('CAPS','cinzel-latin-400-normal.woff2')]:
    s=s.replace('@'+token+'@',uri((root/'dist'/file).read_bytes(),'font/woff2'))
for token,file,size in [('SCENE','white-orchard-scene.webp',(1100,700)),('WOLF','wolf-medallion-silver.png',(96,96)),('PAPER','r10-haunted-scroll-concept.webp',(400,120))]:
    s=s.replace('@'+token+'@',asset(file,size))
s=s.replace('@GERALT@',bitmap(photo(2996),(480,640)))
(out/'index.html').write_text(s)
