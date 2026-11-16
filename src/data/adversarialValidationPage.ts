/** Sheet 01 column D. Do not paraphrase. */

export const AV_BREADCRUMB = {
  home: "Home",
  current: "Adversarial Validation",
  homeHref: "/",
} as const;

export const AV_NAV = [
  { label: "Coverage", href: "#coverage" },
  { label: "Exercise formats", href: "#formats" },
  { label: "Method", href: "#method" },
  { label: "Evidence", href: "#evidence" },
  { label: "FAQs", href: "#faqs" },
] as const;

export const AV_HERO = {
  overline: "ENTERPRISE OFFENSIVE SECURITY",
  h1: "Adversarial Validation",
  statement: ["Know where attacks lead.", "Prove where defences hold."] as const,
  lead: "Expert-led penetration testing and threat-led exercises across infrastructure, identities and cloud. Understand how attacks could reach critical systems, how your defences respond and what to improve first.",
  proof: "14 years of offensive security expertise. Human judgment at every critical step.",
  primaryCta: { label: "Scope your assessment", href: "#assessment" },
  secondaryCta: { label: "Explore assessment coverage", href: "#coverage" },
  visualTitle: "From entry point to business impact",
  nodes: [
    "Approved starting point",
    "Identity and access",
    "Network or cloud boundary",
    "Critical business service",
  ] as const,
  band: "Prevention • Detection • Investigation • Response",
  caption:
    "Illustrative assessment path—not a customer result or a live EnProbe screen.",
} as const;

export const AV_OVERVIEW = {
  id: "overview",
  title: "Test the attack path. Not just the individual weakness.",
  intro:
    "An isolated finding rarely tells the whole story. Adversarial Validation examines how weaknesses, permissions and trust relationships could combine into a credible route to business impact. Each engagement starts with an agreed objective and ends with evidence, remediation priorities and clear testing limits.",
  outcomes: [
    {
      title: "Understand the exposure",
      body: "Identify which approved routes could lead to sensitive data, privileged access or critical operations\u2014and which boundaries prevent progression.",
    },
    {
      title: "Examine the defences",
      body: "Where included, compare authorised test activity with prevention controls, available telemetry, alerts and the response taken by your team.",
    },
    {
      title: "Prioritise practical change",
      body: "Focus remediation on demonstrated paths and control gaps. Revalidate agreed changes rather than equating a closed ticket with a verified fix.",
    },
  ],
  definition:
    "Adversarial Validation is Entersoft\u2019s enterprise offensive-security offering. It brings targeted penetration testing and objective-led exercises together to examine attack paths and control effectiveness within an authorised scope.",
} as const;

export const AV_BOUNDARY = {
  id: "boundary",
  title: "Different objectives. Connected expertise.",
  intro:
    "Choose the service around the question you need answered. Application testing, enterprise attack-path testing and ongoing defence operations complement one another; they are not interchangeable.",
  practices: [
    {
      title: "Application Assurance",
      question: "Can this application be exploited?",
      body: "Detailed web, API, mobile, source-code and business-logic assessment. Application defects remain with the AppSec practice, even when an application contributes to a wider attack path.",
      label: "Explore Application Assurance",
      href: "/services/application-security-testing",
      current: false,
    },
    {
      title: "Adversarial Validation",
      question: "Could an attacker reach a critical objective?",
      body: "Enterprise penetration testing and scoped exercises across systems, identities, trust boundaries and defensive controls. This is the focus of this page.",
      label: "Explore assessment coverage",
      href: "#coverage",
      current: true,
    },
    {
      title: "Cyber Defense Operations",
      question: "Can we detect and respond in daily operations?",
      body: "Ongoing monitoring, investigation and response services. Adversarial exercises can test those operations; they do not replace a managed defence service.",
      label: "Explore Cyber Defense Operations",
      href: "/services/managed-detection-response",
      current: false,
    },
  ],
} as const;

