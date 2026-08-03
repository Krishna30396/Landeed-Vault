import { placesOverpass } from './overpass';

// Provider seam. Overpass is the only implemented provider; the seam exists
// so a Google/Foursquare provider could slot in via PLACES_PROVIDER later.

export async function places(params) {
  const provider = process.env.PLACES_PROVIDER || 'overpass';
  if (provider !== 'overpass') {
    throw new Error(`Unknown places provider: ${provider}`);
  }
  return placesOverpass(params);
}
