'use strict';
// Issue #4 evidence: static server that behaves like a static host cache-wise (Cache-Control: max-age=600, like
// GitHub Pages). HTML_NO_CACHE=1 models an expired index.html. Usage: node serve.cjs <root> <port>. Local only; never used for publication.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const [root,port]=[path.resolve(process.argv[2]),Number(process.argv[3]||8790)];
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.jpg':'image/jpeg','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'};
http.createServer((req,res)=>{const u=decodeURIComponent(new URL(req.url,'http://x').pathname);let f=path.join(root,u.endsWith('/')?u+'index.html':u);if(!f.startsWith(root)){res.writeHead(403);return res.end();}
 fs.readFile(f,(e,b)=>{if(e){res.writeHead(404);return res.end('404');}res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream','Cache-Control':process.env.HTML_NO_CACHE&&f.endsWith('.html')?'no-cache':'max-age=600'});res.end(b);});
}).listen(port,'127.0.0.1',()=>console.log('serving',root,'on',port));
