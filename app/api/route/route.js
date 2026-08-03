import { route } from '@/lib/providers/router';
import { cached, TTL } from '@/lib/cache';

function parsePoint(s) {
  const [lat, lng] = (s || '').split(',').map(Number);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { lat, lng };
}

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const from = parsePoint(params.get('from'));
  const to = parsePoint(params.get('to'));

  if (!from || !to) {
    return Response.json({ error: 'Both locations are needed.' }, { status: 400 });
  }
  if (from.lat === to.lat && from.lng === to.lng) {
    return Response.json(
      { error: 'Those are the same place — pick two different locations.', code: 'SAME_POINT' },
      { status: 400 }
    );
  }

  const key = `route:${from.lat},${from.lng}:${to.lat},${to.lng}`;
  try {
    const routes = await cached(key, TTL.ROUTE, () => route(from, to));
    return Response.json({ routes });
  } catch (err) {
    if (err.code === 'NO_ROUTE') {
      return Response.json(
        {
          error: "No drivable route connects these two points. If they're separated by water or an ocean, driving halfway isn't possible.",
          code: 'NO_ROUTE',
        },
        { status: 422 }
      );
    }
    return Response.json(
      { error: "Couldn't reach the routing service. Try again in a moment." },
      { status: 502 }
    );
  }
}
