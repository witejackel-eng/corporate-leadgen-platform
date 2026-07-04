"use client";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import { TiltCard } from "@/components/shared/tilt-card";
import { getIcon } from "@/lib/icon-map";

interface FeatureItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
}

export function FeaturesGrid({ features }: { features: FeatureItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, i) => {
        const Icon = getIcon(feature.icon);
        return (
          <Reveal key={feature.id ?? feature.title} delay={i * 0.08} direction="up">
            <TiltCard className="h-full">
              <Card className="h-full transition-shadow duration-300 hover:shadow-lift">
                <CardContent className="flex h-full flex-col gap-4 pt-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                    <Icon className="h-5 w-5" />
                  </span>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-[0.95rem] leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </TiltCard>
          </Reveal>
        );
      })}
    </div>
  );
}
