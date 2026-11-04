/*
 * Exact website copy for /services/application-security-testing.
 * Source: Entersoft_AppSec_Main_Page_Complete_Handover.xlsm, tab "01 Page Copy", column D.
 * Generated from the workbook; edit the workbook first, then update this file to match.
 */

export type AppsecNavItem = { label: string; anchor: string };

export type AppsecCoverageDomain = {
  anchor: string;
  heading: string;
  summary: string;
  detail: string;
  scope: string[];
  output: string;
};

/** APP-001 */
export const APPSEC_BREADCRUMB = { home: "Home", current: "Application security testing" };

/** APP-002 — labels and anchors in the approved order. */
export const APPSEC_PAGE_NAV: AppsecNavItem[] = [
  { label: "Coverage", anchor: "coverage" },
  { label: "Scenarios", anchor: "scenarios" },
  { label: "Method", anchor: "method" },
  { label: "EnProbe", anchor: "enprobe" },
  { label: "Standards", anchor: "standards" },
  { label: "Deliverables", anchor: "deliverables" },
  { label: "FAQs", anchor: "faqs" },
];

/** APP-003 – APP-010 */
export const APPSEC_HERO = {
  /** APP-003, one line per array item */
  h1Lines: ["Application security.", "Beyond the scanner."],
  /** APP-004 */
  overline: "APPLICATION ASSURANCE",
  /** APP-005 */
  lead: "Expert-led application security testing for web, mobile, APIs and connected systems. Entersoft combines 14 years of offensive security expertise with AI-assisted analysis to validate real risk and guide remediation.",
  /** APP-006, items separated by • */
  proof: ["Expert-led testing", "AI-assisted analysis", "Evidence-backed remediation"],
  /** APP-007 */
  primaryCta: { label: "Scope your assessment", href: "#assessment" },
  /** APP-008 */
  secondaryCta: { label: "Explore testing coverage", href: "#coverage" },
  /** APP-009 */
  visualCaption: "Illustrative application trust map. Assessment scope follows your architecture and access boundaries.",
  /** APP-010 line 1, nodes separated by → */
  visualNodes: ["Users and roles", "Web and mobile", "APIs", "Application services", "Data and cloud"],
  /** APP-010 line 2 */
  visualBand: "Identity and permissions apply across the flow.",
};

/** APP-011 – APP-018 */
export const APPSEC_DIFFERENCE = {
  title: "Expert judgment. Applied to real application risk.",
  intro: "A scanner can identify a possible weakness. An assessment must explain whether it can be exploited, which business process is exposed and what needs to change.",
  values: [
    { title: "Test the business, not only the technology.", body: "We examine user roles, tenant boundaries, sensitive data and critical workflows alongside technical security controls." },
    { title: "Validate before prioritising.", body: "We distinguish candidate findings from confirmed issues, then explain prerequisites, evidence, impact and assessment limitations." },
    { title: "Stay connected to remediation.", body: "We translate findings into practical fixes and agreed retesting, giving engineering and security teams a clear record of what remains open." },
  ],
};

