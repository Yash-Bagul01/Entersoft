export const hero = {
  eyebrow: 'CLOUD RESILIENCE',
  line1: 'Every corner of your cloud.',
  line2: 'Nothing hidden.',
  sub: 'Continuous. Multi-cloud. Human-validated. 13 years without a breach on our watch.',
};

export const scenes = [
  {
    id: 'visibility',
    label: '01',
    statement: 'Thousands of resources. We map every one.',
    proof: '100% asset coverage before a single test begins.',
    detail: 'AWS, Azure, GCP — every instance, bucket, role, rule, and secret. Mapped before assessment. Updated continuously after.',
  },
  {
    id: 'exposure',
    label: '02',
    statement: 'Misconfiguration is not a mistake. It is the default.',
    proof: '73% of cloud breaches start with a misconfigured resource.',
    detail: 'Public S3 buckets. Open security groups. Unrotated keys. Secrets in environment variables. We find what the cloud provider will not.',
  },
  {
    id: 'identity',
    label: '03',
    statement: 'Too much access. Given to too many. For too long.',
    proof: 'Average of 3.4× reduction in over-permissioned roles per engagement.',
    detail: 'IAM sprawl is the most dangerous and least visible risk in any cloud environment. We audit every role, trust relationship, and cross-account permission.',
  },
  {
    id: 'detection',
    label: '04',
    statement: 'A breach begins in seconds. Detection cannot wait for Monday.',
    proof: '<15 min mean triage time on confirmed cloud alerts.',
    detail: '24/7 SOC coverage. Real-time log correlation. SOAR-driven response playbooks. Threats identified, triaged, and escalated before they become incidents.',
  },
  {
    id: 'compliance',
    label: '05',
    statement: 'Audit readiness is not a project. It is a posture.',
    proof: '0 compliance surprises for clients on continuous coverage.',
    detail: 'ISO 27001, CIS Benchmarks, GDPR, CERT-In, RBI — mapped against your live cloud configuration, updated in real time.',
  },
];

export const providers = ['AWS', 'AZURE', 'GCP'];

export const evidence = [
  { value: '600+', label: 'Clients secured' },
  { value: '13 YRS', label: 'Zero attrition, same analysts' },
  { value: '0', label: 'Breaches on our watch' },
  { value: '<15 MIN', label: 'Mean alert triage time' },
];
