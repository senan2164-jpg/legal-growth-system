import { Reveal } from "../ui/Reveal";
import { PhoneSearch } from "../visuals/PhoneSearch";

export function Awareness() {
  return (
    <section id="recherche" aria-labelledby="recherche-titre" className="bg-ink py-24 md:py-36">
      <div className="container-x grid items-center gap-16 md:grid-cols-2 md:gap-12">
        <Reveal>
          <h2 id="recherche-titre" className="display-lg max-w-[12ch]">
            Avant de vous contacter, un prospect <span className="text-champagne-soft">vous cherche.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <PhoneSearch />
        </Reveal>
      </div>
    </section>
  );
}
