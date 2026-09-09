import type { PlatformPillar } from "@/data/platform";

const u = (id: string, w = 2400) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export type SolutionCaseSlug =
  | "ai-appsec"
  | "cloud-appsec"
  | "api-security"
  | "aspm"
  | "attack-surface-management"
  | "sbom-license-risk"
  | "secrets";

export type SolutionCaseImage = {
  src: string;
  alt: string;
};

export type SolutionCaseVisual = {
  slug: SolutionCaseSlug;
  href: string;
  showcaseTitle: string;
  hero: SolutionCaseImage;
  gallery: SolutionCaseImage[];
  wide: SolutionCaseImage;
  tags: string[];
};

export const SOLUTION_CASE_PATHS = [
  "/platform/ai-appsec",
  "/platform/cloud-appsec",
  "/platform/api-security",
  "/platform/aspm",
  "/platform/attack-surface-management",
  "/platform/sbom-license-risk",
  "/platform/secrets",
] as const;

export const isSolutionCasePath = (pathname: string | null | undefined) =>
  !!pathname && (SOLUTION_CASE_PATHS as readonly string[]).includes(pathname);

export const SOLUTION_CASES: Record<SolutionCaseSlug, SolutionCaseVisual> = {
  "ai-appsec": {
    slug: "ai-appsec",
    href: "/platform/ai-appsec",
    showcaseTitle: "AI Security & Governance",
    hero: {
      src: u("photo-1677442136019-21780ecad995", 2400),
      alt: "Neural network visualization of an AI model",
    },
    gallery: [
      {
        src: u("photo-1620641788421-7a1c342ea42e", 1600),
        alt: "Abstract three-dimensional light forms",
      },
      {
        src: u("photo-1635070041078-e363dbe005cb", 1600),
        alt: "Quantum particle field in deep blue",
      },
      {
        src: u("photo-1655720828018-edd2daec9349", 1600),
        alt: "Generative AI face study in monochrome",
      },
      {
        src: u("photo-1676299081847-824916de030a", 1600),
        alt: "Layered AI model visualization",
      },
    ],
    wide: {
      src: u("photo-1620641788421-7a1c342ea42e", 2400),
      alt: "Abstract three-dimensional light forms across a wide frame",
    },
    tags: ["AI-Native Assurance", "LLM Defense", "Fix Synthesis", "Triage"],
  },
  "cloud-appsec": {
    slug: "cloud-appsec",
    href: "/platform/cloud-appsec",
    showcaseTitle: "Cloud Posture & Infra",
    hero: {
      src: u("photo-1484557052118-f32bd25b45b5", 2400),
      alt: "Aerial cloud layer over a continental coastline",
    },
    gallery: [
      {
        src: u("photo-1485827404703-89b55fcc595e", 1600),
        alt: "Industrial automation arm in a controlled environment",
      },
      {
        src: u("photo-1534972195531-d756b9bfa9f2", 1600),
        alt: "Dark workstation with infrastructure telemetry",
      },
      {
        src: u("photo-1573164713714-d95e436ab8d6", 1600),
        alt: "Operators reviewing a multi-cloud operations wall",
      },
      {
        src: u("photo-1484557052118-f32bd25b45b5", 1600),
        alt: "Cloud layer used as the posture system's visual register",
      },
    ],
    wide: {
      src: u("photo-1573164713714-d95e436ab8d6", 2400),
      alt: "Operators reviewing a multi-cloud operations wall",
    },
    tags: ["Multi-Cloud Defense", "IAM Graph", "Attack Paths", "CSPM"],
  },
  "api-security": {
    slug: "api-security",
    href: "/platform/api-security",
    showcaseTitle: "API Security & Ecosystem",
    hero: {
      src: u("photo-1555949963-aa79dcee981c", 2400),
      alt: "Close-up of application source on a developer screen",
    },
    gallery: [
      {
        src: u("photo-1515879218367-8466d910aaa4", 1600),
        alt: "Terminal session with green-on-black code",
      },
      {
        src: u("photo-1488590528505-98d2b5aba04b", 1600),
        alt: "Laptop displaying an interface specification",
      },
      {
        src: u("photo-1531297484001-80022131f5a1", 1600),
        alt: "Dark laptop workspace used for API work",
      },
      {
        src: u("photo-1487058792275-0ad4aaf24ca7", 1600),
        alt: "Color-coded source listing across a wide monitor",
      },
    ],
    wide: {
      src: u("photo-1516116216624-53e697fedbea", 2400),
      alt: "Distributed service diagram on a development desk",
    },
    tags: ["API Risk Management", "Discovery", "BOLA", "Schema Audit"],
  },
  aspm: {
    slug: "aspm",
    href: "/platform/aspm",
    showcaseTitle: "AppSec Posture (ASPM)",
    hero: {
      src: u("photo-1504639725590-34d0984388bd", 2400),
      alt: "Terminal and editor windows correlating findings",
    },
    gallery: [
      {
        src: u("photo-1516321318423-f06f85e504b3", 1600),
        alt: "Collaborative review of a security backlog",
      },
      {
        src: u("photo-1517430816045-df4b7de11d1d", 1600),
        alt: "Engineering workstation with multiple analysis panes",
      },
      {
        src: u("photo-1581091226825-a6a2a5aee158", 1600),
        alt: "Laptop used for vulnerability triage",
      },
      {
        src: u("photo-1461749280684-dccba630e2f6", 1600),
        alt: "Java source in an IDE during correlation",
      },
    ],
    wide: {
      src: u("photo-1504384764586-bb4cdc1707b0", 2400),
      alt: "Security operations floor coordinating remediation",
    },
    tags: ["EnProbe ASPM", "Correlation", "Risk Scoring", "Dispatch"],
  },
  "attack-surface-management": {
    slug: "attack-surface-management",
    href: "/platform/attack-surface-management",
    showcaseTitle: "Continuous Exposure (CTEM)",
    hero: {
      src: u("photo-1633265486064-086b219458ec", 2400),
      alt: "Hardened lock over a circuit substrate",
    },
    gallery: [
      {
        src: u("photo-1563206767-5b18f218e8de", 1600),
        alt: "Cyber defense hardware in a dark lab",
      },
      {
        src: u("photo-1526378722484-bd91ca387e72", 1600),
        alt: "Network map rendered as a matrix of nodes",
      },
      {
        src: u("photo-1510915361894-db8b60106cb1", 1600),
        alt: "External perimeter lighting against a night skyline",
      },
      {
        src: u("photo-1510511459019-5dda7724fd87", 1600),
        alt: "Keyboard used during reconnaissance work",
      },
    ],
    wide: {
      src: u("photo-1614064641938-3bbee52942c7", 2400),
      alt: "Padlock on a dark technical surface",
    },
    tags: ["Attack Surface Mgmt", "Discovery", "Shadow IT", "Exposure"],
  },
  "sbom-license-risk": {
    slug: "sbom-license-risk",
    href: "/platform/sbom-license-risk",
    showcaseTitle: "DevSecOps & Supply Chain",
    hero: {
      src: u("photo-1667372393119-3d4c48d07fc9", 2400),
      alt: "Container ship at night representing a software supply chain",
    },
    gallery: [
      {
        src: u("photo-1618401471353-b98afee0b2eb", 1600),
        alt: "Version-control history on a development machine",
      },
      {
        src: u("photo-1605745341112-85968b19335b", 1600),
        alt: "Packaged goods moving through a logistics line",
      },
      {
        src: u("photo-1642104704074-907c0698cbd9", 1600),
        alt: "Abstract dependency graph in neon light",
      },
      {
        src: u("photo-1639322537228-f710d846310a", 1600),
        alt: "Blockchain-like block lattice for component inventory",
      },
    ],
    wide: {
      src: u("photo-1639762681057-408e52192e55", 2400),
      alt: "Wide lattice of linked software components",
    },
    tags: ["SBOM & License Risk", "CycloneDX", "SPDX", "Policy Gate"],
  },
  secrets: {
    slug: "secrets",
    href: "/platform/secrets",
    showcaseTitle: "Data Protection & Identity",
    hero: {
      src: u("photo-1563013544-824ae1b704d3", 2400),
      alt: "Physical lock representing credential control",
    },
    gallery: [
      {
        src: u("photo-1614849286521-4c58b2f0ff15", 1600),
        alt: "Fingerprint used as an identity signal",
      },
      {
        src: u("photo-1618005198919-d3d4b5a92ead", 1600),
        alt: "Abstract identity field in muted color",
      },
      {
        src: u("photo-1614064641938-3bbee52942c7", 1600),
        alt: "Padlock on a dark technical surface",
      },
      {
        src: u("photo-1510511459019-5dda7724fd87", 1600),
        alt: "Keyboard used during credential review",
      },
    ],
    wide: {
      src: u("photo-1550684848-fac1c5b4e853", 2400),
      alt: "Dark corridor suggesting a controlled identity boundary",
    },
    tags: ["Identity & GRC", "Secrets", "Verification", "Revocation"],
  },
};

export const SOLUTION_CASE_BY_HREF: Record<string, SolutionCaseVisual> = Object.values(
  SOLUTION_CASES
).reduce<Record<string, SolutionCaseVisual>>((acc, item) => {
  acc[item.href] = item;
  return acc;
}, {});

export function otherSolutionCases(slug: SolutionCaseSlug): SolutionCaseVisual[] {
  return Object.values(SOLUTION_CASES).filter((item) => item.slug !== slug);
}

export function tagsForCase(visual: SolutionCaseVisual, pillar: PlatformPillar): string[] {
  const fromPillar = pillar.whatItDoes.map((item) => item.title);
  return Array.from(new Set([pillar.cluster, ...visual.tags, ...fromPillar])).slice(0, 6);
}
