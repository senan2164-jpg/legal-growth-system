"use client";
import { motion } from "framer-motion";
import { Columns3, MousePointerClick, Phone, Search, User } from "lucide-react";
import { EASE } from "@/lib/motion";
import { useSequence } from "@/lib/useSequence";

const STEPS = [
  { label: "Prospect", Icon: User },
  { label: "Recherche", Icon: Search },
  { label: "Compare", Icon: Columns3 },
  { label: "Choisit", Icon: MousePointerClick },
  { label: "Contacte", Icon: Phone },
];

/** Le parcours d'un prospect, de la première recherche au premier appel. */
export function JourneyRail() {
  const { ref, step } = useSequence(STEPS.length, { interval: 1300, hold: 2400 });
  const progress = step / (STEPS.length - 1);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[880px]" role="img" aria-label="Prospect, recherche, compare, choisit, contacte">
      {/* Ligne de fond et ligne parcourue, entre le centre de la première et de la dernière étape */}
      <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-[52px] h-px bg-ivory/10 md:top-[60px]">
        <motion.div
          className="h-full origin-left bg-champagne"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress }}
          transition={{ duration: step === 0 ? 0.5 : 1.1, ease: EASE }}
        />
      </div>

      <ol className="relative grid grid-cols-5">
        {STEPS.map(({ label, Icon }, i) => {
          const reached = i <= step;
          const current = i === step;
          return (
            <li key={label} className="flex flex-col items-center">
              <span
                className={`flex h-9 items-end pb-3 text-[11px] font-semibold uppercase tracking-[.14em] transition-colors duration-500 sm:text-[12px] sm:tracking-[.2em] md:h-10 ${
                  i % 2 === 0 ? "" : "invisible sm:visible"
                } ${reached ? "text-ivory" : "text-ivory/35"}`}
              >
                {label}
              </span>
              <span className="relative flex h-8 w-8 items-center justify-center md:h-10 md:w-10">
                {current && <span aria-hidden="true" className="ripple absolute inset-0 rounded-full border border-champagne" />}
                <span
                  className={`relative flex h-full w-full items-center justify-center rounded-full border transition-colors duration-500 ${
                    reached ? "border-champagne bg-champagne text-ink" : "border-ivory/20 bg-ink text-ivory/40"
                  }`}
                >
                  <Icon aria-hidden="true" className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2} />
                </span>
              </span>
              {/* Sur mobile, une étape sur deux affiche son libellé dessous pour garder de l'air */}
              <span
                className={`pt-3 text-[11px] font-semibold uppercase tracking-[.14em] transition-colors duration-500 sm:hidden ${
                  i % 2 === 0 ? "invisible" : ""
                } ${reached ? "text-ivory" : "text-ivory/35"}`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
