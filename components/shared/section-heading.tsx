import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { SplitText } from "@/components/shared/split-text";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && (
        <Reveal direction="up" amount={0.8}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <SplitText
        text={title}
        as="h2"
        className={cn(
          "font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl",
          align === "center" ? "text-center" : "text-left"
        )}
      />
      {description && (
        <Reveal direction="up" delay={0.15} amount={0.8}>
          <p className={cn("max-w-2xl text-lg text-ink-soft", align === "center" ? "text-center" : "text-left")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
