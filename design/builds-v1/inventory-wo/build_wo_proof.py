"""Build the White Orchard Inventory proof (pass 2).

Writes index.html (relative paths, for a repo checkout), review.html (every asset loaded from
pinned raw.githubusercontent URLs so the file works when downloaded on its own) and proof.png
(headless Chrome static render of index.html at 1200x850). Source photo: owner's IMG_2995,
reused from ../inventory-proof/inventory-reference.jpg. No image generation is used.

Usage: python3 build_wo_proof.py            (render proof.png with google-chrome/chromium)
       python3 build_wo_proof.py --no-render
"""
from pathlib import Path
import shutil, subprocess, sys, tempfile

root = Path(__file__).resolve().parent
# Commit whose tree contains every asset review.html loads (fonts, scene, stone, scroll, wolf,
# reference photo and geralt-cutout.png). Update after the asset commit is pushed.
PIN = 'PINNED_COMMIT'
RAW = f'https://raw.githubusercontent.com/jlimbaugh/Witcher-3-Test-Repository/{PIN}/'
PHOTO_W = 1536  # IMG_2995 width in px; bounds below are in that photo's pixel space
REF = '../inventory-proof/inventory-reference.jpg'

# Muted item-quality fills. Hue category is read from the photo's tile backgrounds; values are
# muted to sit in the stone/silver palette (the camera's blue cast prevents direct sampling).
Q = {'green': '#4e6040', 'blue': '#3f4d68', 'amber': '#5b4a32', 'purple': '#574a68',
     'red': '#6a4038', 'olive': '#5c5d3e', 'plain': '#26251f'}

def tile(x, y, w, h, bounds, label, q, pips=None, count=None, cover=None, cls=''):
    """Photo sprite on a muted quality fill. The sprite is greyscale and blended by luminosity,
    so the tile takes the fill's hue and the camera's blue cast never reaches the icon."""
    a, b, c, d = bounds
    sx, sy = w / (c - a), h / (d - b)
    img = (f'<img src="{REF}" alt="" style="width:{PHOTO_W*sx:.2f}px;height:{1152*sy:.2f}px;'
           f'left:{-a*sx:.2f}px;top:{-b*sy:.2f}px">')
    extra = ''
    if cover:  # hide the photo-baked socket pips so they don't double up with the vector pips
        cx, cy, cw, ch = cover
        extra += f'<i class="cover" style="left:{cx}px;top:{cy}px;width:{cw}px;height:{ch}px"></i>'
    if pips:
        extra += '<span class="pips">' + ''.join(
            f'<i class="pip {"full" if s else "empty"}"></i>' for s in pips) + '</span>'
    if count is not None:
        extra += f'<b class="count">{count}</b>'
    return (f'<div class="tile {cls}" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;'
            f'--q:{Q[q]}" role="img" aria-label="{label}">{img}{extra}</div>')

def label(x, y, w, text, cls='label'):
    return f'<span class="{cls}" style="left:{x}px;top:{y}px;width:{w}px">{text}</span>'

parts = []
# Geralt: segmented cutout of the owner photo with a feathered edge (make_geralt_cutout.py).
parts.append('<div class="stage"></div><img class="geralt" src="geralt-cutout.png" '
             'alt="Geralt from the owner Inventory reference">')

# Left equipped column: steel, silver, bolts, ranged weapon.
parts.append('<div class="frame" style="left:404px;top:140px;width:166px;height:254px"></div>')
# Pip states follow the photo's look (weapons: solid discs, armour: rings); occupancy is illustrative.
parts.append(tile(418, 152, 58, 98, (435, 246, 491, 350), 'Steel weapon', 'green', [1, 1, 1], cover=(0, 0, 18, 46)))
parts.append(tile(498, 152, 58, 98, (531, 246, 587, 350), 'Silver sword', 'green', [1, 1, 1], cover=(0, 0, 18, 46)))
parts.append(label(408, 254, 78, 'Steel weapon') + label(488, 254, 78, 'Silver sword'))
parts.append(tile(420, 276, 54, 82, (445, 406, 501, 490), 'Bolts', 'blue', count=76))
parts.append(tile(500, 276, 54, 82, (539, 404, 593, 484), 'Ranged weapon', 'green'))
parts.append(label(408, 362, 78, 'Bolts') + label(484, 362, 86, 'Ranged weapon'))

# Consumables with reference quantities (4, 5, 4, 3 as shown in IMG_2995).
parts.append('<div class="frame" style="left:404px;top:404px;width:166px;height:146px"></div>')
for (x, y, bounds, n) in [(426, 414, (453, 538, 507, 590), 4), (506, 414, (546, 535, 600, 587), 5),
                          (426, 472, (457, 606, 511, 658), 4), (506, 472, (548, 604, 602, 656), 3)]:
    parts.append(tile(x, y, 50, 50, bounds, f'Consumable, quantity {n}', 'amber', count=n, cls='small'))
