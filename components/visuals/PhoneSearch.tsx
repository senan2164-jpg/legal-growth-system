"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

const QUERIES = [
  { q: "avocat licenciement lyon", time: "22:14", hints: ["avocat licenciement lyon avis", "avocat licenciement lyon gratuit", "avocat prud'hommes lyon"] },
  { q: "rupture conventionnelle avocat", time: "07:52", hints: ["rupture conventionnelle avocat prix", "rupture conventionnelle négocier", "avocat rupture conventionnelle près de moi"] },
  { q: "bail commercial litige avocat", time: "13:05", hints: ["bail commercial litige loyer", "avocat bail commercial bordeaux", "résiliation bail commercial"] },
];

/** Un téléphone, une recherche qui se tape, des suggestions qui arrivent. */
export function PhoneSearch() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);

  const current = QUERIES[index];
  const done = typed >= current.q.length;

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(current.q.length);
      return;
    }
    const t = window.setTimeout(
      () => {
        if (!done) setTyped((n) => n + 1);
        else {
          setIndex((i) => (i + 1) % QUERIES.length);
          setTyped(0);
        }
      },
      done ? 3200 : 55 + Math.random() * 70,
    );
    return () => window.clearTimeout(t);
  }, [inView, typed, done, current.q.length]);

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto w-full max-w-[300px]">
      <div className="rounded-[44px] border border-white/10 bg-gradient-to-b from-navy to-night p-3 shadow-console">
        <div className="overflow-hidden rounded-[34px] bg-paper text-ink">
          <div className="flex items-center justify-between px-6 pb-2 pt-4 text-[12px] font-semibold">
            <AnimatePresence mode="wait">
              <motion.span key={current.time} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {current.time}
              </motion.span>
            </AnimatePresence>
            <span className="h-5 w-20 rounded-full bg-ink" />
            <span className="flex gap-0.5">
              <span className="h-2.5 w-1 rounded-sm bg-ink/80" />
              <span className="h-2.5 w-1 rounded-sm bg-ink/80" />
              <span className="h-2.5 w-1 rounded-sm bg-ink/30" />
            </span>
          </div>

          <div className="min-h-[360px] px-4 pb-8 pt-6">
            <div className="flex items-center gap-2.5 rounded-full border border-ink/15 bg-white px-4 py-3 text-[14px] shadow-paper">
              <Search className="h-4 w-4 shrink-0 text-ink/45" />
              <span className="truncate">{current.q.slice(0, typed)}</span>
              <span className="caret -ml-1.5 h-4 w-px shrink-0 bg-ink" />
            </div>

            <ul className="mt-3 space-y-1">
              <AnimatePresence>
                {done &&
                  current.hints.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ delay: 0.15 + i * 0.12, duration: 0.45, ease: EASE }}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] text-ink/65"
                    >
                      <Search className="h-3.5 w-3.5 shrink-0 text-ink/30" />
                      <span className="truncate">{h}</span>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
