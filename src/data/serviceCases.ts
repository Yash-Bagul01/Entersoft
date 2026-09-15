import { ROUTES } from "@/config/routes";
import { services, type Service } from "@/data/services";

const u = (id: string, w = 2400) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

function serviceBySlug(slug: string): Service {
  const item = services.find((entry) => entry.slug === slug);
  if (!item) {
    throw new Error(`Unknown service slug: ${slug}`);
  }
  return item;
}

function img(id: string, alt: string, w = 1600) {
  return { src: u(id, w), alt };
}

export type ServiceCaseSlug =
  | "appsec"
  | "vapt"
  | "cloud-resilience"
  | "compliance-management"
  | "siem"
  | "smart-contract-audits"
  | "ai-ast";

export type ServiceCaseImage = {
  src: string;
  alt: string;
};

export type ServiceCaseVisual = {
  slug: ServiceCaseSlug;
  href: string;
  title: string;
  navTitle: string;
  category: string;
  description: string;
  emblem: string;
  emblemSub: string;
  coverBg: string;
  textColor: string;
  accentColor: string;
  menuImage: string;
  hero: ServiceCaseImage;
  gallery: ServiceCaseImage[];
  wide: ServiceCaseImage;
};

const appsec = serviceBySlug("appsec");
const vapt = serviceBySlug("vapt");
const cloud = serviceBySlug("cloud-resilience");
const compliance = serviceBySlug("compliance-management");
const siem = serviceBySlug("siem");
const protocol = serviceBySlug("smart-contract-audits");
const aiAst = serviceBySlug("ai-ast");

