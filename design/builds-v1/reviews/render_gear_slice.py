"""Static review illustration, not a browser screenshot. Run from the repo root."""
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
from pathlib import Path
import tempfile
root=Path(__file__).resolve().parents[3];out=Path(__file__).resolve().parent
with tempfile.TemporaryDirectory() as tmp:
 fonts={}
 for k,f in [('heading','im-fell-english-latin-400-normal.woff2'),('body','alegreya-latin-400-normal.woff2')]:
  t=TTFont(root/'dist'/f);t.flavor=None;p=Path(tmp)/(k+'.ttf');t.save(p);fonts[k]=str(p)
 im=Image.new('RGB',(840,1000),'#151e21');d=ImageDraw.Draw(im)
 def txt(x,y,s,size=18,color='#f0ecde',heading=False):d.text((x,y),s,font=ImageFont.truetype(fonts['heading' if heading else 'body'],size),fill=color)
 def box(x,y,w,h,paper=False):d.rounded_rectangle((x,y,x+w,y+h),radius=4,fill='#e3d0a8' if paper else '#202c2f',outline='#aebbb5')
 txt(22,16,'PHOENIX / Shared gear details',31,heading=True)
 txt(22,60,'Review illustration of the new states — not a browser capture',17,'#b1bdb8')
 for x in [20,435]:box(x,105,385,860)
 x=36;txt(x,125,'SHARED REFERENCE',13,'#a7c3a6');txt(x,158,'Feline chest armor',27,heading=True)
 txt(x,202,'Source: v4.04 · current Remastered',17,'#b1bdb8');txt(x,225,'requirements not yet verified',17,'#b1bdb8')
 for i,(tier,level,content) in enumerate([('Basic',17,'Base Game'),('Enhanced',23,'Base Game'),('Superior',29,'Base Game'),('Mastercrafted',34,'Base Game'),('Grandmaster',40,'Blood and Wine')]):
  y=275+i*112;box(x,y,350,96);txt(x+12,y+11,tier+' Feline armor',21,heading=True);txt(x+12,y+43,content,15,'#a7c3a6');txt(x+12,y+66,'Reference level '+str(level)+' · view details',16,'#b1bdb8')
 txt(x,864,'Other slots continue in the same catalogue.',16,'#b1bdb8');txt(x,906,'Return to build',19,'#a7c3a6')
 x=451;txt(x,125,'CHANGE PREVIEW',13,'#a7c3a6');txt(x,158,'Review equipment change',26,heading=True)
 box(x,214,350,126);txt(x+12,230,'Chest armor',21,heading=True);txt(x+12,270,'Superior Feline armor',18);txt(x+12,300,'to Grandmaster Feline armor',18,'#a7c3a6')
 box(x,366,350,210,True);ink='#302921';txt(x+12,382,'Level reference',25,ink,True);txt(x+12,428,'Your recorded level: 29',19,ink);txt(x+12,464,'v4.04 reference requirement: 40',19,ink);txt(x+12,507,'Below that reference level.',18,ink);txt(x+12,538,'Available for planning.',18,ink)
 txt(x,613,'Current-version requirement unverified.',17,'#b1bdb8');txt(x,651,'Calculated stat differences unavailable.',17,'#b1bdb8');txt(x,689,'No combat numbers invented.',17,'#b1bdb8')
 box(x,790,160,49);box(x+180,790,170,49);txt(x+45,804,'Cancel',19);txt(x+194,804,'Apply to draft',19,'#a7c3a6')
 txt(x,866,'Save remains a separate action.',17,'#b1bdb8');txt(x,907,'Draft and designation stay separate.',16,'#b1bdb8')
 im.quantize(colors=128).save(out/'gear-reference-slice.png',optimize=True)