/** APP-019 – APP-060 */
export const APPSEC_COVERAGE: { title: string; intro: string; domains: AppsecCoverageDomain[] } = {
  title: "Application security testing coverage.",
  intro: "Combine the assessment areas your architecture needs. Coverage, depth, access requirements and exclusions are agreed before testing; this is not a promise to test every technology in every engagement.",
  domains: [
    // APP-021 – APP-025
    {
      anchor: "coverage-web",
      heading: "Web application penetration testing",
      summary: "Test how browsers, backend services and user permissions interact—not just whether individual inputs accept unsafe data.",
      detail: "We assess authenticated and unauthenticated journeys across portals, SaaS applications and administrative interfaces. Testing follows meaningful roles and data flows, with manual investigation of design weaknesses and automated checks where appropriate.",
      scope: [
        "Authentication, account recovery, session lifecycle and logout",
        "Role, object and tenant-level access controls",
        "Injection, server-side request forgery and unsafe file handling",
        "Browser trust boundaries, cross-origin policies and client-side exposure",
        "Request handling, caching and deserialisation risks where relevant",
        "Security-relevant errors, logging and sensitive-data handling",
      ],
      output: "A scoped coverage record, validated findings and practical remediation guidance linked to affected application flows.",
    },
    // APP-026 – APP-030
    {
      anchor: "coverage-api",
      heading: "API security testing",
      summary: "Validate who can call an API, which objects and properties they can access, and whether business actions remain authorised.",
      detail: "Assessments cover agreed REST, GraphQL, gRPC and event-driven interfaces where relevant. We combine documented specifications with observed traffic, then test roles, object relationships, integration trust and abuse cases using approved accounts.",
      scope: [
        "Broken object-level authorisation and cross-tenant access",
        "Function-level and object-property-level authorisation",
        "Authentication tokens, scopes and session transitions",
        "GraphQL resolver controls, query limits and data exposure",
        "Webhooks, request replay, API inventory and third-party trust",
        "Resource consumption and sensitive business-flow abuse within safety limits",
      ],
      output: "An API access-control matrix, evidence of observed failures and remediation tied to the affected operations.",
    },
    // APP-031 – APP-035
    {
      anchor: "coverage-mobile",
      heading: "Mobile application security testing",
      summary: "Assess Android and iOS applications as complete client-to-backend systems, including data stored on the device and actions performed through APIs.",
      detail: "We combine application-package review, authorised runtime analysis and backend testing. The assessment distinguishes mobile-platform issues from server-side weaknesses and documents the devices, operating systems and access conditions used.",
      scope: [
        "Local storage, logs, backups and sensitive-data exposure",
        "Authentication, session handling and backend authorisation",
        "Cryptographic use and platform-protected secret storage",
        "Transport security and certificate validation",
        "Deep links, inter-process communication and embedded web views",
        "Tampering and reverse-engineering resistance where required",
      ],
      output: "Platform-specific evidence, backend findings where in scope and remediation mapped to relevant mobile security controls.",
    },
    // APP-036 – APP-040
    {
      anchor: "coverage-business-logic",
      heading: "Business logic and abuse testing",
      summary: "Challenge the rules behind payments, approvals, subscriptions and account privileges—where valid features can still produce harmful outcomes.",
      detail: "Our testers build scenarios from the intended business rules and allowed state transitions. We examine whether users can skip steps, repeat restricted actions or combine individually permitted operations to defeat an important control.",
      scope: [
        "Multi-stage approvals and separation of duties",
        "Pricing, refunds, credits, discounts and subscription entitlements",
        "Concurrency, race conditions and duplicate transaction processing",
        "Tenant switching, delegated access and role changes",
        "Onboarding, recovery and offboarding workflows",
        "Limits and abuse protections for high-value business actions",
      ],
      output: "Business-rule test scenarios, reproducible evidence and recommendations that address the underlying control failure.",
    },
    // APP-041 – APP-045
    {
      anchor: "coverage-code-supply-chain",
      heading: "Secure code and software supply-chain review",
      summary: "Connect code-level weaknesses, third-party components and delivery-pipeline risks to the application paths they can affect.",
      detail: "Where source and pipeline access are included, we review high-risk code paths and assess relevant SAST and software composition analysis results. Dependency presence is not treated as proof of exploitability; we consider usage, exposure and available evidence.",
      scope: [
        "Security-sensitive code paths and trust-boundary checks",
        "Source analysis findings and manual code review",
        "Dependencies, software inventories and SBOM review where scoped",
        "Secrets in repositories and delivery configurations",
        "Build permissions, artefact integrity and dependency provenance",
        "Fix patterns, design weaknesses and recurring root causes",
      ],
      output: "A prioritised code and component review, evidence-linked findings and guidance for engineering and build owners.",
    },
    // APP-046 – APP-050
    {
      anchor: "coverage-cloud-native",
      heading: "Cloud-native application security",
      summary: "Test the boundaries between services, workload identities and cloud resources that support your application.",
      detail: "We assess application-linked paths across agreed AWS, Azure, container, Kubernetes and serverless environments. The focus is what the application or its identities can reach; a full cloud posture assessment is a separate scope when needed.",
      scope: [
        "Service-to-service authentication and authorisation",
        "Workload identities and application permissions",
        "Access to storage, secrets, queues and databases",
        "Ingress, gateways and exposed management interfaces",
        "Container and deployment settings affecting the application",
        "Cross-service paths from a weakness to sensitive business data",
      ],
      output: "A trust-boundary assessment, validated application-to-cloud risks and remediation ownership across engineering and cloud teams.",
    },
    // APP-051 – APP-055
    {
      anchor: "coverage-ai-applications",
      heading: "AI-connected application security",
      summary: "Assess how an AI-enabled feature handles untrusted input, retrieves data and invokes tools on behalf of a user.",
      detail: "For scoped LLM, retrieval-augmented generation and agent applications, testing follows the surrounding application and permission model. We evaluate authorised access and actions rather than treating model output alone as evidence that the entire system is secure.",
      scope: [
        "Direct and indirect prompt-injection scenarios",
        "Document permissions and cross-user retrieval isolation",
        "Tool, agent and Model Context Protocol integration permissions",
        "Sensitive-data disclosure and conversation-state separation",
        "Untrusted model output passed to downstream components",
        "Approval boundaries and resource-use controls for consequential actions",
      ],
      output: "Scenario-based evidence, affected trust boundaries and recommendations for application controls, tool permissions and review gates.",
    },
    // APP-056 – APP-060
    {
      anchor: "coverage-continuous",
      heading: "Continuous application assurance",
      summary: "Keep testing, finding review and fix verification connected between formal assessments.",
      detail: "An ongoing programme can combine agreed automated checks with scheduled expert-led testing and change-based reviews. Cadence, environments, integrations and human review are defined in the engagement; continuous assurance does not mean unrestricted testing of every production change.",
      scope: [
        "Authenticated testing on agreed schedules or change events",
        "DAST and SCA results reviewed in application context",
        "Finding ownership, prioritisation and remediation tracking",
        "Expert investigation of high-risk changes and business flows",
        "Retesting of agreed fixes and residual-risk recording",
        "Release and management evidence across assessment cycles",
      ],
      output: "A maintained risk and remediation record, agreed testing coverage and evidence of verified closure over time.",
    },
  ],
};

