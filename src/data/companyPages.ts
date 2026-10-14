import { ROUTES } from "@/config/routes";
import type { EditorialDoc } from "@/data/editorial";

export const companyPages: EditorialDoc[] = [
  {
    slug: "about",
    title: "About Entersoft | Entersoft Security",
    description: "Entersoft is an application security company that advises leaders and stays through remediation.",
    kicker: "Company · About",
    headline: "An application security company that stays for the fix.",
    lede: "Security without the pile of reports. Scan the application, put the result in the tools developers already use, and keep a person on the finding until it is closed.",
    blocks: [
      {
        kind: "prose",
        paragraphs: [
          "Traditional testing slows a team down with reviews and a long back-and-forth. Entersoft’s published offer is the other shape: a scan in minutes, a result that lands in the developer workflow, and fixes drawn from more than a decade of remediation data. Every finding is checked by the practice, so the speed of the tooling sits next to a person who will stand behind it.",
          "The firm describes itself as an award-winning application security company. The work is advisory and hands-on: risk monitoring, remediation, and root-cause analysis so the same bug does not return under a new ticket. The published return rate, once a finding is fixed, is 0.01%.",
          "Active monitoring covers the noisy edge as well — phishing and social-media scams included — because an application is attacked through its users as often as through its code. Security begins at step one of application development. A scan at the end is not a programme.",
          "The same practice is audit-ready for the bodies buyers ask about: CERT-In empanelment, ISO 27001, GDPR-shaped evidence, and CREST-accredited penetration testing. Findings can move into Azure DevOps, GitHub, Jira and ServiceNow instead of living in a PDF nobody opens.",
        ],
      },
      {
        kind: "stats",
        items: [
          { value: "600+", label: "Clients secured" },
          { value: "13 yrs", label: "Same senior bench. No churn in the published record." },
          { value: "12,000+", label: "Bugs proven, never assumed" },
          { value: "100,000+", label: "Checks where existence was validated, or non-existence proven" },
          { value: "0.01%", label: "Findings that return after a fix" },
          { value: "0", label: "Breaches in 13 years under Entersoft’s watch" },
        ],
      },
      {
        kind: "panels",
        items: [
          { title: "Exploit-first evidence", body: "Every finding includes a proof of concept and the impact. The report shows the request, not a severity guessed from a banner." },
          { title: "Assurance checks", body: "Seventy recorded negative checks for each application. The cases that did not reproduce are part of the delivery." },
          { title: "Zero-noise delivery", body: "Issues are reproduced in environments that behave like production, so a developer can see the same failure." },
          { title: "Developer-ready fixes", body: "Diffs, sample code and pull-request suggestions, written so the patch can be reviewed like any other change." },
          { title: "Retest on demand", body: "ReAuto is an anytime retest from the portal. Unlimited validations after the team says the fix is in." },
          { title: "Continuity", body: "The same senior analysts stay on the account. The published record is thirteen years without attrition on that bench." },
          { title: "Integration-native", body: "Azure DevOps, GitHub, Jira and ServiceNow. The ticket is created where the work already lives." },
          { title: "Audit-ready", body: "CERT-In, ISO 27001, GDPR and CREST. Credentials a buyer can ask to see, listed on the accreditations page." },
        ],
      },
      { kind: "cta", title: "Read the credentials, then talk.", href: ROUTES.company.accreditations, label: "Accreditations" },
    ],
  },
  {
    slug: "team",
    title: "Team | Entersoft Security",
    description: "Leadership and security engineers at Entersoft, the white-hat team behind the assessments.",
    kicker: "Company · Team",
    headline: "White hats, on the hook for the whole engagement.",
    lede: "The product changes every week. Keeping up takes a team that owns the relationship and the technical result, not a roster that rotates out after the kickoff.",
    blocks: [
      {
        kind: "people",
        groups: [
          {
            title: "Leadership",
            people: [
              { name: "Sri Chakradhar", role: "Director & CEO" },
              { name: "Paul Kang", role: "Co-founder & Director" },
              { name: "Hari Shashank", role: "Head of Sales" },
              { name: "Chandana Srinath", role: "Head of US Operations" },
              { name: "Pooja Swami", role: "Assistant Manager, HR & Finance" },
              { name: "Nishita Palaksha", role: "Global Account Manager" },
            ],
          },
          {
            title: "Practice",
            people: [
              { name: "Charan Mukkamala", role: "Principal Security Engineer" },
              { name: "Jos Rohill", role: "Principal Security Engineer" },
              { name: "Hussain Khan", role: "Senior Security Analyst" },
              { name: "Veer Bandi", role: "Business Development Manager" },
            ],
          },
        ],
      },
      {
        kind: "prose",
        title: "How they hire the bench",
        paragraphs: [
          "Entersoft’s public account of the team is specific: certified white-hat hackers, hired for creativity, speed, problem-solving and the ability to implement, with a combined experience they summarise as forty years of taking applications apart.",
          "The certifications are the evidence. The standard they publish is offensive, fast, and trustworthy — and still accountable to the customer after the report.",
        ],
      },
    ],
  },
  {
    slug: "clients",
    title: "Clients | Entersoft Security",
    description: "The scale of Entersoft’s client work across enterprises, fintech and blockchain, as the firm publishes it.",
    kicker: "Company · Clients",
    headline: "Work measured in companies, not in logos.",
    lede: "Entersoft publishes the shape of the client base in counts. The useful part is what those counts are attached to: enterprises, fintech platforms, and blockchain teams that needed an assessment before a round or a bank said yes.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "300+", label: "Enterprises and funded startups" },
          { value: "100+", label: "Fintech customers" },
          { value: "50+", label: "Blockchain customers" },
        ],
      },
      {
        kind: "index",
        items: [
          {
            meta: "Case study · Media",
            title: "De-risking growth that came through acquisitions",
            body: "A US-based global media, communications and analytics company used Entersoft to take cybersecurity risk out of an acquisition-led growth plan, so reputation and the next deal were not riding on an unknown estate.",
          },
          {
            meta: "Case study · NBFC",
            title: "RBI guidelines, then ISO 27001",
            body: "A leading Indian NBFC needed a firm that could implement the Reserve Bank of India’s cybersecurity guidelines for NBFCs and carry the programme through to ISO 27001.",
          },
          {
            meta: "Case study · Logistics",
            title: "A government sale, and one week to close the gaps",
            body: "One of the world’s largest logistics companies was selling into a leading government in Asia. The loopholes had to be found and fixed inside a week.",
          },
          {
            meta: "Case study · Fintech",
            title: "A bank relationship, rebuilt in three months",
            body: "A leading Australian fintech could not work with a major bank because of security gaps. Entersoft rebuilt the posture with the team. Within three months the company was in a position to pursue that relationship.",
          },
        ],
      },
      {
        kind: "split",
        title: "What a client engagement changed",
        body: "IOOF’s CISO has described eighteen months of technical security and ethical hacking work as thorough, lower on false positives than the scanner-led alternatives, and responsive through testing and the report. The manual testing was shaped to the business, not to a generic checklist.",
        aside: "From the published record",
      },
      {
        kind: "quote",
        quote: "Best application security experts. The reports are comprehensive and easy to understand.",
        name: "Kunal",
        role: "CEO, uTrade Solutions",
      },
      {
        kind: "quote",
        quote: "Superfast security testing, and a quick turnaround to fix the bugs that were found. We will work with Entersoft again for all our apps.",
        name: "Anand",
        role: "CTO, Biogenex",
      },
      {
        kind: "quote",
        quote: "The team was technically sound and finished ahead of time. After the first round, their advice made the fixes and the regression test straightforward.",
        name: "Mallikarjun",
        role: "CEO, Oakridge IT",
      },
      {
        kind: "quote",
        quote: "They map the security risk to the domain the client actually operates in. A scanner is not a substitute for people who understand the application.",
        name: "Sujith",
        role: "Manager, IT, HIL (CK Birla Group)",
      },
      { kind: "cta", title: "Bring the next scope.", href: ROUTES.contact, label: "Talk to the practice" },
    ],
  },
  {
    slug: "partners",
    title: "Partners | Entersoft Security",
    description: "Entersoft’s partner programme for resellers and distributors, including technology partners such as Ridan Consulting.",
    kicker: "Company · Partners",
    headline: "Resellers and distributors who carry the work further.",
    lede: "Application security is hard to productise. Partners use Entersoft’s practice to add a real assessment to what they already sell, instead of a scanner with their logo on it.",
    blocks: [
      {
        kind: "prose",
        paragraphs: [
          "The partner page is plain about the model: resellers and distributors help Entersoft reach customers, and in return they can offer proactive application security with the firm’s testers behind it.",
          "That is a delivery partnership. The finding, the retest and the evidence still come from the same practice.",
        ],
      },
      {
        kind: "split",
        title: "Ridan Consulting Services",
        body: "Ridan is a technology partner to Entersoft. The firm brings more than twenty-five years in IT consulting and overseas education, and describes its consulting work as the join between process, people and technology. Dr. Prasad, founder and CEO, came through strategy-to-execution roles including advisory work at PwC, with a doctorate and leadership training from IIM Ahmedabad.",
        aside: "Technology partner",
      },
      { kind: "cta", title: "Offer the practice to your clients.", href: ROUTES.contact, label: "Talk about a partnership" },
    ],
  },
  {
    slug: "awards",
    title: "Awards | Entersoft Security",
    description: "Recognition for Entersoft’s application security work, including the ELETS BFSI Tech Innovation Awards.",
    kicker: "Company · Awards",
    headline: "Recognition for security that starts at step one.",
    lede: "Entersoft’s public line on awards is not a trophy cabinet. It is a claim about when security begins: at the first step of building the application, not after a launch incident.",
    blocks: [
      {
        kind: "split",
        title: "ELETS BFSI Tech Innovation Awards",
        body: "The firm records this recognition against its application-security work in financial services. The accompanying statement is the one they repeat: a culture of security, and protection that has to last longer than a single release.",
        aside: "Excellence in cybersecurity",
      },
      {
        kind: "prose",
        paragraphs: [
          "Awards sit next to things a buyer can check. CREST accreditation and CERT-In empanelment are on the accreditations page, with the bodies that issued them.",
        ],
      },
      { kind: "cta", title: "Verify the credentials.", href: ROUTES.company.accreditations, label: "Accreditations" },
    ],
  },
  {
    slug: "responsible-disclosures",
    title: "Responsible Disclosures | Entersoft",
    description: "Entersoft’s white-hat disclosures to global organisations, including published bounty totals.",
    kicker: "Company · Disclosures",
    headline: "Bugs reported to the owner, not to the market.",
    lede: "Entersoft’s hackers disclose vulnerabilities to the organisations that run the systems. The public record is the count of those organisations and the bounties paid for the work.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "50+", label: "Organisations that recognised a disclosure" },
          { value: "10k+", label: "USD in bounties paid to the team" },
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "The point of the programme, as Entersoft states it, is to improve the security posture of the companies that receive the report. A disclosure is a fix path, with evidence, sent to the people who can patch.",
          "That is the same habit as a client engagement: reproduce the issue, explain the impact, and stop once the owner has what they need to close it.",
        ],
      },
    ],
  },
  {
    slug: "consulting",
    title: "Consulting | Entersoft Security",
    description: "Application-security consulting shaped around the organisation in front of the team, not a fixed package.",
    kicker: "Company · Consulting",
    headline: "Advice after someone has looked at your system.",
    lede: "A decade in application security taught the practice that a packaged maturity model is not a plan. Consulting starts by finding out where you actually are.",
    blocks: [
      {
        kind: "steps",
        items: [
          { title: "Where security stands now", body: "The current approach, the tools, the owners, and the gaps a customer or a regulator would notice first." },
          { title: "What you need the programme to do", body: "A bank review, a release every week, a certification, a quieter incident queue. The goal decides the work." },
          { title: "What to change, in order", body: "Recommendations the team can run. Not a catalogue of every control that exists." },
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "Entersoft’s consulting note is that every business is particular — people, places, product — and the call can be aimed at the areas you name in advance.",
          "The people on the call are the same kind of practitioners who test. The advice is not separated from the work.",
        ],
      },
      { kind: "cta", title: "Book the working call.", href: ROUTES.booking, label: "Reserve a time" },
    ],
  },
  {
    slug: "careers",
    title: "Careers | Entersoft Security",
    description: "Join Entersoft’s application security team. Send a CV to the careers desk.",
    kicker: "Company · Careers",
    headline: "A black-hat mindset, on the defender’s side.",
    lede: "Entersoft hires people who can take an application apart and then help the owner put it back safer. The public invitation is short on theatre and specific about where to write.",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "15+", label: "Countries with clients" },
          { value: "5", label: "Countries with offices" },
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "The team page describes the bar: conceptual creativity, speed, problem-solving, and the ability to implement. Certifications matter because they are checkable. Curiosity matters because the target will not match the last one.",
          "To apply, send a CV to careers@entersoftsecurity.com. Say what you have broken, what you have fixed, and where you want to sit — testing, research, or the relationship with the client.",
        ],
      },
      { kind: "cta", title: "Write to the hiring desk.", href: "mailto:careers@entersoftsecurity.com", label: "careers@entersoftsecurity.com" },
    ],
  },
];

const companyLabels: Record<string, string> = {
  about: "About Us",
  team: "Team",
  clients: "Clients",
  partners: "Partners",
  awards: "Awards",
  "responsible-disclosures": "Responsible Disclosures",
  consulting: "Consulting",
  careers: "Careers",
};

export const companyNav = [
  ...companyPages.map((item) => ({
    label: companyLabels[item.slug] ?? item.headline,
    href: `/company/${item.slug}`,
    description: item.description,
  })),
  { label: "Contact", href: ROUTES.contact, description: "Book a briefing with the practice." },
];
