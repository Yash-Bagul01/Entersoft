const shot = (id: string, alt: string) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`,
  alt,
});

/** One photograph per subpage. None of these files are used elsewhere on the site. */
export const editorialImages: Record<string, { src: string; alt: string }> = {
  "fintech-security": shot(
    "photo-1590283603385-17ffb3a7f29f",
    "Market chart on a trading display",
  ),
  "e-commerce": shot(
    "photo-1556742049-0cfed4f6a45d",
    "Card payment at a commerce counter",
  ),
  "it-saas": shot(
    "photo-1517048676732-d65bc937f952",
    "Product team working through a release on laptops",
  ),
  "industrial-iot": shot(
    "photo-1565043666747-69f6646db940",
    "Industrial floor with connected machinery",
  ),
  blockchain: shot(
    "photo-1516245834210-c4c142787335",
    "Abstract network used to suggest a distributed system",
  ),
  "health-tech": shot(
    "photo-1576091160399-112ba8d25d1d",
    "Clinician reviewing a patient record on a tablet",
  ),
  about: {
    src: "/images/hero/poster.jpg",
    alt: "Network mesh over a cyber operations display",
  },
  team: shot(
    "photo-1519085360753-af0119f7cbe7",
    "Practitioner walking into a client briefing",
  ),
  clients: shot(
    "photo-1557804506-669a67965ba0",
    "Leadership group in a working session",
  ),
  partners: shot(
    "photo-1521791136064-7986c2920216",
    "Handshake closing a partnership",
  ),
  awards: shot(
    "photo-1567427017947-545c5f8d16ad",
    "Medal marking public recognition",
  ),
  "responsible-disclosures": shot(
    "photo-1504639725590-34d0984388bd",
    "Researcher working through code at night",
  ),
  consulting: shot(
    "photo-1560250097-0b93528c311a",
    "Advisor prepared for a security briefing",
  ),
  careers: shot(
    "photo-1600880292089-90a7e086ee0c",
    "Colleagues starting a working relationship",
  ),
  blog: shot(
    "photo-1499750310107-5fef28a66643",
    "Desk where practice notes are written",
  ),
  media: shot(
    "photo-1504711434969-e33886168f5c",
    "Newsroom desk with the day's papers",
  ),
  faq: shot(
    "photo-1434030216411-0b793f4b4173",
    "Notes laid out before an engagement call",
  ),
  events: shot(
    "photo-1540575467063-178a50c2df87",
    "Hall prepared for a closed working session",
  ),
  webinars: shot(
    "photo-1591115765373-5207764f72e7",
    "Remote session on a laptop screen",
  ),
  hackfest: shot(
    "photo-1633265486064-086b219458ec",
    "Operator working a laptop in a dark room",
  ),
};

const frame = (id: string, alt: string) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`,
  alt,
});

/** Two photographs after the hero. None of these files appear elsewhere on the site. */
export const editorialFrames: Record<string, { src: string; alt: string }[]> = {
  "fintech-security": [
    frame("photo-1556742111-a301076d9d18", "Card terminal at a payments counter"),
    frame("photo-1526304640581-d334cdbbf45e", "Currency counted before a settlement"),
  ],
  "e-commerce": [
    frame("photo-1563013544-824ae1b704d3", "Shopper moving through a retail aisle"),
    frame("photo-1441986300917-64674bd600d8", "Store floor before the doors open"),
  ],
  "it-saas": [
    frame("photo-1519389950473-47ba0277781c", "Product team shipping from a shared table"),
    frame("photo-1537432376769-00f5c2f4c8d2", "Source open on a developer display"),
  ],
  "industrial-iot": [
    frame("photo-1581094794329-c8112a89af12", "Engineer beside connected plant equipment"),
    frame("photo-1581092580497-e0d23cbdf1dc", "Control room watching a production line"),
  ],
  blockchain: [
    frame("photo-1621416894569-0f39ed31d247", "Hardware used to hold digital assets"),
    frame("photo-1621761191319-c6fb62004040", "Token marked for a public ledger"),
  ],
  "health-tech": [
    frame("photo-1576091160550-2173dba999ef", "Clinician with a stethoscope at a desk"),
    frame("photo-1530497610245-94d3c16cda28", "Hospital corridor outside a ward"),
  ],
  about: [
    frame("photo-1486406146926-c627a92ad1ab", "City towers where client teams sit"),
    frame("photo-1446776811953-b23d57bd21aa", "Earth from orbit, the reach of the practice"),
  ],
  team: [
    frame("photo-1521737711867-e3b97375f902", "Team gathered around one table"),
    frame("photo-1551836022-4c4c79ecde51", "Briefing before an assessment starts"),
  ],
  clients: [
    frame("photo-1591696205602-2f950c417cb9", "Client workshop in a glass room"),
    frame("photo-1556761175-b413da4baf72", "Agreement at the end of a working session"),
  ],
  partners: [
    frame("photo-1542744173-8e7e53415bb0", "Partner briefing in a meeting room"),
    frame("photo-1497366811353-6870744d04b2", "Shared office used for joint delivery"),
  ],
  awards: [
    frame("photo-1579621970563-ebec7560ff3e", "Coins stacked as a mark of recognition"),
    frame("photo-1579621970795-87facc2f976d", "Gold pieces on a dark table"),
  ],
  "responsible-disclosures": [
    frame("photo-1517433456452-f9633a875f6f", "Server racks in a research bay"),
    frame("photo-1571171637578-41bc2dd41cd2", "Code reviewed before a disclosure"),
  ],
  consulting: [
    frame("photo-1587825140708-dfaf72ae4b04", "Working session projected for a client"),
    frame("photo-1511578314322-379afb476865", "Hall set for a closed advisory room"),
  ],
  careers: [
    frame("photo-1587614382346-4ec70e388b28", "Desk ready for a new practitioner"),
    frame("photo-1523961131990-5ea7c61b2107", "Machine room where the work is hosted"),
  ],
  blog: [
    frame("photo-1455390582262-044cdead277a", "Typewriter used to draft a practice note"),
    frame("photo-1432888498266-38ffec3eaf0a", "Notebook open beside a laptop"),
  ],
  media: [
    frame("photo-1495020689067-958852a7765e", "Newspapers spread across a desk"),
    frame("photo-1475721027785-f74eccf877e2", "Microphone set for a recorded briefing"),
  ],
  faq: [
    frame("photo-1456327102063-fb5054efe647", "Marked-up notes from a scoping call"),
    frame("photo-1488190211105-8b0e65b80b4e", "Writing a finding in longhand"),
  ],
  events: [
    frame("photo-1492684223066-81342ee5ff30", "Stage lights in a closed venue"),
    frame("photo-1464047736614-af63643285bf", "Room lit for an evening session"),
  ],
  webinars: [
    frame("photo-1510915228340-29c85a43dcfe", "Headphones on for a remote session"),
    frame("photo-1505373877841-8d25f7d46678", "Audience seated for a live briefing"),
  ],
  hackfest: [
    frame("photo-1634704784915-aacf363b021f", "Laptop open during a hands-on exercise"),
    frame("photo-1639322537504-6427a16b0a28", "Abstract chain suggesting a live target"),
  ],
};

export function editorialImage(slug: string) {
  return editorialImages[slug] ?? editorialImages.about;
}

export function editorialGallery(slug: string) {
  return editorialFrames[slug] ?? [];
}
