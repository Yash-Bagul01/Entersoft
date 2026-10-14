export type EditorialBlock =
  | { kind: "stats"; items: { value: string; label: string }[] }
  | { kind: "panels"; items: { title: string; body: string }[] }
  | { kind: "steps"; items: { title: string; body: string }[] }
  | { kind: "split"; title: string; body: string; aside: string }
  | { kind: "people"; groups: { title: string; people: { name: string; role: string }[] }[] }
  | { kind: "quote"; quote: string; name: string; role: string }
  | { kind: "prose"; id?: string; title?: string; paragraphs: string[] }
  | { kind: "faq"; title?: string; items: { q: string; a: string }[] }
  | { kind: "index"; items: { meta: string; title: string; body: string; href?: string }[] }
  | { kind: "cta"; title: string; href: string; label: string };

export type EditorialDoc = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  headline: string;
  lede: string;
  blocks: EditorialBlock[];
};
