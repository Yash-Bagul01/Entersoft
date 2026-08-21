export const hero = {
  eyebrow: 'CLOUD RESILIENCE',
  line1: 'Every corner of your cloud.',
  line2: 'Nothing hidden.',
  sub: 'Continuous. Multi-cloud. Expert-validated. Modular cloud posture, adversarial penetration testing, and managed threat detection across AWS, Azure, and GCP.',
};

export const scenes = [
  {
    id: 'assessment',
    label: '01 / ASSESSMENT',
    statement: 'Thousands of resources. We map and audit every one.',
    proof: '100% asset & configuration coverage before testing begins.',
    detail: 'AWS, Azure, GCP — every instance, bucket, role, security group, and secret evaluated against CIS Benchmarks, ISO 27001, CERT-In, and RBI baselines.',
  },
  {
    id: 'penetration-testing',
    label: '02 / PENETRATION TESTING',
    statement: 'Prove the misconfiguration is exploitable.',
    proof: 'Deterministic PoC attack paths and privilege escalation chains.',
    detail: 'Active adversarial validation beyond static checklists. IAM role assumption chaining, metadata SSRF token extraction, and cross-account privilege escalation.',
  },
  {
    id: 'posture-management',
    label: '03 / POSTURE MANAGEMENT',
    statement: 'Misconfiguration detected. Continuously via EnProbe.',
    proof: 'Real-time telemetry and automated drift detection.',
    detail: 'EnProbe connects via read-only APIs across AWS, Azure, and GCP. Continuous IAM over-privilege heatmaps, multi-cloud asset inventory, and real-time drift alerting.',
  },
  {
    id: 'managed-detection',
    label: '04 / MANAGED DETECTION (MDR)',
    statement: 'Threats in your cloud, triaged by people 24/7.',
    proof: '<15 min mean triage time on confirmed cloud incidents.',
    detail: 'Hybrid (your SIEM) or Entersoft-operated stack. 24/7 senior analyst coverage, CloudTrail/Azure/GCP audit log correlation, and containment engineering playbooks.',
  },
  {
    id: 'containers-iac',
    label: '05 / CONTAINERS & IAC',
    statement: 'Security from the workload to infrastructure code.',
    proof: 'Zero unvetted base images & hardened Terraform/Helm configs.',
    detail: 'Kubernetes RBAC, admission controllers, Docker container scanning, Terraform/Pulumi/Helm IaC static audit, and software supply chain SBOM verification.',
  },
];

export const providers = ['AWS', 'AZURE', 'GCP'];

export const evidence = [
  { value: '600+', label: 'Cloud environments secured' },
  { value: '5', label: 'Modular practice offerings' },
  { value: '100%', label: 'AWS · Azure · GCP coverage' },
  { value: '<15 MIN', label: 'Mean alert triage time' },
];
