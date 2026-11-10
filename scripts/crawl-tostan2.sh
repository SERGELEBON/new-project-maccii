#!/bin/bash
# Crawl 2: pages manquantes + articles de blog
declare -a URLS=(
  "https://tostan.org/about-us/"
  "https://tostan.org/areas-of-impact/economic-development/"
  "https://tostan.org/tostan-addresses-menstrual-health-insecurity-in-womens-prisons/"
  "https://tostan.org/quand-les-femmes-dirigent-les-communautes-se-transforment/"
  "https://tostan.org/tostan-cep-the-classroom-that-brought-me-back-to-life/"
  "https://tostan.org/tostan-lance-les-candidatures-pour-la-2e-cohorte-de-la-bourse-cheikh-anta-diop/"
  "https://tostan.org/we-were-taking-it-as-our-fight-how-tostans-model-changed-our-approach-in-ghana/"
  "https://tostan.org/why-72-million-young-africans-are-still-waiting-for-an-entry-point/"
  "https://tostan.org/abandoning-female-genital-cutting-it-wasnt-the-fear-of-prison-that-changed-things/"
  "https://tostan.org/ending-child-marriage-and-cutting-the-generation-born-after/"
  "https://tostan.org/new-study-backs-to-stans-civic-model/"
  "https://tostan.org/a-border-that-no-law-can-fully-protect/"
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
echo "DONE2"