export const AV_COVERAGE = {
  id: "coverage",
  title: "Enterprise security assessment coverage.",
  intro: "Build the scope around your critical systems, access paths and risk questions. The following areas describe possible assessment coverage\u2014not a promise that every system or technique is included in every engagement.",
  areas: [
    {
      id: "coverage-external",
      title: "External infrastructure and exposure",
      summary: "Assess approved internet-facing services and the boundaries protecting your enterprise.",
      body: "Examine reachable infrastructure and remote-access entry points in the agreed asset inventory. Combine discovery with controlled manual validation to distinguish a visible service, a potential weakness and a demonstrated route of access.",
      checks: [
        "Approved domains, addresses and external services",
        "Remote-access and administrative interfaces",
        "Authentication and access restrictions on exposed services",
        "Relevant service configuration and vulnerability findings",
        "Evidence supporting an initial-access hypothesis",
        "Ownership, third-party restrictions and untested assets",
      ],
      output: "Validated exposure register, supporting evidence and prioritised recommendations for the tested perimeter.",
    },
    {
      id: "coverage-internal",
      title: "Internal networks and segmentation",
      summary: "Test whether internal access boundaries limit movement toward critical systems.",
      body: "From agreed test locations or supplied access, assess internal services, trust zones and permitted connections. Compare the intended segmentation policy with observed reachability and authorised validation results; do not assume that an inaccessible host proves every control is effective.",
      checks: [
        "Approved network zones and source-to-destination paths",
        "Internal services and administrative interfaces",
        "Segmentation between users, servers and sensitive environments",
        "Access prerequisites and routes requiring additional permission",
        "Potential movement between agreed systems",
        "Blocked, inconclusive and untested paths recorded separately",
      ],
      output: "Boundary-testing matrix, validated internal findings and a record of tested, blocked and unresolved paths.",
    },
    {
      id: "coverage-identity",
      title: "Identity and privileged access",
      summary: "Examine how account permissions and trust relationships affect enterprise exposure.",
      body: "Review the role of identities in the agreed attack scenarios, including directory, federation and privileged-access boundaries where relevant. Test the access available to supplied accounts and the conditions required for a change in privilege. Platform coverage and account types are agreed before testing.",
      checks: [
        "Approved user, service and administrative accounts",
        "Role assignments and privileged-access boundaries",
        "Directory and federation trust relationships",
        "Authentication, session and token controls relevant to the scenario",
        "Service-account and workload-identity permissions",
        "Potential escalation routes and compensating controls",
      ],
      output: "Evidence-backed access-path findings with affected identities, prerequisites and recommended control changes.",
    },
    {
      id: "coverage-hybrid",
      title: "Cloud and hybrid attack paths",
      summary: "Follow authorised trust relationships between cloud services and enterprise systems.",
      body: "Assess how permissions, workloads, service connections and network boundaries interact in an approved AWS, Azure or hybrid scope. The emphasis is on a credible path to the agreed objective, not a generic configuration score. Wider cloud architecture and posture work belongs with Cloud Resilience.",
      checks: [
        "Approved subscriptions, accounts and workloads",
        "Cloud identity and service-to-service trust",
        "Workload access to storage, data and management services",
        "Hybrid connections and cross-environment boundaries",
        "Application-to-cloud pivots expressly included in scope",
        "Cloud-provider testing conditions and customer approvals",
      ],
      output: "Validated hybrid-path narrative, associated permissions and practical recommendations to break the path.",
    },
    {
      id: "coverage-controls",
      title: "Detection and protective controls",
      summary: "Compare controlled activity with the security controls expected to observe or stop it.",
      body: "Where the customer provides access and agrees the test plan, correlate exercise actions with endpoint, identity, network, cloud and SIEM evidence. Record whether an action was prevented, produced telemetry, generated an alert or led to a response. These are separate outcomes, not a single assurance score.",
      checks: [
        "Approved behaviours and expected preventive controls",
        "Endpoint, identity, network and cloud telemetry availability",
        "Alert generation and routing for the tested behaviours",
        "Investigation context and analyst hand-off",
        "Response decisions included in the exercise",
        "Evidence gaps, delayed events and collection limitations",
      ],
      output: "Action-to-control evidence matrix and prioritised detection or response improvement backlog.",
    },
    {
      id: "coverage-critical",
      title: "Critical services and third-party trust",
      summary: "Connect technical paths to the business services they could affect.",
      body: "Start with a defined business objective, such as access to a sensitive dataset or an administration function. Evaluate only the approved systems and dependencies needed to examine that objective. Supplier-operated systems require their own authorisation; a customer relationship alone does not authorise testing.",
      checks: [
        "Critical business services and agreed impact objectives",
        "Remote support and supplier access inside the approved scope",
        "Service dependencies and privileged workflows",
        "Representative test data and non-destructive proof points",
        "Control ownership across internal teams",
        "Unapproved dependencies and residual assumptions",
      ],
      output: "Business-impact narrative with validated prerequisites, affected control owners and explicit scope limitations.",
    },
  ],
} as const;

