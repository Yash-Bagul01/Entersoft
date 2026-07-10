export const cloudHero = {
  eyebrow: 'MANAGED CLOUD SECURITY',
  headline: ['Continuous Visibility.', 'Zero Blind Spots.'],
  subline: 'AWS, Azure, and GCP. Every resource, every configuration, every permission — monitored continuously by the same senior analysts for 13 years.',
};

export const cloudScenes = [
  {
    id: 'visibility',
    eyebrow: '01 — VISIBILITY',
    headline: 'You cannot secure what you cannot see.',
    body: 'Entersoft maps your entire cloud estate in real time — every resource, every region, every service boundary — before a single assessment begins.',
    stat: { value: '100%', label: 'Asset discovery before assessment begins' },
  },
  {
    id: 'exposure',
    eyebrow: '02 — EXPOSURE',
    headline: 'The breach was already open. Nobody checked.',
    body: 'Misconfigured S3 buckets. Publicly exposed databases. Unencrypted secrets in environment variables. We find them before attackers do.',
    stat: { value: '73%', label: 'Of cloud breaches trace back to misconfiguration (industry data)' },
  },
  {
    id: 'identity',
    eyebrow: '03 — IDENTITY',
    headline: 'Overprivileged by default. Fixed by design.',
    body: 'IAM sprawl is the silent risk in every cloud environment. We audit every role, every policy, every cross-account trust — and deliver least-privilege recommendations your team can actually implement.',
    stat: { value: '3.4×', label: 'Average reduction in over-permissioned roles post-engagement' },
  },
  {
    id: 'detection',
    eyebrow: '04 — DETECTION',
    headline: 'Threats move in seconds. Detection cannot take days.',
    body: '24/7 SOC coverage, real-time alert triage, and SOAR-driven response playbooks mean your team is notified of real threats — not noise — before damage spreads.',
    stat: { value: '<15 min', label: 'Mean time to triage a confirmed cloud threat alert' },
  },
  {
    id: 'compliance',
    eyebrow: '05 — COMPLIANCE',
    headline: 'Continuous. Not quarterly.',
    body: 'ISO 27001, CIS Benchmarks, GDPR, CERT-In, RBI — mapped against your live cloud configuration, not a point-in-time snapshot, so audit readiness is always the current state.',
    stat: { value: '0 surprises', label: 'At audit time for clients on continuous coverage' },
  },
];

export const cloudCoverage = {
  providers: ['AWS', 'Azure', 'GCP'],
  domains: [
    { name: 'Misconfiguration Detection', description: 'Storage, networking, compute, IAM, secrets — scanned against CIS Benchmarks and custom rule sets.' },
    { name: 'IAM & Access Control', description: 'Role audit, trust relationship mapping, service account review, cross-account access analysis.' },
    { name: 'Runtime Threat Detection', description: 'Real-time log analysis, anomaly detection, threat correlation across CloudTrail / Activity Log / Cloud Audit Logs.' },
    { name: 'Network Exposure Analysis', description: 'Security group / NSG / firewall rule review, open port mapping, public-facing resource inventory.' },
    { name: 'Secrets & Credentials', description: 'Detection of hardcoded credentials, exposed API keys, unencrypted secrets in config and environment.' },
    { name: 'Compliance Mapping', description: 'Continuous framework coverage for ISO 27001, CIS Benchmarks, GDPR, CERT-In, RBI guidelines.' },
  ],
};

export const cloudEvidence = [
  { value: '600+', label: 'Clients secured across cloud and on-prem' },
  { value: '13 Yrs', label: 'Same senior analysts, zero attrition' },
  { value: '0 Breaches', label: "On Entersoft's watch, 13 years running" },
  { value: '<15 Min', label: 'Mean triage time on confirmed cloud alerts' },
];
