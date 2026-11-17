import type { MetadataRoute } from "next";
import { isApprovedProductionRequest } from "@/config/indexing";
import { APP_URL } from "@/config/routes";

export default async function robots(): Promise<MetadataRoute.Robots> {
  // Page robots metadata is the indexing control. This file must not
  // advertise a non-production host as the indexable production site.
  if (!(await isApprovedProductionRequest())) {
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
