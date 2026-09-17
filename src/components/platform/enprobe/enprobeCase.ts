import { hubFront } from "@/data/platformHub";
import type { ExoApeCase } from "@/components/platform/exoape/types";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const POSTER = "/images/enprobe/product-poster.webp";

const RECOGNITION = [
  { name: "CERT-In", detail: "Empanelled information security auditing organisation" },
  { name: "CREST", detail: "Approved penetration testing services" },
  { name: "ISO/IEC 27001", detail: "Certified information security management system" },
  { name: "Tenant-safe evidence", detail: "Isolation, provenance and authorized publication" },
];

export const ENPROBE_CASE: ExoApeCase = {
  id: "enprobe",
  heroTitle: "EnProbe",
  heroSubtitle: "Continuous Exposure Assurance",
  intro:
    "See the whole exposure. Fix what matters. Prove risk is gone. EnProbe unifies ASPM, CSPM, testing, assets and verified retesting into one prioritized security view — application security first, AI assisted, expert governed.",
  ctaLabel: "Request a demo",
  ctaHref: "/contact",
  meta: [
    { label: "Capability", values: ["Exposure assurance"] },
    { label: "Application", values: ["ASPM, DAST, PTaaS"] },
    { label: "Cloud", values: ["CSPM, identity, drift"] },
    { label: "Assurance", values: ["CERT-In · CREST · ISO/IEC 27001"] },
  ],
  images: {
    hero: hubFront("enprobe"),
    heroAlt: "City at dusk — the full exposure surface in one view",
    wide: u("photo-1449824913935-59a10b8d2000", 2400),
    wideAlt: "Aerial city grid representing a living inventory of owned and dependent assets",
    beliefs: u("photo-1479839672679-a46483c0e7c8", 2400),
    beliefsAlt: "Looking up through a tower facade toward a single operating picture",
    statement: u("photo-1487956382158-bb926046304a", 2000),
    statementAlt: "Clean architectural geometry standing in for tenant-safe evidence design",
    mockup: POSTER,
    mockupAlt: "EnProbe unified posture on a product screen",
    next: u("photo-1431578500526-4d9613015464", 2400),
    nextAlt: "Towers rising at dusk — the next capability in the platform",
    collage: [
      {
        src: u("photo-1444723121867-7a241cacace9", 3200),
        alt: "Aerial urban estate representing unified asset intelligence",
        tag: "01 / UNIFIED ASSET INTELLIGENCE",
        headline: "What do we own or depend on?",
        metric: "Living inventory",
        desc: "Applications, APIs, repositories, components, cloud accounts, resources, identities, owners and relationships in one inventory.",
      },
      {
        src: u("photo-1454165804606-c3d57bc86b40", 1600),
        alt: "Desk of plans and evidence used to decide what to fix first",
        tag: "02 / ASPM",
        headline: "What is wrong in software — and what to fix first",
        metric: "Correlated evidence",
        desc: "Correlate application-security evidence, remove duplicate work, explain priority, govern remediation and record verified retest outcomes.",
      },
      {
        src: u("photo-1451187580459-43490279c0fa", 1600),
        alt: "Earth from orbit representing cloud posture and public exposure",
        tag: "03 / CSPM",
        headline: "Is the cloud configured safely right now?",
        metric: "Read-only discovery",
        desc: "Evaluate cloud resources for public exposure, excessive access, protection gaps, stale evidence and drift.",
      },
      {
        src: u("photo-1467269204594-9661b134dd2b", 1600),
        alt: "Connected city streets standing in for a compound exposure path",
        tag: "04 / COMPOUND EXPOSURE",
        headline: "Risk rarely lives inside one product silo",
        metric: "Full attack path",
        desc: "A software weakness becomes urgent when it is public, in production, backed by a powerful identity and connected to sensitive data.",
      },
      {
        src: u("photo-1600880292203-757bb62b4baf", 1600),
        alt: "Operators coordinating the shared discover-to-retest loop",
        tag: "05 / SHARED OPERATING LOOP",
        headline: "From first observation to approved retest",
        metric: "Verified reduction",
        desc: "Discover, ingest, normalize, correlate, prioritize, assign, remediate, retest and report — with history and staleness visible.",
      },
      {
        src: u("photo-1581092162384-8987c1d64718", 1600),
        alt: "Runtime instrumentation in a controlled lab environment",
        tag: "06 / RUNTIME FABRIC PROTOCOL",
        headline: "From point-in-time posture to organizational telemetry",
        metric: "Policy-bound",
        desc: "A signed telemetry contract correlating agentless discovery with approved runtime sensors. Telemetry, not remote administration.",
      },
      {
        src: u("photo-1524758631624-e2822e304c36", 1600),
        alt: "Quiet interior representing isolation and authorized publication",
        tag: "07 / TENANT-SAFE BY DESIGN",
        headline: "Isolation, provenance and authorized publication",
        metric: "Evidence decides",
        desc: "Tenant, organization, project, role and object-level access at the API, job, database and evidence-download layers.",
      },
    ],
  },
  objective: {
    lines: ["See the whole", "exposure"],
    body: "A software weakness becomes urgent when it is public, deployed to production, backed by a powerful identity and connected to sensitive data. EnProbe makes that full path visible — and explains why it should be fixed now. Unify the conclusion, coordinate both teams, and verify the reduction.",
  },
  solution: {
    lines: ["Three capabilities become", "one operating picture"],
    left: "Asset context explains what exists: a living inventory of applications, APIs, repositories, components, cloud accounts, resources, identities, owners and relationships. ASPM then asks what is wrong in software, and what should be fixed first — correlating evidence, removing duplicate work, and recording verified retest outcomes.",
    right:
      "CSPM asks whether the cloud is configured safely right now: public exposure, excessive access, protection gaps, stale evidence and drift, from read-only discovery. EnProbe turns both into prioritized, owned and verifiable action without inventing a mini-product for every scanner.",
  },
  beliefs: {
    label: "One security language, in three moves",
    items: [
      { word: "Asset", note: "What exists", align: "right" },
      { word: "Posture", note: "What is wrong", align: "left" },
      { word: "Prove", note: "Risk is gone", align: "right" },
    ],
  },
  anticipate: {
    marker: "Maturity map",
    lines: ["Built for today’s program.", "Architected for the next curve."],
    body: "A transparent capability map separates what is live, what is being consolidated into the platform, and what belongs to EnProbe’s innovation track. It is a product strategy view — not an analyst-licensed Hype Cycle.",
    cards: [
      {
        index: "01",
        label: "Operational today",
        title: "PTaaS, DAST, API testing, vulnerability lifecycle, evidence and retest verification.",
        image: u("photo-1556761175-5973dc0f32e7", 1200),
        alt: "Operators in a working space representing capabilities that are live today",
        tag: "LIVE",
        metric: "Proven control layer",
        desc: "The security work enterprises already depend on — made measurable, collaborative and verifiable.",
      },
      {
        index: "02",
        label: "Converging now",
        title: "ASPM, CSPM, SAST, SCA/SBOM/VEX, CAASM-aligned assets and EASM.",
        image: u("photo-1511818966892-d7d671e672a2", 1200),
        alt: "Architectural forms converging into one structure",
        tag: "ROLLING OUT",
        metric: "Consolidation layer",
        desc: "Capabilities moving from separate tools into a shared security-posture and exposure operating model.",
      },
      {
        index: "03",
        label: "Designed for what comes next",
        title: "CTEM-ready assurance, AI-SPM, LLM/RAG/agentic testing, and Runtime Fabric Protocol.",
        image: u("photo-1419242902214-272b3f66ee7a", 1200),
        alt: "Night sky standing in for EnProbe’s innovation-track architecture",
        tag: "INNOVATION TRACK",
        metric: "Frontier architecture",
        desc: "Organization-wide telemetry, AI systems and continuous exposure decisions — labeled as roadmap, not generally available.",
      },
    ],
  },
  railTitle: "From code to cloud to runtime",
  stages: [
    {
      index: "01",
      title: "Discover",
      body: "Map assets and evidence sources across applications, APIs, repositories, cloud accounts, resources and identities.",
      image: u("photo-1449824913935-59a10b8d2000", 1400),
      alt: "Aerial estate used for discovery of assets and evidence sources",
    },
    {
      index: "02",
      title: "Correlate",
      body: "Connect assets, findings, controls and owners. Deduplicate recurring evidence into one lifecycle record while preserving every scan occurrence.",
      image: u("photo-1496307042754-b4aa456c4a2d", 1400),
      alt: "Facade grid representing correlation of findings into one record",
    },
    {
      index: "03",
      title: "Prioritize",
      body: "Keep technical severity intact, then explain urgency using reachability, exposure, threat evidence, business criticality, environment, age, ownership and controls.",
      image: u("photo-1454165804606-c3d57bc86b40", 1400),
      alt: "Plans on a desk representing priority that separates severity from urgency",
    },
    {
      index: "04",
      title: "Remediate",
      body: "Route work with accountability and due dates. Fix code, components or configuration — with a next safe action, not scanner vocabulary.",
      image: u("photo-1559136555-9303baea8ebd", 1400),
      alt: "Working floor representing owned remediation workflow",
    },
    {
      index: "05",
      title: "Retest & report",
      body: "A retest is authorized verification of the reported weakness in the intended scope — not merely another tool execution. Then prove posture, trend and risk reduction.",
      image: u("photo-1460317442991-0ec209397118", 1400),
      alt: "Lit facade representing verified retest and reporting",
    },
  ],
  specs: [
    {
      label: "Cloud",
      value: "Read-only by default",
      body: "Temporary cross-account credentials, external IDs and least privilege. Automated cloud change is separately approved, policy-controlled and auditable.",
    },
    {
      label: "AI",
      value: "Assists; evidence decides",
      body: "AI may enrich, correlate and recommend. Closure, acceptance and verification remain policy-driven, evidence-based and auditable.",
    },
    {
      label: "Retest",
      value: "Not a rescan",
      body: "Controlled verification of the reported weakness, intended scope and submitted fix, with reviewed evidence and a recorded outcome.",
    },
    {
      label: "Trust",
      value: "Tenant-safe evidence",
      body: "Isolation, provenance, freshness, short-lived authorized downloads and publication rules on every export.",
    },
  ],
  partnershipLines: ["Application", "security first"],
  quote: {
    text: "Critical priority because this issue is internet-reachable, affects a production service and has known exploit evidence — not because a scanner printed a score of 92.",
    name: "EnProbe practice",
    role: "Exposure assurance · Application security first",
    initials: "EP",
  },
  recognition: RECOGNITION,
  mockupCaption: "Tell the risk story. Show the next safe action.",
  floatNote: { label: "1. Operating picture", title: "See the whole exposure. Prove risk is gone." },
  faqs: [
    {
      question: "What is EnProbe?",
      answer:
        "EnProbe is an exposure-assurance platform that brings application testing, cloud-posture evidence, asset intelligence, remediation workflow, expert validation and verified retesting into one explainable operating picture.",
    },
    {
      question: "Does ASPM replace penetration testing?",
      answer:
        "No. ASPM organizes, correlates and operationalizes evidence from penetration tests and automated tools. Human testing remains important for business logic, chained attacks, context and assurance.",
    },
    {
      question: "What is the difference between a rescan and a retest?",
      answer:
        "A rescan is another tool execution. A retest is an authorized verification that the reported weakness has been addressed in the intended scope, with reviewed evidence and a recorded outcome.",
    },
    {
      question: "Does EnProbe CSPM change customer cloud resources automatically?",
      answer:
        "Not by default. The recommended model is read-only discovery, evaluation and guidance. Automated remediation should be separately approved, policy-controlled, safeguarded, reversible and auditable.",
    },
    {
      question: "How does EnProbe decide what should be fixed first?",
      answer:
        "EnProbe keeps technical severity separate from operational priority, then considers exposure, reachability, threat evidence, application or data criticality, environment, age, ownership and compensating controls. The reasons remain visible to the user.",
    },
    {
      question: "What does RFP mean in EnProbe?",
      answer:
        "RFP means Runtime Fabric Protocol — not Request for Proposal. It is EnProbe’s policy-bound telemetry contract for correlating agentless discovery with approved runtime sensors, signed evidence and security relationships.",
    },
    {
      question: "Is EnProbe limited to AWS?",
      answer:
        "The first CSPM collector architecture is AWS-oriented. The shared asset, finding, control and relationship model is designed to remain provider-neutral so additional cloud adapters can be introduced without creating separate risk silos.",
    },
    {
      question: "Can AI automatically close or accept a security finding?",
      answer:
        "AI can assist with summarization, correlation, classification and remediation guidance. Authoritative status, access, risk acceptance and verification should remain policy-driven, evidence-based and auditable.",
    },
  ],
  next: {
    href: "/platform/dast",
    title: "DAST",
    subtitle: "Dynamic Application Security Testing",
  },
};
