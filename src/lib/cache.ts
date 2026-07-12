// Tiny TTL cache (in-memory).
//
// Used to stash fetched data so repeat reads are instant until a refetch
// (POST score / sync) invalidates the entry. Per-process only — on
// serverless each instance has its own store. A TTL is kept as a safety net
// so entries can never go stale forever.

interface Entry {
  value: unknown;
  expires: number; // epoch ms
}

const store = new Map<string, Entry>();

export function cacheGet<T>(key: string): T | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expires) {
    store.delete(key);
    return undefined;
  }
  return entry.value as T;
}

export function cacheSet<T>(key: string, value: T, ttlMs: number): void {
  store.set(key, { value, expires: Date.now() + ttlMs });
}

export function cacheDelete(key: string): void {
  store.delete(key);
}
