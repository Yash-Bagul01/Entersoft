import { ROUTES } from "@/config/routes";
import { services, servicePagesData } from "@/data/services";
import { cloudResilienceHubData } from "@/data/cloudResilience";
import { digitalTrustData } from "@/data/digitalTrust";
import {
  coverageGrid,
  hero as defenseHero,
  responseSteps,
} from "@/data/cyberDefense";
import {
  hero as aiHero,
  processSteps as aiProcess,
  stackLayers,
  threats,
} from "@/data/aiZkpass";
import type { ServiceCaseSlug } from "@/data/serviceCases";

export type ServiceCaseFit = {
  name: string;
  description: string;
  href?: string;
};

export type ServiceCaseCopy = {
  kicker: string;
  title: string;
  lede: string;
  ledeFaded: string;
  tags: string[];
  directionLabel: string;
  directionTitle: string;
  directionProse: string[];
  splitLabel: string;
  splitTitle: string;
  splitItems: { title: string; description: string }[];
  processLabel: string;
  processTitle: string;
  processIntro: string;
  process: { step: string; title: string; description: string }[];
  fitsLabel: string;
  fitsTitle: string;
  fits: ServiceCaseFit[];
};

const APPSEC_FAQS = [
  {
    question: "What is Application Security Testing?",
    answer:
      "Application Security Testing (AST) is the process of analyzing, testing, and finding security vulnerabilities within software applications. It involves automated scanning and manual expert review across the software development lifecycle (SDLC) to identify flaws that could lead to unauthorized access, data leaks, or system compromise.",
  },
  {
    question: "How is Application Security Testing different from Penetration Testing?",
    answer:
      "While penetration testing is typically a point-in-time, goal-oriented validation of network and system entry points, Application Security Testing (AST) focuses specifically on code-level flaws, business logic, integrations, APIs, and security guardrails throughout the development lifecycle to ensure software remains inherently secure.",
  },
  {
    question: "Does Entersoft test web, API, and mobile applications?",
    answer:
      "Yes, Entersoft provides comprehensive, specialized testing across all three channels. This includes dynamic vulnerability scanning and source code audits for web platforms, REST/GraphQL APIs, and mobile applications (iOS and Android) including binary analysis and secure storage verification.",
  },
  {
    question: "Which application security standards and frameworks are supported?",
    answer:
      "Our audits align with industry-standard security baselines, including the OWASP Top 10, OWASP Application Security Verification Standard (ASVS), OWASP Mobile Application Security Verification Standard (MASVS), SANS Top 25, and CWE/SANS definitions.",
  },
  {
    question: "How are vulnerabilities validated and verified?",
    answer:
      "We utilize a hybrid model: automated scanner engines detect raw exposure signals, and our certified security analysts validate and triage each candidate manually to deliver human-validated findings.",
  },
  {
    question: "Which CI/CD platforms integrate with Entersoft's AppSec workflow?",
    answer:
      "Entersoft integrates natively with modern DevOps pipelines, including GitHub Actions, GitLab CI/CD, Azure DevOps, Jenkins, and Jira. Automated scan triggers run on code commits and send findings directly into standard developer ticketing workflows.",
  },
  {
    question: "Do you provide developer-ready remediation guidance?",
    answer:
      "Yes, we package every verified finding with clear remediation guidelines, secure code snippets, and patch diffs. This enables development teams to deploy patches quickly without needing to interpret complex vulnerability reports.",
  },
  {
    question: "Which compliance frameworks are supported?",
    answer:
      "Our testing maps directly to regulatory compliance frameworks, including ISO/IEC 27001 ISMS scope and CERT-In audit specifications.",
  },
  {
    question: "How quickly are findings delivered?",
    answer:
      "Critical and high-severity findings are validated and reported immediately through real-time notifications. Complete vulnerability reports and developer-ready remediation diffs are generated within 24 to 72 hours of scan completion.",
  },
];

