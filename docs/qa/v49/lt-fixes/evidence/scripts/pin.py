# usage: python3 pin.py <dist> <note> file...   updates SEAM_PINS hashes for listed files, adds history comment
import sys,hashlib,re
d,note,files=sys.argv[1],sys.argv[2],sys.argv[3:]
p=d+'/slice2-nilf.test.cjs';s=open(p).read()
m=re.search(r"const SEAM_PINS=\{(.*?)\};",s);body=m.group(1)
for f in files:
  h=hashlib.sha256(open(d+'/'+f,'rb').read()).hexdigest()
  body2=re.sub(r"('%s':\s*')[0-9a-f]{64}'"%re.escape(f),lambda mm:mm.group(1)+h+"'",body)
  if body2==body and ("'%s'"%f) not in body: body2=body+", '%s': '%s'"%(f,h)
  body=body2
s=s[:m.start(1)]+body+s[m.end(1):]
s=s.replace("const SEAM_PINS={","// "+note+"\nconst SEAM_PINS={",1)
open(p,'w').write(s)
