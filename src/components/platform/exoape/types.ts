export type ExoApeAlign = "left" | "right";

export type ExoApeCase = {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
  meta: { label: string; values: string[] }[];
  images: {
    hero: string;
    heroAlt: string;
    wide: string;
    wideAlt: string;
    beliefs: string;
    beliefsAlt: string;
    statement: string;
    statementAlt: string;
    mockup: string;
    mockupAlt: string;
    next: string;
    nextAlt: string;
    collage: { src: string; alt: string }[];
  };
  objective: { lines: string[]; body: string };
  solution: { lines: string[]; left: string; right: string };
  beliefs: {
    label: string;
    items: { word: string; note: string; align: ExoApeAlign }[];
  };
  anticipate: {
    marker: string;
    lines: string[];
    body: string;
    cards: { index: string; label: string; title: string; image: string; alt: string }[];
  };
  railTitle: string;
  stages: { index: string; title: string; body: string; image: string; alt: string }[];
  specs: { label: string; value: string; body: string }[];
  partnershipLines: string[];
  quote: { text: string; name: string; role: string; initials: string };
  recognition: { name: string; detail: string }[];
  mockupCaption: string;
  floatNote: { label: string; title: string };
  faqs?: { question: string; answer: string }[];
  next: { href: string; title: string; subtitle: string };
};
