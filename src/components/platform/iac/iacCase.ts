import type { ExoApeCase } from "@/components/platform/exoape/types";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IAC_CASE: ExoApeCase = {
  id: "iac",
  heroTitle: "EnProbe IaC",
  heroSubtitle: "Infrastructure as Code Security",
  intro:
    "EnProbe IaC reads Terraform, CloudFormation, Helm and Kubernetes manifests the way the cloud will execute them — and stops overly open roles, unencrypted stores and drifted state before a single resource is provisioned.",
  ctaLabel: "Book a briefing",
  ctaHref: "/contact",
  meta: [
    { label: "Capability", values: ["Misconfiguration scanning"] },
    { label: "Languages", values: ["HCL, YAML, JSON"] },
    { label: "Policy", values: ["OPA / Rego guardrails"] },
    { label: "Gate", values: ["CI/CD pull-request fail"] },
  ],
  images: {
    hero: u("photo-1759604218664-f4f714869555", 2400),
    heroAlt: "Modern glass building illuminated at night",
    wide: u("photo-1764083292882-fd28776d0022", 2400),
    wideAlt: "Geometric glass skyscraper facade",
    beliefs: u("photo-1672023726187-032edab1c417", 2400),
    beliefsAlt: "Long exposure of a train moving through a tunnel",
    statement: u("photo-1630107753878-866b364cdbd9", 2000),
    statementAlt: "Black and white high-rise facade",
    mockup: u("photo-1680992044138-ce4864c2b962", 900),
    mockupAlt: "Close-up of a server in an equipment room",
    next: u("photo-1707730376818-a7a02fe896d5", 2400),
    nextAlt: "Dark abstract curved form",
    collage: [
      {
        src: u("photo-1759604218664-f4f714869555", 3200),
        alt: "Modern glass building illuminated at night",
        tag: "01 / IAC POLICY ENGINE",
        headline: "Pre-Provisioning Shift-Left Security",
        metric: "100% Policy Enforcement",
        desc: "Parses Terraform HCL, CloudFormation, Helm, and K8s manifests before cloud resources are provisioned.",
      },
      {
        src: u("photo-1558494949-ef010cbdcc31"),
        alt: "Data-centre corridor with running equipment",
        tag: "02 / PARSER ENGINE",
        headline: "Multi-IaC Manifest AST Parsing",
        metric: "HCL, YAML & JSON Native",
        desc: "Parses variables, modules, and cross-resource dependencies as cloud providers consume them.",
      },
      {
        src: u("photo-1781007277509-b8cadd30cb45"),
        alt: "Curved building facade against a dramatic sky",
        tag: "03 / OPA & REGO POLICY",
        headline: "Custom Enterprise Guardrails",
        metric: "CIS & NIST Compliance",
        desc: "Evaluates templates against OPA/Rego policies, catching overly permissive IAM roles and unencrypted S3 buckets.",
      },
      {
        src: u("photo-1680691257251-5fead813b73e"),
        alt: "Network switch with cabled ports",
        tag: "04 / CLOUD DRIFT DETECTION",
        headline: "Real-Time Infrastructure State Sync",
        metric: "Zero State Drift",
        desc: "Compares declared IaC templates with live AWS/Azure/GCP production state, exposing hidden uncommitted drift.",
      },
      {
        src: u("photo-1606814540563-5c02d62fd409"),
        alt: "Blue light in a darkened room",
        tag: "05 / SECURE DEFAULTS ENFORCER",
        headline: "Automated Fix Remediation",
        metric: "Instant Pull Request Code Fixes",
        desc: "Generates exact HCL and YAML code snippets directly inside pull request comments for 1-click remediation.",
      },
      {
        src: u("photo-1663932210347-164a05ed0ccd"),
        alt: "Industrial blue-and-black machine housing",
        tag: "06 / CI/CD HARD GATING",
        headline: "Blocking Non-Compliant Merges",
        metric: "0% Production Misconfigurations",
        desc: "Fails GitHub Actions, GitLab CI, and Terraform Cloud runs automatically when high-severity policy violations land.",
      },
      {
        src: u("photo-1771442062904-44dddcea7fcf"),
        alt: "Office building windows illuminated at night",
        tag: "07 / CONTINUOUS COMPLIANCE",
        headline: "Continuous Cloud Governance",
        metric: "24/7 Audit Readiness",
        desc: "Maintains a continuous record of IaC security checks across multi-account Kubernetes and cloud environments.",
      },
    ],
  },
  objective: {
    lines: ["Before", "the", "provision"],
    body: "Cloud misconfiguration is cheaper to prevent in a pull request than to hunt after the account is live. The objective was an engine that parses the template as the provider will, evaluates it against the baselines you actually run, and fails the merge before IAM, storage or the network is opened too far.",
  },
  solution: {
    lines: ["The template, judged", "as the cloud will run it"],
    left: "Manifests in HCL, YAML and JSON are parsed in the pipeline. Overly permissive IAM, unencrypted stores, open security groups and exposed Kubernetes workloads are raised as findings against CIS, NIST and the baselines you define in OPA.",
    right:
      "Live cloud state is compared with what the templates declare, so drift cannot hide behind a green pipeline. Non-compliant pull requests fail at the gate, and the ticket arrives with the HCL or YAML snippet that closes the gap.",
  },
  beliefs: {
    label: "The gate, in three moves",
    items: [
      { word: "Parse", note: "As the provider will", align: "right" },
      { word: "Policy", note: "Your baselines, in code", align: "left" },
      { word: "Block", note: "Before it is live", align: "right" },
    ],
  },
  anticipate: {
    marker: "Continuity",
    lines: ["Anticipating the", "next apply"],
    body: "IaC security is not a one-off audit of last quarter's templates. It sits on every plan and apply, so the next open security group is caught in the pull request — not in the account that already shipped.",
    cards: [
      {
        index: "01",
        label: "The parser",
        title: "HCL, YAML and JSON as the cloud reads them.",
        image: u("photo-1558494949-ef010cbdcc31", 1200),
        alt: "Data-centre corridor with running equipment",
      },
      {
        index: "02",
        label: "The policy",
        title: "OPA and Rego, not a spreadsheet of exceptions.",
        image: u("photo-1680691257251-5fead813b73e", 1200),
        alt: "Network switch with cabled ports",
      },
      {
        index: "03",
        label: "The gate",
        title: "The merge fails before the resource exists.",
        image: u("photo-1663932210347-164a05ed0ccd", 1200),
        alt: "Industrial machine housing",
      },
    ],
  },
  railTitle: "Precision in every plan",
  stages: [
    {
      index: "01",
      title: "Manifest parsing",
      body: "Terraform, CloudFormation, Helm and Kubernetes templates are parsed in CI/CD as HCL, YAML and JSON — the same shapes the provider will consume.",
      image: u("photo-1643175517006-4a1bd8ad37cb", 1400),
      alt: "Tall building with a dense grid of windows",
    },
    {
      index: "02",
      title: "Policy engine evaluation",
      body: "Templates are evaluated against CIS Benchmarks, NIST and the enterprise guardrails expressed in OPA and Rego, including custom corporate baselines.",
      image: u("photo-1712567604499-08f207054260", 1400),
      alt: "High-rise glass facade looking up",
    },
    {
      index: "03",
      title: "Deployment gatekeeping",
      body: "Non-compliant pull requests fail before infrastructure is provisioned in live cloud accounts, so open roles and unencrypted stores never reach apply.",
      image: u("photo-1544197150-b99a580bb7a8", 1400),
      alt: "Blue network cabling",
    },
    {
      index: "04",
      title: "Drift prevention",
      body: "Declared state is compared with live cloud runtime so configuration drift cannot sit behind a pipeline that only looks at the template.",
      image: u("photo-1691435828932-911a7801adfb", 1400),
      alt: "Network cabling connected into a chassis",
    },
    {
      index: "05",
      title: "Remediation snippets",
      body: "Findings arrive with the exact HCL or YAML required to close the misconfiguration, so the fix is a patch, not a research project.",
      image: u("photo-1782338937828-d6c1dab06387", 1400),
      alt: "Circuit board under a green light",
    },
  ],
  specs: [
    {
      label: "Surface",
      value: "Pre-deploy",
      body: "Terraform, CloudFormation, Helm and Kubernetes manifests, scanned before the account changes.",
    },
    {
      label: "Policy",
      value: "OPA / Rego",
      body: "CIS, NIST and the corporate baselines you encode — evaluated on every plan.",
    },
    {
      label: "Drift",
      value: "Declared vs live",
      body: "Template state is compared with runtime cloud configuration so silent change cannot hide.",
    },
    {
      label: "Gate",
      value: "Merge-blocking",
      body: "Non-compliant pull requests fail in CI/CD with a snippet that closes the finding.",
    },
  ],
  partnershipLines: ["Stellar", "partnership"],
  quote: {
    text: "Pre-deployment validation only earns its keep when it speaks the language of the template and the language of the cloud account. EnProbe IaC was built so those two conversations happen in the same pull request.",
    name: "EnProbe practice",
    role: "Infrastructure as Code security · Scan Code cluster",
    initials: "IaC",
  },
  recognition: [
    { name: "CREST", detail: "Registered penetration testing services" },
    { name: "CERT-In", detail: "Empanelled information security auditing organisation" },
    { name: "ISO/IEC 27001", detail: "Certified information security management system" },
    { name: "GDPR", detail: "Validated data processing controls" },
  ],
  mockupCaption: "The snippet lands in the ticket.",
  floatNote: { label: "1. Plan phase", title: "You declare the estate. We keep it closed." },
  faqs: [
    {
      question: "Which Infrastructure as Code frameworks and cloud providers are supported?",
      answer:
        "EnProbe IaC provides comprehensive coverage across Terraform (HCL), OpenTofu, Kubernetes manifests (YAML/JSON), Helm charts, AWS CloudFormation, AWS CDK, Azure Resource Manager (ARM), and Azure Bicep across AWS, Azure, Google Cloud, and on-premises Kubernetes clusters.",
    },
    {
      question: "How does EnProbe AST parsing differ from traditional regex linters?",
      answer:
        "Traditional linters rely on simplistic regex pattern matching, generating massive volumes of noisy false positives. EnProbe constructs full Abstract Syntax Trees (AST) and graph-based resource dependency maps, evaluating how security groups, IAM roles, and storage buckets interact in realistic runtime topologies.",
    },
    {
      question: "Can we write and enforce custom organizational security guardrails?",
      answer:
        "Yes. In addition to 350+ pre-engineered policies mapped to CIS Benchmarks, NIST 800-53, SOC 2, and PCI-DSS, you can define custom Open Policy Agent (OPA) Rego rules to enforce organization-specific naming standards, mandatory encryption keys, or VPC isolation constraints.",
    },
    {
      question: "Does EnProbe require direct access to our live cloud credentials?",
      answer:
        "Pre-deployment IaC scanning requires zero cloud credentials and zero agents—it runs entirely inside your existing CI/CD runners (GitHub Actions, GitLab CI, Jenkins) or local developer IDEs. Optional read-only CSPM connectors can be enabled if you wish to reconcile declared state against live cloud drift.",
    },
    {
      question: "How does EnProbe generate automated remediation pull requests?",
      answer:
        "When a security violation is detected, EnProbe automatically synthesizes the minimal, non-breaking HCL or YAML code patch required to bring the resource into compliance. Developers can apply fixes with a single click or merge automated remediation PRs directly.",
    },
  ],
  next: {
    href: "/platform/container",
    title: "Containers",
    subtitle: "Container image & registry security",
  },
};
