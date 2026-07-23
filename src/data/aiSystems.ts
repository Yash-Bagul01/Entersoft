export const hero = {
  eyebrow: 'AI SYSTEMS ASSURANCE',
  descriptor: 'LLM • RAG • AGENTS • MODEL APIS',
  line1: 'AI moves fast.',
  line2: 'Threats move faster.',
  sub: 'Assess AI applications, models, agents, data flows and autonomous actions before production.',
  cta: 'Get a Free Consultation',
}

export const attackLayers = [
  { id: 'input',    label: 'USER INPUT',     threat: 'PROMPT INJECTION',   y: 0 },
  { id: 'prompt',   label: 'PROMPT LAYER',   threat: 'CONTEXT MANIPULATION', y: 1 },
  { id: 'guard',    label: 'GUARDRAILS',     threat: 'BYPASS',             y: 2 },
  { id: 'model',    label: 'MODEL',          threat: 'MANIPULATION',       y: 3 },
  { id: 'rag',      label: 'RAG',            threat: 'POISONING',          y: 4 },
  { id: 'tools',    label: 'TOOL CALLS',     threat: 'ABUSE',              y: 5 },
  { id: 'agents',   label: 'AGENTS',         threat: 'HIJACKING',          y: 6 },
  { id: 'output',   label: 'API OUTPUT',     threat: 'EXFILTRATION',       y: 7 },
]

export const threats = [
  {
    id: 'prompt-injection',
    name: 'PROMPT INJECTION',
    oneliner: 'Adversarial instructions embedded in user input override system behaviour.',
    what: 'Direct and indirect injection via user turns, tool outputs, and retrieved documents.',
  },
  {
    id: 'rag-poisoning',
    name: 'RAG POISONING',
    oneliner: 'Malicious documents inserted into the retrieval store corrupt model responses.',
    what: 'Vector store manipulation, document embedding attacks, retrieval ranking exploitation.',
  },
  {
    id: 'llm-escape',
    name: 'LLM ESCAPE',
    oneliner: 'Model produces outputs outside its intended operational boundary.',
    what: 'Jailbreaking, persona switching, system prompt extraction, role confusion attacks.',
  },
  {
    id: 'guardrail-bypass',
    name: 'GUARDRAIL BYPASS',
    oneliner: 'Safety filters circumvented through encoding, fragmentation, or context switching.',
    what: 'Filter evasion, multi-turn bypass, encoding tricks, language switching exploits.',
  },
  {
    id: 'agent-hijacking',
    name: 'AGENT HIJACKING',
    oneliner: 'Autonomous agents redirected to execute attacker-controlled actions.',
    what: 'Tool call manipulation, memory poisoning, chain-of-thought corruption, goal substitution.',
  },
  {
    id: 'model-exfiltration',
    name: 'MODEL EXFILTRATION',
    oneliner: 'Sensitive training data or system prompts extracted through inference.',
    what: 'Membership inference, system prompt leakage, training data reconstruction.',
  },
  {
    id: 'insecure-tools',
    name: 'INSECURE TOOL CALLS',
    oneliner: 'Agent-invoked tools expose APIs, databases, or filesystems without validation.',
    what: 'Tool permission sprawl, SSRF via tool calls, privilege escalation through integrations.',
  },
  {
    id: 'data-boundary',
    name: 'DATA BOUNDARY VIOLATIONS',
    oneliner: 'Cross-user data leakage through shared context windows or persistent memory.',
    what: 'Context window bleed, persistent memory poisoning, multi-tenant isolation failures.',
  },
]

export const evidence = [
  { value: '847', suffix: '', label: 'RAW AI SIGNALS' },
  { value: '12',  suffix: '', label: 'VALIDATED THREATS' },
  { value: '98.6', suffix: '%', label: 'NOISE ELIMINATED' },
  { value: '0',   suffix: '', label: 'FALSE POSITIVES IN REPORT' },
]
