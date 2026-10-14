import { ROUTES } from "@/config/routes";
import type { EditorialDoc } from "@/data/editorial";

const assurance = [
  { title: "Exploit-first evidence", body: "Every finding includes a proof of concept and a statement of impact. A scanner line on its own is not a result." },
  { title: "Seventy negative checks", body: "Each application also gets a recorded set of checks that were attempted and did not reproduce. Absence is part of the evidence." },
  { title: "Fixes a developer can merge", body: "Diffs, sample code and pull-request notes, written against the stack the team already ships." },
  { title: "Retest when the patch lands", body: "ReAuto is an on-demand retest from the portal. The same senior analysts stay on the account. Entersoft’s published record is thirteen years without a breach under that watch." },
];

const engagement = [
  { title: "Pre-engagement", body: "We start from your priorities: what must not leak, what a regulator will ask, and which systems are actually in scope." },
  { title: "Secure onboarding", body: "Environments, domains and the testing approach are agreed before the first payload. Production impact is a decision, not a surprise." },
  { title: "Assessment, then a person", body: "An automated pass is followed by a certified tester. The finding is a request that reproduces, not a scanner line on its own." },
  { title: "Tracked fixes", body: "Issues are scored and kept in the vulnerability portal so your developers can see owner, severity and status in one place." },
  { title: "Report and retest", body: "The assessment report is the start. After patches land, a retest checks the closures and a final report records what held." },
];

