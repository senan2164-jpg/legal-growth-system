import { Cta } from "../ui/Cta";
import { Reveal } from "../ui/Reveal";
import { ResultsCompare } from "../visuals/ResultsCompare";

export function Problem() {
  return (
    <section id="constat" aria-labelledby="constat-titre" className="bg-paper py-24 text-ink md:py-36">
      <div className="container-x">
        <Reveal>
          <ResultsCompare />
        </Reveal>

        <Reveal className="mx-auto mt-20 max-w-3xl text-center md:mt-28">
          <h2 id="constat-titre" className="display-lg">
            La question est :<span className="block text-ink/45">que voit-il lorsqu&apos;il rencontre votre cabinet ?</span>
          </h2>
          <div className="mt-10">
            <Cta tone="link" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