parts.append(label(404, 530, 166, 'Consumables', 'group-label'))

# Bombs and pockets, now framed like the other groups.
parts.append('<div class="frame" style="left:404px;top:560px;width:166px;height:94px"></div>')
parts.append(tile(426, 568, 50, 50, (461, 700, 513, 751), 'Bombs, quantity 4', 'amber', count=4, cls='small'))
parts.append(tile(506, 568, 50, 50, (556, 698, 602, 746), 'Pockets', 'plain', cls='small'))
parts.append(label(408, 628, 86, 'Bombs') + label(484, 628, 86, 'Pockets'))

# Right equipped column: armour (socket counts 3, 1, 2, 1 as shown in IMG_2995).
parts.append('<div class="frame" style="left:916px;top:140px;width:160px;height:254px"></div>')
for (x, y, bounds, name, pips) in [(930, 152, (940, 250, 988, 345), 'Chest armor', [0, 0, 0]),
                                   (1008, 152, (1018, 250, 1066, 345), 'Gloves', [0]),
                                   (930, 276, (940, 385, 988, 472), 'Trousers', [0, 0]),
                                   (1008, 276, (1016, 385, 1064, 472), 'Boots', [0])]:
    h = 98 if y == 152 else 82
    parts.append(tile(x, y, 54, h, bounds, name, 'green', pips, cover=(0, 0, 17, 14 * len(pips) + 4)))
    parts.append(label(x - 12, y + h + 4, 78, name))
parts.append('<div class="slot-focus"></div>')

# Compact Roach group (masks deferred).
parts.append('<div class="frame roach" style="left:916px;top:404px;width:160px;height:150px"></div>')
parts.append(label(916, 409, 160, 'Roach', 'group-head'))
for (x, y, bounds, name, q) in [(938, 428, (934, 518, 982, 566), 'Trophy', 'amber'),
                                (1016, 428, (1010, 516, 1058, 564), 'Saddlebags', 'plain'),
                                (938, 490, (934, 591, 980, 637), 'Saddle', 'plain'),
                                (1016, 490, (1008, 585, 1056, 631), 'Horse blinders', 'plain')]:
    parts.append(tile(x, y, 38, 38, bounds, name, q, cls='small'))
    parts.append(label(x - 22, y + 40, 82, name, 'label tiny'))

# Equipment collection: alternatives from the photo's left-hand collection grid, not equipped pieces.
coll = ('<section class="inventory"><h3>Equipment collection</h3>'
        '<p class="sub">Alternatives to the equipped pieces · not equipped</p>')
coll += label(45, 214, 290, 'Runes &amp; glyphs', 'group-head left')
for i, (bounds, q, n) in enumerate([((40, 331, 97, 385), 'green', None), ((103, 331, 159, 383), 'purple', None),
                                    ((165, 331, 220, 383), 'blue', None), ((48, 388, 105, 440), 'olive', 2),
                                    ((111, 388, 166, 440), 'red', None), ((170, 388, 226, 442), 'blue', None)]):
    coll += tile(45 + i * 49, 234, 43, 42, bounds, 'Upgrade from the collection grid' + (f', quantity {n}' if n else ''), q, count=n, cls='small')
coll += label(45, 282, 296, 'Six upgrade tablets from the photo grid · type names not transcribed', 'caption')
coll += label(45, 306, 290, 'Other items', 'group-head left')
for i, (bounds, n) in enumerate([((56, 450, 115, 502), 16), ((116, 448, 175, 502), 12)]):
    coll += tile(45 + i * 55, 326, 48, 42, bounds, f'Unidentified item, quantity {n}', 'blue', count=n, cls='small')
coll += label(155, 330, 186, 'Unidentified items from the photo grid; quantities as shown', 'caption')
coll += label(45, 378, 140, 'Armor', 'group-head left') + label(190, 378, 140, 'Weapons', 'group-head left')
coll += label(45, 396, 140, 'No alternative pieces visible in IMG_2995', 'caption')
coll += label(190, 396, 150, 'No alternative weapons visible in IMG_2995', 'caption')
coll += ('<div class="detail"><p class="quiet">SELECTED PIECE · ARMOR</p><h2>Feline chest armor</h2>'
         '<p>Inspect the piece, change its tier or review its upgrades.</p>'
         '<p class="line">Planning selection: Enhanced</p>'
         '<p class="quiet">Reference level 23 · source v4.04<br>Current-version requirements unverified.</p>'
         '<p class="line quiet">Combat effects and crafting totals await verification.</p></div></section>')

profile = ('<div class="profile">REFERENCE LEVEL<b>36</b><small>Transcribed from owner photos · not computed</small>'
           'AVAILABLE POINTS<b>4</b><small class="illus">Illustrative</small></div>')
dock = ('<div class="dock"><h3>Build controls</h3><button>Inspect piece</button><button>Change tier</button>'
        '<button>Runes / glyphs</button><button>Compare change</button></div>')
