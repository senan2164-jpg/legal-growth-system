import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Modules } from "@/components/method/Modules";
import { ThreeCases } from "@/components/method/ThreeCases";
import { Footer } from "@/components/sections/Footer";
import { Cta } from "@/components/ui/Cta";
import { LinkedInLink } from "@/components/ui/LinkedInLink";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Notre méthode",
  description:
    "La méthode d'acquisition Legal Growth System pour les cabinets d'avocats : visibilité, acquisition, un site qui convertit, automatisation et pilotage.",
  alternates: { canonical: "/methode" },
};

export default function MethodePage() {
  return (
    <>
      <Header />
      <main id="contenu">
        {/* L'enjeu */}
        <section className="relative overflow-hidden bg-ink pb-20 pt-32 md:pb-28 md:pt-44">
          <div aria-hidden="true" className="grid-lines absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-[520px] w-[min(1100px,160vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(198,168,108,.14),transparent_65%)]"
          />
          <div className="container-x relative text-center">
            <p className="rise eyebrow">Notre méthode</p>
            <h1 className="display-xl mx-auto mt-8 max-w-[14ch]">
              <span className="rise block [animation-delay:.08s]">Avoir un site ne suffit pas.</span>
              <span className="rise block text-ivory/45 [animation-delay:.16s]">Il doit convertir.</span>
            </h1>
            <p className="rise mx-auto mt-8 max-w-md text-[17px] leading-relaxed text-fog [animation-delay:.28s]">
              Nous construisons tout le chemin, de la recherche jusqu&apos;au rendez-vous.
            </p>
          </div>
        </section>

        {/* Trois cabinets, trois résultats */}
        <section aria-labelledby="cas-titre" className="bg-ink pb-24 md:pb-36">
          <div className="container-x">
            <Reveal className="mb-12 text-center md:mb-16">
              <h2 id="cas-titre" className="display-md">
                Le même prospect. <span className="text-ivory/45">Trois cabinets.</span>
              </h2>
            </Reveal>
            <ThreeCases />
          </div>
        </section>

        {/* Les cinq modules */}
        <section aria-labelledby="modules-titre" className="bg-paper py-24 text-ink md:py-36">
          <div className="container-x">
            <Reveal className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
              <p className="eyebrow !text-champagne-deep">Legal Growth System</p>
              <h2 id="modules-titre" className="display-lg mt-5">
                Cinq modules, <span className="text-ink/45">un seul objectif : vos rendez-vous.</span>
              </h2>
            </Reveal>
            <Modules />
          </div>
        </section>

        {/* Passage à l'action */}
        <section aria-labelledby="methode-cta" className="relative overflow-hidden bg-ink py-28 md:py-40">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-[560px] w-[min(1100px,160vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(198,168,108,.16),transparent_65%)]"
          />
          <Reveal className="container-x relative text-center">
            <h2 id="methode-cta" className="display-lg mx-auto max-w-[18ch]">
              Tout commence par un regard <span className="text-ivory/45">sur votre cabinet.</span>
            </h2>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Cta href="/#analyse" />
              <LinkedInLink />
            </div>
            <p className="mt-6 text-[13px] text-ivory/45">Réponse personnelle par email, sans engagement.</p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
