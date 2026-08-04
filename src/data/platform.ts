export interface PlatformPillar {
  slug: string;
  title: string;
  descriptor: string;
  cluster: "Scan Code" | "Test Runtime" | "Manage Vulnerabilities" | "Discover & Model" | "Prioritize & Respond" | "Govern & Assure";
  summary: string;
  coreCapability: string;
  whatItDoes: {
    title: string;
    description: string;
  }[];
  howItWorks: {
    step: string;
    title: string;
    description: string;
  }[];
  whereItFits: {
    serviceName: string;
    serviceHref: string;
    description: string;
  }[];
}

export const platformPillars: Record<string, PlatformPillar> = {
  // --- SCAN CODE ---
  "sast": {
    slug: "sast",
    title: "Static Application Security Testing (SAST)",
    descriptor: "EARLY STATIC SECURITY ANALYSIS",
    cluster: "Scan Code",
    summary: "Catch vulnerabilities early in source code before runtime with deep, multi-language static analysis and zero noise correlation.",
    coreCapability: "Pre-commit & CI/CD Static Code Security Analysis",
    whatItDoes: [
      {
        title: "Deep Source Code Scanning",
        description: "Analyze multi-language source repositories, IDE commits, and pull requests for OWASP Top 10 vulnerabilities and logic flaws."
      },
      {
        title: "Runtime Proof Correlation",
        description: "Correlate static findings with live DAST evidence to eliminate false positives and highlight true exploitability."
      },
      {
        title: "Developer IDE Integration",
        description: "Deliver inline remediation guidance and code fixes directly within developer IDEs and Git workflows."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Code Repository Connection",
        description: "Connect to GitHub, GitLab, Bitbucket, or Azure DevOps to trigger continuous SAST analysis on every push."
      },
      {
        step: "02",
        title: "AST Engine Parsing",
        description: "Build complete abstract syntax trees and data flow graphs across source code files."
      },
      {
        step: "03",
        title: "Vulnerability & Proof Verification",
        description: "Correlate AST flaw traces with DAST runtime verification data to filter noise."
      },
      {
        step: "04",
        title: "Automated PR Feedback",
        description: "Post inline remediation code snippets into pull requests to prevent vulns from entering main branches."
      }
    ],
    whereItFits: [
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Powers the static code auditing layer of Entersoft's continuous AppSec practices."
      },
      {
        serviceName: "Adversarial Validation",
        serviceHref: "/services/vapt",
        description: "Provides penetration testing leads with exact code line locations for identified flaws."
      }
    ]
  },

  "sca": {
    slug: "sca",
    title: "Open Source (SCA)",
    descriptor: "FIND VULNERABLE DEPENDENCIES",
    cluster: "Scan Code",
    summary: "Identify vulnerable third-party libraries, transitive dependencies, and licensing risks across your software supply chain.",
    coreCapability: "Software Composition Analysis & Supply Chain Defense",
    whatItDoes: [
      {
        title: "Transitive Dependency Mapping",
        description: "Recursively inspect package manifests, locks, and binary dependencies for known CVEs and malicious packages."
      },
      {
        title: "Reachability Analysis",
        description: "Determine whether vulnerable open source functions are actually called by your application code."
      },
      {
        title: "Automated Dependency Upgrades",
        description: "Propose non-breaking automated pull requests to update vulnerable open source packages."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Manifest & Lockfile Scan",
        description: "Ingest npm, maven, pip, go, and cargo manifests across repository codebases."
      },
      {
        step: "02",
        title: "Vulnerability Database Lookup",
        description: "Query real-time CISA KEV, NVD, and proprietary threat intelligence databases for known vulnerabilities."
      },
      {
        step: "03",
        title: "Call-Graph Reachability Verification",
        description: "Verify if vulnerable open-source method signatures are reached during runtime execution."
      },
      {
        step: "04",
        title: "Automated PR Dispatch",
        description: "Dispatch automated dependency update PRs with verified compatibility checks."
      }
    ],
    whereItFits: [
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Ensures open source dependencies comply with corporate security baselines."
      },
      {
        serviceName: "Digital Trust",
        serviceHref: "/services/compliance-management",
        description: "Provides software supply chain security proof for SOC 2 and ISO 27001 audits."
      }
    ]
  },

  "sbom-license-risk": {
    slug: "sbom-license-risk",
    title: "SBOM & License Risk",
    descriptor: "GENERATE SBOMS & TRACK LICENSES",
    cluster: "Scan Code",
    summary: "Generate continuous CycloneDX and SPDX Software Bill of Materials (SBOMs) while enforcing open-source license compliance.",
    coreCapability: "Automated SBOM Generation & Open Source License Compliance",
    whatItDoes: [
      {
        title: "Standardized SBOM Export",
        description: "Produce machine-readable SPDX and CycloneDX SBOMs for regulatory compliance and enterprise customer delivery."
      },
      {
        title: "Copyleft License Detection",
        description: "Identify GPL, AGPL, and restrictive copyleft licenses before code release to protect proprietary intellectual property."
      },
      {
        title: "Continuous Drift Tracking",
        description: "Monitor changes in software component inventory across every build and release deployment."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Build Ingestion",
        description: "Extract complete software component manifests directly from build pipelines."
      },
      {
        step: "02",
        title: "License Metadata Analysis",
        description: "Classify open source licenses into permissive, weak copyleft, and strong copyleft risk tiers."
      },
      {
        step: "03",
        title: "Policy Enforcement",
        description: "Block deployment builds containing non-compliant or high-risk open-source licenses."
      },
      {
        step: "04",
        title: "Signed Export",
        description: "Export cryptographically signed SBOM packages for enterprise customer audits."
      }
    ],
    whereItFits: [
      {
        serviceName: "Digital Trust",
        serviceHref: "/services/compliance-management",
        description: "Fulfills executive order and federal requirements for continuous SBOM generation."
      },
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Maintains absolute inventory transparency across enterprise applications."
      }
    ]
  },

  "secrets": {
    slug: "secrets",
    title: "Secrets Detection",
    descriptor: "DETECT EXPOSED SECRETS IN APPLICATIONS",
    cluster: "Scan Code",
    summary: "Prevent hardcoded API keys, private credentials, tokens, and database passwords from committing to code repositories.",
    coreCapability: "Real-Time Credential & Secret Leak Prevention",
    whatItDoes: [
      {
        title: "Pre-Commit & Push Scanning",
        description: "Intercept API keys, OAuth tokens, AWS access credentials, and SSH keys before they are pushed to remote repositories."
      },
      {
        title: "Historical Git Commit Audit",
        description: "Scan entire git commit histories to discover legacy embedded secrets and credentials."
      },
      {
        title: "Secret Active Verification",
        description: "Safely test exposed credentials to verify whether they remain active and accessible."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Regex & Entropy Analysis",
        description: "Scan code strings using high-precision regex patterns and entropy detection rules."
      },
      {
        step: "02",
        title: "Validation Check",
        description: "Verify if detected secrets are live credentials or harmless test mock strings."
      },
      {
        step: "03",
        title: "Developer Alerting",
        description: "Notify developer and security leads immediately with exact file and line references."
      },
      {
        step: "04",
        title: "Automated Revocation Dispatch",
        description: "Trigger automated key rotation playbooks via IAM connectors."
      }
    ],
    whereItFits: [
      {
        serviceName: "Cloud Resilience",
        serviceHref: "/services/managed-cloud-security",
        description: "Prevents cloud provider credentials from leaking into public Git repositories."
      },
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Enforces zero hardcoded credentials across software development lifecycles."
      }
    ]
  },

  "iac": {
    slug: "iac",
    title: "Infrastructure as Code (IaC)",
    descriptor: "INGEST IAC SECURITY FINDINGS",
    cluster: "Scan Code",
    summary: "Scan Terraform, CloudFormation, Helm, and Kubernetes manifests for misconfigurations before cloud provisioning.",
    coreCapability: "Pre-Deployment Infrastructure Security & Misconfiguration Prevention",
    whatItDoes: [
      {
        title: "IaC Misconfiguration Scanning",
        description: "Detect overly permissive IAM roles, unencrypted S3 buckets, open security groups, and exposed Kubernetes pods."
      },
      {
        title: "Policy as Code (OPA)",
        description: "Enforce custom corporate security baselines using Open Policy Agent (OPA) and Rego rules."
      },
      {
        title: "Drift Prevention",
        description: "Compare IaC template declarations against live cloud runtime state to eliminate configuration drift."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Manifest Parsing",
        description: "Parse HCL, YAML, and JSON infrastructure templates in CI/CD pipelines."
      },
      {
        step: "02",
        title: "Policy Engine Evaluation",
        description: "Evaluate IaC templates against CIS Benchmarks, NIST, and enterprise security guardrails."
      },
      {
        step: "03",
        title: "Deployment Gatekeeping",
        description: "Fail non-compliant pull requests before infrastructure is provisioned in live cloud accounts."
      },
      {
        step: "04",
        title: "Remediation Snippet Generation",
        description: "Provide exact HCL/YAML code snippets to correct security misconfigurations."
      }
    ],
    whereItFits: [
      {
        serviceName: "Cloud Resilience",
        serviceHref: "/services/managed-cloud-security",
        description: "Integrates pre-deployment IaC validation with post-deployment CSPM monitoring."
      },
      {
        serviceName: "Digital Trust",
        serviceHref: "/services/compliance-management",
        description: "Automates continuous compliance evidence collection for cloud infrastructure."
      }
    ]
  },

  "container": {
    slug: "container",
    title: "Container Security",
    descriptor: "TRACK CONTAINER IMAGE VULNERABILITIES",
    cluster: "Scan Code",
    summary: "Scan container images and base layers for vulnerabilities, malware, and root permissions before deployment to Kubernetes.",
    coreCapability: "Container Image & Registry Vulnerability Management",
    whatItDoes: [
      {
        title: "Base Image & OS Layer Scan",
        description: "Detect OS-level packages (Debian, Alpine, RHEL) and application layer dependencies with known vulnerabilities."
      },
      {
        title: "Runtime Privilege Checks",
        description: "Flag containers configured to run as root or with excessive Linux kernel capabilities."
      },
      {
        title: "Registry Monitoring",
        description: "Continuously audit Docker Hub, ECR, GCR, and ACR image registries for emerging CVE threats."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Registry Synchronization",
        description: "Connect to enterprise container registries to scan newly pushed image tags."
      },
      {
        step: "02",
        title: "Layer Deconstruction",
        description: "Unpack image filesystem layers to inventory packages, binaries, and configurations."
      },
      {
        step: "03",
        title: "CVE & Policy Audit",
        description: "Match container contents against active vulnerability intelligence feeds."
      },
      {
        step: "04",
        title: "Admission Controller Gate",
        description: "Prevent non-compliant images from executing in production Kubernetes clusters."
      }
    ],
    whereItFits: [
      {
        serviceName: "Cloud Resilience",
        serviceHref: "/services/managed-cloud-security",
        description: "Secures containerized workloads across AWS EKS, GCP GKE, and Azure AKS."
      },
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Extends application security assurance from source code to containerized runtime images."
      }
    ]
  },

  // --- TEST RUNTIME ---
  "dast": {
    slug: "dast",
    title: "DAST & AI DAST",
    descriptor: "TEST RUNTIME, PROVE EXPLOITABILITY",
    cluster: "Test Runtime",
    summary: "Test live web applications and APIs like an attacker using Proof-Based Scanning to safely demonstrate real-world exploitability.",
    coreCapability: "Dynamic Application Security Testing & Exploitation Proof",
    whatItDoes: [
      {
        title: "Proof-Based Vulnerability Scanning",
        description: "Safely execute exploit payloads to prove vulnerability presence with zero false positives."
      },
      {
        title: "AI-Driven Crawling & Authentication",
        description: "Navigate complex Single-Page Applications (SPAs), multi-factor logins, and dynamic JS workflows."
      },
      {
        title: "IAST Runtime Correlation",
        description: "Combine dynamic black-box attacks with internal server-side agent telemetry for line-of-code accuracy."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Target Crawl & Discover",
        description: "Automatically discover web endpoints, forms, parameters, and API routes."
      },
      {
        step: "02",
        title: "Dynamic Attack Execution",
        description: "Simulate real-world attacks including SQLi, XSS, SSRF, RCE, and authorization bypasses."
      },
      {
        step: "03",
        title: "Proof Generation",
        description: "Extract verifiable proof of exploitability (e.g. read database version string safely) to confirm flaws."
      },
      {
        step: "04",
        title: "Automated Ticket Routing",
        description: "Send confirmed, zero-false-positive vulnerability reports directly to engineering tools."
      }
    ],
    whereItFits: [
      {
        serviceName: "Adversarial Validation",
        serviceHref: "/services/vapt",
        description: "Automates continuous dynamic security scanning between scheduled ethical penetration tests."
      },
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Validates application security posture in staging and production runtime environments."
      }
    ]
  },

  "agentic-pentesting": {
    slug: "agentic-pentesting",
    title: "Agentic Pentesting",
    descriptor: "AUTOMATE REAL-WORLD ATTACK TECHNIQUES",
    cluster: "Test Runtime",
    summary: "Autonomous AI-driven penetration testing agents that chain multi-step attack vectors and validate complex security risks.",
    coreCapability: "AI-Powered Autonomous Penetration Testing",
    whatItDoes: [
      {
        title: "Multi-Step Attack Chaining",
        description: "Simulate sophisticated attacker behaviors by combining initial access vectors with lateral movement and privilege escalation."
      },
      {
        title: "Business Logic Flaw Testing",
        description: "Evaluate complex workflow logic, parameter tampering, and access control boundaries."
      },
      {
        title: "Human Security Lead Oversight",
        description: "Govern autonomous testing runs with expert human security leads to prevent operational disruption."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Scope & Objective Setup",
        description: "Define target boundaries, authorization tokens, and safety guardrails."
      },
      {
        step: "02",
        title: "Autonomous Agent Execution",
        description: "AI agents dynamically adapt attack strategies based on server responses and application behavior."
      },
      {
        step: "03",
        title: "Exploit Chain Proof",
        description: "Record cryptographic step-by-step evidence logs demonstrating full attack paths."
      },
      {
        step: "04",
        title: "Expert Review & Sign-Off",
        description: "Senior Entersoft security leads validate findings before releasing final penetration audit reports."
      }
    ],
    whereItFits: [
      {
        serviceName: "Adversarial Validation",
        serviceHref: "/services/vapt",
        description: "Combines human ethical hacking expertise with AI agentic testing scale."
      },
      {
        serviceName: "AI Systems Assurance",
        serviceHref: "/services/ai-ast",
        description: "Applies agentic attack methodology to test AI application integrations and API surfaces."
      }
    ]
  },

  "api-security": {
    slug: "api-security",
    title: "API Security Testing",
    descriptor: "DISCOVER AND TEST APIS",
    cluster: "Test Runtime",
    summary: "Discover shadow APIs, validate OpenAPI specifications, and test REST, GraphQL, and gRPC endpoints for OWASP API Top 10 risks.",
    coreCapability: "API Discovery, Spec Audit & Dynamic Vulnerability Testing",
    whatItDoes: [
      {
        title: "Automated API Discovery",
        description: "Discover undocumented, rogue, and zombie APIs across cloud networks and application environments."
      },
      {
        title: "BOLA & BFLA Testing",
        description: "Detect Broken Object Level Authorization (BOLA) and Broken Function Level Authorization (BFLA) vulnerabilities."
      },
      {
        title: "Schema Compliance Audit",
        description: "Compare live API request/response behavior against published Swagger/OpenAPI documentation."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Traffic & Spec Ingestion",
        description: "Ingest API gateway logs, Postman collections, and OpenAPI spec documents."
      },
      {
        step: "02",
        title: "Endpoint Inventory Mapping",
        description: "Catalog all endpoints, parameter types, authentication schemas, and rate limits."
      },
      {
        step: "03",
        title: "Targeted API Vulnerability Attacks",
        description: "Execute specialized API security tests targeting authorization, data leakage, and injection."
      },
      {
        step: "04",
        title: "Remediation Ticket Dispatch",
        description: "Route API vulnerability fixes directly to backend development teams."
      }
    ],
    whereItFits: [
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Secures backend API microservices powering mobile and web applications."
      },
      {
        serviceName: "Adversarial Validation",
        serviceHref: "/services/vapt",
        description: "Delivers deep-dive manual and automated penetration testing for enterprise APIs."
      }
    ]
  },

  "attack-surface-management": {
    slug: "attack-surface-management",
    title: "Attack Surface Management",
    descriptor: "IDENTIFY EXPOSED APPS & ENDPOINTS",
    cluster: "Test Runtime",
    summary: "Continuously map your external digital footprint to discover exposed assets, unknown subdomains, open ports, and cloud leaks.",
    coreCapability: "External Attack Surface Discovery & Exposure Intelligence",
    whatItDoes: [
      {
        title: "Continuous Perimeter Discovery",
        description: "Map unknown web applications, subdomains, cloud IPs, DNS records, and SSL certificates across your organization."
      },
      {
        title: "Shadow IT & Cloud Leak Detection",
        description: "Discover unmanaged cloud storage buckets, exposed staging environments, and legacy web portals."
      },
      {
        title: "Risk Prioritization",
        description: "Categorize discovered assets by criticality, active exposure level, and business domain ownership."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Domain & IP Seed Input",
        description: "Input corporate domain names, IP ranges, and ASN details into the discovery engine."
      },
      {
        step: "02",
        title: "OSINT & DNS Reconnaissance",
        description: "Analyze global DNS tables, TLS certificates, WHOIS, and public threat telemetry."
      },
      {
        step: "03",
        title: "Port & Fingerprint Scan",
        description: "Identify active web servers, OS versions, exposed services, and cloud providers."
      },
      {
        step: "04",
        title: "Exposure Alerting",
        description: "Notify security operations teams when new unmapped perimeter assets appear."
      }
    ],
    whereItFits: [
      {
        serviceName: "Cyber Defense Operations",
        serviceHref: "/services/siem",
        description: "Feeds external perimeter exposure intelligence directly into active SOC monitoring."
      },
      {
        serviceName: "Cloud Resilience",
        serviceHref: "/services/managed-cloud-security",
        description: "Identifies shadow cloud accounts and unmanaged internet-facing cloud resources."
      }
    ]
  },

  "cloud-appsec": {
    slug: "cloud-appsec",
    title: "Cloud AppSec",
    descriptor: "GET A SINGLE-PANE VIEW OF CLOUD APP RISK",
    cluster: "Test Runtime",
    summary: "Correlate application code vulnerabilities, container images, IAM roles, and cloud infrastructure misconfigurations in one view.",
    coreCapability: "Single-Pane Contextual Cloud Application Security",
    whatItDoes: [
      {
        title: "Cross-Layer AppSec & Cloud Graph",
        description: "Connect application source code vulnerabilities directly to cloud runtime infrastructure and IAM boundaries."
      },
      {
        title: "Multi-Cloud Security Posture",
        description: "Monitor AWS, GCP, and Azure environments alongside container and serverless application workloads."
      },
      {
        title: "Contextual Attack Path Analysis",
        description: "Highlight cloud attack paths traversing from internet endpoints down to sensitive backend databases."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Cloud Telemetry Ingestion",
        description: "Connect cloud provider APIs, container registries, and application security tools."
      },
      {
        step: "02",
        title: "Relational Mapping Engine",
        description: "Build relational dependency graphs linking code repositories, containers, EC2/GKE instances, and IAM roles."
      },
      {
        step: "03",
        title: "Attack Path Evaluation",
        description: "Simulate adversary movement across cloud network boundaries and application vulnerabilities."
      },
      {
        step: "04",
        title: "Unified Posture Rendering",
        description: "Present unified risk scores and remediation priorities to CISOs and cloud security teams."
      }
    ],
    whereItFits: [
      {
        serviceName: "Cloud Resilience",
        serviceHref: "/services/managed-cloud-security",
        description: "Powers continuous cloud security posture management and cloud workload protection."
      },
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Ensures cloud-native applications maintain security across code, build, and deployment runtime."
      }
    ]
  },

  "ai-appsec": {
    slug: "ai-appsec",
    title: "AI AppSec",
    descriptor: "SCAN SMARTER, ACCELERATE REMEDIATION",
    cluster: "Test Runtime",
    summary: "AI-powered vulnerability correlation, automated fix suggestion, and security testing tailored for LLMs and AI applications.",
    coreCapability: "AI-Driven Security Automation & LLM System Defense",
    whatItDoes: [
      {
        title: "AI-Guided Code Fix Generation",
        description: "Provide developers with context-aware, copy-pasteable code fixes tailored to their exact framework and codebase."
      },
      {
        title: "LLM & GenAI Security Audit",
        description: "Test AI applications for OWASP Top 10 LLM risks including prompt injection, model poisoning, and insecure output handling."
      },
      {
        title: "Intelligent Alert Triage",
        description: "Use machine learning to group related vulnerability findings and suppress noise."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Telemetry & Model Ingestion",
        description: "Ingest vulnerability scan outputs, LLM prompt pipelines, and application code snippets."
      },
      {
        step: "02",
        title: "AI Analysis & Fix Synthesis",
        description: "Generate customized code patches and remediation playbooks using expert security models."
      },
      {
        step: "03",
        title: "Human Governance Check",
        description: "Ensure AI-suggested code fixes pass automated lint and build verification before PR creation."
      },
      {
        step: "04",
        title: "Automated Ticket Enrichment",
        description: "Enrich Jira and GitHub tickets with step-by-step remediation instructions."
      }
    ],
    whereItFits: [
      {
        serviceName: "AI Systems Assurance",
        serviceHref: "/services/ai-ast",
        description: "Delivers comprehensive security auditing for enterprise AI applications and LLM models."
      },
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Accelerates vulnerability remediation velocity with AI developer assist capabilities."
      }
    ]
  },

  // --- MANAGE VULNERABILITIES ---
  "aspm": {
    slug: "aspm",
    title: "Vulnerability Management (ASPM)",
    descriptor: "CENTRALIZE AND CORRELATE APPSEC FINDINGS",
    cluster: "Manage Vulnerabilities",
    summary: "Centralize, correlate, and prioritize security findings from SAST, DAST, SCA, secrets, container, and cloud tools into a single platform.",
    coreCapability: "Application Security Posture Management (ASPM)",
    whatItDoes: [
      {
        title: "Unified Vulnerability Inventory",
        description: "Aggregate findings across third-party scanners, internal AST tools, and manual penetration testing audits."
      },
      {
        title: "Deduplication & Correlation",
        description: "Correlate redundant alerts from multiple tools into single actionable vulnerability records."
      },
      {
        title: "Contextual Risk Scoring",
        description: "Score vulnerabilities based on asset business criticality, internet exposure, and active threat intel."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Multi-Tool Telemetry API",
        description: "Connect AppSec, cloud, container, and pentest tools via unified API connectors."
      },
      {
        step: "02",
        title: "Normalization & Deduplication",
        description: "Normalize finding schemas into standard vulnerability entities and merge duplicate tool outputs."
      },
      {
        step: "03",
        title: "Business Impact Weighting",
        description: "Calculate composite risk priority scores factoring in reachability and regulatory impact."
      },
      {
        step: "04",
        title: "Engineering Workflow Dispatch",
        description: "Assign prioritized remediation tasks to responsible developer teams with tracked SLAs."
      }
    ],
    whereItFits: [
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Serves as the central management plane for enterprise application security operations."
      },
      {
        serviceName: "Digital Trust",
        serviceHref: "/services/compliance-management",
        description: "Tracks SLA compliance and vulnerability remediation performance for executive reporting."
      }
    ]
  },

  "compliance-reporting": {
    slug: "compliance-reporting",
    title: "Compliance & Executive Reporting",
    descriptor: "MEASURE RISK AND IMPACT",
    cluster: "Manage Vulnerabilities",
    summary: "Generate continuous compliance reporting, track AppSec KPIs, and provide CISO dashboards for ISO 27001, SOC 2, and PCI-DSS.",
    coreCapability: "Executive Security Metrics & Regulatory Compliance Reporting",
    whatItDoes: [
      {
        title: "Executive & Board Dashboards",
        description: "Visualize mean time to detect (MTTD), mean time to remediate (MTTR), vulnerability trends, and risk reduction SLAs."
      },
      {
        title: "Regulatory Framework Mapping",
        description: "Map security posture data automatically to SOC 2 Type II, ISO 27001, PCI-DSS 4.0, HIPAA, and RBI guidelines."
      },
      {
        title: "One-Click Auditor Proof Exports",
        description: "Export signed compliance packages with complete technical evidence and vulnerability fix verification."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Control Telemetry Mapping",
        description: "Link GRC controls directly to live scanner outputs, cloud configurations, and Jira remediation tickets."
      },
      {
        step: "02",
        title: "Continuous SLA Calculation",
        description: "Track remediation timeline performance against defined compliance SLA windows."
      },
      {
        step: "03",
        title: "Role-Tailored Report Generation",
        description: "Generate high-level executive summaries for boards and granular audit logs for security assessors."
      },
      {
        step: "04",
        title: "Cryptographic Proof Packaging",
        description: "Export signed audit proof packages ready for external certification bodies."
      }
    ],
    whereItFits: [
      {
        serviceName: "Digital Trust",
        serviceHref: "/services/compliance-management",
        description: "Powers continuous regulatory readiness and automated compliance evidence harvesting."
      },
      {
        serviceName: "Cyber Defense Operations",
        serviceHref: "/services/siem",
        description: "Provides SOC metric reporting and SLA tracking for incident response handling."
      }
    ]
  },

  "threat-intelligence": {
    slug: "threat-intelligence",
    title: "Threat Intelligence",
    descriptor: "REACHABILITY, EXPLOITABILITY, AND BUSINESS LOGIC",
    cluster: "Manage Vulnerabilities",
    summary: "Enrich vulnerability findings with live CISA KEV feeds, EPSS scores, dark web exploit availability, and real-world threat context.",
    coreCapability: "Threat Intel Enrichment & Exploitation Risk Context",
    whatItDoes: [
      {
        title: "Live EPSS & CISA KEV Correlation",
        description: "Overlay Exploit Prediction Scoring System (EPSS) data and CISA Known Exploited Vulnerabilities catalog."
      },
      {
        title: "Dark Web & Exploit Payload Tracking",
        description: "Monitor underground forums and repositories for active weaponized exploit availability targeting your stack."
      },
      {
        title: "Dynamic Risk Re-Prioritization",
        description: "Automatically elevate vulnerability priority when a flaw is actively weaponized in the wild."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Threat Feed Ingestion",
        description: "Continuously stream global threat intelligence, CISA KEV updates, and exploit database changes."
      },
      {
        step: "02",
        title: "Internal Asset Cross-Reference",
        description: "Cross-reference active threat indicators against your software inventory and perimeter assets."
      },
      {
        step: "03",
        title: "Contextual Risk Escalation",
        description: "Escalate ticket severity and notify SOC leads if an asset vulnerability becomes actively targeted."
      },
      {
        step: "04",
        title: "Targeted Mitigation Guidance",
        description: "Deliver virtual patching and WAF block rules to mitigate active threats before code patches deploy."
      }
    ],
    whereItFits: [
      {
        serviceName: "Cyber Defense Operations",
        serviceHref: "/services/siem",
        description: "Enriches SOC alert triage with global threat intelligence feeds."
      },
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Ensures developers prioritize vulnerabilities actively targeted by real-world threat actors."
      }
    ]
  },

  // --- LEGACY ALIASES ---
  "cyber-ontology": {
    slug: "sast",
    title: "Static Application Security Testing (SAST)",
    descriptor: "EARLY STATIC SECURITY ANALYSIS",
    cluster: "Scan Code",
    summary: "Catch vulnerabilities early in source code before runtime with deep, multi-language static analysis and zero noise correlation.",
    coreCapability: "Pre-commit & CI/CD Static Code Security Analysis",
    whatItDoes: [],
    howItWorks: [],
    whereItFits: []
  },
  "data-fusion": {
    slug: "sca",
    title: "Open Source (SCA)",
    descriptor: "FIND VULNERABLE DEPENDENCIES",
    cluster: "Scan Code",
    summary: "Identify vulnerable third-party libraries, transitive dependencies, and licensing risks across your software supply chain.",
    coreCapability: "Software Composition Analysis & Supply Chain Defense",
    whatItDoes: [],
    howItWorks: [],
    whereItFits: []
  },
  "exposure-decisioning": {
    slug: "aspm",
    title: "Vulnerability Management (ASPM)",
    descriptor: "CENTRALIZE AND CORRELATE APPSEC FINDINGS",
    cluster: "Manage Vulnerabilities",
    summary: "Centralize, correlate, and prioritize security findings into a single platform.",
    coreCapability: "Application Security Posture Management (ASPM)",
    whatItDoes: [],
    howItWorks: [],
    whereItFits: []
  },
  "threat-operations": {
    slug: "threat-intelligence",
    title: "Threat Intelligence",
    descriptor: "REACHABILITY, EXPLOITABILITY, AND BUSINESS LOGIC",
    cluster: "Manage Vulnerabilities",
    summary: "Enrich vulnerability findings with live threat context.",
    coreCapability: "Threat Intel Enrichment",
    whatItDoes: [],
    howItWorks: [],
    whereItFits: []
  },
  "expert-governed-ai": {
    slug: "ai-appsec",
    title: "AI AppSec",
    descriptor: "SCAN SMARTER, ACCELERATE REMEDIATION",
    cluster: "Test Runtime",
    summary: "AI-powered vulnerability correlation and security testing.",
    coreCapability: "AI-Driven Security Automation",
    whatItDoes: [],
    howItWorks: [],
    whereItFits: []
  },
  "closed-loop-remediation": {
    slug: "dast",
    title: "DAST & AI DAST",
    descriptor: "TEST RUNTIME, PROVE EXPLOITABILITY",
    cluster: "Test Runtime",
    summary: "Test live web applications and APIs like an attacker.",
    coreCapability: "Dynamic Application Security Testing",
    whatItDoes: [],
    howItWorks: [],
    whereItFits: []
  },
  "continuous-assurance": {
    slug: "compliance-reporting",
    title: "Compliance & Executive Reporting",
    descriptor: "MEASURE RISK AND IMPACT",
    cluster: "Manage Vulnerabilities",
    summary: "Generate continuous compliance reporting and track AppSec KPIs.",
    coreCapability: "Executive Security Metrics & Compliance Reporting",
    whatItDoes: [],
    howItWorks: [],
    whereItFits: []
  },
  "command-view": {
    slug: "cloud-appsec",
    title: "Cloud AppSec",
    descriptor: "GET A SINGLE-PANE VIEW OF CLOUD APP RISK",
    cluster: "Test Runtime",
    summary: "Single-pane view of cloud application security risk.",
    coreCapability: "Single-Pane Cloud AppSec",
    whatItDoes: [],
    howItWorks: [],
    whereItFits: []
  }
};