export const AV_FORMATS = {
  id: "formats",
  title: "Choose the exercise that answers your question.",
  intro: "The same enterprise may need different forms of assurance at different times. We agree the objective, starting access, defender awareness and evidence requirements before selecting the engagement format.",
  formats: [
    {
      id: "format-penetration",
      title: "Targeted penetration testing",
      question: "Where are the exploitable weaknesses?",
      body: "Assess defined infrastructure or identity boundaries using structured testing and controlled validation. The emphasis is on finding and explaining weaknesses in the agreed scope, with actionable remediation and specified retesting.",
      fit: "Best suited to defined assets, significant changes and focused assurance requirements.",
    },
    {
      id: "format-red-team",
      title: "Threat-led red teaming",
      question: "Could an attacker achieve the agreed objective?",
      body: "Build a controlled exercise around a relevant threat scenario and critical business objective. Select plausible behaviours, permitted access paths and limits. Defender awareness and success criteria are agreed; red teaming is not an exhaustive vulnerability assessment.",
      fit: "Best suited to objective-led validation of combined preventive, detective and response controls.",
    },
    {
      id: "format-assumed-breach",
      title: "Assumed-breach assessment",
      question: "What could happen after a foothold?",
      body: "Begin from a customer-approved account, host or access position. Examine the routes available from that starting point and the controls that limit progression. The exercise does not claim to have demonstrated how the initial compromise occurred.",
      fit: "Best suited to testing internal containment, identity boundaries and the potential reach of an initial compromise.",
    },
    {
      id: "format-purple",
      title: "Purple-team exercise",
      question: "Can our teams observe and respond to the tested behaviour?",
      body: "Run agreed scenarios collaboratively with defenders. Compare expected and observed telemetry, alerts and analyst actions, then tune and repeat selected tests. Record remaining gaps and evidence limitations alongside improvements.",
      fit: "Best suited to improving detection coverage, investigation context and response hand-offs.",
    },
  ],
  note: "These formats are scoped separately. Physical intrusion, social engineering, destructive activity, denial-of-service testing and operational-technology testing are not implied inclusions.",
} as const;

