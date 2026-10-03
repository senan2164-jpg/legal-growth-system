"use client";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import { DemoBadge } from "../ui/DemoBadge";
import { SectionTag } from "../ui/SectionTag";

const QUERY = "avocat licenciement Paris";
const RESULTS = [
  { name: "Cabinet A", url: "cabinet-a.example › droit-du-travail", demo: false },
  { name: "Cabinet B", url: "cabinet-b.example › licenciement", demo: false },
  { name: "Cabinet C", url: "annuaire.example › cabinet-c", demo: false },
  { name: "Cabinet Démo", url: "cabinet-demo.example › contester-un-licenciement", demo: true },
];

function useTyping(text: string, start: boolean, speed = 55) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setOut(text);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [start, text, speed, reduce]);
  return out;
}

export function SearchIntelligence() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const typed = useTyping(QUERY, inView);
  const done = typed.length === QUERY.length;
  const [aiReady, setAiReady] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setAiReady(true), 700);
    return () => window.clearTimeout(t);
  }, [done]);

  return (
    <section id="recherche" aria-labelledby="recherche-titre" className="relative bg-paper py-24 text-ink md:py-36">
      <div aria-hidden="true" className="grid-lines-light absolute inset-0" />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <SectionTag index="03" label="Search intelligence" tone="light" />
          <h2 id="recherche-titre" className="display-lg mt-6">
            Deux écrans à regarder : <span className="text-ink/40">le moteur de recherche et l&apos;assistant IA.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-graphite">
            Le moteur de recherche classe des résultats. L&apos;assistant IA résume et cite des sources. L&apos;analyse vérifie ce qui apparaît dans les deux cas, pour des recherches liées à votre spécialité.
          </p>
        </div>

        <div ref={ref} className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-[1.05fr_1fr]">
          {/* Moteur de recherche */}
          <div className="rounded-[24px] border border-ink/10 bg-white p-4 shadow-paper sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-ink/60">Moteur de recherche</span>
              <DemoBadge tone="light">Simulation visuelle — exemple fictif</DemoBadge>
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-full border border-ink/15 px-4 py-3 shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-ink/40">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[15px] text-ink" aria-label={QUERY}>
                {typed}
                {!done && <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-ink" />}
              </span>
            </div>

            <ol className="mt-6 space-y-2">
              {RESULTS.map((r, i) => (
                <motion.li
                  key={r.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={done ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: EASE }}
                  className={`relative rounded-xl px-4 py-3.5 ${r.demo ? "bg-champagne/10 ring-1 ring-champagne-deep/35" : ""}`}
                >
                  <div className="truncate text-[11.5px] text-ink/45">{r.url}</div>
                  <div className={`mt-0.5 text-[16px] font-semibold ${r.demo ? "text-ink" : "text-[#1f3a6e]"}`}>
                    {r.name}, avocat en droit du travail à Paris
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-1.5 w-11/12 rounded-full bg-ink/[.07]" />
                    <div className="h-1.5 w-2/3 rounded-full bg-ink/[.07]" />
                  </div>
                  {r.demo && (
                    <span className="absolute right-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10.5px] font-semibold text-champagne-soft">
                      Votre cabinet ?
                    </span>
                  )}
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Assistant IA */}
          <div className="relative overflow-hidden rounded-[24px] bg-ink p-4 text-ivory shadow-console sm:p-6">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(198,168,108,.18),transparent_65%)]" />
            <div className="relative flex flex-wrap items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-ivory/60">Assistant IA</span>
              <DemoBadge>Simulation visuelle — exemple fictif</DemoBadge>
            </div>
            <p className="relative mt-5 text-[13px] text-ivory/45">Que recommande une IA lorsqu&apos;un utilisateur demande…</p>

            <div className="relative mt-4 ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-white/[.07] px-4 py-3 text-[14px] leading-relaxed">
              Je viens d&apos;être licencié à Paris. Quel type d&apos;avocat consulter, et comment choisir ?
            </div>

            <div className="relative mt-4 min-h-[250px]">
              <AnimatePresence mode="wait">
                {!aiReady ? (
                  <motion.div key="wait" exit={{ opacity: 0 }} className="space-y-2 pt-2">
                    <div className="shimmer h-2 w-full rounded-full" />
                    <div className="shimmer h-2 w-5/6 rounded-full" />
                    <div className="shimmer h-2 w-2/3 rounded-full" />
                  </motion.div>
                ) : (
                  <motion.div key="answer" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.18 } } }} className="space-y-3 text-[14px] leading-relaxed text-ivory/80">
                    {[
                      "Pour contester un licenciement, un avocat en droit du travail est généralement indiqué.",
                      "Critères souvent mis en avant : une spécialisation clairement affichée, des contenus explicatifs, une présence locale vérifiable et des avis cohérents.",
                    ].map((t) => (
                      <motion.p key={t} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                        {t}
                      </motion.p>
                    ))}
                    <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="rounded-xl border border-white/10 p-3">
                      <div className="text-[11px] text-ivory/40">Cabinets mentionnés dans cette simulation</div>
                      <div className="mt-2 flex flex-wrap gap-2 text-[12.5px]">
                        <span className="rounded-full bg-white/[.06] px-3 py-1">Cabinet A</span>
                        <span className="rounded-full bg-champagne/15 px-3 py-1 text-champagne-soft ring-1 ring-champagne/30">Cabinet Démo</span>
                      </div>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="flex flex-wrap items-center gap-2 text-[11px] text-ivory/40">
                      Sources consultées
                      {["Site du cabinet", "Fiche locale", "Annuaire", "Article"].map((s) => (
                        <span key={s} className="rounded-md border border-white/10 px-2 py-0.5">{s}</span>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="relative mt-4 border-t border-white/10 pt-4 text-[11.5px] leading-relaxed text-ivory/40">
              Aucune IA ne recommande réellement ce cabinet, qui n&apos;existe pas. Dans une vraie analyse, ce type de test est répété, daté et présenté comme une observation ponctuelle : les réponses varient d&apos;une session à l&apos;autre.
            </p>
          </div>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {[
            ["Être trouvé", "Apparaître sur les requêtes qui comptent pour vos spécialités."],
            ["Être compris", "Des informations claires, cohérentes et structurées partout où l'on parle de vous."],
            ["Être choisi", "Une page et un parcours qui transforment l'intérêt en prise de contact."],
          ].map(([t, d], i) => (
            <div key={t} className="bg-paper p-6">
              <dt className="flex items-baseline gap-3 font-serif text-2xl font-semibold">
                <span className="text-base italic text-champagne-deep">{i + 1}.</span>
                {t}
              </dt>
              <dd className="mt-2 text-[14px] leading-relaxed text-graphite">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
