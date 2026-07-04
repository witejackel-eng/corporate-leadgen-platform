import Link from "next/link";

import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/shared/social-icons";

const columns = [
  { title: "Product", links: FOOTER_LINKS.product },
  { title: "Company", links: FOOTER_LINKS.company },
  { title: "Resources", links: FOOTER_LINKS.resources },
  { title: "Legal", links: FOOTER_LINKS.legal },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex w-fit items-center gap-2 font-display text-lg font-bold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-sm text-white">M</span>
              {SITE_CONFIG.name}
            </Link>
            <p className="max-w-xs text-sm text-ink-faint">{SITE_CONFIG.description}</p>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.links.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-ink-faint transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h4 className="text-sm font-semibold text-ink">Stay ahead of the pipeline</h4>
            <p className="text-sm text-ink-faint">Monthly insights on revenue attribution and ABM. No spam.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 text-xs text-ink-faint sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}, Inc. All rights reserved.</p>
          <p>Designed &amp; engineered as a portfolio demonstration project.</p>
        </div>
      </div>
    </footer>
  );
}
