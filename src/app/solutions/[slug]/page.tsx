import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCanonicalUrl } from "@/config/routes";
import {
  isSolutionLandingSlug,
  SOLUTION_LANDING_BY_SLUG,
  SOLUTION_LANDINGS,
} from "@/data/solutionLandings";
import SolutionLandingPage from "@/components/solutions/SolutionLandingPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SOLUTION_LANDINGS.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isSolutionLandingSlug(slug)) return {};
  const page = SOLUTION_LANDING_BY_SLUG[slug];
  const canonical = getCanonicalUrl(page.href);
  return {
    title: page.metadataTitle,
    description: page.metadataDescription,
    alternates: { canonical },
    openGraph: {
      title: page.metadataTitle,
      description: page.metadataDescription,
      url: canonical,
      siteName: "Entersoft Security",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function SolutionLandingRoute({ params }: PageProps) {
  const { slug } = await params;
  if (!isSolutionLandingSlug(slug)) notFound();
  return <SolutionLandingPage page={SOLUTION_LANDING_BY_SLUG[slug]} />;
}
