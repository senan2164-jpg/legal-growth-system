import { SectionTag } from "../ui/SectionTag";

const ITEMS = [
  { w: "Demande", q: "Qui cherche quoi, où, et à quel moment ?", span: "sm:col-span-2 lg:row-span-2" },
  { w: "Visibilité", q: "Apparaissez-vous à ce moment-là ?", span: "" },
  { w: "Concurrence", q: "Qui capte l'attention à votre place ?", span: "" },
  { w: "Conversion", q: "Pourquoi un visiteur ne vous contacte-t-il pas ?", span: "" },
  { w: "Automation", q: "Quelles tâches ralentissent votre réponse ?", span: "" },
  { w: "Data", q: "Que mesurez-vous réellement ?", span: "sm:col-span-2" },
  { w: "IA", q: "Comment les moteurs de réponse décrivent-ils votre cabinet ?", span: "sm:col-span-2" },
];

export function WhatWeLook() {
  return (
    <section id="criteres" aria-labelledby="criteres-titre" className="relative bg-paper py-24 text-ink md:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionTag index="11" label="Ce que nous cherchons" tone="light" />
            <h2 id="criteres-titre" className="display-lg mt-6">Sept questions, posées à chaque cabinet.</h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-graphite lg:justify-self-end">Observer avant de prescrire : ces questions passent avant toute recommandation.</p>
        </div>

        <ul className="mt-14 grid auto-rows-[minmax(170px,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <li key={it.w} className={it.span}>
              <div
                tabIndex={0}
                className="group relative flex h-full min-h-[170px] flex-col justify-between overflow-hidden rounded-[22px] border border-ink/10 bg-white p-6 outline-none transition-colors duration-500 hover:bg-ink focus:bg-ink"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] text-ink/35 transition-colors duration-500 group-hover:text-champagne group-focus:text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative h-8 w-8" aria-hidden="true">
                    <span className="absolute inset-0 rounded-full border border-ink/15 transition-all duration-700 group-hover:scale-150 group-hover:border-champagne/40 group-focus:scale-150 group-focus:border-champagne/40" />
                    <span className="absolute inset-[11px] rounded-full bg-ink/20 transition-colors duration-500 group-hover:bg-champagne group-focus:bg-champagne" />
                  </span>
                </div>
                <div>
                  <p className="mb-3 text-[15px] leading-snug text-graphite transition-all duration-500 group-hover:text-ivory/80 group-focus:text-ivory/80 lg:mb-0 lg:max-h-0 lg:translate-y-3 lg:overflow-hidden lg:opacity-0 lg:group-hover:mb-3 lg:group-hover:max-h-24 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus:mb-3 lg:group-focus:max-h-24 lg:group-focus:translate-y-0 lg:group-focus:opacity-100">
                    {it.q}
                  </p>
                  <h3
                    className={`font-serif font-semibold leading-none transition-colors duration-500 group-hover:text-ivory group-focus:text-ivory ${
                      i === 0 ? "text-[clamp(3rem,6vw,5.5rem)]" : "text-[clamp(2.1rem,3.2vw,2.9rem)]"
                    }`}
                  >
                    {it.w}
                  </h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
