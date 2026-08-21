import { APP_URL, getCanonicalUrl, ROUTES } from "./routes";

/**
 * Shared schema.org nodes. Every page that emits JSON-LD references the same
 * Organization and WebSite @ids, so search engines resolve one entity for the
 * site rather than one per page.
 */
export const ORGANIZATION_ID = `${APP_URL}/#organization`;
export const WEBSITE_ID = `${APP_URL}/#website`;

const LOGO_URL =
  "https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg";

export const ORGANIZATION_DESCRIPTION =
  "Entersoft combines the EnProbe platform with expert-led security engineering to discover, validate and close risk across applications, APIs, code, cloud, identity, AI systems and digital assets.";

export const organizationNode = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Entersoft Security",
  url: APP_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${APP_URL}/#logo`,
    url: LOGO_URL,
    caption: "Entersoft Security Logo",
  },
  foundingDate: "2013",
  description: ORGANIZATION_DESCRIPTION,
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: APP_URL,
  name: "Entersoft Security",
  inLanguage: "en",
  publisher: { "@id": ORGANIZATION_ID },
};

export function webPageNode({
  canonicalUrl,
  name,
  description,
  about,
  breadcrumb,
}: {
  canonicalUrl: string;
  name: string;
  description: string;
  about?: string;
  breadcrumb?: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${canonicalUrl}/#webpage`,
    url: canonicalUrl,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    ...(about ? { about: { "@id": about } } : {}),
    ...(breadcrumb ? { breadcrumb: { "@id": breadcrumb } } : {}),
  };
}

/** Breadcrumbs always start at the homepage, per the master SEO document. */
export function breadcrumbNode(
  canonicalUrl: string,
  trail: Array<{ name: string; item: string }>
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}/#breadcrumb`,
    itemListElement: [
      { name: "Home", item: getCanonicalUrl(ROUTES.home) },
      ...trail,
    ].map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}
