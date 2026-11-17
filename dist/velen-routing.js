'use strict';
(function(root){
 const valid=/^#(?:quest\/[a-z0-9-]+\/[1-9][0-9]*|hub\/[a-z0-9-]+|lead\/[a-z0-9-]+|merchants|deferred)$/;
 function sharedHash(value='#velen'){const hash=String(value);if(hash==='#velen'||hash===''||hash==='#')return '#velen';if(hash.startsWith('#velen/'))return valid.test('#'+hash.slice(7))?hash:'#velen';return valid.test(hash)?'#velen/'+hash.slice(1):'#velen';}
 function parse(hash){const value=sharedHash(hash).slice(1).split('/');return {type:value[1]||'velen',id:value[2],stage:value[3]};}
 function resumeHref(href,quests){const match=String(href||'').match(/^(?:velen(?:\.html)?#|#velen\/)quest\/(nilf|pyres|mercy)\/([1-9][0-9]*)$/);if(!match||!quests[match[1]]||Number(match[2])>quests[match[1]].stages.length)return null;return '#velen/quest/'+match[1]+'/'+match[2];}
 function shouldFocus(mode,input){return mode!=='initial'&&mode!=='pop'&&input==='keyboard';}
 function restoreY(mode,entry={}){const n=Number(mode==='pop'?entry.pageY??entry.y:entry.velen?.restoreY);return Number.isFinite(n)&&n>=0?n:0;}
 const model={sharedHash,parse,resumeHref,shouldFocus,restoreY};if(typeof module!=='undefined'&&module.exports)module.exports=model;else root.PhoenixVelenRouting=model;
})(typeof window==='undefined'?null:window);
