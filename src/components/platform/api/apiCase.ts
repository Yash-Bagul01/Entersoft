import { hubFront, hubVideo } from "@/data/platformHub";
import type { ExoApeCase } from "@/components/platform/exoape/types";

const img = (name: string) => `/images/platform/runtime/api/${name}.jpg`;

const RECOGNITION = [
  { name: "CREST", detail: "Registered penetration testing services" },
  { name: "CERT-In", detail: "Empanelled information security auditing organisation" },
  { name: "ISO/IEC 27001", detail: "Certified information security management system" },
  { name: "GDPR", detail: "Validated data processing controls" },
];

export const API_SECURITY_CASE: ExoApeCase = {
  id: "api-security",
  heroTitle: "EnProbe API",
  heroSubtitle: "API Security Testing",
  intro:
    "EnProbe discovers shadow, zombie and rogue APIs, audits live traffic against OpenAPI contracts, and proves OWASP API Top 10 findings — BOLA, BFLA, mass assignment — with replayable request evidence.",
  ctaLabel: "Book a briefing",
  ctaHref: "/contact",
  meta: [
    { label: "Capability", values: ["Discovery & Spec Audit"] },
    { label: "Coverage", values: ["REST, GraphQL, gRPC"] },
    { label: "Focus", values: ["BOLA · BFLA · Schema drift"] },
    { label: "Delivery", values: ["Gateway logs · Jira · GitHub"] },
  ],
  images: {
    hero: hubFront("api"),
    heroVideo: hubVideo("api"),
    heroAlt: "API request path used as a stand-in for live endpoint testing",
    wide: img("wide"),
    wideAlt: "Network cable loom representing live API traffic",
    beliefs: img("beliefs"),
    beliefsAlt: "City grid at dusk standing in for an endpoint inventory",
    statement: img("statement"),
    statementAlt: "Fiber light trails as a contract-to-traffic overlay",
    mockup: img("mockup"),
    mockupAlt: "Screens used while reviewing request and response evidence",
    next: img("next"),
    nextAlt: "Illuminated workstation used for the next platform chapter",
    collage: [
      {
        src: img("c01"),
        alt: "Dark equipment corridor used for API discovery",
        tag: "01 / SHADOW DISCOVERY",
        headline: "Find the APIs the spec never named",
        metric: "Gateway + traffic inventory",
        desc: "Catalog undocumented, rogue and zombie endpoints from gateway logs, Postman collections and live traffic.",
      },
      {
        src: img("c02"),
        alt: "Source on a monitor during schema comparison",
        tag: "02 / CONTRACT AUDIT",
        headline: "Live behavior versus the published spec",
        metric: "OpenAPI / Swagger drift",
        desc: "Compare request and response shapes against the contract so silent field additions cannot hide.",
      },
      {
        src: img("c03"),
        alt: "Patch panel standing in for authorization boundaries",
        tag: "03 / BOLA & BFLA",
        headline: "Object and function authorization, proven",
        metric: "OWASP API Top 10",
        desc: "Cross-tenant object reads and privileged function calls are replayed with the exact bearer context.",
      },
      {
        src: img("c04"),
        alt: "Circuit board used as a stand-in for parameter surfaces",
        tag: "04 / PARAMETER GRAPH",
        headline: "Every verb, role and rate limit",
        metric: "REST · GraphQL · gRPC",
        desc: "Inventory parameters, auth schemes and mutation surfaces before a payload is sent.",
      },
      {
        src: img("c05"),
        alt: "Night office used for ticket routing",
        tag: "05 / TICKET DISPATCH",
        headline: "Fixes land with the owning service",
        metric: "Jira · GitHub",
        desc: "Verified API findings route to the backend team that can close the object-level gap.",
      },
      {
        src: img("c06"),
        alt: "Engineer reviewing an authorization path",
        tag: "06 / MULTI-ROLE SESSION",
        headline: "Tenant A must not read tenant B",
        metric: "Role-aware probes",
        desc: "Sessions walk role and tenant boundaries the way a real client would — then prove the leak.",
      },
      {
        src: img("c07"),
        alt: "Cloud sky used as a stand-in for exposed gateways",
        tag: "07 / GATEWAY TELEMETRY",
        headline: "The perimeter the gateway already sees",
        metric: "Continuous inventory",
        desc: "New routes appearing in traffic become first-class inventory, not a quarterly spreadsheet.",
      },
    ],
  },
  objective: {
    lines: ["Contracts", "meet", "traffic"],
    body: "A published spec is a promise. Live traffic is the truth. Shadow APIs, zombie versions and broken object authorization hide in the gap. The objective was to inventory every endpoint the gateway already sees, then prove which ones leak across tenants.",
  },
  solution: {
    lines: ["Discover the surface,", "then prove the object leak"],
    left: "EnProbe ingests gateway logs, Postman collections and OpenAPI documents, then catalogs verbs, parameters, auth schemes and rate limits — including routes no one documented.",
    right:
      "Specialized probes execute BOLA, BFLA, mass-assignment and injection checks against the live surface. Each finding carries the request, the response and the tenant context that made it real.",
  },
  beliefs: {
    label: "The API cycle, in three moves",
    items: [
      { word: "Discover", note: "Shadow, zombie, rogue", align: "right" },
      { word: "Compare", note: "Contract versus traffic", align: "left" },
      { word: "Prove", note: "Object-level evidence", align: "right" },
    ],
  },
  anticipate: {
    marker: "Continuity",
    lines: ["Anticipating the", "next undocumented route"],
    body: "APIs change with every release. EnProbe keeps the inventory live so a new GraphQL field or a forgotten v1 route is tested the same week it appears — not the next annual review.",
    cards: [
      {
        index: "01",
        label: "The Inventory",
        title: "Gateway logs and specs become one living catalog of endpoints.",
        image: img("a01"),
        alt: "Operators reviewing endpoint inventory on shared screens",
        tag: "TRAFFIC INGEST",
        metric: "Undocumented routes named",
        desc: "Postman, OpenAPI and gateway telemetry resolve into a single endpoint graph.",
      },
      {
        index: "02",
        label: "The Probe",
        title: "Authorization tests walk tenant and role boundaries on purpose.",
        image: img("a02"),
        alt: "Lab bench used while proving a cross-tenant read",
        tag: "BOLA / BFLA",
        metric: "Replayable object proof",
        desc: "Broken object and function authorization is confirmed with the exact bearer context.",
      },
      {
        index: "03",
        label: "The Ticket",
        title: "The owning service receives the request that proved the leak.",
        image: img("a03"),
        alt: "Hands at a keyboard routing a verified API finding",
        tag: "REMEDIATION",
        metric: "Backend-ready evidence",
        desc: "HTTP artifacts and suggested schema or auth fixes land with the service team.",
      },
    ],
  },
  railTitle: "Precision in API execution",
  stages: [
    {
      index: "01",
      title: "Traffic & spec ingestion",
      body: "Gateway logs, Postman collections and OpenAPI documents become the seed — not a static spreadsheet of known routes.",
      image: img("a01"),
      alt: "Operators reviewing endpoint inventory on shared screens",
    },
    {
      index: "02",
      title: "Endpoint inventory mapping",
      body: "Every verb, parameter type, authentication scheme and rate limit is cataloged, including routes the spec omitted.",
      image: img("c02"),
      alt: "Source on a monitor during schema comparison",
    },
    {
      index: "03",
      title: "Targeted API attacks",
      body: "BOLA, BFLA, mass assignment and injection run against the live surface with non-destructive, replayable probes.",
      image: img("a02"),
      alt: "Lab bench used while proving a cross-tenant read",
    },
    {
      index: "04",
      title: "Schema compliance audit",
      body: "Live request and response behavior is compared to the published contract so silent fields cannot hide.",
      image: img("c03"),
      alt: "Patch panel standing in for authorization boundaries",
    },
    {
      index: "05",
      title: "Remediation dispatch",
      body: "Verified findings route to the backend team with the exact request that proved the object-level gap.",
      image: img("a03"),
      alt: "Hands at a keyboard routing a verified API finding",
    },
  ],
  specs: [
    {
      label: "Surface",
      value: "API Discovery",
      body: "REST, GraphQL and gRPC endpoints across gateways, microservices and undocumented shadows.",
    },
    {
      label: "Focus",
      value: "Authorization",
      body: "Broken object and function-level authorization, mass assignment, and tenant isolation.",
    },
    {
      label: "Evidence",
      value: "Replayable HTTP",
      body: "Request, response and role context so an engineer can reproduce the leak in one sitting.",
    },
    {
      label: "Integration",
      value: "Service backlog",
      body: "Tickets land in Jira or GitHub with the owning service already named.",
    },
  ],
  partnershipLines: ["Stellar", "partnership"],
  quote: {
    text: "An API finding only matters when you can replay the object read across a tenant boundary and hand the owning service the request that proved it. EnProbe API was built so that conversation happens on every release, not once a year.",
    name: "EnProbe practice",
    role: "API security · Test Runtime cluster",
    initials: "AS",
  },
  recognition: RECOGNITION,
  mockupCaption: "Cross-tenant object proof generated from live traffic.",
  floatNote: { label: "1. Discovery phase", title: "You ship the route. We test the object." },
  faqs: [
    {
      question: "How does EnProbe find APIs that are not in the OpenAPI spec?",
      answer:
        "Gateway logs, runtime traffic and Postman collections are ingested alongside published specs. Undocumented, zombie and rogue routes appear in the same inventory as contracted endpoints, then receive the same authorization tests.",
    },
    {
      question: "Can you test BOLA and BFLA behind authenticated sessions?",
      answer:
        "Yes. Probes walk multi-role and multi-tenant sessions, swapping object identifiers and function calls while holding a valid bearer. Confirmed leaks include the exact request and response.",
    },
    {
      question: "Do you support GraphQL and gRPC as well as REST?",
      answer:
        "Yes. Schema introspection, mutation surfaces and protobuf contracts are inventoried and tested with the same evidence standard as REST.",
    },
    {
      question: "What does a typical finding include?",
      answer:
        "Endpoint, verb, role context, the request that proved the leak, the response body, OWASP API class, and a suggested schema or authorization fix for the owning service.",
    },
    {
      question: "How does this fit an existing gateway or mesh?",
      answer:
        "We read the telemetry you already have — API gateways, service meshes and collection files — then return tickets into the backlog the backend team already uses.",
    },
  ],
  next: {
    href: "/platform/attack-surface-management",
    title: "Attack Surface",
    subtitle: "External exposure intelligence",
  },
};
