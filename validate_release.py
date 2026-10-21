#!/usr/bin/env python3
"""Dependency-free static checks for the StudyOrbital S8.0 static release."""
from __future__ import annotations
import json, re, sys, subprocess, tempfile
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.refs=[]; self.inline=[]; self._script=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'script':
            self._script=[] if 'src' not in a else None
        key = {'script':'src','link':'href','img':'src','source':'src'}.get(tag)
        if key and key in a:
            value=a[key]
            if value and not value.startswith(('http://','https://','data:','#','mailto:','javascript:')):
                self.refs.append(value.split('?',1)[0])
    def handle_data(self, data):
        if self._script is not None: self._script.append(data)
    def handle_endtag(self, tag):
        if tag == 'script' and self._script is not None:
            code=''.join(self._script)
            if code.strip(): self.inline.append(code)
            self._script=None

def fail(msg):
    print('FAIL:', msg); sys.exit(1)

html_path=ROOT/'index.html'
if not html_path.is_file(): fail('index.html missing from repository root')
p=AssetParser(); p.feed(html_path.read_text(encoding='utf-8'))
dups=[k for k,v in Counter(p.ids).items() if v>1]
if dups: fail('duplicate HTML ids: '+', '.join(dups))
missing=[]
for ref in p.refs:
    if not (ROOT/ref).is_file(): missing.append(ref)
if missing: fail('missing HTML assets: '+', '.join(sorted(set(missing))))
# Also verify relative URL references in stylesheet and inline CSS blocks.
css_sources=[x.read_text(encoding='utf-8') for x in ROOT.glob('*.css')]
css_sources += re.findall(r'<style[^>]*>(.*?)</style>', html_path.read_text(encoding='utf-8'), re.I|re.S)
for source in css_sources:
    for value in re.findall(r'url\(\s*[\"\']?([^\"\')]+)', source, re.I):
        value=value.strip()
        if value and not value.startswith(('http://','https://','data:','#')):
            target=(ROOT/value.split('?',1)[0])
            if not target.is_file(): fail('missing CSS asset reference: '+value)
manifest=json.loads((ROOT/'manifest.json').read_text(encoding='utf-8'))
for icon in manifest.get('icons',[]):
    if not (ROOT/icon['src']).is_file(): fail('manifest icon missing: '+icon['src'])
sw=(ROOT/'sw.js').read_text(encoding='utf-8')
match=re.search(r'const CORE\s*=\s*\[(.*?)\];',sw,re.S)
if not match: fail('could not find Service Worker CORE asset list')
core=re.findall(r"'([^']+)'",match.group(1))
for item in core:
    path=item.split('?',1)[0]
    if path in ('./', '.'):
        if not ROOT.is_dir(): fail('Service Worker root fallback is missing')
    elif path.startswith('./') and not (ROOT/path[2:]).is_file():
        fail('Service Worker core asset missing: '+item)
if 'studyorbitS80_private_workspace_v1' not in (ROOT/'index.html').read_text() or 'studyorbitS80_private_workspace_v1' not in (ROOT/'studyorbit-auth.js').read_text():
    fail('S8.0 tracker storage namespace is missing or inconsistent')
if 'studyorbit-s80-private-library' not in (ROOT/'studyorbit-library.js').read_text(): fail('S8.0 IndexedDB namespace missing')
if 'teraJEEAdvancedTracker_v3_51chapters' in (ROOT/'index.html').read_text(): fail('legacy tracker key still appears in the new app shell')
if "const CACHE_PREFIX = 'studyorbit-s80-shell-'" not in sw: fail('Service Worker cache cleanup is not isolated from the old app')
sql=(ROOT/'supabase-schema.sql').read_text(encoding='utf-8')
for phrase in ['enable row level security','auth.uid()','public.studyorbit_user_data','studyorbit-private']:
    if phrase.lower() not in sql.lower(): fail('cloud security schema missing required guard: '+phrase)
if "values ('studyorbit-private', 'studyorbit-private', false" not in sql: fail('private Storage bucket is not explicitly configured as private')
for name in ['studyorbit-shell.js','studyorbit-auth.js','studyorbit-library.js']:
    if not (ROOT/name).is_file(): fail('required S8.0 module missing: '+name)
# Ask the system Node runtime to syntax-check inline scripts too.
with tempfile.TemporaryDirectory(prefix='so-inline-') as td:
    for i,code in enumerate(p.inline):
        source=Path(td)/f'inline-{i}.js'; source.write_text(code, encoding='utf-8')
        result=subprocess.run(['node','--check',str(source)],capture_output=True,text=True)
        if result.returncode: fail(f'inline script {i+1} syntax error: {result.stderr.strip()}')
print(f'PASS: {len(p.ids)} unique HTML IDs; {len(p.refs)} local HTML references; manifest and {len(core)} Service Worker core assets valid; {len(p.inline)} inline scripts syntax-valid; S8.0 storage/cache namespaces isolated.')
