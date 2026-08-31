import type { ExoApeCase } from "@/components/platform/exoape/types";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const RECOGNITION = [
  { name: "CREST", detail: "Registered penetration testing services" },
  { name: "CERT-In", detail: "Empanelled information security auditing organisation" },
  { name: "ISO/IEC 27001", detail: "Certified information security management system" },
  { name: "GDPR", detail: "Validated data processing controls" },
];

export const DAST_CASE: ExoApeCase = {
  id: "dast",
  heroTitle: "EnProbe DAST",
  heroSubtitle: "Dynamic Application Security Testing",
  intro:
    "EnProbe DAST tests live web applications, single-page apps and microservice APIs the way an attacker would — then proves what it finds, so no engineer spends a sprint chasing a scanner's guess.",
  ctaLabel: "Book a briefing",
  ctaHref: "/contact",
  meta: [
    { label: "Capability", values: ["Proof-Based Scanning"] },
    { label: "Coverage", values: ["Web apps & SPAs", "REST, GraphQL, SOAP"] },
    { label: "Correlation", values: ["IAST runtime agent"] },
    { label: "Delivery", values: ["CI/CD, Jira, GitHub"] },
  ],
  images: {
    hero: u("photo-1787165574896-adae5bec834b", 2400),
    heroAlt: "Glazed tower lit from within at dusk",
    wide: u("photo-1770473859769-d5a601e54a63", 2400),
    wideAlt: "Illuminated towers at night",
    beliefs: u("photo-1506606401543-2e73709cebb4", 2400),
    beliefsAlt: "Long exposure light trails through a city at night",
    statement: u("photo-1526289034009-0240ddb68ce3", 2000),
    statementAlt: "Dark glass facade",
    mockup: u("photo-1773349807434-374473797148", 900),
    mockupAlt: "Source code on a monitor",
    next: u("photo-1709625862266-014ef072fd93", 2400),
    nextAlt: "Abstract dark form curving through light",
    collage: [
      { src: u("photo-1719400471588-575b23e27bd7"), alt: "Analyst reviewing telemetry across three monitors" },
      { src: u("photo-1594915440248-1e419eba6611"), alt: "Fibre optic cabling patched into a network switch" },
      { src: u("photo-1773349807434-374473797148"), alt: "Source code on a monitor in a darkened room" },
      { src: u("photo-1706101299176-292d8c5e470e"), alt: "Translucent blue glass curves catching light" },
      { src: u("photo-1680992046626-418f7e910589"), alt: "Server rack illuminated in a dark equipment room" },
      { src: u("photo-1762271458610-5f402f8dedf3"), alt: "Modern office interior lit at night" },
    ],
  },
  objective: {
    lines: ["Proof", "over", "probability"],
    body: "A scanner that reports what might be wrong hands its backlog to the people least able to spend time on it. The objective was the opposite: an engine that only speaks when it can demonstrate the finding, on the build that is actually running, with the request and response that produced it.",
  },
  solution: {
    lines: ["The application, exercised", "the way it will be attacked"],
    left: "An AI-driven crawler authenticates and walks the application through its states, including single-page routes and multi-factor sign-in. Live payloads then probe for injection, cross-site scripting, SSRF, remote code execution and broken authorization.",
    right:
      "An in-application agent watches the same traffic from the inside, so a black-box result arrives carrying the file, method and line that produced it — and a fix that fits the framework in front of you rather than a generic advisory.",
  },
  beliefs: {
    label: "The run, in three moves",
    items: [
      { word: "Crawl", note: "Every state reached", align: "right" },
      { word: "Attack", note: "Safely, in place", align: "left" },
      { word: "Prove", note: "Evidence, not alerts", align: "right" },
    ],
  },
  anticipate: {
    marker: "Continuity",
    lines: ["Anticipating the", "next request"],
    body: "A well-run DAST programme is not a one-shot scan. It sits between expert-led tests and keeps walking the application as it ships, so the next exploit is met by a proof already in the ticket — not a surprise in production.",
    cards: [
      {
        index: "01",
        label: "The crawler",
        title: "Every state the user can reach.",
        image: u("photo-1719400471588-575b23e27bd7", 1200),
        alt: "Analyst reviewing telemetry across three monitors",
      },
      {
        index: "02",
        label: "The payload",
        title: "Live attacks, never destructive.",
        image: u("photo-1594915440248-1e419eba6611", 1200),
        alt: "Fibre optic cabling patched into a network switch",
      },
      {
        index: "03",
        label: "The proof",
        title: "A finding only when the exploit lands.",
        image: u("photo-1680992046626-418f7e910589", 1200),
        alt: "Server rack illuminated in a dark equipment room",
      },
    ],
  },
  railTitle: "Precision in every request",
  stages: [
    {
      index: "01",
      title: "Target crawl & discover",
      body: "The AI crawler authenticates like a user — including MFA and SSO flows — then walks single-page applications through their DOM states to map every route, parameter and hidden API the build actually exposes.",
      image: u("photo-1770530333405-6e1c3876a903", 1400),
      alt: "Illuminated buildings at night representing an external estate",
    },
    {
      index: "02",
      title: "Dynamic attack execution",
      body: "Live payloads probe for SQL injection, cross-site scripting, SSRF, remote code execution and authorization bypass against the running deployment, staged so nothing destructive touches your data.",
      image: u("photo-1647962922288-4c7a48558979", 1400),
      alt: "Long exposure light trails along a highway at night",
    },
    {
      index: "03",
      title: "Proof generation",
      body: "A finding is only raised once a benign exploit has demonstrated it — reading a harmless server value rather than asserting a version banner. The proof travels with the ticket.",
      image: u("photo-1759661881353-5b9cc55e1cf4", 1400),
      alt: "Lines of code displayed on a screen",
    },
    {
      index: "04",
      title: "Runtime correlation",
      body: "The IAST agent ties external attack traffic to server-side execution, so a black-box result arrives with the file, method and line that produced it.",
      image: u("photo-1682559736721-c2e77ff4c650", 1400),
      alt: "Cabling running into a server chassis",
    },
    {
      index: "05",
      title: "Route, fix & retest",
      body: "Findings route into GitHub, GitLab or Jira with remediation guidance for your framework, and the same attack is replayed on the fixed build to close the loop.",
      image: u("photo-1579445505461-acecf2596190", 1400),
      alt: "Low angle view of a high rise facade",
    },
  ],
  specs: [
    {
      label: "Accuracy",
      value: "Proof-based",
      body: "Findings are confirmed by a safe exploit before they reach a developer, which is what removes the false-positive triage queue.",
    },
    {
      label: "Surface",
      value: "Runtime",
      body: "Web applications, single-page apps and microservice APIs across REST, GraphQL and SOAP, tested as deployed.",
    },
    {
      label: "Authentication",
      value: "AI-driven",
      body: "Crawling handles login, MFA and dynamic JavaScript state without hand-maintained recording scripts.",
    },
    {
      label: "Pipeline",
      value: "Continuous",
      body: "Scans run against staging and production builds on your CI/CD cadence, between the deeper penetration tests.",
    },
  ],
  partnershipLines: ["Stellar", "partnership"],
  quote: {
    text: "“Entersoft's exploit-first verification gave us a level of analysis that automated scanning alone could not match. Their team surfaced business-logic flaws that protected our operational pipelines.”",
    name: "Manoj Kumar",
    role: "Director of IT & Cyber Infrastructure · HIL, CK Birla Group",
    initials: "MK",
  },
  recognition: RECOGNITION,
  mockupCaption: "Proof travels with the ticket.",
  floatNote: { label: "1. Design phase", title: "You imagine the attack. We make it real." },
  faqs: [
    {
      question: "How does EnProbe DAST safely test production and staging environments without causing downtime?",
      answer:
        "EnProbe DAST isolates attack vectors to safe, non-destructive payloads (such as inspecting environment headers or safe canary parameters) and rate-limits requests based on live telemetry, ensuring full security analysis without data mutation or service disruption.",
    },
    {
      question: "How does DAST handle Single-Page Applications (SPAs) and Multi-Factor Authentication (MFA)?",
      answer:
        "Unlike legacy regex scanners, EnProbe uses a headless browser state machine powered by AI to navigate complex JavaScript DOM states, single-page application routes, dynamic tokens, and MFA authentication flows automatically.",
    },
    {
      question: "What is Proof-Based Scanning and how does it guarantee 0.0% false positives?",
      answer:
        "Proof-Based Scanning only flags a vulnerability when it successfully executes a benign exploit payload that proves exploitability. Because findings include verified request/response proof, engineering teams spend zero time triaging false alarms.",
    },
    {
      question: "How does the IAST runtime agent correlate with external DAST attacks?",
      answer:
        "An optional lightweight IAST sensor sits inside the application runtime. When external DAST payloads hit the application, IAST correlates the HTTP request with internal stack traces, identifying the exact source code file, function, and line number responsible.",
    },
    {
      question: "How are DAST findings delivered to developers and CI/CD pipelines?",
      answer:
        "Findings route automatically into GitHub Actions, GitLab CI, Jira, or Slack with framework-specific code fix diffs, steps to reproduce, and automated retest capabilities upon code push.",
    },
  ],
  next: {
    href: "/platform/sast",
    title: "SAST",
    subtitle: "Static Application Security Testing",
  },
};

export const DAST_IMAGES = {
  hero: DAST_CASE.images.hero,
  statement: DAST_CASE.images.statement,
  beliefs: DAST_CASE.images.beliefs,
  wide: DAST_CASE.images.wide,
  next: DAST_CASE.images.next,
  mockup: DAST_CASE.images.mockup,
  collage: DAST_CASE.images.collage,
} as const;

export const DAST_META = DAST_CASE.meta;
export const DAST_BELIEFS = DAST_CASE.beliefs.items;
export const DAST_FLOAT_CARDS = DAST_CASE.anticipate.cards;
export const DAST_STAGES = DAST_CASE.stages;
export const DAST_SPECS = DAST_CASE.specs;
export const DAST_RECOGNITION = DAST_CASE.recognition;
