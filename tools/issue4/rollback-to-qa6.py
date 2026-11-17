#!/usr/bin/env python3
"""Restore only an exact shared-walkthrough candidate dist to an exact QA6 kit.

No browser storage or hosting operations. Refuse mismatched/extra files before
writing anything. Manifests include every file and executable mode under dist.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[2]


def inventory(root):
    result = {}
    for path in sorted(root.rglob('*')):
        if path.is_symlink():
            raise ValueError('symlink refused: ' + str(path))
        if path.is_file():
            result[path.relative_to(root).as_posix()] = {
                'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                'mode': '100755' if path.stat().st_mode & 0o111 else '100644',
            }
    return result


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--dist', type=Path, required=True)
    ap.add_argument('--qa6-kit', type=Path, required=True, help='QA6 checkout root')
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()
    dest = args.dist.resolve()
    source = (args.qa6_kit / 'dist').resolve()
    manifests = ROOT / 'docs' / 'issue4-evidence'
    candidate = json.loads((manifests / 'candidate-dist.json').read_text())
    qa6 = json.loads((manifests / 'qa6-dist.json').read_text())
    if not source.is_dir() or not dest.is_dir():
        raise ValueError('both dist directories must exist')
    if source == dest or source in dest.parents or dest in source.parents:
        raise ValueError('source and destination must be separate directories')
    if inventory(source) != qa6:
        print('ABORT: QA6 kit does not match the pinned full inventory')
        return 3
    if inventory(dest) != candidate:
        print('ABORT: starting dist does not match the pinned full candidate inventory')
        return 3
    changed = [p for p in qa6 if candidate.get(p) != qa6[p]]
    added = sorted(set(candidate) - set(qa6))
    print('Verified candidate and QA6: restore %d, remove %d' % (len(changed), len(added)))
    if args.dry_run:
        return 0
    for name in changed:
        target = dest / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source / name, target)
        os.chmod(target, 0o755 if qa6[name]['mode'] == '100755' else 0o644)
    for name in added:
        (dest / name).unlink()
    if inventory(dest) != qa6:
        raise ValueError('post-restore inventory mismatch')
    print('PASS: every QA6 dist byte, path and executable mode matches')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
