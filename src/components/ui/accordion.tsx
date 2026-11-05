"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type FaqItem = { question: string; answer: string };

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-card/50">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
            >
              <span className="text-[15px] font-medium md:text-base">{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-ink-2 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink-2 md:px-6 md:text-[15px]">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
