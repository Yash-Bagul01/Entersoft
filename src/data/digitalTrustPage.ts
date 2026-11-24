/** Sheet 01 column D. Do not paraphrase. DT-003–DT-018 and DT-019–DT-057. */

export const DT_HERO = {
  eyebrow: "GOVERNANCE: PRIVACY: THIRD-PARTY ASSURANCE",
  h1: ["Digital Trust.", "Built on evidence."] as const,
  lead: "Turn governance, privacy and third-party risk into clear decisions, owned actions and defensible evidence: with Entersoft experts guiding the work and EnProbe supporting the agreed workflows.",
  primary: { label: "Discuss your priorities", href: "#briefing" },
  secondary: { label: "Explore our services", href: "#services" },
  proof: "Built on 14 years of offensive security expertise.",
  support: "Expert-led delivery: Evidence-backed reviews: Ongoing assurance",
  breadcrumb: ["Home", "Services", "Digital Trust"] as const,
} as const;

export const DT_OUTCOMES = {
  eyebrow: "THE BUSINESS OUTCOME",
  title: "Clear priorities. Evidence you can use.",
  lead: "Digital Trust connects governance, risk and compliance (GRC) with the people and systems that make controls work.",
  cards: [
    {
      title: "Know what needs attention",
      body: "Identify control gaps, assign accountable owners and focus investment on the risks that matter to your business.",
    },
    {
      title: "Prepare with confidence",
      body: "Build traceable evidence for customer reviews, management decisions and independent audits: without treating a dashboard as a certification.",
    },
    {
      title: "Make informed supplier decisions",
      body: "Review supplier risk, record exceptions and follow up on agreed actions before and after onboarding.",
    },
  ],
} as const;

/** DT-081 caption and DT-092–DT-095, the illustrative row whose state is an open action. */
export const DT_HERO_RECORD = {
  caption:
    "Illustrative service view. Not customer data, an audit opinion or a live EnProbe screenshot.",
  reviewTitle: "Illustrative service view",
  control: "Supplier due diligence",
  evidenceReviewed: "Assurance pack incomplete",
  evidenceState: "Action required",
  accountableOwner: "owner and reviewer",
  nextAction: "Obtain missing evidence",
} as const;

/** DT-019–DT-057. Anchors are the workbook target values, not a separate third-party page. */
export const DT_SERVICES = {
  eyebrow: "FOUR CONNECTED SERVICES",
  title: "From policy to proof.",
  lead: "Choose a focused review or a broader programme. We agree the scope, evidence sources and responsibilities before work begins.",
  items: [
    {
      id: "governance-audit",
      number: "01",
      title: "Governance & audit readiness",
      summary:
        "Turn obligations into a practical control programme with clear owners, priorities and review evidence.",
      detail:
        "We assess your current governance and control environment, define the programme boundary, and build a prioritised improvement plan. Support can include risk assessment, policy design, ISMS readiness, internal review and preparation for an independent external assessment. Technical checks are agreed separately where evidence needs to be tested.",
      output: "A scoped readiness assessment, prioritised action plan and evidence register.",
      boundary:
        "External certification and assurance opinions remain with the relevant independent assessor.",
      scope: [
        "Scope, risk register and control ownership",
        "Policies, procedures and evidence requirements",
        "Readiness reviews and audit coordination",
      ],
    },
    {
      id: "privacy-data",
      number: "02",
      title: "Privacy & data governance",
      summary:
        "Understand how personal data moves, who can access it and which safeguards need attention.",
      detail:
        "We map relevant processing activities, data flows and access boundaries, then review retention, deletion, processor oversight and operational privacy controls. Work may support GDPR or India’s DPDP requirements where applicable. Legal interpretation, transfer mechanisms and organisation-specific obligations are agreed with your privacy and legal teams.",
      output: "A data-flow view, privacy gap assessment and prioritised control recommendations.",
      boundary:
        "Data residency is assessed against applicable obligations; local hosting is not presented as a universal privacy requirement.",
      scope: [
        "Data-flow and processing inventory",
        "Access, retention and deletion reviews",
        "Processor oversight and privacy action plans",
      ],
    },
    {
      id: "third-party-service",
      number: "03",
      title: "Third-Party Risk Assurance",
      summary:
        "Move beyond questionnaires to evidence-led supplier reviews and accountable follow-up.",
      detail:
        "We help enterprises classify suppliers, review relevant evidence and record decisions, exceptions and remediation. We also help suppliers prepare clear assurance packs for their customers. Authorised technical validation can strengthen a review when included in scope; continuous external monitoring is an optional, separately agreed service.",
      output: "A supplier risk assessment, evidence index and action register.",
      boundary:
        "Supplier consent, assessment independence and access permissions are defined before information is collected or shared.",
      scope: [
        "Supplier inventory, criticality and tiering",
        "Evidence reviews and scoped technical checks",
        "Remediation, reassessment and decision records",
      ],
    },
    {
      id: "control-evidence",
      number: "04",
      title: "Control & evidence assurance",
      summary:
        "Keep control owners, review dates and supporting evidence connected between formal assessments.",
      detail:
        "We define what evidence each control needs, who owns it and how often it must be reviewed. Evidence may come from approved documents, interviews, technical checks or supported system integrations. Reviews distinguish missing evidence, design gaps and operating exceptions rather than converting every collected record into a passing control.",
      output: "A reviewable control and evidence register with open actions and ownership.",
      boundary:
        "Collection frequency, coverage and supported integrations are agreed in scope; continuous does not mean all controls are monitored in real time.",
      scope: [
        "Control-to-evidence mapping",
        "Review cadence and exception tracking",
        "Management reporting and ongoing follow-up",
      ],
    },
  ],
} as const;

