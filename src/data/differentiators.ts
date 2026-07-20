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
    id: 'cyber-ontology',
    gridPosition: 'row1-wide-left',
    title: 'CYBER ONTOLOGY',
    descriptor: 'UNIFIED SECURITY CONTEXT',
    body: 'Model applications, APIs, code, cloud, identities, controls, exposures and business services as one connected security system.',
    coreCapability: 'Shared operational model of enterprise cyber risk',
  },
  {
    id: 'expert-governed-ai',
    gridPosition: 'row1-narrow-right',
    title: 'EXPERT-GOVERNED AI',
    descriptor: '14 YEARS OF JUDGMENT',
    body: 'AI accelerates correlation, investigation and recommendations. Senior experts govern high-impact decisions, actions and closure.',
    coreCapability: 'AI with human accountability',
  },
  {
    id: 'security-data-fusion',
    gridPosition: 'row2-narrow-left',
    title: 'SECURITY DATA FUSION',
    descriptor: 'CONNECT THE STACK',
    body: 'Unify signals from AppSec, IAM, cloud, EDR, SIEM, threat intelligence, GRC and engineering systems.',
    coreCapability: 'Integration across security tools and teams',
  },
  {
    id: 'exposure-decisioning',
    gridPosition: 'row2-wide-right',
    title: 'EXPOSURE DECISIONING',
    descriptor: 'PRIORITIZE WHAT MATTERS',
    body: 'Prioritize and simulate risk using exploitability, reachability, attack paths, control strength and business impact—not severity scores alone.',
    coreCapability: 'Contextual exposure management and attack-path intelligence',
  },
  {
    id: 'threat-operations',
    gridPosition: 'row3-narrow-left',
    title: 'THREAT OPERATIONS',
    descriptor: 'DETECT TO RESPOND',
    body: 'Connect active threats with exposed assets, identities and applications to accelerate investigation, containment and response.',
    coreCapability: 'SOC, MDR and incident operations',
  },
  {
    id: 'closed-loop-remediation',
    gridPosition: 'row3-wide-right',
    title: 'CLOSED-LOOP REMEDIATION',
    descriptor: 'DECISION TO ACTION',
    body: 'Push actions into engineering and security workflows, verify fixes and write validated outcomes back to the risk record.',
    coreCapability: 'Workflow automation and verified remediation',
  },
  {
    id: 'continuous-assurance',
    gridPosition: 'row4-wide-left',
    title: 'CONTINUOUS ASSURANCE',
    descriptor: 'TRUST & EVIDENCE',
    body: 'Map controls to live technical evidence, detect drift and maintain audit-ready proof across applications, cloud, identity and operations.',
    coreCapability: 'GRC, control validation and evidence',
  },
  {
    id: 'unified-command-view',
    gridPosition: 'row4-narrow-right',
    title: 'UNIFIED COMMAND VIEW',
    descriptor: 'ONE OPERATING PICTURE',
    body: 'Give CISOs, operators and engineering leaders role-based views of exposure, incidents, controls, remediation and business impact.',
    coreCapability: 'Executive and operational visibility',
  },
]
