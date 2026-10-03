"use client";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";
import { useRef } from "react";
import { EASE } from "@/lib/motion";

const NODES = ["Recherche", "Site", "Contact", "Rendez-vous"];

/** `stop` : l'étape où le prospect décroche. `null` : il va jusqu'au rendez-vous. */
const CASES = [
  { title: "Pas de site", verdict: "Le prospect choisit un autre cabinet.", stop: 1 },
  { title: "Un site vitrine", verdict: "Il visite, puis il repart.", stop: 2 },
  { title: "Un site qui convertit", verdict: "Il comprend, et il vous contacte.", stop: null },
];

export function ThreeCases() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div ref={ref} className="mx-auto max-w-4xl space-y-5">
      {CASES.map((c, row) => {
        const reach = c.stop ?? NODES.length - 1; // dernier nœud atteint
        const fill = c.stop === null ? 1 : (c.stop - 0.5) / (NODES.length - 1);
        const delay = row * 1.1;
        const win = c.stop === null;
        return (
          <div
            key={c.title}
            className={`rounded-[26px] border p-5 sm:p-8 ${win ? "border-champagne/50 bg-champagne/[.06]" : "border-white/[.08] bg-white/[.02]"}`}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className={`font-serif text-[26px] leading-tight sm:text-[32px] ${win ? "text-champagne-soft" : "text-ivory"}`}>{c.title}</h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={on ? { opacity: 1 } : {}}
                transition={{ delay: delay + 0.9, duration: 0.6 }}
                className={`text-[14.5px] sm:text-[16px] ${win ? "text-ivory" : "text-fog"}`}
              >
                {c.verdict}
              </motion.p>
            </div>

            <div className="relative mt-7" aria-hidden="true">
              <span className="absolute left-[12.5%] right-[12.5%] top-[15px] h-px bg-white/10" />
              <motion.span
                className={`absolute left-[12.5%] top-[15px] h-px origin-left ${win ? "bg-champagne" : "bg-ivory/50"}`}
                style={{ width: "75%" }}
                initial={{ scaleX: 0 }}
                animate={on ? { scaleX: fill } : {}}
                transition={{ delay, duration: 0.9, ease: EASE }}
              />
              <ol className="relative grid grid-cols-4">
                {NODES.map((n, i) => {
                  const broken = c.stop === i;
                  const reached = i < reach || (win && i === reach);
                  return (
                    <li key={n} className="flex flex-col items-center gap-2.5">
                      <motion.span
                        initial={{ opacity: 0.3 }}
                        animate={on ? { opacity: reached || broken ? 1 : 0.3 } : {}}
                        transition={{ delay: delay + (i / NODES.length) * 0.9, duration: 0.4 }}
                        className={`flex h-[31px] w-[31px] items-center justify-center rounded-full border ${
                          broken
                            ? "border-ivory/30 bg-ink text-ivory/70"
                            : reached
                              ? win
                                ? "border-champagne bg-champagne text-ink"
                                : "border-ivory/50 bg-ink text-ivory"
                              : "border-white/15 bg-ink"
                        }`}
                      >
                        {broken ? <X className="h-3.5 w-3.5" /> : reached ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : null}
                      </motion.span>
                      <span className={`text-[11px] sm:text-[13px] ${reached ? "text-ivory/80" : "text-ivory/35"}`}>{n}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        );
      })}
    </div>
  );
}
