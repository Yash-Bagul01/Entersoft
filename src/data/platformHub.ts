import { ROUTES } from "@/config/routes";

export type PlatformHubItem = {
  id: string;
  name: string;
  href: string;
  bg: string;
  image: string;
  video: string;
};

const hubImage = (id: string) => `/images/platform/hub/${id}.jpg`;
const hubClip = (id: string) => `/videos/platform/hub/${id}.mp4`;

export const PLATFORM_HUB_ITEMS: PlatformHubItem[] = [
  {
    id: "enprobe",
    name: "ENPROBE",
    href: ROUTES.platform.enprobe,
    bg: "#ead7d0",
    image: hubImage("enprobe"),
    video: hubClip("enprobe"),
  },
  {
    id: "sast",
    name: "SAST",
    href: ROUTES.platform.sast,
    bg: "#d9d6cf",
    image: hubImage("sast"),
    video: hubClip("sast"),
  },
  {
    id: "sca",
    name: "SCA",
    href: ROUTES.platform.sca,
    bg: "#e4ddd4",
    image: hubImage("sca"),
    video: hubClip("sca"),
  },
  {
    id: "sbom",
    name: "SBOM",
    href: ROUTES.platform.sbomLicenseRisk,
    bg: "#dce4e6",
    image: hubImage("sbom"),
    video: hubClip("sbom"),
  },
  {
    id: "secrets",
    name: "SECRETS",
    href: ROUTES.platform.secrets,
    bg: "#e6d5c8",
    image: hubImage("secrets"),
    video: hubClip("secrets"),
  },
  {
    id: "iac",
    name: "IAC",
    href: ROUTES.platform.iac,
    bg: "#d3d8d4",
    image: hubImage("iac"),
    video: hubClip("iac"),
  },
  {
    id: "container",
    name: "CONTAINER",
    href: ROUTES.platform.container,
    bg: "#d4dee2",
    image: hubImage("container"),
    video: hubClip("container"),
  },
  {
    id: "dast",
    name: "DAST",
    href: ROUTES.platform.dast,
    bg: "#e2d9ce",
    image: hubImage("dast"),
    video: hubClip("dast"),
  },
  {
    id: "agentic",
    name: "AGENTIC",
    href: ROUTES.platform.agenticPentesting,
    bg: "#ddd6ea",
    image: hubImage("agentic"),
    video: hubClip("agentic"),
  },
  {
    id: "api",
    name: "API SECURITY",
    href: ROUTES.platform.apiSecurity,
    bg: "#d8e0d5",
    image: hubImage("api"),
    video: hubClip("api"),
  },
  {
    id: "asm",
    name: "ATTACK SURFACE",
    href: ROUTES.platform.attackSurfaceManagement,
    bg: "#e5dcd3",
    image: hubImage("asm"),
    video: hubClip("asm"),
  },
  {
    id: "cloud",
    name: "CLOUD APPSEC",
    href: ROUTES.platform.cloudAppsec,
    bg: "#dce8ea",
    image: hubImage("cloud"),
    video: hubClip("cloud"),
  },
  {
    id: "ai",
    name: "AI APPSEC",
    href: ROUTES.platform.aiAppsec,
    bg: "#e8dce6",
    image: hubImage("ai"),
    video: hubClip("ai"),
  },
  {
    id: "aspm",
    name: "ASPM",
    href: ROUTES.platform.aspm,
    bg: "#dadde5",
    image: hubImage("aspm"),
    video: hubClip("aspm"),
  },
  {
    id: "compliance",
    name: "COMPLIANCE",
    href: ROUTES.platform.complianceReporting,
    bg: "#e8ded2",
    image: hubImage("compliance"),
    video: hubClip("compliance"),
  },
  {
    id: "threat-intel",
    name: "THREAT INTEL",
    href: ROUTES.platform.threatIntelligence,
    bg: "#d5e2dc",
    image: hubImage("threat-intel"),
    video: hubClip("threat-intel"),
  },
];

function pathOnly(href: string) {
  return href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
}

export function platformHubItemByHref(href: string) {
  const path = pathOnly(href);
  return PLATFORM_HUB_ITEMS.find((item) => pathOnly(item.href) === path);
}

export function hubFront(id: string, _w = 2400) {
  const item = PLATFORM_HUB_ITEMS.find((entry) => entry.id === id);
  return item?.image ?? "";
}

export function hubVideo(id: string) {
  const item = PLATFORM_HUB_ITEMS.find((entry) => entry.id === id);
  return item?.video ?? "";
}
