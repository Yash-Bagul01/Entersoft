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
}

export const capabilities: CapabilityCard[] = [
  {
    id: 'find-risk-earlier',
    gridPosition: 'row1-wide-left',
    title: 'Find exploitable risk earlier',
    descriptor: 'EARLY DISCOVERY',
    body: 'Identify vulnerabilities and attack paths before they become incidents.',
    coreCapability: 'Pre-incident vulnerability and attack-path discovery',
  },
  {
    id: 'reduce-false-positives',
    gridPosition: 'row1-narrow-right',
    title: 'Reduce false-positive investigation',
    descriptor: 'NOISE REDUCTION',
    body: 'Help security teams focus investigation effort on validated and relevant findings.',
    coreCapability: 'Expert human-validated findings',
  },
  {
    id: 'prioritise-business-impact',
    gridPosition: 'row2-narrow-left',
    title: 'Prioritise by business impact',
    descriptor: 'CONTEXTUAL RISK',
    body: 'Rank security issues according to business exposure, criticality and risk.',
    coreCapability: 'Business exposure decisioning and attack-path intelligence',
  },
  {
    id: 'accelerate-remediation',
    gridPosition: 'row2-wide-right',
    title: 'Accelerate remediation',
    descriptor: 'FIX VERIFICATION',
    body: 'Give engineering and security teams clear remediation guidance and verification workflows.',
    coreCapability: 'Closed-loop fix guidance and verification',
  },
  {
    id: 'maintain-continuous-evidence',
    gridPosition: 'row3-narrow-left',
    title: 'Maintain continuous evidence',
    descriptor: 'AUDIT READINESS',
    body: 'Keep security and compliance evidence available between formal assessment cycles.',
    coreCapability: 'Continuous control governance and evidence collection',
  },
  {
    id: 'improve-detection-response',
    gridPosition: 'row3-wide-right',
    title: 'Improve detection and response',
    descriptor: 'SECURITY OPERATIONS',
    body: 'Strengthen detection coverage, investigation and response workflows across the environment.',
    coreCapability: 'MDR operations and telemetry correlation',
  },
]
