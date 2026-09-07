import React from "react";
import type { Metadata } from "next";
import { getCanonicalUrl, ROUTES } from "@/config/routes";
import { organizationNode, webPageNode, websiteNode } from "@/config/seo";
import Hero from "@/components/sections/Hero";
import StatsCounter from "@/components/sections/StatsCounter";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import Differentiators from "@/components/sections/Differentiators";
import Testimonials from "@/components/sections/Testimonials";
import DesignInMotion from "@/components/sections/DesignInMotion";
import InsightsBlog from "@/components/sections/InsightsBlog";
import CertificationsMarquee from "@/components/sections/CertificationsMarquee";
import FinalCTA from "@/components/sections/FinalCTA";
import AnimatedDivider from "@/components/ui/AnimatedDivider";

const TITLE = "Application Security & Penetration Testing | Entersoft";
const DESCRIPTION =
  "Entersoft combines EnProbe automation with expert-led application security, penetration testing, cloud, MDR and AI security services for enterprises.";
const CANONICAL = getCanonicalUrl(ROUTES.home);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Entersoft Security",
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode,
    websiteNode,
    webPageNode({ canonicalUrl: CANONICAL, name: TITLE, description: DESCRIPTION }),
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col w-full relative z-10">
        <Hero />
        <AnimatedDivider />
        <StatsCounter />
        <AnimatedDivider />
        <ServicesShowcase />
        <AnimatedDivider />
        <Differentiators />
        <AnimatedDivider />
        <Testimonials />
        <DesignInMotion />
        <AnimatedDivider />
        <InsightsBlog />
        <AnimatedDivider />
        <CertificationsMarquee />
        <AnimatedDivider />
        <FinalCTA />
      </main>
    </>
  );
}
