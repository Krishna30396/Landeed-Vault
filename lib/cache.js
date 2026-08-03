// In-memory TTL cache. Survives across requests within one server process,
// which is exactly the lifetime we want for upstream-response caching.

const store = new Map();
const MAX_ENTRIES = 500;

export function cacheGet(key) {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expires) {
    store.delete(key);
    return undefined;
  }
  return entry.value;
}

export function cacheSet(key, value, ttlMs) {
  if (store.size >= MAX_ENTRIES) {
    // Evict the oldest entry (Map preserves insertion order).
    const oldest = store.keys().next().value;
    store.delete(oldest);
  }
  store.set(key, { value, expires: Date.now() + ttlMs });
}

/** Wrap an async producer with TTL caching keyed on `key`. */
export async function cached(key, ttlMs, producer) {
  const hit = cacheGet(key);
  if (hit !== undefined) return hit;
  const value = await producer();
  cacheSet(key, value, ttlMs);
  return value;
}

export const TTL = {
  GEOCODE: 30 * 60 * 1000,
  ROUTE: 30 * 60 * 1000,
  HUBS: 60 * 60 * 1000,
  PLACES: 20 * 60 * 1000,
};
