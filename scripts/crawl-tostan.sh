#!/bin/bash
# Crawl de toutes les pages de tostan.org via agent-browser
mkdir -p /tmp/tostan-content
declare -a URLS=(
  "https://tostan.org/about-us/"
  "https://tostan.org/about-us/leadership-team/"
  "https://tostan.org/about-us/board-of-directors/"
  "https://tostan.org/about-us/where-we-work/"
  "https://tostan.org/about-us/awards-recognition/"
  "https://tostan.org/our-work/"
  "https://tostan.org/our-work/program-structure/"
  "https://tostan.org/our-work/modules/"
  "https://tostan.org/training-sharing/training-program/"
  "https://tostan.org/training-sharing/community-practice-community-well-being/"
  "https://tostan.org/our-work/special-projects/"
  "https://tostan.org/our-work/modules/prison-project/"
  "https://tostan.org/covid-19-brochure/"
  "https://tostan.org/areas-of-impact/community-wellbeing/"
  "https://tostan.org/areas-of-impact/child-protection/"
  "https://tostan.org/areas-of-impact/economic-growth/"
  "https://tostan.org/areas-of-impact/human-development/"
  "https://tostan.org/areas-of-impact/education/"
  "https://tostan.org/areas-of-impact/health/"
  "https://tostan.org/areas-of-impact/environment/"
  "https://tostan.org/areas-of-impact/early-child-development/"
  "https://tostan.org/resources/"
  "https://tostan.org/join-our-team/"
  "https://tostan.org/how-to-support/"
  "https://tostan.org/contact/"
  "https://tostan.org/newsletter-sign-up/"
  "https://tostan.org/privacy-policy/"
  "https://tostan.org/peas-fraud-report/"
  "https://tostan.org/jotali-2026/"
  "https://tostan.org/blog/"
  "https://tostan.org/media-space/"
)

for url in "${URLS[@]}"; do
  slug=$(echo "$url" | sed 's|https://tostan.org/||; s|/$||; s|/|__|g')
  [ -z "$slug" ] && slug="home"
  echo "=== Crawling $url -> $slug"
  agent-browser open "$url" >/dev/null 2>&1
  sleep 4
  title=$(agent-browser get title 2>/dev/null)
  if echo "$title" | grep -qi "checking your browser"; then
    agent-browser find role checkbox check >/dev/null 2>&1
    sleep 5
  fi
  agent-browser eval "document.body.innerText" > "/tmp/tostan-content/$slug.txt" 2>/dev/null
  agent-browser eval "JSON.stringify(Array.from(new Set(Array.from(document.querySelectorAll('img')).map(i=>i.src).concat(Array.from(document.querySelectorAll('[style*=background]')).map(e=>{const m=e.getAttribute('style').match(/url\((.*?)\)/);return m?m[1].replace(/['\"]/g,''):null}).filter(Boolean)))))" > "/tmp/tostan-content/$slug.imgs.json" 2>/dev/null
  agent-browser eval "document.title + ' ||| ' + (document.querySelector('meta[property=\"og:image\"]')?.content || 'no-og')" > "/tmp/tostan-content/$slug.meta.txt" 2>/dev/null
  echo "    saved ($(wc -c < /tmp/tostan-content/$slug.txt 2>/dev/null) bytes)"
done
echo "DONE"
