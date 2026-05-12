import { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://app.kaabapass.com";

export const metadata: Metadata = {
  title: "Privacy Policy | KaabaPass",
  description: "How KaabaPass collects, uses, and protects your personal information during the Umrah booking process. GDPR compliant. No data sold to advertisers.",
  alternates: { canonical: `${BASE_URL}/privacy` },
  robots: { index: true, follow: false },
  openGraph: {
    title: "Privacy Policy | KaabaPass",
    description: "How KaabaPass collects, uses, and protects your personal information during the Umrah booking process.",
    url: `${BASE_URL}/privacy`,
    type: "website",
  },
};

const sections = [
  {
    id: "intro",
    title: "1. Introduction",
    body: `KaabaPass ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains what personal data we collect when you use our platform, how we use it, how we share it, and your rights under applicable law including the GDPR (for EU/EEA users) and US state privacy laws.`,
  },
  {
    id: "data-collected",
    title: "2. Data We Collect",
    body: `When you use KaabaPass we collect: (a) Identity data — full legal name, gender, nationality, passport number, and passport expiry date, as required for visa processing. (b) Contact data — email address and phone number. (c) Payment data — billing address and last 4 digits of card; raw card numbers are handled solely by our PCI-DSS compliant payment processor and never stored on our servers. (d) Usage data — pages visited, search queries, browser/device type, and IP address (collected automatically via cookies and server logs). (e) Communications — any messages you send us via the contact form or WhatsApp.`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Data",
    body: `We use your data to: process and manage your Umrah booking; facilitate visa applications with authorized Saudi Ministry of Hajj partners; send confirmation emails, itinerary updates, and visa status alerts; respond to support inquiries; improve the platform through anonymized usage analytics; comply with legal obligations including AML/KYC and Saudi visa requirements.`,
  },
  {
    id: "sharing",
    title: "4. Data Sharing",
    body: `We share your personal data only with: (a) Licensed Umrah travel partners and visa processing agencies, strictly for completing your booking; (b) Payment processors (Stripe or equivalent) under their own privacy policies; (c) Cloud infrastructure providers (AWS/GCP) operating under data processing agreements; (d) Government authorities when legally required. We do not sell your personal data to advertisers or data brokers.`,
  },
  {
    id: "retention",
    title: "5. Data Retention",
    body: `We retain booking records (including traveler data) for 7 years to comply with travel agent licensing and tax laws. Contact form submissions are retained for 2 years. You may request deletion of marketing data at any time; identity data required for regulatory compliance will be retained for the minimum legally required period.`,
  },
  {
    id: "cookies",
    title: "6. Cookies",
    body: `We use essential cookies for session management (e.g., booking state), and optional analytics cookies (anonymized). No advertising or behavioral tracking cookies are used. You can disable non-essential cookies through your browser settings without affecting core functionality.`,
  },
  {
    id: "rights",
    title: "7. Your Rights",
    body: `You have the right to: access the personal data we hold about you; correct inaccurate data; request deletion of data we are not legally required to retain; object to or restrict certain processing; data portability (receive your data in a structured format); withdraw consent at any time where processing is consent-based. To exercise any right, email privacy@kaabapass.com. We respond within 30 days.`,
  },
  {
    id: "security",
    title: "8. Security",
    body: `We implement TLS encryption for all data in transit, AES-256 encryption for sensitive data at rest, role-based access controls, and regular security audits. Despite these measures, no internet transmission is 100% secure. In the event of a data breach affecting your rights, we will notify you within 72 hours as required by law.`,
  },
  {
    id: "minors",
    title: "9. Minors",
    body: `KaabaPass does not knowingly collect personal data from children under 13. Travelers under 18 must have a parent or legal guardian complete the booking. If you believe a minor's data was submitted without consent, contact us immediately.`,
  },
  {
    id: "contact",
    title: "10. Contact & Complaints",
    body: `Privacy questions or complaints: privacy@kaabapass.com. EU residents may also lodge a complaint with their local Data Protection Authority. We are registered as a data controller under reference KP-2026-DPA.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-neutral min-h-screen">
      <div className="max-w-[760px] mx-auto px-4 md:px-6 py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link href="/" className="font-inter text-body-sm text-muted hover:text-primary transition-colors">
            ← Back to home
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <p className="font-inter text-label text-primary font-medium uppercase tracking-widest mb-3">Legal</p>
          <h1 className="font-fraunces text-h1 text-on-surface mb-3">Privacy Policy</h1>
          <p className="font-inter text-body-md text-muted">Last updated: March 1, 2026</p>
        </div>

        {/* Intro box */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-10">
          <p className="font-inter text-body-md text-secondary leading-relaxed">
            Your passport data, contact details, and payment information are used only to book your Umrah journey.
            We never sell your data. Here is exactly what we collect and why.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="font-fraunces text-h2 text-on-surface mb-3">{s.title}</h2>
              <p className="font-inter text-body-md text-secondary leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-6">
          <Link href="/terms" className="font-inter text-body-sm text-primary hover:underline">Terms of Service</Link>
          <Link href="/contact" className="font-inter text-body-sm text-primary hover:underline">Contact Us</Link>
          <Link href="/" className="font-inter text-body-sm text-muted hover:text-primary hover:underline">Home</Link>
        </div>
      </div>
    </div>
  );
}
