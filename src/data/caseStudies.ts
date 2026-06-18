export interface CaseStudyItem {
  id: string;
  sector: string;
  title: string;
  description: string;
  outcome: string;
  link: string;
  graphicType: "network" | "data" | "code" | "lines";
}

export const caseStudies: CaseStudyItem[] = [
  {
    id: "cision",
    sector: "MEDIA & ANALYTICS",
    title: "Cision M&A Posture Validation",
    description: "Secured legacy systems during global acquisition consolidation, ensuring zero-day vulnerabilities were eradicated before integration.",
    outcome: "Validated 14 multi-cloud assets and aligned security postures during pre-merger due diligence.",
    link: "#case-studies/cision",
    graphicType: "network"
  },
  {
    id: "nbfc-rbi",
    sector: "NBFC & RETIREMENT",
    title: "RBI Compliance Transformation",
    description: "Re-engineered infrastructure compliance controls to meet stringent RBI cyber directives and achieved full ISO 27001 readiness.",
    outcome: "Passed audits with zero core violations, securing licensing clearances across 230 backend systems.",
    link: "#case-studies/nbfc-rbi",
    graphicType: "data"
  },
  {
    id: "logistics-appsec",
    sector: "LOGISTICS ENTERPRISE",
    title: "Supply Chain Pipeline Audits",
    description: "Integrated automated AppSec scanners and static code analysis into the global deployment pipeline of a logistics giant.",
    outcome: "Reduced deployment gate checks from 4 hours to 8 minutes, blocking critical leaks before compile-time.",
    link: "#case-studies/logistics-appsec",
    graphicType: "code"
  },
  {
    id: "fintech-bank",
    sector: "FINTECH Unicorn",
    title: "Australian Banking Readiness",
    description: "Hardened external API integrations and authenticated gateway logic to prepare a fintech leader for core bank partner integration.",
    outcome: "Secured critical API vectors and certified bank-grade penetration compliance within 30 days.",
    link: "#case-studies/fintech-bank",
    graphicType: "lines"
  }
];