export type AppsecScenario = {
  title: string;
  explanation: string;
  evidence: string;
};

export type AppsecMethodPhase = {
  heading: string;
  body: string;
  output: string;
};

/** APP-061 – APP-086. Explanations and evidence lines are expandable and present in the initial HTML. */
export const APPSEC_SCENARIOS: { title: string; intro: string; scenarios: AppsecScenario[] } = {
  title: "We test how applications actually fail.",
  intro: "These representative scenarios show the depth of a risk-led assessment. Relevant tests are selected for your architecture and performed only within the agreed rules of engagement.",
  scenarios: [
    {
      title: "Tenant boundaries",
      explanation: "Can a user access another customer's records through search, export, background jobs or APIs? We compare permitted and observed access using separated test tenants.",
      evidence: "Tenant and object-level permission matrix.",
    },
    {
      title: "Identity and session transitions",
      explanation: "Can login, recovery, federation or a role change leave a user with unintended access? We follow the session and permission state across the journey.",
      evidence: "Identity-flow evidence and affected trust boundary.",
    },
    {
      title: "Transaction integrity",
      explanation: "Can repeated, concurrent or out-of-sequence actions bypass an approval or alter an entitlement? Controlled scenarios examine the intended rule, not only the response code.",
      evidence: "Business-rule scenario and demonstrated consequence.",
    },
    {
      title: "Application-to-cloud access",
      explanation: "Can an application identity reach data or services outside its intended purpose? We evaluate the permitted path and its potential business impact without assuming broad cloud access.",
      evidence: "Application-to-resource access path and remediation owner.",
    },
    {
      title: "Software delivery trust",
      explanation: "Could repository access, build permissions or an exposed secret affect a released application? We assess the relevant controls and distinguish confirmed paths from untested hypotheses.",
      evidence: "Evidence-linked delivery-path findings.",
    },
    {
      title: "AI data and action boundaries",
      explanation: "Could untrusted content cause an AI-enabled feature to retrieve restricted data or request an unauthorised tool action? We test application permissions and review gates.",
      evidence: "Scenario, authorisation outcome and control recommendation.",
    },
    {
      title: "API integration trust",
      explanation: "Can an external service, webhook or reused token cause an unintended operation? We assess caller identity, event integrity and the application's treatment of external responses.",
      evidence: "Integration trust checks and replay-control evidence.",
    },
    {
      title: "Fixes under related conditions",
      explanation: "Does a fix protect related roles, objects and workflows as well as the original reproduction path? Retesting checks the agreed change and records remaining limitations.",
      evidence: "Retest result, tested conditions and residual risk.",
    },
  ],
};