legend = ('<div class="legend"><span class="pips"><i class="pip full"></i></span> filled '
          '<span class="pips"><i class="pip empty"></i></span> empty socket · socket counts from IMG_2995; '
          'filled/empty state is illustrative</div>')
note = ('<p class="note">Static design review · Available points are illustrative · Reference level is transcribed, '
        'not computed · Item art cropped from owner photo IMG_2995 (provisional, issue #12) · Masks slot deferred</p>')

CSS = (root / 'layout.css').read_text() + (root / 'palette.css').read_text()
nav = ''.join(f'<span{" class=selected" if t == "INVENTORY" else ""}>{t}</span>' for t in
              ['GLOSSARY', 'ALCHEMY', 'INVENTORY', 'WORLD MAP', 'QUESTS', 'CHARACTER', 'MEDITATION'])
body = (f'<main class="page"><header>PHOENIX · THE WITCHER’S FIELD JOURNAL</header><div class="nav">{nav}</div>'
        + coll + ''.join(parts) + profile + dock + legend
        + '<div class="guide">Open Gear guide &amp; crafting →</div>' + note
        + '<footer class="bottom"><button>Save build</button><button>Save a copy</button>'
          '<span class="caption">White Orchard materials · compact game-menu layout</span>'
          '<img class="wolf" src="../../../dist/wolf-medallion-silver.png" alt="Navigate"></footer></main>')

def page(css, html):
    return ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
            '<title>Inventory proof (pass 2) — IMG_2995</title><style>' + css + '</style></head><body>'
            + html + '</body></html>')

(root / 'index.html').write_text(page(CSS, body))

def pinned(text):
    return (text.replace('../../../dist/', RAW + 'dist/')
                .replace('../inventory-proof/', RAW + 'design/builds-v1/inventory-proof/')
                .replace('src="geralt-cutout.png"', f'src="{RAW}design/builds-v1/inventory-wo/geralt-cutout.png"'))

(root / 'review.html').write_text(pinned(page(CSS, body)))

# Chrome's --screenshot CLI flag hangs on the build box, so drive google-chrome --headless=new
# over the DevTools pipe instead (stdlib only).
import base64, json, os, shutil, subprocess, sys, tempfile, time

def shot(url, out, width=1200, height=850, scale=1, wait=2.5, full=False):
    chrome = shutil.which('google-chrome') or shutil.which('chromium')
    r1, w1 = os.pipe()  # chrome reads commands from fd 3
    r2, w2 = os.pipe()  # chrome writes responses to fd 4
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as prof:
        def child():
            a, b = os.dup(r1), os.dup(w2); os.dup2(a, 3); os.dup2(b, 4); os.set_inheritable(3, True); os.set_inheritable(4, True)
        p = subprocess.Popen([chrome, '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
                              '--no-first-run', f'--user-data-dir={prof}', '--remote-debugging-pipe',
                              f'--window-size={width},{height}', 'about:blank'],
                             close_fds=False, preexec_fn=child, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        os.close(r1); os.close(w2)
        wf = os.fdopen(w1, 'wb', buffering=0); rf = os.fdopen(r2, 'rb', buffering=0)
        buf = b''; n = [0]
        def send(method, params=None, session=None):
            n[0] += 1; msg = {'id': n[0], 'method': method, 'params': params or {}}
            if session: msg['sessionId'] = session
            wf.write(json.dumps(msg).encode() + b'\0'); return n[0]
        def recv_until(mid):
            nonlocal buf
            while True:
                while b'\0' in buf:
                    raw, buf = buf.split(b'\0', 1); m = json.loads(raw)
                    if m.get('id') == mid:
                        if 'error' in m: raise RuntimeError(m['error'])
                        return m.get('result', {})
                chunk = rf.read(65536)
                if not chunk: raise RuntimeError('chrome closed pipe')
                buf += chunk
        try:
            t = recv_until(send('Target.createTarget', {'url': 'about:blank'}))['targetId']
            s = recv_until(send('Target.attachToTarget', {'targetId': t, 'flatten': True}))['sessionId']
            recv_until(send('Page.enable', {}, s))
            recv_until(send('Emulation.setDeviceMetricsOverride', {'width': width, 'height': height, 'deviceScaleFactor': scale, 'mobile': False}, s))
            recv_until(send('Page.navigate', {'url': url}, s))
            time.sleep(wait)
            recv_until(send('Runtime.evaluate', {'expression': 'document.fonts.ready.then(()=>1)', 'awaitPromise': True}, s))
            img = recv_until(send('Page.captureScreenshot', {'format': 'png', 'captureBeyondViewport': full}, s))['data']
            open(out, 'wb').write(base64.b64decode(img))
        finally:
            p.kill(); p.wait()

if '--no-render' not in sys.argv:
    shot((root / 'index.html').as_uri(), str(root / 'proof.png'), 1200, 850, 1)
    print('index.html, review.html and proof.png written; pin', PIN)
