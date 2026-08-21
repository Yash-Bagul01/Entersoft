import type { MetadataRoute } from "next";
import { ROUTES, getCanonicalUrl } from "@/config/routes";

/**
 * Generated from the canonical route config so the sitemap can never drift from
 * the routes that actually ship. Redirect-only and legacy alias routes are
 * deliberately excluded — only canonical, indexable pages belong here.
 */
const SERVICE_PAGES = [
  ROUTES.services.appsec,
  ROUTES.services.vapt,
  ROUTES.services.cloud,
  ROUTES.services.compliance,
  ROUTES.services.siem,
  ROUTES.services.smartContract,
  ROUTES.services.aiAst,
];

const CLOUD_SUBPAGES = [
  ROUTES.services.cloudResilience.assessment,
  ROUTES.services.cloudResilience.penetrationTesting,
  ROUTES.services.cloudResilience.postureManagement,
  ROUTES.services.cloudResilience.managedDetection,
  ROUTES.services.cloudResilience.containersIac,
];

const PLATFORM_PAGES = [
  ROUTES.platform.sast,
  ROUTES.platform.sca,
  ROUTES.platform.sbomLicenseRisk,
  ROUTES.platform.secrets,
  ROUTES.platform.iac,
  ROUTES.platform.container,
  ROUTES.platform.dast,
  ROUTES.platform.agenticPentesting,
  ROUTES.platform.apiSecurity,
  ROUTES.platform.attackSurfaceManagement,
  ROUTES.platform.cloudAppsec,
  ROUTES.platform.aiAppsec,
  ROUTES.platform.aspm,
  ROUTES.platform.complianceReporting,
  ROUTES.platform.threatIntelligence,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: getCanonicalUrl(ROUTES.home),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SERVICE_PAGES.map((path) => ({
      url: getCanonicalUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...PLATFORM_PAGES.map((path) => ({
      url: getCanonicalUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...CLOUD_SUBPAGES.map((path) => ({
      url: getCanonicalUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
