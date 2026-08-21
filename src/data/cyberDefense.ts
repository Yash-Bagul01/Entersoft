export const hero = {
  eyebrow: 'CYBER DEFENSE OPERATIONS',
  descriptor: 'MDR • DETECTION ENGINEERING • MANAGED STACK',
  headline: {
    before: "Threats don't wait.",
    gradient: "Neither do we.",
    after: '',
  },
  sub: 'MDR and Detection Engineering, delivered through your existing security stack or an Entersoft-managed architecture.',
  ctaPrimary: { label: 'Discuss MDR & Detection Engineering', href: '/#contact' },
  ctaSecondary: { label: 'See Monitored Surfaces', href: '#coverage' },
  heroStats: [
    { value: 'EXISTING OR MANAGED', label: 'Security Stack Delivery' },
    { value: 'DETECTION', label: 'Engineering & Rule Tuning' },
    { value: 'SENIOR-LED', label: 'Triage & Investigation' },
  ],
};

export const alertStream = [
  { time: '00:00:41', severity: 'CRITICAL', event: 'Lateral movement detected — 10.0.1.22 → DC01', status: 'TRIAGING' },
  { time: '00:02:18', severity: 'HIGH', event: 'S3 bucket policy modified — prod-customer-data', status: 'INVESTIGATING' },
  { time: '00:04:03', severity: 'CRITICAL', event: 'Credential stuffing — high-volume failed logins', status: 'CONTAINED' },
  { time: '00:05:57', severity: 'HIGH', event: 'Outbound TLS anomaly — 198.51.100.42:443', status: 'BLOCKED' },
  { time: '00:07:12', severity: 'HIGH', event: 'Admin account created without MFA — prod env', status: 'ESCALATED' },
  { time: '00:09:44', severity: 'MED', event: 'CloudTrail logging disabled — us-east-1', status: 'REMEDIATED' },
  { time: '00:11:30', severity: 'HIGH', event: 'Container escape attempt — k8s pod compromise', status: 'INVESTIGATING' },
  { time: '00:13:55', severity: 'CRITICAL', event: 'Ransomware indicator — file encryption behavior', status: 'CONTAINED' },
];

export const metrics = [
  { value: 'MDR & DETECTION', label: 'Senior-Led Operations', sub: 'Expert triage, threat hunting, and incident investigation guidance', accent: 'blue' },
  { value: 'HYBRID / MANAGED', label: 'Flexible Delivery Model', sub: 'Operates in your existing security stack or an Entersoft-managed architecture', accent: 'neon' },
  { value: 'CUSTOM TUNING', label: 'Detection Engineering', sub: 'Continuously reduce recurring noise through rule tuning', accent: 'blue' },
  { value: 'CROSS-SURFACE', label: 'Telemetry Integration', sub: 'Correlates signals across cloud, identity, endpoint, and network telemetry', accent: 'neon' },
];

export const detectionSources = [
  { name: 'CLOUD', sub: 'AWS / Azure / GCP' },
  { name: 'ENDPOINT', sub: 'EDR / XDR telemetry' },
  { name: 'NETWORK', sub: 'NDR / firewall / flows' },
  { name: 'IDENTITY', sub: 'IAM / AD / Entra' },
  { name: 'APPLICATION', sub: 'APM / WAF / AppSec' },
  { name: 'EMAIL', sub: 'BEC / phishing signals' },
  { name: 'API', sub: 'Gateway / runtime calls' },
  { name: 'THREAT INTEL', sub: 'OSINT / threat feeds' },
];

export const responseSteps = [
  { index: '01', verb: 'SIGNAL INGESTION', ms: 'TELEMETRY', detail: 'Correlation rules and behavioral detection surface anomalies across configured telemetry sources for analyst review.' },
  { index: '02', verb: 'ANALYST TRIAGE', ms: 'VERIFICATION', detail: 'Senior analysts review the alert, verify severity, reduce noise through rule tuning, and confirm incident scope.' },
  { index: '03', verb: 'INVESTIGATION', ms: 'ROOT CAUSE', detail: 'Root cause analysis: identify initial access vector, lateral movement path, and scope of impact.' },
  { index: '04', verb: 'CONTAINMENT', ms: 'GUIDANCE', detail: 'Provide immediate containment guidance: isolate affected host nodes, revoke compromised credentials, and block malicious IPs.' },
  { index: '05', verb: 'REMEDIATION', ms: 'SAME-DAY SUPPORT', detail: 'Same-day containment guidance and remediation support initiated to help customer teams rotate credentials and patch vulnerabilities.' },
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

export const proof: Array<{ value: string; label: string; accent: string; suffix?: string }> = [
  { value: 'MDR', label: 'Detection Engineering Operations', accent: 'neon' },
  { value: 'HYBRID', label: 'Existing Stack or Managed Architecture', accent: 'blue' },
  { value: 'SENIOR', label: 'Analyst Triage & Investigation', accent: 'blue' },
  { value: 'TUNED', label: 'Continuous Noise Reduction', accent: 'neon' },
];
