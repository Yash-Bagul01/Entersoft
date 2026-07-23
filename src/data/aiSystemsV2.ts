export const hero = {
  eyebrow: 'AI SYSTEMS ASSURANCE · LLM • RAG • AGENTS • MODEL APIS',
  lines: [
    { text: 'Every AI model', weight: 'dim' },
    { text: 'is running.', weight: 'bright' },
    { text: 'Is yours safe?', weight: 'dim' },
  ],
  cta: 'Assess Your AI',
  ticker:
    'PROMPT INJECTION — GUARDRAIL BYPASS — RAG POISONING — LLM ESCAPE — AGENT HIJACKING — MODEL EXFILTRATION — INSECURE TOOL CALLS — DATA BOUNDARY VIOLATIONS',
}

export const casePanels = [
  {
    index: '01',
    name: 'PROMPT INJECTION',
    oneliner: "Adversarial text in user input overrides the model's system behaviour.",
    scope: 'Direct injection · Indirect via tool outputs · Multi-turn escalation',
  },
  {
    index: '02',
    name: 'RAG POISONING',
    oneliner: 'Documents in the retrieval store corrupted to manipulate model responses.',
    scope: 'Vector store manipulation · Embedding attacks · Retrieval ranking exploitation',
  },
  {
    index: '03',
    name: 'GUARDRAIL BYPASS',
    oneliner: 'Safety filters circumvented through encoding, language switching, or fragmentation.',
    scope: 'Filter evasion · Multi-turn bypass · Encoding tricks · Role confusion',
  },
  {
    index: '04',
    name: 'AGENT HIJACKING',
    oneliner: 'Autonomous agents redirected to execute attacker-controlled actions.',
    scope: 'Tool call manipulation · Memory poisoning · Goal substitution · Chain-of-thought corruption',
  },
  {
    index: '05',
    name: 'LLM ESCAPE',
    oneliner: 'Model output breaks outside its intended operational boundary.',
    scope: 'Jailbreaking · Persona switching · System prompt extraction · Training data leakage',
  },
  {
    index: '06',
    name: 'INSECURE TOOL CALLS',
    oneliner: 'Agent-invoked tools expose APIs, databases, or filesystems without validation.',
    scope: 'Tool permission sprawl · SSRF via tool calls · Privilege escalation through integrations',
  },
  {
    index: '07',
    name: 'MODEL EXFILTRATION',
    oneliner: 'Sensitive training data or system prompts extracted through repeated inference.',
    scope: 'Membership inference · System prompt leakage · Training data reconstruction',
  },
  {
    index: '08',
    name: 'DATA BOUNDARY VIOLATIONS',
    oneliner: 'Cross-user data leakage through shared context windows or persistent memory.',
    scope: 'Context window bleed · Persistent memory poisoning · Multi-tenant isolation failures',
  },
]

export const processSteps = [
  {
    index: '01',
    verb: 'SCAN.',
    noun: 'SURFACE EXPOSURE.',
    detail: 'Map every boundary in the AI stack — prompts, guardrails, retrieval, tools, APIs, agent chains.',
  },
  {
    index: '02',
    verb: 'VALIDATE.',
    noun: 'CONFIRM EXPLOITABILITY.',
    detail: 'Senior analysts confirm every flagged signal. Zero noise reaches the report.',
  },
  {
    index: '03',
    verb: 'SECURE.',
    noun: 'BEFORE PRODUCTION.',
    detail: 'Developer-ready remediation for every confirmed finding. Retest included.',
  },
]

export const auditNumbers = {
  raw: '847',
  rawLabel: 'signals found',
  validated: '12',
  validatedLabel: 'real threats',
  noiseRate: '98.6%',
  noiseLabel: 'noise eliminated',
}

export const stackedCTA = {
  lines: ['Assess', 'Your AI.', 'Before', 'It Ships.'],
  button: 'Get a Free Consultation',
  href: '/#contact',
}
