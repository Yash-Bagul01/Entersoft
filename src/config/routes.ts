export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://entersoftsecurity.com";

export const SERVICE_SLUGS = {
  appsec: "appsec", // Future: "application-security-assurance"
  vapt: "vapt",
  cloud: "managed-cloud-security",
  compliance: "compliance-management",
  siem: "siem",
  smartContract: "smart-contract-audits",
  aiAst: "ai-ast",
} as const;

export const ROUTES = {
  home: "/",
  services: {
    appsec: `/services/${SERVICE_SLUGS.appsec}`, // Future: `/offerings/${SERVICE_SLUGS.appsec}`
    vapt: `/services/${SERVICE_SLUGS.vapt}`,
    cloud: `/services/${SERVICE_SLUGS.cloud}`,
    compliance: `/services/${SERVICE_SLUGS.compliance}`,
    siem: `/services/${SERVICE_SLUGS.siem}`,
    smartContract: `/services/${SERVICE_SLUGS.smartContract}`,
    aiAst: `/services/${SERVICE_SLUGS.aiAst}`,
  },
} as const;

/**
 * Normalizes a slug to its corresponding service key in servicePagesData.
 * This ensures that if a slug changes (e.g., "appsec" -> "application-security-assurance"),
 * we can still map it back to the correct data object.
 */
export function getServiceKeyFromSlug(slug: string): string {
  if (slug === SERVICE_SLUGS.appsec || slug === "application-security-assurance" || slug === "appsec") {
    return "appsec";
  }
  if (slug === SERVICE_SLUGS.vapt || slug === "vapt") return "vapt";
  if (slug === SERVICE_SLUGS.cloud || slug === "managed-cloud-security") return "managed-cloud-security";
  if (slug === SERVICE_SLUGS.compliance || slug === "compliance-management") return "compliance-management";
  if (slug === SERVICE_SLUGS.siem || slug === "siem") return "siem";
  if (slug === SERVICE_SLUGS.smartContract || slug === "smart-contract-audits") return "smart-contract-audits";
  if (slug === SERVICE_SLUGS.aiAst || slug === "ai-ast") return "ai-ast";
  return slug;
}

/**
 * Returns the route for a given service slug.
 */
export function getServiceRoute(slug: string): string {
  const key = getServiceKeyFromSlug(slug);
  switch (key) {
    case "appsec":
      return ROUTES.services.appsec;
    case "vapt":
      return ROUTES.services.vapt;
    case "managed-cloud-security":
      return ROUTES.services.cloud;
    case "compliance-management":
      return ROUTES.services.compliance;
    case "siem":
      return ROUTES.services.siem;
    case "smart-contract-audits":
      return ROUTES.services.smartContract;
    case "ai-ast":
      return ROUTES.services.aiAst;
    default:
      return `/services/${slug}`;
  }
}

/**
 * Returns the full canonical URL for a given route.
 */
export function getCanonicalUrl(route: string): string {
  const path = route.startsWith("/") ? route : `/${route}`;
  return `${APP_URL}${path}`;
}
