export const hero = {
  eyebrow: 'AI SYSTEMS ASSURANCE',
  headline: {
    line1: 'Every AI model ',
    gradientWord: 'exposes',
    line2: ' what attackers look for.',
  },
  sub: 'Assess LLMs, RAG pipelines, agents, and model APIs before production. Senior-validated. Zero noise.',
  ctaPrimary: { label: 'Get a Free Assessment', href: '/contact' },
  ctaSecondary: { label: 'View Threat Scope', href: '#threats' },
};

export const heroStats = [
  { value: '8', label: 'Attack Classes' },
  { value: '847→12', label: 'Signal Reduction' },
  { value: '14 Yrs', label: 'AI Security XP' },
];

export const metrics = [
  {
    value: '600+',
    label: 'AI Systems Assessed',
    sub: 'Across LLM, agent and RAG deployments',
  },
  {
    value: '14 Yrs',
    label: 'Security Expertise',
    sub: 'Same senior analysts, zero attrition',
  },
  {
    value: '0',
    label: 'False Positives',
    sub: 'In the final validated report',
  },
  {
    value: '98.6%',
    label: 'Noise Eliminated',
    sub: 'Before findings reach the developer',
  },
];

export const threats = [
  {
    index: '01',
    name: 'PROMPT INJECTION',
    size: 'wide',
    body: 'Adversarial instructions in user input override model behaviour.',
  },
  {
    index: '02',
    name: 'RAG POISONING',
    size: 'narrow',
    body: 'Malicious documents injected into retrieval stores corrupt responses.',
  },
  {
    index: '03',
    name: 'GUARDRAIL BYPASS',
    size: 'narrow',
    body: 'Safety filters circumvented through encoding, fragmentation or language switching.',
  },
  {
    index: '04',
    name: 'AGENT HIJACKING',
    size: 'wide',
    body: 'Autonomous agents redirected to execute attacker-controlled actions.',
  },
  {
    index: '05',
    name: 'LLM ESCAPE',
    size: 'narrow',
    body: 'Model output breaks outside its intended operational boundary.',
  },
  {
    index: '06',
    name: 'INSECURE TOOL CALLS',
    size: 'wide',
    body: 'Agent-invoked tools expose APIs, databases or filesystems without validation.',
  },
  {
    index: '07',
    name: 'MODEL EXFILTRATION',
    size: 'wide',
    body: 'Training data or system prompts extracted through repeated inference.',
  },
  {
    index: '08',
    name: 'DATA BOUNDARY VIOLATIONS',
    size: 'narrow',
    body: 'Cross-user data leakage through shared context windows or persistent memory.',
  },
];

export const processSteps = [
  {
    index: '01',
    title: 'SCOPE.',
    sub: 'Map every boundary',
    detail:
      'Define the full AI attack surface: prompts, guardrails, retrieval pipelines, tool integrations, agent chains and API outputs.',
  },
  {
    index: '02',
    title: 'ASSESS.',
    sub: 'Test every layer',
    detail:
      'Expert-led assessment combining automated scanning and manual adversarial testing across all 8 threat classes.',
  },
  {
    index: '03',
    title: 'VALIDATE.',
    sub: 'Zero noise',
    detail:
      'Senior analysts confirm every finding. Exploit-first evidence. No signal reaches the report without human sign-off.',
  },
  {
    index: '04',
    title: 'SECURE.',
    sub: 'Before production',
    detail:
      'Developer-ready remediation with specific fixes per finding. Unlimited retest on demand until confirmed secure.',
  },
];

export const stackLayers = [
  {
    layer: 'USER INPUT',
    coverage: 'Prompt injection, indirect injection, multi-turn attacks',
  },
  {
    layer: 'PROMPT LAYER',
    coverage: 'System prompt extraction, context manipulation',
  },
  {
    layer: 'GUARDRAILS',
    coverage: 'Filter evasion, bypass techniques, encoding attacks',
  },
  {
    layer: 'MODEL / LLM',
    coverage: 'Jailbreaks, persona switching, training data leakage',
  },
  {
    layer: 'RAG RETRIEVAL',
    coverage: 'Vector store poisoning, retrieval ranking manipulation',
  },
  {
    layer: 'TOOL CALLS',
    coverage: 'SSRF, permission sprawl, API exposure via agents',
  },
  {
    layer: 'AGENT ACTIONS',
    coverage: 'Goal hijacking, memory poisoning, chain-of-thought corruption',
  },
  {
    layer: 'API OUTPUT',
    coverage: 'Data exfiltration, response manipulation, downstream impact',
  },
];

export const techAssessed = [
  'GPT-4o',
  'Claude Sonnet',
  'Gemini Pro',
  'Llama 3',
  'Mistral',
  'LangChain',
  'LlamaIndex',
  'AutoGen',
  'CrewAI',
  'Semantic Kernel',
  'Pinecone',
  'Weaviate',
  'Chroma',
  'LangGraph',
  'OpenAI Assistants',
];
