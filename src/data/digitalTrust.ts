export interface DigitalTrustPillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  outcomes: string[];
  supportedStandards: string[];
}

export interface DigitalTrustFramework {
  id: string;
  name: string;
  category: 'Global Standards' | 'Privacy & Sovereignty' | 'Financial & Banking' | 'Healthcare & Critical';
  mandate: string;
  enterSoftApproach: string;
  deliverables: string[];
}

export interface DigitalTrustStage {
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  keyDeliverable: string;
  focus: string;
}

export interface DigitalTrustProblemPoint {
  index: string;
  title: string;
  desc: string;
  impact: string;
}

export interface DigitalTrustDataset {
  hero: {
    eyebrow: string;
    headline: string;
    subline: string;
    badge: string;
  };
  thesis: {
    eyebrow: string;
    headline: string;
    subline: string;
    problemPoints: DigitalTrustProblemPoint[];
    solutionStatement: string;
  };
  pillars: DigitalTrustPillar[];
  operatingModel: {
    eyebrow: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    roles: {
      step: string;
      role: string;
      badge: string;
      description: string;
      activities: string[];
    }[];
  };
  frameworks: DigitalTrustFramework[];
  continuousVsPointInTime: {
    eyebrow: string;
    headline: string;
    description: string;
    traditionalSteps: { step: string; text: string; state: 'stale' | 'friction' }[];
    continuousSteps: { step: string; text: string; state: 'active' | 'assurance' }[];
  };
  roadmap: {
    eyebrow: string;
    headline: string;
    disclaimer: string;
    stages: DigitalTrustStage[];
  };
  proof: {
    eyebrow: string;
    headline: string;
    caseStudy: {
      badge: string;
      title: string;
      sector: string;
      outcome: string;
      summary: string;
      metric: string;
    };
    qualitativePillars: {
      title: string;
      subtitle: string;
      description: string;
    }[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  cta: {
    headline: string;
    subline: string;
    buttonText: string;
    buttonHref: string;
    guaranteeBadges: string[];
  };
}

export const digitalTrustData: DigitalTrustDataset = {
  hero: {
    eyebrow: 'DIGITAL TRUST · CYBER RISK & REGULATORY ASSURANCE',
    headline: 'Transform Regulatory Compliance into Board-Level Trust',
    subline:
      'Entersoft helps organizations establish, validate and continuously evidence security, privacy and regulatory controls across cloud, applications, infrastructure, third parties and operational environments.',
    badge: 'ISO 27001 · SOC 2 · GDPR · RBI · CERT-In',
  },
  thesis: {
    eyebrow: 'EXECUTIVE THESIS',
    headline: 'The Audit is Periodic. The Risk is Continuous.',
    subline:
      'Traditional point-in-time audits create an illusion of security while operational control drift leaves enterprise assets exposed to regulatory penalties and breach vectors.',
    problemPoints: [
      {
        index: '01',
        title: 'Fragmented Spreadsheets & Control Silos',
        desc: 'Security operations, cloud engineering, and legal compliance teams maintain disconnected spreadsheets, creating massive blind spots and redundant manual audits.',
        impact: 'High audit fatigue and unquantified risk exposure',
      },
      {
        index: '02',
        title: 'The Annual Audit Trap & Control Drift',
        desc: 'Point-in-time audits capture only a momentary snapshot. Days after certification, IAM policies, cloud security groups, and microservices drift out of compliance.',
        impact: 'Persistent operational non-compliance between audits',
      },
      {
        index: '03',
        title: 'Multi-Jurisdictional & Vendor Exposure',
        desc: 'Global businesses face overlapping, conflicting mandates (ISO 27001, SOC 2, GDPR, RBI, CERT-In) combined with unmonitored third-party vendor supply chain risks.',
        impact: 'Mounting regulatory fines and sub-processor breach vectors',
      },
    ],
    solutionStatement:
      'Entersoft re-engineers compliance from a reactive checklist into a continuous Digital Trust operating model that protects revenue, satisfies board governance, and ensures permanent audit readiness.',
  },
  pillars: [
    {
      id: 'certification-support',
      index: '01',
      title: 'Regulatory & Framework Certification Support',
      subtitle: 'END-TO-END AUDIT READINESS & REGISTRAR ADVOCACY',
      description:
        'Turnkey readiness consulting, comprehensive gap discovery, ISMS engineering, and technical liaison for global security frameworks. We prepare your systems for zero-friction external certification.',
      outcomes: [
        'Defensible ISMS & Security Architecture Design',
        'Pre-Audit Internal Dry Runs & Gap Remediation',
        'Direct Technical Advocacy During External Audits',
        'Structured Registrar Coordination & Evidence Defense',
      ],
      supportedStandards: ['ISO/IEC 27001:2022', 'SOC 2 Type II (TSC)', 'PCI-DSS 4.0', 'HIPAA Security Rule'],
    },
    {
      id: 'privacy-sovereignty',
      index: '02',
      title: 'Data Privacy & Jurisdictional Sovereignty',
      subtitle: 'DATA PRIVACY CONTROLS & RESIDENCY BOUNDARIES',
      description:
        'Architect robust data governance to comply with cross-border privacy mandates. We audit sensitive PII flows, enforce localized cloud hosting boundaries, and validate cryptographic key custody.',
      outcomes: [
        'Automated PII Data Mapping & Classification',
        'Cross-Border Residency & Sovereign Boundary Enforcement',
        'Encryption-in-Transit & HSM Custody Verification',
        'Auditable Consent & Data Subject Rights (DSAR) Workflows',
      ],
      supportedStandards: ['EU GDPR', 'India DPDP Act 2023', 'CCPA / CPRA', 'Cross-Border Data Transfer Baselines'],
    },
    {
      id: 'continuous-telemetry',
      index: '03',
      title: 'Continuous Compliance & Evidence Telemetry',
      subtitle: 'REAL-TIME POSTURE MONITORING & DRIFT DETECTION',
      description:
        'Transition from point-in-time checks to continuous automated control validation. We connect into your cloud environments, identity providers, and release pipelines to flag posture drift before auditors arrive.',
      outcomes: [
        'Read-Only Automated Evidence Collection Pipelines',
        'Real-Time Cloud & IAM Configuration Drift Alerting',
        'Continuous Control Telemetry Dashboard for C-Suite & SecOps',
        'Permanent Eradication of Pre-Audit Evidence Panic',
      ],
      supportedStandards: ['CIS Cloud Foundations', 'Continuous SOC 2 Telemetry', 'NIST CSF 2.0', 'ISO Annex A Controls'],
    },
    {
      id: 'tprm-vendor-risk',
      index: '04',
      title: 'Third-Party & Vendor Risk Management (TPRM)',
      subtitle: 'SUPPLY CHAIN SECURITY & SUB-PROCESSOR GOVERNANCE',
      description:
        'Quantify, evaluate, and monitor the security posture of third-party vendors, SaaS applications, and software dependencies. We establish structured vendor tiering and ongoing risk tracking.',
      outcomes: [
        'Comprehensive Vendor Risk Tiering & Attack Surface Profiling',
        'Software Supply Chain & Sub-Processor Exposure Audits',
        'Standardized Security Questionnaire Automation & Review',
        'Continuous Vendor Vulnerability & Breach Signal Tracking',
      ],
      supportedStandards: ['ISO 27001 Clause 5.19–5.23', 'SOC 2 Vendor Oversight', 'NIST SP 800-161'],
    },
  ],
  operatingModel: {
    eyebrow: 'DELIVERY METHODOLOGY',
    title: 'Tripartite Delivery Operating Model',
    subtitle: 'How Entersoft Delivers Measurable Digital Trust Across Your Enterprise',
    disclaimer:
      'Entersoft serves as an independent advisory, readiness, and technical evidence consulting partner. Official ISO and SOC certifications are issued by licensed, accredited external registrars with Entersoft providing end-to-end technical advocacy.',
    roles: [
      {
        step: '01',
        role: 'Strategic Advisory & Consulting Partner',
        badge: 'EXPERT GRC ADVISORY',
        description:
          'Entersoft senior GRC architects partner with your executive leadership, engineering, privacy, and compliance teams to define scope boundaries, conduct exhaustive gap diagnostics, and engineer defensible control policies.',
        activities: [
          'Scoping boundary definition & risk assessment',
          'Custom policy drafting & ISMS manual engineering',
          'Control implementation guidance for engineering teams',
          'Board-level compliance roadmap & milestone governance',
        ],
      },
      {
        step: '02',
        role: 'Continuous Platform & Evidence Integration',
        badge: 'AUTOMATED TELEMETRY',
        description:
          'We deploy secure, read-only connectors across your AWS, Azure, GCP, identity providers, and CI/CD pipelines to automate evidence harvesting, monitor live configuration state, and flag control drift in real time.',
        activities: [
          'Read-only IAM & API cloud telemetry connectors',
          'Continuous evidence aggregation into immutable audit vaults',
          'Automated alerting on security group and IAM drift',
          'Continuous control status mapping across target frameworks',
        ],
      },
      {
        step: '03',
        role: 'External Registrar & Auditor Liaison',
        badge: 'AUDIT ADVOCACY',
        description:
          'During formal external certification audits, Entersoft acts as your technical advocate. We coordinate directly with independent accredited auditing bodies, presenting verified technical proofs to ensure smooth certification.',
        activities: [
          'Pre-audit dry runs and simulated auditor walkthroughs',
          'Direct technical representation during external registrar sessions',
          'Evidence packet curation and artifact verification',
          'Post-audit corrective action planning and liaison support',
        ],
      },
    ],
  },
  frameworks: [
    {
      id: 'iso27001',
      name: 'ISO/IEC 27001:2022',
      category: 'Global Standards',
      mandate: 'International standard for Information Security Management Systems (ISMS).',
      enterSoftApproach:
        'We engineer a tailored ISMS, map 93 Annex A controls directly to your technical infrastructure, draft operational policies, and guide you through Stage 1 & Stage 2 certification audits.',
      deliverables: ['Audit-Ready ISMS Manual', 'Statement of Applicability (SoA)', 'Risk Treatment Plan', 'Internal Audit Report'],
    },
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      category: 'Global Standards',
      mandate: 'AICPA standard validating Security, Availability, Processing Integrity, Confidentiality, and Privacy over a multi-month period.',
      enterSoftApproach:
        'We define your Trust Services Criteria (TSC) scope, establish continuous evidence collection across cloud and CI/CD stacks, conduct readiness dry runs, and coordinate directly with licensed CPA firms.',
      deliverables: ['System Description Narrative', 'Trust Services Criteria Matrix', 'Automated Evidence Repository', 'Readiness Assessment Report'],
    },
    {
      id: 'pci',
      name: 'PCI-DSS 4.0',
      category: 'Global Standards',
      mandate: 'Payment Card Industry Data Security Standard protecting cardholder data environments (CDE).',
      enterSoftApproach:
        'We validate CDE network micro-segmentation, conduct required external/internal penetration testing, review tokenization vaults, and prepare the Report on Compliance (RoC) or SAQ documentation.',
      deliverables: ['CDE Scope & Segmentation Validation', 'Technical Gap Assessment', 'Quarterly ASV Scan Coordination', 'RoC / SAQ Preparation Packet'],
    },
    {
      id: 'gdpr',
      name: 'EU GDPR & India DPDP Act',
      category: 'Privacy & Sovereignty',
      mandate: 'Comprehensive global data privacy regulations governing personal data processing, residency, and subject rights.',
      enterSoftApproach:
        'We conduct Data Protection Impact Assessments (DPIA), map sensitive PII ingestion and storage across multi-cloud regions, establish consent management workflows, and audit cross-border data transfer safeguards.',
      deliverables: ['Record of Processing Activities (RoPA)', 'DPIA Risk Assessment', 'Privacy Policy & DSAR Playbooks', 'Data Transfer Impact Assessment'],
    },
    {
      id: 'rbi',
      name: 'RBI Cyber Security Framework',
      category: 'Financial & Banking',
      mandate: 'Mandatory cybersecurity directives from the Reserve Bank of India for banks, NBFCs, and payment system operators.',
      enterSoftApproach:
        'We align core banking and payment infrastructure with RBI baseline security controls, implement continuous monitoring requirements, and validate SOC and incident response compliance for regulatory inspection.',
      deliverables: ['RBI Baseline Control Gap Analysis', 'Continuous Monitoring Compliance Log', 'Third-Party Payment Security Review', 'Regulatory Filing Support'],
    },
    {
      id: 'certin',
      name: 'CERT-In Cyber Guidelines',
      category: 'Financial & Banking',
      mandate: 'Indian Computer Emergency Response Team directives on mandatory cybersecurity practices, log retention, and incident reporting.',
      enterSoftApproach:
        'As a CERT-In empanelled organization, we ensure your log retention architecture meets the 180-day mandate, establish 6-hour incident reporting mechanisms, and deliver official empanelled security audit reports.',
      deliverables: ['CERT-In Empanelled Audit Certificate', 'Log Retention Architecture Verification', 'Incident Reporting Playbook', 'VAPT Compliance Sign-Off'],
    },
    {
      id: 'hipaa',
      name: 'HIPAA Security & HITECH',
      category: 'Healthcare & Critical',
      mandate: 'US healthcare regulation safeguarding electronic Protected Health Information (ePHI).',
      enterSoftApproach:
        'We audit ePHI data stores, verify end-to-end encryption and key management protocols, review Business Associate Agreements (BAAs), and ensure administrative and physical safeguard compliance.',
      deliverables: ['ePHI Risk Analysis Register', 'HIPAA Safeguards Policy Matrix', 'BAA Compliance Review Checklist', 'Encryption Custody Audit Report'],
    },
  ],
  continuousVsPointInTime: {
    eyebrow: 'TECHNICAL DIFFERENTIATOR',
    headline: 'Compliance cannot be continuous if evidence is collected once a year.',
    description:
      'Traditional compliance is an annual event that decays immediately after the auditor leaves. Entersoft Digital Trust combines human governance with automated telemetry to maintain permanent audit readiness.',
    traditionalSteps: [
      { step: '01', text: 'Annual snapshot audit scheduled once every 12 months', state: 'stale' },
      { step: '02', text: 'Massive manual evidence gathering in static spreadsheets', state: 'friction' },
      { step: '03', text: 'Audit passed; certificate framed on the wall', state: 'stale' },
      { step: '04', text: 'Cloud infrastructure & IAM policies immediately drift out of posture', state: 'friction' },
      { step: '05', text: 'Unknown vulnerabilities and compliance gaps remain invisible for 360 days', state: 'friction' },
    ],
    continuousSteps: [
      { step: '01', text: 'Continuous read-only connectors linked to cloud, IAM, and code repos', state: 'active' },
      { step: '02', text: 'Automated evidence collection streamed into tamper-proof audit vaults', state: 'assurance' },
      { step: '03', text: 'Real-time drift detection alerts engineering before compliance violations occur', state: 'active' },
      { step: '04', text: 'Senior Entersoft GRC analysts conduct ongoing policy and control reviews', state: 'assurance' },
      { step: '05', text: 'External registrar audits become effortless, routine verifications of live data', state: 'assurance' },
    ],
  },
  roadmap: {
    eyebrow: 'ENGAGEMENT METHODOLOGY',
    headline: 'Illustrative 90-Day Readiness Roadmap',
    disclaimer:
      'Illustrative 90-day readiness roadmap; timeline varies by scope, organizational maturity, regulatory requirements and external auditor availability. Entersoft structures milestones to achieve accelerated, defensible certification without engineering disruption.',
    stages: [
      {
        phase: 'DAYS 01–15',
        title: 'Scope & Baseline',
        subtitle: 'SYSTEM PERIMETER & MANDATE IDENTIFICATION',
        description:
          'Define the exact boundaries of your organization, technical assets, data repositories, cloud regions, and map applicable regulatory obligations.',
        keyDeliverable: 'Boundary Scoping Document & Applicability Register',
        focus: 'Executive Alignment',
      },
      {
        phase: 'DAYS 16–30',
        title: 'Gap Assessment',
        subtitle: 'CURRENT-STATE CONTROLS AUDIT',
        description:
          'Assess controls, identify evidence gaps, prioritize risk vectors, and establish an actionable engineering remediation backlog.',
        keyDeliverable: 'Comprehensive Gap Matrix & Remediation Roadmap',
        focus: 'Exposure Identification',
      },
      {
        phase: 'DAYS 31–60',
        title: 'Control Engineering',
        subtitle: 'POLICIES, CONTROLS & OWNERSHIP',
        description:
          'Draft custom security and privacy policies, configure required technical safeguards (IAM, MFA, encryption, logging), and assign control ownership.',
        keyDeliverable: 'Complete ISMS Policy Suite & Technical Control Baselines',
        focus: 'Engineering & Policy Build',
      },
      {
        phase: 'DAYS 61–75',
        title: 'Evidence & Validation',
        subtitle: 'TELEMETRY INGESTION & INTERNAL REVIEW',
        description:
          'Establish automated evidence ingestion pipelines, validate operating effectiveness of controls, and conduct internal readiness reviews.',
        keyDeliverable: 'Organized Evidence Vault & Internal Audit Review',
        focus: 'Pre-Audit Verification',
      },
      {
        phase: 'DAYS 76–90',
        title: 'Audit Readiness & Coordination',
        subtitle: 'REGISTRAR LIAISON & EXECUTIVE REPORTING',
        description:
          'Perform final evidence reviews, simulated auditor walkthroughs, coordinate with independent certification bodies, and deliver board-level readiness reports.',
        keyDeliverable: 'Auditor Clarification Records & Certification Support',
        focus: 'Official Certification',
      },
      {
        phase: 'POST-90 DAYS',
        title: 'Continuous Posture Governance',
        subtitle: 'PERMANENT ASSURANCE & DRIFT ALERTING',
        description:
          'Transition into continuous telemetry monitoring, real-time drift detection, periodic surveillance audit preparation, and recurring risk reviews.',
        keyDeliverable: 'Quarterly Executive Risk Summaries & Drift Alerts',
        focus: 'Sustained Trust',
      },
    ],
  },
  proof: {
    eyebrow: 'PROVEN OUTCOMES',
    headline: 'Defensible Governance in Production',
    caseStudy: {
      badge: 'FINANCIAL SECTOR CASE EVIDENCE',
      title: 'RBI Regulatory Compliance & ISO 27001 Transformation',
      sector: 'NON-BANKING FINANCIAL CORPORATION (NBFC)',
      summary:
        'Re-engineered core infrastructure and governance controls to satisfy strict Reserve Bank of India (RBI) cybersecurity directives while securing ISO 27001 certification. Passed formal audit review with zero core non-conformities across 230 backend host systems.',
      outcome: 'Secured full regulatory licensing clearance with zero core audit violations across 230 backend systems.',
      metric: 'Zero Core Violations Across 230 Systems',
    },
    qualitativePillars: [
      {
        title: 'Exhaustive Control Traceability',
        subtitle: 'EVERY CLAUSE BACKED BY PROOF',
        description:
          'Every regulatory requirement is tied directly to immutable technical evidence, configuration logs, and signed policies.',
      },
      {
        title: 'Seamless Registrar Advocacy',
        subtitle: 'TECHNICAL LIAISON AT AUDIT TIME',
        description:
          'Our senior GRC engineers sit alongside your team during external audits, explaining technical architectures and defending control design.',
      },
      {
        title: 'Multi-Framework Efficiency',
        subtitle: 'MAP ONCE, COMPLY MULTIPLE TIMES',
        description:
          'Harmonize controls across ISO 27001, SOC 2, and GDPR simultaneously to eliminate redundant audit work and minimize engineering overhead.',
      },
      {
        title: 'Continuous Risk Visibility',
        subtitle: 'BOARD-READY GOVERNANCE REPORTING',
        description:
          'Executive dashboards translate technical configuration metrics into clear, defensible risk summaries for the board and audit committee.',
      },
    ],
  },
  faqs: [
    {
      question: 'How is Digital Trust different from a traditional compliance audit?',
      answer:
        'Traditional compliance is a point-in-time, spreadsheet-driven audit that occurs once a year and quickly becomes stale. Entersoft Digital Trust is an end-to-end operating model that unifies continuous control monitoring, custom policy engineering, data privacy governance, third-party risk management, and hands-on external auditor advocacy to keep your enterprise permanently audit-ready.',
    },
    {
      question: 'Does Entersoft perform the official ISO/SOC 2 certification audit directly?',
      answer:
        'To maintain strict regulatory independence, official ISO 27001 certificates and SOC 2 Type II reports must be issued by accredited, independent registrars and licensed CPA firms. Entersoft acts as your advisory and readiness partner—we engineer your ISMS, implement controls, gather evidence, perform internal dry runs, and serve as your technical advocate during external audit sessions.',
    },
    {
      question: 'How does continuous evidence collection work?',
      answer:
        'We connect secure, read-only API connectors to your AWS, Azure, GCP, GitHub, GitLab, and identity providers (such as Okta or Entra ID). The platform continuously samples configuration states, access controls, and encryption settings, depositing timestamped proofs into an audit vault and alerting you if a resource drifts out of compliance.',
    },
    {
      question: 'Can Entersoft support multiple frameworks simultaneously?',
      answer:
        'Yes. We use a unified control harmonization methodology. For example, over 70% of controls between ISO 27001 and SOC 2 overlap. We map common control baselines across ISO 27001, SOC 2, GDPR, PCI-DSS, and RBI guidelines so your engineering team only implements and tests controls once.',
    },
    {
      question: 'How does Entersoft help with data privacy (GDPR / DPDP)?',
      answer:
        'We perform Data Protection Impact Assessments (DPIA), map personal data flows, establish Record of Processing Activities (RoPA), define data retention schedules, and verify cross-border data transfer boundaries and encryption key custody to satisfy EU GDPR, India DPDP, and global privacy mandates.',
    },
    {
      question: 'What is Entersoft\'s role during the external registrar audit?',
      answer:
        'Our senior GRC architects join your audit meetings with the external registrar or CPA firm. We walk the auditors through technical architecture diagrams, demonstrate control operation, explain evidence logs, and respond to technical inquiries, ensuring a smooth certification process.',
    },
    {
      question: 'What happens after certification is achieved?',
      answer:
        'Certification is the beginning of sustained assurance. We transition your organization into continuous posture governance—monitoring ongoing configuration drift, conducting mandatory annual internal audits, updating risk registers for major architectural changes, and preparing you for annual surveillance audits.',
    },
    {
      question: 'Can Digital Trust integrate with our existing security and DevOps tooling?',
      answer:
        'Yes. Entersoft integrates natively with your existing ecosystem, including Jira, ServiceNow, GitHub, GitLab, AWS, Azure, GCP, Splunk, and standard ticketing platforms, embedding compliance evidence collection directly into your existing development workflows.',
    },
  ],
  cta: {
    headline: 'Build a Defensible Digital Trust Posture',
    subline:
      'Unify cybersecurity engineering, regulatory compliance, data privacy, and third-party risk into a single executive operating model.',
    buttonText: 'Request a Digital Trust Briefing',
    buttonHref: '/#contact',
    guaranteeBadges: ['EXPERT GRC ADVISORY', 'AUTOMATED EVIDENCE TELEMETRY', 'ACCREDITED REGISTRAR ADVOCACY'],
  },
};
