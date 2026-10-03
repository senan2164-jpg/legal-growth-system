"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticLink } from "../ui/MagneticLink";
import { HeroSystem } from "../viz/HeroSystem";

const CHAIN = ["Visibilité", "Acquisition", "Conversion", "Automatisation", "Pilotage"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden bg-ink pb-24 pt-28 md:pt-36 lg:min-h-[100svh] lg:pb-32">
      <div aria-hidden="true" className="grid-lines absolute inset-0" />
      <div
        aria-hidden="true"
        className="animate-breathe absolute -right-40 -top-48 h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(198,168,108,.13),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 h-[620px] w-[900px] bg-[radial-gradient(ellipse_at_center,rgba(28,58,112,.5),transparent_65%)]"
      />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
        <motion.div style={{ y: yText, opacity: fade }}>
          <p className="rise flex items-center gap-3 text-[13px] text-ivory/55">
            <span className="font-serif text-lg italic text-champagne">§</span>
            Pour les cabinets d&apos;avocats
          </p>

          <h1 className="display-xl mt-7 text-ivory">
            <span className="rise block [animation-delay:.05s]">Le prochain dossier</span>
            <span className="rise block [animation-delay:.12s]">commence souvent</span>
            <span className="rise block text-ivory/45 [animation-delay:.19s]">bien avant le premier appel.</span>
          </h1>

          <div className="rise mt-10 flex items-center gap-4 [animation-delay:.3s]">
            <span className="h-px w-12 bg-champagne" />
            <span className="text-[12px] font-semibold tracking-[.36em] text-champagne">LEGAL GROWTH SYSTEM</span>
          </div>

          <p className="rise mt-5 max-w-[30rem] text-[17px] leading-relaxed text-fog [animation-delay:.36s]">
            Un système de croissance digitale conçu pour les cabinets d&apos;avocats. On observe comment votre cabinet est trouvé,
            comparé et contacté, avant de décider quoi faire.
          </p>

          <div className="rise mt-10 flex flex-wrap gap-3 [animation-delay:.44s]">
            <MagneticLink href="#analyse">Demander mon analyse</MagneticLink>
            <MagneticLink href="#systeme" variant="ghostDark" icon={false}>
              Découvrir le système
            </MagneticLink>
          </div>

          <ol className="rise mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px] text-ivory/45 [animation-delay:.55s]" aria-label="Les cinq étapes du système">
            {CHAIN.map((c, i) => (
              <li key={c} className="flex items-center gap-3">
                <span className={i === 0 ? "text-ivory/80" : ""}>{c}</span>
                {i < CHAIN.length - 1 && <span aria-hidden="true" className="h-px w-5 bg-champagne/50" />}
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div style={{ y: yVisual }} className="relative">
          <HeroSystem />
        </motion.div>
      </div>

      <div aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="text-[11px] text-ivory/35">Faire défiler</span>
        <span className="relative h-10 w-px overflow-hidden bg-ivory/10">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-champagne"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