export const AV_SCENARIOS = {
  id: "scenarios",
  title: "Real business questions. Controlled test scenarios.",
  intro:
    "These are representative assessment questions, not customer case studies or guaranteed findings. The agreed scope determines which scenarios can be tested and which must remain hypothetical.",
  scenarios: [
    {
      id: "scenarios-1",
      title: "Can an external foothold reach a sensitive service?",
      body: "Follow an approved entry hypothesis across relevant access boundaries toward a named business objective. Stop at the agreed proof point rather than accessing unnecessary production data.",
      evidence: "Path prerequisites, observed control outcomes and the exact boundary reached.",
    },
    {
      id: "scenarios-2",
      title: "Can a low-privilege account gain unintended access?",
      body: "Evaluate role assignments, identity relationships and administration boundaries from a supplied test account. Record both successful access and controls that prevent progression.",
      evidence: "Test identity, authorised scope, observed access and the control responsible.",
    },
    {
      id: "scenarios-3",
      title: "Does segmentation contain an internal compromise?",
      body: "Test approved connections from an assumed starting position into selected trust zones. Distinguish a denied connection from a complete, verified segmentation conclusion.",
      evidence: "Source, destination, direction, expected policy, observed result and testing limits.",
    },
    {
      id: "scenarios-4",
      title: "Can a workload cross into higher-trust cloud services?",
      body: "Examine the permissions and relationships available to an approved workload identity. Validate selected boundaries without making unapproved changes to cloud resources.",
      evidence: "Identity context, relevant permissions and demonstrated or blocked access paths.",
    },
    {
      id: "scenarios-5",
      title: "Would defenders detect and investigate the activity?",
      body: "Compare the exercise timeline with available logs, alerts and analyst actions. Missing evidence is recorded as an evidence gap, not automatically as a failed detection.",
      evidence: "Time-correlated activity, telemetry, alert and response records for the tested scenario.",
    },
    {
      id: "scenarios-6",
      title: "Did the agreed changes break the demonstrated path?",
      body: "Repeat authorised parts of the original scenario after remediation. Report changes in access and control behaviour, including issues that remain open or cannot be retested.",
      evidence: "Before-and-after observations, verification status and residual risk.",
    },
  ],
} as const;

export const AV_METHOD = {
  id: "method",
  title: "A controlled engagement. A defensible result.",
  intro:
    "A documented method connects business objectives, authorised activity and evidence. The plan records assumptions and exclusions as carefully as confirmed findings.",
  stages: [
    {
      id: "method-1",
      title: "Define the objective",
      body: "Agree the critical service, business question, systems, test approach and evidence needed. Identify the accountable sponsor and technical contacts.",
      output: "Scope, success criteria and engagement plan.",
    },
    {
      id: "method-2",
      title: "Authorise the activity",
      body: "Set rules of engagement, permissions, test windows, permitted techniques, data-handling requirements and stop conditions before any active work.",
      output: "Approved rules, escalation contacts and safety boundaries.",
    },
    {
      id: "method-3",
      title: "Map relevant paths",
      body: "Examine the authorised environment, identity relationships and available threat context. Select plausible paths and record prerequisites that are supplied rather than demonstrated.",
      output: "Scenario plan, starting assumptions and test cases.",
    },
    {
      id: "method-4",
      title: "Validate under control",
      body: "Execute the approved scenarios, gather proportionate evidence and stop at agreed proof points. Escalate critical discoveries through the agreed contact route.",
      output: "Reproducible findings and a time-stamped activity record.",
    },
    {
      id: "method-5",
      title: "Review the defences",
      body: "Where included, correlate activity with prevention, telemetry, alerts and response records. Explain business impact and prioritise changes with the responsible teams.",
      output: "Control observations and a prioritised improvement plan.",
    },
    {
      id: "method-6",
      title: "Retest and hand over",
      body: "Verify agreed remediation within the contracted retest scope. Record remaining exposure, unresolved questions and cleanup confirmation before the final handover.",
      output: "Retest results, residual-risk record and executive debrief.",
    },
  ],
  notice:
    "Retesting, defender participation and telemetry review are defined in the proposal. No exercise provides complete coverage or a guarantee against future compromise.",
} as const;

