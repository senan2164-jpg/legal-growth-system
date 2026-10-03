"use client";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { pillars } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useSequence } from "@/lib/useSequence";
import { Reveal } from "../ui/Reveal";

const LOOP = "Le pilotage nourrit la visibilité.";

export function System() {
  const { ref, step } = useSequence(pillars.length, { interval: 1600, hold: 2400 });
  const last = pillars.length - 1;

  return (
    <section id="systeme" aria-labelledby="systeme-titre" className="overflow-hidden bg-ink py-24 md:py-36">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">Legal Growth System</p>
          <h2 id="systeme-titre" className="display-lg mx-auto mt-5 max-w-[16ch]">
            Cinq volets <span className="text-ivory/45">qui se répondent.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="mx-auto mt-16 max-w-5xl md:mt-24">
          {/* Ordinateur : une ligne, et une arche qui ramène du dernier volet au premier */}
          <div className="relative hidden md:block">
            <div className="relative h-28" aria-hidden="true">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <path
                  d="M90 100 C90 8, 10 8, 10 100"
                  fill="none"
                  stroke="rgba(198,168,108,.45)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <p className="absolute inset-x-0 top-0 flex items-center justify-center gap-2 font-serif text-[19px] italic text-ivory/45">
                <RotateCcw className="h-4 w-4 -scale-x-100" /> {LOOP}
              </p>
            </div>

            <div className="relative">
              <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-6 h-px bg-ivory/10" />
              <motion.span
                aria-hidden="true"
                className="absolute left-[10%] top-6 h-px origin-left bg-champagne"
                style={{ width: "80%" }}
                initial={false}
                animate={{ scaleX: step / last }}
                transition={{ duration: 0.9, ease: EASE }}
              />
              <ol className="relative grid grid-cols-5">
                {pillars.map((p, i) => {
                  const on = i === step;
                  const reached = i <= step;
                  return (
                    <li key={p.name} className="flex flex-col items-center px-2 text-center">
                      <span className="relative flex h-12 w-12 items-center justify-center">
                        {on && <span aria-hidden="true" className="ripple absolute inset-0 rounded-full border border-champagne" />}
                        <span
                          className={`relative flex h-full w-full items-center justify-center rounded-full border font-serif text-[18px] transition-colors duration-500 ${
                            reached ? "border-champagne bg-champagne text-ink" : "border-ivory/20 bg-ink text-ivory/40"
                          }`}
                        >
                          {i + 1}
                        </span>
                      </span>
                      <span className={`mt-6 font-serif text-[24px] leading-none transition-colors duration-500 lg:text-[30px] ${reached ? "text-ivory" : "text-ivory/40"}`}>
                        {p.name}
                      </span>
                      <span className={`mt-3 max-w-[13rem] text-[14px] leading-snug transition-colors duration-500 ${on ? "text-fog" : "text-ivory/30"}`}>
                        {p.line}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Mobile : une colonne, puis le retour au début */}
          <ol className="md:hidden">
            {pillars.map((p, i) => {
              const on = i === step;
              const reached = i <= step;
              return (
                <li key={p.name} className="relative flex items-start gap-5 pb-9 last:pb-0">
                  {i < last && (
                    <span aria-hidden="true" className="absolute left-[21px] top-11 h-[calc(100%-44px)] w-px bg-ivory/10">
                      <span className={`absolute inset-0 origin-top bg-champagne transition-transform duration-700 ${i < step ? "scale-y-100" : "scale-y-0"}`} />
                    </span>
                  )}
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                    {on && <span aria-hidden="true" className="ripple absolute inset-0 rounded-full border border-champagne" />}
                    <span
                      className={`relative flex h-full w-full items-center justify-center rounded-full border font-serif text-[17px] transition-colors duration-500 ${
                        reached ? "border-champagne bg-champagne text-ink" : "border-ivory/20 bg-ink text-ivory/40"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <div className="pt-1">
                    <p className={`font-serif text-[26px] leading-none transition-colors duration-500 ${reached ? "text-ivory" : "text-ivory/40"}`}>{p.name}</p>
                    <p className={`mt-2 text-[14px] leading-snug transition-colors duration-500 ${on ? "text-fog" : "text-ivory/35"}`}>{p.line}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mt-8 flex items-center gap-2 font-serif text-[18px] italic text-ivory/45 md:hidden">
            <RotateCcw aria-hidden="true" className="h-4 w-4 -scale-x-100" /> {LOOP}
          </p>
        </div>

        <div className="mt-16 text-center md:mt-20">
          <a
            href="/methode"
            className="group inline-flex items-center gap-3 text-[15px] font-semibold text-ivory underline decoration-champagne/60 underline-offset-[6px] hover:decoration-ivory"
          >
            Voir la méthode en détail
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