/** DT-058–DT-077. Both buyer paths stay on this page; there is no separate TPRM route. */
export const DT_TPRM = {
  id: "third-party-risk",
  eyebrow: "THIRD-PARTY RISK ASSURANCE",
  title: "Trust works both ways.",
  lead: "A dedicated service within Digital Trust: for organisations assessing suppliers and for suppliers answering customer reviews.",
  programmeTitle: "What can an annual supplier programme include?",
  programme:
    "An agreed supplier inventory and tiering model; scheduled evidence reviews; authorised technical checks where needed; remediation tracking; periodic management reporting; and reassessment after material changes. Supplier volume, criticality, assessment depth and monitoring coverage determine the service scope.",
  independence:
    "Enterprise-side assessments and supplier-side preparation are separate engagements. Potential conflicts are disclosed and managed; confidential evidence is shared only with permission. A reusable pack does not replace each customer’s risk decision.",
  paths: [
    {
      id: "enterprise",
      title: "For enterprises",
      body: "Build a supplier assurance programme that reflects service criticality, data access and business dependency.",
      actions: [
        "Tier suppliers and define review depth.",
        "Review controls and validate relevant evidence.",
        "Track remediation, exceptions and reassessments.",
      ],
      output: "Supplier risk register: Review reports: Decision records",
      cta: "Discuss supplier risk",
      href: "#briefing",
    },
    {
      id: "supplier",
      title: "For technology suppliers",
      body: "Prepare a coherent, reusable evidence pack that helps customers understand your controls and their limitations.",
      actions: [
        "Review readiness against customer requirements.",
        "Organise evidence and questionnaire responses.",
        "Close gaps and document the agreed follow-up.",
      ],
      output: "Customer assurance pack: Gap plan: Evidence index",
      cta: "Prepare for a customer review",
      href: "#briefing",
    },
  ],
} as const;

/** DT-078–DT-099. Three fictional rows only; the caption stays with the example. */
export const DT_EVIDENCE = {
  id: "evidence",
  eyebrow: "HOW THE WORK BECOMES VISIBLE",
  title: "Show the evidence behind the decision.",
  lead: "Connect the requirement, control owner, evidence reviewed and open action. Leaders see what is supported: and what still needs work.",
  caption: "Illustrative service view. Not customer data, an audit opinion or a live EnProbe screenshot.",
  recordTitle: "What each evidence record should contain",
  record:
    "Control and requirement reference; asset, process or supplier scope; evidence source and review period; owner and reviewer; review conclusion; exception or limitation; next action and due date. Evidence supports a scoped judgement: it is not an automatic guarantee of compliance.",
  columns: ["Control area", "Evidence reviewed", "Review state", "Next action"] as const,
  rows: [
    {
      area: "Privileged access",
      evidence: "Approved access review",
      state: "Reviewed",
      action: "Schedule the next review",
    },
    {
      area: "Supplier due diligence",
      evidence: "Assurance pack incomplete",
      state: "Action required",
      action: "Obtain missing evidence",
    },
    {
      area: "Data retention",
      evidence: "Policy and system checks",
      state: "Under review",
      action: "Validate deletion behaviour",
    },
  ],
} as const;

