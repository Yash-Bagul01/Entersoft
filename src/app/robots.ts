import type { MetadataRoute } from "next";
import { APP_URL, IS_PRODUCTION_HOST } from "@/config/routes";

export default function robots(): MetadataRoute.Robots {
  // Preview, staging and local builds must never be indexed.
  if (!IS_PRODUCTION_HOST) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${APP_URL}/sitemap.xml`,
    host: APP_URL,
  };
}
