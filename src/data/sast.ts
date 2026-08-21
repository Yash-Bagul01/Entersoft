export type Service = {
  index: string;
  displayName: string;
  descriptor: string;
  hoverCardHeading: string;
  hoverCardBody: string;
  route: string;
  slug: string;
  legacyName: string;
};

export const hero = {
  badge: "ENPROBE PLATFORM // STATIC ANALYSIS",
  sub: "Integrate fast, context-aware static analysis across your repositories. Find real, exploitable vulnerabilities on every commit and deliver developer-ready fixes in minutes.",
  ctaPrimary: { label: "Book a Live Demo", href: "/#contact" },
  ctaSecondary: { label: "See how it works", href: "#how-it-works" },
};

export const howItWorksSteps = [
  {
    badge: "01",
    badge2: "STEP 1",
    tagLabel: "Connect",
    title: "Connect in one step.",
    body: "Install the EnProbe connector in your GitHub, GitLab, or Azure DevOps repository. No agents to run, no infrastructure to manage.",
  },
  {
    badge: "02",
    badge2: "STEP 2",
    tagLabel: "Scan",
    title: "Every commit. Every file.",
    body: "Runs automatically on every push and pull request. Scans your codebase for OWASP Top 10, CWE/SANS Top 25, and custom rules across 15+ languages.",
  },
  {
    badge: "03",
    badge2: "STEP 3",
    tagLabel: "Fix",
    title: "Fix in the PR, not a ticket.",
    body: "Every finding lands directly in the pull request as an inline comment with ready-made code fixes so developers fix it without leaving their workflow.",
  },
];

export const capabilities = [
  {
    badge: "PRECISION SCANNING",
    title1: "No more false-positive fatigue.",
    title2: "Every flag is real.",
    body: "EnProbe SAST uses taint analysis and data-flow tracking to confirm exploitability before surfacing a finding. If it appears in your report, it is exploitable.",
    stat: { value: "0.01%", label: "recurrence rate on fixed findings" },
  },
  {
    badge: "CI/CD NATIVE",
    title1: "Runs where your code lives.",
    title2: "Gate the build before it ships.",
    body: "Block merges with critical vulnerabilities. Gate production deployments automatically. SAST fits into your existing pipeline without a new tool or a new process.",
    stat: { value: "15+", label: "CI/CD integrations supported" },
  },
  {
    badge: "DEVELOPER EXPERIENCE",
    title1: "Findings developers can act on.",
    title2: "Not reports they ignore.",
    body: "Every finding includes: the vulnerable code snippet, the attack vector, a working exploit example, and a ready-made code fix. Severity rated by business impact, not just CVSS.",
    stat: { value: "< 3 min", label: "average fix time per finding" },
  },
];

export const languageCoverage = {
  badge: "LANGUAGE COVERAGE",
  heading: "Wherever your code is written.",
  body: "EnProbe SAST covers 15 languages out of the box, with full OWASP Top 10 and CWE/SANS Top 25 coverage per language. No configuration needed — coverage is on by default.",
  languages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Go",
    "Java",
    "Rust",
    "C++",
    "C#",
    "Ruby",
    "PHP",
    "Kotlin",
    "Swift",
    "Scala",
    "Dart",
    "HTML/CSS",
  ],
  frameworks: [
    "React",
    "Next.js",
    "Django",
    "Spring Boot",
    "Express",
    "Laravel",
    "Flask",
    "Angular",
    "Vue",
  ],
};

export const aiAnalysis = {
  badge: "AI-ASSISTED ANALYSIS",
  heading: "AI surfaces the pattern. Humans confirm the threat.",
  body: "EnProbe's AI layer correlates findings across the codebase — surfacing cascading vulnerability patterns, recommending fix priorities, and drafting remediation tickets. Every AI output is reviewed by a senior analyst.",
  insights: [
    {
      severity: "CRITICAL",
      id: "INS-204",
      title: "Chained SQL injection + auth bypass",
      desc: "Exploitable chain identified across /api/users and /api/admin",
      codeLabel: "Vulnerable Code & Suggested Fix",
      code: "SELECT * FROM users WHERE id = $1",
    },
    {
      severity: "HIGH",
      id: "INS-109",
      title: "Hardcoded AWS key in CI config",
      desc: "Key active, has S3 full-access on prod bucket",
      codeLabel: "Suggested Secret Storage",
      code: "aws_secret_key = process.env.AWS_SECRET",
    },
    {
      severity: "MEDIUM",
      id: "INS-052",
      title: "Unvalidated redirect — 4 endpoints",
      desc: "Open redirect risk on /oauth/callback, /sso, /logout, /redirect",
      codeLabel: "Safe Redirect Pattern",
      code: "if (isSafeUrl(url)) redirect(url)",
    },
  ],
};