/** APP-087 – APP-107. Phase headings, body, outputs and the safety notice are visible. */
export const APPSEC_METHOD: { title: string; intro: string; phases: AppsecMethodPhase[]; safety: string } = {
  title: "From architecture to verified remediation.",
  intro: "A clear scope, reproducible evidence and controlled testing conditions make an assessment useful. Each phase records what was assessed, what was found and what remains uncertain.",
  phases: [
    {
      heading: "01 / Understand",
      body: "Agree the business objectives, applications, roles, sensitive data, access and exclusions. Document approved environments, test windows, escalation contacts and stop conditions.",
      output: "Agreed scope and rules of engagement.",
    },
    {
      heading: "02 / Map",
      body: "Review architecture, interfaces and integrations. Identify critical workflows, trust boundaries and the permissions needed to test meaningful scenarios.",
      output: "Application map and risk-led test plan.",
    },
    {
      heading: "03 / Test",
      body: "Combine appropriate automated checks with manual testing of authentication, authorisation, business logic and relevant architecture-specific risks.",
      output: "Test records and candidate findings.",
    },
    {
      heading: "04 / Validate",
      body: "Reproduce findings where authorised, review evidence and assess prerequisites and impact. Keep confirmed issues separate from observations or areas that could not be tested.",
      output: "Validated findings with scope and limitations.",
    },
    {
      heading: "05 / Guide",
      body: "Explain root cause and practical corrective actions. Align remediation with the affected code, configuration or business rule and the team responsible for it.",
      output: "Prioritised remediation guidance.",
    },
    {
      heading: "06 / Retest",
      body: "Verify agreed fixes in the available environment. Record resolved, unresolved, partially resolved and not-retested items without treating unavailable evidence as a pass.",
      output: "Closure evidence and residual-risk record.",
    },
  ],
  safety: "Testing requires written authorisation. Intrusive, destructive, denial-of-service or high-volume scenarios are excluded unless separately approved. Production tests use agreed limits and escalation procedures; no test is represented as risk-free.",
};

export type AppsecGovernanceBlock = {
  title: string;
  body: string;
};

/** APP-108 – APP-115. The heading keeps the workbook line break. All three blocks are visible. */
export const APPSEC_EXPERT_AI: {
  titleLines: [string, string];
  intro: string;
  blocks: AppsecGovernanceBlock[];
} = {
  titleLines: ["AI-assisted analysis.", "Expert-led decisions."],
  intro: "AI supports the work. Experienced security specialists remain responsible for the conclusions. We do not present an automated alert as a confirmed vulnerability.",
  blocks: [
    {
      title: "Where AI can help",
      body: "Organise discovery results, correlate related signals, support test hypotheses and draft explanations or remediation guidance for review.",
    },
    {
      title: "Where experts lead",
      body: "Design context-specific scenarios, validate evidence, assess business consequences, govern sensitive testing and review proposed fixes.",
    },
    {
      title: "How data and actions are governed",
      body: "Agree approved tools, data handling and review boundaries before work begins. Sensitive testing and customer-system changes follow the engagement's authorisation process.",
    },
  ],
};

export type AppsecModule = {
  name: string;
  body: string;
};

