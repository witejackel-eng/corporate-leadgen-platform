export const SITE_CONFIG = {
  name: "Meridian",
  tagline: "The revenue engine for enterprise marketing teams",
  description:
    "Meridian unifies pipeline intelligence, multi-channel attribution, and account-based orchestration so enterprise marketing teams can turn demand into revenue — without stitching together six different tools.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  keywords: [
    "lead generation platform",
    "enterprise marketing software",
    "account-based marketing",
    "revenue intelligence",
    "marketing attribution",
    "pipeline analytics",
  ],
  links: {
    twitter: "https://twitter.com/meridianhq",
    linkedin: "https://linkedin.com/company/meridianhq",
    github: "https://github.com/witejackel-eng/corporate-leadgen-platform",
  },
  repoUrl: "https://github.com/witejackel-eng/corporate-leadgen-platform",
} as const;

export const NAV_LINKS = [
  { label: "Product", href: "/#product" },
  { label: "Projects", href: "/#projects" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Pipeline Intelligence", href: "/#product" },
    { label: "Attribution", href: "/#product" },
    { label: "ABM Orchestration", href: "/#product" },
    { label: "Integrations", href: "/#integrations" },
  ],
  company: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/#" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Documentation", href: "/#" },
    { label: "API Reference", href: "/#" },
    { label: "Status", href: "/#" },
    { label: "Security", href: "/#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
  ],
} as const;
