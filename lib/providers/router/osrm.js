// OSRM demo server — keyless, local-dev fallback only (no SLA).

export async function routeOsrm(from, to) {
  const base = process.env.OSRM_URL || 'https://router.project-osrm.org';
  // OSRM takes lon,lat pairs in the path.
  const coords = `${from.lng},${from.lat};${to.lng},${to.lat}`;
  const url =
    `${base}/route/v1/driving/${coords}` +
    `?overview=full&geometries=geojson&alternatives=true`;

  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`OSRM HTTP ${res.status}`);
  const data = await res.json();

  if (data.code === 'NoRoute' || !data.routes?.length) {
    const err = new Error('No drivable route between these points');
    err.code = 'NO_ROUTE';
    throw err;
  }
  if (data.code !== 'Ok') throw new Error(`OSRM error: ${data.code}`);

  // OSRM snaps waypoints to the nearest road with UNLIMITED radius: asked to
  // route London → New York, it happily drives you to the coast of Portugal.
  // If an endpoint snapped more than 10 km from where the user actually is,
  // there is no real route to that place.
  const badSnap = (data.waypoints || []).some((w) => (w.distance || 0) > 10000);
  if (badSnap) {
    const err = new Error('No drivable route between these points');
    err.code = 'NO_ROUTE';
    throw err;
  }

  // Convert [lon,lat] → [lat,lng] at the provider boundary so nothing
  // downstream has to think about coordinate order.
  return data.routes.map((r) => ({
    coords: r.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
    distanceKm: r.distance / 1000,
    durationMin: r.duration / 60,
  }));
}
