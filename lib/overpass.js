// Overpass client with mirror failover. Never hardcode a single endpoint —
// single-endpoint Overpass code is the most common cause of this kind of app
// silently breaking.

const DEFAULT_MIRRORS =
  'https://overpass-api.de/api/interpreter,https://overpass.kumi.systems/api/interpreter,https://maps.mail.ru/osm/tools/overpass/api/interpreter,https://overpass.private.coffee/api/interpreter';

function mirrors() {
  return (process.env.OVERPASS_URLS || DEFAULT_MIRRORS)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function overpassQuery(query, { timeoutMs = 30000 } = {}) {
  const urls = mirrors();
  const errors = [];

  for (const url of urls) {
    try {
      // A User-Agent is required (kumi 429s without one), but overpass-api.de's
      // WAF 406s any UA containing an email/@ — so a plain product token only.
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          'User-Agent': 'halfway/0.1',
        },
        body: 'data=' + encodeURIComponent(query),
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!res.ok) {
        errors.push(`${url}: HTTP ${res.status}`);
        continue;
      }
      return await res.json();
    } catch (err) {
      errors.push(`${url}: ${err.name === 'TimeoutError' ? 'timeout' : err.message}`);
    }
  }

  const error = new Error(`All Overpass mirrors failed — ${errors.join('; ')}`);
  error.code = 'OVERPASS_DOWN';
  throw error;
}
