import { ROUTES } from "@/config/routes";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export type SolutionLandingSlug =
  | "api-discovery"
  | "ai-bom"
  | "manage-vulnerabilities"
  | "automate-security-workflows"
  | "track-appsec-kpis"
  | "manage-open-source-risk";

export type SolutionLanding = {
  slug: SolutionLandingSlug;
  href: string;
  navName: string;
  navDesc: string;
  kicker: string;
  heroTitle: string;
  heroBody: string;
  problemTitle: string;
  problemLead: string;
  problems: { title: string; body: string }[];
  features: { kicker: string; title: string; body: string; points: string[] }[];
  detectTitle: string;
  detectLead: string;
  detections: { title: string; body: string }[];
  ctaTitle: string;
  ctaBody: string;
  related: { label: string; href: string }[];
  metadataTitle: string;
  metadataDescription: string;
  reel: {
    number: string;
    category: string;
    coverBg: string;
    textColor: string;
    accentColor: string;
    symbol: string;
    symbolSub: string;
    image: string;
  };
};

export const SOLUTION_LANDINGS: SolutionLanding[] = [
  {
    slug: "api-discovery",
    href: ROUTES.solutionsPages.apiDiscovery,
    navName: "API Discovery",
    navDesc: "Find and test the APIs you actually expose",
    kicker: "API Discovery",
    heroTitle: "See every API your software actually exposes",
    heroBody:
      "Entersoft maps documented, shadow and stale APIs across applications, then tests REST, GraphQL and gRPC endpoints for authorization and OWASP API Top 10 risk. Discovery and testing stay on the same engagement path.",
    problemTitle: "Do you know which APIs are in production?",
    problemLead:
      "APIs now carry business logic, identities and customer data. Most teams only secure the endpoints that appear in a spec.",
    problems: [
      {
        title: "Specs drift from live traffic",
        body: "Gateways, microservices and partner integrations add routes faster than OpenAPI files are updated. Security reviews the catalogue. Attackers probe what is actually reachable.",
      },
      {
        title: "Shadow and zombie APIs stay untested",
        body: "Deprecated versions, internal admin routes and forgotten webhooks remain reachable. They rarely inherit the same authentication, rate limits or schema checks as the public API.",
      },
      {
        title: "Authorization bugs hide in object access",
        body: "BOLA and BFLA issues do not show up as scanner noise. They appear when one identity can read or change another object's data through a legitimate endpoint.",
      },
    ],
    features: [
      {
        kicker: "Inventory",
        title: "Build an API inventory from specs, gateways and traffic",
        body: "Discovery starts with what engineering already has, then compares it with what the environment actually serves.",
        points: [
          "Ingest OpenAPI, Swagger, Postman collections and API-gateway logs",
          "Catalog endpoints, auth schemes, parameters and rate-limit posture",
          "Flag undocumented, stale and duplicate routes for review",
        ],
      },
      {
        kicker: "Validation",
        title: "Test live APIs the way an attacker would",
        body: "Once the inventory is in place, Entersoft tests object-level access, function-level authorization, injection and data leakage on the endpoints that matter.",
        points: [
          "BOLA and BFLA testing on authenticated object and admin routes",
          "Schema checks against published OpenAPI contracts",
          "Findings routed to the teams that own the backend services",
        ],
      },
    ],
    detectTitle: "What we inventory and test",
    detectLead: "API discovery is useful only if it covers the surfaces that actually move data.",
    detections: [
      { title: "REST & HTTP APIs", body: "Documented and undocumented HTTP endpoints behind gateways, BFF layers and public hosts." },
      { title: "GraphQL", body: "Query, mutation and introspection surfaces, including over-privileged field access." },
      { title: "gRPC & service meshes", body: "Internal service contracts that still accept untrusted callers or leaked credentials." },
      { title: "Shadow endpoints", body: "Routes that never made the spec: old versions, debug APIs and leftover partner hooks." },
      { title: "Auth & object access", body: "Token handling, tenancy boundaries, and object-level authorization on live methods." },
      { title: "Schema drift", body: "Request and response behavior that no longer matches the published contract." },
    ],
    ctaTitle: "Get an API inventory you can act on.",
    ctaBody: "Brief Entersoft on the applications and gateways in scope. We will show you how discovery and testing run together.",
    related: [
      { label: "API Security on EnProbe", href: ROUTES.platform.apiSecurity },
      { label: "Application Security", href: ROUTES.services.appsec },
    ],
    metadataTitle: "API Discovery | Entersoft Solutions",
    metadataDescription:
      "Discover documented, shadow and stale APIs, then test REST, GraphQL and gRPC endpoints for authorization and OWASP API Top 10 risk.",
    reel: {
      number: "001",
      category: "API Risk",
      coverBg: "bg-[#1a1c4b]",
      textColor: "text-white",
      accentColor: "#96CBFF",
      symbol: "◆ API",
      symbolSub: "DISCOVERY",
      image: u("photo-1558494949-ef010cbdcc31"),
    },
  },
  {
    slug: "ai-bom",
    href: ROUTES.solutionsPages.aiBom,
    navName: "AI-BOM",
    navDesc: "Inventory AI components in your software",
    kicker: "AI-BOM",
    heroTitle: "See every AI component in your software",
    heroBody:
      "Entersoft inventories the AI frameworks, model providers, agent libraries, retrieval stores and model files used in applications so security and risk teams can see what is actually running — not only what was declared in a design review.",
    problemTitle: "Are you keeping an eye on your AI?",
    problemLead:
      "AI components arrive the same way any other package does. Security is often told after the model is already in a release.",
    problems: [
      {
        title: "AI components are invisible by default",
        body: "Teams add LangChain, vector databases, MCP SDKs and model SDKs without a security intake. The application looks like ordinary software until someone asks which model holds customer data.",
      },
      {
        title: "Ordinary SBOMs do not describe AI",
        body: "A generic dependency list treats an agent library like any other package. It does not tell you the provider, the retrieval store, or whether a local model file is shipped with the build.",
      },
      {
        title: "Boards and auditors now ask for an inventory",
        body: "EU AI Act and NIST AI RMF both expect documented AI use. Building that list by hand across applications takes weeks and is stale the next sprint.",
      },
    ],
    features: [
      {
        kicker: "Taxonomy",
        title: "Treat AI packages as AI, not generic libraries",
        body: "Entersoft classifies AI components by role so you can filter by framework, provider, agent stack or embedded model instead of reading a flat SBOM.",
        points: [
          "Frameworks, agent libraries, RAG and vector stores, MCP SDKs and model providers",
          "Embedded model files shipped with the application",
          "Tied to the application where the component was found",
        ],
      },
      {
        kicker: "Workflow",
        title: "Built on the SBOM and AI-testing work you already run",
        body: "AI-BOM uses the same software inventory and application-security path as EnProbe SBOM and Entersoft AI security testing. It is not a disconnected spreadsheet exercise.",
        points: [
          "AI components inherit the same vulnerability and license treatment as other dependencies",
          "Findings connect to AI Systems Assurance when prompt, retrieval or agent risk needs testing",
          "Exportable inventory for security, legal and procurement reviews",
        ],
      },
    ],
    detectTitle: "What we look for",
    detectLead: "The inventory is only useful if it names the AI pieces that change your risk.",
    detections: [
      { title: "AI/ML frameworks", body: "LangChain, LlamaIndex, PyTorch, Transformers, Semantic Kernel, Spring AI and similar stacks." },
      { title: "Agentic libraries", body: "CrewAI, LangGraph, AutoGen and other agent runtimes that can call tools or take actions." },
      { title: "RAG & vector databases", body: "Pinecone, Chroma, Weaviate, Qdrant, Milvus, FAISS and retrieval patterns around them." },
      { title: "MCP SDKs", body: "Model Context Protocol SDKs used to wire tools and data into model workflows." },
      { title: "Model providers", body: "OpenAI, Anthropic, Gemini, Bedrock, Azure OpenAI, Ollama and other hosted or local endpoints." },
      { title: "Embedded model files", body: "Locally shipped weights such as .gguf, .safetensors, .onnx and .pt inside the application." },
    ],
    ctaTitle: "We've got AI risk covered.",
    ctaBody: "Tell us which applications use models, agents or retrieval. We will show you how the inventory is built and where testing follows.",
    related: [
      { label: "AI Security Testing", href: ROUTES.services.aiAst },
      { label: "SBOM & License Risk", href: ROUTES.platform.sbomLicenseRisk },
    ],
    metadataTitle: "AI-BOM | Entersoft Solutions",
    metadataDescription:
      "Inventory AI frameworks, model providers, agent libraries, vector databases and embedded model files in your applications.",
    reel: {
      number: "002",
      category: "AI Inventory",
      coverBg: "bg-[#ccff00]",
      textColor: "text-black",
      accentColor: "#ccff00",
      symbol: "◈ AI-BOM",
      symbolSub: "COMPONENT GRAPH",
      image: u("photo-1620712943543-bcc4688e7485"),
    },
  },
  {
    slug: "manage-vulnerabilities",
    href: ROUTES.solutionsPages.manageVulnerabilities,
    navName: "Manage Vulnerabilities",
    navDesc: "Correlate AppSec findings into one queue",
    kicker: "Vulnerability management",
    heroTitle: "See, prioritize and reduce AppSec risk in one place",
    heroBody:
      "Entersoft centralizes findings from SAST, DAST, SCA, secrets, containers, cloud and manual testing, then correlates duplicates so engineering gets a single, risk-ordered queue instead of five scanner inboxes.",
    problemTitle: "More scanners does not mean more clarity",
    problemLead:
      "Most AppSec programmes already produce findings. The problem is deciding which ones matter and who owns the fix.",
    problems: [
      {
        title: "The same flaw appears in three tools",
        body: "SAST, DAST and a cloud scanner can all describe one issue. Without correlation, teams close tickets in one tool and leave the others open.",
      },
      {
        title: "Severity is not the same as exposure",
        body: "A critical finding on an internal test app is not the same as a confirmed issue on an internet-facing payment API. Context has to travel with the ticket.",
      },
      {
        title: "Pentest evidence never joins the backlog",
        body: "Manual validation sits in a PDF. Developers work from Jira. The two lists drift, and the same issue is rediscovered on the next assessment.",
      },
    ],
    features: [
      {
        kicker: "Correlation",
        title: "One vulnerability record across tools",
        body: "EnProbe ASPM aggregates scanner output and expert-led testing into a unified inventory, then deduplicates overlapping alerts.",
        points: [
          "Connect AppSec, cloud, container and pentest sources",
          "Collapse redundant alerts into a single actionable record",
          "Score with business criticality, exposure and analyst validation",
        ],
      },
      {
        kicker: "Ownership",
        title: "Send work to the team that can fix it",
        body: "Prioritized items become developer tickets with evidence, not another dashboard for security to babysit.",
        points: [
          "Route fixes to the owning service or repository",
          "Keep human-validated findings distinct from unconfirmed scanner noise",
          "Track reopen risk when a fix does not hold",
        ],
      },
    ],
    detectTitle: "What lands in the queue",
    detectLead: "The programme is only as good as the sources it can correlate.",
    detections: [
      { title: "SAST & DAST", body: "Code and runtime findings, correlated when both tools describe the same flaw." },
      { title: "SCA & secrets", body: "Vulnerable libraries and exposed credentials treated as first-class backlog items." },
      { title: "Cloud & containers", body: "Misconfigurations and image issues joined to the application they affect." },
      { title: "API & identity", body: "Authorization and token findings from API testing and cloud IAM review." },
      { title: "Manual testing", body: "Penetration-test evidence entered as verified records, not a separate PDF pile." },
      { title: "Risk context", body: "Asset criticality, internet exposure and analyst confirmation on each item." },
    ],
    ctaTitle: "Put AppSec findings in one queue.",
    ctaBody: "Show us the tools you already run. We will show how correlation and expert validation sit on top of them.",
    related: [
      { label: "EnProbe ASPM", href: ROUTES.platform.aspm },
      { label: "Penetration Testing", href: ROUTES.services.vapt },
    ],
    metadataTitle: "Manage Vulnerabilities | Entersoft Solutions",
    metadataDescription:
      "Centralize and correlate SAST, DAST, SCA, secrets, cloud and pentest findings into one prioritized AppSec queue.",
    reel: {
      number: "003",
      category: "ASPM",
      coverBg: "bg-[#05382b]",
      textColor: "text-white",
      accentColor: "#34D399",
      symbol: "⬢ ASPM",
      symbolSub: "ONE QUEUE",
      image: u("photo-1551288049-bebda4e38f71"),
    },
  },
  {
    slug: "automate-security-workflows",
    href: ROUTES.solutionsPages.automateWorkflows,
    navName: "Automate Security Workflows",
    navDesc: "Move findings into the tools teams already use",
    kicker: "Security workflows",
    heroTitle: "Move security work into the pipelines you already run",
    heroBody:
      "Entersoft connects testing and EnProbe findings to GitHub, GitLab, Azure DevOps, Jira and ServiceNow so review, ticket creation and retest happen in the same path developers already use to ship software.",
    problemTitle: "Security work dies in a portal nobody opens",
    problemLead:
      "If findings never reach the pull request or the sprint board, they do not get fixed. Automation has to follow engineering, not the other way around.",
    problems: [
      {
        title: "Gates without context block the wrong builds",
        body: "A CI check that fails on unconfirmed scanner noise trains teams to skip it. Gates only hold if they block verified, in-scope issues.",
      },
      {
        title: "Tickets lack the evidence to fix",
        body: "A Jira card that says “SQL injection, high” without a route, payload or owning repo becomes a parking lot. Developers need the proof next to the task.",
      },
      {
        title: "Retest is a separate project",
        body: "Closing a ticket is not the same as confirming the fix. Without a retest step in the same workflow, the next release revives the issue.",
      },
    ],
    features: [
      {
        kicker: "Delivery",
        title: "Put findings where code already moves",
        body: "Workflows attach to pull requests, pipelines and backlog tools instead of asking engineers to log into another console.",
        points: [
          "CI/CD hooks in GitHub Actions, GitLab, Azure DevOps and similar pipelines",
          "Ticket creation in Jira and ServiceNow with evidence attached",
          "Inline guidance in the pull request when a verified issue is in scope",
        ],
      },
      {
        kicker: "Closure",
        title: "Keep retest inside the same loop",
        body: "When a fix is claimed, Entersoft retests within the agreed window and updates the record. The workflow is not done at “ticket closed.”",
        points: [
          "Retest against the original evidence path",
          "Status updates back to the developer ticket",
          "Human validation before a finding is treated as closed",
        ],
      },
    ],
    detectTitle: "Where workflows connect",
    detectLead: "Automation is only useful on the tools your teams already live in.",
    detections: [
      { title: "Source control", body: "GitHub, GitLab, Bitbucket and Azure Repos as the place findings show up." },
      { title: "CI/CD gates", body: "Pipeline checks that fail on confirmed, in-scope issues rather than raw scanner volume." },
      { title: "Backlogs", body: "Jira and ServiceNow tickets with owner, evidence and severity already filled." },
      { title: "Chat & ops", body: "Escalation paths into Slack or Teams when a verified critical is found during a test." },
      { title: "IDE feedback", body: "Remediation notes close to the code, not only in a weekly PDF." },
      { title: "Retest loop", body: "Fix verification written back to the same ticket that requested the change." },
    ],
    ctaTitle: "Put security in the workflow, not beside it.",
    ctaBody: "Tell us which SCM, CI and ticketing tools you run. We will map how findings and retest attach to them.",
    related: [
      { label: "Application Security", href: ROUTES.services.appsec },
      { label: "EnProbe SAST", href: ROUTES.platform.sast },
    ],
    metadataTitle: "Automate Security Workflows | Entersoft Solutions",
    metadataDescription:
      "Connect Entersoft findings to GitHub, GitLab, Azure DevOps, Jira and ServiceNow so review, tickets and retest follow the developer path.",
    reel: {
      number: "004",
      category: "DevSecOps",
      coverBg: "bg-[#ff9f1c]",
      textColor: "text-black",
      accentColor: "#ff9f1c",
      symbol: "◼ FLOW",
      symbolSub: "PIPELINE GATES",
      image: u("photo-1517694712202-14dd9538aa97"),
    },
  },
  {
    slug: "track-appsec-kpis",
    href: ROUTES.solutionsPages.trackKpis,
    navName: "Track AppSec KPIs",
    navDesc: "Board-ready risk and remediation metrics",
    kicker: "AppSec KPIs",
    heroTitle: "Show the board what AppSec is actually changing",
    heroBody:
      "Entersoft turns testing, EnProbe telemetry and remediation status into executive reporting: exposure trends, fix velocity, control coverage and evidence packs mapped to ISO 27001, SOC 2, PCI-DSS and related obligations.",
    problemTitle: "Scan counts are not a security programme",
    problemLead:
      "Leadership does not need to know how many scans ran. They need to know whether risk is falling and whether evidence will survive an audit.",
    problems: [
      {
        title: "Activity is reported instead of outcomes",
        body: "Open-ticket counts and scan volume look like progress. They do not answer whether internet-facing issues closed, or whether the same findings return next quarter.",
      },
      {
        title: "Each tool has its own dashboard",
        body: "CISOs cannot reconcile SAST, cloud, pentest and GRC slides into one story. The board gets a collage, not a posture.",
      },
      {
        title: "Auditors want evidence, not screenshots",
        body: "ISO 27001, SOC 2 and PCI reviews fail when proof is a slide deck. They need dated findings, owners, retest status and control mapping.",
      },
    ],
    features: [
      {
        kicker: "Reporting",
        title: "KPIs that describe risk, not busyness",
        body: "Entersoft reporting focuses on detection-to-fix time, reopen rates, exposure of critical applications, and whether verified findings are actually closed.",
        points: [
          "Executive views of vulnerability trend, MTTR and remaining exposure",
          "Mapping of live controls and findings to ISO 27001, SOC 2, PCI-DSS, HIPAA and RBI expectations",
          "Evidence packs for registrar and auditor review",
        ],
      },
      {
        kicker: "Assurance",
        title: "Numbers stay tied to validated work",
        body: "Metrics are drawn from correlated findings and human-validated testing, not from raw scanner volume that inflates activity.",
        points: [
          "Separate confirmed issues from untriaged noise",
          "Show retest outcomes, not only ticket state",
          "Keep Digital Trust and GRC programmes on the same evidence trail",
        ],
      },
    ],
    detectTitle: "What leadership can see",
    detectLead: "The point of AppSec KPIs is a decision, not a decoration.",
    detections: [
      { title: "Fix velocity", body: "Time from confirmed finding to verified close, by application and severity." },
      { title: "Remaining exposure", body: "Open, internet-facing and business-critical issues that still need an owner." },
      { title: "Control coverage", body: "Which ISO, SOC 2, PCI or RBI controls have current evidence behind them." },
      { title: "Reopen risk", body: "Findings that returned after a claimed fix, so the trend is honest." },
      { title: "Programme mix", body: "What came from scanners versus expert-led testing, so the board sees both." },
      { title: "Auditor packs", body: "Dated exports of findings, owners and retest status for external review." },
    ],
    ctaTitle: "Measure progress the board can use.",
    ctaBody: "Bring the tools and frameworks you already report on. We will show how Entersoft evidence lands in that pack.",
    related: [
      { label: "Compliance Reporting", href: ROUTES.platform.complianceReporting },
      { label: "GRC, Privacy & Compliance", href: ROUTES.services.compliance },
    ],
    metadataTitle: "Track AppSec KPIs | Entersoft Solutions",
    metadataDescription:
      "Track AppSec outcomes, fix velocity and control evidence for ISO 27001, SOC 2, PCI-DSS and board reporting.",
    reel: {
      number: "005",
      category: "Reporting",
      coverBg: "bg-[#1257A6]",
      textColor: "text-white",
      accentColor: "#96CBFF",
      symbol: "◉ KPIs",
      symbolSub: "BOARD VIEW",
      image: u("photo-1460925895917-afdab827c52f"),
    },
  },
  {
    slug: "manage-open-source-risk",
    href: ROUTES.solutionsPages.openSourceRisk,
    navName: "Manage Open Source Risk",
    navDesc: "Dependencies, licenses and SBOMs",
    kicker: "Open source risk",
    heroTitle: "Know what you inherited — and whether you can ship it",
    heroBody:
      "Entersoft identifies vulnerable third-party libraries, transitive dependencies and license risk, and produces CycloneDX and SPDX SBOMs so engineering, legal and security share one inventory of what is in the build.",
    problemTitle: "Most of your code did not come from your repo",
    problemLead:
      "Applications are assembled from packages. The risk lives in versions you did not write and licenses you did not negotiate.",
    problems: [
      {
        title: "Direct dependencies are only the top layer",
        body: "A safe-looking library can pull a vulnerable transitive package. Teams that only pin direct versions still ship the nested flaw.",
      },
      {
        title: "License risk shows up at the worst time",
        body: "Copyleft and restricted licenses are often found when a customer asks for an SBOM, not when the package was added. That is too late to unwind.",
      },
      {
        title: "The SBOM is a one-off export",
        body: "A spreadsheet from last quarter does not match this week's build. Drift between inventory and release is how known CVEs stay in production.",
      },
    ],
    features: [
      {
        kicker: "SCA",
        title: "Find vulnerable and high-risk packages before release",
        body: "Software composition analysis looks at declared and transitive dependencies, then ranks what is actually reachable in the application.",
        points: [
          "Identify known-vulnerable libraries across the software supply chain",
          "Surface transitive risk that does not appear in the top-level lockfile story",
          "Connect package findings into the same AppSec queue as SAST and DAST",
        ],
      },
      {
        kicker: "SBOM",
        title: "Keep a living bill of materials",
        body: "EnProbe generates SPDX and CycloneDX SBOMs from the build, tracks license class, and watches inventory drift across releases.",
        points: [
          "Machine-readable SBOM export for customers and auditors",
          "Detection of GPL, AGPL and other copyleft licenses before release",
          "Continuous tracking of component changes between builds",
        ],
      },
    ],
    detectTitle: "What open-source review covers",
    detectLead: "Supply-chain review has to name packages, licenses and the application that pulled them in.",
    detections: [
      { title: "Direct dependencies", body: "Declared packages in application manifests and lockfiles." },
      { title: "Transitive risk", body: "Nested libraries brought in by packages your team never chose by name." },
      { title: "Known vulnerabilities", body: "CVE-backed issues in versions that are still present in the build." },
      { title: "License class", body: "Permissive, weak copyleft and strong copyleft licenses before a release ships." },
      { title: "SBOM export", body: "CycloneDX and SPDX inventories for procurement, customers and audits." },
      { title: "Release drift", body: "Components that appeared or changed between the last signed inventory and this build." },
    ],
    ctaTitle: "Get a supply chain you can explain.",
    ctaBody: "Share the languages and package ecosystems you ship. We will show how SCA, SBOM and license review run on that stack.",
    related: [
      { label: "Open Source (SCA)", href: ROUTES.platform.sca },
      { label: "SBOM & License Risk", href: ROUTES.platform.sbomLicenseRisk },
    ],
    metadataTitle: "Manage Open Source Risk | Entersoft Solutions",
    metadataDescription:
      "Identify vulnerable dependencies, transitive risk and copyleft licenses, and produce CycloneDX and SPDX SBOMs for each build.",
    reel: {
      number: "006",
      category: "Supply Chain",
      coverBg: "bg-[#86e3ce]",
      textColor: "text-black",
      accentColor: "#05382b",
      symbol: "▲ OSS",
      symbolSub: "SBOM + SCA",
      image: u("photo-1555949963-aa79dcee981c"),
    },
  },
];

export const SOLUTION_LANDING_BY_SLUG: Record<SolutionLandingSlug, SolutionLanding> =
  SOLUTION_LANDINGS.reduce(
    (acc, item) => {
      acc[item.slug] = item;
      return acc;
    },
    {} as Record<SolutionLandingSlug, SolutionLanding>
  );

export const SOLUTION_LANDING_PATHS = SOLUTION_LANDINGS.map((item) => item.href);

export const isSolutionLandingPath = (pathname: string | null | undefined) =>
  !!pathname && SOLUTION_LANDING_PATHS.includes(pathname);

export const isSolutionLandingSlug = (slug: string): slug is SolutionLandingSlug =>
  slug in SOLUTION_LANDING_BY_SLUG;
