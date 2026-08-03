// Serialised min-interval queue. Concurrent callers chain onto one promise,
// so requests to a rate-limited upstream (Nominatim: 1/s) never overlap and
// never fire closer together than `minIntervalMs`.

const queues = new Map();

export function rateLimited(name, minIntervalMs, fn) {
  const state = queues.get(name) || { chain: Promise.resolve(), lastRun: 0 };
  queues.set(name, state);

  const run = state.chain.then(async () => {
    const wait = state.lastRun + minIntervalMs - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    state.lastRun = Date.now();
    return fn();
  });

  // The chain must survive individual failures, or one bad request
  // would poison every caller behind it.
  state.chain = run.catch(() => {});
  return run;
}