/** APP-116 – APP-129. Five confirmed modules, the availability note, and the assessment CTA. */
export const APPSEC_ENPROBE: {
  title: string;
  intro: string;
  modules: AppsecModule[];
  note: string;
  cta: { label: string; href: string };
} = {
  title: "Expert services. Connected by EnProbe.",
  intro: "EnProbe is Entersoft's platform layer for repeatable security work and risk visibility. It supports the service; it does not replace expert investigation of business logic or complex attack paths.",
  modules: [
    {
      name: "DAST",
      body: "Dynamic application security testing supports repeatable checks against running applications within the configured authentication and testing scope.",
    },
    {
      name: "SCA",
      body: "Software composition analysis helps teams review third-party component exposure and prioritise relevant dependency findings.",
    },
    {
      name: "ASPM",
      body: "Application security posture management brings findings and application context into a shared view of risk and remediation priorities.",
    },
    {
      name: "AWS and Azure CSPM",
      body: "Cloud security posture management adds relevant configuration context from the connected AWS and Azure environments.",
    },
    {
      name: "GRC",
      body: "Governance, risk and compliance workflows help organise relevant controls and evidence alongside security work.",
    },
  ],
  note: "Enabled modules, integrations, supported environments and workflow automation are confirmed during scoping. Source analysis and specialist testing may use additional tools; do not assume every activity is a native EnProbe feature.",
  cta: { label: "Discuss EnProbe for your application portfolio", href: "#assessment" },
};

export type AppsecDeliverable = {
  heading: string;
  body: string;
};

export type AppsecEvidenceField = {
  term: string;
  detail: string;
};

/** APP-130 – APP-149. Six visible deliverables and the expandable synthetic example. */
export const APPSEC_DELIVERABLES: {
  title: string;
  intro: string;
  items: AppsecDeliverable[];
  example: { label: string; fields: AppsecEvidenceField[] };
} = {
  title: "Evidence your teams can act on.",
  intro: "The value is not a longer vulnerability list. It is a clear account of what was tested, what is supported by evidence, what to fix and what was verified afterwards.",
  items: [
    {
      heading: "Executive summary",
      body: "Material risks, affected business workflows, recommended priorities and decisions that need leadership attention.",
    },
    {
      heading: "Scope and coverage record",
      body: "Applications, roles, environments and test areas assessed, including access limitations, exclusions and untested items.",
    },
    {
      heading: "Validated technical findings",
      body: "Affected components, prerequisites, evidence, root cause, severity rationale and the observed or supported impact.",
    },
    {
      heading: "Developer-ready guidance",
      body: "Corrective actions and secure implementation patterns appropriate to the finding. Suggested code still requires customer engineering review and testing.",
    },
    {
      heading: "Standards mapping",
      body: "Relevant weakness and control references where included in scope, with versions and applicable requirements identified.",
    },
    {
      heading: "Retest and closure record",
      body: "Results for the fixes and conditions retested, plus open, partially resolved or untested residual risks. Retest entitlement is defined in the proposal.",
    },
  ],
  example: {
    label: "Illustrative finding — synthetic data, not a customer case study",
    fields: [
      { term: "Finding", detail: "Cross-tenant access to an invoice export" },
      { term: "Business consequence", detail: "A user could receive another organisation's invoice data if the export service does not enforce tenant ownership." },
      { term: "Validation", detail: "Use approved test accounts from two separate tenants. Compare the expected access decision with the observed export outcome." },
      { term: "Remediation", detail: "Enforce server-side tenant and object authorisation for export creation, retrieval and background processing." },
      { term: "Retest", detail: "Verify that the previously observed access fails and legitimate access still works. Record the tested roles, paths and remaining limits." },
    ],
  },
};

export type AppsecStandardLink = {
  label: string;
  href: string;
};

export type AppsecStandard = {
  name: string;
  body: string;
  /** Official URLs from the standards-source tab. Labels are the approved reference names. */
  links: AppsecStandardLink[];
};

