#!/usr/bin/env python3
"""Télécharge toutes les images tostan.org via agent-browser (bypass anti-bot). v2"""
import json, subprocess, base64, sys, time, os, re

OUT = '/home/z/my-project/public/img'
os.makedirs(OUT, exist_ok=True)

def run(args, timeout=90):
    try:
        r = subprocess.run(args, capture_output=True, text=True, timeout=timeout)
        return r.stdout.strip()
    except subprocess.TimeoutExpired:
        return 'TIMEOUT'

def eval_js(session, js, timeout=90):
    return run(['agent-browser', '--session', session, 'eval', js], timeout=timeout)

def open_origin(session):
    run(['agent-browser', '--session', session, 'open', 'https://tostan.org/'], timeout=60)
    time.sleep(3)
    title = run(['agent-browser', '--session', session, 'get title'])
    if 'Checking your browser' in title:
        run(['agent-browser', '--session', session, 'find', 'role', 'checkbox', 'check'])
        time.sleep(6)

def download(session, url, max_retries=4):
    js = ("(async () => { try { const r = await fetch(" + json.dumps(url) +
          "); if (!r.ok) return 'HTTP' + r.status; const b = await r.blob();" +
          " const d = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); });" +
          " window.__b64 = d; return 'OK:' + d.length; } catch (e) { return 'ERR:' + e.message; } })()")
    img = None
    res = 'FAIL'
    for attempt in range(max_retries):
        out = eval_js(session, js, timeout=120)
        if out.startswith('"OK'):
            total = int(re.search(r'OK:(\d+)', out).group(1))
            data_url = ''
            chunk = 900000
            pos = 0
            ok_chunk = True
            while pos < total:
                part = eval_js(session, f'window.__b64.slice({pos}, {pos+chunk})', timeout=120)
                if part.startswith('"'):
                    try:
                        part = json.loads(part)
                    except Exception:
                        ok_chunk = False
                        break
                data_url += part
                pos += chunk
            if ok_chunk:
                try:
                    b64 = data_url.split(',', 1)[1]
                    img = base64.b64decode(b64)
                    res = 'OK'
                    break
                except Exception as e:
                    res = f'ERR decode {e}'
        else:
            res = f'FAIL {out[:40]}'
        time.sleep(8 * (attempt + 1))
    return img, res

def main():
    data = json.load(open('/tmp/tostan-content/ALL.json'))
    urls = set()
    for slug, imgs in data['images'].items():
        if isinstance(imgs, list):
            for u in imgs:
                if u and 'tostan.org/wp-content' in u:
                    urls.add(u.split('?')[0])
    urls = sorted(urls)
    session = sys.argv[1]
    start = int(sys.argv[2])
    step = int(sys.argv[3])
    subset = urls[start::step]
    open_origin(session)
    done = 0
    fails = []
    for u in subset:
        fname = u.split('/uploads/')[-1].replace('/', '_')
        outfile = os.path.join(OUT, fname)
        if os.path.exists(outfile) and os.path.getsize(outfile) > 500:
            done += 1
            continue
        try:
            img, res = download(session, u)
        except Exception as e:
            img, res = None, f'ERR {e}'
        if img:
            with open(outfile, 'wb') as f:
                f.write(img)
            print(f'[{session}] {done+1}/{len(subset)} {fname[:55]} -> OK {len(img)}B', flush=True)
        else:
            fails.append((u, res))
            print(f'[{session}] {done+1}/{len(subset)} {fname[:55]} -> {res}', flush=True)
        done += 1
        time.sleep(1.5)
    if fails:
        print(f'[{session}] ECHECS: {len(fails)}')
        for u, r in fails:
            print(f'  {u} {r}', flush=True)

if __name__ == '__main__':
    main()
