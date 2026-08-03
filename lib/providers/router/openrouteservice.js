// OpenRouteService — free key, no card. POST, [lon,lat] in AND out;
// converted to [lat,lng] here at the boundary.

export async function routeOpenRouteService(from, to) {
  const base = process.env.ORS_URL || 'https://api.openrouteservice.org';
  const key = process.env.ORS_API_KEY;
  if (!key) {
    const err = new Error('ORS_API_KEY is not set');
    err.code = 'NO_KEY';
    throw err;
  }

  const res = await fetch(`${base}/v2/directions/driving-car/geojson`, {
    method: 'POST',
    headers: {
      Authorization: key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      coordinates: [
        [from.lng, from.lat],
        [to.lng, to.lat],
      ],
      alternative_routes: { target_count: 3, share_factor: 0.6, weight_factor: 1.4 },
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (res.status === 404 || res.status === 400) {
    // ORS returns 404 for unroutable pairs (error code 2009/2010).
    let detail = '';
    try {
      const body = await res.json();
      detail = body?.error?.message || '';
    } catch {}
    if (/route.*not.*found|could not be found/i.test(detail) || res.status === 404) {
      const err = new Error('No drivable route between these points');
      err.code = 'NO_ROUTE';
      throw err;
    }
    throw new Error(`ORS HTTP ${res.status}: ${detail}`);
  }
  if (!res.ok) throw new Error(`ORS HTTP ${res.status}`);

  const data = await res.json();
  if (!data.features?.length) {
    const err = new Error('No drivable route between these points');
    err.code = 'NO_ROUTE';
    throw err;
  }

  return data.features.map((f) => ({
    coords: f.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
    distanceKm: (f.properties?.summary?.distance || 0) / 1000,
    durationMin: (f.properties?.summary?.duration || 0) / 60,
  }));
}