/** DT-100–DT-118. Milestone bodies stay expandable; titles and outputs stay visible. */
export const DT_DELIVERY = {
  id: "delivery",
  eyebrow: "DELIVERY MODEL",
  title: "A clear path from gaps to evidence.",
  lead: "Milestones are agreed around your scope and readiness: not a blanket promise of certification in 90 days.",
  note: "Timing depends on scope, maturity, evidence history and independent assessor availability. Changes to production controls require explicit authorisation.",
  steps: [
    {
      title: "Scope",
      output: "Scope and responsibility plan",
      body: "Agree the business objective, applicable obligations, boundaries, evidence access and accountable owners.",
    },
    {
      title: "Assess",
      output: "Baseline and prioritised gap register",
      body: "Review control design and available evidence. Identify gaps, dependencies and priorities.",
    },
    {
      title: "Strengthen",
      output: "Action plan and implementation support",
      body: "Support policies, control improvements and remediation with your owners and delivery teams.",
    },
    {
      title: "Validate",
      output: "Readiness and evidence pack",
      body: "Review completed actions, test agreed controls and prepare evidence for management or independent assessors.",
    },
    {
      title: "Sustain",
      output: "Recurring assurance and decision reports",
      body: "Refresh evidence, track changes and reassess open risks at the agreed cadence.",
    },
  ],
} as const;

/** DT-119–DT-129. Outputs stay qualified by the engagement-scope note. */
export const DT_DELIVERABLES = {
  id: "deliverables",
  eyebrow: "WHAT YOU RECEIVE",
  title: "Useful to the board. Actionable for owners.",
  note: "Deliverables and review frequency are fixed in the engagement scope. Framework-specific evidence is reused only where its relevance, coverage and review period fit.",
  items: [
    {
      title: "Prioritised risk & action register",
      body: "Document the issue, business relevance, accountable owner, agreed action and target date.",
    },
    {
      title: "Control & evidence register",
      body: "Trace requirements to controls, review records, evidence sources and known limitations.",
    },
    {
      title: "Readiness & assurance pack",
      body: "Organise the agreed documents and technical evidence for customer, management or external reviews.",
    },
    {
      title: "Management decision brief",
      body: "Summarise material gaps, progress, exceptions and decisions required from leadership.",
    },
  ],
} as const;

/** DT-130–DT-143. Names stay text. ISO 42001 is not part of this list. */
export const DT_FRAMEWORKS = {
  id: "frameworks",
  eyebrow: "FRAMEWORKS & OBLIGATIONS",
  title: "The right evidence for the right requirement.",
  lead: "We agree applicability before mapping controls. Standards, laws and regulator-specific obligations are not interchangeable.",
  note: "Readiness support does not guarantee certification, an unqualified assurance report or legal compliance. External assessors retain their independent conclusions.",
  items: [
    {
      name: "ISO/IEC 27001",
      detail:
        "ISMS readiness, risk treatment, control ownership and preparation for an independent certification assessment. The agreed baseline is ISO/IEC 27001:2022, with applicable amendments.",
    },
    {
      name: "SOC 2",
      detail:
        "Readiness support for the agreed Trust Services Criteria and examination scope. An independent licensed CPA firm performs the SOC 2 examination and issues its report. SOC 2 is not an ISO-style certification.",
    },
    {
      name: "GDPR & India DPDP",
      detail:
        "Support for relevant data governance, privacy controls and evidence. Applicability, phased commencement and organisation-specific legal duties must be reviewed with qualified counsel.",
    },
    {
      name: "PCI DSS",
      detail:
        "Support for scoped control readiness and technical evidence using the applicable PCI DSS requirements. The validation route and any required qualified assessor are agreed separately.",
    },
    {
      name: "Sector-specific obligations",
      detail:
        "Map the requirements relevant to your regulated entity, services and jurisdiction. Confirm the exact instrument, version, scope and evidence expectations before making a regulatory compliance claim.",
    },
  ],
} as const;

