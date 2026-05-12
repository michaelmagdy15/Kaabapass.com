// ─── Simple In-Memory Cache ───────────────────────────────────────────────────
// Used by all Amadeus API routes to cache results for 10 minutes.
// This avoids hammering the API quota on repeat searches with the same params.
// In production you'd swap this for Redis/Upstash for multi-instance support.

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const TTL_MS = 10 * 60 * 1000; // 10 minutes

export class RouteCache<T = unknown> {
  private store = new Map<string, CacheEntry<T>>();

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.data;
  }

  set(key: string, data: T): void {
    this.store.set(key, { data, expiresAt: Date.now() + TTL_MS });
  }

  /** Generate a stable cache key from a URLSearchParams or plain object */
  static key(params: Record<string, string | number>): string {
    return Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
  }
}