export const AV_EVIDENCE = {
  id: "evidence",
  title: "Evidence, not a headline percentage.",
  intro: "A useful result separates what was attempted, what was observed and what remains unknown. This prevents a blocked action, a missing log and an untested scenario from being treated as the same outcome.",
  label: "ILLUSTRATIVE EVIDENCE RECORD \u2014 synthetic example; not a customer result",
  fields: [
    {
      label: "Objective",
      value: "Determine whether a supplied test identity can reach a protected administration function.",
    },
    {
      label: "Starting point",
      value: "A customer-provided low-privilege account. Initial compromise is not tested.",
    },
    {
      label: "Prevention",
      value: "The tested request is denied at the application access boundary.",
    },
    {
      label: "Telemetry",
      value: "An access-denied event is present in the logs made available for review.",
    },
    {
      label: "Alerting",
      value: "No matching alert is evidenced in the supplied review window; wider detection coverage is not inferred.",
    },
    {
      label: "Response",
      value: "Not exercised in this scenario.",
    },
    {
      label: "Conclusion",
      value: "The tested access boundary held for this account and action. Alert requirements need review against the agreed use case.",
    },
  ],
  status: "Evidence states: demonstrated \u2022 blocked \u2022 not tested \u2022 inconclusive. Retest states: resolved \u2022 partly resolved \u2022 unresolved \u2022 not retested.",
  note: "Counts and percentages are meaningful only with a defined scope, denominator, test window and evidence source. We do not present an illustrative score as a measured customer outcome.",
} as const;

export const AV_EXPERT = {
  id: "expert",
  title: "AI assists the analysis. Experts lead the exercise.",
  intro: "Entersoft\u2019s offensive-security experience informs scenario selection, validation and interpretation. AI-assisted analysis can support repeatable work; it does not replace authorisation, expert judgment or customer control.",
  cards: [
    {
      id: "expert-1",
      title: "Use automation where it helps",
      body: "Use approved tooling and AI-assisted analysis for tasks such as organising candidate findings, correlating available context and preparing draft summaries. Experts check outputs against the evidence.",
    },
    {
      id: "expert-2",
      title: "Keep consequential decisions human-led",
      body: "Security specialists select the test approach, assess operational risk and validate conclusions. Customer-approved rules govern active testing, access changes and any response actions.",
    },
    {
      id: "expert-3",
      title: "Protect sensitive engagement data",
      body: "Agree permitted tools, data handling and model use before the engagement. Sensitive evidence is not submitted to an unapproved external model or service.",
    },
  ],
  enprobeTitle: "EnProbe provides context\u2014not a substitute for the exercise.",
  enprobeBody: "Where included, EnProbe\u2019s enabled DAST, SCA, ASPM, AWS/Azure CSPM and GRC modules can contribute application, dependency, cloud and control context. The engagement combines available platform information with specialist testing and evidence review.",
  enprobeNote: "Enabled modules, data sources and workflow connections are confirmed during scoping. This page does not imply that EnProbe is a native red-team execution, attack-simulation or endpoint-response platform.",
} as const;

export const AV_DELIVERABLES = {
  id: "deliverables",
  title: "What your teams receive.",
  intro:
    "The proposal defines the final deliverable set and retest allowance. The reporting connects technical evidence with the decisions engineering, security operations and leadership need to make.",
  enquiryHref: "#assessment",
  cards: [
    {
      id: "deliverables-1",
      title: "Executive risk narrative",
      body: "Objectives, material observations, business implications and priority decisions, written for security leaders and business owners.",
    },
    {
      id: "deliverables-2",
      title: "Technical findings and evidence",
      body: "Affected systems, prerequisites, controlled reproduction evidence, severity rationale, remediation guidance and material limitations.",
    },
    {
      id: "deliverables-3",
      title: "Attack-path and scope record",
      body: "The tested sequence, trust boundaries, achieved or blocked objectives and a clear distinction between observed steps and supplied assumptions.",
    },
    {
      id: "deliverables-4",
      title: "Control-validation matrix",
      body: "For included defence-validation work: expected controls, observed prevention, available telemetry, alerts and response evidence linked to the scenario.",
    },
    {
      id: "deliverables-5",
      title: "Prioritised improvement plan",
      body: "Recommended changes, responsible functions, dependencies and suggested verification steps. Customer teams retain implementation ownership unless otherwise agreed.",
    },
    {
      id: "deliverables-6",
      title: "Retest and closure record",
      body: "Results of contracted revalidation, remaining gaps, items not retested and cleanup confirmation. Closure is based on evidence, not only workflow status.",
    },
  ],
} as const;

