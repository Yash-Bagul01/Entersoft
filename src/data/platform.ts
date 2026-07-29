export interface PlatformPillar {
  slug: string;
  title: string;
  descriptor: string;
  cluster: "Discover & Model" | "Prioritize & Respond" | "Govern & Assure";
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
  "cyber-ontology": {
    slug: "cyber-ontology",
    title: "Cyber Ontology",
    descriptor: "UNIFIED SECURITY CONTEXT",
    cluster: "Discover & Model",
    summary: "Model applications, APIs, code, cloud, identities, controls, exposures and business services as one connected security system.",
    coreCapability: "Shared operational model of enterprise cyber risk",
    whatItDoes: [
      {
        title: "Enterprise Graph Modeling",
        description: "Continuously map relational dependencies across your codebase, cloud assets, IAM roles, and business processes into a single unified security graph."
      },
      {
        title: "Context-Aware Risk Abstraction",
        description: "Transform isolated scanner alerts into rich contextual entities linked to actual asset criticalities and business services."
      },
      {
        title: "Dynamic Schema Integration",
        description: "Ingest and normalize disparate asset schemas across multi-cloud environments, container orchestrations, and API endpoints."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Asset Telemetry Ingestion",
        description: "Collect asset metadata and relational configurations from repositories, cloud providers, and identity providers."
      },
      {
        step: "02",
        title: "Graph Correlation Mapping",
        description: "Map cross-domain dependencies into a high-performance graph engine to establish true asset context."
      },
      {
        step: "03",
        title: "Boundary & Ownership Analysis",
        description: "Automatically compute operational ownership, reachability parameters, and business impact boundaries."
      },
      {
        step: "04",
        title: "Unified Query Exposure",
        description: "Expose graph query endpoints for automated exposure decisioning, threat ops, and executive command views."
      }
    ],
    whereItFits: [
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Connects code-level AST findings directly with cloud runtime infrastructure and production identity controls."
      },
      {
        serviceName: "Cloud Resilience",
        serviceHref: "/services/managed-cloud-security",
        description: "Provides the underlying asset map needed to contextualize multi-cloud CSPM and posture misconfigurations."
      }
    ]
  },
  "data-fusion": {
    slug: "data-fusion",
    title: "Security Data Fusion",
    descriptor: "CONNECT THE STACK",
    cluster: "Discover & Model",
    summary: "Unify signals from AppSec, IAM, cloud, EDR, SIEM, threat intelligence, GRC and engineering systems.",
    coreCapability: "Integration across security tools and teams",
    whatItDoes: [
      {
        title: "Cross-Stack Signal Normalization",
        description: "Aggregate high-volume telemetry from static scanners, runtime EDRs, SIEM feeds, and CI/CD pipelines into a single normalized data stream."
      },
      {
        title: "Deduplication & Noise Reduction",
        description: "Eliminate redundant findings across overlapping security tools to focus on real security signals."
      },
      {
        title: "Enriched Threat Intelligence",
        description: "Correlate internal vulnerability data with live threat intelligence feeds and real-world exploit availability."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "API Stack Integration",
        description: "Connect directly to AppSec tools, EDR platforms, cloud consoles, SIEM, and GRC systems via secure connectors."
      },
      {
        step: "02",
        title: "Schema Normalization",
        description: "Translate disparate tool outputs into standardized security event schemas for uniform correlation."
      },
      {
        step: "03",
        title: "Threat Intel Enrichment",
        description: "Overlay active CISA KEV, EPSS, and proprietary threat intelligence signals onto normalized alerts."
      },
      {
        step: "04",
        title: "Stream Dispatch",
        description: "Stream clean, deduplicated security events to prioritization engines and threat operation dashboards."
      }
    ],
    whereItFits: [
      {
        serviceName: "Cyber Defense Operations",
        serviceHref: "/services/siem",
        description: "Feeds enriched, multi-source security events into active SOC monitoring and incident detection pipelines."
      },
      {
        serviceName: "Adversarial Validation",
        serviceHref: "/services/vapt",
        description: "Ingests penetration audit findings and correlates them against existing automated scanner outputs."
      }
    ]
  },
  "exposure-decisioning": {
    slug: "exposure-decisioning",
    title: "Exposure Decisioning",
    descriptor: "PRIORITIZE WHAT MATTERS",
    cluster: "Prioritize & Respond",
    summary: "Prioritize and simulate risk using exploitability, reachability, attack paths, control strength and business impact—not severity scores alone.",
    coreCapability: "Contextual exposure management and attack-path intelligence",
    whatItDoes: [
      {
        title: "Reachability & Exploitability Analysis",
        description: "Determine whether a vulnerable code dependency or open port is actually exposed to internet attack vectors."
      },
      {
        title: "Attack Path Simulation",
        description: "Graph all potential lateral movement vectors from perimeter vulnerabilities to core sensitive databases and business logic."
      },
      {
        title: "Contextual SLA Scoring",
        description: "Dynamically prioritize remediation timelines based on business criticality, compensating controls, and live threat activity."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Reachability Evaluation",
        description: "Analyze runtime network boundaries and call graphs to verify if vulnerable components are reachable."
      },
      {
        step: "02",
        title: "Attack Path Graphing",
        description: "Simulate multi-stage adversary tactics traversing code, IAM permissions, and cloud network paths."
      },
      {
        step: "03",
        title: "Dynamic Risk Scoring",
        description: "Calculate composite exposure scores incorporating CVSS, reachability, business asset value, and threat intel."
      },
      {
        step: "04",
        title: "Remediation Ticket Generation",
        description: "Generate prioritized remediation directives specifying exact patch targets with highest risk reduction value."
      }
    ],
    whereItFits: [
      {
        serviceName: "Adversarial Validation",
        serviceHref: "/services/vapt",
        description: "Empowers human penetration testers with algorithmic reachability data and verified attack paths."
      },
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Ensures developers fix reachability-verified vulnerabilities first, cutting noise by up to 70%."
      }
    ]
  },
  "threat-operations": {
    slug: "threat-operations",
    title: "Threat Operations",
    descriptor: "DETECT TO RESPOND",
    cluster: "Prioritize & Respond",
    summary: "Connect active threats with exposed assets, identities and applications to accelerate investigation, containment and response.",
    coreCapability: "SOC, MDR and incident operations",
    whatItDoes: [
      {
        title: "Unified Incident Response",
        description: "Bridge the gap between SOC telemetry and application code context for rapid containment."
      },
      {
        title: "Automated Triage & Correlation",
        description: "Automatically correlate SIEM/EDR alerts with known software vulnerabilities and cloud misconfigurations."
      },
      {
        title: "Playbook-Driven Containment",
        description: "Trigger automated isolation rules, credential revokations, or WAF blocklists during active threat events."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Real-Time Telemetry Stream",
        description: "Continuous monitoring of security events across SIEM, cloud audit logs, EDR, and API gateways."
      },
      {
        step: "02",
        title: "Contextual Alert Enrichment",
        description: "Overlay asset ownership, code dependencies, and exposure profiles onto incoming threat alerts."
      },
      {
        step: "03",
        title: "Incident Triage & Investigation",
        description: "Provide SOC analysts with unified incident timelines linking attack vectors to specific code assets."
      },
      {
        step: "04",
        title: "Governed Response Execution",
        description: "Execute expert-governed containment playbooks to isolate compromised nodes and stop active exploits."
      }
    ],
    whereItFits: [
      {
        serviceName: "Cyber Defense Operations",
        serviceHref: "/services/siem",
        description: "Powers 24/7 SOC telemetry monitoring, MDR detection capabilities, and rapid incident handling workflows."
      },
      {
        serviceName: "Cloud Resilience",
        serviceHref: "/services/managed-cloud-security",
        description: "Detects runtime cloud threats and provides immediate containment against compromised IAM roles."
      }
    ]
  },
  "expert-governed-ai": {
    slug: "expert-governed-ai",
    title: "Expert-Governed AI",
    descriptor: "14 YEARS OF JUDGMENT",
    cluster: "Govern & Assure",
    summary: "AI accelerates correlation, investigation and recommendations. Senior experts govern high-impact decisions, actions and closure.",
    coreCapability: "AI with human accountability",
    whatItDoes: [
      {
        title: "AI-Accelerated Analysis",
        description: "Use specialized machine learning models to analyze complex vulnerability traces, log anomalies, and policy gaps in seconds."
      },
      {
        title: "Human-in-the-Loop Governance",
        description: "Require explicit approval from senior security engineers before executing high-impact containment or code changes."
      },
      {
        title: "Institutional Knowledge Retention",
        description: "Train decision assist models on 14+ years of real-world penetration testing and incident response data."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "AI Synthesis & Proposal",
        description: "Specialized models analyze telemetry patterns and propose high-confidence containment or remediation steps."
      },
      {
        step: "02",
        title: "Human Expert Validation",
        description: "Veteran security leads review proposed actions against business context and operational risk."
      },
      {
        step: "03",
        title: "Governed Execution",
        description: "Approved actions are dispatched deterministically with complete cryptographic audit logging."
      },
      {
        step: "04",
        title: "Continuous Reinforcement",
        description: "Feedback loops refine future AI recommendations using real-world decision outcomes."
      }
    ],
    whereItFits: [
      {
        serviceName: "AI Systems Assurance",
        serviceHref: "/services/ai-ast",
        description: "Applies rigorous guardrails and validation frameworks to LLM integrations and enterprise AI deployments."
      },
      {
        serviceName: "Adversarial Validation",
        serviceHref: "/services/vapt",
        description: "Combines human ethical hackers with AI-assisted exploit verification to maximize audit depth."
      }
    ]
  },
  "closed-loop-remediation": {
    slug: "closed-loop-remediation",
    title: "Closed-Loop Remediation",
    descriptor: "DECISION TO ACTION",
    cluster: "Govern & Assure",
    summary: "Push actions into engineering and security workflows, verify fixes and write validated outcomes back to the risk record.",
    coreCapability: "Workflow automation and verified remediation",
    whatItDoes: [
      {
        title: "Native Developer Workflow Integration",
        description: "Deliver precise remediation guidance directly into Jira, GitHub, GitLab, and developer tools."
      },
      {
        title: "Automated Verification Testing",
        description: "Trigger automated verification scans immediately when a code pull request or fix is committed."
      },
      {
        title: "Audited Risk State Closure",
        description: "Mark vulnerabilities as resolved only after re-testing confirms complete elimination of risk."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Direct Ticket Dispatch",
        description: "Automatically create actionable engineering tickets with code snippet fixes and repository paths."
      },
      {
        step: "02",
        title: "Sprint & PR Tracking",
        description: "Monitor developer pull requests and code commits tied to open security remediation tickets."
      },
      {
        step: "03",
        title: "Automated Re-Testing",
        description: "Trigger targeted verification tests upon code merge to confirm flaw resolution."
      },
      {
        step: "04",
        title: "Risk Register Reconciliation",
        description: "Update the central risk register with verified fix evidence and close out compliance tickets."
      }
    ],
    whereItFits: [
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Ensures security vulnerabilities identified in CI/CD pipelines are tracked through to verified code fix."
      },
      {
        serviceName: "Digital Trust",
        serviceHref: "/services/compliance-management",
        description: "Provides auditors with cryptographic proof of timely vulnerability closure within mandated SLA windows."
      }
    ]
  },
  "continuous-assurance": {
    slug: "continuous-assurance",
    title: "Continuous Assurance",
    descriptor: "TRUST & EVIDENCE",
    cluster: "Govern & Assure",
    summary: "Map controls to live technical evidence, detect drift and maintain audit-ready proof across applications, cloud, identity and operations.",
    coreCapability: "GRC, control validation and evidence",
    whatItDoes: [
      {
        title: "Live Evidence Collection",
        description: "Automatically harvest configuration proofs, scan reports, and access logs against ISO 27001, SOC 2, and RBI standards."
      },
      {
        title: "Real-Time Control Drift Detection",
        description: "Receive instant alerts when cloud configurations or access controls drift from approved baseline policies."
      },
      {
        title: "Audit-Ready Compliance Dashboards",
        description: "Generate instant auditor proof packages with zero manual spreadsheet compilation."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Framework Mapping",
        description: "Map security controls directly to underlying cloud APIs, code policies, and operational logs."
      },
      {
        step: "02",
        title: "Automated Telemetry Harvesting",
        description: "Continuously collect technical evidence without manual sample requests or spreadsheet audits."
      },
      {
        step: "03",
        title: "Policy Drift Detection",
        description: "Identify configuration changes that violate compliance requirements in real time."
      },
      {
        step: "04",
        title: "Proof Package Export",
        description: "Generate cryptographically signed compliance packages ready for empanelled auditors."
      }
    ],
    whereItFits: [
      {
        serviceName: "Digital Trust",
        serviceHref: "/services/compliance-management",
        description: "Powers continuous readiness for ISO 27001, SOC 2, HIPAA, and regulatory compliance audits."
      },
      {
        serviceName: "Protocol Assurance",
        serviceHref: "/services/smart-contract-audits",
        description: "Maintains continuous security verification for smart contracts and decentralized protocol upgrades."
      }
    ]
  },
  "command-view": {
    slug: "command-view",
    title: "Unified Command View",
    descriptor: "ONE OPERATING PICTURE",
    cluster: "Govern & Assure",
    summary: "Give CISOs, operators and engineering leaders role-based views of exposure, incidents, controls, remediation and business impact.",
    coreCapability: "Executive and operational visibility",
    whatItDoes: [
      {
        title: "Role-Tailored Dashboards",
        description: "Tailor executive risk metrics for CISOs while giving granular code and log views to engineers and SOC analysts."
      },
      {
        title: "Cross-Domain Risk Visibility",
        description: "Synthesize application security posture, cloud compliance, threat activity, and SLA performance into one view."
      },
      {
        title: "Actionable Executive Metrics",
        description: "Track mean time to detect (MTTD), mean time to remediate (MTTR), and overall exposure trends over time."
      }
    ],
    howItWorks: [
      {
        step: "01",
        title: "Centralized Data Pipeline",
        description: "Aggregate operational risk metrics, compliance status, and active threats into a single analytics layer."
      },
      {
        step: "02",
        title: "Role-Based Lens Application",
        description: "Render customized interface layers optimized for CISOs, security engineers, and DevOps leads."
      },
      {
        step: "03",
        title: "KPI & Exposure Rendering",
        description: "Display real-time security posture indicators, attack path maps, and compliance readiness scores."
      },
      {
        step: "04",
        title: "Drill-Down Investigation",
        description: "Enable seamless transition from high-level executive KPIs directly to specific code lines and assets."
      }
    ],
    whereItFits: [
      {
        serviceName: "Application Assurance",
        serviceHref: "/services/appsec",
        description: "Provides engineering leaders with full visibility into application security SLAs and pipeline health."
      },
      {
        serviceName: "Cyber Defense Operations",
        serviceHref: "/services/siem",
        description: "Gives CISOs an active operational picture of live threat incidents and SOC resolution velocity."
      }
    ]
  }
};
