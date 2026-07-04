"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <Reveal
            key={t.id ?? t.name}
            delay={i * 0.06}
            direction="up"
            className="w-[85%] shrink-0 snap-start sm:w-[420px]"
          >
            <div className="flex h-full flex-col gap-5 rounded-card border border-border bg-surface p-8 shadow-soft">
              <div className="flex gap-1 text-accent-blue">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="flex-1 text-[1.05rem] leading-relaxed text-ink-soft">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 border-t border-border pt-5">
                <Avatar>
                  <AvatarFallback>{initials(t.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-faint">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button size="icon" variant="outline" onClick={() => scrollBy(-1)} aria-label="Previous testimonial">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={() => scrollBy(1)} aria-label="Next testimonial">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
