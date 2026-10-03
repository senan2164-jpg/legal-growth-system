import { Cta } from "../ui/Cta";
import { JourneyRail } from "../visuals/JourneyRail";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink pb-20 pt-32 md:pb-24 md:pt-36">
      <div aria-hidden="true" className="grid-lines absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[520px] w-[min(1100px,160vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(198,168,108,.14),transparent_65%)]"
      />

      <div className="container-x relative text-center">
        <p className="rise mb-8 text-[13px] text-ivory/50">Pour les cabinets d&apos;avocats de l&apos;espace francophone</p>
        <h1 className="display-xl mx-auto max-w-[15ch] text-ivory md:max-w-none md:!text-[clamp(3.5rem,5.6vw,5.6rem)]">
          <span className="rise block">
            Le prochain dossier <br className="hidden md:block" />
            commence souvent
          </span>
          <span className="rise block text-ivory/45 [animation-delay:.12s]">bien avant le premier appel.</span>
        </h1>

        <div className="rise mt-10 [animation-delay:.25s]">
          <p className="eyebrow">Legal Growth System</p>
          <p className="mx-auto mt-3 max-w-md text-[17px] leading-relaxed text-fog">
            Développer la visibilité et l&apos;acquisition des cabinets d&apos;avocats.
          </p>
        </div>

        <div className="rise mt-9 [animation-delay:.35s]">
          <Cta />
        </div>

        <div className="rise mt-20 md:mt-16 [animation-delay:.5s]">
          <JourneyRail />
        </div>
      </div>
    </section>
  );
}
