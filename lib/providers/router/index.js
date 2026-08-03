import { routeOsrm } from './osrm';
import { routeOpenRouteService } from './openrouteservice';

// Provider seam. ROUTER=openrouteservice with a key set uses ORS;
// otherwise the keyless OSRM demo server (local dev fallback).

export async function route(from, to) {
  const provider = process.env.ROUTER || 'openrouteservice';
  if (provider === 'openrouteservice' && process.env.ORS_API_KEY) {
    return routeOpenRouteService(from, to);
  }
  return routeOsrm(from, to);
}
