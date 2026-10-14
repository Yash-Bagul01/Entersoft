import { hubFront, hubVideo } from "@/data/platformHub";
import type { ExoApeCase } from "@/components/platform/exoape/types";

const img = (name: string) => `/images/platform/runtime/ai/${name}.jpg`;

const RECOGNITION = [
  { name: "CREST", detail: "Registered penetration testing services" },
  { name: "CERT-In", detail: "Empanelled information security auditing organisation" },
  { name: "ISO/IEC 27001", detail: "Certified information security management system" },
  { name: "GDPR", detail: "Validated data processing controls" },
];

export const AI_APPSEC_CASE: ExoApeCase = {
  id: "ai-appsec",
  heroTitle: "EnProbe AI",
  heroSubtitle: "AI Application Security",
  intro:
    "EnProbe correlates findings with AI-guided fixes, then tests the LLM and RAG systems those findings now sit beside — prompt injection, tool abuse, insecure output — under the same evidence standard as the rest of the platform.",
  ctaLabel: "Book a briefing",
  ctaHref: "/contact",
  meta: [
    { label: "Capability", values: ["Fix synthesis · LLM audit"] },
    { label: "Coverage", values: ["Code · RAG · Agents"] },
    { label: "Focus", values: ["OWASP LLM Top 10"] },
    { label: "Delivery", values: ["Governed PRs"] },
  ],
  images: {
    hero: hubFront("ai"),
    heroVideo: hubVideo("ai"),
    heroAlt: "Chrome form used as a stand-in for AI application security",
    wide: img("wide"),
    wideAlt: "Abstract light field standing in for model and prompt space",
    beliefs: img("beliefs"),
    beliefsAlt: "Machine form used as an LLM system under review",
    statement: img("statement"),
    statementAlt: "Layered light used as a prompt-to-tool path",
    mockup: img("mockup"),
    mockupAlt: "Workstations used while reviewing an AI-suggested fix",
    next: img("next"),
    nextAlt: "Soft field used for the next platform chapter",
    collage: [
      {
        src: img("c01"),
        alt: "Light volume used for telemetry and model ingest",
        tag: "01 / TELEMETRY INGEST",
        headline: "Scans, prompts and snippets in one place",
        metric: "Findings + pipelines",
        desc: "Vulnerability outputs, LLM prompt pipelines and code snippets feed the same analysis pass.",
      },
      {
        src: img("c02"),
        alt: "Circuit-like light used for fix synthesis",
        tag: "02 / FIX SYNTHESIS",
        headline: "A patch written for this framework",
        metric: "Copy-ready guidance",
        desc: "Suggested fixes are tailored to the language and library already in the file — not a generic advisory.",
      },
      {
        src: img("c03"),
        alt: "Abstract form used for LLM and RAG audit",
        tag: "03 / LLM AUDIT",
        headline: "Prompt injection, poisoning, unsafe output",
        metric: "OWASP LLM Top 10",
        desc: "GenAI applications are tested for injection, model poisoning and insecure output handling.",
      },
      {
        src: img("c04"),
        alt: "Code surface used for intelligent triage",
        tag: "04 / TRIAGE",
        headline: "Related findings collapse. Noise drops.",
        metric: "Grouped alerts",
        desc: "Machine learning groups related issues so a developer is not opening twelve tickets for one root cause.",
      },
      {
        src: img("c05"),
        alt: "Review desk used for human governance",
        tag: "05 / GOVERNANCE",
        headline: "AI suggests. Lint and build decide.",
        metric: "Human-checked PRs",
        desc: "Suggested patches pass automated verification before a pull request is opened.",
      },
      {
        src: img("c06"),
        alt: "Hands at a keyboard enriching a ticket",
        tag: "06 / TICKET ENRICH",
        headline: "The ticket already knows the next step",
        metric: "Jira · GitHub",
        desc: "Issues arrive with a playbook, not a CVE number and a shrug.",
      },
      {
        src: img("c07"),
        alt: "Soft machine light used for agent and tool defense",
        tag: "07 / AGENT DEFENSE",
        headline: "Tools and autonomy are in scope",
        metric: "Function & goal abuse",
        desc: "Agentic workflows are tested for tool sprawl, SSRF via functions and goal hijack — not only the chat box.",
      },
    ],
  },
  objective: {
    lines: ["Smarter", "scan,", "safer"],
    body: "AI can write a fix and hide a prompt leak in the same week. The objective was to accelerate remediation with governed suggestions, then test the LLM, RAG and agent systems with the same proof standard as the rest of EnProbe.",
  },
  solution: {
    lines: ["Guide the fix,", "then test the model"],
    left: "EnProbe ingests scan output and prompt pipelines, groups related findings, and writes framework-specific patches that still have to pass lint and build before a PR exists.",
    right:
      "The same practice tests GenAI applications for OWASP LLM risks — injection, poisoning, insecure output, tool abuse — and returns evidence a reviewer can replay.",
  },
  beliefs: {
    label: "The AI cycle, in three moves",
    items: [
      { word: "Group", note: "Triage the noise", align: "right" },
      { word: "Suggest", note: "Governed, framework-fit", align: "left" },
      { word: "Test", note: "LLM, RAG, agents", align: "right" },
    ],
  },
  anticipate: {
    marker: "Continuity",
    lines: ["Anticipating the", "prompt that breaks out"],
    body: "Models and tools change faster than an annual review. EnProbe keeps fix synthesis and LLM tests on the same release cadence as the application they sit inside.",
    cards: [
      {
        index: "01",
        label: "The Patch",
        title: "A suggestion written for this file, this framework.",
        image: img("a01"),
        alt: "Workstations used while reviewing an AI-suggested fix",
        tag: "FIX SYNTHESIS",
        metric: "Framework-fit guidance",
        desc: "Developers receive a copy-ready change, then lint and build still have the last word.",
      },
      {
        index: "02",
        label: "The Prompt",
        title: "Injection, poisoning and unsafe output are proven, not guessed.",
        image: img("a02"),
        alt: "Abstract field used during an LLM security audit",
        tag: "LLM / RAG AUDIT",
        metric: "Replayable model proof",
        desc: "OWASP LLM classes are tested against the actual prompt pipeline and retrieval path.",
      },
      {
        index: "03",
        label: "The Gate",
        title: "No pull request until verification passes.",
        image: img("a03"),
        alt: "Review desk used for governed AI pull requests",
        tag: "HUMAN GOVERNANCE",
        metric: "Lint + build first",
        desc: "Suggested patches are checked automatically before they become a PR.",
      },
    ],
  },
  railTitle: "Precision in AI assurance",
  stages: [
    {
      index: "01",
      title: "Telemetry & model ingestion",
      body: "Scan outputs, LLM prompt pipelines and code snippets enter the same analysis pass.",
      image: img("c01"),
      alt: "Light volume used for telemetry and model ingest",
    },
    {
      index: "02",
      title: "AI analysis & fix synthesis",
      body: "Customized patches and playbooks are generated for the framework already in the file.",
      image: img("a01"),
      alt: "Workstations used while reviewing an AI-suggested fix",
    },
    {
      index: "03",
      title: "LLM & GenAI audit",
      body: "Prompt injection, model poisoning, insecure output and tool abuse are tested with replayable evidence.",
      image: img("a02"),
      alt: "Abstract field used during an LLM security audit",
    },
    {
      index: "04",
      title: "Human governance check",
      body: "Suggested fixes pass lint and build verification before a pull request is created.",
      image: img("a03"),
      alt: "Review desk used for governed AI pull requests",
    },
    {
      index: "05",
      title: "Automated ticket enrichment",
      body: "Jira and GitHub issues arrive with step-by-step remediation, not a CVE and a link.",
      image: img("c06"),
      alt: "Hands at a keyboard enriching a ticket",
    },
  ],
  specs: [
    {
      label: "Surface",
      value: "Code + LLM systems",
      body: "Application findings, prompt pipelines, RAG stores and agent tool interfaces.",
    },
    {
      label: "Focus",
      value: "Guided + proven",
      body: "Framework-fit fixes and OWASP LLM tests under the same evidence bar.",
    },
    {
      label: "Evidence",
      value: "Replay + patch",
      body: "Prompt or request artifacts plus a suggested change that still has to build.",
    },
    {
      label: "Integration",
      value: "Governed PRs",
      body: "Tickets and pull requests open only after automated verification.",
    },
  ],
  partnershipLines: ["Stellar", "partnership"],
  quote: {
    text: "A suggested fix that never builds is noise. A model test without a replayable prompt is a rumor. EnProbe AI was built so both conversations end with something an engineer can run.",
    name: "EnProbe practice",
    role: "AI AppSec · Test Runtime cluster",
    initials: "AI",
  },
  recognition: RECOGNITION,
  mockupCaption: "Governed fix and LLM proof on the same release.",
  floatNote: { label: "1. Synthesis phase", title: "You ship the model. We test the prompt." },
  faqs: [
    {
      question: "Does AI AppSec replace human review of suggested patches?",
      answer:
        "No. Suggestions are framework-specific, then lint and build verification run before a pull request exists. A reviewer still accepts the change.",
    },
    {
      question: "What LLM risks do you test?",
      answer:
        "OWASP LLM Top 10 classes including prompt injection, data leakage, insecure output handling, model poisoning, and tool or function abuse in agentic workflows.",
    },
    {
      question: "Can you test RAG and tool-using agents, not only chat?",
      answer:
        "Yes. Retrieval paths, vector stores, tool calls and goal hijack are in scope. The chat box is one surface, not the only one.",
    },
    {
      question: "How do you keep suggested fixes from becoming a flood?",
      answer:
        "Related findings are grouped first. One root cause becomes one playbook. Noise is treated as a triage failure, not a feature.",
    },
    {
      question: "Where do enriched tickets land?",
      answer:
        "Jira and GitHub, with the steps to reproduce, the suggested patch, and the verification that already ran.",
    },
  ],
  next: {
    href: "/platform/agentic-pentesting",
    title: "Agentic Pentesting",
    subtitle: "Autonomous AI penetration testing",
  },
};
