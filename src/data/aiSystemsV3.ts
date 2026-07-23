export const heroV3 = {
  pill: 'ENTERPRISE AI SYSTEMS ASSURANCE',
  title: 'Continuous Security & Assurance for LLMs, RAG & AI Agents',
  sub: 'Assess AI models, prompt templates, vector stores, tool integrations, and autonomous actions against adversarial injection, data leakage, and compliance risks before deployment.',
  ctaPrimary: 'Get a Free AI Security Audit',
  ctaSecondary: 'Schedule Executive Briefing',
  metrics: [
    { label: 'ATTACK COVERAGE', value: 'OWASP AI Top 10' },
    { label: 'STACK PROTECTION', value: 'LLMs, RAG & Agents' },
    { label: 'ACCURACY GUARANTEE', value: '0% False Positives' },
    { label: 'AUDIT TURNAROUND', value: '< 48 Hours' },
  ],
}

export const stackPillars = [
  {
    id: 'prompts',
    layerNumber: '01',
    iconName: 'ShieldAlert',
    title: 'Prompt & Guardrail Assurance',
    subtitle: 'System Input & Context Boundary Security',
    owaspId: 'OWASP LLM01:2025',
    severityScore: '9.8 / 10 Risk Reduction',
    exploitCount: 'Full Alignment Protection',
    risk: 'CRITICAL PRIORITY',
    description: 'We audit your user-facing AI interfaces, system instructions, and input guardrails to prevent attackers from hijacking model behavior, overriding safety rules, or exfiltrating system data.',
    serviceOverview: 'Entersoft evaluates prompt boundaries and multi-turn user inputs to guarantee that system instructions remain tamper-proof and unalterable by external users or automated injection attacks.',
    businessImpact: 'Prevents brand reputation damage, unauthorized disclosure of system prompts, and unaligned model outputs.',
    keyDefenses: [
      'System & User Instruction Disambiguation',
      'Multi-Language Input Sanitization Controls',
      'Indirect Prompt Injection Shielding',
      'Real-time Sensitive Data Leakage Interception'
    ],
    deliverables: [
      'System Prompt Hardening Blueprint',
      'Input Validation Policy Matrix',
      'Context Isolation Certificate'
    ]
  },
  {
    id: 'rag',
    layerNumber: '02',
    iconName: 'Database',
    title: 'RAG & Vector Retrieval Security',
    subtitle: 'Knowledge Base & Embedding Integrity',
    owaspId: 'OWASP LLM04:2025',
    severityScore: '8.7 / 10 Risk Reduction',
    exploitCount: 'Vector Store Provenance',
    risk: 'HIGH PRIORITY',
    description: 'We inspect your vector database pipelines, semantic search embeddings, and document stores to ensure enterprise knowledge bases are protected against corpus poisoning and cross-tenant data bleed.',
    serviceOverview: 'Entersoft audits document ingestion, chunking strategies, and retrieval permissions so retrieved context never introduces malicious instructions or exposes confidential cross-user records.',
    businessImpact: 'Guarantees multi-tenant data privacy, maintains document provenance, and stops vector store contamination.',
    keyDefenses: [
      'Vector Embedding Provenance Verification',
      'Multi-Tenant Chunk Access Boundary Enforcement',
      'Semantic Relevance vs Poisoning Classifier',
      'Document Injection Retrospective Auditing'
    ],
    deliverables: [
      'Vector Store Security Audit',
      'Knowledge Base Access Scoping Guide',
      'Data Isolation Verification'
    ]
  },
  {
    id: 'agents',
    layerNumber: '03',
    iconName: 'Bot',
    title: 'Agent & Tool Governance',
    subtitle: 'Autonomous Action & API Privilege Scoping',
    owaspId: 'OWASP LLM02:2025',
    severityScore: '9.6 / 10 Risk Reduction',
    exploitCount: 'Least-Privilege Scoping',
    risk: 'CRITICAL PRIORITY',
    description: 'We audit autonomous AI agents and tool integrations to restrict execution permissions, preventing agents from taking unauthorized database actions or making unsafe external API calls.',
    serviceOverview: 'Entersoft establishes zero-trust permission boundaries for AI agents, ensuring every automated action, database query, or API trigger is cryptographically validated and tightly scoped.',
    businessImpact: 'Eliminates unauthorized financial transactions, unintentional data deletion, and unvalidated API calls.',
    keyDefenses: [
      'Least-Privilege Agent Action Gateways',
      'Chain-of-Thought Infinite Loop Protection',
      'Strict API Schema Parameter Validation',
      'Zero-Trust Outbound Webhook Security'
    ],
    deliverables: [
      'Agent Privilege Scoping Matrix',
      'API Tool Permission Specification',
      'Autonomous Workflow Threat Audit'
    ]
  },
  {
    id: 'inference',
    layerNumber: '04',
    iconName: 'Lock',
    title: 'Model Gateway & Privacy Control',
    subtitle: 'Inference Leakage & Regulatory Compliance',
    owaspId: 'OWASP LLM06:2025',
    severityScore: '8.9 / 10 Risk Reduction',
    exploitCount: 'Compliance Readiness',
    risk: 'HIGH PRIORITY',
    description: 'We assess model API gateways, token streaming, and response sanitization to prevent sensitive PII leakage, membership inference attacks, and regulatory non-compliance.',
    serviceOverview: 'Entersoft implements continuous output inspection and privacy controls, aligning your enterprise AI stack with international compliance standards including NIST AI RMF, ISO 42001, and OWASP Top 10.',
    businessImpact: 'Ensures strict alignment with GDPR, HIPAA, and NIST AI safety frameworks while safeguarding IP.',
    keyDefenses: [
      'Automated PII & Proprietary Source Masking',
      'Membership Inference & Extraction Mitigation',
      'Inference Rate-Limiting & Anomaly Mesh',
      'Regulatory Compliance Alignment Checks'
    ],
    deliverables: [
      'NIST & OWASP AI Compliance Report',
      'PII Redaction Control Framework',
      'Executive Risk Assessment Summary'
    ]
  },
]

