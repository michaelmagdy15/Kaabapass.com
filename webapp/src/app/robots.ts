import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = "https://app.kaabapass.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/search", "/contact", "/privacy", "/terms", "/help"],
        disallow: [
          "/dashboard/",
          "/travelers/",
          "/review/",
          "/confirmation/",
          "/api/",
          "/_next/",
        ],
      },
      {
        // Block AI training bots
        userAgent: ["GPTBot", "CCBot", "Diffbot", "anthropic-ai", "Claude-Web"],
        disallow: ["/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
