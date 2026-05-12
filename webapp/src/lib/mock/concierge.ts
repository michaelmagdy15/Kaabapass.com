import type { ConciergeProfile } from "@/types";

export const CONCIERGE_PROFILES: ConciergeProfile[] = [
  {
    id: "hassan",
    name: "Hassan Al-Rashidi",
    photo: "/images/concierge/hassan.jpg",
    languages: ["English", "Arabic", "Urdu"],
    yearsExperience: 11,
    title: "Senior Umrah Concierge",
    whatsappNumber: "+1-800-555-0142",
    available: "Available 24/7",
  },
  {
    id: "fatima",
    name: "Fatima Benali",
    photo: "/images/concierge/fatima.jpg",
    languages: ["English", "Arabic", "French"],
    yearsExperience: 7,
    title: "Umrah Travel Specialist",
    whatsappNumber: "+1-800-555-0198",
    available: "Available 24/7",
  },
  {
    id: "yusuf",
    name: "Yusuf Mahmood",
    photo: "/images/concierge/yusuf.jpg",
    languages: ["English", "Arabic", "Bengali"],
    yearsExperience: 9,
    title: "Senior Umrah Concierge",
    whatsappNumber: "+1-800-555-0173",
    available: "Available 24/7",
  },
];

export const DEFAULT_CONCIERGE = CONCIERGE_PROFILES[0];
