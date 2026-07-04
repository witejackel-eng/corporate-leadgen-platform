import { getClients } from "@/server/queries/marketing";
import { Marquee } from "@/components/shared/marquee";
import { Reveal } from "@/components/shared/reveal";

export async function TrustedCompaniesSection() {
  const clients = await getClients();

  return (
    <section className="border-b border-border bg-canvas-soft py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal direction="up" amount={0.8}>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            Trusted by revenue teams at
          </p>
        </Reveal>
        <div className="mt-8">
          <Marquee>
            {clients.map((client) => (
              <span
                key={client.id ?? client.name}
                className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink-faint/70 grayscale transition-all hover:text-ink hover:grayscale-0"
              >
                {client.name}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
