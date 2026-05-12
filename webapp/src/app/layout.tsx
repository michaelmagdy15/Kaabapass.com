import type { Metadata } from "next";
import { Fraunces, Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PrayerStrip } from "@/components/layout/PrayerStrip";
import { BookingProvider } from "@/hooks/useBooking";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KaabaPass — Your Umrah Journey, Simplified",
  description:
    "Book your complete Umrah journey in minutes. Flights, hotels, visas, transportation, and guided experiences — all in one seamless platform.",
  keywords: ["Umrah", "Makkah", "Hajj travel", "Muslim travel", "Umrah packages USA"],
  openGraph: {
    title: "KaabaPass — Your Umrah Journey, Simplified",
    description: "One click. We handle everything. Book your complete Umrah package from the US.",
    url: "https://kaabapass.com",
    siteName: "KaabaPass",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${tajawal.variable}`}
    >
      <body className="bg-neutral min-h-screen">
        <BookingProvider>
          <PrayerStrip />
          <Header />
          <main>{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
