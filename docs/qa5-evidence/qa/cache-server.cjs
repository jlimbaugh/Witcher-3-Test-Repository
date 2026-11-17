// QA5 returning-browser test server (test harness only; not part of the release).
// Usage: node cache-server.cjs <port> <ctl dir>. Serves the directory named in <ctl>/root on every request (so the
// served build can be swapped on the same origin), with the cache policy named in <ctl>/policy:
//   immutable : HTML  -> Cache-Control: no-cache (+ETag, 304 on match); everything else -> public, max-age=31536000, immutable
//   live      : every file -> public, max-age=0, must-revalidate (+ETag, 304 on match)  [policy observed on the live v45 host]
// Every request is appended to <ctl>/requests.jsonl.
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const [,,port,ctl]=process.argv;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.woff2':'font/woff2','.ttf':'font/ttf','.txt':'text/plain','.jpg':'image/jpeg'};
http.createServer((req,res)=>{
 const root=fs.readFileSync(path.join(ctl,'root'),'utf8').trim(),policy=fs.readFileSync(path.join(ctl,'policy'),'utf8').trim();
 const u=new URL(req.url,'http://x');let p=decodeURIComponent(u.pathname);if(p.endsWith('/'))p+='index.html';
 const file=path.join(root,path.normalize(p));const log={t:Date.now(),root:path.basename(root),url:req.url,inm:req.headers['if-none-match']||null};
 if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404,{'Cache-Control':'no-store'});res.end('404');log.status=404;fs.appendFileSync(path.join(ctl,'requests.jsonl'),JSON.stringify(log)+'\n');return;}
 const body=fs.readFileSync(file),etag='"'+crypto.createHash('sha256').update(body).digest('hex').slice(0,32)+'"',ext=path.extname(file);
 const cc=policy==='live'?'public, max-age=0, must-revalidate':(ext==='.html'?'no-cache':'public, max-age=31536000, immutable');
 const h={'Content-Type':types[ext]||'application/octet-stream','Cache-Control':cc,'ETag':etag};
 if(req.headers['if-none-match']===etag){res.writeHead(304,h);res.end();log.status=304;}else{res.writeHead(200,h);res.end(body);log.status=200;}
 log.cc=cc;fs.appendFileSync(path.join(ctl,'requests.jsonl'),JSON.stringify(log)+'\n');
}).listen(+port,'127.0.0.1');
