"use client";
import { motion } from "framer-motion";
import { pillars } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useSequence } from "@/lib/useSequence";
import { Reveal } from "../ui/Reveal";

/** Positions des quatre volets sur la boucle, dans le sens de lecture. */
const SPOTS = [
  { left: "0%", top: "0%" },
  { left: "100%", top: "0%" },
  { left: "100%", top: "100%" },
  { left: "0%", top: "100%" },
];

export function System() {
  const { ref, step } = useSequence(pillars.length, { interval: 1700, hold: 1700 });

  return (
    <section id="systeme" aria-labelledby="systeme-titre" className="overflow-hidden bg-ink py-24 md:py-36">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">Legal Growth System</p>
          <h2 id="systeme-titre" className="display-lg mx-auto mt-5 max-w-[16ch]">
            Quatre volets <span className="text-ivory/45">qui se répondent.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative mx-auto mt-20 max-w-[760px] px-[12%] py-24 md:mt-24 md:px-[14%] md:py-24">
          {/* La boucle et le point qui la parcourt */}
          <div className="relative aspect-[5/3]">
            <div aria-hidden="true" className="absolute inset-0 rounded-[28px] border border-ivory/10" />
            <motion.span
              aria-hidden="true"
              className="absolute z-10 -ml-[7px] -mt-[7px] h-3.5 w-3.5 rounded-full bg-champagne shadow-glow"
              initial={false}
              animate={SPOTS[step]}
              transition={{ duration: 1.1, ease: EASE }}
            />
            <p aria-hidden="true" className="absolute inset-0 flex items-center justify-center px-4 text-center font-serif text-[18px] italic text-ivory/35 md:text-[22px]">
              Le suivi nourrit la visibilité.
            </p>

            <ol>
              {pillars.map((p, i) => {
                const on = i === step;
                const right = i === 1 || i === 2;
                const bottom = i >= 2;
                return (
                  <li key={p.name} className="absolute h-0 w-0" style={SPOTS[i]}>
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[7px] -top-[7px] h-3.5 w-3.5 rounded-full border bg-ink transition-colors duration-500 ${
                        on ? "border-champagne" : "border-ivory/25"
                      }`}
                    />
                    <div
                      className={`absolute flex w-[150px] gap-1.5 md:w-[220px] ${right ? "-right-6 items-end text-right" : "-left-6 items-start text-left"} ${
                        bottom ? "top-5 flex-col" : "bottom-5 flex-col-reverse"
                      }`}
                    >
                      <span className={`font-serif text-[24px] leading-none transition-colors duration-500 md:text-[32px] ${on ? "text-ivory" : "text-ivory/40"}`}>
                        {p.name}
                      </span>
                      <span className={`text-[12.5px] leading-snug transition-colors duration-500 md:text-[14px] ${on ? "text-fog" : "text-ivory/25"}`}>
                        {p.line}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
