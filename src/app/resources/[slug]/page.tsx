import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditorialPage from "@/components/site/EditorialPage";
import { editorialGallery, editorialImage } from "@/data/editorialImages";
import type { EditorialDoc } from "@/data/editorial";
import {
  blogEntries,
  eventSteps,
  faqGroups,
  mediaStories,
  resourceNav,
  webinarSessions,
} from "@/data/resources";
import { ROUTES, getCanonicalUrl } from "@/config/routes";

type PageProps = { params: Promise<{ slug: string }> };

const resourceDocs: Record<string, EditorialDoc> = {
  blog: {
    slug: "blog",
    title: "Blog | Entersoft Security",
    description: "Practice notes from Entersoft on testing, cloud failure, contracts, SAST, DAST and APIs.",
    kicker: "Resources · Blog",
    headline: "Notes from the testing bench.",
    lede: "What the practice keeps seeing: logic flaws scanners miss, cloud updates that take a fleet down, and the difference between a code reading and a running test.",
    blocks: [
      {
        kind: "index",
        items: blogEntries.map((entry) => ({
          meta: `${entry.category} · ${entry.date}`,
          title: entry.title,
          body: entry.teaser,
          href: `#${entry.id}`,
        })),
      },
      ...blogEntries.map((entry) => ({
        kind: "prose" as const,
        id: entry.id,
        title: entry.title,
        paragraphs: [...entry.paragraphs],
      })),
    ],
  },
  media: {
    slug: "media",
    title: "Media | Entersoft Security",
    description: "Public record of Entersoft accreditation, ecosystem work and recognition.",
    kicker: "Resources · Media",
    headline: "The public record, with the date still on it.",
    lede: "Announcements a buyer can check. Each item keeps its source, instead of collapsing into a row of logos.",
    blocks: [
      {
        kind: "index",
        items: mediaStories.map((story) => ({
          meta: `${story.kicker} · ${story.date}`,
          title: story.title,
          body: story.body,
          href: story.href,
        })),
      },
      { kind: "cta", title: "Press, with a deadline in the first line.", href: "mailto:hello@entersoftsecurity.com", label: "hello@entersoftsecurity.com" },
    ],
  },
  faq: {
    slug: "faq",
    title: "FAQ | Entersoft Security",
    description: "How Entersoft scopes a test, what the report claims, and what happens after the findings.",
    kicker: "Resources · FAQ",
    headline: "Questions from the first call.",
    lede: "Scope, tools, evidence, certificates, and the difference between a clean report and a missing one.",
    blocks: faqGroups.map((group) => ({
      kind: "faq" as const,
      title: group.title,
      items: group.items.map((item) => ({ q: item.q, a: item.a })),
    })),
  },
  events: {
    slug: "events",
    title: "Events | Entersoft Security",
    description: "Closed working sessions for fintech leaders and senior white-hat practitioners. Not a webinar.",
    kicker: "Resources · Events",
    headline: "This is not a webinar.",
    lede: "No slide deck. Fintech leaders sit with senior white-hat practitioners and walk the organisation’s security posture one question at a time.",
    blocks: [
      {
        kind: "panels",
        items: [
          { title: "A scan, then a report", body: "Attendees can take a website scan. The report follows within 24 hours." },
          { title: "A posture read", body: "You leave with where the organisation stands, and what to change first." },
          { title: "Time with the people who test", body: "OSCP-certified practitioners who have worked across 15 industries, 30 countries and 450-plus companies." },
        ],
      },
      { kind: "steps", items: eventSteps.map((step) => ({ title: step.title, body: step.body })) },
      { kind: "cta", title: "The room stays small.", href: ROUTES.booking, label: "Request a seat" },
    ],
  },
  webinars: {
    slug: "webinars",
    title: "Webinars | Entersoft Security",
    description: "Entersoft’s quarterly series for small and mid-sized businesses, on cloud risk and identity.",
    kicker: "Resources · Webinars",
    headline: "One subject a quarter. Cloud, then identity.",
    lede: "A series for small and mid-sized businesses: why the risk differs by industry, which practices are current, and which controls actually reduce it.",
    blocks: [
      {
        kind: "index",
        items: webinarSessions.map((session) => ({
          meta: `${session.day} ${session.month} ${session.year}`,
          title: session.title,
          body: session.body,
        })),
      },
      { kind: "cta", title: "Tell us the cloud and the identity stack.", href: ROUTES.contact, label: "Ask for the next session" },
    ],
  },
  hackfest: {
    slug: "hackfest",
    title: "Hackfest | Entersoft Security",
    description: "Entersoft Hackfest puts hackers and builders in one room to find and fix vulnerabilities in a day.",
    kicker: "Resources · Hackfest",
    headline: "Hackers and the team that owns the system, same room.",
    lede: "An AT&T study found that 93% of developers did not consider security while writing code. Hackfest exists to change that habit on a real system, not to admire the statistic.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "93%", label: "Developers who skipped security while writing code, in the AT&T study Entersoft cites" },
          { value: "24h", label: "The working window: find it, then fix it or own it" },
        ],
      },
      {
        kind: "panels",
        items: [
          { title: "Secure coding, current", body: "What changed in the last year of bugs, shown on the code in the room." },
          { title: "Leaders stay", body: "The point is not a scoreboard. It is knowing which flaw can wait and which one cannot." },
          { title: "A culture, not a checklist", body: "Education and collaboration, repeated, so security shows up at the first commit." },
        ],
      },
      {
        kind: "split",
        title: "Hackfest 2023",
        body: "I-Venture organised it with Entersoft. The Indian School of Business hosted it. Operators and companies looked at their own systems while experienced hackers showed how those systems failed. The day was for startups that needed a security practice before the next round of growth.",
        aside: "Edition · 2023",
      },
      { kind: "cta", title: "Bring a hackfest to the team.", href: ROUTES.contact, label: "Start the conversation" },
    ],
  },
};

export function generateStaticParams() {
  return resourceNav.map((item) => ({ slug: item.href.split("/").pop() as string }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = resourceDocs[slug];
  if (!page) return {};
  const canonical = getCanonicalUrl(`/resources/${page.slug}`);
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

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const page = resourceDocs[slug];
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