export const AV_STANDARDS = {
  id: "standards",
  title: "Recognised references. Scope-specific application.",
  intro:
    "The assessment plan identifies the references, versions and test depth relevant to the engagement. Threat knowledge, testing guidance and severity scoring have different roles; none proves complete coverage on its own.",
  cards: [
    {
      id: "standards-1",
      title: "MITRE ATT&CK",
      body: "Use relevant adversary behaviours to structure scenarios and communicate what was tested. Technique mapping records scope; it is not MITRE certification or proof of full-matrix coverage.",
      sources: [{ label: "MITRE ATT&CK", href: "https://attack.mitre.org/" }],
    },
    {
      id: "standards-2",
      title: "NIST SP 800-115",
      body: "Use planning, execution and reporting guidance for technical security assessments. This is an assessment guide, not a complete catalogue of modern attack techniques.",
      sources: [{ label: "NIST SP 800-115", href: "https://csrc.nist.gov/pubs/sp/800/115/final" }],
    },
    {
      id: "standards-3",
      title: "CWE and CVSS",
      body: "Use weakness classifications and an agreed severity method where appropriate. Record the scoring version and vector; explain exploitability and business impact separately.",
      sources: [
        { label: "FIRST CVSS", href: "https://www.first.org/cvss/" },
        { label: "MITRE CWE", href: "https://cwe.mitre.org/" },
      ],
    },
    {
      id: "standards-4",
      title: "Relevant application and cloud guidance",
      body: "Apply appropriate OWASP and platform-specific references when an agreed attack path includes an application or cloud boundary. Dedicated AppSec verification remains within Application Assurance.",
      sources: [{ label: "OWASP WSTG", href: "https://owasp.org/www-project-web-security-testing-guide/" }],
    },
    {
      id: "standards-5",
      title: "Customer control and exercise requirements",
      body: "Map evidence to the controls and acceptance criteria agreed with the customer. A specialised regulatory exercise or accreditation scheme requires its own scope and provider eligibility.",
      sources: [
        {
          label: "CREST red teaming and accreditation",
          href: "https://www.crest-approved.org/cyber-service-categories/red-teaming/",
        },
      ],
    },
  ],
  note: "Testing methodology is separate from company accreditation. Current credentials, applicable legal entity and service scope can be reviewed during supplier due diligence.",
} as const;

export const AV_SAFETY = {
  id: "safety",
  title: "Realistic testing. Explicit boundaries.",
  intro:
    "An effective exercise needs control as well as realism. These conditions are agreed before testing, not added after a disruption.",
  cards: [
    {
      id: "safety-1",
      title: "Written authority",
      body: "Identify asset owners, authorised systems and any supplier or cloud-provider permissions. Excluded systems remain out of bounds.",
    },
    {
      id: "safety-2",
      title: "Agreed proof points",
      body: "Prefer proportionate evidence and representative data. Real-data movement, high-impact actions and persistence require explicit approval and additional safeguards.",
    },
    {
      id: "safety-3",
      title: "Operational safety",
      body: "Set test windows, activity limits, escalation contacts and stop conditions. Production work is not described as risk-free.",
    },
    {
      id: "safety-4",
      title: "Defender awareness",
      body: "Agree who knows about the exercise and when. Collaborative purple-team work and less-disclosed red-team work use different communication plans.",
    },
    {
      id: "safety-5",
      title: "Evidence protection",
      body: "Define access, transfer, retention, storage and deletion requirements for engagement data. Apply the agreed privacy and confidentiality controls.",
    },
    {
      id: "safety-6",
      title: "Cleanup and residual risk",
      body: "Remove agreed test artefacts, confirm relevant access changes and document remaining exposure and verification limits.",
    },
  ],
} as const;

