export const hero = {
  eyebrow: 'CYBER DEFENSE OPERATIONS',
  descriptor: 'MDR • SIEM • DETECTION ENGINEERING',
  headline: {
    before: "Threats don't wait.",
    gradient: "Neither do we.",
    after: '',
  },
  sub: 'Unify security monitoring, detection engineering, threat hunting, investigation and response into one continuous operating model.',
  ctaPrimary: { label: 'Start a Conversation', href: '/#contact' },
  ctaSecondary: { label: 'See Threat Coverage', href: '#coverage' },
  heroStats: [
    { value: '<15 MIN', label: 'Mean Triage Time' },
    { value: '24/7', label: 'SOC Coverage' },
    { value: '600+', label: 'Clients Protected' },
  ],
};

export const alertStream = [
  { time: '00:00:41', severity: 'CRITICAL', event: 'Lateral movement detected — 10.0.1.22 → DC01', status: 'TRIAGING' },
  { time: '00:02:18', severity: 'HIGH', event: 'S3 bucket policy modified — prod-customer-data', status: 'INVESTIGATING' },
  { time: '00:04:03', severity: 'CRITICAL', event: 'Credential stuffing — 847 failed logins in 90s', status: 'CONTAINED' },
  { time: '00:05:57', severity: 'HIGH', event: 'Outbound TLS to C2 — 198.51.100.42:443', status: 'BLOCKED' },
  { time: '00:07:12', severity: 'HIGH', event: 'Admin account created without MFA — prod env', status: 'ESCALATED' },
  { time: '00:09:44', severity: 'MED', event: 'CloudTrail logging disabled — us-east-1', status: 'REMEDIATED' },
  { time: '00:11:30', severity: 'HIGH', event: 'Container escape attempt — k8s pod compromise', status: 'INVESTIGATING' },
  { time: '00:13:55', severity: 'CRITICAL', event: 'Ransomware signature — file encryption pattern', status: 'CONTAINED' },
];

export const metrics = [
  { value: '<15 MIN', label: 'Mean Triage Time', sub: 'From alert to analyst sign-off', accent: 'blue' },
  { value: '100%', label: 'Log Coverage', sub: 'Cloud, network, endpoint, identity', accent: 'neon' },
  { value: '0', label: 'Unreviewed Criticals', sub: 'Every CRITICAL alert triaged', accent: 'blue' },
  { value: '13 YRS', label: 'Analyst Tenure', sub: 'Same senior team, zero attrition', accent: 'neon' },
];

export const detectionSources = [
  { name: 'CLOUD', sub: 'AWS / Azure / GCP' },
  { name: 'ENDPOINT', sub: 'EDR / XDR feeds' },
  { name: 'NETWORK', sub: 'NDR / firewall / flows' },
  { name: 'IDENTITY', sub: 'IAM / AD / Entra' },
  { name: 'APPLICATION', sub: 'APM / WAF / SAST' },
  { name: 'EMAIL', sub: 'Phishing / BEC signals' },
  { name: 'API', sub: 'Gateway / runtime calls' },
  { name: 'THREAT INTEL', sub: 'OSINT / commercial feeds' },
];

export const responseSteps = [
  { index: '01', verb: 'DETECT', ms: '< 2 MIN', detail: 'Correlation rules and ML models surface anomalies across all ingested log sources before a human analyst is paged.' },
  { index: '02', verb: 'TRIAGE', ms: '< 15 MIN', detail: 'Senior analyst reviews the alert, assigns severity, eliminates false positives and confirms the incident scope.' },
  { index: '03', verb: 'INVESTIGATE', ms: '< 45 MIN', detail: 'Root cause analysis: identify the initial access vector, lateral movement path, and blast radius.' },
  { index: '04', verb: 'CONTAIN', ms: '< 60 MIN', detail: 'Isolate affected assets, block attacker-controlled infrastructure, and cut off active communication channels.' },
  { index: '05', verb: 'REMEDIATE', ms: 'SAME DAY', detail: 'Coordinate with client teams to remove persistence mechanisms, rotate credentials, and restore clean state.' },
];

export const coverageGrid = [
  { index: '01', area: 'CLOUD INFRASTRUCTURE', size: 'wide', body: 'Configuration drift, privilege escalation, storage exposure, anomalous API calls across AWS, Azure, and GCP.' },
  { index: '02', area: 'ENDPOINT & WORKSTATION', size: 'narrow', body: 'Process injection, privilege abuse, lateral movement, ransomware patterns.' },
  { index: '03', area: 'IDENTITY & ACCESS', size: 'narrow', body: 'Credential stuffing, impossible travel, MFA bypass, admin account abuse.' },
  { index: '04', area: 'NETWORK TRAFFIC', size: 'wide', body: 'C2 communication, DNS tunnelling, data exfiltration, port scans and anomalous flow patterns.' },
  { index: '05', area: 'EMAIL & COLLABORATION', size: 'narrow', body: 'Phishing, BEC, attachment detonation, OAuth abuse, insider sharing anomalies.' },
  { index: '06', area: 'APPLICATION LAYER', size: 'narrow', body: 'WAF events, API anomalies, authentication failures, runtime exploit indicators.' },
  { index: '07', area: 'OT / IOT', size: 'wide', body: 'Industrial protocol anomalies, unauthorised device connections, firmware integrity signals.' },
  { index: '08', area: 'THREAT INTELLIGENCE', size: 'narrow', body: 'IOC enrichment, threat actor TTP mapping, dark web monitoring, vulnerability exploit alerts.' },
];

export const techStack = [
  'Splunk', 'Microsoft Sentinel', 'Elastic SIEM', 'CrowdStrike', 'SentinelOne',
  'Palo Alto Cortex', 'Wazuh', 'Chronicle', 'IBM QRadar', 'Sumo Logic',
  'Defender XDR', 'Datadog Security', 'AWS Security Hub', 'Google SecOps',
];

export const proof = [
  { value: '600+', label: 'Clients protected', accent: 'neon' },
  { value: '13 YRS', label: 'Same SOC analysts', accent: 'blue' },
  { value: '0', label: 'Unresolved criticals shipped', accent: 'blue' },
  { value: '<15', suffix: 'MIN', label: 'Mean triage time', accent: 'neon' },
];
