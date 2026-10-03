import { Reveal } from "../ui/Reveal";
import { SectionTag } from "../ui/SectionTag";

const EXEC = ["Modifier les pages du site", "Publier des contenus", "Gérer l'hébergement", "Mettre à jour les informations"];
const GROWTH = [
  "où se trouve la demande,",
  "comment elle vous trouve,",
  "pourquoi elle vous choisit,",
  "et comment mieux exploiter chaque opportunité.",
];

export function Role() {
  return (
    <section id="role" aria-labelledby="role-titre" className="relative bg-ivory py-24 text-ink md:py-36">
      <div className="container-x">
        <SectionTag index="09" label="Nous ne remplaçons pas votre équipe" tone="light" />
        <div className="mt-10 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <h2 id="role-titre" className="display-md">
              Votre développeur peut modifier votre site.
              <br />
              Votre équipe peut publier du contenu.
            </h2>
            <p className="mt-8 font-serif text-[clamp(2rem,3.6vw,3.2rem)] font-semibold leading-none text-champagne-deep">Notre rôle est différent.</p>
          </div>

          <Reveal className="relative grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-ink/10 bg-paper p-6">
              <div className="text-[12px] font-bold tracking-[.2em] text-ink/45">EXÉCUTION</div>
              <ul className="mt-6 space-y-3">
                {EXEC.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-[14px] text-ink/55">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/30" />
                    {e}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[12px] text-ink/45">Un travail indispensable, assuré par votre équipe, votre agence ou votre développeur.</p>
            </div>
            <div className="relative overflow-hidden rounded-[22px] bg-ink p-6 text-ivory">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(198,168,108,.25),transparent_65%)]" />
              <div className="relative text-[12px] font-bold tracking-[.2em] text-champagne">STRATÉGIE + CROISSANCE</div>
              <p className="relative mt-6 text-[13px] text-ivory/50">Nous cherchons à comprendre :</p>
              <ul className="relative mt-3 space-y-2.5">
                {GROWTH.map((g) => (
                  <li key={g} className="font-serif text-[21px] leading-snug">{g}</li>
                ))}
              </ul>
            </div>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-ivory font-serif text-xl text-champagne-deep sm:flex"
            >
              +
            </span>
          </Reveal>
        </div>
        <p className="mt-10 max-w-xl text-[15px] leading-relaxed text-graphite lg:ml-auto lg:text-right">Legal Growth System regarde comment les différentes pièces fonctionnent ensemble, puis indique ce qui mérite d&apos;être fait, et dans quel ordre.</p>
      </div>
    </section>
  );
}
