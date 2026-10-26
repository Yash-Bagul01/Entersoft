export type GridPosition =
  | 'row1-wide-left'
  | 'row1-narrow-right'
  | 'row2-narrow-left'
  | 'row2-wide-right'
  | 'row3-narrow-left'
  | 'row3-wide-right'
  | 'row4-wide-left'
  | 'row4-narrow-right'

export type CapabilityCard = {
  id: string
  gridPosition: GridPosition
  title: string
  descriptor: string              // top-right label
  body: string                    // exact card copy
  coreCapability: string          // enterprise capability represented (metadata, not shown on card face)
  services: readonly string[]     // CEO service mapping (metadata, not shown on the card)
}

export const capabilities: CapabilityCard[] = [
  {
    id: 'find-risk-earlier',
    gridPosition: 'row1-wide-left',
    title: 'See Risk Across Your Enterprise',
    descriptor: 'EARLY DISCOVERY',
    body: 'Connect security exposure across applications, APIs, cloud, identities, digital assets and AI systems.',
    coreCapability: 'Pre-incident vulnerability and attack-path discovery',
    services: ['Application Assurance', 'Cloud Resilience', 'AI Systems Assurance', 'Protocol Assurance'],
  },
  {
    id: 'reduce-false-positives',
    gridPosition: 'row1-narrow-right',
    title: 'Turn Intelligence Into Confident Decisions',
    descriptor: 'NOISE REDUCTION',
    body: 'Combine AI-assisted analysis with expert judgment to validate threats, understand impact and focus on what matters.',
    coreCapability: 'Expert human-validated findings',
    services: ['Adversarial Validation', 'Cyber Defense Operations', 'Application Assurance'],
  },
  {
    id: 'prioritise-business-impact',
    gridPosition: 'row2-narrow-left',
    title: 'Protect What Matters Most',
    descriptor: 'CONTEXTUAL RISK',
    body: 'Align security priorities with critical systems, business operations, regulatory obligations and enterprise risk.',
    coreCapability: 'Business exposure decisioning and attack-path intelligence',
    services: ['Digital Trust', 'Cloud Resilience', 'Adversarial Validation'],
  },
  {
    id: 'accelerate-remediation',
    gridPosition: 'row2-wide-right',
    title: 'Move From Risk to Action',
    descriptor: 'FIX VERIFICATION',
    body: 'Connect security findings to engineering, cloud and response workflows—so teams can remediate, contain and verify faster.',
    coreCapability: 'Closed-loop fix guidance and verification',
    services: ['Application Assurance', 'Cloud Resilience', 'Cyber Defense Operations'],
  },
  {
    id: 'maintain-continuous-evidence',
    gridPosition: 'row3-narrow-left',
    title: 'Make Trust Continuously Verifiable',
    descriptor: 'AUDIT READINESS',
    body: 'Connect security controls, compliance obligations and technical evidence to maintain assurance beyond periodic audits.',
    coreCapability: 'Continuous control governance and evidence collection',
    services: ['Digital Trust', 'Application Assurance', 'Cloud Resilience'],
  },
  {
    id: 'improve-detection-response',
    gridPosition: 'row3-wide-right',
    title: 'Build Resilience Into Every Operation',
    descriptor: 'SECURITY OPERATIONS',
    body: 'Strengthen threat detection, investigation, incident response and recovery across enterprise and AI-driven environments.',
    coreCapability: 'MDR operations and telemetry correlation',
    services: ['Cyber Defense Operations', 'AI Systems Assurance', 'Cloud Resilience'],
  },
]
