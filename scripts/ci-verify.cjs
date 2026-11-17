'use strict';
// CI support only: never writes application files or browser storage.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
function summary(tap, expected) {
  for (const [key, value] of Object.entries({tests:expected, pass:expected, fail:0, cancelled:0, skipped:0, todo:0})) {
    const matches = [...tap.matchAll(new RegExp('^# '+key+' ([0-9]+)\\r?$','gm'))];
    assert.equal(matches.length, 1, 'missing or duplicate TAP summary: '+key);
    assert.equal(Number(matches[0][1]), value, 'unexpected TAP '+key);
  }
}
function coverage(tracked, listed) {
  assert.equal(new Set(listed).size, listed.length, 'duplicate manifest paths');
  const exemptions = new Set(['docs/MANIFEST.sha256', '.github/workflows/qa6-verification.yml', 'scripts/ci-verify.cjs']);
  // CI source is reviewed by its exact Git commit, explicitly outside the application manifest.
  const actual = new Set(tracked), manifest = new Set(listed);
  const missing = tracked.filter(p => !manifest.has(p) && !exemptions.has(p));
  const stale = listed.filter(p => !actual.has(p));
  assert.deepEqual(missing, [], 'tracked paths absent from manifest');
  assert.deepEqual(stale, [], 'manifest paths absent from tracked tree');
}
function selftest() {
  const tap = '# tests 3\n# pass 3\n# fail 0\n# cancelled 0\n# skipped 0\n# todo 0\n';
  summary(tap,3);
  for (const bad of [
    tap.replace('# skipped 0','# skipped 1'),
    tap.replace('# tests 3','# tests 2'),
    tap.replace('# pass 3','# pass 2'),
    tap.replace('# fail 0','# fail 1'),
    tap.replace('# cancelled 0','# cancelled 1'),
    tap.replace('# todo 0','# todo 1'),
    tap.replace('# skipped 0\n',''),
    tap+'# tests 3\n'
  ]) assert.throws(()=>summary(bad,3));
  coverage(['dist/a.js','docs/MANIFEST.sha256'],['dist/a.js']);
  assert.throws(()=>coverage(['dist/a.js','dist/extra.js'],['dist/a.js']));
  assert.throws(()=>coverage(['dist/a.js'],['dist/a.js','dist/stale.js']));
  assert.throws(()=>coverage(['dist/a.js'],['dist/a.js','dist/a.js']));
  console.log('CI guard self-tests passed: skips, totals, failures, incomplete summaries, manifest omissions.');
}
const [mode, dir, count] = process.argv.slice(2);
if (mode === 'selftest') selftest();
else if (mode === 'coverage') {
  const git = spawnSync('git',['ls-files','-z'],{encoding:'utf8'});
  assert.equal(git.status,0,'git ls-files failed');
  const listed = fs.readFileSync('docs/MANIFEST.sha256','utf8').trimEnd().split('\n').map(line=>{
    const m=/^[a-f0-9]{64}  (.+)$/.exec(line);
    assert.ok(m,'invalid manifest line');return m[1];
  });
  coverage(git.stdout.split('\0').filter(Boolean),listed);
  console.log('Manifest coverage passed; only manifest itself and the two declared CI files are excluded.');
} else if (mode === 'test') {
  const expected=Number(count);assert.ok(Number.isInteger(expected)&&expected>0);
  const cwd=path.resolve(dir);
  const files=fs.readdirSync(cwd).filter(f=>f.endsWith('.test.cjs')).sort();
  assert.ok(files.length,'no tests discovered');
  const result=spawnSync(process.execPath,['--test','--test-reporter=tap',...files],{cwd,encoding:'utf8',maxBuffer:32*1024*1024});
  process.stdout.write(result.stdout||'');process.stderr.write(result.stderr||'');
  assert.ifError(result.error);
  assert.equal(result.signal,null,'test process terminated by signal');
  assert.equal(result.status,0,'test process failed');
  summary(result.stdout,expected);
  console.log('Strict test gate passed: '+expected+' tests, zero skips/failures/cancellations/todos.');
} else throw Error('Use: selftest | coverage | test DIST EXPECTED');
