import { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://app.kaabapass.com";

export const metadata: Metadata = {
  title: "Terms of Service | KaabaPass",
  description: "Read the KaabaPass Terms of Service governing your Umrah booking, payments, cancellations, and visa assistance.",
  alternates: { canonical: `${BASE_URL}/terms` },
  robots: { index: true, follow: false },
  openGraph: {
    title: "Terms of Service | KaabaPass",
    description: "Read the KaabaPass Terms of Service governing your Umrah booking, payments, cancellations, and visa assistance.",
    url: `${BASE_URL}/terms`,
    type: "website",
  },
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: `By accessing or using KaabaPass ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Service. KaabaPass reserves the right to update these terms at any time; continued use after changes constitutes acceptance.`,
  },
  {
    id: "services",
    title: "2. Services Provided",
    body: `KaabaPass is an Umrah booking and visa facilitation platform. We coordinate flights, ground transportation, hotel accommodation, and Umrah visa applications on behalf of travelers through our network of licensed Saudi Ministry of Hajj-approved travel partners. KaabaPass acts as a booking agent and is not itself an airline, hotel, or visa-issuing authority.`,
  },
  {
    id: "bookings",
    title: "3. Bookings & Confirmations",
    body: `A booking is confirmed only upon receipt of full or deposit payment as specified at checkout, and issuance of a booking reference number to your registered email. Package prices are quoted in USD and are subject to change until payment is received. All travelers must present valid passports with a minimum of 6 months validity beyond the return date, as required by Saudi authorities.`,
  },
  {
    id: "payments",
    title: "4. Payments",
    body: `Payment is accepted via credit/debit card (Visa, Mastercard, Amex) or bank transfer where offered. All transactions are encrypted and processed by a PCI-DSS compliant payment provider. KaabaPass does not store raw card data. Deposit payments (where applicable) are non-refundable if the booking is cancelled by the traveler.`,
  },
  {
    id: "cancellations",
    title: "5. Cancellations & Refunds",
    body: `Cancellations made 60+ days before departure: full refund minus a 10% administrative fee. 30–59 days: 50% refund. Less than 30 days: no refund. Force majeure events (Saudi government travel restrictions, pandemic closures, natural disasters) may result in full credit toward a future booking. All refund requests must be submitted in writing via our contact form.`,
  },
  {
    id: "visas",
    title: "6. Visa Assistance",
    body: `KaabaPass facilitates Umrah visa applications through authorized channels. Visa approval is ultimately at the discretion of Saudi immigration authorities. KaabaPass cannot guarantee visa issuance and is not liable for visa denials due to incomplete applications, prior travel history, or Saudi government policy changes. Travelers are responsible for submitting accurate personal information.`,
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    body: `To the fullest extent permitted by law, KaabaPass and its partners shall not be liable for any indirect, incidental, or consequential damages, including delays caused by airlines, hotels, or government agencies, injury or illness during travel, or loss of personal property. Our total liability in any circumstance shall not exceed the total amount paid by the traveler for the affected booking.`,
  },
  {
    id: "governing",
    title: "8. Governing Law",
    body: `These Terms shall be governed by the laws of the State of Delaware, USA, without regard to conflict of law principles. Disputes shall be resolved through binding arbitration administered by JAMS, and you waive the right to participate in class action lawsuits.`,
  },
  {
    id: "contact",
    title: "9. Contact",
    body: `Questions about these Terms? Reach us at legal@kaabapass.com or through our contact page. We respond within 3 business days.`,
  },
];

export default function TermsPage() {
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
          <h1 className="font-fraunces text-h1 text-on-surface mb-3">Terms of Service</h1>
          <p className="font-inter text-body-md text-muted">Last updated: March 1, 2026</p>
        </div>

        {/* Intro */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-10">
          <p className="font-inter text-body-md text-secondary leading-relaxed">
            Please read these Terms carefully before making a booking with KaabaPass. They explain your rights,
            our obligations, and what happens if something goes wrong during your journey.
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
          <Link href="/privacy" className="font-inter text-body-sm text-primary hover:underline">Privacy Policy</Link>
          <Link href="/contact" className="font-inter text-body-sm text-primary hover:underline">Contact Us</Link>
          <Link href="/" className="font-inter text-body-sm text-muted hover:text-primary hover:underline">Home</Link>
        </div>
      </div>
    </div>
  );
}
