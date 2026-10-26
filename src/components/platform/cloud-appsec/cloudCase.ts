import { hubFront, hubVideo } from "@/data/platformHub";
import type { ExoApeCase } from "@/components/platform/exoape/types";

const img = (name: string) => `/images/platform/runtime/cloud/${name}.jpg`;

const RECOGNITION = [
  { name: "CREST", detail: "Registered penetration testing services" },
  { name: "CERT-In", detail: "Empanelled information security auditing organisation" },
  { name: "ISO/IEC 27001", detail: "Certified information security management system" },
  { name: "GDPR", detail: "Validated data processing controls" },
];

export const CLOUD_APPSEC_CASE: ExoApeCase = {
  id: "cloud-appsec",
  heroTitle: "EnProbe Cloud",
  heroSubtitle: "Cloud Application Security",
  intro:
    "EnProbe correlates application findings, container images, IAM roles and cloud misconfigurations into one graph — so a reachable path from the internet to a datastore is a single story, not four tools.",
  ctaLabel: "Book a briefing",
  ctaHref: "/contact",
  meta: [
    { label: "Capability", values: ["Cross-layer graph"] },
    { label: "Coverage", values: ["AWS · Azure · GCP"] },
    { label: "Focus", values: ["Code + IAM + runtime"] },
    { label: "Delivery", values: ["Unified posture"] },
  ],
  images: {
    hero: hubFront("cloud"),
    heroVideo: hubVideo("cloud"),
    heroAlt: "Cloud landscape used as a stand-in for multi-cloud application risk",
    wide: img("wide"),
    wideAlt: "Open sky used as the cloud application field",
    beliefs: img("beliefs"),
    beliefsAlt: "High cloudscape standing in for multi-account posture",
    statement: img("statement"),
    statementAlt: "Layered sky used as a code-to-runtime path",
    mockup: img("mockup"),
    mockupAlt: "Operators reviewing a cloud graph on shared screens",
    next: img("next"),
    nextAlt: "Soft horizon used for the next platform chapter",
    collage: [
      {
        src: "/images/platform/runtime/cloud/center.jpg",
        alt: "Server racks in a bright cloud data hall",
        tag: "01 / CLOUD TELEMETRY",
        headline: "Provider APIs, registries and AppSec in one ingest",
        metric: "AWS · Azure · GCP",
        desc: "Connect cloud APIs, container registries and application scanners so the graph has every layer.",
      },
      {
        src: img("c02"),
        alt: "Layered sky used for relational mapping",
        tag: "02 / RELATIONAL GRAPH",
        headline: "Repo, image, instance, role",
        metric: "Code to IAM",
        desc: "Repositories, containers, compute and IAM roles become one dependency picture.",
      },
      {
        src: img("c03"),
        alt: "Bright horizon used for attack-path evaluation",
        tag: "03 / ATTACK PATH",
        headline: "Internet to datastore, named",
        metric: "Reachable paths first",
        desc: "Adversary movement is simulated across network boundaries and application flaws — only reachable paths stay loud.",
      },
      {
        src: img("c04"),
        alt: "Office light used for multi-cloud posture",
        tag: "04 / MULTI-CLOUD POSTURE",
        headline: "One language across three clouds",
        metric: "Unified severity",
        desc: "AWS, Azure and GCP findings share the same score so a CISO is not translating three dashboards.",
      },
      {
        src: img("c05"),
        alt: "Workstations used for unified rendering",
        tag: "05 / POSTURE RENDER",
        headline: "One pane for the people who decide",
        metric: "CISO-ready view",
        desc: "Risk scores and next actions render for security and cloud teams in the same operating picture.",
      },
      {
        src: img("c06"),
        alt: "Engineer used for container and serverless coverage",
        tag: "06 / WORKLOADS",
        headline: "Containers and functions in the same graph",
        metric: "Runtime included",
        desc: "Images, serverless and IAM boundaries sit next to the application finding that made them urgent.",
      },
      {
        src: img("c07"),
        alt: "Soft cloud used for contextual AppSec",
        tag: "07 / CONTEXT",
        headline: "A CVE is only urgent if the path exists",
        metric: "Reachability first",
        desc: "Source findings inherit cloud context so an unreachable issue does not outrank an open path.",
      },
    ],
  },
  objective: {
    lines: ["One", "graph,", "path"],
    body: "Code scanners, CSPM and container tools each tell a partial story. An attacker walks the join. The objective was to put application flaws, images, IAM and misconfigurations on one graph so a reachable path is obvious.",
  },
  solution: {
    lines: ["Connect the layers,", "then rank the path"],
    left: "EnProbe ingests cloud provider APIs, container registries and application security outputs, then builds the relationships between repositories, images, compute and roles.",
    right:
      "Attack paths are evaluated from internet-facing edges down to datastores. Unified scores go to the people who can change the role, the image or the code — not three separate queues.",
  },
  beliefs: {
    label: "The cloud cycle, in three moves",
    items: [
      { word: "Ingest", note: "APIs, images, findings", align: "right" },
      { word: "Join", note: "Code to IAM to runtime", align: "left" },
      { word: "Rank", note: "Reachable paths first", align: "right" },
    ],
  },
  anticipate: {
    marker: "Continuity",
    lines: ["Anticipating the", "path across accounts"],
    body: "A new role, a public bucket or a vulnerable image should change the graph the same day. EnProbe keeps the join live so Cloud AppSec is a path story, not a weekly export.",
    cards: [
      {
        index: "01",
        label: "The Join",
        title: "Repositories, images, instances and roles share one model.",
        image: img("a01"),
        alt: "Layered sky used as the relational cloud graph",
        tag: "RELATIONAL MAP",
        metric: "Cross-layer context",
        desc: "An application finding inherits the IAM and network context it actually runs in.",
      },
      {
        index: "02",
        label: "The Path",
        title: "Internet edge to datastore is a first-class object.",
        image: img("a02"),
        alt: "Horizon used while evaluating a cloud attack path",
        tag: "ATTACK PATH",
        metric: "Reachability scored",
        desc: "Only paths an adversary can walk stay at the top of the queue.",
      },
      {
        index: "03",
        label: "The Pane",
        title: "One posture language for security and cloud teams.",
        image: img("a03"),
        alt: "Workstations used for a unified cloud posture view",
        tag: "UNIFIED SCORE",
        metric: "Single operating picture",
        desc: "CISOs and cloud owners see the same rank, owner and next safe action.",
      },
    ],
  },
  railTitle: "Precision in cloud context",
  stages: [
    {
      index: "01",
      title: "Cloud telemetry ingestion",
      body: "Provider APIs, container registries and application security tools feed the same graph.",
      image: img("c01"),
      alt: "Cloud bank used for telemetry ingestion",
    },
    {
      index: "02",
      title: "Relational mapping",
      body: "Repositories, containers, compute and IAM roles are joined so a finding has a place to live.",
      image: img("a01"),
      alt: "Layered sky used as the relational cloud graph",
    },
    {
      index: "03",
      title: "Attack path evaluation",
      body: "Adversary movement is simulated across network boundaries and application vulnerabilities.",
      image: img("a02"),
      alt: "Horizon used while evaluating a cloud attack path",
    },
    {
      index: "04",
      title: "Multi-cloud posture",
      body: "AWS, Azure and GCP share one severity language alongside container and serverless workloads.",
      image: img("c04"),
      alt: "Office light used for multi-cloud posture",
    },
    {
      index: "05",
      title: "Unified posture rendering",
      body: "Scores and next actions render for CISOs and cloud teams in a single operating picture.",
      image: img("a03"),
      alt: "Workstations used for a unified cloud posture view",
    },
  ],
  specs: [
    {
      label: "Surface",
      value: "Cloud + app graph",
      body: "Code findings, container images, IAM roles and infrastructure misconfigurations.",
    },
    {
      label: "Focus",
      value: "Reachable paths",
      body: "Internet-facing edges down to sensitive datastores — context before volume.",
    },
    {
      label: "Evidence",
      value: "Joined context",
      body: "Each item carries the repo, image, role and network that make it urgent.",
    },
    {
      label: "Integration",
      value: "One posture pane",
      body: "Security and cloud owners share a rank, an owner and a next action.",
    },
  ],
  partnershipLines: ["Stellar", "partnership"],
  quote: {
    text: "A cloud finding without the application path is a ticket. A path from the internet to a datastore is a decision. EnProbe Cloud was built so that decision has one graph and one owner.",
    name: "EnProbe practice",
    role: "Cloud AppSec · Test Runtime cluster",
    initials: "CA",
  },
  recognition: RECOGNITION,
  mockupCaption: "Reachable cloud path from edge to datastore, in one view.",
  floatNote: { label: "1. Graph phase", title: "You run the cloud. We join the path." },
  faqs: [
    {
      question: "How is this different from CSPM alone?",
      answer:
        "CSPM sees infrastructure. AppSec sees code. EnProbe joins them — so a vulnerable package on a publicly reachable workload with a powerful role outranks a misconfiguration that cannot be reached.",
    },
    {
      question: "Which clouds are supported?",
      answer:
        "AWS, Azure and GCP, alongside container registries and serverless workloads, share one severity language and one graph.",
    },
    {
      question: "Do you replace existing cloud security tools?",
      answer:
        "We ingest their telemetry. The value is the join — code, image, IAM and network in one path — not another scanner competing for the same finding.",
    },
    {
      question: "What does a typical path look like?",
      answer:
        "An internet-facing service, a reachable vulnerability or misconfiguration, an IAM hop, and a datastore. Each hop is named with an owner and a next action.",
    },
    {
      question: "How do scores reach leadership?",
      answer:
        "Unified posture rendering gives CISOs and cloud teams the same rank. Volume stays in the graph; decisions stay on reachable paths.",
    },
  ],
  next: {
    href: "/platform/ai-appsec",
    title: "AI AppSec",
    subtitle: "LLM defense and guided fixes",
  },
};
