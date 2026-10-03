import { site } from "@/lib/site";
import { Reveal } from "../ui/Reveal";

export function Founder() {
  return (
    <section id="amos" aria-labelledby="amos-titre" className="bg-night py-24 md:py-36">
      <Reveal className="container-x flex flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="flex h-24 w-24 items-center justify-center rounded-full border border-champagne/50 font-serif text-[34px] text-champagne-soft md:h-28 md:w-28 md:text-[40px]"
        >
          HA
        </span>
        <h2 id="amos-titre" className="mt-8 text-[13px] font-semibold tracking-[.32em] text-ivory">
          {site.founder.displayName}
        </h2>
        <p className="mt-3 text-[14.5px] text-fog">{site.founder.role}</p>
        <blockquote className="display-md mt-12 max-w-[22ch] italic text-ivory/90">
          « Je préfère comprendre l&apos;opportunité avant de recommander une action. »
        </blockquote>
      </Reveal>
    </section>
  );
}
