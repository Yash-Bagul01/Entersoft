import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditorialPage from "@/components/site/EditorialPage";
import { companyPages } from "@/data/companyPages";
import { editorialGallery, editorialImage } from "@/data/editorialImages";
import { getCanonicalUrl } from "@/config/routes";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return companyPages.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = companyPages.find((item) => item.slug === slug);
  if (!page) return {};
  const canonical = getCanonicalUrl(`/company/${page.slug}`);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: "Entersoft Security",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function CompanyStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const page = companyPages.find((item) => item.slug === slug);
  if (!page) notFound();
  const shot = editorialImage(page.slug);
  return (
    <EditorialPage
      kicker={page.kicker}
      headline={page.headline}
      lede={page.lede}
      image={shot.src}
      imageAlt={shot.alt}
      frames={editorialGallery(page.slug)}
      blocks={page.blocks}
    />
  );
}
