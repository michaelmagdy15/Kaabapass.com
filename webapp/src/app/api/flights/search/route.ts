// ─── Flight Search API Route ──────────────────────────────────────────────────
// GET /api/flights/search?origin=JFK&destination=JED&departureDate=2026-12-01
//     &returnDate=2026-12-15&adults=2&children=0&infants=0&travelClass=ECONOMY
//
// Returns top 5 cheapest round-trip offers. Results are cached for 10 minutes.
// Falls back to rich mock data when Amadeus credentials are not configured.

import { NextRequest, NextResponse } from "next/server";
import { amadeusConfigured, getAmadeusClient } from "@/lib/amadeus";
import { RouteCache } from "@/lib/route-cache";
import type { FlightOffer } from "@/types";

// Module-level cache — persists across requests in the same Next.js server instance
const cache = new RouteCache<{ source: string; offers: FlightOffer[] }>();

// ── Mock fallback ─────────────────────────────────────────────────────────────
function mockFlightOffers(
  origin: string,
  destination: string,
  travelClass: string
): FlightOffer[] {
  const m = travelClass === "BUSINESS" ? 2.8 : travelClass === "FIRST" ? 4.5 : 1;
  return [
    {
      id: "mock-flight-1",
      source: "mock",
      itineraries: [
        {
          duration: "PT11H30M",
          segments: [
            {
              departure: { iataCode: origin, at: "2026-12-01T10:00:00" },
              arrival: { iataCode: destination, at: "2026-12-01T21:30:00" },
              carrierCode: "SV",
              number: "21",
              duration: "PT11H30M",
              numberOfStops: 0,
            },
          ],
        },
        {
          duration: "PT12H15M",
          segments: [
            {
              departure: { iataCode: destination, at: "2026-12-15T23:00:00" },
              arrival: { iataCode: origin, at: "2026-12-16T11:15:00" },
              carrierCode: "SV",
              number: "22",
              duration: "PT12H15M",
              numberOfStops: 0,
            },
          ],
        },
      ],
      price: {
        currency: "USD",
        total: String(Math.round(890 * m)),
        base: String(Math.round(820 * m)),
        fees: [{ amount: String(Math.round(70 * m)), type: "SUPPLIER" }],
        grandTotal: String(Math.round(890 * m)),
      },
      travelerPricings: [],
      validatingAirlineCodes: ["SV"],
      numberOfBookableSeats: 9,
    },
    {
      id: "mock-flight-2",
      source: "mock",
      itineraries: [
        {
          duration: "PT15H45M",
          segments: [
            {
              departure: { iataCode: origin, at: "2026-12-01T07:00:00" },
              arrival: { iataCode: destination, at: "2026-12-01T22:45:00" },
              carrierCode: "EK",
              number: "203",
              duration: "PT15H45M",
              numberOfStops: 1,
            },
          ],
        },
        {
          duration: "PT16H20M",
          segments: [
            {
              departure: { iataCode: destination, at: "2026-12-15T02:00:00" },
              arrival: { iataCode: origin, at: "2026-12-15T18:20:00" },
              carrierCode: "EK",
              number: "204",
              duration: "PT16H20M",
              numberOfStops: 1,
            },
          ],
        },
      ],
      price: {
        currency: "USD",
        total: String(Math.round(1_050 * m)),
        base: String(Math.round(970 * m)),
        fees: [{ amount: String(Math.round(80 * m)), type: "SUPPLIER" }],
        grandTotal: String(Math.round(1_050 * m)),
      },
      travelerPricings: [],
      validatingAirlineCodes: ["EK"],
      numberOfBookableSeats: 4,
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOffer(raw: any): FlightOffer {
  return {
    id: raw.id,
    source: raw.source,
    itineraries: raw.itineraries,
    price: raw.price,
    travelerPricings: raw.travelerPricings ?? [],
    validatingAirlineCodes: raw.validatingAirlineCodes ?? [],
    numberOfBookableSeats: raw.numberOfBookableSeats ?? 0,
    _raw: raw,
  };
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const origin = sp.get("origin") ?? "JFK";
  const destination = sp.get("destination") ?? "JED";
  const departureDate = sp.get("departureDate");
  const returnDate = sp.get("returnDate");
  const adults = Number(sp.get("adults") ?? "1");
  const children = Number(sp.get("children") ?? "0");
  const infants = Number(sp.get("infants") ?? "0");
  const travelClass = (sp.get("travelClass") ?? "ECONOMY").toUpperCase();

  if (!departureDate || !returnDate) {
    return NextResponse.json(
      { error: "departureDate and returnDate are required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  // ── Check cache ──────────────────────────────────────────────────────────
  const cacheKey = RouteCache.key({
    origin, destination, departureDate, returnDate,
    adults, children, infants, travelClass,
  });
  const cached = cache.get(cacheKey);
  if (cached) {
    return NextResponse.json({ ...cached, cached: true });
  }

  // ── Mock mode ────────────────────────────────────────────────────────────
  if (!amadeusConfigured()) {
    const result = { source: "mock", offers: mockFlightOffers(origin, destination, travelClass) };
    cache.set(cacheKey, result);
    return NextResponse.json({
      ...result,
      message: "Amadeus credentials not configured — returning mock data. Add AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to .env.local.",
    });
  }

  // ── Live Amadeus ─────────────────────────────────────────────────────────
  try {
    const amadeus = getAmadeusClient();
    const params: Record<string, string | number> = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      returnDate,
      adults,
      travelClass,
      currencyCode: "USD",
      max: 5,
    };
    if (children > 0) params.children = children;
    if (infants > 0) params.infants = infants;

    const response = await amadeus.shopping.flightOffersSearch.get(params);
    const result = { source: "live", offers: (response.data ?? []).map(mapOffer) };
    cache.set(cacheKey, result);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[flights/search] Amadeus error:", err);
    const result = {
      source: "mock",
      error: err instanceof Error ? err.message : "Amadeus API error — using mock fallback",
      offers: mockFlightOffers(origin, destination, travelClass),
    };
    // Cache errors briefly (30s) to avoid hammering a failing endpoint
    return NextResponse.json(result);
  }
}
