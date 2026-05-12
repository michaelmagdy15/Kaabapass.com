// ─── Service Keys ────────────────────────────────────────────────────────────
export type ServiceKey = "flights" | "hotels" | "guides" | "shuttle" | "car-rental" | "visa";

// ─── Package ──────────────────────────────────────────────────────────────────
export interface PackageAddOn {
  key: ServiceKey;
  label: string;
  price: number;
}

export interface Package {
  id: string;
  tier: string;
  name: string;
  badge?: string;
  shortDescription: string;
  pricePerPerson: number;
  highlights: string[];
  hotelStars: number;
  hotelDistanceMeters: number;
  flightClass: "economy" | "business" | "first";
  services: {
    included: ServiceKey[];
    addOns: PackageAddOn[];
  };
}

// ─── Package Customizations ───────────────────────────────────────────────────
export interface PackageCustomizations {
  selectedAddOns: ServiceKey[];
  notes?: string;
}

// ─── Search Params ────────────────────────────────────────────────────────────
export interface SearchParams {
  departureCity: string;
  departureCode: string;
  adults: number;
  children: number;
  infants: number;
  travelWindow: string;
  tripLength: number;
}

// ─── Traveler ─────────────────────────────────────────────────────────────────
export type TravelerGender = "Male" | "Female" | "Prefer not to say";

export interface Traveler {
  id: string;
  fullName: string;
  passportNumber: string;
  passportExpiry: string;
  nationality: string;
  gender: TravelerGender;
  mahramRelationship?: string;
  passportPhotoUploaded: boolean;
  idPhotoUploaded: boolean;
}

// ─── Payment ──────────────────────────────────────────────────────────────────
export type PaymentMethod = "card" | "apple-pay" | "google-pay" | "installments";

// ─── Booking State ────────────────────────────────────────────────────────────
export interface BookingState {
  searchParams: SearchParams;
  selectedPackage?: Package;
  customizations?: PackageCustomizations;
  travelers?: Traveler[];
  paymentMethod?: PaymentMethod;
  bookingRef?: string;
  userEmail?: string;
  bookingComplete?: boolean;
  /** Confirmed live flight offer from Amadeus — set after price-lock */
  confirmedFlight?: ConfirmedFlightOffer;
  /** Confirmed live hotel offer from Amadeus — set after price-lock */
  confirmedHotel?: ConfirmedHotelOffer;
}

// ─── Concierge ───────────────────────────────────────────────────────────────
export interface ConciergeProfile {
  id: string;
  name: string;
  title: string;
  photo?: string;
  languages: string[];
  yearsExperience: number;
  available: string;
  whatsappNumber: string;
  bio?: string;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  firstName: string;
  lastInitial: string;
  city: string;
  ageRange: string;
  tier?: string;
  name?: string;
  text?: string;
  quote?: string;
  rating: number;
}

// ─── Live Flight Types (Amadeus API) ─────────────────────────────────────────

export interface FlightSegment {
  departure: { iataCode: string; at: string };
  arrival: { iataCode: string; at: string };
  carrierCode: string;
  number: string;
  duration: string;
  numberOfStops: number;
}

export interface FlightItinerary {
  duration: string;
  segments: FlightSegment[];
}

export interface FlightPrice {
  currency: string;
  total: string;
  base: string;
  fees: { amount: string; type: string }[];
  grandTotal: string;
}

export interface FlightOffer {
  id: string;
  source: string;
  itineraries: FlightItinerary[];
  price: FlightPrice;
  travelerPricings: unknown[];
  validatingAirlineCodes: string[];
  numberOfBookableSeats: number;
  /** Raw offer object — needed when calling the price-confirmation endpoint */
  _raw?: unknown;
}

// ─── Live Hotel Types (Amadeus API) ──────────────────────────────────────────

export interface HotelAddress {
  lines: string[];
  cityName: string;
  countryCode: string;
}

export interface HotelRoomPrice {
  currency: string;
  total: string;
  base: string;
}

export interface HotelRoom {
  typeEstimated?: { category: string; beds: number; bedType: string };
  description?: { text: string };
}

export interface HotelPolicies {
  cancellations?: { type: string; description?: { text: string } }[];
  checkInOut?: { checkIn: string; checkOut: string };
}

export interface HotelOffer {
  /** Amadeus hotel offer ID — used when calling the /hotels/price endpoint */
  id: string;
  hotelId: string;
  hotelName: string;
  chainCode?: string;
  rating?: string;
  address: HotelAddress;
  price: HotelRoomPrice;
  room: HotelRoom;
  policies?: HotelPolicies;
  checkInDate: string;
  checkOutDate: string;
  boardType?: string;
}

// ─── Booking State — extended with live offer IDs ────────────────────────────

export interface ConfirmedFlightOffer {
  offer: FlightOffer;
  confirmedAt: string; // ISO timestamp — used for "valid for 15 min" countdown
}

export interface ConfirmedHotelOffer {
  offer: HotelOffer;
  confirmedAt: string;
}
