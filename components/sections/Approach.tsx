"use client";
import { useSequence } from "@/lib/useSequence";
import { Cta } from "../ui/Cta";
import { Reveal } from "../ui/Reveal";

const STAGES = [
  { name: "Visibilité", q: "Vous trouve-t-il ?" },
  { name: "Comparaison", q: "Vous préfère-t-il ?" },
  { name: "Contact", q: "Vous appelle-t-il ?" },
];

export function Approach() {
  const { ref, step } = useSequence(STAGES.length, { interval: 1500, hold: 3000 });

  return (
    <section id="approche" aria-labelledby="approche-titre" className="bg-ink py-24 md:py-36">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="approche-titre" className="display-lg">
            Nous regardons votre cabinet <span className="text-champagne-soft">comme le ferait un prospect.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="mx-auto mt-20 max-w-4xl md:mt-24">
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-6">
            {STAGES.map((s, i) => {
              const on = i <= step;
              return (
                <li key={s.name} className="relative flex items-start gap-6 md:flex-col md:items-center md:gap-0 md:text-center">
                  {i < STAGES.length - 1 && (
                    <>
                      {/* Fil vers l'étape suivante : vertical sur mobile, horizontal ensuite */}
                      <span aria-hidden="true" className="absolute left-[19px] top-10 h-[calc(100%+8px)] w-px bg-ivory/10 md:hidden">
                        <span className={`absolute inset-0 origin-top bg-champagne transition-transform duration-700 ${i < step ? "scale-y-100" : "scale-y-0"}`} />
                      </span>
                      <span aria-hidden="true" className="absolute left-[calc(50%+20px)] top-[19px] hidden h-px w-[calc(100%-16px)] bg-ivory/10 md:block">
                        <span className={`absolute inset-0 origin-left bg-champagne transition-transform duration-700 ${i < step ? "scale-x-100" : "scale-x-0"}`} />
                      </span>
                    </>
                  )}
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-serif text-lg transition-colors duration-500 ${
                      on ? "border-champagne bg-champagne text-ink" : "border-ivory/20 bg-ink text-ivory/40"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="pt-1.5 md:mt-7 md:pt-0">
                    <p className={`eyebrow transition-colors duration-500 ${on ? "" : "!text-ivory/35"}`}>{s.name}</p>
                    <p className={`mt-2 font-serif text-[28px] leading-tight transition-colors duration-500 md:text-[32px] ${on ? "text-ivory" : "text-ivory/30"}`}>
                      {s.q}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-20 text-center md:mt-24">
          <Cta />
        </div>
      </div>
    </section>
  );
}