export const AV_FAQS = {
  id: "faqs",
  title: "Questions enterprise buyers ask.",
  items: [
    {
      id: "faq-1",
      question: "What is Adversarial Validation?",
      answer: "Adversarial Validation is Entersoft\u2019s enterprise offensive-security offering. It combines targeted penetration testing and objective-led exercises to examine how weaknesses and trust relationships could lead to business impact. The agreed scope defines the environments, techniques, starting access and defensive controls included.",
    },
    {
      id: "faq-2",
      question: "How is it different from application security testing?",
      answer: "Application Assurance examines applications, APIs, mobile clients, code and business logic in depth. Adversarial Validation focuses on broader enterprise attack paths and control effectiveness. An application may form one part of a wider scenario, but a red-team exercise does not replace a complete AppSec assessment.",
    },
    {
      id: "faq-3",
      question: "Does this still include penetration testing?",
      answer: "Yes. Targeted penetration testing remains an engagement format within Adversarial Validation. It can assess approved external or internal infrastructure, identity boundaries and related paths. Detailed web, API and mobile penetration testing remains available through Application Assurance.",
    },
    {
      id: "faq-4",
      question: "How is red teaming different from a penetration test?",
      answer: "A penetration test looks for exploitable weaknesses in a defined scope. A red-team exercise is organised around a threat scenario and an agreed objective, often examining multiple controls along a path. It is not intended to identify every vulnerability in the environment.",
    },
    {
      id: "faq-5",
      question: "What is an assumed-breach assessment?",
      answer: "It starts from an explicitly agreed foothold, such as a supplied account or test host. The assessment examines what that access could enable and which boundaries contain it. It does not claim to prove that an attacker could obtain the starting access in the first place.",
    },
    {
      id: "faq-6",
      question: "What happens in a purple-team exercise?",
      answer: "Testers and defenders work together on agreed behaviours. They compare exercise activity with telemetry, alerts and response actions, identify gaps and repeat selected tests after changes. It is a collaborative improvement exercise rather than an undisclosed test of the SOC.",
    },
    {
      id: "faq-7",
      question: "Can you assess identity, cloud and hybrid environments?",
      answer: "These areas can be included where the agreed scope, access and permissions support the work. We identify the platforms, account types, workloads and trust boundaries before testing. Wider cloud posture assessment and application-specific verification are separate, complementary scopes.",
    },
    {
      id: "faq-8",
      question: "Will the exercise measure our SOC or EDR effectiveness?",
      answer: "Only when defence validation is included and the required evidence is available. We distinguish prevention, telemetry, alerting, investigation and response. A missing log or inaccessible console is recorded as an evidence limitation rather than treated automatically as a product or team failure.",
    },
    {
      id: "faq-9",
      question: "Can testing run against production systems?",
      answer: "Production testing requires written authority, suitable access, agreed windows, activity limits and stop conditions. Some scenarios may need a test environment or may be excluded. No penetration test or red-team exercise is entirely risk-free.",
    },
    {
      id: "faq-10",
      question: "Are phishing, physical intrusion or ransomware tests included?",
      answer: "Not by default. Social engineering, physical access, operational technology, denial-of-service and destructive activity require separate approval and specialist scope. A ransomware-related scenario can use non-destructive proof points; it does not imply running ransomware or disrupting production.",
    },
    {
      id: "faq-11",
      question: "How do AI and EnProbe support the work?",
      answer: "Approved AI-assisted analysis can help organise and correlate information, subject to expert review and agreed data handling. Enabled EnProbe modules can contribute application, dependency, cloud and control context. They do not replace specialist execution or establish that EnProbe is an autonomous red-team platform.",
    },
    {
      id: "faq-12",
      question: "What do we receive, and are fixes retested?",
      answer: "The proposal defines the reporting and retest allowance. Typical outputs include an executive summary, technical evidence, tested paths, prioritised improvements and, where scoped, a control-validation matrix. Retesting records verified changes and items that remain unresolved or were not retested.",
    },
    {
      id: "faq-13",
      question: "Does the assessment certify compliance or complete security?",
      answer: "No. It provides evidence for a specified scope, period and access level. The evidence may support an assurance or audit process, but it is not a guarantee of legal compliance, regulatory acceptance or protection against every future attack.",
    },
    {
      id: "faq-14",
      question: "What determines effort, timing and price?",
      answer: "The number and complexity of systems, identity boundaries, attack objectives, starting access, operational constraints and defender participation affect effort. We agree prerequisites, milestones, deliverables and retest limits in the proposal instead of promising a universal turnaround or unlimited coverage.",
    },
  ],
} as const;

