import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static"; // required for `output: "export"`

// Search + AI answer engines are explicitly welcome (GEO). Training-only crawlers
// (Google-Extended, Applebot-Extended, GPTBot) are allowed too; remove them from
// `ai` below if you ever want to opt out of model training but stay in search.
const ai = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Googlebot-Image",
  "Googlebot-Favicons",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ai, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
