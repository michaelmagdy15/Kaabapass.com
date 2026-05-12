import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Improve SEO-critical Core Web Vitals
  compress: true,

  // Security & SEO headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers (improve trust signals for Google)
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        // Cache static assets aggressively (better LCP / performance score)
        source: "/(.*)\\.(ico|png|svg|jpg|jpeg|webp|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Enable image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
