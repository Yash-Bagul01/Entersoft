export type Service = {
  index: string
  plainLanguageTitle: string
  brandedDescriptor: string
  displayName: string
  category: string
  descriptor: string
  hoverCardHeading: string
  hoverCardBody: string
  route: string
  // Keep any existing fields (slug, legacy name) to avoid breaking sub-page imports
  slug: string
  legacyName: string
  image: string
}

export type ServiceItem = Service;

export const services: Service[] = [
  {
    index: '01',
    plainLanguageTitle: 'Application and Product Security',
    brandedDescriptor: 'Application Assurance',
    displayName: 'Application Assurance',
    category: 'APPLICATION AND PRODUCT SECURITY',
    descriptor: 'APPSEC • DEVSECOPS • SECURE SDLC',
    hoverCardHeading: 'Application Security Transformation',
    hoverCardBody: 'Embed expert-led testing, secure engineering and continuous assurance across applications, APIs, code and release workflows.',
    route: '/services/appsec',
    slug: 'appsec',
    legacyName: 'APPSEC INTEGRATION',
    image: 'https://images.unsplash.com/photo-1585123607190-72ec2979a269?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    index: '02',
    plainLanguageTitle: 'Penetration Testing and Red Teaming',
    brandedDescriptor: 'Adversarial Validation',
    displayName: 'Adversarial Validation',
    category: 'PENETRATION TESTING AND RED TEAMING',
    descriptor: 'PEN TESTING • RED TEAMING • ATTACK PATHS',
    hoverCardHeading: 'Adversarial Security Validation',
    hoverCardBody: 'Recreate real attacker behavior to expose attack paths, validate exploitability and prioritize what must be fixed.',
    route: '/services/vapt',
    slug: 'vapt',
    legacyName: 'VAPT AUDIT SERVICES',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '03',
    plainLanguageTitle: 'Cloud, Identity and Platform Security',
    brandedDescriptor: 'Cloud Resilience',
    displayName: 'Cloud Resilience',
    category: 'CLOUD, IDENTITY AND PLATFORM SECURITY',
    descriptor: 'ASSESSMENT • PEN TESTING • CSPM • MDR',
    hoverCardHeading: 'Modular Cloud Security Practice',
    hoverCardBody: 'Structurally separated cloud security: Assessment, Penetration Testing, Posture Management (EnProbe), Managed Detection, and Container/IaC Security.',
    route: '/services/cloud-resilience',
    slug: 'cloud-resilience',
    legacyName: 'MANAGED CLOUD SECURITY',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '04',
    plainLanguageTitle: 'GRC, Privacy and Audit Readiness',
    brandedDescriptor: 'Digital Trust',
    displayName: 'Digital Trust',
    category: 'GRC, PRIVACY AND AUDIT READINESS',
    descriptor: 'GRC • PRIVACY • AUDIT READINESS',
    hoverCardHeading: 'Cyber Risk & Regulatory Assurance',
    hoverCardBody: 'Translate controls into board-ready risk decisions, audit-ready evidence and sustained compliance.',
    route: '/services/compliance-management',
    slug: 'compliance-management',
    legacyName: 'COMPLIANCE MANAGEMENT',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '05',
    plainLanguageTitle: 'MDR, SIEM and Detection Engineering',
    brandedDescriptor: 'Cyber Defense Operations',
    displayName: 'Cyber Defense Operations',
    category: 'MDR, SIEM AND DETECTION ENGINEERING',
    descriptor: 'MDR • DETECTION ENGINEERING • MANAGED STACK',
    hoverCardHeading: 'Cyber Defense Operations',
    hoverCardBody: 'MDR and Detection Engineering, delivered through your existing security stack or an Entersoft-managed architecture.',
    route: '/services/siem',
    slug: 'siem',
    legacyName: 'MANAGED SIEM & MONITORING',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '06',
    plainLanguageTitle: 'Smart Contract and Web3 Security',
    brandedDescriptor: 'Protocol Assurance',
    displayName: 'Protocol Assurance',
    category: 'SMART CONTRACT AND WEB3 SECURITY',
    descriptor: 'SMART CONTRACTS • DEFI • BLOCKCHAIN',
    hoverCardHeading: 'Digital Asset & Protocol Security',
    hoverCardBody: 'Secure smart contracts, wallets, bridges and protocols before code moves value.',
    route: '/services/smart-contract-audits',
    slug: 'smart-contract-audits',
    legacyName: 'SMART CONTRACT AUDITS',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '07',
    plainLanguageTitle: 'AI and Agentic-System Security',
    brandedDescriptor: 'AI Systems Assurance',
    displayName: 'AI Systems Assurance',
    category: 'AI AND AGENTIC-SYSTEM SECURITY',
    descriptor: 'LLM • RAG • AGENTS • MODEL APIS',
    hoverCardHeading: 'AI Security & Model Assurance',
    hoverCardBody: 'Assess AI applications, models, agents, data flows and autonomous actions before production.',
    route: '/services/ai-ast',
    slug: 'ai-ast',
    legacyName: 'AI AST SECURITY',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
  },
];

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: string;
  name: string;
  tagline: string;
  heroStatement: string;
  overview: string;
  process: ProcessStep[];
  deliverables: string[];
  integrations: string[];
  faqs: FAQItem[];
  stats: { value: string; label: string }[];
  category: string;
  col2Description?: string;
  col3Metadata?: string;
};

