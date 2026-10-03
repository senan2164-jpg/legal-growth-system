"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { specialties } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { SectionTag } from "../ui/SectionTag";

export function Specialties() {
  const [active, setActive] = useState(0);
  const sp = specialties[active];

  return (
    <section id="specialites" aria-labelledby="specialites-titre" className="relative overflow-x-clip bg-night py-24 md:py-36">
      <div aria-hidden="true" className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(198,168,108,.08),transparent_65%)]" />
      <div className="container-x relative">
        <SectionTag index="06" label="Pourquoi les cabinets d'avocats" />
        <h2 id="specialites-titre" className="display-lg mt-6 max-w-4xl">
          Le droit est complexe.
          <span className="block text-ivory/45">Votre acquisition ne devrait pas l&apos;être.</span>
        </h2>

        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fog lg:hidden">
          Chaque spécialité a ses intentions de recherche, son niveau d&apos;urgence et sa concurrence.
        </p>
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_380px] lg:gap-16">
          <ul className="border-t border-white/10" role="list">
            {specialties.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.name} className="border-b border-white/10">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="group flex w-full items-baseline gap-5 py-4 text-left md:py-5"
                  >
                    <span className={`font-mono text-[11px] transition-colors ${on ? "text-champagne" : "text-ivory/30"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={`font-serif text-[clamp(1.75rem,4.2vw,3.4rem)] leading-[1.05] transition-all duration-500 ${
                        on ? "translate-x-2 text-ivory" : "text-ivory/35 group-hover:text-ivory/60"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span className={`ml-auto hidden h-px bg-champagne transition-all duration-500 sm:block ${on ? "w-16" : "w-0"}`} />
                  </button>
                  {/* Détail mobile */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden lg:hidden"
                      >
                        <p className="pb-5 pl-9 text-[14.5px] leading-relaxed text-ivory/65">{s.text}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <div className="sticky top-28 rounded-[24px] border border-white/[.08] bg-ink/60 p-7">
              <p className="text-[14px] leading-relaxed text-fog">
                Chaque spécialité a ses intentions de recherche, son niveau d&apos;urgence, son parcours et sa concurrence. Une question fiscale ne se cherche pas comme un litige commercial.
              </p>
              <div className="my-7 h-px bg-white/10" />
              <div className="mb-3 text-[12px] text-ivory/45">Points d&apos;attention à vérifier lors de l&apos;analyse</div>
              <AnimatePresence mode="wait">
                <motion.div key={sp.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
                  <h3 className="font-serif text-[32px] leading-tight text-champagne-soft">{sp.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ivory/75">{sp.text}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {sp.tags.map((t) => (
                      <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-[12px] text-ivory/65">{t}</li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="mt-10 text-[13px] text-ivory/45">
          L&apos;analyse porte sur l&apos;environnement d&apos;acquisition du cabinet, jamais sur le fond du droit.
        </p>
      </div>
    </section>
  );
}
