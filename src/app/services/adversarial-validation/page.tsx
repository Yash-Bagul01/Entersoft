import type { Metadata } from "next";
import AdversarialValidationAnchors from "@/components/services/adversarial-validation/AdversarialValidationAnchors";
import AdversarialValidationHero from "@/components/services/adversarial-validation/AdversarialValidationHero";
import AdversarialValidationCoverage from "@/components/services/adversarial-validation/AdversarialValidationCoverage";
import AdversarialValidationFormats from "@/components/services/adversarial-validation/AdversarialValidationFormats";
import AdversarialValidationScenarios from "@/components/services/adversarial-validation/AdversarialValidationScenarios";
import AdversarialValidationMethod from "@/components/services/adversarial-validation/AdversarialValidationMethod";
import AdversarialValidationEvidence from "@/components/services/adversarial-validation/AdversarialValidationEvidence";
import AdversarialValidationExpert from "@/components/services/adversarial-validation/AdversarialValidationExpert";
import AdversarialValidationDeliverables from "@/components/services/adversarial-validation/AdversarialValidationDeliverables";
import AdversarialValidationStandards from "@/components/services/adversarial-validation/AdversarialValidationStandards";
import AdversarialValidationSafety from "@/components/services/adversarial-validation/AdversarialValidationSafety";
import AdversarialValidationFaqs from "@/components/services/adversarial-validation/AdversarialValidationFaqs";
import AdversarialValidationRelated from "@/components/services/adversarial-validation/AdversarialValidationRelated";
import AdversarialValidationAssessment from "@/components/services/adversarial-validation/AdversarialValidationAssessment";
import AdversarialValidationOverview from "@/components/services/adversarial-validation/AdversarialValidationOverview";
import ServiceBoundary from "@/components/services/adversarial-validation/ServiceBoundary";
import { getCanonicalUrl, ROUTES } from "@/config/routes";
import {
  ORGANIZATION_ID,
  breadcrumbNode,
  organizationNode,
  webPageNode,
  websiteNode,
} from "@/config/seo";
import { AV_PAGE_FOOTER } from "@/data/adversarialValidationPage";

const TITLE = "Adversarial Validation & Penetration Testing | Entersoft";
const DESCRIPTION =
  "Expert-led penetration testing, attack-path validation and threat-led exercises. Understand exposure, test defences and prioritise verified improvements.";
const CANONICAL = getCanonicalUrl(ROUTES.services.adversarialValidation);
const SERVICE_NAME = "Adversarial Validation";
const SERVICE_ID = `${CANONICAL}/#service`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode,
    websiteNode,
    webPageNode({
      canonicalUrl: CANONICAL,
      name: TITLE,
      description: DESCRIPTION,
      about: SERVICE_ID,
      breadcrumb: `${CANONICAL}/#breadcrumb`,
    }),
    {
      "@type": "Service",
      "@id": SERVICE_ID,
      name: SERVICE_NAME,
      serviceType: SERVICE_NAME,
      description: DESCRIPTION,
      url: CANONICAL,
      provider: { "@id": ORGANIZATION_ID },
    },
    breadcrumbNode(CANONICAL, [{ name: SERVICE_NAME, item: CANONICAL }]),
  ],
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Entersoft Security",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function AdversarialValidationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="av-page">
      <AdversarialValidationAnchors />
      <AdversarialValidationHero />
      <div className="av-stage">
        <AdversarialValidationOverview />
        <ServiceBoundary />
        <AdversarialValidationCoverage />
        <AdversarialValidationFormats />
        <AdversarialValidationScenarios />
        <AdversarialValidationMethod />
        <AdversarialValidationEvidence />
        <AdversarialValidationExpert />
        <AdversarialValidationDeliverables />
        <AdversarialValidationStandards />
        <AdversarialValidationSafety />
        <AdversarialValidationFaqs />
        <AdversarialValidationRelated />
        <AdversarialValidationAssessment />
        <p className="av-close">{AV_PAGE_FOOTER}</p>
      </div>
    </main>
    </>
  );
}
