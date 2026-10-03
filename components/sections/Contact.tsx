import { LinkedInLink } from "../ui/LinkedInLink";
import { Reveal } from "../ui/Reveal";
import { AnalysisRequestForm } from "./AnalysisRequestForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-titre" className="relative overflow-hidden bg-ink pb-24 pt-28 md:pb-36 md:pt-40">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[560px] w-[min(1100px,160vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(198,168,108,.16),transparent_65%)]"
      />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 id="contact-titre" className="display-xl">
            Et si nous commencions <span className="block text-ivory/45">par regarder votre cabinet ?</span>
          </h2>
        </Reveal>

        <div id="analyse" className="mx-auto mt-16 max-w-2xl md:mt-20">
          <AnalysisRequestForm />
          <p className="mt-5 text-center text-[13px] text-ivory/45">Réponse personnelle par email, sans engagement. Dans le respect des règles de votre barreau.</p>
          <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/[.07] pt-8">
            <p className="text-[13px] text-ivory/45">Vous préférez en parler d&apos;abord ?</p>
            <LinkedInLink tone="link" />
          </div>
        </div>
      </div>
    </section>
  );
}