export const AV_RELATED = {
  id: "related",
  title: "Connect the findings to the right practice.",
  intro: "Use a focused exercise to identify the next action\u2014not to replace every other security service.",
  cards: [
    {
      id: "related-1",
      title: "Application Assurance",
      body: "Investigate application, API, mobile and business-logic weaknesses in depth.",
      label: "Explore Application Assurance",
      href: "/services/application-security-testing",
    },
    {
      id: "related-2",
      title: "Cloud Resilience",
      body: "Address wider cloud architecture, permissions and configuration improvements.",
      label: "Explore Cloud Resilience",
      href: "/services/cloud-security",
    },
    {
      id: "related-3",
      title: "Cyber Defense Operations",
      body: "Translate exercise observations into ongoing detection and response improvements.",
      label: "Explore Cyber Defense Operations",
      href: "/services/managed-detection-response",
    },
    {
      id: "related-4",
      title: "Digital Trust",
      body: "Connect the evidence to governance, assurance and applicable control obligations.",
      label: "Explore Digital Trust",
      href: "/services/grc-compliance-privacy",
    },
  ],
} as const;

export const AV_ASSESSMENT = {
  id: "assessment",
  title: "Which attack path do you need to understand?",
  lead: "Tell us the business objective, the environment and the assurance you need. We will help define the right exercise, authorisation requirements and expected outputs.",
  formTitle: "Scope your Adversarial Validation assessment",
  notice: "Do not submit passwords, tokens, sensitive diagrams, personal records or confidential technical evidence through this form.",
  required: "Fields marked with an asterisk are required.",
  privacy: "We use the details you provide to respond to this enquiry. Read our Privacy Notice.",
  submit: "Request an assessment discussion",
  sending: "Sending your enquiry\u2026",
  success: "Thank you. Your enquiry has been received. Our team will contact you to discuss scope and next steps.",
  error: "We could not send your enquiry. Your entries are still available. Please try again.",
  validation: "Please complete the required fields and enter a valid email address.",
  preview: "Preview only. No enquiry has been sent. The production form must use the approved lead endpoint and Privacy Notice.",
  fields: {
    fullName: { label: "Full name *", placeholder: "Enter your name." },
    workEmail: { label: "Work email *", placeholder: "name@company.com" },
    company: { label: "Company *", placeholder: "Enter your company name." },
    format: { label: "Assessment objective *" },
    environment: { label: "Primary environment" },
    timing: { label: "Preferred timing" },
    context: { label: "What question should the exercise answer? *", placeholder: "Describe the business objective and environment at a high level. Do not include confidential details." },
  },
  formatOptions: [
    "Targeted penetration testing",
    "Threat-led red teaming",
    "Assumed-breach assessment",
    "Purple-team exercise",
    "Help me define the scope",
  ] as const,
  environmentOptions: [
    "External infrastructure",
    "Internal network or identity",
    "Cloud or hybrid environment",
    "Multiple environments",
    "To be agreed",
  ] as const,
  timingOptions: [
    "As soon as practical",
    "Within one month",
    "Within three months",
    "Exploring options",
  ] as const,
} as const;

export const AV_PAGE_FOOTER = "Application-first. Expert-led. Evidence-backed.";
