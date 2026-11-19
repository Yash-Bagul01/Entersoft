import type { Metadata } from "next";
import DigitalTrustHero from "@/components/services/digital-trust/DigitalTrustHero";
import DigitalTrustOutcomes from "@/components/services/digital-trust/DigitalTrustOutcomes";
import DigitalTrustServices from "@/components/services/digital-trust/DigitalTrustServices";
import DigitalTrustTprm from "@/components/services/digital-trust/DigitalTrustTprm";
import DigitalTrustEvidence from "@/components/services/digital-trust/DigitalTrustEvidence";
import DigitalTrustDelivery from "@/components/services/digital-trust/DigitalTrustDelivery";
import DigitalTrustDeliverables from "@/components/services/digital-trust/DigitalTrustDeliverables";
import DigitalTrustFrameworks from "@/components/services/digital-trust/DigitalTrustFrameworks";
import DigitalTrustExperts from "@/components/services/digital-trust/DigitalTrustExperts";
import DigitalTrustEngagements from "@/components/services/digital-trust/DigitalTrustEngagements";
import DigitalTrustFaq from "@/components/services/digital-trust/DigitalTrustFaq";
import DigitalTrustBriefing from "@/components/services/digital-trust/DigitalTrustBriefing";
import { isApprovedProductionRequest } from "@/config/indexing";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import "@/components/services/digital-trust/digital-trust.css";

const PATH = "/services/digital-trust";
const TITLE = "Digital Trust | GRC, Privacy & Third-Party Risk | Entersoft";
const DESCRIPTION =
  "Build evidence-led governance, audit readiness, privacy and third-party risk programmes with Entersoft. Expert-led assurance, supported by EnProbe.";
const CANONICAL = getCanonicalUrl(PATH);
const OG_TITLE = "Digital Trust | Entersoft";

export async function generateMetadata(): Promise<Metadata> {
  const indexable = await isApprovedProductionRequest();

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: CANONICAL,
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: OG_TITLE,
      description: DESCRIPTION,
      url: CANONICAL,
      siteName: "Entersoft Security",
      locale: "en_US",
      type: "website",
    },
  };
}

export default function DigitalTrustPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${APP_URL}/#organization`,
        name: "Entersoft Security",
        url: APP_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${APP_URL}/#logo`,
          url: "https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg",
          caption: "Entersoft Security Logo",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${APP_URL}/#website`,
        url: APP_URL,
        name: "Entersoft Security",
        publisher: { "@id": `${APP_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${CANONICAL}/#webpage`,
        url: CANONICAL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en",
        isPartOf: { "@id": `${APP_URL}/#website` },
        about: { "@id": `${CANONICAL}/#service` },
        breadcrumb: { "@id": `${CANONICAL}/#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${CANONICAL}/#service`,
        name: "Digital Trust",
        serviceType: "Digital Trust",
        provider: { "@id": `${APP_URL}/#organization` },
        description: DESCRIPTION,
        url: CANONICAL,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: getCanonicalUrl(ROUTES.home),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: getCanonicalUrl(ROUTES.servicesHub),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Digital Trust",
            item: CANONICAL,
          },
        ],
      },
    ],
  };

  return (
    <main className="dt-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DigitalTrustHero />
      <DigitalTrustOutcomes />
      <DigitalTrustServices />
      <DigitalTrustTprm />
      <DigitalTrustEvidence />
      <DigitalTrustDelivery />
      <DigitalTrustDeliverables />
      <DigitalTrustFrameworks />
      <DigitalTrustExperts />
      <DigitalTrustEngagements />
      <DigitalTrustFaq />
      <DigitalTrustBriefing />
    </main>
  );
}
