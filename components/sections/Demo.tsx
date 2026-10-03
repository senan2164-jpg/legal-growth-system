"use client";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { EASE } from "@/lib/motion";
import { useSequence } from "@/lib/useSequence";
import { Reveal } from "../ui/Reveal";

/** Trois constats, chacun relié à l'endroit du site où il a été relevé. */
const FINDINGS = [
  {
    where: "Carte Google",
    fact: "Absent des résultats locaux sur « avocat droit des affaires Dakar ».",
    pin: { top: "18%", left: "88%" },
  },
  {
    where: "Pages du site",
    fact: "Aucune page sur la création de société, pourtant recherchée.",
    pin: { top: "67%", left: "88%" },
  },
  {
    where: "Mobile",
    fact: "Ni téléphone ni WhatsApp visibles en haut de page.",
    pin: { top: "90%", left: "88%" },
  },
];

function Line({ w, strong = false }: { w: string; strong?: boolean }) {
  return <span className={`block h-1.5 rounded-full ${strong ? "bg-ink/70" : "bg-ink/10"}`} style={{ width: w }} />;
}

export function Demo() {
  const { ref, step, setStep } = useSequence(FINDINGS.length + 1, { interval: 1500, hold: 5000 });
  const shown = step; // 0 : rien, puis un constat de plus à chaque étape

  return (
    <section id="exemple" aria-labelledby="exemple-titre" className="bg-paper py-24 text-ink md:py-36">
      <div className="container-x">
        <Reveal className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="exemple-titre" className="display-lg max-w-[14ch]">
            Ce que nous trouvons, <span className="text-ink/45">sur un exemple.</span>
          </h2>
          <span className="rounded-full border border-champagne-deep/40 bg-champagne/15 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[.2em] text-champagne-deep">
            Exemple fictif
          </span>
        </Reveal>

        <div ref={ref} className="mt-16 grid items-center gap-14 md:mt-20 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
          {/* Le site du cabinet fictif, annoté */}
          <div aria-hidden="true" className="relative mx-auto w-full max-w-[340px]">
            <div className="overflow-hidden rounded-[30px] border border-ink/10 bg-white shadow-paper">
              <div className="border-b border-ink/10 px-4 py-3 text-center text-[11px] text-ink/40">cabinet-exemple.com</div>
              <div className="space-y-5 p-5">
                <div className="flex items-center gap-3 rounded-xl bg-ink/[.04] p-3">
                  <MapPin className="h-4 w-4 text-ink/30" />
                  <div className="flex-1 space-y-1.5">
                    <Line w="60%" />
                    <Line w="40%" />
                  </div>
                </div>
                <div>
                  <p className="font-serif text-[24px] leading-tight">Cabinet Exemple</p>
                  <p className="text-[12px] text-ink/50">Droit des affaires · Dakar</p>
                </div>
                <div className="space-y-2">
                  <Line w="100%" />
                  <Line w="92%" />
                  <Line w="70%" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Contentieux", "Recouvrement"].map((t) => (
                    <span key={t} className="rounded-lg border border-ink/10 px-2.5 py-2 text-[11.5px] text-ink/60">
                      {t}
                    </span>
                  ))}
                  <span className="col-span-2 rounded-lg border border-dashed border-ink/20 px-2.5 py-2 text-[11.5px] text-ink/30">
                    Création de société ?
                  </span>
                </div>
                <div className="space-y-2">
                  <Line w="96%" />
                  <Line w="80%" />
                </div>
                <div className="flex items-center justify-center gap-2 rounded-full bg-ink py-3 text-[12px] text-ivory/80">
                  <Phone className="h-3.5 w-3.5" /> +221 00 000 00 00
                </div>
              </div>
            </div>

            {FINDINGS.map((f, i) => (
              <span key={f.where} className="absolute -translate-x-1/2 -translate-y-1/2" style={f.pin}>
                <motion.span
                  initial={false}
                  animate={{ scale: shown > i ? 1 : 0, opacity: shown > i ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full font-serif text-[17px] shadow-paper transition-colors ${
                    shown === i + 1 ? "bg-ink text-ivory" : "bg-champagne text-ink"
                  }`}
                >
                  {i + 1}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Les constats */}
          <ol className="space-y-3">
            {FINDINGS.map((f, i) => {
              const visible = shown > i;
              const active = shown === i + 1;
              return (
                <motion.li
                  key={f.where}
                  initial={false}
                  animate={{ opacity: visible ? 1 : 0.25, x: visible ? 0 : 8 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={() => setStep(i + 1)}
                    className={`flex w-full items-start gap-5 rounded-2xl border p-5 text-left transition-colors md:p-6 ${
                      active ? "border-ink/20 bg-white shadow-paper" : "border-transparent"
                    }`}
                  >
                    <span className="font-serif text-[28px] leading-none text-champagne-deep">{i + 1}</span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-[.2em] text-ink/40">{f.where}</span>
                      <span className="mt-1.5 block font-serif text-[22px] leading-snug md:text-[26px]">{f.fact}</span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
