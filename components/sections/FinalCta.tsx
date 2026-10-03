import { site } from "@/lib/site";
import { MagneticLink } from "../ui/MagneticLink";
import { AnalysisRequestForm } from "./AnalysisRequestForm";

const NEXT_STEPS = [
  "Je reçois votre demande.",
  "J'examine les informations publiques autour de votre cabinet : recherches, fiche Google, site, concurrents visibles.",
  "Si une analyse est pertinente, je reviens vers vous avec les premiers éléments observés.",
];

export function FinalCta() {
  return (
    <section id="contact" aria-labelledby="contact-titre" className="relative overflow-hidden bg-ink pb-24 pt-28 md:pb-36 md:pt-40">
      <div aria-hidden="true" className="grid-lines absolute inset-0" />
      <div
        aria-hidden="true"
        className="animate-breathe absolute left-1/2 top-24 h-[620px] w-[min(1100px,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(198,168,108,.18),rgba(28,58,112,.16)_45%,transparent_70%)]"
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-serif text-xl italic text-champagne">§ 13</p>
          <h2 id="contact-titre" className="display-xl mt-6">
            Et si nous commencions
            <span className="block text-ivory/45">par regarder votre cabinet ?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-fog">
            Votre présence digitale, votre environnement concurrentiel et les opportunités visibles autour de vos spécialités.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticLink href="#analyse">Demander mon analyse</MagneticLink>
            {site.email && (
              <MagneticLink href={`mailto:${site.email}`} variant="ghostDark" icon={false}>
                Écrire directement
              </MagneticLink>
            )}
          </div>
        </div>

        <div id="analyse" className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:pt-6">
            <h3 className="display-md">Demander mon analyse</h3>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-fog">
              Quelques informations suffisent pour regarder votre marché avant tout échange.
            </p>
            <h4 className="mt-10 text-[13px] text-ivory/50">Ce qui se passe ensuite</h4>
            <ol className="mt-4 space-y-5">
              {NEXT_STEPS.map((l, i) => (
                <li key={l} className="flex items-baseline gap-4 border-t border-white/10 pt-5">
                  <span className="font-serif text-lg italic text-champagne">{i + 1}.</span>
                  <span className="text-[15px] leading-relaxed text-ivory/80">{l}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[13px] leading-relaxed text-ivory/45">
              Aucun engagement. Aucun résultat commercial n&apos;est promis : l&apos;analyse sert à observer avant de recommander.
            </p>
          </div>
          <AnalysisRequestForm />
        </div>
      </div>
    </section>
  );
}
