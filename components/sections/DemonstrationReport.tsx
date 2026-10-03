"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE } from "@/lib/motion";
import { SectionTag } from "../ui/SectionTag";

const TABS = ["Analyse", "Recherches", "Concurrence", "Opportunités", "Parcours", "Recommandations"] as const;
type Tab = (typeof TABS)[number];

function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "gold" }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] ${tone === "gold" ? "bg-champagne/15 text-champagne-soft" : "border border-white/10 text-ivory/55"}`}>
      {children}
    </span>
  );
}

function Content({ tab }: { tab: Tab }) {
  switch (tab) {
    case "Analyse":
      return (
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              t: "Contact sur mobile",
              fact: "Le bouton de contact n'apparaît qu'en bas de la page d'accueil sur mobile.",
              read: "Cela peut ajouter une friction dans le parcours.",
              need: "Son impact réel ne se mesure qu'avec les données de visite du cabinet.",
            },
            {
              t: "Pages de spécialité",
              fact: "Aucune page dédiée à la rupture conventionnelle n'a été trouvée lors du crawl.",
              read: "Le cabinet a moins de chances d'apparaître sur ces recherches.",
              need: "La demande réelle se confirme avec la Search Console du cabinet.",
            },
            {
              t: "Fiche Google",
              fact: "La fiche ne mentionne ni horaires ni catégorie liée au droit du travail.",
              read: "Les informations utiles avant un appel sont incomplètes.",
              need: "Les appels issus de la fiche ne sont visibles que depuis le compte du cabinet.",
            },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-white/[.07] bg-white/[.02] p-5">
              <div className="font-serif text-xl">{f.t}</div>
              <dl className="mt-3 space-y-3 text-[13.5px] leading-relaxed">
                <div>
                  <dt className="text-[11.5px] text-champagne">Fait observé</dt>
                  <dd className="text-ivory/85">{f.fact}</dd>
                </div>
                <div>
                  <dt className="text-[11.5px] text-ivory/45">Interprétation</dt>
                  <dd className="text-ivory/70">{f.read}</dd>
                </div>
                <div>
                  <dt className="text-[11.5px] text-ivory/45">Donnée interne nécessaire</dt>
                  <dd className="text-ivory/60">{f.need}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      );
    case "Recherches":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Licenciement", ["licenciement abusif", "faute grave avocat", "contester un licenciement"], "Événementiel"],
            ["Rupture conventionnelle", ["rupture conventionnelle avocat", "négocier une rupture"], "Comparaison"],
            ["Prud'hommes", ["avocat prud'hommes paris", "saisir les prud'hommes"], "Local"],
            ["Harcèlement", ["harcèlement au travail avocat", "que faire harcèlement"], "Sensible"],
          ].map(([cluster, qs, intent]) => (
            <div key={cluster as string} className="rounded-2xl border border-white/[.07] bg-white/[.02] p-5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl">{cluster as string}</span>
                <Chip tone="gold">{intent as string}</Chip>
              </div>
              <ul className="mt-3 space-y-1.5">
                {(qs as string[]).map((q) => (
                  <li key={q} className="font-mono text-[12px] text-ivory/60">{q}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "Concurrence":
      return (
        <div className="overflow-x-auto rounded-2xl border border-white/[.07]">
          <table className="w-full min-w-[520px] text-left text-[13.5px]">
            <thead>
              <tr className="text-[12px] text-ivory/45">
                <th className="px-4 py-3 font-normal">Critère observé</th>
                <th className="px-4 py-3 font-normal">Cabinet Exemple</th>
                <th className="px-4 py-3 font-normal">Concurrent 1</th>
                <th className="px-4 py-3 font-normal">Concurrent 2</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Page dédiée au licenciement", "Non", "Oui", "Oui"],
                ["Page dédiée à la rupture conventionnelle", "Non", "Oui", "Non"],
                ["Présent dans le pack local (requête principale)", "Non", "Oui", "Oui"],
                ["Téléphone cliquable sur mobile", "Oui", "Oui", "Non"],
              ].map(([k, ...v]) => (
                <tr key={k} className="border-t border-white/[.06]">
                  <th scope="row" className="px-4 py-3 font-normal text-ivory/80">{k}</th>
                  {v.map((x, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? "text-champagne-soft" : "text-ivory/70"}`}>{x}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "Opportunités":
      return (
        <ul className="divide-y divide-white/[.07] rounded-2xl border border-white/[.07]">
          {[
            ["Pages dédiées par situation", "Visibilité"],
            ["Réponses aux questions fréquentes des salariés", "Contenu"],
            ["Fiche d'établissement complétée", "Local"],
            ["Formulaire de qualification en ligne", "Conversion"],
          ].map(([t, k]) => (
            <li key={t} className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="text-[15px] text-ivory/85">{t}</span>
              <Chip>{k}</Chip>
            </li>
          ))}
        </ul>
      );
    case "Parcours":
      return (
        <ol className="grid gap-3 sm:grid-cols-5">
          {[
            ["Recherche", "ok", "Présent sur la requête principale"],
            ["Page", "warn", "Pas de page dédiée"],
            ["Contact", "warn", "Téléphone seulement"],
            ["Qualification", "ko", "Inexistante"],
            ["Rendez-vous", "warn", "Manuel"],
          ].map(([s, st, n], i) => (
            <li key={s} className="rounded-2xl border border-white/[.07] bg-white/[.02] p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-ivory/40">{i + 1}</span>
                <span className={`h-2 w-2 rounded-full ${st === "ok" ? "bg-emerald-400/80" : st === "warn" ? "bg-champagne" : "bg-rose-400/80"}`} />
              </div>
              <div className="mt-3 text-[15px] font-semibold">{s}</div>
              <div className="mt-1 text-[12.5px] text-ivory/55">{n}</div>
            </li>
          ))}
        </ol>
      );
    case "Recommandations":
      return (
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Phase 1", "Fondations", ["Pages par situation", "Fiche locale", "Données structurées"]],
            ["Phase 2", "Acquisition", ["Contenus de réponse", "Campagne ciblée test"]],
            ["Phase 3", "Automatisation", ["Qualification en ligne", "Relance et prise de RDV"]],
          ].map(([p, t, items]) => (
            <div key={p as string} className="rounded-2xl border border-white/[.07] bg-white/[.02] p-5">
              <div className="text-[12px] text-champagne">{p as string}</div>
              <div className="mt-1 font-serif text-2xl">{t as string}</div>
              <ul className="mt-4 space-y-2">
                {(items as string[]).map((it) => (
                  <li key={it} className="flex items-center gap-2.5 text-[14px] text-ivory/75">
                    <span className="h-1 w-3 rounded-full bg-champagne/60" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
  }
}

export function DemonstrationReport() {
  const [tab, setTab] = useState<Tab>("Analyse");

  return (
    <section id="demo" aria-labelledby="demo-titre" className="relative bg-night pb-24 md:pb-36">
      <div className="sticky top-16 z-20 border-y border-champagne/25 bg-ink/90 backdrop-blur md:top-[72px]">
        <div className="container-x flex items-center justify-center gap-3 py-2.5 text-center">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-champagne" />
          <span className="text-[11px] font-bold tracking-[.22em] text-champagne-soft sm:text-[12px]">PROJET DE DÉMONSTRATION — DONNÉES FICTIVES</span>
        </div>
      </div>

      <div className="container-x pt-20 md:pt-28">
        <SectionTag index="10" label="Démonstration" />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 id="demo-titre" className="display-lg">
            Cabinet Exemple
            <span className="block text-[0.45em] text-ivory/45">Cabinet fictif, créé pour la démonstration</span>
          </h2>
          <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-[13px] lg:justify-self-end">
            <div>
              <dt className="text-ivory/40">Spécialité</dt>
              <dd className="mt-1 text-ivory">Droit du travail</dd>
            </div>
            <div>
              <dt className="text-ivory/40">Ville</dt>
              <dd className="mt-1 text-ivory">Paris</dd>
            </div>
            <div>
              <dt className="text-ivory/40">Statut</dt>
              <dd className="mt-1 text-champagne-soft">Cabinet fictif</dd>
            </div>
          </dl>
        </div>

        <div className="mt-12 rounded-[26px] border border-white/[.08] bg-ink/50 p-3 sm:p-5">
          <div role="tablist" aria-label="Volets de l'étude de cas" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
            {TABS.map((t, i) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                aria-controls="demo-panel"
                onClick={() => setTab(t)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] transition-colors ${tab === t ? "text-ink" : "text-ivory/55 hover:text-ivory"}`}
              >
                {tab === t && <motion.span layoutId="cs-tab" className="absolute inset-0 rounded-full bg-champagne" transition={{ duration: 0.35, ease: EASE }} />}
                <span className="relative">
                  <span className="mr-1.5 font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </span>
              </button>
            ))}
          </div>
          <div id="demo-panel" role="tabpanel" className="mt-5 min-h-[260px] px-1 pb-2">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
                <Content tab={tab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-6 text-[12.5px] text-ivory/40">
          Ce cabinet n&apos;existe pas. Ce cas illustre la méthode : il ne présente ni témoignage, ni chiffre d&apos;affaires, ni résultat obtenu.
        </p>
      </div>
    </section>
  );
}
