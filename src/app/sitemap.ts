import type { MetadataRoute } from "next";
import { SITE_URL, OG_IMAGE, PROFILE_IMAGE } from "@/lib/seo";

export const dynamic = "force-static"; // required for `output: "export"`

// lastModified is the build time, so every deploy refreshes it automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [OG_IMAGE, PROFILE_IMAGE],
    },
  ];
}
