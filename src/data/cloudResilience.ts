export interface CloudMetric {
  label: string;
  value: string;
}

export interface CloudCrossLink {
  text: string;
  targetService: string;
  targetLabel: string;
  targetHref: string;
}

export interface CloudResilienceOffering {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  headline: string;
  sub: string;
  deliveryBadge: string;
  deliveryModel: string;
  deliveryType: 'fixed' | 'ongoing' | 'managed' | 'hybrid' | 'platform';
  description: string;
  explanation?: string;
  deliveryOptions?: {
    title: string;
    description: string;
  }[];
  scope: string[];
  deliverables: string[];
  inScope: string[];
  notIncluded: CloudCrossLink[];
  metrics: CloudMetric[];
  cta: {
    label: string;
    href: string;
  };
}

export interface CloudResilienceHubData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  metaTitle: string;
  metaDescription: string;
  cards: {
    index: string;
    slug: string;
    title: string;
    description: string;
    delivery: string;
    deliveryType: 'fixed' | 'ongoing' | 'managed' | 'hybrid' | 'platform';
    route: string;
    badge: string;
  }[];
}

export const cloudResilienceHubData: CloudResilienceHubData = {
  eyebrow: 'CLOUD RESILIENCE',
  headline: 'Which cloud security outcome are you buying?',
  subheadline: 'Cloud security is not one service. Choose the engagement that matches where you are.',
  metaTitle: 'Cloud Resilience | Cloud Security, Detection & Posture Management | Entersoft',
  metaDescription:
    'Structurally modular cloud security services: Cloud Security Assessment, Cloud & Identity Penetration Testing, Cloud Posture Management (EnProbe), Managed Cloud Detection & Response, and Kubernetes/IaC Security.',
  cards: [
    {
      index: '01',
      slug: 'assessment',
      title: 'Cloud Security Assessment',
      description: 'A one-time expert review of your cloud configuration, IAM, and exposure surface.',
      delivery: 'Fixed engagement · 2–4 weeks · EnProbe-assisted',
      deliveryType: 'fixed',
      route: '/services/cloud-resilience/assessment',
      badge: 'FIXED ENGAGEMENT',
    },
    {
      index: '02',
      slug: 'penetration-testing',
      title: 'Cloud & Identity Penetration Testing',
      description: 'Active exploitation of misconfigurations, IAM flaws, and cloud-native attack paths.',
      delivery: 'Fixed engagement · 1–3 weeks · Expert-led',
      deliveryType: 'fixed',
      route: '/services/cloud-resilience/penetration-testing',
      badge: 'ADVERSARIAL TESTING',
    },
    {
      index: '03',
      slug: 'posture-management',
      title: 'Cloud Posture & Exposure Management',
      description: 'Continuous misconfiguration detection and exposure tracking via EnProbe.',
      delivery: 'Ongoing · EnProbe platform subscription',
      deliveryType: 'platform',
      route: '/services/cloud-resilience/posture-management',
      badge: 'ENPROBE PLATFORM',
    },
    {
      index: '04',
      slug: 'managed-detection',
      title: 'Managed Cloud Detection & Response',
      description: '24/7 threat monitoring, alert triage, and response for your cloud environment.',
      delivery: 'Ongoing managed service · Entersoft-operated or hybrid',
      deliveryType: 'managed',
      route: '/services/cloud-resilience/managed-detection',
      badge: 'MANAGED SERVICE (MDR)',
    },
    {
      index: '05',
      slug: 'containers-iac',
      title: 'Kubernetes, Container & IaC Security',
      description: 'Security review of container workloads, Kubernetes configurations, and infrastructure-as-code.',
      delivery: 'Fixed engagement or continuous · EnProbe-assisted',
      deliveryType: 'hybrid',
      route: '/services/cloud-resilience/containers-iac',
      badge: 'WORKLOAD & CODE',
    },
  ],
};

