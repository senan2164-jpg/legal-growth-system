"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { systemModules } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { ModuleIcon } from "../viz/ModuleIcons";
import { ModuleViz } from "../viz/ModuleViz";
import { SectionTag } from "../ui/SectionTag";

export function LegalGrowthSystem() {
  const [active, setActive] = useState(0);
  const mod = systemModules[active];

  return (
    <section id="systeme" aria-labelledby="systeme-titre" className="relative bg-ivory py-24 text-ink md:py-40">
      <div className="container-x">
        <SectionTag index="05" label="Le système" tone="light" />
        <h2 id="systeme-titre" className="mt-8 font-serif font-medium leading-[0.92] tracking-[-0.02em] text-[clamp(2.8rem,7.4vw,7.6rem)]">
          Nous ne construisons pas une présence digitale.
          <span className="mt-2 block text-champagne-deep">Nous construisons un système.</span>
        </h2>

        {/* Bandeau des cinq étapes reliées */}
        <ol className="mt-14 grid grid-cols-5 border-y border-ink/10" aria-label="Les cinq modules">
          {systemModules.map((m, i) => (
            <li key={m.id} className="relative">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`flex w-full flex-col items-start gap-1 px-1 py-5 text-left transition-colors sm:px-4 ${active === i ? "text-ink" : "text-ink/40 hover:text-ink/70"}`}
              >
                <span className="font-mono text-[10px] sm:text-[11px]">{m.n}</span>
                <span className="md:hidden">
                  <ModuleIcon id={m.id} />
                </span>
                <span className="hidden text-[12px] font-bold tracking-[.14em] md:inline lg:text-[13px] lg:tracking-[.2em]">{m.name.toUpperCase()}</span>
              </button>
              {active === i && <motion.span layoutId="sys-underline" className="absolute inset-x-0 -bottom-px h-[2px] bg-champagne-deep" />}
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr] lg:gap-10">
          <div className="flex flex-col justify-between gap-8 py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-champagne">
                  <ModuleIcon id={mod.id} />
                </div>
                <div className="mt-8 font-serif text-[22px] italic text-champagne-deep">Module {mod.n}</div>
                <h3 className="mt-1 font-serif text-[52px] font-semibold leading-none">{mod.fr}</h3>
                <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-graphite">{mod.desc}</p>
                <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-ink/55">{mod.parts.join(", ")}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActive((v) => (v - 1 + systemModules.length) % systemModules.length)}
                className="h-11 w-11 rounded-full border border-ink/20 text-ink transition-colors hover:border-ink"
                aria-label="Module précédent"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setActive((v) => (v + 1) % systemModules.length)}
                className="h-11 w-11 rounded-full bg-ink text-ivory transition-colors hover:bg-navy"
                aria-label="Module suivant"
              >
                →
              </button>
              <span className="ml-2 font-mono text-[12px] text-ink/45">
                {mod.n} / 05
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-ink text-ivory shadow-console">
            <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />
            <div className="relative flex items-center justify-between border-b border-white/[.06] px-5 py-3.5">
              <span className="text-[12px] text-ivory/55">
                Module {mod.n}, {mod.fr}, illustration
              </span>
              <span className="flex gap-1.5" aria-hidden="true">
                {systemModules.map((m, i) => (
                  <span key={m.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-champagne" : "w-1.5 bg-white/20"}`} />
                ))}
              </span>
            </div>
            <div className="relative min-h-[340px] w-full p-2 sm:aspect-[560/420] sm:p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="h-full w-full"
                >
                  <ModuleViz id={mod.id} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
