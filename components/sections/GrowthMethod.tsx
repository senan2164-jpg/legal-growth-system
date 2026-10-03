"use client";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { SectionTag } from "../ui/SectionTag";

const STEPS = [
  { k: "Discover", fr: "Observer", d: "Comprendre le cabinet, ses spécialités et les dossiers qu'il veut développer." },
  { k: "Analyze", fr: "Comprendre", d: "Étudier la demande, la concurrence et le parcours de contact, à partir de données observées." },
  { k: "Design", fr: "Structurer", d: "Choisir les actions utiles et les ordonner, seulement si l'analyse les justifie." },
  { k: "Deploy", fr: "Déployer", d: "Mettre en place, avec vos équipes, votre prestataire ou les miens." },
  { k: "Optimize", fr: "Mesurer et améliorer", d: "Remesurer avec la même méthode, ajuster, arrêter ce qui ne sert pas." },
];

export function GrowthMethod() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const [reached, setReached] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(Math.floor(v * (STEPS.length - 0.01) + 0.2) - 1));

  return (
    <section id="methode" aria-labelledby="methode-titre" className="relative bg-ink py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionTag index="08" label="Notre méthode" />
            <h2 id="methode-titre" className="display-lg mt-6">
              Cinq temps.
              <span className="block text-ivory/45">Toujours dans cet ordre.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-fog lg:justify-self-end">
            Pas d&apos;action avant d&apos;avoir compris. Pas de déploiement sans mesure.
          </p>
        </div>

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* Ligne horizontale (desktop) */}
          <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-white/10 lg:block">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-champagne" />
          </div>
          {/* Ligne verticale (mobile) */}
          <div className="absolute bottom-0 left-[27px] top-0 w-px bg-white/10 lg:hidden">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-champagne" />
          </div>

          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {STEPS.map((s, i) => {
              const on = i <= reached;
              return (
                <li key={s.k} className="relative flex gap-6 lg:block">
                  <span
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-serif text-xl transition-all duration-500 ${
                      on ? "border-champagne bg-champagne text-ink" : "border-white/15 bg-ink text-ivory/45"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="lg:mt-8">
                    <div className="mb-2 text-[12px] text-champagne/80">{s.fr}</div>
                    <h3 className={`font-serif text-[clamp(2rem,3vw,2.6rem)] font-semibold leading-none transition-colors duration-500 ${on ? "text-ivory" : "text-ivory/35"}`}>
                      {s.k}
                    </h3>
                    <p className="mt-3 max-w-[22rem] text-[14px] leading-relaxed text-fog">{s.d}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
