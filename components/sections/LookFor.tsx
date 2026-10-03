"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/lib/motion";
import { Reveal } from "../ui/Reveal";

type GlyphProps = { on: boolean };

/** Une épingle sur une carte, qui émet. */
function VisibilityGlyph({ on }: GlyphProps) {
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full">
      <path d="M8 62 40 50l38 10 34-14" fill="none" stroke="currentColor" strokeOpacity=".15" />
      <path d="M8 40 46 30l32 8 34-12" fill="none" stroke="currentColor" strokeOpacity=".1" />
      {on && <circle cx="60" cy="44" r="10" fill="none" stroke="#C6A86C" className="ripple" style={{ transformOrigin: "60px 44px" }} />}
      <motion.g initial={{ y: -14, opacity: 0 }} animate={on ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.7, ease: EASE }}>
        <path d="M60 44c-7-8-11-13-11-18a11 11 0 0 1 22 0c0 5-4 10-11 18Z" fill="#C6A86C" />
        <circle cx="60" cy="26" r="4" fill="#07090D" />
      </motion.g>
    </svg>
  );
}

/** Des recherches qui montent. */
function DemandGlyph({ on }: GlyphProps) {
  const bars = [22, 34, 28, 46, 40, 58];
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full">
      <line x1="10" y1="70" x2="110" y2="70" stroke="currentColor" strokeOpacity=".15" />
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={16 + i * 16}
          y={70 - h}
          width="9"
          height={h}
          rx="2"
          fill={i === bars.length - 1 ? "#C6A86C" : "currentColor"}
          fillOpacity={i === bars.length - 1 ? 1 : 0.22}
          style={{ transformBox: "fill-box", originY: 1 }}
          initial={{ scaleY: 0 }}
          animate={on ? { scaleY: 1 } : {}}
          transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/** Trois cabinets côte à côte, un seul se détache. */
function CompetitionGlyph({ on }: GlyphProps) {
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full">
      {[30, 60, 90].map((x, i) => (
        <motion.g key={x} initial={{ y: 0 }} animate={on ? { y: i === 0 ? -12 : 0 } : {}} transition={{ delay: 0.3, duration: 0.8, ease: EASE }}>
          <circle cx={x} cy="34" r="9" fill={i === 0 ? "#C6A86C" : "currentColor"} fillOpacity={i === 0 ? 1 : 0.2} />
          <rect x={x - 13} y="50" width="26" height="14" rx="7" fill={i === 0 ? "#C6A86C" : "currentColor"} fillOpacity={i === 0 ? 0.9 : 0.15} />
        </motion.g>
      ))}
    </svg>
  );
}

/** Un chemin vers le contact, avec une rupture. */
function ConversionGlyph({ on }: GlyphProps) {
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full">
      <motion.path
        d="M12 58 C 34 58, 34 30, 56 30"
        fill="none"
        stroke="currentColor"
        strokeOpacity=".35"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={on ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <motion.path
        d="M68 30 C 82 30, 84 44, 94 44"
        fill="none"
        stroke="#C6A86C"
        strokeWidth="1.5"
        strokeDasharray="3 4"
        initial={{ opacity: 0 }}
        animate={on ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      <circle cx="12" cy="58" r="3" fill="currentColor" fillOpacity=".4" />
      <motion.g initial={{ scale: 0.6, opacity: 0 }} animate={on ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 1, duration: 0.5 }} style={{ transformOrigin: "102px 44px" }}>
        <circle cx="102" cy="44" r="10" fill="#C6A86C" />
        <path d="M98.5 40.5c0 4 3 7 7 7l1.2-1.6-2-1.2-1 .9a5 5 0 0 1-2.3-2.3l.9-1-1.2-2Z" fill="#07090D" />
      </motion.g>
    </svg>
  );
}

const ITEMS = [
  { name: "Visibilité", line: "Où vous apparaissez.", Glyph: VisibilityGlyph },
  { name: "Demande", line: "Ce qui est recherché.", Glyph: DemandGlyph },
  { name: "Concurrence", line: "Qui apparaît à côté.", Glyph: CompetitionGlyph },
  { name: "Conversion", line: "Ce qui freine le contact.", Glyph: ConversionGlyph },
];

export function LookFor() {
  const ref = useRef<HTMLUListElement>(null);
  const on = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section id="ce-que-nous-cherchons" aria-labelledby="cherchons-titre" className="bg-night py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <h2 id="cherchons-titre" className="display-lg max-w-[16ch]">
            Nous cherchons ce qui mérite <span className="text-ivory/45">d&apos;être amélioré.</span>
          </h2>
        </Reveal>

        <ul ref={ref} className="mt-16 grid grid-cols-2 border-t border-white/10 md:mt-20 lg:grid-cols-4">
          {ITEMS.map(({ name, line, Glyph }, i) => (
            <li
              key={name}
              className={`border-b border-white/10 px-1 py-8 sm:px-6 lg:border-b-0 lg:py-10 ${i % 2 === 0 ? "border-r" : ""} lg:border-r ${
                i === ITEMS.length - 1 ? "lg:border-r-0" : ""
              }`}
            >
              <div aria-hidden="true" className="mx-auto h-20 w-[120px] text-ivory">
                <Glyph on={on} />
              </div>
              <p className="mt-6 text-center font-serif text-[26px] leading-none md:text-[30px]">{name}</p>
              <p className="mt-2 text-center text-[13.5px] text-fog">{line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
