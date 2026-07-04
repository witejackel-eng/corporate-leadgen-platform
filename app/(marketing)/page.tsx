import type { Metadata } from "next";

import { HeroSection } from "@/features/home/hero-section";
import { StatsSection } from "@/features/home/stats-section";
import { TrustedCompaniesSection } from "@/features/home/trusted-companies-section";
import { FeaturesSection } from "@/features/home/features-section";
import { BenefitsSection } from "@/features/home/benefits-section";
import { DashboardPreviewSection } from "@/features/home/dashboard-preview-section";
import { ProjectsSection } from "@/features/home/projects-section";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import { CaseStudiesTeaserSection } from "@/features/home/case-studies-teaser-section";
import { FaqSection } from "@/features/home/faq-section";
import { CtaSection } from "@/features/home/cta-section";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  sameAs: [SITE_CONFIG.links.twitter, SITE_CONFIG.links.linkedin, SITE_CONFIG.links.github],
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_CONFIG.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: SITE_CONFIG.description,
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <HeroSection />
      <StatsSection />
      <TrustedCompaniesSection />
      <FeaturesSection />
      <DashboardPreviewSection />
      <BenefitsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CaseStudiesTeaserSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