/** APP-150 – APP-168. Names are visible; applicability is expandable and present in the HTML. */
export const APPSEC_STANDARDS: {
  title: string;
  intro: string;
  references: AppsecStandard[];
  distinction: string;
} = {
  title: "Recognised standards. Risk-led application.",
  intro: "We select requirements and test guidance for the system and engagement. The agreed scope records the reference versions, verification depth and any exclusions; a risk list alone is not comprehensive test coverage.",
  references: [
    {
      name: "OWASP ASVS 5.0.0",
      body: "Web application verification requirements. An ASVS-based engagement agrees the control set, level and evidence expected; it does not imply that every requirement has been tested.",
      links: [{ label: "OWASP ASVS 5.0.0", href: "https://asvs.owasp.org/" }],
    },
    {
      name: "OWASP WSTG 4.2",
      body: "Structured web security testing guidance used alongside application-specific scenarios and manual investigation.",
      links: [{ label: "OWASP WSTG 4.2", href: "https://owasp.org/projects/web-security-testing-guide" }],
    },
    {
      name: "OWASP API Security Top 10 — 2023",
      body: "API risk categories covering access control, authentication, data exposure and business-flow abuse; used as a reference rather than an exhaustive test plan.",
      links: [{ label: "OWASP API Security Top 10 — 2023", href: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/" }],
    },
    {
      name: "OWASP MASVS / MASTG",
      body: "Mobile verification requirements and test guidance for the agreed Android and iOS scope. Applicable controls and reference snapshots are recorded.",
      links: [{ label: "OWASP MASVS / MASTG", href: "https://mas.owasp.org/" }],
    },
    {
      name: "OWASP Top 10 — 2025",
      body: "A web security risk-awareness reference. The assessment goes beyond the list where architecture, business logic or other risks require it.",
      links: [{ label: "OWASP Top 10 — 2025", href: "https://top10.owasp.org/" }],
    },
    {
      name: "OWASP LLM Top 10 — 2025",
      body: "A risk reference for scoped AI-connected applications, including untrusted input, data exposure and excessive tool permissions.",
      links: [{ label: "OWASP LLM Top 10 — 2025", href: "https://genai.owasp.org/llm-top-10/" }],
    },
    {
      name: "NIST SSDF and OWASP SAMM",
      body: "Used when an engagement includes secure-development practices or AppSec programme maturity. These are not substitutes for technical penetration testing.",
      links: [
        { label: "NIST SSDF", href: "https://csrc.nist.gov/projects/ssdf/publications" },
        { label: "OWASP SAMM", href: "https://owaspsamm.org/model/" },
      ],
    },
    {
      name: "Weakness and severity references",
      body: "Reports can use CWE identifiers and an agreed CVSS version, including CVSS v4.0 where selected. Business impact, prerequisites and uncertainty are explained separately.",
      links: [{ label: "CVSS v4.0", href: "https://www.first.org/cvss/v4.0/specification-document" }],
    },
  ],
  distinction: "Methodology alignment is not certification by OWASP or NIST. Security testing can support audit and regulatory evidence, but it does not by itself certify legal compliance or guarantee a successful audit.",
};

/** APP-169 – APP-178. Three modes, then the scoping and commercial boundaries. No price or turnaround. */
export const APPSEC_ENGAGEMENT = {
  title: "Start with the assurance you need.",
  intro: "Choose a focused assessment or a recurring programme. We agree the required depth, access, delivery model and retesting before the engagement begins.",
  modes: [
    {
      title: "Focused assessment",
      body: "For a specific application, API, mobile release or critical workflow. Establish current exposure and a prioritised remediation plan.",
    },
    {
      title: "Release or change assurance",
      body: "For significant features, new integrations or architecture changes. Test the changed paths and their effect on existing trust boundaries.",
    },
    {
      title: "Ongoing application assurance",
      body: "For an application portfolio or frequent release cycle. Combine agreed automated checks, expert testing, triage and retesting over time.",
    },
  ],
  scoping: "Scope and effort depend on application complexity, roles, tenants, APIs, integrations, environments and critical workflows—not simply a URL count. Black-box, grey-box and white-box approaches are selected according to the assurance objective and available access.",
  boundary: "The proposal defines deliverables, test windows, dependencies, exclusions and included retesting. No fixed turnaround, unlimited retests or certification outcome is implied.",
};

/** APP-179 – APP-207. Fourteen written answers, present in the initial HTML. */
export const APPSEC_FAQ_SECTION = {
  title: "Questions enterprise teams ask.",
  items: [
    {
      question: "What is included in application security testing?",
      answer: "The scope can combine web, API, mobile, business-logic, code, supply-chain and application-linked cloud testing. We agree the systems, roles, environments and business flows to assess, then provide validated findings and remediation guidance. Retesting and ongoing coverage are defined in the engagement.",
    },
    {
      question: "How does penetration testing differ from automated scanning?",
      answer: "A scan produces potential findings within its configuration and access. Expert-led penetration testing examines context, authorisation, business rules and linked weaknesses, then validates evidence and impact. Automation helps cover repeatable checks; it is not a substitute for all manual investigation.",
    },
    {
      question: "Do you test business logic and multi-tenant isolation?",
      answer: "Yes, these can be explicit assessment objectives. We need the intended business rules and appropriately separated test accounts or tenants. Scenarios can examine approvals, payments, entitlements, exports, role changes and customer boundaries, with conclusions limited to the paths and conditions actually tested.",
    },
    {
      question: "Can the assessment cover REST, GraphQL and gRPC APIs?",
      answer: "API scope is agreed around the interfaces used by your application, available documentation and test access. Testing can examine caller identity, object and function permissions, property exposure, integration trust and relevant abuse cases. Protocol-specific tools and access requirements are confirmed before work starts.",
    },
    {
      question: "Does mobile testing include the backend?",
      answer: "It can. Android and iOS testing examines the mobile client, while backend APIs and services must be explicitly included to assess server-side risks. The scope identifies supported builds, devices, operating systems and backend environments so client-side and server-side coverage are clear.",
    },
    {
      question: "Do you need source code or administrator access?",
      answer: "Not for every engagement. Black-box testing uses limited internal knowledge; grey-box testing uses agreed accounts and documentation; white-box work can include code and architecture access. We choose the approach needed for the objective and request only the access justified by the scope.",
    },
    {
      question: "Can you assess AI-enabled application features?",
      answer: "Yes, where agreed in scope. Testing focuses on the application around the model: retrieved data, user permissions, conversation state, tool access, downstream processing and approval gates. It does not imply a full evaluation of the underlying foundation model or every possible model output.",
    },
    {
      question: "Can you test production applications?",
      answer: "Production testing requires explicit written approval, suitable test accounts, safety limits, contacts and agreed windows. Intrusive scenarios may need a separate environment. We document exclusions and stop conditions; no penetration test can be described as entirely risk-free.",
    },
    {
      question: "How are findings prioritised?",
      answer: "We consider supported exploitability, access prerequisites, affected data and workflows, business criticality and compensating controls. An agreed severity method, such as CVSS, supports consistent communication but is not treated as a complete business-risk assessment. Uncertainty and untested assumptions remain visible.",
    },
    {
      question: "What happens after you identify a vulnerability?",
      answer: "We provide evidence, root-cause context and actionable remediation guidance. Your team owns implementation unless otherwise agreed. Retesting verifies the agreed changes and records resolved, unresolved, partially resolved and not-retested findings; a finding is not marked closed simply because a ticket was updated.",
    },
    {
      question: "How does EnProbe fit into the service?",
      answer: "EnProbe supports selected repeatable activities and risk visibility through its enabled DAST, SCA, ASPM, cloud posture and GRC modules. The service combines platform outputs with expert analysis. Available integrations, workflows and automated actions are confirmed for the particular deployment and engagement.",
    },
    {
      question: "Which standards guide the assessment?",
      answer: "Relevant references include OWASP ASVS, WSTG, API Security Top 10 and MASVS/MASTG, with AI-specific guidance where applicable. We agree versions, controls and verification depth. Secure-development and maturity reviews can also use NIST SSDF and OWASP SAMM.",
    },
    {
      question: "Does an assessment prove compliance or that the application is completely secure?",
      answer: "No. An assessment provides evidence for a defined scope, time and access level. Findings and control mappings can support your assurance or audit process, but they are not a guarantee of complete security, legal compliance or acceptance by an auditor.",
    },
    {
      question: "What determines cost, timing and retest coverage?",
      answer: "Application complexity, roles, tenants, API operations, integrations, code access, environments and critical workflows drive effort. We agree scope, prerequisites and delivery milestones in the proposal. The included retest period and effort are stated explicitly rather than assumed to be unlimited.",
    },
  ],
};

/** APP-208 – APP-221. Four text links to existing service routes. */
export const APPSEC_RELATED = {
  title: "When application risk crosses into other domains.",
  intro: "Keep Application Assurance as the starting point. Extend the engagement where the application's dependencies or business obligations require specialist work.",
  practices: [
    {
      name: "Cloud Resilience",
      body: "For wider cloud architecture, workload and configuration assurance beyond the application assessment.",
      cta: "Explore Cloud Resilience",
      href: "/services/cloud-security",
    },
    {
      name: "Adversarial Validation",
      body: "For broader attack paths and objective-led testing across the authorised environment.",
      cta: "Explore Adversarial Validation",
      href: "/services/penetration-testing",
    },
    {
      name: "AI Systems Assurance",
      body: "For a dedicated assessment of AI systems, agents, tools and their operating controls.",
      cta: "Explore AI Systems Assurance",
      href: "/services/ai-security-testing",
    },
    {
      name: "Digital Trust",
      body: "For security governance, privacy requirements and evidence aligned to relevant obligations.",
      cta: "Explore Digital Trust",
      href: "/services/grc-compliance-privacy",
    },
  ],
};

/** APP-222 – APP-250. Six fields. Timeline has no validation row, so it is not required. */
export const APPSEC_ASSESSMENT = {
  titleLines: ["Know what matters.", "Verify what changes."],
  intro:
    "Tell us what your application does, what is changing and where you need assurance. We will help define the assessment scope, access requirements and expected outputs.",
  formTitle: "Scope your AppSec assessment",
  safety:
    "Do not submit passwords, source code, personal data or sensitive technical evidence through this form.",
  requiredNotice: "Fields marked with an asterisk are required.",
  privacy:
    "We use the details you provide to respond to this enquiry. Read our Privacy Notice.",
  submit: "Request an assessment discussion",
  sending: "Sending your request…",
  success:
    "Thank you. Your assessment request has been received. Our team will contact you using the details provided.",
  failure:
    "Your request could not be sent. Your entries are still here. Please try again.",
  assessmentOptions: [
    "Web application",
    "API",
    "Mobile application",
    "Business logic",
    "Code and supply chain",
    "Cloud-native application",
    "AI-connected application",
    "Ongoing assurance",
    "Help me define the scope",
  ],
  timingOptions: [
    "As soon as practical",
    "Within one month",
    "Within three months",
    "Exploring options",
  ],
  fields: {
    fullName: {
      label: "Full name",
      helper: "Enter your name.",
      error: "Enter your name.",
    },
    workEmail: {
      label: "Work email",
      helper: "name@company.com",
      error: "Enter a valid email address.",
    },
    company: {
      label: "Company",
      helper: "Enter your company name.",
      error: "Enter your company name.",
    },
    assessmentType: {
      label: "What needs testing?",
      helper: "Select an assessment area.",
      error: "Select an assessment area.",
    },
    timeline: {
      label: "Preferred timing",
      helper: "Select a timing preference.",
    },
    context: {
      label: "What would you like us to assess?",
      helper:
        "Briefly describe the application, important workflows and assessment goal. Do not include confidential details.",
      error: "Describe your assessment objective.",
    },
  },
};

/** APP-251 — local closing line, after the assessment section. */
export const APPSEC_CLOSING = "Application-first. Expert-led. Evidence-backed.";

/** APP-252 — keyboard-visible skip link. */
export const APPSEC_SKIP = {
  label: "Skip to page content",
  href: "#main",
} as const;
