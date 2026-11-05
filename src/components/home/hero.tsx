"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { NetworkCanvas } from "@/components/network-canvas";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
  const item: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.65, 0.35, 1] as const } },
      };

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-24 md:min-h-[88svh]" aria-label="Introduction">
      {/* Backdrop */}
      <div className="absolute inset-0 grid-backdrop" aria-hidden />
      <NetworkCanvas />
      <div className="glow-orb glow-orb-blue -left-32 top-16 h-96 w-96" aria-hidden />
      <div className="glow-orb glow-orb-cyan bottom-[-6rem] right-[-4rem] h-80 w-80" aria-hidden />

      {/* Floating tech panels (desktop decorative) */}
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="glass absolute left-[6%] top-[26%] hidden rounded-2xl px-4 py-3 text-xs lg:block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-accent2">{"{ ai: 'deployed' }"}</span>
          </motion.div>
          <motion.div
            aria-hidden
            className="glass absolute bottom-[22%] right-[7%] hidden rounded-2xl px-4 py-3 text-xs lg:block"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            <span className="font-mono text-accent">
              uptime.critical <span className="text-accent2">→ 99.99%</span>
            </span>
          </motion.div>
          <motion.div
            aria-hidden
            className="glass absolute right-[12%] top-[20%] hidden rounded-2xl px-4 py-3 lg:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <div className="flex items-end gap-1">
              {[10, 18, 8, 24, 14, 20, 12].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 rounded-sm bg-gradient-to-t from-accent to-accent2"
                  style={{ height: h * 1.6 }}
                  animate={{ scaleY: [1, 1.35, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.24, ease: "easeInOut" }}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.p variants={item} className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-4 py-1.5 text-xs font-medium text-ink-2 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2 animate-pulseGlow" />
            Software · AI · Digital Product Engineering
          </motion.p>

          <motion.h1 variants={item} className="font-display text-[2.5rem] font-semibold leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.1rem]">
            Transform Your Ideas Into{" "}
            <span className="gradient-text">Powerful Digital Solutions.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            Rynevo Technologys empowers businesses with innovative software, intelligent AI solutions,
            and exceptional digital experiences designed for growth.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" size="lg">
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg">
              <PlayCircle className="h-5 w-5" />
              Explore Our Services
            </ButtonLink>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-2">
            <span className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-accent/60" /> Transparent pricing
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-accent/60" /> Senior engineering talent
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-accent/60" /> Long-term support
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
