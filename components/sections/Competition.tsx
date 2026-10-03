"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE } from "@/lib/motion";
import { DemoBadge } from "../ui/DemoBadge";
import { SectionTag } from "../ui/SectionTag";

const COLS = ["Cabinet A", "Cabinet B", "Cabinet C", "Votre cabinet"];

/** Chaque critère correspond à une mesure observable. Les valeurs sont fictives. */
type Row = { k: string; measure: string; d: string; src: string[]; v: [string, string, string] };
const ROWS: Row[] = [
  {
    k: "Visibilité",
    measure: "Présence dans le top 10, sur 20 requêtes testées",
    d: "Nombre de requêtes liées à la spécialité sur lesquelles le cabinet apparaît dans les 10 premiers résultats.",
    src: ["Pages de résultats", "Captures datées"],
    v: ["11 / 20", "6 / 20", "3 / 20"],
  },
  {
    k: "Présence locale",
    measure: "Présence dans le pack local, sur 8 requêtes locales",
    d: "Apparition parmi les trois fiches affichées sous la carte, depuis la ville simulée.",
    src: ["Google Maps", "Pack local"],
    v: ["5 / 8", "2 / 8", "0 / 8"],
  },
  {
    k: "Spécialités",
    measure: "Problèmes juridiques couverts par une page dédiée, sur 10",
    d: "Pages consacrées à un problème précis (licenciement, rupture conventionnelle, harcèlement…).",
    src: ["Crawl du site"],
    v: ["7 / 10", "3 / 10", "5 / 10"],
  },
  {
    k: "Réputation",
    measure: "Avis visibles sur la fiche Google, à la date du relevé",
    d: "Nombre d'avis affichés publiquement. Ce n'est pas une mesure de satisfaction.",
    src: ["Fiche Google"],
    v: ["64", "12", "27"],
  },
  {
    k: "Contenu",
    measure: "Contenus avec une date visible, sur les 12 derniers mois",
    d: "Articles et guides datés. Sans date affichée, la fréquence n'est pas mesurable.",
    src: ["Site", "Dates affichées"],
    v: ["9", "0", "4"],
  },
  {
    k: "Expérience digitale",
    measure: "Téléphone cliquable au premier écran sur mobile",
    d: "Contrôle visuel sur mobile : le numéro est-il visible et cliquable sans défiler ?",
    src: ["Contrôle mobile"],
    v: ["Oui", "Non", "Oui"],
  },
  {
    k: "Acquisition visible",
    measure: "Annonces observées pendant le relevé",
    d: "Une absence d'annonce lors d'un relevé ne prouve pas l'absence de campagne.",
    src: ["Pages de résultats", "Centre de transparence"],
    v: ["Oui", "Non", "Non"],
  },
  {
    k: "Assistants IA",
    measure: "Mentions sur 10 tests, à une date donnée",
    d: "Tests répétés dans ChatGPT, Perplexity et Gemini. Observation ponctuelle, variable d'une session à l'autre.",
    src: ["Captures des réponses"],
    v: ["4 / 10", "0 / 10", "1 / 10"],
  },
];

export function Competition() {
  const [active, setActive] = useState(0);
  const row = ROWS[active];

  return (
    <section id="concurrence" aria-labelledby="concurrence-titre" className="relative bg-ink py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <SectionTag index="04" label="Concurrence" />
            <h2 id="concurrence-titre" className="display-lg mt-6">
              Votre véritable concurrence
              <span className="block text-ivory/45">ne se trouve pas uniquement dans votre ville.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-fog lg:justify-self-end">
            Sur une même recherche apparaissent des cabinets, mais aussi des annuaires, des plateformes et des sites d&apos;information. L&apos;analyse relève qui occupe réellement ces résultats.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-[1fr_320px]">
          <div className="overflow-hidden rounded-[24px] border border-white/[.08] bg-night/60">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[.06] px-5 py-4">
              <span className="font-serif text-xl">Matrice comparative</span>
              <DemoBadge>Démonstration — données fictives</DemoBadge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr>
                    <th scope="col" className="sticky left-0 z-10 bg-night px-5 py-4 text-[12px] font-normal text-ivory/40">Critère</th>
                    {COLS.map((c) => (
                      <th
                        key={c}
                        scope="col"
                        className={`px-4 py-4 text-[13px] font-semibold ${c === "Votre cabinet" ? "text-champagne-soft" : "text-ivory/75"}`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r, i) => (
                    <tr
                      key={r.k}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      tabIndex={0}
                      className={`cursor-pointer border-t border-white/[.05] outline-none transition-colors ${
                        active === i ? "bg-white/[.04]" : "hover:bg-white/[.02]"
                      }`}
                    >
                      <th scope="row" className="sticky left-0 z-10 bg-night px-5 py-4 text-[14px] font-medium text-ivory/90">
                        <span className="flex items-center gap-3">
                          <span className={`h-1.5 w-1.5 rounded-full transition-colors ${active === i ? "bg-champagne" : "bg-white/15"}`} />
                          {r.k}
                        </span>
                      </th>
                      {r.v.map((v, j) => (
                        <td key={j} className="px-4 py-4 text-[14px] tabular-nums text-ivory/80">
                          {v}
                        </td>
                      ))}
                      <td className="px-4 py-4">
                        <span className="whitespace-nowrap rounded-full border border-dashed border-champagne/45 px-2.5 py-1 text-[11.5px] text-champagne-soft">
                          À observer
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-white/[.06] px-5 py-4 text-[11.5px] text-ivory/35">
              Cabinets fictifs, valeurs fictives. Les critères, eux, sont ceux d&apos;une vraie analyse : chacun correspond à une mesure observable.
            </p>
          </div>

          <aside className="relative rounded-[24px] border border-champagne/20 bg-gradient-to-b from-navy/70 to-night p-6 lg:sticky lg:top-28 lg:self-start" aria-live="polite">
            <div className="text-[12px] text-ivory/45">Ce que nous mesurons</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={row.k}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <h3 className="mt-3 font-serif text-[34px] leading-none">{row.k}</h3>
                <p className="mt-3 text-[13px] font-semibold text-champagne-soft">{row.measure}</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ivory/70">{row.d}</p>
                <div className="mt-6 text-[11px] text-ivory/40">Sources observées</div>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {row.src.map((s) => (
                    <li key={s} className="rounded-full border border-white/10 px-3 py-1 text-[12px] text-ivory/70">{s}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex items-center gap-1" aria-hidden="true">
              {ROWS.map((r, i) => (
                <span key={r.k} className={`h-[3px] flex-1 rounded-full transition-colors ${i === active ? "bg-champagne" : "bg-white/10"}`} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
