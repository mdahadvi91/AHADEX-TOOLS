#!/bin/bash
# Ping search engines with updated sitemap
# Run: bash scripts/ping-search-engines.sh

SITEMAP="https://ahadex.fun/sitemap.xml"
RSS="https://ahadex.fun/rss.xml"

echo "═══════════════════════════════════════════════"
echo "🔔 Pinging Search Engines"
echo "═══════════════════════════════════════════════"
echo ""

echo "→ Google:"
curl -s "https://www.google.com/ping?sitemap=$SITEMAP" -o /dev/null -w "  Status: %{http_code}\n"

echo "→ Bing:"
curl -s "https://www.bing.com/ping?sitemap=$SITEMAP" -o /dev/null -w "  Status: %{http_code}\n"

echo "→ Yandex:"
curl -s "https://yandex.com/indexnow?url=$SITEMAP&key=ahadex" -o /dev/null -w "  Status: %{http_code}\n"

echo ""
echo "═══════════════════════════════════════════════"
echo "📡 IndexNow API (Bing + Yandex instant indexing)"
echo "═══════════════════════════════════════════════"
echo ""

# IndexNow key file
cat > public/ahadex-indexnow-key.txt << 'KEYFILE'
ahadex-indexnow-2026-verification-key
KEYFILE

echo "✅ IndexNow key file: /ahadex-indexnow-key.txt"

# Submit batch URLs to IndexNow
URLS_JSON=$(cat << JSONEOF
{
  "host": "ahadex.fun",
  "key": "ahadex-indexnow-2026-verification-key",
  "keyLocation": "https://ahadex.fun/ahadex-indexnow-key.txt",
  "urlList": [
    "https://ahadex.fun/",
    "https://ahadex.fun/tools",
    "https://ahadex.fun/blog",
    "https://ahadex.fun/about",
    "https://ahadex.fun/contact",
    "https://ahadex.fun/editorial-policy"
  ]
}
JSONEOF
)

echo ""
echo "→ IndexNow submit:"
curl -s -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$URLS_JSON" \
  -o /dev/null -w "  Status: %{http_code}\n"

echo ""
echo "✅ Done"
