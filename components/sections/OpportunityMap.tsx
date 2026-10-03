"use client";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { MagneticLink } from "../ui/MagneticLink";
import { SectionTag } from "../ui/SectionTag";

const PAGES = ["Votre présence", "Demande et recherches", "Concurrence observée", "Parcours et conversion", "Opportunités", "Plan d'action"];

function Mini({ i }: { i: number }) {
  const ink = "#07090D";
  switch (i) {
    case 0:
      return (
        <svg viewBox="0 0 100 60" className="w-full" aria-hidden="true">
          {[24, 16, 8].map((r) => <circle key={r} cx="50" cy="30" r={r} fill="none" stroke={ink} strokeOpacity=".15" />)}
          <circle cx="50" cy="30" r="4" fill="#C6A86C" />
          <circle cx="68" cy="20" r="2.5" fill={ink} fillOpacity=".5" />
          <circle cx="34" cy="40" r="2.5" fill={ink} fillOpacity=".5" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 100 60" className="w-full" aria-hidden="true">
          {[30, 42, 26, 50, 38, 54].map((h, k) => <rect key={k} x={8 + k * 15} y={58 - h} width="9" height={h} rx="1.5" fill={k === 5 ? "#C6A86C" : ink} fillOpacity={k === 5 ? 1 : 0.18} />)}
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 100 60" className="w-full" aria-hidden="true">
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x="6" y={6 + r * 13} width="26" height="5" rx="2" fill={ink} fillOpacity=".2" />
              {[0, 1, 2, 3].map((k) => <rect key={k} x={42 + k * 13} y={6 + r * 13} width="9" height="5" rx="1" fill={k <= (r + 1) % 4 ? (r === 3 ? "#C6A86C" : ink) : ink} fillOpacity={k <= (r + 1) % 4 ? 0.6 : 0.1} />)}
            </g>
          ))}
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 100 60" className="w-full" aria-hidden="true">
          <path d="M6 54H96M6 54V4" stroke={ink} strokeOpacity=".2" />
          {[[20, 40], [34, 30], [48, 44], [62, 22], [80, 12]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={k === 4 ? 5 : 3} fill={k === 4 ? "#C6A86C" : ink} fillOpacity={k === 4 ? 1 : 0.35} />)}
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 100 60" className="w-full" aria-hidden="true">
          <path d="M8 30H92" stroke={ink} strokeOpacity=".2" />
          {[8, 29, 50, 71, 92].map((x, k) => <circle key={x} cx={x} cy="30" r="5" fill={k === 2 ? "#C6A86C" : "#fff"} stroke={ink} strokeOpacity=".4" />)}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 60" className="w-full" aria-hidden="true">
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x="8" y={6 + r * 13} width="7" height="7" rx="1.5" fill={r < 2 ? ink : "none"} stroke={ink} strokeOpacity=".4" />
              <rect x="22" y={8 + r * 13} width={60 - r * 8} height="3.5" rx="1.5" fill={ink} fillOpacity=".18" />
            </g>
          ))}
        </svg>
      );
  }
}

export function OpportunityMap() {
  return (
    <section id="rapport" aria-labelledby="rapport-titre" className="relative overflow-hidden bg-bone py-24 text-ink md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:items-center">
        <div>
          <SectionTag index="07" label="Analyse personnalisée" tone="light" />
          <h2 id="rapport-titre" className="display-lg mt-6">Nous commençons par regarder votre marché.</h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-graphite">
            Avant toute recommandation : ce qui a été observé autour de votre cabinet, avec la date et la source de chaque constat, puis ce qui mérite d&apos;être fait en premier.
          </p>
          <div className="mt-10">
            <MagneticLink href="#analyse" variant="dark">Demander mon analyse</MagneticLink>
          </div>
        </div>

        <div className="relative">
          <div className="mb-4 flex items-center justify-between rounded-xl bg-ink px-5 py-3 text-ivory">
            <span className="font-serif text-lg">Opportunity Map</span>
            <span className="text-[11.5px] text-ivory/50">Structure type, 6 chapitres</span>
          </div>
          <motion.ol
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            {PAGES.map((p, i) => (
              <motion.li
                key={p}
                variants={{
                  hidden: { opacity: 0, y: 50, rotate: i % 2 ? 5 : -5 },
                  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: EASE } },
                }}
                whileHover={{ y: -6 }}
                className="flex aspect-[3/4] flex-col rounded-lg bg-white p-4 shadow-paper ring-1 ring-ink/5"
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-[30px] leading-none text-champagne-deep">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-1.5 w-6 rounded-full bg-ink/10" />
                </div>
                <h3 className="mt-3 font-serif text-[17px] font-semibold leading-tight sm:text-[19px]">{p}</h3>
                <div className="mt-2 space-y-1">
                  <div className="h-1 w-full rounded-full bg-ink/[.08]" />
                  <div className="h-1 w-3/4 rounded-full bg-ink/[.08]" />
                </div>
                <div className="mt-auto pt-3">
                  <Mini i={i} />
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
