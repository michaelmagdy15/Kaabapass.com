import type { Metadata, Viewport } from "next";
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

const BASE_URL = "https://app.kaabapass.com";

export const viewport: Viewport = {
  themeColor: "#193C31",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "KaabaPass — Book Your Complete Umrah Journey from the USA",
    template: "%s | KaabaPass",
  },
  description:
    "Book your complete Umrah journey in minutes. Flights, hotels near Masjid al-Haram, Umrah visa assistance, ground transportation, and scholar-qualified guides — all in one seamless platform for US travelers.",
  keywords: [
    "Umrah packages USA",
    "Umrah travel",
    "book Umrah online",
    "Mecca hotels",
    "Umrah visa assistance",
    "Muslim travel agency USA",
    "Hajj travel",
    "all-inclusive Umrah",
    "Umrah from America",
    "Masjid al-Haram hotel",
    "KaabaPass",
    "Umrah concierge",
    "Umrah guide",
    "cheap Umrah packages",
  ],
  authors: [{ name: "KaabaPass", url: BASE_URL }],
  creator: "KaabaPass",
  publisher: "KaabaPass",
  category: "Travel",
  applicationName: "KaabaPass",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
      "ar-SA": `${BASE_URL}/ar`,
    },
  },

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "KaabaPass",
    title: "KaabaPass — Book Your Complete Umrah Journey from the USA",
    description:
      "One click. We handle everything — flights, hotels near Haram, Umrah visa, ground transport, and licensed guides. Your complete Umrah journey from the USA, simplified.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KaabaPass — Complete Umrah Packages from the USA",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@KaabaPass",
    creator: "@KaabaPass",
    title: "KaabaPass — Book Your Complete Umrah Journey from the USA",
    description:
      "One click. We handle everything — flights, hotels near Haram, Umrah visa, transport, and guides. Launching soon.",
    images: [
      {
        url: "/og-image.png",
        alt: "KaabaPass — Complete Umrah Packages from the USA",
      },
    ],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  verification: {
    // Add your Google / Bing verification tokens here when available
    // google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
    // other: { "msvalidate.01": "YOUR_BING_TOKEN" },
  },

  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "og:email": "info@kaabapass.com",
    "format-detection": "telephone=no",
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
      prefix="og: https://ogp.me/ns#"
      className={`${fraunces.variable} ${inter.variable} ${tajawal.variable}`}
    >
      <head>
        {/* JSON-LD: TravelAgency */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "KaabaPass",
              url: "https://kaabapass.com",
              logo: "https://kaabapass.com/favicon.svg",
              description:
                "KaabaPass is the all-in-one Umrah travel platform. Book flights, Mecca hotels, Umrah visa assistance, ground transport, and licensed guides in one click from the USA.",
              email: "info@kaabapass.com",
              address: { "@type": "PostalAddress", addressCountry: "US" },
              areaServed: { "@type": "Country", name: "United States" },
              serviceType: "Umrah Travel Packages",
              sameAs: ["https://kaabapass.com"],
            }),
          }}
        />
        {/* JSON-LD: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "KaabaPass",
              url: "https://app.kaabapass.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://app.kaabapass.com/search?from={departure}&to=MKE",
                },
                "query-input": "required name=departure",
              },
            }),
          }}
        />
      </head>
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
