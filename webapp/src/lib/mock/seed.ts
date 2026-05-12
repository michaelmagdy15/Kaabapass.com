import type { ConciergeProfile } from "@/types";

export const CONCIERGE_PROFILES: ConciergeProfile[] = [
  {
    id: "cc-fatima",
    name: "Fatima Al-Rashid",
    title: "Senior Umrah Concierge",
    languages: ["English", "Arabic", "Urdu"],
    yearsExperience: 9,
    available: "24/7",
    whatsappNumber: "+18005550142",
    bio: "Fatima has personally guided over 400 pilgrims through their Umrah journey and specializes in supporting solo women travelers.",
  },
  {
    id: "cc-omar",
    name: "Omar Shaikh",
    title: "VIP Travel Specialist",
    languages: ["English", "Arabic"],
    yearsExperience: 7,
    available: "Mon–Sat",
    whatsappNumber: "+18005550143",
    bio: "Omar focuses on premium and elite Umrah experiences, ensuring every detail exceeds expectations for families and executives.",
  },
  {
    id: "cc-layla",
    name: "Layla Hassan",
    title: "Umrah Documentation Specialist",
    languages: ["English", "Arabic", "French"],
    yearsExperience: 5,
    available: "Mon–Fri",
    whatsappNumber: "+18005550144",
    bio: "Layla specializes in document coordination and visa assistance, guiding every traveler through the process clearly.",
  },
];

export const FAQS = [
  { id: "faq-01", question: "Can a woman travel for Umrah without a mahram?", answer: "Saudi authorities allow women to perform Umrah as part of an organized group without a mahram, provided the group is certified by a licensed travel agency. KaabaPass coordinates this documentation on your behalf through our authorized partners.", category: "visa" },
  { id: "faq-02", question: "How long does visa processing take?", answer: "Umrah visa processing typically takes 3–5 business days through our authorized partners. We advise booking at least 3 weeks before your intended departure to allow ample time.", category: "visa" },
  { id: "faq-03", question: "What is included in the 'all-inclusive' price?", answer: "The quoted price per person includes your round-trip flight, hotel accommodation for the listed nights, all indicated transfers, visa assistance fees, and guide services where noted. Government taxes and airline fuel surcharges are included.", category: "pricing" },
  { id: "faq-04", question: "Can I customize my package?", answer: "Yes. Standard and above packages can be customized — including flight class upgrades, hotel extensions, private transport upgrades, and additional Madinah nights. Speak to your concierge after booking.", category: "packages" },
  { id: "faq-05", question: "What is the cancellation policy?", answer: "Bookings can be cancelled free of charge within 14 days of purchase. Visa processing fees are non-refundable once the application has been submitted. Cancellations made within 7 days of departure are subject to airline and hotel penalties.", category: "booking" },
  { id: "faq-06", question: "Which airports do you fly from?", answer: "We currently depart from JFK, EWR, IAD, ORD, LAX, IAH, ATL, DFW, DTW, and PHL. Additional departure cities are being added. Contact us if your city is not listed.", category: "flights" },
  { id: "faq-07", question: "Do I need to apply for a visa separately?", answer: "No. KaabaPass handles the entire Umrah visa process in cooperation with our authorized visa partners. You will only need to provide your passport and a recent photo.", category: "visa" },
  { id: "faq-08", question: "Is children's pricing different?", answer: "Children ages 2–11 are priced at approximately 70% of the adult rate. Infants under 2 travel free of airline charge (hotel arrangements may vary). Confirm during checkout.", category: "pricing" },
  { id: "faq-09", question: "What is the KaabaPass concierge?", answer: "Every booking includes access to a dedicated KaabaPass concierge reachable via WhatsApp. Your concierge will contact you within 24 hours of booking and remains available throughout your journey.", category: "support" },
  { id: "faq-10", question: "Can I pay in installments?", answer: "Yes. Bookings of $3,000 or more can be split into 4 interest-free installments via our payment partner. You'll see this option at checkout.", category: "pricing" },
];

export const TESTIMONIALS = [
  { id: "t-01", name: "Sarah M.", city: "Dearborn, MI", tier: "Standard", text: "The process was so smooth. From booking to landing at Jeddah, KaabaPass handled everything. I didn't have to worry about a single thing.", rating: 5 },
  { id: "t-02", name: "Yusuf A.", city: "Jersey City, NJ", tier: "Economy", text: "I was skeptical about booking everything online, but the concierge called me within hours and walked me through every step. Alhamdulillah.", rating: 5 },
  { id: "t-03", name: "Aisha K.", city: "Chicago, IL", tier: "Premium", text: "Traveling as a single woman felt completely safe and coordinated. Fatima from the team was incredible. Will use KaabaPass for every trip.", rating: 5 },
  { id: "t-04", name: "Ibrahim & Family", city: "Houston, TX", tier: "Elite", text: "We brought our elderly parents for their first Umrah. The team arranged wheelchairs, private transport, and even a guide who spoke Yoruba. Nothing short of exceptional.", rating: 5 },
  { id: "t-05", name: "Nadia R.", city: "Alexandria, VA", tier: "Standard", text: "The hotel was steps from the Haram. I couldn't believe the view of the Kaaba from our room. Worth every dollar.", rating: 5 },
  { id: "t-06", name: "Dr. Khalid T.", city: "Dallas, TX", tier: "Premium", text: "Our guide was a licensed scholar who taught us the proper way to perform each ritual. That added dimension made this the most spiritually meaningful trip of my life.", rating: 5 },
];

export const SEED_BOOKING_REF = "KBP-2026-00142";
