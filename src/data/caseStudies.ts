export interface CaseStudyItem {
  id: string;
  symbol: string;
  symbolName: string;
  arcText: string;
  sector: string;
  index: string;
  title: string;
  description: string;
  outcome: string;
  metric: string;
  vulnerability: string;
  strategy: string;
  impact: string;
  link: string;
  graphicType?: "network" | "data" | "code" | "lines";
  // Structured Enterprise Case Study Fields
  customerProblem: string;
  agreedScope: string;
  entersoftApproach: string;
  technologyUsed: string;
  timeline: string;
  measuredResult: string;
  customerQuote: string;
  anonymisationStatement: string;
}

export const caseStudies: CaseStudyItem[] = [
  {
    id: "cision",
    symbol: "Ma",
    symbolName: "M&A Due Diligence",
    arcText: "Pre-Merger Validation · Vulnerability Eradication · 14 Multi-Cloud Assets",
    sector: "MEDIA & ANALYTICS",
    index: "01",
    title: "Global Acquisition Risk Validation",
    description: "Secured legacy cloud systems during global acquisition consolidation, ensuring critical vulnerabilities were identified and remediated prior to integration.",
    outcome: "Validated 14 multi-cloud assets and aligned security postures during pre-merger due diligence.",
    metric: "14 Multi-Cloud Assets Cleared",
    vulnerability: "Direct object references and legacy database configuration drift exposed pre-acquisition due diligence data.",
    strategy: "Executed deep-dive attack path analysis and integrated real-time API traffic controls.",
    impact: "Remediated critical threat vectors and secured pre-merger integrations across 14 multi-cloud endpoints.",
    link: "#case-studies",
    graphicType: "network",
    customerProblem: "Pre-acquisition due diligence revealed unverified attack paths across legacy cloud endpoints prior to core infrastructure merger.",
    agreedScope: "Security assessment of 14 multi-cloud environments, API gateways, and customer data stores.",
    entersoftApproach: "Combined automated EnProbe ASPM discovery with deep manual penetration testing to isolate critical vulnerabilities.",
    technologyUsed: "EnProbe ASPM, DAST, AWS IAM Analyzer, Manual Code Auditing",
    timeline: "4 Weeks",
    measuredResult: "100% of critical exploit paths remediated and verified before merger sign-off.",
    customerQuote: "Entersoft provided clear, prioritized visibility across acquired cloud assets, giving our CISO total confidence during merger completion.",
    anonymisationStatement: "Client identity and specific architecture metrics published under approved disclosure guidelines."
  },
  {
    id: "nbfc-rbi",
    symbol: "Rb",
    symbolName: "RBI Governance",
    arcText: "Micro-Segmentation · ISO 27001 · 230 Core Backend Systems",
    sector: "NBFC & GOVERNANCE",
    index: "02",
    title: "RBI Compliance Transformation",
    description: "Re-engineered infrastructure compliance controls to meet stringent RBI cyber directives and achieved full ISO 27001 readiness.",
    outcome: "Passed audits with zero core violations, securing licensing clearances across 230 backend systems.",
    metric: "Zero Core Violations Across 230 Systems",
    vulnerability: "Non-compliant network segmentation and lack of continuous evidence monitoring violated RBI cyber directives.",
    strategy: "Implemented micro-segmentation architectures and set up continuous security posture controls.",
    impact: "Secured licensing clearance with zero core violations across 230 backend host systems.",
    link: "#case-studies",
    graphicType: "data",
    customerProblem: "Strict regulatory audit deadlines required full alignment with RBI Cyber Security Framework directives across legacy core banking servers.",
    agreedScope: "230 backend host systems, database clusters, network segmentation, and ISMS policy validation.",
    entersoftApproach: "Deployed continuous posture monitoring and mapped technical evidence directly to ISO 27001 and RBI control matrices.",
    technologyUsed: "EnProbe CSPM, ISO 27001 Control Mapper, CIS Benchmarks",
    timeline: "6 Weeks",
    measuredResult: "Zero core audit non-conformances and successful regulatory licensing renewal.",
    customerQuote: "Entersoft transformed regulatory compliance from a manual audit panic into a continuous evidence-backed process.",
    anonymisationStatement: "Financial entity name withheld under non-disclosure governance terms."
  },
  {
    id: "logistics-appsec",
    symbol: "Sc",
    symbolName: "Supply Chain AppSec",
    arcText: "Static Code Analysis · Automated CI/CD Gates · 4hr to 8min",
    sector: "LOGISTICS ENTERPRISE",
    index: "03",
    title: "Supply Chain Pipeline Security",
    description: "Integrated automated AppSec scanners and static code analysis into the global deployment pipeline of a logistics enterprise.",
    outcome: "Reduced deployment gate checks from 4 hours to 8 minutes, blocking critical leaks before compile-time.",
    metric: "Deployment Gates: 4hr → 8min",
    vulnerability: "Hardcoded API tokens in build scripts and unverified third-party dependencies in release pipelines.",
    strategy: "Built static analysis gates and secret scanners directly into the automated CI/CD pipeline.",
    impact: "Prevented pre-compile security leaks and accelerated deployment cycles from 4 hours to 8 minutes.",
    link: "#case-studies",
    graphicType: "code",
    customerProblem: "Manual security reviews delayed software releases by up to 4 hours per deployment while open-source dependencies introduced risk.",
    agreedScope: "12 core microservices, global CI/CD pipelines, container registries, and developer workstations.",
    entersoftApproach: "Embedded lightweight pre-commit hooks and automated pull-request analysis directly into developer workflows.",
    technologyUsed: "EnProbe SAST, SCA, Secret Defense, GitHub Actions Integration",
    timeline: "3 Weeks",
    measuredResult: "Automated scan duration reduced from 4 hours to 8 minutes with 0 false-positive build blocks.",
    customerQuote: "Engineering velocity increased significantly while eliminating secret leaks before code ever reaches production.",
    anonymisationStatement: "Enterprise identity anonymised at client request."
  },
  {
    id: "fintech-bank",
    symbol: "Fi",
    symbolName: "FinTech Banking",
    arcText: "mTLS Gateways · Bank-Grade PenTest · API Rate-Limiting",
    sector: "FINTECH UNICORN",
    index: "04",
    title: "Banking API Readiness Audit",
    description: "Hardened external API integrations and authenticated gateway logic to prepare a fintech leader for core bank partner integration.",
    outcome: "Secured critical API vectors and certified bank-grade penetration compliance within 30 days.",
    metric: "Certified Bank-Grade in 30 Days",
    vulnerability: "Inadequate mutual TLS (mTLS) enforcement and broken rate-limiting controls on partner-facing APIs.",
    strategy: "Hardened banking gateway protocols, implemented mTLS, and deployed robust API traffic rate-limiters.",
    impact: "Validated bank-grade penetration compliance and secured integration with leading banking platforms within 30 days.",
    link: "#case-studies",
    graphicType: "lines",
    customerProblem: "Major banking partner required independent penetration certification and mTLS verification before granting production API access.",
    agreedScope: "Public API gateways, authentication services, financial payload encryption, and partner webhook endpoints.",
    entersoftApproach: "Executed adversarial penetration testing simulating advanced threat actors followed by collaborative fix verification.",
    technologyUsed: "EnProbe DAST, PTaaS, API Security Testing, mTLS Verification",
    timeline: "30 Days",
    measuredResult: "100% remediation of high-severity API findings and successful bank integration approval.",
    customerQuote: "Entersoft’s rigorous penetration testing and verification allowed us to meet our partner bank’s strict security standard on schedule.",
    anonymisationStatement: "FinTech entity and partner bank names withheld pursuant to confidentiality agreements."
  }
];

