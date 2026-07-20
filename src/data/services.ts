export type Service = {
  index: string
  displayName: string
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
    displayName: 'APPLICATION ASSURANCE',
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
    displayName: 'ADVERSARIAL VALIDATION',
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
    displayName: 'CLOUD RESILIENCE',
    descriptor: 'CLOUD • CONTAINERS • IDENTITY',
    hoverCardHeading: 'Cloud Security Transformation',
    hoverCardBody: 'Secure cloud architecture, workloads, containers, identities and configurations from design through operation.',
    route: '/services/managed-cloud-security',
    slug: 'managed-cloud-security',
    legacyName: 'MANAGED CLOUD SECURITY',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '04',
    displayName: 'DIGITAL TRUST',
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
    displayName: 'CYBER DEFENSE OPERATIONS',
    descriptor: 'MDR • SIEM • DETECTION ENGINEERING',
    hoverCardHeading: 'Managed Cyber Defense',
    hoverCardBody: 'Unify security monitoring, detection engineering, threat hunting, investigation and response into one continuous operating model.',
    route: '/services/siem',
    slug: 'siem',
    legacyName: 'MANAGED SIEM & MONITORING',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '06',
    displayName: 'PROTOCOL ASSURANCE',
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
    displayName: 'AI SYSTEMS ASSURANCE',
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
      { index: "03", title: "Expert Validation", description: "Our senior analysts triage and filter out false-positives manually." },
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
      { value: "0", label: "False Positives" },
      { value: "70+", label: "Assurance Checks" }
    ],
    faqs: [
      { question: "Does AppSec slow down our deployment cycles?", answer: "No. Scans run asynchronously inside your CI/CD pipeline, and developer gates only block on confirmed, high-severity issues validated by our team." },
      { question: "How do you eliminate false positives?", answer: "Every single alert triggered by our automated scanners is manually reviewed, verified, and annotated by an Entersoft engineer before it is reported to you." },
      { question: "Which languages and frameworks do you support?", answer: "We support over 25 major programming languages and frameworks, including JavaScript/TypeScript, Python, Java, Go, C#, and Ruby." },
      { question: "Can we integrate this with Jira?", answer: "Yes. We offer out-of-the-box integrations with Jira, GitHub, GitLab, and Azure DevOps for automated ticket creation." }
    ]
  },
  vapt: {
    slug: "vapt",
    name: "Adversarial Validation",
    category: "ADVERSARIAL VALIDATION",
    tagline: "Expert penetration testing with active exploitation proof.",
    heroStatement: "Targeted Vulnerability Analysis.\nProven Business Impact.",
    overview: "Move beyond standard automated scanning. Our expert auditors conduct thorough vulnerability assessments and active penetration testing to expose real-world business risks with zero noise.",
    col2Description: "Exposure Validation Grid",
    col3Metadata: "VAPT • Attack Surface • Retesting",
    process: [
      { index: "01", title: "Scoping & Recon", description: "Map your external attack surface, APIs, networks, and logical architecture." },
      { index: "02", title: "Active Vulnerability Scan", description: "Deploy automated engines to run high-throughput credentialed checks." },
      { index: "03", title: "Manual Exploit Run", description: "Conduct active manual exploitation to prove real-world business impact." },
      { index: "04", title: "Evidence Reporting", description: "Deliver detailed findings containing validated Proof-of-Concepts (PoCs)." },
      { index: "05", title: "Retesting Cycles", description: "Verify all applied patches through an unlimited, comprehensive retest." }
    ],
    deliverables: [
      "CERT-In Compliance Report",
      "Proof-of-Concept Exploit Videos",
      "Executive Summary Narrative",
      "Remediation Roadmap Roadmap"
    ],
    integrations: ["Jira", "ServiceNow", "Slack", "Teams"],
    stats: [
      { value: "100%", label: "Findings Proven" },
      { value: "12k+", label: "Vulnerabilities Found" },
      { value: "0", label: "False Positives" }
    ],
    faqs: [
      { question: "What is the difference between VA and PT?", answer: "Vulnerability Assessment (VA) identifies potential flaws. Penetration Testing (PT) actively exploits those flaws to confirm their impact and prove they are actionable threats." },
      { question: "How long does a VAPT audit take?", answer: "A typical assessment takes between 2 to 4 weeks depending on the application complexity and scope of endpoints." },
      { question: "Are you CERT-In empanelled?", answer: "Yes, Entersoft is CERT-In empanelled and CREST certified, allowing us to perform mandatory government and financial audits." },
      { question: "Do you offer retesting?", answer: "Yes. We provide unlimited retesting within 90 days of the initial report to verify that all patches have been correctly applied." }
    ]
  },
  "managed-cloud-security": {
    slug: "managed-cloud-security",
    name: "Cloud Resilience",
    category: "CLOUD RESILIENCE",
    tagline: "Continuous cloud posture auditing and threat detection.",
    heroStatement: "Continuous Posture Monitoring.\nRuntime Threat Defense.",
    overview: "Secure your multi-cloud infrastructure (AWS, Azure, GCP) continuously. We monitor configurations, analyze access paths, detect leaked secrets, and provide automated remediation.",
    col2Description: "Code-to-Cloud Control",
    col3Metadata: "DevSecOps • Cloud • Identity",
    process: [
      { index: "01", title: "Telemetry Setup", description: "Connect read-only IAM access to AWS, Azure, and GCP via secure API." },
      { index: "02", title: "Configuration Review", description: "Audit cloud instances against CIS Benchmarks, SOC2, and ISO control frameworks." },
      { index: "03", title: "IAM Exposure Audit", description: "Analyze privilege escalations, dormant keys, and over-permissive policies." },
      { index: "04", title: "Continuous Alerting", description: "Flag real-time misconfigurations and anomalies inside your SOC stack." }
    ],
    deliverables: [
      "CSPM Posture Analytics",
      "IAM Exposure Heatmap",
      "CIS Benchmark Gap Report",
      "Runtime Security Telemetry"
    ],
    integrations: ["AWS", "Azure", "GCP", "Kubernetes"],
    stats: [
      { value: "24/7", label: "Real-time Audits" },
      { value: "100%", label: "Multi-Cloud Visibility" },
      { value: "5 min", label: "Alert Response Time" }
    ],
    faqs: [
      { question: "Do you need write permissions to our cloud?", answer: "No. We connect using read-only IAM roles and audit APIs. Remediation is delivered as infrastructure-as-code (IaC) templates for your team to apply." },
      { question: "Which compliance frameworks are mapped?", answer: "We map controls to CIS Benchmarks, ISO 27001, SOC 2, HIPAA, and PCI-DSS automatically." },
      { question: "What cloud providers do you support?", answer: "We support AWS, Microsoft Azure, Google Cloud Platform (GCP), and hybrid Kubernetes environments." },
      { question: "How does real-time alerting work?", answer: "Our systems monitor runtime logs (like AWS CloudTrail) and push alerts to your Slack, Microsoft Teams, or SIEM within minutes of a security event." }
    ]
  },
  "compliance-management": {
    slug: "compliance-management",
    name: "Digital Trust",
    category: "DIGITAL TRUST",
    tagline: "Framework readiness, gap analysis, and certification support.",
    heroStatement: "Rigorous Auditing Readiness.\nFramework Certification Support.",
    overview: "Achieve audit readiness for ISO 27001, GDPR, CERT-In, RBI guidelines, and SOC 2. We guide you through gap analyses, policy drafting, training, and liaison with auditors.",
    col2Description: "Trust & Evidence Grid",
    col3Metadata: "Governance • Audit • Compliance",
    process: [
      { index: "01", title: "Framework Scoping", description: "Define boundaries of your organization's compliance targets." },
      { index: "02", title: "Gap Identification", description: "Perform detailed audits against target controls to catalog missing links." },
      { index: "03", title: "Policy Implementation", description: "Draft custom policies, implement ISMS procedures, and train staff." },
      { index: "04", title: "Internal Validation Audit", description: "Run simulated external audits to verify control operation." },
      { index: "05", title: "Liaison & Certification", description: "Coordinate with external auditing bodies to guide you to certificate issuance." }
    ],
    deliverables: [
      "Audit-Ready ISMS Manual",
      "Employee Training & Support Documentation",
      "Risk Assessment Register",
      "Liaison Coordination Log"
    ],
    integrations: ["ISO 27001", "SOC 2", "GDPR", "RBI Guidelines"],
    stats: [
      { value: "100%", label: "Audit Success Rate" },
      { value: "14 years", label: "Compliance Service" },
      { value: "4+", label: "Frameworks Supported" }
    ],
    faqs: [
      { question: "How long does ISO 27001 certification take?", answer: "An organization typically requires 3 to 6 months to implement controls and complete the two stages of the external certification audit." },
      { question: "What is Entersoft's role in the audit?", answer: "We act as your compliance consulting partner—conducting gaps, drafting policies, implementing controls, running the internal audit, and joining external audit meetings as your technical advocate." },
      { question: "Do you supply software tools?", answer: "We help you select and configure compliance automation tools, but our primary focus is expert consulting, custom policy drafting, and hands-on control implementation." },
      { question: "What RBI guidelines do you cover?", answer: "We cover the full spectrum of cyber security guidelines for NBFCs, payment gateways, and banking entities, ensuring 100% compliance with CERT-In VAPT reporting requirements." },
      { question: "What happens if we fail our readiness check?", answer: "We identify gaps during internal audits and resolve them before the official external audit occurs, resulting in our 100% certification success rate." },
      { question: "Do you provide certification directly?", answer: "No. To maintain independence, certifications must be issued by licensed external registrars. We prepare you and work directly with the registrar to secure compliance." }
    ]
  },
  siem: {
    slug: "siem",
    name: "Cyber Defense Operations",
    category: "CYBER DEFENSE OPERATIONS",
    tagline: "Managed SIEM and 24/7 Security Operations Center monitoring.",
    heroStatement: "24/7 SOC Event Monitoring.\nManaged Threat Hunting.",
    overview: "Leverage our 24/7 Managed SIEM and SOC. We aggregate logs across endpoints, networks, databases, and clouds to run correlation rules and stop threats instantly.",
    col2Description: "Signal-to-Risk Operations",
    col3Metadata: "SOC • SIEM • Threat Monitoring",
    process: [
      { index: "01", title: "Log Source Setup", description: "Connect firewalls, directory services, databases, and servers to SIEM collector." },
      { index: "02", title: "Correlation Configuration", description: "Write custom security rules tailored to detect your specific threat surface." },
      { index: "03", title: "24/7 SOC Triage", description: "Our team monitors security events around the clock to filter out false alerts." },
      { index: "04", title: "Orchestrated Response", description: "Deploy pre-built SOAR playbooks to automatically isolate compromised assets." }
    ],
    deliverables: [
      "Weekly Security Posture Summary",
      "SIEM System Health Audits",
      "Incident Response Playbooks",
      "Compliance Log Archives"
    ],
    integrations: ["Splunk", "Microsoft Sentinel", "Wazuh", "Elastic"],
    stats: [
      { value: "24/7/365", label: "Log Monitoring" },
      { value: "< 5 min", label: "MTTD" },
      { value: "99.9%", label: "Correlation Accuracy" }
    ],
    faqs: [
      { question: "Do we need to buy our own SIEM software?", answer: "No. We can deploy our proprietary open-standards SIEM stack, or we can manage and optimize your existing instance of Splunk, Sentinel, or QRadar." },
      { question: "What is your average response time?", answer: "Our Security Operations Center maintains a Mean Time to Detect (MTTD) of under 5 minutes for critical severity alerts." },
      { question: "How do you handle log storage?", answer: "Logs are compressed, encrypted, and archived for up to 1 year (or longer, based on compliance needs) in write-once-read-many (WORM) storage." },
      { question: "What alerts require human contact?", answer: "Only verified, high-risk security incidents. We filter out noise, so you are only contacted when an actionable threat requires remediation or isolated actions." }
    ]
  },
  "smart-contract-audits": {
    slug: "smart-contract-audits",
    name: "Protocol Assurance",
    category: "PROTOCOL ASSURANCE",
    tagline: "Solidity and Rust audits covering Web3 security vectors.",
    heroStatement: "Mathematical Code Verification.\nDeFi Protocol Auditing.",
    overview: "Ensure the integrity of your Web3 protocols. We perform rigorous manual and automated audits of smart contracts written in Solidity, Rust, and Vyper to prevent exploits and front-running.",
    col2Description: "Chain Assurance",
    col3Metadata: "Blockchain • DeFi • Smart Contracts",
    process: [
      { index: "01", title: "Code Compilation", description: "Analyze bytecode and build dependency call graphs of the contracts." },
      { index: "02", title: "Automated Checks", description: "Run static analysis, symbolic execution, and fuzzing tools." },
      { index: "03", title: "Manual Review", description: "Perform line-by-line inspection of contract logic, economic loops, and math." },
      { index: "04", title: "Draft Delivery", description: "Provide a confidential draft report documenting discovered exploit vectors." },
      { index: "05", title: "Verification & Release", description: "Verify your applied code patches and publish the official public audit report." }
    ],
    deliverables: [
      "Public Audit Findings Report",
      "Slither & Mythril Analysis Log",
      "Calculated Economic Risk Sheet",
      "Verification Certification Badge"
    ],
    integrations: ["Ethereum", "Solana", "Arbitrum", "Optimism"],
    stats: [
      { value: "$0", label: "Funds Lost Post-Audit" },
      { value: "150+", label: "Smart Contracts Audited" },
      { value: "100%", label: "Math Checked" }
    ],
    faqs: [
      { question: "What blockchains do you audit?", answer: "We audit Ethereum and EVM-compatible chains (Solidity, Vyper), Cosmos (Go), and Solana (Rust)." },
      { question: "Do you check for economic exploits?", answer: "Yes. We audit game-theoretical parameters, liquidity bridge access, flash-loan vulnerabilities, and oracle dependency risks." },
      { question: "How long does a Web3 audit take?", answer: "DeFi audits usually require 1 to 3 weeks depending on the complexity of the contract dependencies and line-count." },
      { question: "Is our code kept private during the audit?", answer: "Yes. The initial audit and discussions are strictly confidential. We only publish findings to the public domain upon your approval." }
    ]
  },
  "ai-ast": {
    slug: "ai-ast",
    name: "AI Systems Assurance",
    category: "AI SYSTEMS ASSURANCE",
    tagline: "ML-augmented security testing for modern web architectures.",
    heroStatement: "ML-Powered Security Scans.\nExpert Validation Safeguards.",
    overview: "Accelerate your AppSec cycle using machine learning. We deploy AI-powered application security testing to detect complex vulnerability patterns, backed by expert validation to ensure zero false-positives.",
    col2Description: "Agentic Application Shield",
    col3Metadata: "LLM • RAG • Agents • Model Workflows",
    process: [
      { index: "01", title: "AI Engine Training", description: "Tune our scanning model to match the specific code paradigms of your stack." },
      { index: "02", title: "Continuous Scanning", description: "Feed AST findings to ML classifiers to search for logical anomalies." },
      { index: "03", title: "Analyst Triage", description: "Verify AI-flagged vulnerabilities manually to prevent alerting noise." },
      { index: "04", title: "Continuous Learning", description: "Feed feedback loops back into the scanning engines to improve precision." }
    ],
    deliverables: [
      "AI Attack-Surface Inventory",
      "ML-Assisted Defect Logs",
      "OWASP Top 10 Gap Analysis",
      "Vulnerability Trend Analytics"
    ],
    integrations: ["OpenAI API", "Hugging Face", "Pinecone", "LangChain"],
    stats: [
      { value: "10x", label: "Scan Acceleration" },
      { value: "98%", label: "Detection Precision" },
      { value: "0", label: "False Positives" }
    ],
    faqs: [
      { question: "Does AI AST replace human auditors?", answer: "No. AI is used to accelerate the pattern-matching process across millions of lines of code. Every issue is still hand-verified by a senior Entersoft expert." },
      { question: "How does AI AST protect AI apps?", answer: "We look for security risks unique to AI integrations, such as prompt injection vulnerabilities, data leakage through RAG databases, and API exposure paths." },
      { question: "Can this scan custom AI models?", answer: "Yes. We audit pipeline security, training data inputs, model weights, and custom inference configurations." },
      { question: "Is our source code shared with third-party AIs?", answer: "No. All machine learning algorithms and classification engines run locally on Entersoft's isolated, secure, on-premise infrastructure." }
    ]
  }
};
