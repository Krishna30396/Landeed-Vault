import { geocodePhoton } from './photon';
import { geocodeNominatim } from './nominatim';

// The provider seam: reads GEOCODER and delegates. Swapping providers is a
// one-line env change, not a code change.

const dedupeKey = (r) => `${r.name}|${r.lat.toFixed(2)}|${r.lng.toFixed(2)}`;

export async function geocode(q, bias) {
  const provider = process.env.GEOCODER || 'photon';
  if (provider === 'nominatim') return geocodeNominatim(q);

  let results = [];
  try {
    results = await geocodePhoton(q, bias);
  } catch {
    // Photon down — fall back to Nominatim (rate-limited internally).
    return geocodeNominatim(q);
  }

  // Thin result set (common for very small localities): merge in Nominatim,
  // which sometimes knows places Photon ranks away.
  if (results.length < 3) {
    try {
      const extra = await geocodeNominatim(q);
      const seen = new Set(results.map(dedupeKey));
      for (const r of extra) {
        if (!seen.has(dedupeKey(r))) results.push(r);
      }
    } catch {
      // Photon's results alone are fine.
    }
  }
  return results;
}
