import Image from "next/image";
import { site } from "@/lib/site";
import { LinkedInLink } from "../ui/LinkedInLink";
import { Reveal } from "../ui/Reveal";

export function Founder() {
  const { photo, displayName, role } = site.founder;

  return (
    <section id="amos" aria-labelledby="amos-titre" className="bg-night py-24 md:py-36">
      <Reveal className="container-x flex flex-col items-center text-center">
        {photo ? (
          <Image
            src={photo}
            alt={`Portrait de ${displayName}`}
            width={224}
            height={224}
            className="h-32 w-32 rounded-full object-cover ring-1 ring-champagne/50 ring-offset-4 ring-offset-night md:h-40 md:w-40"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-24 w-24 items-center justify-center rounded-full border border-champagne/50 font-serif text-[34px] text-champagne-soft md:h-28 md:w-28 md:text-[40px]"
          >
            HA
          </span>
        )}
        <h2 id="amos-titre" className="mt-8 text-[13px] font-semibold tracking-[.32em] text-ivory">
          {displayName}
        </h2>
        <p className="mt-3 text-[14.5px] text-fog">{role}</p>
        <p className="mt-1.5 text-[13px] text-ivory/45">À distance, dans tout l&apos;espace francophone.</p>
        <blockquote className="display-md mt-12 max-w-[22ch] italic text-ivory/90">
          « Je préfère comprendre l&apos;opportunité avant de recommander une action. »
        </blockquote>
        <LinkedInLink className="mt-12" />
      </Reveal>
    </section>
  );
}