/** DT-144–DT-151. EnProbe supports agreed workflows; it does not replace the service. */
export const DT_EXPERTS = {
  id: "experts-platform",
  eyebrow: "EXPERTS + TECHNOLOGY",
  title: "AI assists. Experts stay accountable.",
  lead: "Use technology to organise the work: not to replace professional judgement.",
  expertTitle: "Entersoft expert services",
  expertBody:
    "Define scope, review controls, challenge evidence and guide remediation. Your management team retains accountability for its controls and risk acceptance.",
  platformTitle: "EnProbe GRC support",
  platformBody:
    "Use EnProbe for agreed governance and evidence workflows where supported. Available functions, integrations, access permissions and data handling are confirmed during scoping.",
  aiNote:
    "Where AI is used for document triage, drafting or suggested mappings, experts review the sources and conclusions. No automated compliance approval, risk acceptance or certificate is implied.",
} as const;

/** DT-152–DT-162. Three scope formats. No prices, durations, or acceptance claim. */
export const DT_ENGAGEMENTS = {
  id: "engagements",
  eyebrow: "WAYS TO ENGAGE",
  title: "Start focused. Build ongoing assurance.",
  items: [
    {
      title: "Readiness review",
      body: "Establish your baseline and the practical actions needed for a defined customer, audit or governance objective.",
      tag: "A defined assessment",
    },
    {
      title: "Programme support",
      body: "Build the controls, ownership and evidence practices needed to close agreed gaps.",
      tag: "A scoped improvement programme",
    },
    {
      title: "Ongoing assurance",
      body: "Maintain evidence reviews, supplier reassessments and leadership reporting at an agreed cadence.",
      tag: "A recurring service",
    },
  ],
} as const;

/** DT-163–DT-188. Twelve questions; answers stay in the initial HTML. */
export const DT_FAQ = {
  id: "faq",
  eyebrow: "BUYER QUESTIONS",
  title: "Clear answers before we begin.",
  items: [
    {
      question: "Is Digital Trust a service or a software platform?",
      answer:
        "Digital Trust is an Entersoft service covering governance, audit readiness, privacy, third-party risk and control evidence. EnProbe is a separate platform that may support agreed workflows. Buying the service does not automatically mean every activity is automated or every integration is included.",
    },
    {
      question: "Does Entersoft issue ISO certificates or SOC 2 reports?",
      answer:
        "This offering provides advisory and readiness support. An independent certification body decides ISO certification; an independent licensed CPA firm performs a SOC 2 examination and issues its report. We can help prepare evidence and explain the agreed work without controlling the external assessment outcome.",
    },
    {
      question: "Can we start with one framework or one supplier?",
      answer:
        "Yes. A defined readiness review or supplier assessment can be the starting point. We agree the objective, assessment depth, evidence needed and expected outputs before expanding to a broader programme.",
    },
    {
      question: "How is Third-Party Risk Assurance delivered?",
      answer:
        "The service can cover supplier inventory and tiering, evidence reviews, authorised technical checks, remediation tracking and periodic reassessment. Suppliers can also engage Entersoft separately to prepare for customer reviews. Conflicts, consent and evidence-sharing rules are addressed before delivery.",
    },
    {
      question: "Does an annual supplier programme include continuous monitoring?",
      answer:
        "Monitoring is not automatically included. We define which suppliers and signals are covered, the data sources, review frequency, escalation process and any partner platform requirements. A periodic assessment and continuous external monitoring are different service components.",
    },
    {
      question: "How do you collect evidence?",
      answer:
        "Evidence may come from approved documents, interviews, configuration exports, authorised testing and supported integrations. We agree access permissions, collection frequency, retention and handling requirements. Evidence is reviewed in context; a collected record is not automatically a passing control.",
    },
    {
      question: "Can the same evidence support several frameworks?",
      answer:
        "Often, relevant evidence can be reused. Each mapping must still consider the specific requirement, system boundary, review period and assessor expectations. We do not assume a universal overlap percentage or that one assessment satisfies every obligation.",
    },
    {
      question: "How do you support GDPR and DPDP readiness?",
      answer:
        "Work may include data-flow mapping, processing inventories, retention and deletion controls, processor oversight and privacy action plans. The applicable legal duties and implementation dates depend on your circumstances and are reviewed with your privacy and legal teams.",
    },
    {
      question: "How long does a readiness engagement take?",
      answer:
        "We set the plan after reviewing your scope, current controls, available evidence and desired outcome. External assessor scheduling and any required operating-history period can affect the timeline. We do not promise every organisation certification within a fixed number of days.",
    },
    {
      question: "Will the work disrupt our systems?",
      answer:
        "Evidence reviews are planned with your teams. Any technical testing, access change or control implementation requires an agreed scope and authorisation. We define responsibilities and change windows where needed rather than promising zero operational impact.",
    },
    {
      question: "What role does AI play?",
      answer:
        "Where approved, AI can assist document triage, drafting and proposed mappings. Entersoft experts review outputs and supporting evidence. Client management remains responsible for its decisions, and independent assessors remain responsible for their opinions.",
    },
    {
      question: "What remains our responsibility?",
      answer:
        "Your organisation approves the scope, provides accurate evidence, assigns owners and makes risk-acceptance and operational decisions. Entersoft provides the agreed assessment and advisory work. Responsibilities, confidentiality and any conflicts are documented in the engagement.",
    },
  ],
} as const;