export const threatGridV3 = [
  {
    id: 'prompt-injection',
    title: 'Prompt Injection',
    category: 'LLM INPUT ASSURANCE',
    severity: 'CRITICAL',
    summary: 'Adversarial inputs overriding intended system behavior.',
    details: 'Comprehensive testing for direct prompt override, multi-turn escalation, and indirect payload injection via external tools.',
  },
  {
    id: 'rag-poisoning',
    title: 'RAG Poisoning',
    category: 'VECTOR STORE SECURITY',
    severity: 'HIGH',
    summary: 'Corrupted documents manipulating retrieval context.',
    details: 'Audit of vector store embeddings, document ranking integrity, and multi-tenant document isolation controls.',
  },
  {
    id: 'guardrail-bypass',
    title: 'Guardrail Circumvention',
    category: 'SAFETY CONTROL',
    severity: 'HIGH',
    summary: 'Safety filters bypassed via encoding or persona switching.',
    details: 'Stress testing safety boundaries against encoding tricks, language switching, and complex role-playing prompts.',
  },
  {
    id: 'agent-hijacking',
    title: 'Agent Privilege Escalation',
    category: 'AUTONOMOUS AGENTS',
    severity: 'CRITICAL',
    summary: 'Agents manipulated into executing unauthorized actions.',
    details: 'Evaluation of agent reasoning loops, memory safety, goal substitution, and tool permission enforcement.',
  },
  {
    id: 'llm-escape',
    title: 'Model Alignment Breach',
    category: 'MODEL BOUNDARY',
    severity: 'HIGH',
    summary: 'Model outputs exceeding authorized operational rules.',
    details: 'Verification of operational constraints, persona containment, and system instruction protection.',
  },
  {
    id: 'insecure-tools',
    title: 'Unvalidated Tool Access',
    category: 'INTEGRATIONS',
    severity: 'CRITICAL',
    summary: 'Agent tools exposing databases or internal services.',
    details: 'Review of excessive API permissions, SSRF vulnerabilities via HTTP tools, and privileged command execution.',
  },
  {
    id: 'model-exfiltration',
    title: 'Data & Prompt Exfiltration',
    category: 'PRIVACY & IP',
    severity: 'MEDIUM',
    summary: 'Proprietary knowledge or system prompts extracted by users.',
    details: 'Testing for training data inference, system prompt extraction, and sensitive credential disclosure.',
  },
  {
    id: 'data-boundary',
    title: 'Multi-Tenant Data Bleed',
    category: 'DATA ISOLATION',
    severity: 'HIGH',
    summary: 'Cross-user data leakage through shared memory context.',
    details: 'Verification of multi-tenant isolation, context window sanitization, and persistent session memory protection.',
  },
]

export const auditWorkflowV3 = [
  {
    step: '01',
    title: 'Discovery & Surface Mapping',
    description: 'We perform a full inventory of your enterprise AI stack: system prompts, guardrail rules, vector store connections, agent tool execution schemas, and model gateway APIs.',
    badge: 'SURFACE INVENTORY',
    deliverable: 'Complete AI Attack Surface Map',
    details: [
      'Prompt Template & Guardrail Scoping',
      'Vector Database & RAG Pipeline Inventory',
      'Agent Tool & API Permission Mapping'
    ]
  },
  {
    step: '02',
    title: 'Adversarial Stress Testing',
    description: 'Our senior AI security engineers execute over 800+ targeted adversarial scenarios across OWASP AI Top 10 vectors to identify hidden vulnerabilities in real-world conditions.',
    badge: '800+ THREAT SCENARIOS',
    deliverable: 'Vulnerability Impact Assessment',
    details: [
      'Prompt Injection & Jailbreak Testing',
      'RAG Poisoning & Retrieval Audit',
      'Agent Privilege & SSRF Escalation Checks'
    ]
  },
  {
    step: '03',
    title: 'Analyst Triage & Risk Quantification',
    description: 'Security experts manually verify every finding to eliminate alert noise, quantify financial and operational risk, and prioritize fixes based on business impact.',
    badge: '0% FALSE POSITIVES',
    deliverable: 'Executive Risk Briefing',
    details: [
      '100% Manual Lead Analyst Validation',
      'Business Risk Impact Scoring',
      'False Positive Elimination Guarantee'
    ]
  },
  {
    step: '04',
    title: 'Remediation Guidance & Certification',
    description: 'We deliver clear, actionable remediation specifications for system prompts, guardrails, and tool permissions, followed by re-testing and official Entersoft AI Certification.',
    badge: 'CERTIFIED ASSURANCE',
    deliverable: 'Entersoft AI Security Attestation',
    details: [
      'Step-by-Step Remediation Playbooks',
      'Complimentary Patch Retesting',
      'Official Entersoft Security Certificate'
    ]
  },
]
