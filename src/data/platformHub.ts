import { ROUTES } from "@/config/routes";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export type PlatformHubItem = {
  id: string;
  name: string;
  href: string;
  bg: string;
  faces: {
    front: string;
    top: string;
    right: string;
  };
};

/** Side faces — unused elsewhere, kept slightly blurred on the cube. */
const SIDE = {
  a: u("photo-1554995207-c18c203602cb"),
  b: u("photo-1501183638710-841dd1904471"),
  c: u("photo-1536376072261-38c75010e6c9"),
  d: u("photo-1541888946425-d81bb19240f5"),
  e: u("photo-1486304873000-235643847519"),
  f: u("photo-1517077304055-6e89abbf09b0"),
  g: u("photo-1494145904049-0dca59b4bbad"),
  h: u("photo-1464822759023-fed622ff2c3b"),
};

export const PLATFORM_HUB_ITEMS: PlatformHubItem[] = [
  {
    id: "enprobe",
    name: "ENPROBE",
    href: ROUTES.platform.enprobe,
    bg: "#ead7d0",
    faces: { front: u("photo-1502602898657-3e91760cbb34", 2400), top: SIDE.a, right: SIDE.b },
  },
  {
    id: "sast",
    name: "SAST",
    href: ROUTES.platform.sast,
    bg: "#d9d6cf",
    faces: { front: u("photo-1441986300917-64674bd600d8", 2400), top: SIDE.c, right: SIDE.d },
  },
  {
    id: "sca",
    name: "SCA",
    href: ROUTES.platform.sca,
    bg: "#e4ddd4",
    faces: { front: u("photo-1416331108676-a22ccb276e35", 2400), top: SIDE.e, right: SIDE.f },
  },
  {
    id: "sbom",
    name: "SBOM",
    href: ROUTES.platform.sbomLicenseRisk,
    bg: "#dce4e6",
    faces: { front: u("photo-1493809842364-78817add7ffb", 2400), top: SIDE.g, right: SIDE.h },
  },
  {
    id: "secrets",
    name: "SECRETS",
    href: ROUTES.platform.secrets,
    bg: "#e6d5c8",
    faces: { front: u("photo-1560448204-e02f11c3d0e2", 2400), top: SIDE.b, right: SIDE.a },
  },
  {
    id: "iac",
    name: "IAC",
    href: ROUTES.platform.iac,
    bg: "#d3d8d4",
    faces: { front: u("photo-1600566753086-00f18fb6b3ea", 2400), top: SIDE.d, right: SIDE.c },
  },
  {
    id: "container",
    name: "CONTAINER",
    href: ROUTES.platform.container,
    bg: "#d4dee2",
    faces: { front: u("photo-1600210492493-0946911123ea", 2400), top: SIDE.f, right: SIDE.e },
  },
  {
    id: "dast",
    name: "DAST",
    href: ROUTES.platform.dast,
    bg: "#e2d9ce",
    faces: { front: u("photo-1600573472592-401b489a3cdc", 2400), top: SIDE.h, right: SIDE.g },
  },
  {
    id: "agentic",
    name: "AGENTIC",
    href: ROUTES.platform.agenticPentesting,
    bg: "#ddd6ea",
    faces: { front: u("photo-1600566753190-17f0baa2a6c3", 2400), top: SIDE.a, right: SIDE.c },
  },
  {
    id: "api",
    name: "API SECURITY",
    href: ROUTES.platform.apiSecurity,
    bg: "#d8e0d5",
    faces: { front: u("photo-1600607687644-c7171b42498f", 2400), top: SIDE.b, right: SIDE.d },
  },
  {
    id: "asm",
    name: "ATTACK SURFACE",
    href: ROUTES.platform.attackSurfaceManagement,
    bg: "#e5dcd3",
    faces: { front: u("photo-1613490493576-7fde63acd811", 2400), top: SIDE.e, right: SIDE.g },
  },
  {
    id: "cloud",
    name: "CLOUD APPSEC",
    href: ROUTES.platform.cloudAppsec,
    bg: "#dce8ea",
    faces: { front: u("photo-1600596542815-ffad4c1539a9", 2400), top: SIDE.f, right: SIDE.h },
  },
  {
    id: "ai",
    name: "AI APPSEC",
    href: ROUTES.platform.aiAppsec,
    bg: "#e8dce6",
    faces: { front: u("photo-1512917774080-9991f1c4c750", 2400), top: SIDE.c, right: SIDE.a },
  },
  {
    id: "aspm",
    name: "ASPM",
    href: ROUTES.platform.aspm,
    bg: "#dadde5",
    faces: { front: u("photo-1570129477492-45c003edd2be", 2400), top: SIDE.d, right: SIDE.b },
  },
  {
    id: "compliance",
    name: "COMPLIANCE",
    href: ROUTES.platform.complianceReporting,
    bg: "#e8ded2",
    faces: { front: u("photo-1564013799919-ab600027ffc6", 2400), top: SIDE.g, right: SIDE.e },
  },
  {
    id: "threat-intel",
    name: "THREAT INTEL",
    href: ROUTES.platform.threatIntelligence,
    bg: "#d5e2dc",
    faces: { front: u("photo-1503387762-592deb58ef4e", 2400), top: SIDE.h, right: SIDE.f },
  },
];

function pathOnly(href: string) {
  return href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
}

export function platformHubItemByHref(href: string) {
  const path = pathOnly(href);
  return PLATFORM_HUB_ITEMS.find((item) => pathOnly(item.href) === path);
}

export function hubFront(id: string, w = 2400) {
  const item = PLATFORM_HUB_ITEMS.find((entry) => entry.id === id);
  if (!item) return "";
  return item.faces.front.includes("w=")
    ? item.faces.front.replace(/w=\d+/, `w=${w}`)
    : item.faces.front;
}