/**
 * DT-189–DT-238.
 * Success, pending and error strings are approved for a live backend.
 * They are not rendered: no endpoint or privacy-notice URL is approved.
 */
export const DT_BRIEFING = {
  id: "briefing",
  eyebrow: "START WITH THE DECISION YOU NEED TO MAKE",
  title: "What do you need to prove?",
  lead: "Tell us whether you are preparing for an audit, reviewing suppliers or strengthening governance. We will help define the right scope and evidence.",
  button: "Request a Digital Trust briefing",
  notice: "Do not include passwords, customer records, confidential reports or sensitive system details.",
  privacy: "We use the details you provide to respond to this enquiry. Refer to Entersoft’s Privacy Notice for handling information.",
  required: "Fields marked * are required.",
  success: "Thank you. Your enquiry has been received. Our team will contact you to discuss the scope.",
  error: "We could not send your enquiry. Please try again or use the contact details on our website.",
  pending: "Sending your enquiry…",
  preview: "Preview only: this form does not send or store your information.",
  name: { label: "Full name *", placeholder: "Your name", error: "Enter your name." },
  email: { label: "Work email *", placeholder: "you@company.com", error: "Enter a valid email address." },
  company: { label: "Company *", placeholder: "Company name", error: "Enter your company name." },
  priority: {
    label: "Primary priority *",
    error: "Choose your primary priority.",
    options: [
      "Choose a priority",
      "Audit readiness",
      "Privacy and data governance",
      "Supplier risk assessment",
      "Supplier customer-review readiness",
      "Control and evidence assurance",
      "Not sure yet",
    ],
  },
  timeline: {
    label: "Target timeframe",
    options: ["Select if known", "Within 1 month", "1 to 3 months", "3 to 6 months", "Exploring options"],
  },
  message: {
    label: "What decision or requirement are you working towards?",
    placeholder: "A brief, non-sensitive summary.",
    error: "Keep your message within 1,000 characters.",
  },
  relatedTitle: "Connect assurance with technical validation.",
  related: [
    {
      title: "Application Assurance",
      body: "Validate the application risks behind control requirements.",
      href: "/services/application-security-testing",
    },
    {
      title: "Cloud Resilience",
      body: "Review cloud and identity controls within the agreed environment.",
      href: "/services/cloud-security",
    },
    {
      title: "AI Systems Assurance",
      body: "Connect AI governance questions with scoped technical testing.",
      href: "/services/ai-security-testing",
    },
  ],
  statement: "Entersoft Digital Trust: governance, privacy and third-party assurance backed by evidence.",
  parent: "Services",
  page: "Digital Trust",
  copyright: "© Entersoft Security",
  launchNote: "Design and content preview. Integrate with the approved site header, footer and privacy notice before launch.",
} as const;