import { SERVICE_SLUGS } from "@/config/routes";

export const servicePagesData: Record<string, ServicePageData> = {
  appsec: {
    slug: SERVICE_SLUGS.appsec,
    name: "Application Assurance",
    category: "APPLICATION ASSURANCE",
    tagline: "CI/CD-integrated scanning and manual vulnerability audits.",
    heroStatement: "Automated Pipeline Audits.\nHuman-Validated Findings.",
    overview: "Embed continuous application security testing directly into your developer workflows. Every automated finding is verified by a senior analyst before alert delivery to eliminate noise.",
    col2Description: "Application Assurance Command",
    col3Metadata: "Web • Mobile • API • Release Security",
    process: [
      { index: "01", title: "Pipeline Integration", description: "Embed SAST, DAST, and SCA analysis into your existing CI/CD gates." },
      { index: "02", title: "Automated Execution", description: "Run deep scans automatically at every git commit or merge request." },
      { index: "03", title: "Expert Validation", description: "Our senior analysts triage and validate candidate findings before delivery." },
      { index: "04", title: "Remediation Support", description: "Receive verified fix diffs, code suggestions, and PR-ready changes." },
      { index: "05", title: "Verification & Retest", description: "Re-run automated checks to verify successful remediation." }
    ],
    deliverables: [
      "70 Assurance Checks Documented",
      "PR-Ready Fix Diffs",
      "SCA Dependency Risk Report",
      "Triage Analytics Dashboard"
    ],
    integrations: ["Azure DevOps", "GitHub Actions", "Jira", "ServiceNow"],
    stats: [
      { value: "15 min", label: "Scan Integration" },
      { value: "Verified", label: "Human-Validated Findings" },
      { value: "70+", label: "Assurance Checks" }
    ],
    faqs: [
      { question: "Does AppSec slow down our deployment cycles?", answer: "No. Scans run asynchronously inside your CI/CD pipeline, and developer gates only block on confirmed, high-severity issues validated by our team." },
      { question: "How do you ensure findings are accurate?", answer: "Every single alert triggered by our automated scanners is manually reviewed, verified, and annotated by an Entersoft engineer before it is reported to you. Every reported finding is human-validated before delivery." },
      { question: "Which languages and frameworks do you support?", answer: "We support over 25 major programming languages and frameworks, including JavaScript/TypeScript, Python, Java, Go, C#, and Ruby." },
      { question: "Can we integrate this with Jira?", answer: "Yes. We offer out-of-the-box integrations with Jira, GitHub, GitLab, and Azure DevOps for automated ticket creation." }
    ]
  },
  vapt: {
    slug: "vapt",
    name: "Penetration Testing and Adversarial Validation",
    category: "ADVERSARIAL VALIDATION",
    tagline: "CREST-accredited, CERT-In empanelled penetration testing and adversarial validation.",
    heroStatement: "Penetration Testing &\nAdversarial Validation.",
    overview: "Move beyond standard automated scanning. Certified security auditors conduct thorough penetration testing, threat modeling, and manual exploitation to expose real-world business risks with human-validated findings.",
    col2Description: "Exposure Validation Grid",
    col3Metadata: "Penetration Testing • Adversarial Validation • Retesting",
    process: [
      { index: "01", title: "Scoping & Rules of Engagement", description: "Establish authorised test boundaries, environment controls, safety rules, and threat model objectives." },
      { index: "02", title: "Architecture & Surface Analysis", description: "Map external endpoints, APIs, networks, and cloud boundaries using automated recon and threat modeling." },
      { index: "03", title: "Manual & Business-Logic Testing", description: "Certified security leads execute credentialed manual exploitation, logic abuse testing, and privilege escalation." },
      { index: "04", title: "Risk Rating & Critical Escalation", description: "Triage findings using CVSS metrics and business impact. Escalate critical risks immediately via priority channels." },
      { index: "05", title: "Reporting, Retesting & Closure", description: "Deliver technical PoC reports and executive summaries. Re-test fixes and issue formal closure sign-offs." }
    ],
    deliverables: [
      "CERT-In & CRESTEmpanelled Audit Report",
      "Reproducible Proof-of-Concept Exploit Steps",
      "Executive Risk Summary Narrative",
      "Technical Remediation Roadmap"
    ],
    integrations: ["Jira", "ServiceNow", "Slack", "Teams"],
    stats: [
      { value: "100%", label: "Findings Proven" },
      { value: "12k+", label: "Vulnerabilities Found" },
      { value: "Verified", label: "Human-Validated Findings" }
    ],
    faqs: [
      { question: "What is the difference between Vulnerability Assessment and Penetration Testing?", answer: "Vulnerability Assessments identify candidate flaws using automated tools. Penetration Testing and Adversarial Validation actively exploit flaws within agreed rules of engagement to confirm real-world business impact and eliminate scanner noise." },
      { question: "How long does a penetration testing engagement take?", answer: "A typical assessment takes between 2 to 4 weeks depending on environment complexity, asset count, and scope parameters." },
      { question: "Are your penetration tests CERT-In empanelled and CREST accredited?", answer: "Yes, Entersoft is CERT-In empanelled and CREST accredited, supporting mandatory regulatory, financial, and enterprise compliance audits." },
      { question: "How are critical vulnerabilities escalated during an active test?", answer: "Critical findings are escalated immediately through agreed priority notification channels before report publication, allowing engineering teams to initiate emergency patches right away." },
      { question: "What is included in the retesting and closure phase?", answer: "Retesting is performed within the agreed engagement scope and retest window. When fixes are validated within agreed scope, finding status is updated and formal closure sign-off is issued." }
    ]
  },
  "cloud-resilience": {
    slug: "cloud-resilience",
    name: "Cloud Resilience",
    category: "CLOUD RESILIENCE",
    tagline: "Modular cloud security, penetration testing, posture management, and MDR.",
    heroStatement: "Which Cloud Security Outcome\nAre You Buying?",
    overview: "Structurally separated cloud resilience offerings: Cloud Security Assessment, Cloud & Identity Penetration Testing, Posture Management (EnProbe), Managed Cloud Detection & Response, and Container/IaC Security.",
    col2Description: "Multi-Cloud Governance",
    col3Metadata: "Assessment • Pen Testing • CSPM • MDR",
    process: [
      { index: "01", title: "Outcome Selection", description: "Select between fixed assessment, penetration testing, EnProbe CSPM, managed MDR, or container security." },
      { index: "02", title: "Scope Calibration", description: "Establish exact cloud boundary, provider APIs, identity federation, and workload perimeters." },
      { index: "03", title: "Execution & Telemetry", description: "Execute expert-led testing or deploy continuous EnProbe posture telemetry." },
      { index: "04", title: "Remediation & Assurance", description: "Receive prioritized IaC fixes, PoC attack chains, and continuous drift alerts." }
    ],
    deliverables: [
      "Modular Cloud Security Findings",
      "IAM Privilege & Trust Maps",
      "EnProbe Real-Time Posture Analytics",
      "Executive & Technical Remediation Plan"
    ],
    integrations: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"],
    stats: [
      { value: "5", label: "Modular Offerings" },
      { value: "AWS/Azure/GCP", label: "Multi-Cloud Coverage" },
      { value: "24/7", label: "MDR Detection Option" }
    ],
    faqs: [
      { question: "How is Cloud Resilience structured at Entersoft?", answer: "We offer 5 distinct offerings: Cloud Security Assessment (fixed review), Cloud & Identity Pen Testing (active exploitation), Posture Management (continuous EnProbe CSPM), Managed Detection & Response (24/7 MDR), and Kubernetes/IaC Security." },
      { question: "What is the difference between Assessment and Penetration Testing?", answer: "A Cloud Assessment is a configuration and IAM review against CIS baselines. Penetration Testing actively exploits misconfigurations and role chains to demonstrate real attack paths and business impact." },
      { question: "What is EnProbe?", answer: "EnProbe is Entersoft's cloud-native security posture platform that continuously monitors AWS, Azure, and GCP environments for configuration drift, IAM over-privilege, and network exposure." }
    ]
  },
  "managed-cloud-security": {
    slug: "managed-cloud-security",
    name: "Cloud Resilience",
    category: "CLOUD RESILIENCE",
    tagline: "Continuous cloud posture auditing and threat detection.",
    heroStatement: "Which Cloud Security Outcome\nAre You Buying?",
    overview: "Structurally separated cloud resilience offerings: Cloud Security Assessment, Cloud & Identity Penetration Testing, Posture Management (EnProbe), Managed Cloud Detection & Response, and Container/IaC Security.",
    col2Description: "Multi-Cloud Governance",
    col3Metadata: "Assessment • Pen Testing • CSPM • MDR",
    process: [
      { index: "01", title: "Outcome Selection", description: "Select between fixed assessment, penetration testing, EnProbe CSPM, managed MDR, or container security." },
      { index: "02", title: "Scope Calibration", description: "Establish exact cloud boundary, provider APIs, identity federation, and workload perimeters." },
      { index: "03", title: "Execution & Telemetry", description: "Execute expert-led testing or deploy continuous EnProbe posture telemetry." },
      { index: "04", title: "Remediation & Assurance", description: "Receive prioritized IaC fixes, PoC attack chains, and continuous drift alerts." }
    ],
    deliverables: [
      "Modular Cloud Security Findings",
      "IAM Privilege & Trust Maps",
      "EnProbe Real-Time Posture Analytics",
      "Executive & Technical Remediation Plan"
    ],
    integrations: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"],
    stats: [
      { value: "5", label: "Modular Offerings" },
      { value: "AWS/Azure/GCP", label: "Multi-Cloud Coverage" },
      { value: "24/7", label: "MDR Detection Option" }
    ],
    faqs: [
      { question: "How is Cloud Resilience structured at Entersoft?", answer: "We offer 5 distinct offerings: Cloud Security Assessment (fixed review), Cloud & Identity Pen Testing (active exploitation), Posture Management (continuous EnProbe CSPM), Managed Detection & Response (24/7 MDR), and Kubernetes/IaC Security." }
    ]
  },
  "compliance-management": {
    slug: "compliance-management",
    name: "Digital Trust",
    category: "DIGITAL TRUST",
    tagline: "Cyber risk, regulatory assurance, and continuous evidence governance.",
    heroStatement: "Transform Cyber Risk into\nBoard-Ready Digital Trust.",
    overview: "Establish measurable, audit-ready governance across security controls, regulatory mandates (ISO 27001, SOC 2, GDPR, RBI, CERT-In), data privacy, continuous evidence collection, and third-party risk.",
    col2Description: "Trust & Evidence Architecture",
    col3Metadata: "GRC • Privacy • Continuous Assurance",
    process: [
      { index: "01", title: "Scope & Context Definition", description: "Define system boundaries, technical perimeter, data stores, and regulatory obligations." },
      { index: "02", title: "Diagnostic Gap Assessment", description: "Audit current controls against target frameworks to catalog deficiencies and exposure." },
      { index: "03", title: "Control & Policy Engineering", description: "Draft custom policies, implement ISMS technical safeguards, and harden architectures." },
      { index: "04", title: "Evidence Pipeline Readiness", description: "Stream automated telemetry into immutable audit vaults for external verification." },
      { index: "05", title: "Registrar Liaison & Certification", description: "Serve as technical advocate during independent registrar audits to achieve certification." }
    ],
    deliverables: [
      "Audit-Ready ISMS Manual & SoA",
      "Automated Evidence Collection Vault",
      "Regulatory Gap & Remediation Matrix",
      "Technical Registrar Liaison Packet"
    ],
    integrations: ["ISO 27001", "SOC 2 Type II", "GDPR / DPDP", "RBI Guidelines", "PCI-DSS 4.0", "CERT-In"],
    stats: [
      { value: "7+", label: "Frameworks Supported" },
      { value: "100%", label: "Human-Validated Controls" },
      { value: "24/7", label: "Evidence Telemetry" }
    ],
    faqs: [
      { question: "How is Digital Trust different from traditional compliance?", answer: "Traditional compliance is a point-in-time annual checklist. Digital Trust is an ongoing operating model combining automated telemetry, continuous drift detection, custom policy engineering, and hands-on auditor liaison to keep your enterprise permanently audit-ready." },
      { question: "What is Entersoft's role in the audit?", answer: "We act as your advisory and readiness partner—conducting gap analyses, drafting policies, implementing controls, running simulated internal dry runs, and joining external audit meetings as your technical advocate." },
      { question: "Do you supply software tools?", answer: "We connect automated read-only evidence pipelines to your cloud and identity providers while focusing on expert GRC advisory, custom policy engineering, and hands-on control defense." },
      { question: "What RBI and CERT-In guidelines do you cover?", answer: "We cover the complete spectrum of cybersecurity mandates for banking, NBFCs, and fintechs, including mandatory 180-day log retention verification and CERT-In empanelled audit reporting." },
      { question: "Do you provide certification directly?", answer: "To maintain independence, official ISO 27001 certificates and SOC 2 reports must be issued by accredited external registrars and licensed CPA firms. We prepare you and work directly with the registrar to secure compliance." }
    ]
  },
  siem: {
    slug: "siem",
    name: "Cyber Defense Operations",
    category: "CYBER DEFENSE OPERATIONS",
    tagline: "MDR and Detection Engineering, delivered through your existing security stack or an Entersoft-managed architecture.",
    heroStatement: "MDR & Detection Engineering.\nExisting Stack or Managed Architecture.",
    overview: "MDR and Detection Engineering, delivered through your existing security stack or an Entersoft-managed architecture. Senior analysts provide telemetry correlation, alert triage, root-cause investigation, and continuous rule tuning.",
    col2Description: "Signal-to-Risk Operations",
    col3Metadata: "MDR • Detection Engineering • Flexible Stack",
    process: [
      { index: "01", title: "Log & Telemetry Connection", description: "Connect cloud, network, identity, and endpoint feeds to your existing stack or managed collector." },
      { index: "02", title: "Detection Engineering", description: "Develop and tune custom detection rules tailored to your environment and threat profile." },
      { index: "03", title: "Analyst Triage & Investigation", description: "Senior analysts evaluate security events, perform root-cause analysis, and filter out false alerts." },
      { index: "04", title: "Containment & Remediation", description: "Provide actionable containment guidance and same-day remediation support for confirmed incidents." }
    ],
    deliverables: [
      "Continuous Detection Engineering & Rule Tuning",
      "Root Cause Investigation & Triage Reports",
      "Same-Day Containment Guidance",
      "Telemetry Integration & Health Verification"
    ],
    integrations: ["Splunk", "Microsoft Sentinel", "Wazuh", "Elastic", "CrowdStrike"],
    stats: [
      { value: "MDR & DETECTION", label: "Senior-Led Operations" },
      { value: "HYBRID", label: "Existing or Managed Stack" },
      { value: "TUNED", label: "Continuous Noise Reduction" }
    ],
    faqs: [
      { question: "Do we need to buy or replace our existing SIEM software?", answer: "No. Entersoft analysts operate with your existing security stack (Splunk, Sentinel, Elastic, QRadar, etc.) or can deliver through an Entersoft-managed detection architecture." },
      { question: "How does Entersoft handle false positives?", answer: "Senior analysts verify alerts manually and feed incident learnings back into custom detection rules to continuously reduce recurring noise through rule tuning." },
      { question: "What is included versus customer-owned during incident containment?", answer: "Entersoft provides active threat investigation and immediate containment guidance. Customer engineering teams retain authorization and control over host isolation or credential actions in their environment." },
      { question: "What alerts trigger customer notification?", answer: "Only verified, high-confidence security incidents. We filter out noise so your engineering team receives clear, actionable investigation and containment guidance." }
    ]
  },
  "smart-contract-audits": {
    slug: "smart-contract-audits",
    name: "Protocol Assurance",
    category: "PROTOCOL ASSURANCE",
    tagline: "Smart Contract and Web3 Security audits across EVM and Rust ecosystems.",
    heroStatement: "Mathematical Code Verification.\nDeFi & Protocol Security.",
    overview: "Verify the security and logical integrity of your Web3 protocols. We perform scope-defined formal verification, property-based fuzzing, and expert manual line-by-line audits of smart contracts in Solidity, Rust, Vyper, and Move to prevent economic exploits, reentrancy, and access control flaws.",
    col2Description: "Chain & Protocol Assurance",
    col3Metadata: "Blockchain • DeFi • Smart Contracts • Web3",
    process: [
      { index: "01", title: "Scope & Dependency Mapping", description: "Define test boundaries, target invariants, property definitions, and compile abstract syntax trees." },
      { index: "02", title: "Automated Symbolic & Fuzz Testing", description: "Execute property-based mutation fuzzing, static analysis, and symbolic boundary evaluation." },
      { index: "03", title: "Expert Manual Logic Audit", description: "Perform line-by-line code review of state transitions, access controls, precision rounding, and economic loops." },
      { index: "04", title: "Confidential Findings Delivery", description: "Provide an initial confidential draft report detailing vulnerability taxonomy, severity ratings, and proof-of-concept steps." },
      { index: "05", title: "Patch Verification & Final Attestation", description: "Verify applied remediation patches during re-audit and issue the final engagement report and attestation." }
    ],
    deliverables: [
      "Scope-Defined Security Audit Report",
      "Vulnerability Taxonomy & Severity Matrix",
      "Property Fuzzing & Static Analysis Logs",
      "Remediation Verification & Re-Audit Attestation"
    ],
    integrations: ["Ethereum", "Solana", "Arbitrum", "Optimism", "Polygon", "Base"],
    stats: [
      { value: "Scope-Defined", label: "Property & Invariant Coverage" },
      { value: "EVM & Rust", label: "Supported Chain Stack" },
      { value: "Dual-Pass", label: "Formal & Manual Verification" }
    ],
    faqs: [
      { question: "What blockchains and programming languages do you audit?", answer: "We audit Ethereum and EVM-compatible chains (Solidity, Vyper), Solana (Rust), Cosmos (Go), and Move protocols across client-defined scope boundaries." },
      { question: "How are coverage and testing boundaries established?", answer: "Coverage is measured against the defined engagement scope, properties, attack paths, and test boundaries agreed upon prior to audit execution. We do not use unverified blanket percentages." },
      { question: "Do you audit economic design and oracle dependencies?", answer: "Yes. Our audit methodology includes economic boundary review, oracle dependency analysis, flash loan vulnerability testing, and precision rounding verification." },
      { question: "What is your re-audit policy and responsible disclosure process?", answer: "Every engagement includes a dedicated patch verification pass to audit fix implementations. Initial findings remain strictly confidential, adhering to responsible disclosure protocols until client-authorized release." }
    ]
  },
  "ai-ast": {
    slug: "ai-ast",
    name: "AI Systems Assurance",
    category: "AI SYSTEMS ASSURANCE",
    tagline: "Security assessment of LLM, RAG and agentic AI systems.",
    heroStatement: "AI Security Assessment.\nExpert Validation Safeguards.",
    overview: "Assess LLM applications, RAG pipelines, AI agents, and model APIs before production. We apply fourteen years of offensive-security expertise to detect prompt injection, tool abuse, and data leakage, backed by senior analyst human validation.",
    col2Description: "Agentic Application Shield",
    col3Metadata: "LLM • RAG • Agents • Model Workflows",
    process: [
      { index: "01", title: "Attack Surface Scoping", description: "Map system prompts, guardrails, retrieval stores, tool integrations, and agent execution boundaries." },
      { index: "02", title: "Adversarial Red-Teaming", description: "Execute automated scanning and manual adversarial testing across prompt injection, RAG poisoning, and model escape vectors." },
      { index: "03", title: "Analyst Triage & Validation", description: "Senior security analysts human-validate every finding before inclusion in the client report." },
      { index: "04", title: "Remediation & Retesting", description: "Deliver developer-ready fix playbooks and verify patch effectiveness during retesting." }
    ],
    deliverables: [
      "AI Attack Surface Inventory",
      "Human-Validated Defect Log",
      "OWASP Top 10 for LLM Gap Analysis",
      "Developer Remediation Playbook"
    ],
    integrations: ["OpenAI API", "Hugging Face", "Pinecone", "LangChain"],
    stats: [
      { value: "14 Yrs", label: "Security Engineering Expertise" },
      { value: "Human-Validated", label: "Analyst Finding Triage" },
      { value: "Full-Stack", label: "LLM, RAG & Agent Coverage" }
    ],
    faqs: [
      { question: "Does AI Systems Assurance replace human security analysts?", answer: "No. Automated tools assist in surface scanning, but every reported finding is human-validated by senior Entersoft security analysts before delivery." },
      { question: "How do you test LLM and agentic application security?", answer: "We conduct adversarial testing across prompt injection, RAG vector store poisoning, guardrail evasion, tool call SSRF/permission sprawl, agent goal hijacking, and cross-context data leakage." },
      { question: "Can you assess custom models and local RAG deployments?", answer: "Yes. We assess custom model endpoints, RAG retrieval boundaries, system prompts, agent workflows, and API integrations." },
      { question: "Is our proprietary data or prompt structure shared externally?", answer: "No. All assessment workflows and testing engines run securely in isolated environments. Your code, prompts, and data are never shared or used to train third-party models." }
    ]
  }
};