export const cloudOfferings: Record<string, CloudResilienceOffering> = {
  assessment: {
    slug: 'assessment',
    number: '01',
    title: 'Cloud Security Assessment',
    shortTitle: 'Security Assessment',
    eyebrow: 'CLOUD RESILIENCE · ASSESSMENT',
    headline: 'Know exactly what your cloud exposes.',
    sub: 'A structured expert review of your AWS, Azure, or GCP environment — covering configuration, IAM, network exposure, and secrets — delivered as a prioritised remediation roadmap.',
    deliveryBadge: 'Fixed engagement · Expert-led · EnProbe-assisted',
    deliveryModel: 'Fixed engagement · 2–4 weeks · Point-in-time snapshot with remediation roadmap',
    deliveryType: 'fixed',
    description:
      'Evaluate your multi-cloud infrastructure against industry standards, identify high-risk exposure points, and establish a clear engineering roadmap to resolve misconfigurations before they are exploited.',
    scope: [
      'Cloud configuration review against CIS Benchmarks and industry baselines',
      'IAM audit: roles, policies, cross-account trust relationships, and privilege sprawl',
      'Network exposure mapping: open ports, public-facing resources, security group rules',
      'Secrets and credentials detection in config files, metadata, and environment variables',
      'S3 / Blob / GCS storage exposure analysis and public access permission validation',
      'Logging and monitoring coverage gap analysis across CloudTrail, Azure Monitor, and GCP Audit',
    ],
    deliverables: [
      'Executive summary with overall cloud risk posture score',
      'Technical findings report with CVSS and demonstrable business impact ratings',
      'Prioritised remediation roadmap with infrastructure-as-code fix templates',
      'Re-assessment scope definition for verification of remediation',
      'Evidence package structured for compliance mapping (ISO 27001, CIS, RBI, SOC 2)',
    ],
    inScope: [
      'AWS, Azure, and GCP multi-cloud accounts and subscriptions',
      'Identity and Access Management (IAM) role architecture and trust policies',
      'Object storage access control lists (ACLs) and bucket policies',
      'Ingress/egress security groups, NACLs, and virtual network topology',
      'Cloud audit logging configuration and retention baselines',
    ],
    notIncluded: [
      {
        text: 'Active exploitation of discovered misconfigurations',
        targetService: 'penetration-testing',
        targetLabel: 'Cloud & Identity Pen Testing',
        targetHref: '/services/cloud-resilience/penetration-testing',
      },
      {
        text: 'Ongoing 24/7 threat monitoring or real-time alerting',
        targetService: 'managed-detection',
        targetLabel: 'Managed Cloud Detection',
        targetHref: '/services/cloud-resilience/managed-detection',
      },
      {
        text: 'Continuous real-time posture drift tracking via platform',
        targetService: 'posture-management',
        targetLabel: 'EnProbe Posture Management',
        targetHref: '/services/cloud-resilience/posture-management',
      },
    ],
    metrics: [
      { label: 'Typical Duration', value: '2–4 Wks' },
      { label: 'Cloud Providers', value: 'AWS · Azure · GCP' },
      { label: 'Delivery Model', value: 'Fixed Engagement' },
      { label: 'Compliance Mapping', value: 'ISO 27001 · CIS · CERT-In · RBI' },
    ],
    cta: {
      label: 'Request a Cloud Assessment',
      href: '/#contact',
    },
  },

  'penetration-testing': {
    slug: 'penetration-testing',
    number: '02',
    title: 'Cloud & Identity Penetration Testing',
    shortTitle: 'Cloud & Identity Pen Testing',
    eyebrow: 'CLOUD RESILIENCE · PENETRATION TESTING',
    headline: 'Prove the misconfiguration is exploitable.',
    sub: 'Active adversarial testing of your cloud environment, IAM configuration, and identity federation — going beyond configuration review to demonstrate real attack paths and business impact.',
    deliveryBadge: 'Fixed engagement · Expert-led adversarial testing',
    deliveryModel: 'Fixed engagement · 1–3 weeks · Black-box, grey-box or white-box methodology',
    deliveryType: 'fixed',
    description:
      'Simulate sophisticated offensive operations against your cloud perimeter and internal trust boundaries to demonstrate how attackers pivot from initial misconfigurations into privileged control planes.',
    scope: [
      'Cloud misconfiguration exploitation and privilege escalation attack chains',
      'IAM role assumption chaining and cross-account privilege escalation validation',
      'Identity federation attack paths: SSO misconfiguration, OIDC/SAML claim abuse',
      'Lateral movement across VPC peering, transit gateways, and shared subnets',
      'Storage access-control bypass and sensitive data exfiltration proof-of-concepts',
      'Metadata service exploitation (SSRF to IMDSv1/v2 token extraction)',
      'Serverless function execution abuse and container escape-path testing',
      'Cloud API, control plane, and management-plane attack-surface testing',
    ],
    deliverables: [
      'Executive and technical attack narrative detailing execution paths',
      'Step-by-step exploitation chains and pivot maps',
      'Proof-of-concept (PoC) scripts and payloads for verified findings',
      'Risk-rated findings with demonstrable business impact metrics',
      'Actionable engineering remediation and IAM boundary guidance',
      'Post-remediation re-test verification and sign-off report',
    ],
    inScope: [
      'Adversarial validation of cloud infrastructure and API endpoints',
      'IAM trust boundaries, temporary token harvesting, and privilege chains',
      'Metadata service access (IMDS) and serverless function boundaries',
      'Cloud-native lateral movement and data egress validation',
    ],
    notIncluded: [
      {
        text: 'Configuration-only compliance gap audits',
        targetService: 'assessment',
        targetLabel: 'Cloud Security Assessment',
        targetHref: '/services/cloud-resilience/assessment',
      },
      {
        text: '24/7 runtime threat triage and incident response',
        targetService: 'managed-detection',
        targetLabel: 'Managed Cloud Detection',
        targetHref: '/services/cloud-resilience/managed-detection',
      },
      {
        text: 'Continuous automated configuration drift monitoring',
        targetService: 'posture-management',
        targetLabel: 'EnProbe Posture Management',
        targetHref: '/services/cloud-resilience/posture-management',
      },
    ],
    metrics: [
      { label: 'Typical Duration', value: '1–3 Wks' },
      { label: 'Methodology', value: 'Black · Grey · White Box' },
      { label: 'Delivery Model', value: 'Fixed Engagement' },
      { label: 'Assurance Team', value: 'Senior Offensive Specialists' },
    ],
    cta: {
      label: 'Request Cloud Pen Testing',
      href: '/#contact',
    },
  },

  'posture-management': {
    slug: 'posture-management',
    number: '03',
    title: 'Cloud Posture & Exposure Management',
    shortTitle: 'Posture Management (EnProbe)',
    eyebrow: 'CLOUD RESILIENCE · ENPROBE PLATFORM',
    headline: 'Misconfiguration detected. Continuously.',
    sub: 'EnProbe connects to your AWS, Azure, and GCP environments and monitors cloud configuration, IAM permissions, and network exposure in real time — detecting drift and surfacing exposure before attackers do.',
    deliveryBadge: 'Ongoing · EnProbe platform subscription · Continuous',
    deliveryModel: 'Ongoing platform subscription · Real-time telemetry · Not a one-time assessment',
    deliveryType: 'platform',
    explanation:
      'EnProbe is Entersoft’s cloud-native security posture platform. It connects via secure read-only APIs and continuously evaluates configurations against CIS Benchmarks, regulatory mandates (CERT-In, RBI, ISO 27001), and custom environment-specific security rules.',
    description:
      'Replace manual compliance spreadsheets with continuous automated telemetry. EnProbe streams real-time posture analytics, alerts your engineering team to permission drift, and maintains permanent audit readiness.',
    scope: [
      'Continuous misconfiguration detection across AWS, Azure, and GCP',
      'Real-time IAM permission drift: new roles, policy modifications, over-permissive access',
      'Network exposure alerting on open ports, security group changes, and public IP bindings',
      'Secrets and credential exposure detection in cloud configuration and serverless variables',
      'Multi-cloud asset inventory discovery and dependency relationship mapping',
      'Continuous compliance posture tracking mapped to CIS, ISO 27001, and RBI frameworks',
      'Configuration drift detection alerting before audit cycles begin',
    ],
    deliverables: [
      'Live EnProbe cloud posture and risk analytics dashboard',
      'Real-time configuration drift alerts via Slack, Microsoft Teams, and Webhooks',
      'IAM privilege exposure heatmaps and automated least-privilege recommendations',
      'Continuous compliance readiness scorecards and evidence export bundles',
    ],
    inScope: [
      'Read-only multi-cloud API connectors (AWS IAM Roles, Azure Service Principals, GCP Service Accounts)',
      'Automated drift detection across compute, storage, serverless, and IAM',
      'Asset inventory and exposure scoring across all connected environments',
    ],
    notIncluded: [
      {
        text: 'Active adversarial exploitation or manual penetration testing',
        targetService: 'penetration-testing',
        targetLabel: 'Cloud & Identity Pen Testing',
        targetHref: '/services/cloud-resilience/penetration-testing',
      },
      {
        text: 'Human-operated 24/7 MDR threat investigation and triage',
        targetService: 'managed-detection',
        targetLabel: 'Managed Cloud Detection',
        targetHref: '/services/cloud-resilience/managed-detection',
      },
      {
        text: 'One-time point-in-time consultancy audit report',
        targetService: 'assessment',
        targetLabel: 'Cloud Security Assessment',
        targetHref: '/services/cloud-resilience/assessment',
      },
    ],
    metrics: [
      { label: 'Delivery Model', value: 'Ongoing Platform' },
      { label: 'Core Platform', value: 'EnProbe Engine' },
      { label: 'Cloud Coverage', value: 'AWS · Azure · GCP' },
      { label: 'Update Frequency', value: 'Real-Time Telemetry' },
    ],
    cta: {
      label: 'See EnProbe in Action',
      href: 'http://enprobe.io/',
    },
  },

  'managed-detection': {
    slug: 'managed-detection',
    number: '04',
    title: 'Managed Cloud Detection & Response',
    shortTitle: 'Managed Cloud Detection (MDR)',
    eyebrow: 'CLOUD RESILIENCE · MDR OPERATIONS',
    headline: 'Threats in your cloud, triaged by people.',
    sub: 'Cloud-specific threat monitoring, alert triage, investigation, and response — operated by Entersoft analysts using your existing SIEM or an Entersoft-managed detection stack.',
    deliveryBadge: 'Ongoing managed service · Entersoft-operated or hybrid',
    deliveryModel: 'Ongoing managed service · Hybrid (your SIEM + Entersoft analysts) or Entersoft-operated stack',
    deliveryType: 'managed',
    description:
      'Augment your security team with experienced cloud defense analysts who investigate suspicious API calls, abnormal identity assumptions, and control plane anomalies 24/7.',
    deliveryOptions: [
      {
        title: 'HYBRID MODEL',
        description: 'Your existing SIEM or cloud-native logging feeds into Entersoft analyst coverage. Your tools, our people.',
      },
      {
        title: 'ENTERSOFT-MANAGED',
        description: 'Entersoft deploys and operates the detection pipeline. Turnkey SecOps coverage without internal infrastructure overhead.',
      },
    ],
    scope: [
      'Cloud audit log ingestion: AWS CloudTrail, Azure Activity Log, GCP Audit Logs, VPC Flow Logs',
      '24/7 alert triage, correlation, and false-positive suppression by senior analysts',
      'High-fidelity cloud threat investigation and root-cause analysis',
      'Coordinated incident containment guidance with engineering liaison',
      'Custom cloud detection engineering and continuous rule tuning',
      'Monthly threat landscape reporting and posture improvement reviews',
    ],
    deliverables: [
      '24/7 real-time security alerting on verified, high-confidence cloud incidents',
      'Comprehensive incident investigation reports with forensic evidence timelines',
      'Step-by-step containment and remediation playbooks for cloud engineering',
      'Monthly SecOps threat intelligence and detection rule performance reviews',
    ],
    inScope: [
      'Cloud control-plane, management-plane, and IAM access log analysis',
      'Detection of unauthorized API activity, credential abuse, and unusual regional deployments',
      'Human-driven alert triage and incident escalation',
    ],
    notIncluded: [
      {
        text: 'Autonomous containment actions without explicit client authorization',
        targetService: 'managed-detection',
        targetLabel: 'Client-Authorized Containment Only',
        targetHref: '/services/cloud-resilience/managed-detection',
      },
      {
        text: 'Endpoint and corporate email monitoring (covered under Cyber Defense)',
        targetService: 'siem',
        targetLabel: 'Cyber Defense Operations',
        targetHref: '/services/siem',
      },
      {
        text: 'One-time configuration and IAM gap review',
        targetService: 'assessment',
        targetLabel: 'Cloud Security Assessment',
        targetHref: '/services/cloud-resilience/assessment',
      },
    ],
    metrics: [
      { label: 'Delivery Model', value: 'Ongoing Managed Service' },
      { label: 'Deployment Modes', value: 'Hybrid · Entersoft-Managed' },
      { label: 'Cloud Coverage', value: 'AWS · Azure · GCP' },
      { label: 'Log Sources', value: 'CloudTrail · Azure Mon · GCP Audit' },
    ],
    cta: {
      label: 'Discuss Managed Cloud Detection',
      href: '/#contact',
    },
  },

  'containers-iac': {
    slug: 'containers-iac',
    number: '05',
    title: 'Kubernetes, Container & IaC Security',
    shortTitle: 'Containers, K8s & IaC Security',
    eyebrow: 'CLOUD RESILIENCE · WORKLOADS & INFRASTRUCTURE CODE',
    headline: 'Security from the workload to the infrastructure definition.',
    sub: 'Security review of container workloads, Kubernetes configurations, and infrastructure-as-code templates — finding vulnerabilities before workloads are deployed and before misconfigurations become incidents.',
    deliveryBadge: 'Fixed engagement or ongoing · EnProbe-assisted',
    deliveryModel: 'Fixed engagement (point-in-time review) or ongoing (continuous IaC scanning via EnProbe). Specify at scoping.',
    deliveryType: 'hybrid',
    description:
      'Harden your container supply chain and infrastructure definitions from Git commit to Kubernetes runtime. Eliminate vulnerable base images, excessive RBAC permissions, and insecure Terraform configs.',
    scope: [
      'Kubernetes RBAC review, network policies, admission controllers, and Pod Security Standards (PSS)',
      'Container image vulnerability scanning (OS packages and application language dependencies)',
      'Dockerfile security: rootless execution, capability dropping, and secret leakage prevention',
      'Infrastructure-as-Code auditing: Terraform, CloudFormation, Pulumi, Ansible, and Helm charts',
      'Runtime container posture, Kubernetes secrets management, and Vault/CSI driver integration',
      'Software supply-chain security: base-image provenance, image signing, and SBOM verification',
    ],
    deliverables: [
      'Kubernetes cluster hardening report and RBAC privilege exposure matrix',
      'Container image vulnerability register with prioritised patch guidance',
      'IaC static analysis reports with automated pull-request remediation templates',
      'Software Bill of Materials (SBOM) and supply-chain dependency risk analysis',
    ],
    inScope: [
      'Kubernetes cluster configurations, manifests, Helm charts, and admission controllers',
      'Container registries, base image Dockerfiles, and runtime workload isolation',
      'Infrastructure-as-Code repositories (Terraform, CloudFormation, Pulumi, Ansible)',
    ],
    notIncluded: [
      {
        text: 'Deep application-level business logic testing',
        targetService: 'appsec',
        targetLabel: 'Application Assurance',
        targetHref: '/services/appsec',
      },
      {
        text: 'Active Kubernetes cluster penetration testing and exploitation',
        targetService: 'penetration-testing',
        targetLabel: 'Cloud & Identity Pen Testing',
        targetHref: '/services/cloud-resilience/penetration-testing',
      },
      {
        text: 'Broad cloud platform configuration outside container scope',
        targetService: 'assessment',
        targetLabel: 'Cloud Security Assessment',
        targetHref: '/services/cloud-resilience/assessment',
      },
    ],
    metrics: [
      { label: 'Delivery Model', value: 'Fixed or Ongoing' },
      { label: 'IaC Frameworks', value: 'Terraform · CF · Helm · Pulumi' },
      { label: 'Workloads', value: 'Kubernetes · Docker · EKS · AKS · GKE' },
      { label: 'Platform Assist', value: 'EnProbe-Assisted' },
    ],
    cta: {
      label: 'Request Container Security Review',
      href: '/#contact',
    },
  },
};

export const allCloudOfferingsList = [
  { slug: 'assessment', label: 'Cloud Security Assessment', route: '/services/cloud-resilience/assessment' },
  { slug: 'penetration-testing', label: 'Cloud & Identity Pen Testing', route: '/services/cloud-resilience/penetration-testing' },
  { slug: 'posture-management', label: 'Posture Management (EnProbe)', route: '/services/cloud-resilience/posture-management' },
  { slug: 'managed-detection', label: 'Managed Cloud Detection & Response', route: '/services/cloud-resilience/managed-detection' },
  { slug: 'containers-iac', label: 'Containers, K8s & IaC Security', route: '/services/cloud-resilience/containers-iac' },
];
