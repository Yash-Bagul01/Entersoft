/**
 * The single canonical production host. Every canonical URL, sitemap entry and
 * JSON-LD @id resolves against this, so the site never presents two indexable
 * hostnames for the same page. It is intentionally not environment-driven: a
 * canonical URL must always point at production, whatever host serves the page.
 */
export const PRODUCTION_URL = "https://www.entersoftsecurity.com";

export const APP_URL = PRODUCTION_URL;

/**
 * Deploy-specific base, used only for `metadataBase` so relative asset URLs
 * resolve against the host actually serving the page.
 */
export const METADATA_BASE = (
  process.env.NEXT_PUBLIC_APP_URL || PRODUCTION_URL
).replace(/\/$/, "");

/** Preview, staging and local builds must not be indexable. */
export const IS_PRODUCTION_HOST = (() => {
  try {
    return ["www.entersoftsecurity.com", "entersoftsecurity.com"].includes(
      new URL(METADATA_BASE).hostname
    );
  } catch {
    return false;
  }
})();

export const SERVICE_SLUGS = {
  appsec: "application-security-testing",
  vapt: "penetration-testing",
  cloud: "cloud-security",
  compliance: "grc-compliance-privacy",
  siem: "managed-detection-response",
  smartContract: "smart-contract-security",
  aiAst: "ai-security-testing",
} as const;

export const ROUTES = {
  home: "/",
  solutions: "/solutions",
  contact: "/contact",
  booking: "/booking",
  company: {
    accreditations: "/company/accreditations",
  },
  services: {
    appsec: `/services/${SERVICE_SLUGS.appsec}`,
    vapt: `/services/${SERVICE_SLUGS.vapt}`,
    cloud: `/services/${SERVICE_SLUGS.cloud}`,
    compliance: `/services/${SERVICE_SLUGS.compliance}`,
    siem: `/services/${SERVICE_SLUGS.siem}`,
    smartContract: `/services/${SERVICE_SLUGS.smartContract}`,
    aiAst: `/services/${SERVICE_SLUGS.aiAst}`,
    cloudResilience: {
      hub: `/services/${SERVICE_SLUGS.cloud}`,
      assessment: `/services/${SERVICE_SLUGS.cloud}/assessment`,
      penetrationTesting: `/services/${SERVICE_SLUGS.cloud}/penetration-testing`,
      postureManagement: `/services/${SERVICE_SLUGS.cloud}/posture-management`,
      managedDetection: `/services/${SERVICE_SLUGS.cloud}/managed-detection`,
      containersIac: `/services/${SERVICE_SLUGS.cloud}/containers-iac`,
    },
  },
  platform: {
    enprobe: "/platform/enprobe",
    sast: "/platform/sast",
    sca: "/platform/sca",
    sbomLicenseRisk: "/platform/sbom-license-risk",
    secrets: "/platform/secrets",
    iac: "/platform/iac",
    container: "/platform/container",
    dast: "/platform/dast",
    agenticPentesting: "/platform/agentic-pentesting",
    apiSecurity: "/platform/api-security",
    attackSurfaceManagement: "/platform/attack-surface-management",
    cloudAppsec: "/platform/cloud-appsec",
    aiAppsec: "/platform/ai-appsec",
    aspm: "/platform/aspm",
    complianceReporting: "/platform/compliance-reporting",
    threatIntelligence: "/platform/threat-intelligence",
    // Legacy aliases
    cyberOntology: "/platform/sast",
    dataFusion: "/platform/sca",
    exposureDecisioning: "/platform/aspm",
    threatOperations: "/platform/threat-intelligence",
    expertGovernedAi: "/platform/ai-appsec",
    closedLoopRemediation: "/platform/dast",
    continuousAssurance: "/platform/compliance-reporting",
    commandView: "/platform/cloud-appsec",
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
  if (slug === SERVICE_SLUGS.cloud || slug === "cloud-resilience" || slug === "managed-cloud-security" || slug === "cloud") return "cloud-resilience";
  if (slug === SERVICE_SLUGS.compliance || slug === "compliance-management" || slug === "compliance") return "compliance-management";
  if (slug === SERVICE_SLUGS.siem || slug === "siem") return "siem";
  if (slug === SERVICE_SLUGS.smartContract || slug === "smart-contract-audits" || slug === "smart-contract") return "smart-contract-audits";
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
    case "cloud-resilience":
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
