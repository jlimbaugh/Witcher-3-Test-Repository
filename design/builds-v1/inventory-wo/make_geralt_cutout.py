"""Rebuild geralt-cutout.png from the owner's IMG_2995 (../inventory-proof/inventory-reference.jpg).

Background removal uses the rembg 'isnet-general-use' segmentation model (pip install rembg).
This is segmentation of the owner photo, not image generation. The cutout is then converted
to a warm silver monotone so the camera's blue cast stays out of Geralt, and its alpha edge is
eroded 1 px and feathered so no matte halo or rectangular crop edge remains.
"""
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps
from rembg import remove, new_session

root = Path(__file__).resolve().parent
photo = Image.open(root.parent / 'inventory-proof/inventory-reference.jpg').convert('RGB')
raw = remove(photo.crop((600, 195, 940, 845)), session=new_session('isnet-general-use')).convert('RGBA')
alpha = raw.getchannel('A').point(lambda v: 0 if v < 40 else v)
alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
lum = ImageOps.autocontrast(raw.convert('RGB').convert('L'), cutoff=0.5)
out = ImageOps.colorize(lum, black=(16, 15, 12), white=(236, 230, 214), mid=(128, 122, 108)).convert('RGBA')
out.putalpha(alpha)
out = out.crop(out.getbbox())
out.save(root / 'geralt-cutout.png', optimize=True)
print('geralt-cutout.png', out.size)