export const comparison = {
  badge: "WHO IS IT FOR",
  heading: "The right tool for every security team.",
  body: "Whether you are a developer pushing code, a DevSecOps engineer managing pipelines, or a CISO reporting to the board, EnProbe SAST delivers tailored value.",
  tabs: [
    {
      label: "Development Teams",
      heading: "Code with confidence.",
      body: "No more security tickets that slow you down. Get real-time feedback in your pull requests and fix vulnerabilities before they reach production.",
      benefits: [
        "Inline PR comments with code fixes",
        "No context switching out of your IDE",
        "Clear explanation of why it is a risk",
      ],
    },
    {
      label: "DevSecOps Teams",
      heading: "Automate security at scale.",
      body: "Integrate static analysis into your CI/CD pipelines in minutes. Set policy gates to block critical vulnerabilities from being merged.",
      benefits: [
        "Native GitHub Actions & GitLab CI support",
        "Configurable policy gates",
        "Custom rule support via YAML",
      ],
    },
    {
      label: "CISOs & Security Leads",
      heading: "Full visibility, zero noise.",
      body: "Get a clear, real-time view of your organization's security posture. Prioritize remediation based on business impact and track progress over time.",
      benefits: [
        "Executive dashboards & reporting",
        "Business impact risk scoring",
        "Compliance mapping (OWASP, PCI-DSS)",
      ],
    },
  ],
};

export const featuresGrid = {
  badge: "FEATURES GRID",
  heading: "Everything your security team needs.",
  body: "Built in. No configuration.",
  features: [
    {
      icon: "Shield",
      title: "Taint Analysis",
      desc: "Tracks untrusted user input from entry point to execution sink to eliminate false positives.",
      status: "available",
    },
    {
      icon: "GitBranch",
      title: "Incremental Scans",
      desc: "Only scans modified files on pull requests for near-instant results.",
      status: "available",
    },
    {
      icon: "Terminal",
      title: "Custom Rules",
      desc: "Write custom YAML rules to scan for organization-specific patterns.",
      status: "available",
    },
    {
      icon: "Cpu",
      title: "Semantic Engine",
      desc: "Goes beyond regex to understand code logic, control flow, and data flow.",
      status: "available",
    },
    {
      icon: "Zap",
      title: "Real-time Alerts",
      desc: "Get instant Slack or email notifications when critical vulnerabilities are found.",
      status: "available",
    },
    {
      icon: "BarChart3",
      title: "Compliance Reports",
      desc: "Generate audit-ready reports for SOC2, PCI-DSS, ISO 27001, and HIPAA.",
      status: "available",
    },
  ],
};

export const faqs = {
  badge: "FAQ",
  heading: "Totally fair to ask.",
  body: "Answers to common questions about EnProbe SAST:",
  items: [
    {
      q: "How does EnProbe SAST achieve such a low false-positive rate?",
      a: "Unlike traditional legacy SAST tools that rely on simple regex pattern matching, EnProbe uses a semantic engine that builds a full Abstract Syntax Tree (AST) and Control Flow Graph (CFG). We then apply advanced taint analysis to track data flow from sources (user input) to sinks (dangerous functions). A finding is only flagged if there is a clear, unvalidated path from a source to a sink, delivering human-validated findings.",
    },
    {
      q: "Does EnProbe SAST store my source code?",
      a: "No. EnProbe SAST runs either locally in your build environment or in a secure, ephemeral container that is destroyed immediately after the scan completes. Your source code is never stored, cached, or used for training models.",
    },
    {
      q: "How long does a typical scan take?",
      a: "Thanks to our incremental scanning engine, we only scan the files that changed in a pull request. A typical PR scan takes less than 30 seconds, while a full repository scan of 100,000 lines of code takes under 2 minutes.",
    },
    {
      q: "Can we write our own custom rules?",
      a: "Yes. EnProbe supports custom rules written in a simple, declarative YAML format. You can define custom sources, sinks, and sanitizers to match your organization's specific security policies and coding standards.",
    },
  ],
};

export const closingCta = {
  heading1: "Find it in the code.",
  heading2: "Before it becomes an incident.",
  sub: "Get a comprehensive static analysis scan of your primary repository. Results delivered in 48 hours with zero commitment.",
  cta: { label: "Request Ephemeral Scan", href: "/#contact" },
  reassurance: "NO COMMITMENT • SENIOR ENGINEER WALKTHROUGH • RESULTS IN 48 HOURS",
};