export const SERVICE_CASES: Record<ServiceCaseSlug, ServiceCaseVisual> = {
  appsec: {
    slug: "appsec",
    href: ROUTES.services.appsec,
    title: appsec.displayName,
    navTitle: appsec.displayName,
    category: appsec.category,
    description: appsec.hoverCardBody,
    emblem: "◈ APPSEC",
    emblemSub: "LIFECYCLE ASSURANCE",
    coverBg: "bg-[#ccff00]",
    textColor: "text-black",
    accentColor: "#ccff00",
    menuImage: "/images/menu/services.png",
    hero: img("photo-1587620962725-abab7fe55159", "Application source code on a developer workstation", 2400),
    gallery: [
      img("photo-1605379399642-870262d3d051", "Dual monitors running application source during review"),
      img("photo-1484417894907-623942c8ee29", "Keyboard and editor used in secure engineering work"),
      img("photo-1593642632823-8f785ba67e45", "Laptop workspace used for release security testing"),
      img("photo-1486312338219-ce68d2c6f44d", "Notebook used while triaging application findings"),
    ],
    wide: img("photo-1516321497487-e288fb19713f", "Engineering team reviewing application work together", 2400),
  },
  vapt: {
    slug: "vapt",
    href: ROUTES.services.vapt,
    title: vapt.displayName,
    navTitle: vapt.displayName,
    category: vapt.category,
    description: vapt.hoverCardBody,
    emblem: "▲ VALIDATE",
    emblemSub: "ATTACK PATHS",
    coverBg: "bg-[#86e3ce]",
    textColor: "text-black",
    accentColor: "#86e3ce",
    menuImage: "/images/menu/platform.png",
    hero: img("photo-1555949963-ff9fe0c870eb", "Security researcher working through an adversarial test on a laptop", 2400),
    gallery: [
      img("photo-1563089145-599997674d42", "Dark technical environment used during adversarial testing"),
      img("photo-1553877522-43269d4ea984", "Working session used to brief attack-path findings"),
      img("photo-1552664730-d307ca884978", "Team whiteboard used while mapping exploitable paths"),
      img("photo-1521737604893-d14cc237f11d", "Operators reviewing evidence during a validation engagement"),
    ],
    wide: img("photo-1531482615713-2afd69097998", "Collaborative review of penetration-testing evidence", 2400),
  },
  "cloud-resilience": {
    slug: "cloud-resilience",
    href: ROUTES.services.cloud,
    title: cloud.displayName,
    navTitle: cloud.displayName,
    category: cloud.category,
    description: cloud.hoverCardBody,
    emblem: "◆ CLOUD",
    emblemSub: "POSTURE AND IDENTITY",
    coverBg: "bg-[#1a1c4b]",
    textColor: "text-white",
    accentColor: "#96CBFF",
    menuImage: "/images/menu/solutions.png",
    hero: img("photo-1614728263952-84ea256f9679", "Orbital view representing globally distributed cloud platforms", 2400),
    gallery: [
      img("photo-1497366754035-f200968a6e72", "Glass workplace used as a stand-in for cloud operating environments"),
      img("photo-1560472354-b33ff0c44a43", "Conference setting used for cloud-outcome scoping"),
      img("photo-1517245386807-bb43f82c33c4", "Working table used while calibrating cloud engagement scope"),
      img("photo-1516321165247-4aa89a48be28", "Open workplace used for multi-cloud security reviews"),
    ],
    wide: img("photo-1522202176988-66273c2fd55f", "Team coordinating a cloud security engagement", 2400),
  },
  "compliance-management": {
    slug: "compliance-management",
    href: ROUTES.services.compliance,
    title: compliance.displayName,
    navTitle: compliance.displayName,
    category: compliance.category,
    description: compliance.hoverCardBody,
    emblem: "⬢ TRUST",
    emblemSub: "AUDIT READINESS",
    coverBg: "bg-[#05382b]",
    textColor: "text-white",
    accentColor: "#34D399",
    menuImage: "/images/menu/services.png",
    hero: img("photo-1554224155-6726b3ff858f", "Documents and evidence used in audit-readiness reviews", 2400),
    gallery: [
      img("photo-1568992687947-868a62a9f521", "Boardroom used for regulatory readiness working sessions"),
      img("photo-1554224154-26032ffc0d07", "Financial records used as a stand-in for audit evidence"),
      img("photo-1543286386-713bdd548da4", "Charts used while translating controls into board reporting"),
      img("photo-1507679799987-c73779587ccf", "Executive setting used for governance and registrar coordination"),
    ],
    wide: img("photo-1551836022-d5d88e9218df", "Leadership discussion during a digital-trust engagement", 2400),
  },
  siem: {
    slug: "siem",
    href: ROUTES.services.siem,
    title: siem.displayName,
    navTitle: siem.displayName,
    category: siem.category,
    description: siem.hoverCardBody,
    emblem: "◉ DEFENSE",
    emblemSub: "DETECT AND RESPOND",
    coverBg: "bg-[#ff4081]",
    textColor: "text-white",
    accentColor: "#ff4081",
    menuImage: "/images/menu/platform.png",
    hero: img("photo-1573496359142-b8d87734a5a2", "Analyst at work during detection and response operations", 2400),
    gallery: [
      img("photo-1573497019940-1c28c88b4f3e", "Operator reviewing detection signals"),
      img("photo-1573164574572-cb89e39749b4", "Analyst workstation used during triage"),
      img("photo-1581092795360-fd1ca04f0952", "Industrial control environment representing monitored surfaces"),
      img("photo-1581092160562-40aa08e78837", "Engineer inspecting systems during an investigation"),
    ],
    wide: img("photo-1581092160607-ee22621dd758", "Wide operations floor used for detection engineering work", 2400),
  },
  "smart-contract-audits": {
    slug: "smart-contract-audits",
    href: ROUTES.services.smartContract,
    title: protocol.displayName,
    navTitle: protocol.displayName,
    category: protocol.category,
    description: protocol.hoverCardBody,
    emblem: "◼ PROTOCOL",
    emblemSub: "LAUNCH ASSURANCE",
    coverBg: "bg-[#ff9f1c]",
    textColor: "text-black",
    accentColor: "#ff9f1c",
    menuImage: "/images/menu/solutions.png",
    hero: img("photo-1640340434855-6084b1f4901c", "Digital-asset surface used for protocol and smart-contract review", 2400),
    gallery: [
      img("photo-1581092918056-0c4c3acd3789", "Hardware lab used while inspecting protocol implementations"),
      img("photo-1581090464777-f3220bbe1b8b", "Circuit work representing contract and runtime surfaces"),
      img("photo-1556155092-490a1ba16284", "Presenter walking through a protocol security review"),
      img("photo-1543269865-cbf427effbad", "Working session used during a dual-pass audit"),
    ],
    wide: img("photo-1515378791036-0648a3ef77b2", "Quiet desk used for line-by-line contract review", 2400),
  },
  "ai-ast": {
    slug: "ai-ast",
    href: ROUTES.services.aiAst,
    title: aiAst.displayName,
    navTitle: aiAst.displayName,
    category: aiAst.category,
    description: aiAst.hoverCardBody,
    emblem: "⬣ AI",
    emblemSub: "HUMAN VALIDATED",
    coverBg: "bg-[#1257A6]",
    textColor: "text-white",
    accentColor: "#1257A6",
    menuImage: "/images/menu/services.png",
    hero: img("photo-1555255707-c07966088b7b", "Machine system used as a stand-in for AI security review", 2400),
    gallery: [
      img("photo-1675557009875-436f71457475", "Abstract model field used for AI-system assessment"),
      img("photo-1473968512647-3e447244af8f", "Autonomous machine used as a stand-in for agentic systems"),
      img("photo-1483058712412-4245e9b90334", "Workstation used while reviewing model and tool interfaces"),
      img("photo-1496181133206-80ce9b88a853", "Laptop used during LLM and RAG security testing"),
    ],
    wide: img("photo-1550439062-609e1531270e", "Wide technical workspace used for AI red-team review", 2400),
  },
};

export const SERVICE_CASE_ORDER: ServiceCaseSlug[] = [
  "appsec",
  "vapt",
  "cloud-resilience",
  "compliance-management",
  "siem",
  "smart-contract-audits",
  "ai-ast",
];

export const SERVICE_CASE_PATHS = SERVICE_CASE_ORDER.map(
  (slug) => SERVICE_CASES[slug].href
);

export const isServiceCasePath = (pathname: string | null | undefined) =>
  !!pathname && SERVICE_CASE_PATHS.includes(pathname);

export const SERVICE_CASE_BY_HREF: Record<string, ServiceCaseVisual> =
  Object.values(SERVICE_CASES).reduce<Record<string, ServiceCaseVisual>>((acc, item) => {
    acc[item.href] = item;
    return acc;
  }, {});

export function otherServiceCases(slug: ServiceCaseSlug): ServiceCaseVisual[] {
  return Object.values(SERVICE_CASES).filter((item) => item.slug !== slug);
}
