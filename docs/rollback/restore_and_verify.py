#!/usr/bin/env python3
"""Roll a PHOENIX deployment directory back from v45 Slice 2 (QA5) to the accepted v45 release
(commit a9d61c9454c4e6747a9eb0dc6c7ac9bec6b34820) and verify the result by sha256.

Files only. This script never touches browser storage (localStorage is per browser and is handled by the guarded
in-browser rollbacks described in README.md, section 3). Art and fonts are not touched (Slice 2 did not change them).

Usage:
  python3 restore_and_verify.py --dist <deployed dist dir> [--dry-run] [--force]
  python3 restore_and_verify.py --verify-only --dist <dir>     # check a dir against v45 without changing it
  python3 restore_and_verify.py --self-check                    # verify this bundle only

Repository use (branch recovery/v45-qa5): the v45 kit is not copied next to this script; it is the v45 snapshot
commit itself. Check it out and pass it with --kit, e.g.
  git worktree add /tmp/v45-kit <v45 snapshot commit>     # see docs/rollback/README.md for the SHA
  python3 docs/rollback/restore_and_verify.py --kit /tmp/v45-kit --self-check
--kit defaults to ./v45-source-a9d61c94 beside this script (the layout of the QA5 ZIP bundle).

Exit code 0 only when every check passes.
"""
import argparse, hashlib, os, shutil, sys

HERE = os.path.dirname(os.path.abspath(__file__))
KIT = os.path.join(HERE, 'v45-source-a9d61c94')  # overridden by --kit
MAN = os.path.join(HERE, 'manifests')


def sha(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1 << 16), b''):
            h.update(chunk)
    return h.hexdigest()


def read_manifest(name, strip_prefix=''):
    out = {}
    with open(os.path.join(MAN, name), encoding='utf8') as f:
        for line in f:
            line = line.rstrip('\n')
            if not line:
                continue
            digest, path = line.split('  ', 1)
            if strip_prefix and path.startswith(strip_prefix):
                path = path[len(strip_prefix):]
            out[path] = digest
    return out


def self_check():
    kit = read_manifest('v45-source-a9d61c94.sha256', 'v45-source-a9d61c94/')
    bad = [p for p, d in kit.items() if not os.path.isfile(os.path.join(KIT, p)) or sha(os.path.join(KIT, p)) != d]
    restored = read_manifest('v45-restored-files.sha256')
    bad += [p for p, d in restored.items() if kit.get(p) != d]
    print('bundle self-check: %d v45 kit files, %d mismatches' % (len(kit), len(bad)))
    for p in bad:
        print('  BAD', p)
    return not bad, kit


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dist', help='deployed dist directory (the one holding index.html)')
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--force', action='store_true', help='proceed even if the target is not the QA5 release')
    ap.add_argument('--verify-only', action='store_true')
    ap.add_argument('--self-check', action='store_true')
    ap.add_argument('--kit', help='directory holding the v45 kit (repo root of the v45 snapshot commit); '
                                  'default: v45-source-a9d61c94/ beside this script')
    a = ap.parse_args()
    global KIT
    if a.kit:
        KIT = os.path.abspath(a.kit)
    if not os.path.isdir(KIT):
        print('ABORT: v45 kit not found at %s (pass --kit <checkout of the v45 snapshot commit>)' % KIT)
        return 2

    ok, kit = self_check()
    if not ok:
        print('ABORT: rollback bundle is damaged')
        return 2
    if a.self_check:
        return 0
    if not a.dist or not os.path.isfile(os.path.join(a.dist, 'index.html')):
        print('ABORT: --dist must point at the deployed dist directory (holding index.html)')
        return 2
    dist = os.path.abspath(a.dist)
    rel = lambda p: os.path.join(dist, p[len('dist/'):])  # manifests use dist/... paths

    restored = read_manifest('v45-restored-files.sha256')
    release = read_manifest('qa5-release-files.sha256')
    with open(os.path.join(MAN, 'delete-added-files.txt'), encoding='utf8') as f:
        added = [l.strip() for l in f if l.strip()]

    if not a.verify_only:
        # 1. Pre-check: the target should be the QA5 release.
        diff = [p for p, d in release.items() if not os.path.isfile(rel(p)) or sha(rel(p)) != d]
        print('pre-check: %d/%d QA5 release files match' % (len(release) - len(diff), len(release)))
        for p in diff:
            print('  differs from QA5:', p)
        if diff and not a.force:
            print('ABORT: target is not the QA5 release; inspect it, or re-run with --force')
            return 3
        # 2. Plan
        for p in restored:
            print(('WOULD RESTORE ' if a.dry_run else 'restore ') + p + ' (v45)')
        for p in added:
            if os.path.exists(rel(p)):
                print(('WOULD DELETE ' if a.dry_run else 'delete ') + p + ' (added by Slice 2)')
        if a.dry_run:
            return 0
        for p in restored:
            shutil.copyfile(os.path.join(KIT, p), rel(p))
        for p in added:
            if os.path.exists(rel(p)):
                os.remove(rel(p))

    # 3. Verify: restored files are v45, added files gone, every v45 code-kit file present and byte-identical.
    errors = []
    for p, d in restored.items():
        if not os.path.isfile(rel(p)) or sha(rel(p)) != d:
            errors.append('not v45: ' + p)
    for p in added:
        if os.path.exists(rel(p)):
            errors.append('still present: ' + p)
    kit_dist = {p: d for p, d in kit.items() if p.startswith('dist/')}
    for p, d in kit_dist.items():
        if not os.path.isfile(rel(p)):
            errors.append('missing v45 file: ' + p)
        elif sha(rel(p)) != d:
            errors.append('differs from v45: ' + p)
    print('verify: %d v45 code-kit files under dist/ checked, %d restored, %d added files checked absent; %d errors'
          % (len(kit_dist), len(restored), len(added), len(errors)))
    for e in errors:
        print('  ' + e)
    print('RESULT: ' + ('PASS - target dist matches accepted v45 a9d61c94' if not errors else 'FAIL'))
    return 0 if not errors else 1


if __name__ == '__main__':
    sys.exit(main())
