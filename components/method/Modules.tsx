"use client";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { EASE } from "@/lib/motion";
import { Reveal } from "../ui/Reveal";
import { ModuleCard } from "./ModuleCard";
import { AcquisitionViz, AutomationViz, ConversionViz, IntelligenceViz, VisibilityViz } from "./ModuleViz";

const MODULES: { card: string; name: string; line: string; Viz: ComponentType }[] = [
  { card: "Visibility", name: "Visibilité", line: "Être trouvé là où vos clients cherchent un avocat.", Viz: VisibilityViz },
  { card: "Acquisition", name: "Acquisition", line: "Attirer les bonnes demandes vers des pages qui n'ont qu'un objectif : le contact.", Viz: AcquisitionViz },
  { card: "Conversion", name: "Conversion", line: "Un site qui convertit : le visiteur comprend, vous fait confiance, et prend rendez-vous.", Viz: ConversionViz },
  { card: "Automation", name: "Automatisation", line: "Chaque demande est notifiée, qualifiée et suivie. Aucune ne se perd.", Viz: AutomationViz },
  { card: "Intelligence", name: "Pilotage", line: "Mesurer ce qui fonctionne, puis décider où investir.", Viz: IntelligenceViz },
];

/** Les cinq modules, l'un après l'autre, reliés par un fil. */
export function Modules() {
  return (
    <ol>
      {MODULES.map(({ card, name, line, Viz }, i) => (
        <li key={card}>
          {i > 0 && (
            <div aria-hidden="true" className="flex justify-center py-6 md:py-10">
              <motion.span
                className="block h-16 w-px origin-top bg-champagne-deep/60 md:h-24"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            </div>
          )}
          <section aria-labelledby={`module-${i + 1}`} className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <p className="font-serif text-[22px] italic text-champagne-deep">Module {String(i + 1).padStart(2, "0")}</p>
              <h3 id={`module-${i + 1}`} className="display-md mt-2">
                {name}
              </h3>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-graphite">{line}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ModuleCard index={i} total={MODULES.length} name={card}>
                <Viz />
              </ModuleCard>
            </Reveal>
          </section>
        </li>
      ))}
    </ol>
  );
}
