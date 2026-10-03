"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faqs } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { SectionTag } from "../ui/SectionTag";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-titre" className="relative bg-ivory py-24 text-ink md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTag index="14" label="Questions fréquentes" tone="light" />
          <h2 id="faq-titre" className="display-lg mt-6">Ce que l&apos;on nous demande.</h2>
        </div>
        <ul className="border-t border-ink/15">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className="border-b border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={on}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-[22px] font-semibold leading-snug md:text-[26px]">{f.q}</span>
                    <span
                      aria-hidden="true"
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${on ? "border-ink bg-ink" : "border-ink/20"}`}
                    >
                      <span className={`absolute h-px w-3.5 ${on ? "bg-champagne" : "bg-ink"}`} />
                      <span className={`absolute h-3.5 w-px transition-transform duration-300 ${on ? "scale-y-0 bg-champagne" : "bg-ink"}`} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[15.5px] leading-relaxed text-graphite">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
