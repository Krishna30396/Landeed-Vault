const R = 6371; // km
const rad = (d) => (d * Math.PI) / 180;

export function haversine(a, b) {
  const dLat = rad(b[0] - a[0]);
  const dLng = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function cumulative(coords) {
  const steps = [0];
  let total = 0;
  for (let i = 1; i < coords.length; i++) {
    total += haversine(coords[i - 1], coords[i]);
    steps.push(total);
  }
  return { steps, total };
}

/** Point at a given fraction of the polyline's length. */
export function pointAtFraction(coords, fraction = 0.5) {
  if (!coords?.length) return null;
  if (coords.length === 1) return { point: coords[0], walked: 0, total: 0 };

  const { steps, total } = cumulative(coords);
  const target = total * Math.min(1, Math.max(0, fraction));

  let i = 1;
  while (i < steps.length - 1 && steps[i] < target) i++;

  const a = coords[i - 1];
  const b = coords[i];
  const segLength = steps[i] - steps[i - 1];
  const t = segLength === 0 ? 0 : (target - steps[i - 1]) / segLength;

  return {
    point: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t],
    walked: target,
    total,
  };
}
