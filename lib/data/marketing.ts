export const DEFAULT_STATS = [
  { id: "s1", label: "Average pipeline growth in 12 months", value: "312", suffix: "%", icon: "TrendingUp" },
  { id: "s2", label: "Enterprise marketing teams onboarded", value: "2400", suffix: "+", icon: "Building2" },
  { id: "s3", label: "Saved per rep, per month, on reporting", value: "48", suffix: "hrs", icon: "Clock" },
  { id: "s4", label: "Platform uptime SLA", value: "99.98", suffix: "%", icon: "ShieldCheck" },
];

export const DEFAULT_FEATURES = [
  {
    id: "f1",
    title: "Pipeline Intelligence",
    description:
      "Unified, model-agnostic attribution across every touchpoint — from the first anonymous visit to closed-won — reconciled against your CRM in real time.",
    icon: "GitBranch",
  },
  {
    id: "f2",
    title: "Account Orchestration",
    description:
      "Coordinate multi-channel ABM plays across ads, email, and sales outreach from a single canvas, with automatic account-tier routing.",
    icon: "Layers",
  },
  {
    id: "f3",
    title: "Predictive Scoring",
    description:
      "A propensity model trained on your own closed-deal history — not a generic industry benchmark — that sharpens with every deal you close.",
    icon: "Sparkles",
  },
  {
    id: "f4",
    title: "Revenue Reporting",
    description:
      "Boardroom-ready dashboards that connect every dollar of marketing spend to pipeline and closed revenue, exportable in one click.",
    icon: "BarChart3",
  },
  {
    id: "f5",
    title: "Workflow Automation",
    description:
      "Trigger nurture sequences, Slack alerts, and lead routing from visual workflows — no engineering ticket required.",
    icon: "Workflow",
  },
  {
    id: "f6",
    title: "Enterprise Integrations",
    description:
      "Native, bi-directional connectors for Salesforce, HubSpot, Marketo, Snowflake, and 40+ other systems your team already runs on.",
    icon: "Plug",
  },
];

export const DEFAULT_BENEFITS = [
  {
    id: "b1",
    title: "Cut time-to-insight from weeks to minutes",
    description: "Stop waiting on data engineering for a pipeline report. Ask a question, get a governed answer.",
    icon: "Zap",
  },
  {
    id: "b2",
    title: "Align marketing and sales on one source of truth",
    description: "Every team looks at the same attribution model and the same pipeline numbers — no more dueling spreadsheets.",
    icon: "Users",
  },
  {
    id: "b3",
    title: "Prove marketing's contribution to the boardroom",
    description: "Walk into every QBR with a defensible, auditable story connecting spend to revenue.",
    icon: "PresentationIcon",
  },
  {
    id: "b4",
    title: "Scale campaigns without scaling headcount",
    description: "Automation and orchestration mean a five-person team can run what used to take twenty.",
    icon: "Rocket",
  },
];

export const DEFAULT_FAQS = [
  {
    id: "faq1",
    category: "Pricing",
    question: "How is Meridian priced?",
    answer:
      "Meridian is priced per seat with usage-based tiers for tracked accounts and data volume. Most enterprise customers land between $60,000–$220,000 annually depending on account volume and integration scope. Every plan includes unlimited historical data retention and a dedicated implementation team.",
  },
  {
    id: "faq2",
    category: "Pricing",
    question: "Is there a free trial?",
    answer:
      "We offer a guided 21-day pilot with your own data connected, rather than a generic sandbox — this is by far the best way to evaluate attribution accuracy against your existing CRM.",
  },
  {
    id: "faq3",
    category: "Security",
    question: "Is Meridian SOC 2 compliant?",
    answer:
      "Yes. Meridian is SOC 2 Type II certified and undergoes annual third-party penetration testing. We also support SSO/SAML, SCIM provisioning, and field-level data residency controls for enterprise customers.",
  },
  {
    id: "faq4",
    category: "Integrations",
    question: "Which CRMs and ad platforms does Meridian support?",
    answer:
      "Native bi-directional sync with Salesforce and HubSpot, plus certified connectors for Marketo, Snowflake, BigQuery, Google Ads, LinkedIn Ads, Meta Ads, and 40+ additional systems. Our open API and webhook layer covers everything else.",
  },
  {
    id: "faq5",
    category: "Onboarding",
    question: "How long does implementation take?",
    answer:
      "Most enterprise teams are fully live — historical data backfilled, attribution model validated, dashboards shipped — within 4 to 6 weeks, with a dedicated solutions engineer throughout.",
  },
  {
    id: "faq6",
    category: "Onboarding",
    question: "Do we need engineering resources to implement Meridian?",
    answer:
      "No. Standard CRM and ad-platform connections are configured by our implementation team. Custom data sources use our managed ingestion pipeline, which typically requires only read-access credentials from your data team.",
  },
];
