import { site } from "@/lib/site";
import { SectionTag } from "../ui/SectionTag";

const PRINCIPLES = [
  "Chaque analyse est réalisée personnellement.",
  "Chaque constat est daté et accompagné de sa source.",
  "Une proposition n'est faite que si un besoin réel apparaît.",
];

export function FounderSection() {
  return (
    <section id="fondateur" aria-labelledby="fondateur-titre" className="relative bg-night py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
        <div className="flex items-start gap-6 lg:flex-col">
          <div
            aria-hidden="true"
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-champagne/50 font-serif text-[34px] text-champagne-soft md:h-32 md:w-32 md:text-[44px]"
          >
            HA
          </div>
          <div>
            <SectionTag index="12" label="Qui réalise l'analyse" />
          </div>
        </div>

        <div className="max-w-3xl">
          <h2 id="fondateur-titre" className="display-md">
            Legal Growth System est conçu par {site.founder.displayName}.
          </h2>
          <p className="mt-3 text-[15px] text-champagne-soft">{site.founder.role}</p>

          <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-ivory/75">
            <p>
              Mon travail consiste à comprendre comment une demande qui existe déjà arrive, ou n&apos;arrive pas, jusqu&apos;à votre
              cabinet : où elle s&apos;exprime, qui apparaît à votre place, ce que trouve la personne, et ce qui l&apos;empêche de vous
              contacter.
            </p>
            <p>
              Je ne cherche pas un problème pour vendre une prestation. Je cherche à savoir s&apos;il existe un problème que je peux
              réellement résoudre.
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p} className="bg-night p-5 text-[14px] leading-relaxed text-ivory/80">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