function listing(slug: string) {
  const item = services.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Unknown service slug: ${slug}`);
  return item;
}

function page(slug: string) {
  const item = servicePagesData[slug];
  if (!item) throw new Error(`Unknown service page: ${slug}`);
  return item;
}

function tagsFrom(...groups: Array<string | string[] | undefined>) {
  return Array.from(
    new Set(
      groups
        .flatMap((group) => {
          if (!group) return [];
          if (Array.isArray(group)) return group;
          return group.split(/[•,]/).map((part) => part.trim());
        })
        .filter(Boolean)
    )
  ).slice(0, 8);
}

function faqsAsFits(faqs: { question: string; answer: string }[]): ServiceCaseFit[] {
  return faqs.map((faq) => ({ name: faq.question, description: faq.answer }));
}

export const SERVICE_CASE_COPY: Record<ServiceCaseSlug, ServiceCaseCopy> = {
  appsec: (() => {
    const card = listing("appsec");
    const data = page("appsec");
    const lead = data.process[0];
    return {
      kicker: "View",
      title: card.displayName,
      lede: data.overview,
      ledeFaded: card.hoverCardBody,
      tags: tagsFrom(card.descriptor, data.integrations, data.col3Metadata, data.deliverables),
      directionLabel: "Art Direction",
      directionTitle: lead.title,
      directionProse: [lead.description, data.tagline, data.heroStatement.replace(/\n/g, " ")],
      splitLabel: data.col2Description ?? card.category,
      splitTitle: data.name,
      splitItems: data.stats.map((stat) => ({
        title: stat.label,
        description: stat.value,
      })),
      processLabel: "Creative Process",
      processTitle: "How the engagement holds together",
      processIntro: data.overview,
      process: data.process.map((step) => ({
        step: step.index,
        title: step.title,
        description: step.description,
      })),
      fitsLabel: "Where it fits",
      fitsTitle: "Questions we answer",
      fits: faqsAsFits(APPSEC_FAQS),
    };
  })(),
  vapt: (() => {
    const card = listing("vapt");
    const data = page("vapt");
    const lead = data.process[0];
    return {
      kicker: "View",
      title: card.displayName,
      lede: data.overview,
      ledeFaded: card.hoverCardBody,
      tags: tagsFrom(card.descriptor, data.integrations, data.col3Metadata, data.deliverables),
      directionLabel: "Art Direction",
      directionTitle: lead.title,
      directionProse: [lead.description, data.tagline, data.heroStatement.replace(/\n/g, " ")],
      splitLabel: data.col2Description ?? card.category,
      splitTitle: data.name,
      splitItems: data.stats.map((stat) => ({
        title: stat.label,
        description: stat.value,
      })),
      processLabel: "Creative Process",
      processTitle: "How the engagement holds together",
      processIntro: data.overview,
      process: data.process.map((step) => ({
        step: step.index,
        title: step.title,
        description: step.description,
      })),
      fitsLabel: "Where it fits",
      fitsTitle: "Questions we answer",
      fits: faqsAsFits(data.faqs),
    };
  })(),
  "cloud-resilience": (() => {
    const card = listing("cloud-resilience");
    const data = page("cloud-resilience");
    const hub = cloudResilienceHubData;
    const lead = hub.cards[0];
    return {
      kicker: "View",
      title: card.displayName,
      lede: hub.subheadline,
      ledeFaded: card.hoverCardBody,
      tags: tagsFrom(card.descriptor, data.integrations, hub.cards.map((item) => item.badge)),
      directionLabel: "Art Direction",
      directionTitle: hub.headline,
      directionProse: [lead.description, data.overview, data.tagline],
      splitLabel: hub.eyebrow,
      splitTitle: data.name,
      splitItems: hub.cards.map((item) => ({
        title: item.title,
        description: `${item.description} ${item.delivery}`,
      })),
      processLabel: "Creative Process",
      processTitle: "How the engagement holds together",
      processIntro: data.overview,
      process: data.process.map((step) => ({
        step: step.index,
        title: step.title,
        description: step.description,
      })),
      fitsLabel: "Where it fits",
      fitsTitle: "Modular cloud outcomes",
      fits: hub.cards.map((item) => {
        const hrefBySlug: Record<string, string> = {
          assessment: ROUTES.services.cloudResilience.assessment,
          "penetration-testing": ROUTES.services.cloudResilience.penetrationTesting,
          "posture-management": ROUTES.services.cloudResilience.postureManagement,
          "managed-detection": ROUTES.services.cloudResilience.managedDetection,
          "containers-iac": ROUTES.services.cloudResilience.containersIac,
        };
        return {
          name: item.title,
          description: item.description,
          href: hrefBySlug[item.slug],
        };
      }),
    };
  })(),
  "compliance-management": (() => {
    const card = listing("compliance-management");
    const trust = digitalTrustData;
    const lead = trust.pillars[0];
    return {
      kicker: "View",
      title: card.displayName,
      lede: trust.hero.subline,
      ledeFaded: trust.thesis.solutionStatement,
      tags: tagsFrom(trust.hero.badge, card.descriptor),
      directionLabel: "Art Direction",
      directionTitle: trust.thesis.headline,
      directionProse: [trust.thesis.subline, lead.description, trust.hero.headline],
      splitLabel: trust.thesis.eyebrow,
      splitTitle: trust.hero.headline,
      splitItems: trust.pillars.map((pillar) => ({
        title: pillar.title,
        description: pillar.description,
      })),
      processLabel: "Creative Process",
      processTitle: trust.roadmap.headline,
      processIntro: trust.roadmap.disclaimer,
      process: trust.roadmap.stages.map((stage, index) => ({
        step: String(index + 1).padStart(2, "0"),
        title: `${stage.title} · ${stage.phase}`,
        description: stage.description,
      })),
      fitsLabel: "Where it fits",
      fitsTitle: "Questions we answer",
      fits: faqsAsFits(trust.faqs),
    };
  })(),
  siem: (() => {
    const card = listing("siem");
    const data = page("siem");
    const lead = responseSteps[0];
    return {
      kicker: "View",
      title: card.displayName,
      lede: defenseHero.sub,
      ledeFaded: card.hoverCardBody,
      tags: tagsFrom(defenseHero.descriptor, data.integrations),
      directionLabel: "Art Direction",
      directionTitle: `${defenseHero.headline.before} ${defenseHero.headline.gradient}`,
      directionProse: [lead.detail, data.overview, data.tagline],
      splitLabel: data.col2Description ?? card.category,
      splitTitle: data.name,
      splitItems: coverageGrid.map((item) => ({
        title: item.area,
        description: item.body,
      })),
      processLabel: "Creative Process",
      processTitle: "How the engagement holds together",
      processIntro: data.overview,
      process: responseSteps.map((step) => ({
        step: step.index,
        title: step.verb,
        description: step.detail,
      })),
      fitsLabel: "Where it fits",
      fitsTitle: "Questions we answer",
      fits: faqsAsFits(data.faqs),
    };
  })(),
  "smart-contract-audits": (() => {
    const card = listing("smart-contract-audits");
    const data = page("smart-contract-audits");
    const lead = data.process[0];
    return {
      kicker: "View",
      title: card.displayName,
      lede: data.overview,
      ledeFaded: card.hoverCardBody,
      tags: tagsFrom(card.descriptor, data.integrations, data.col3Metadata, data.deliverables),
      directionLabel: "Art Direction",
      directionTitle: lead.title,
      directionProse: [lead.description, data.tagline, data.heroStatement.replace(/\n/g, " ")],
      splitLabel: data.col2Description ?? card.category,
      splitTitle: data.name,
      splitItems: data.stats.map((stat) => ({
        title: stat.label,
        description: stat.value,
      })),
      processLabel: "Creative Process",
      processTitle: "How the engagement holds together",
      processIntro: data.overview,
      process: data.process.map((step) => ({
        step: step.index,
        title: step.title,
        description: step.description,
      })),
      fitsLabel: "Where it fits",
      fitsTitle: "Questions we answer",
      fits: faqsAsFits(data.faqs),
    };
  })(),
  "ai-ast": (() => {
    const card = listing("ai-ast");
    const data = page("ai-ast");
    const lead = threats[0];
    return {
      kicker: "View",
      title: card.displayName,
      lede: aiHero.sub,
      ledeFaded: card.hoverCardBody,
      tags: tagsFrom(card.descriptor, data.integrations, stackLayers.map((layer) => layer.layer)),
      directionLabel: "Art Direction",
      directionTitle: `${aiHero.headline.line1}${aiHero.headline.gradientWord}${aiHero.headline.line2}`,
      directionProse: [lead.body, data.overview, data.tagline],
      splitLabel: data.col2Description ?? card.category,
      splitTitle: data.name,
      splitItems: threats.map((item) => ({
        title: item.name,
        description: item.body,
      })),
      processLabel: "Creative Process",
      processTitle: "How the engagement holds together",
      processIntro: data.overview,
      process: aiProcess.map((step) => ({
        step: step.index,
        title: step.title.replace(/\.$/, ""),
        description: step.detail,
      })),
      fitsLabel: "Where it fits",
      fitsTitle: "Questions we answer",
      fits: faqsAsFits(data.faqs),
    };
  })(),
};

export const APPSEC_PAGE_FAQS = APPSEC_FAQS;