export const industries: EditorialDoc[] = [
  {
    slug: "fintech-security",
    title: "Fintech Security | Entersoft",
    description: "Application security and penetration testing for fintech platforms that hold personal and card data.",
    kicker: "Industries · Fintech",
    headline: "Fintech security for data that cannot leak.",
    lede: "Payments, onboarding and lending platforms are judged on whether customer data stays where it was put. Entersoft tests those systems the way an attacker would, then stays through the fix.",
    blocks: [
      {
        kind: "panels",
        items: [
          { title: "Personal and card data", body: "The assets that matter are PII and payment data. A test that never touches those flows is the wrong test." },
          { title: "Fraud and phishing", body: "Attackers still trick staff and customers into handing over access. The assessment includes the paths that start with a person, not only the API." },
          { title: "Ransom and downtime", body: "Encrypted records and a flooded service are business events. The work names what would stop the platform, not only what would embarrass it." },
        ],
      },
      {
        kind: "steps",
        items: [
          { title: "Vulnerability assessment", body: "Weak points in the systems and applications customers actually use." },
          { title: "Penetration testing", body: "Simulated attacks against the controls you believe are in place." },
          { title: "Data protection", body: "Where sensitive financial data moves, and whether it is protected in transit and at rest." },
          { title: "Risk assessment", body: "The leakage points a bank, a partner or a regulator will ask about." },
          { title: "Compliance evidence", body: "Work shaped so GDPR, PCI DSS and similar obligations can be shown, not only named." },
        ],
      },
      {
        kind: "split",
        title: "A fintech, a bank, and three months",
        body: "A leading Australian fintech could not clear a major bank’s security review. The gaps were specific enough to block the relationship. Entersoft rebuilt the posture with the team. Within three months the fintech was in a position to work with the bank.",
        aside: "Published case · financial services",
      },
      { kind: "steps", items: engagement },
      {
        kind: "quote",
        quote: "Their manual testing is tailored to the business, finds issues other assessments miss, and keeps false positives down. The team stays responsive through testing and the report.",
        name: "Ashutosh Kapse",
        role: "CISO, IOOF Holdings",
      },
      { kind: "panels", items: assurance },
      { kind: "cta", title: "Bring a fintech scope.", href: ROUTES.contact, label: "Book a briefing" },
    ],
  },
  {
    slug: "e-commerce",
    title: "E-commerce Security | Entersoft",
    description: "Security assessments for commerce sites and the customer and payment data they hold.",
    kicker: "Industries · E-commerce",
    headline: "Commerce fails in public when the checkout does.",
    lede: "A breach here is lost trust, a payments argument, and a weekend of downtime. Entersoft assesses the site and the network around it, with security designed in rather than scanned on at the end.",
    blocks: [
      {
        kind: "panels",
        items: [
          { title: "Fraud", body: "Account takeover, promo abuse and payment flows that trust the browser. These are business-logic problems as often as they are missing headers." },
          { title: "Customer data", body: "Names, addresses and cards sit in more systems than the storefront. The assessment follows the data, including the plugins and the admin path." },
          { title: "Availability", body: "A denial-of-service or a poisoned deployment takes the shop offline. The test says which control would have kept the till open." },
        ],
      },
      {
        kind: "prose",
        title: "How the work is run",
        paragraphs: [
          "CREST-accredited and OSCP-certified testers run an e-commerce risk assessment with the methods the target actually needs: the catalogue, the cart, the account, the admin, the integrations.",
          "The fix is designed with your stack. Security by design means the next release does not reintroduce the same checkout flaw because nobody wrote it down.",
        ],
      },
      { kind: "steps", items: engagement },
      { kind: "panels", items: assurance },
      { kind: "cta", title: "Scope a storefront.", href: ROUTES.contact, label: "Talk to the practice" },
    ],
  },
  {
    slug: "it-saas",
    title: "SaaS Security | Entersoft",
    description: "Security testing for multi-tenant SaaS products, their APIs and the data tenants trust the platform with.",
    kicker: "Industries · IT and SaaS",
    headline: "A SaaS product is only as private as its tenant boundary.",
    lede: "SaaS won on cost and speed. It also concentrated customer data behind one login. Entersoft tests whether one tenant can see another, and whether a release can ship that mistake again.",
    blocks: [
      {
        kind: "panels",
        items: [
          { title: "Tenant isolation", body: "The expensive bug is an object ID that belongs to someone else. Inventory the objects, then try to read and change them with a valid token." },
          { title: "The release train", body: "A point-in-time test goes stale the week a service ships. The useful engagement leaves a way to retest the boundary, not only a PDF." },
          { title: "Identity", body: "Over-privileged roles and missing MFA are how real SaaS incidents start. The identity model is in scope, not an appendix." },
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "Entersoft’s testers work the product the way a customer’s attacker would: signup, roles, APIs, admin, and the forgotten version still deployed beside the current one.",
          "Security by design here means the finding names the invariant — this role cannot read that tenant — so engineering can put it in CI.",
        ],
      },
      { kind: "steps", items: engagement },
      { kind: "panels", items: assurance },
      { kind: "cta", title: "Test the tenant boundary.", href: ROUTES.services.appsec, label: "See application assurance" },
    ],
  },
  {
    slug: "industrial-iot",
    title: "Industrial IoT Security | Entersoft",
    description: "Risk assessments for connected industrial devices, the networks behind them, and the operators who run them.",
    kicker: "Industries · Industrial IoT",
    headline: "A connected device is a door that was never on the diagram.",
    lede: "Industrial IoT puts sensors, controllers and remote access on the same problem. One weak device is an entry into the network behind it. Entersoft assesses that path before someone else walks it.",
    blocks: [
      {
        kind: "panels",
        items: [
          { title: "The device", body: "Firmware, default services, update paths and credentials that shipped with the hardware." },
          { title: "The network", body: "How a field device reaches the plant, the cloud, or a vendor. Exposure is a route, not a logo on a slide." },
          { title: "The operator", body: "Remote access for maintenance is where social engineering and shared accounts show up. People are part of the assessment." },
        ],
      },
      {
        kind: "prose",
        title: "Where this work lands",
        paragraphs: [
          "The same connected-asset problem shows up in infrastructure, healthcare, retail, hospitality and smart buildings. The method stays: find the entry, name the impact, fix it in the design rather than with a sticker.",
          "CREST-accredited and OSCP-certified testers run the assessment. A single breach in this environment is downtime and safety, not only a leaked email.",
        ],
      },
      { kind: "steps", items: engagement },
      { kind: "panels", items: assurance },
      { kind: "cta", title: "Assess a connected estate.", href: ROUTES.contact, label: "Start with a briefing" },
    ],
  },
  {
    slug: "blockchain",
    title: "Blockchain Security | Entersoft",
    description: "Security assessments for blockchain networks, smart contracts and the operational keys around them.",
    kicker: "Industries · Blockchain",
    headline: "The chain is public. The mistake is still yours.",
    lede: "Blockchain does not remove attackers. It changes the cost of a bug. Entersoft assesses networks, contracts and the people who hold the keys, across finance, healthcare and supply chain deployments.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "50+", label: "Blockchain customers, as published by Entersoft" },
          { value: "1B+", label: "USD raised by those customers, in the firm’s public note" },
        ],
      },
      {
        kind: "panels",
        items: [
          { title: "Consensus and majority attacks", body: "A 51% style failure is rare and catastrophic. The assessment asks whether the network’s assumptions still match how it is actually operated." },
          { title: "Smart contracts", body: "Reentrancy, price oracles and admin keys. The useful report names the invariant that broke and the order of updates that should have held." },
          { title: "People around the chain", body: "Social engineering against operators and signers still moves funds. The wallet ceremony is in scope." },
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "Entersoft’s public note on this practice is direct: blockchain customers collectively raised over 1B USD, and the firm records that work without a breach in that set. Treat that as their published record, and still test the next contract.",
          "Security by design means the invariant lives in tests, not only in the audit PDF that shipped with the round.",
        ],
      },
      { kind: "panels", items: assurance },
      { kind: "cta", title: "Audit a protocol.", href: ROUTES.services.smartContract, label: "Smart contract security" },
    ],
  },
  {
    slug: "health-tech",
    title: "Health Tech Security | Entersoft",
    description: "Security for healthtech products that store and exchange patient and financial data.",
    kicker: "Industries · Health tech",
    headline: "Patient data is both a clinical record and a fraud kit.",
    lede: "Healthtech moves diagnoses and payments onto networks. The same record that improves care is worth stealing. Entersoft tests the product and the obligations around it before that trade becomes an incident.",
    blocks: [
      {
        kind: "panels",
        items: [
          { title: "The record", body: "Clinical and identity data, and the systems that exchange them. A test that stops at the marketing site misses the product." },
          { title: "Fraud from a breach", body: "Stolen health data is used for fraud, not only for embarrassment. The impact statement should say that plainly." },
          { title: "The rulebook", body: "Providers and vendors are expected to show how patient data is protected. The engagement produces evidence a compliance conversation can use." },
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "Entersoft’s healthtech work focuses on finding the exposure early: detection, protection of data in motion and at rest, and a retest after the fix. The testers are CREST-accredited and OSCP-certified practitioners.",
          "Innovation in care does not reduce the target. It increases it. The security programme has to keep up with the product, not with last year’s policy.",
        ],
      },
      { kind: "steps", items: engagement },
      { kind: "panels", items: assurance },
      { kind: "cta", title: "Protect a health product.", href: ROUTES.contact, label: "Book a briefing" },
    ],
  },
];

const industryLabels: Record<string, string> = {
  "fintech-security": "Fintech Security",
  "e-commerce": "E-Commerce",
  "it-saas": "IT - SaaS",
  "industrial-iot": "Industrial IoT",
  blockchain: "Blockchain",
  "health-tech": "Health Tech",
};

export const industryNav = industries.map((item) => ({
  label: industryLabels[item.slug] ?? item.headline,
  href: `/industries/${item.slug}`,
  description: item.description,
}));
