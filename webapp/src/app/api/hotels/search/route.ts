// ─── Hotel Search API Route ───────────────────────────────────────────────────
// GET /api/hotels/search?checkIn=2026-12-01&checkOut=2026-12-08&adults=2&rooms=1&ratings=4,5
//
// Results cached for 10 minutes. Falls back to mock data without credentials.

import { NextRequest, NextResponse } from "next/server";
import { amadeusConfigured, getAmadeusClient } from "@/lib/amadeus";
import { RouteCache } from "@/lib/route-cache";
import type { HotelOffer } from "@/types";

const cache = new RouteCache<{ source: string; offers: HotelOffer[] }>();

function mockHotelOffers(checkIn: string, checkOut: string): HotelOffer[] {
  const nights =
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 7;

  return [
    {
      id: "mock-hotel-offer-1",
      hotelId: "MKMAKFOUR",
      hotelName: "Pullman Zamzam Makkah",
      chainCode: "PL",
      rating: "5",
      address: {
        lines: ["Abraj Al Bait Tower, King Abdulaziz Rd"],
        cityName: "Makkah",
        countryCode: "SA",
      },
      price: { currency: "USD", total: String(210 * nights), base: String(190 * nights) },
      room: {
        typeEstimated: { category: "DELUXE_ROOM", beds: 1, bedType: "DOUBLE" },
        description: { text: "Deluxe Room, Haram View" },
      },
      policies: {
        checkInOut: { checkIn: "15:00", checkOut: "12:00" },
        cancellations: [{ type: "FULL_STAY", description: { text: "Non-refundable" } }],
      },
      checkInDate: checkIn,
      checkOutDate: checkOut,
      boardType: "ROOM_ONLY",
    },
    {
      id: "mock-hotel-offer-2",
      hotelId: "MKMAKFIVE",
      hotelName: "Makkah Clock Royal Tower — A Fairmont Hotel",
      chainCode: "FK",
      rating: "5",
      address: {
        lines: ["Abraj Al-Bait Complex, King Abdul Aziz Rd"],
        cityName: "Makkah",
        countryCode: "SA",
      },
      price: { currency: "USD", total: String(385 * nights), base: String(350 * nights) },
      room: {
        typeEstimated: { category: "PREMIUM_ROOM", beds: 1, bedType: "KING" },
        description: { text: "Gold Floor King Room, Kaaba View" },
      },
      policies: {
        checkInOut: { checkIn: "15:00", checkOut: "12:00" },
        cancellations: [
          { type: "FULL_STAY", description: { text: "Free cancellation up to 72h before check-in" } },
        ],
      },
      checkInDate: checkIn,
      checkOutDate: checkOut,
      boardType: "BREAKFAST",
    },
    {
      id: "mock-hotel-offer-3",
      hotelId: "MKMAKSTND",
      hotelName: "Dar Al Eiman Grand",
      chainCode: undefined,
      rating: "4",
      address: {
        lines: ["Ibrahim Al Khalil St"],
        cityName: "Makkah",
        countryCode: "SA",
      },
      price: { currency: "USD", total: String(120 * nights), base: String(108 * nights) },
      room: {
        typeEstimated: { category: "STANDARD_ROOM", beds: 2, bedType: "TWIN" },
        description: { text: "Standard Twin Room" },
      },
      policies: { checkInOut: { checkIn: "14:00", checkOut: "12:00" } },
      checkInDate: checkIn,
      checkOutDate: checkOut,
      boardType: "ROOM_ONLY",
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapHotelOffer(raw: any): HotelOffer {
  const offer = raw.offers?.[0] ?? {};
  const hotel = raw.hotel ?? {};
  return {
    id: offer.id ?? raw.id ?? "unknown",
    hotelId: hotel.hotelId ?? hotel.id ?? "unknown",
    hotelName: hotel.name ?? "Unknown Hotel",
    chainCode: hotel.chainCode,
    rating: hotel.rating,
    address: {
      lines: hotel.address?.lines ?? [],
      cityName: hotel.address?.cityName ?? "Makkah",
      countryCode: hotel.address?.countryCode ?? "SA",
    },
    price: {
      currency: offer.price?.currency ?? "USD",
      total: offer.price?.total ?? "0",
      base: offer.price?.base ?? "0",
    },
    room: {
      typeEstimated: offer.room?.typeEstimated,
      description: offer.room?.description,
    },
    policies: offer.policies,
    checkInDate: offer.checkInDate ?? "",
    checkOutDate: offer.checkOutDate ?? "",
    boardType: offer.boardType,
  };
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const checkIn = sp.get("checkIn");
  const checkOut = sp.get("checkOut");
  const adults = Number(sp.get("adults") ?? "1");
  const rooms = Number(sp.get("rooms") ?? "1");
  const ratingsParam = sp.get("ratings") ?? "4,5";

  if (!checkIn || !checkOut) {
    return NextResponse.json(
      { error: "checkIn and checkOut are required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  // ── Check cache ──────────────────────────────────────────────────────────
  const cacheKey = RouteCache.key({ checkIn, checkOut, adults, rooms, ratings: ratingsParam });
  const cached = cache.get(cacheKey);
  if (cached) {
    return NextResponse.json({ ...cached, cached: true });
  }

  // ── Mock mode ────────────────────────────────────────────────────────────
  if (!amadeusConfigured()) {
    const result = { source: "mock", offers: mockHotelOffers(checkIn, checkOut) };
    cache.set(cacheKey, result);
    return NextResponse.json({
      ...result,
      message: "Amadeus credentials not configured — returning mock hotel data.",
    });
  }

  // ── Live Amadeus ─────────────────────────────────────────────────────────
  try {
    const amadeus = getAmadeusClient();

    const hotelListResp = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode: "MKK",
      radius: 2,
      radiusUnit: "KM",
      ratings: ratingsParam,
    });

    const hotelIds: string[] = (hotelListResp.data ?? [])
      .slice(0, 10)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((h: any) => h.hotelId);

    if (hotelIds.length === 0) {
      const result = { source: "mock", offers: mockHotelOffers(checkIn, checkOut) };
      cache.set(cacheKey, result);
      return NextResponse.json(result);
    }

    const offersResp = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds: hotelIds.join(","),
      adults,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      roomQuantity: rooms,
      currency: "USD",
      bestRateOnly: true,
    });

    const result = { source: "live", offers: (offersResp.data ?? []).map(mapHotelOffer) };
    cache.set(cacheKey, result);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[hotels/search] Amadeus error:", err);
    return NextResponse.json({
      source: "mock",
      error: err instanceof Error ? err.message : "Amadeus API error — using mock fallback",
      offers: mockHotelOffers(checkIn, checkOut),
    });
  }
}
