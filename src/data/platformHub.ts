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

export const PLATFORM_HUB_ITEMS: PlatformHubItem[] = [
  {
    id: "enprobe",
    name: "ENPROBE",
    href: ROUTES.platform.enprobe,
    bg: "#ead7d0",
    faces: {
      front: u("photo-1550745165-9bc0b252726f"),
      top: u("photo-1571171637578-41bc2dd41cd2"),
      right: u("photo-1519389950473-47ba0277781c"),
    },
  },
  {
    id: "sast",
    name: "SAST",
    href: ROUTES.platform.sast,
    bg: "#d9d6cf",
    faces: {
      front: u("photo-1607799279861-4dd421510fb3"),
      top: u("photo-1633356122544-f134324a6cee"),
      right: u("photo-1571171637578-41bc2dd41cd2"),
    },
  },
  {
    id: "sca",
    name: "SCA",
    href: ROUTES.platform.sca,
    bg: "#e4ddd4",
    faces: {
      front: u("photo-1664575602276-acd073ed9017"),
      top: u("photo-1519389950473-47ba0277781c"),
      right: u("photo-1507925921958-8a62f3d1a50d"),
    },
  },
  {
    id: "sbom",
    name: "SBOM",
    href: ROUTES.platform.sbomLicenseRisk,
    bg: "#dce4e6",
    faces: {
      front: u("photo-1586281380349-632531db7ed4"),
      top: u("photo-1507925921958-8a62f3d1a50d"),
      right: u("photo-1555680202-c86f0e12f1e6"),
    },
  },
  {
    id: "secrets",
    name: "SECRETS",
    href: ROUTES.platform.secrets,
    bg: "#e6d5c8",
    faces: {
      front: u("photo-1614741112088-2d746e5b24cd"),
      top: u("photo-1550745165-9bc0b252726f"),
      right: u("photo-1597872200969-2b65d56bd16b"),
    },
  },
  {
    id: "iac",
    name: "IAC",
    href: ROUTES.platform.iac,
    bg: "#d3d8d4",
    faces: {
      front: u("photo-1555680202-c86f0e12f1e6"),
      top: u("photo-1518773553398-650c184e0bb3"),
      right: u("photo-1544197150-b99a580bb7a2"),
    },
  },
  {
    id: "dast",
    name: "DAST",
    href: ROUTES.platform.dast,
    bg: "#e2d9ce",
    faces: {
      front: u("photo-1597872200969-2b65d56bd16b"),
      top: u("photo-1607799279861-4dd421510fb3"),
      right: u("photo-1614741112088-2d746e5b24cd"),
    },
  },
  {
    id: "agentic",
    name: "AGENTIC",
    href: ROUTES.platform.agenticPentesting,
    bg: "#ddd6ea",
    faces: {
      front: u("photo-1531746790731-6c0876ced276"),
      top: u("photo-1664575602276-acd073ed9017"),
      right: u("photo-1633356122544-f134324a6cee"),
    },
  },
  {
    id: "api",
    name: "API SECURITY",
    href: ROUTES.platform.apiSecurity,
    bg: "#d8e0d5",
    faces: {
      front: u("photo-1544197150-b99a580bb7a2"),
      top: u("photo-1518773553398-650c184e0bb3"),
      right: u("photo-1550745165-9bc0b252726f"),
    },
  },
  {
    id: "asm",
    name: "ATTACK SURFACE",
    href: ROUTES.platform.attackSurfaceManagement,
    bg: "#e5dcd3",
    faces: {
      front: u("photo-1446776811953-b23d57bd21aa"),
      top: u("photo-1462331947965-a8b0c5fd5f6b"),
      right: u("photo-1483478550801-ceba5fe97e39"),
    },
  },
  {
    id: "cloud",
    name: "CLOUD APPSEC",
    href: ROUTES.platform.cloudAppsec,
    bg: "#dce8ea",
    faces: {
      front: u("photo-1483478550801-ceba5fe97e39"),
      top: u("photo-1446776811953-b23d57bd21aa"),
      right: u("photo-1544197150-b99a580bb7a2"),
    },
  },
  {
    id: "ai",
    name: "AI APPSEC",
    href: ROUTES.platform.aiAppsec,
    bg: "#e8dce6",
    faces: {
      front: u("photo-1633356122544-f134324a6cee"),
      top: u("photo-1531746790731-6c0876ced276"),
      right: u("photo-1664575602276-acd073ed9017"),
    },
  },
];
