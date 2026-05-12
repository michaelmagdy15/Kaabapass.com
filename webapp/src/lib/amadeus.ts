// ─── Amadeus SDK Singleton ────────────────────────────────────────────────────
// This module runs ONLY on the server (Next.js API routes / Server Actions).
// Never import this from a client component — secrets would leak to the browser.

import Amadeus from "amadeus";

// Lazy-init so we only throw at call-time, not at module-load on the edge.
let _client: Amadeus | null = null;

export function getAmadeusClient(): Amadeus {
  if (_client) return _client;

  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;
  const hostname = (process.env.AMADEUS_HOSTNAME ?? "test") as
    | "test"
    | "production";

  if (!clientId || !clientSecret) {
    throw new Error(
      "Amadeus credentials are not configured. " +
        "Add AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to .env.local. " +
        "See .env.local.example for instructions."
    );
  }

  _client = new Amadeus({ clientId, clientSecret, hostname });
  return _client;
}

/** Returns true when credentials are present (used for graceful degradation). */
export function amadeusConfigured(): boolean {
  return !!(
    process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET
  );
}
