import { geocode } from '@/lib/providers/geocode';
import { cached, TTL } from '@/lib/cache';

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const q = params.get('q')?.trim();
  if (!q) {
    return Response.json({ results: [] });
  }

  // Optional ranking bias: the other endpoint the user already picked.
  let bias = null;
  const [blat, blng] = (params.get('near') || '').split(',').map(Number);
  if (Number.isFinite(blat) && Number.isFinite(blng)) bias = { lat: blat, lng: blng };

  const key = `geocode:${q.toLowerCase()}:${bias ? `${bias.lat.toFixed(1)},${bias.lng.toFixed(1)}` : ''}`;
  try {
    const results = await cached(key, TTL.GEOCODE, () => geocode(q, bias));
    return Response.json({ results });
  } catch (err) {
    return Response.json(
      { error: "Couldn't reach the address search. Try again in a moment." },
      { status: 502 }
    );
  }
}
