import type { Metadata } from "next";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { CtaSection } from "@/components/layout/cta-section";
import { site } from "@/lib/content/site";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell Rynevo Technologys about your project — software, AI, web, or mobile. Get a concrete plan, honest pricing, and a reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="contact-heading">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-blue left-1/4 top-0 h-72 w-96" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent2 animate-pulseGlow" />
              Contact us
            </span>
            <h1 id="contact-heading" className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Let&apos;s talk about <span className="gradient-text">your project.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-2 md:text-lg">
              Share a few details and we&apos;ll respond with next steps — a scoping call, honest
              estimates, and a clear plan. {site.contact.responseTime}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-8 pt-10 md:pt-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          {/* Form */}
          <Reveal className="rounded-3xl border border-line bg-card/50 p-6 md:p-10">
            <h2 className="font-display text-xl font-semibold">Start a conversation</h2>
            <p className="mt-1.5 text-sm text-ink-2">Fields marked * are required. Your details stay private.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          {/* Contact info */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.1} className="rounded-2xl border border-line bg-card/60 p-6">
              <div className="flex items-start gap-3.5">
                <Mail className="mt-0.5 h-5 w-5 text-accent2" />
                <div>
                  <h3 className="text-sm font-semibold">Email</h3>
                  <a href={`mailto:${site.contact.email}`} className="mt-1 block text-sm text-ink-2 transition-colors hover:text-accent">
                    {site.contact.email}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="rounded-2xl border border-line bg-card/60 p-6">
              <div className="flex items-start gap-3.5">
                <Phone className="mt-0.5 h-5 w-5 text-accent2" />
                <div>
                  <h3 className="text-sm font-semibold">Phone</h3>
                  <a href={`tel:+91${site.contact.phone}`} className="mt-1 block text-sm text-ink-2 transition-colors hover:text-accent">
                    {site.contact.phone}
                  </a>
                  <a href={`tel:+91${site.contact.phoneAlt}`} className="mt-0.5 block text-sm text-ink-2 transition-colors hover:text-accent">
                    {site.contact.phoneAlt}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.22} className="rounded-2xl border border-line bg-card/60 p-6">
              <div className="flex items-start gap-3.5">
                <Instagram className="mt-0.5 h-5 w-5 text-accent2" />
                <div>
                  <h3 className="text-sm font-semibold">Instagram</h3>
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm text-ink-2 transition-colors hover:text-accent">
                    @rynevo.tech
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.26} className="rounded-2xl border border-line bg-card/60 p-6">
              <div className="flex items-start gap-3.5">
                <MapPin className="mt-0.5 h-5 w-5 text-accent2" />
                <div>
                  <h3 className="text-sm font-semibold">Office</h3>
                  <p className="mt-1 text-sm text-ink-2">
                    Currently working with clients worldwide, remotely-first.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.28} className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
              <div className="flex items-start gap-3.5">
                <MessageCircle className="mt-0.5 h-5 w-5 text-accent2" />
                <div>
                  <h3 className="text-sm font-semibold">What happens after you write?</h3>
                  <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-ink-2">
                    <li>1. Your message lands in our inquiry system (with an email notification).</li>
                    <li>2. A senior team member reviews project fit within one business day.</li>
                    <li>3. We schedule a free 30-minute scoping call if we can genuinely help.</li>
                  </ol>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection
        headline="Prefer to start smaller? Ask us anything."
        subline="No obligation, no sales script — a 30-minute technical conversation about your idea or process is free."
        primaryLabel="Send an Inquiry"
        primaryHref="#top"
        secondaryLabel="Explore Services"
      />
    </>
  );
}
