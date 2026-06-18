export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  link: string;
  tag: string;
  abstractType: "network" | "terminal" | "shield" | "compliance" | "binary" | "database" | "ai";
}

export const services: ServiceItem[] = [
  {
    id: "appsec",
    index: "01",
    title: "AppSec Integration",
    description: "Continuous application security testing embedded directly into your CI/CD pipelines. Identify vulnerabilities at the commit level before they ever hit production.",
    link: "#contact",
    tag: "DEVSECOPPS PIPELINES",
    abstractType: "terminal"
  },
  {
    id: "vapt",
    index: "02",
    title: "VAPT Audit Services",
    description: "Expert-driven vulnerability assessment and penetration testing providing real exploit proofs. CERT-In certified audit compliance with zero false-positive reports.",
    link: "#contact",
    tag: "HYBRID PEN-TESTING",
    abstractType: "shield"
  },
  {
    id: "cloud",
    index: "03",
    title: "Managed Cloud Security",
    description: "Continuous configuration audits, posture management (CSPM), and real-time threat response for complex multi-cloud deployments (AWS, Azure, GCP).",
    link: "#contact",
    tag: "CLOUD INFRASTRUCTURE",
    abstractType: "network"
  },
  {
    id: "compliance",
    index: "04",
    title: "Compliance Management",
    description: "Navigate global security frameworks with ease. Complete gap analysis and certification support for ISO 27001, GDPR, CERT-In, and RBI guidelines.",
    link: "#contact",
    tag: "GOVERNANCE & AUDIT",
    abstractType: "compliance"
  },
  {
    id: "siem",
    index: "05",
    title: "Managed SIEM & Monitoring",
    description: "24/7 security operations center (SOC) monitoring. Real-time log correlation, anomaly threat hunting, and automated incident response orchestration.",
    link: "#contact",
    tag: "SECURITY MONITORING",
    abstractType: "database"
  },
  {
    id: "smart-contract",
    index: "06",
    title: "Smart Contract Audits",
    description: "Deep mathematical and logic audits for Solidity, Rust, and Vyper smart contracts. Protect Web3 protocols against logic flaws, front-running, and flash loan attacks.",
    link: "#contact",
    tag: "DEFI & BLOCKCHAIN",
    abstractType: "binary"
  },
  {
    id: "ai-ast",
    index: "07",
    title: "AI AST Security",
    description: "Advanced application security testing tailored specifically for AI integrations, protecting LLM prompts against injection attacks and securing RAG architectures.",
    link: "#contact",
    tag: "AI SAFETY FRAMEWORK",
    abstractType: "ai"
  }
];
