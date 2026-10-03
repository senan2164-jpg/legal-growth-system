"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Search, Star } from "lucide-react";
import { EASE } from "@/lib/motion";
import { useSequence } from "@/lib/useSequence";

const STEPS = ["Recherche", "Résultats", "Comparaison", "Cabinet choisi"];

const RESULTS = [
  { name: "Cabinet A", rating: 4.8, reviews: 64, tags: ["Droit des affaires", "WhatsApp"], pick: true },
  { name: "Votre cabinet", rating: null, reviews: 0, tags: ["Cabinet d'avocats"], you: true },
  { name: "Cabinet B", rating: 4.2, reviews: 19, tags: ["Sociétés"] },
];

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, k) => (
        <Star key={k} className={`h-3 w-3 ${k < Math.round(value) ? "fill-champagne-deep text-champagne-deep" : "fill-ink/10 text-ink/10"}`} />
      ))}
    </span>
  );
}

/** Recherche, résultats, comparaison, choix : ce qui se joue avant l'appel. */
export function ResultsCompare() {
  const { ref, step, setStep } = useSequence(STEPS.length, { interval: 1900, hold: 3600 });

  return (
    <div ref={ref} className="mx-auto w-full max-w-[560px]">
      <ol className="mb-6 flex items-center justify-between gap-2" aria-label="Étapes">
        {STEPS.map((s, i) => (
          <li key={s} className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "sm:flex-1" : ""}`}>
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
              className={`whitespace-nowrap py-2 text-[10px] font-semibold uppercase tracking-[.04em] transition-colors sm:text-[11.5px] sm:tracking-[.12em] ${
                i <= step ? "text-ink" : "text-ink/30"
              }`}
            >
              {s}
            </button>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="relative hidden h-px flex-1 bg-ink/10 sm:block">
                <span className={`absolute inset-0 origin-left bg-champagne-deep transition-transform duration-700 ${i < step ? "scale-x-100" : "scale-x-0"}`} />
              </span>
            )}
          </li>
        ))}
      </ol>

      <div aria-hidden="true" className="rounded-[26px] border border-ink/10 bg-white p-4 shadow-paper sm:p-6">
        <div className="flex items-center gap-2.5 rounded-full border border-ink/15 px-4 py-3 text-[14px] text-ink">
          <Search className="h-4 w-4 text-ink/45" />
          avocat droit des affaires abidjan
        </div>

        <ul className="mt-4 min-h-[288px] space-y-2.5">
          <AnimatePresence>
            {step >= 1 &&
              RESULTS.map((r, i) => {
                const chosen = step >= 3 && r.pick;
                const faded = step >= 3 && !r.pick;
                return (
                  <motion.li
                    key={r.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: faded ? 0.38 : 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ delay: step === 1 ? i * 0.14 : 0, duration: 0.55, ease: EASE }}
                    className={`relative rounded-2xl border px-4 py-3.5 transition-colors duration-500 ${
                      chosen ? "border-champagne-deep bg-champagne/10" : r.you ? "border-dashed border-ink/25" : "border-ink/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-[15px] font-semibold ${r.you ? "text-ink/60" : "text-ink"}`}>{r.name}</span>
                      <AnimatePresence>
                        {chosen && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-ivory"
                          >
                            <Check className="h-3 w-3" /> Choisi
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ height: step >= 2 ? "auto" : 0, opacity: step >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-2.5 text-[12px] text-ink/55">
                        {r.rating ? (
                          <span className="flex items-center gap-1.5">
                            <Stars value={r.rating} />
                            {r.rating.toLocaleString("fr-FR")} · {r.reviews} avis
                          </span>
                        ) : (
                          <span className="italic">Aucun avis visible</span>
                        )}
                        {r.tags.map((t) => (
                          <span key={t} className="rounded-full bg-ink/5 px-2 py-0.5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.li>
                );
              })}
          </AnimatePresence>
        </ul>
      </div>
      <p className="mt-3 text-center text-[11.5px] text-ink/40">Illustration, cabinets fictifs</p>
    </div>
  );
}
