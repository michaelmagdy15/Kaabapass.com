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
