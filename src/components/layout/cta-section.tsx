import { ArrowRight, MessageSquare } from "lucide-react";
import { ButtonLink } from "../ui/button";
import { Reveal } from "../ui/reveal";

/**
 * Closing call-to-action used across pages.
 */
export function CtaSection({
  headline = "Let's Build Something Extraordinary.",
  subline = "Tell us about your idea, your product, or the process that's slowing your team down. We'll map it into a concrete plan — with honest pricing and a clear path to launch.",
  primaryHref = "/contact",
  primaryLabel = "Start a Project",
  secondaryLabel = "Contact Our Team",
}: {
  headline?: string;
  subline?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" aria-labelledby="cta-heading">
      <div className="absolute inset-0 grid-backdrop opacity-70" aria-hidden />
      <div className="glow-orb glow-orb-blue left-1/2 top-0 h-72 w-96 -translate-x-1/2" aria-hidden />
      <div className="glow-orb glow-orb-cyan right-[15%] bottom-0 h-56 w-56" aria-hidden />

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
        <h2 id="cta-heading" className="font-display text-3xl font-semibold leading-tight md:text-[2.75rem]">
          {headline.split(" ").slice(0, -2).join(" ")}{" "}
          <span className="gradient-text">{headline.split(" ").slice(-2).join(" ")}</span>
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-ink-2 md:text-lg">{subline}</p>
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <ButtonLink href={primaryHref} size="lg">
            {primaryLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            <MessageSquare className="h-4 w-4" />
            {secondaryLabel}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
