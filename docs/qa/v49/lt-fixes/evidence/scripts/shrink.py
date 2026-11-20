import sys,glob,os
from PIL import Image
for f in glob.glob(sys.argv[1]+'/*.jpg'):
    im=Image.open(f)
    if max(im.size)>1000 or os.path.getsize(f)>90000:
        im.thumbnail((900,1400));im.convert('RGB').save(f,quality=55,optimize=True)
