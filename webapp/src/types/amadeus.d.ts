// Type shim for the untyped 'amadeus' npm package
declare module "amadeus" {
  interface AmadeusOptions {
    clientId: string;
    clientSecret: string;
    hostname?: "test" | "production";
  }

  interface FlightOffersPricing {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post(body: string): Promise<{ data: any }>;
  }

  interface ShoppingFlightOffersSearch {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(params: Record<string, unknown>): Promise<{ data: any[] }>;
    pricing: FlightOffersPricing;
  }

  interface HotelOfferSearchById {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(): Promise<{ data: any }>;
  }

  interface HotelOffersSearch {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(params: Record<string, unknown>): Promise<{ data: any[] }>;
  }

  interface Shopping {
    flightOffersSearch: ShoppingFlightOffersSearch;
    hotelOfferSearch(offerId: string): HotelOfferSearchById;
    hotelOffersSearch: HotelOffersSearch;
  }

  interface HotelsByCity {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(params: Record<string, unknown>): Promise<{ data: any[] }>;
  }

  interface ReferenceDataLocations {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(params: Record<string, unknown>): Promise<{ data: any[] }>;
    hotels: {
      byCity: HotelsByCity;
    };
  }

  interface ReferenceData {
    locations: ReferenceDataLocations;
  }

  class Amadeus {
    constructor(options: AmadeusOptions);
    shopping: Shopping;
    referenceData: ReferenceData;
  }

  export default Amadeus;
}
