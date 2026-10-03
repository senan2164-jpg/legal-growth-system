"use client";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTag } from "../ui/SectionTag";

type Kind = "problem" | "search" | "options" | "compare" | "site" | "contact" | "appointment";

const STEPS: { n: string; title: string; note: string; kind: Kind }[] = [
  { n: "01", title: "Un problème apparaît.", note: "Un courrier, un litige, une décision à prendre.", kind: "problem" },
  { n: "02", title: "La personne recherche.", note: "Sur un moteur, une carte ou un assistant IA.", kind: "search" },
  { n: "03", title: "Elle découvre plusieurs options.", note: "Des cabinets, mais aussi des annuaires et des plateformes.", kind: "options" },
  { n: "04", title: "Elle compare.", note: "Spécialité, avis, proximité, clarté des informations.", kind: "compare" },
  { n: "05", title: "Elle consulte un cabinet.", note: "Elle cherche à savoir si elle est au bon endroit.", kind: "site" },
  { n: "06", title: "Elle prend contact.", note: "Si le téléphone ou le formulaire se trouvent sans effort.", kind: "contact" },
  { n: "07", title: "Un rendez-vous peut être obtenu.", note: "Quand rien n'a interrompu le parcours.", kind: "appointment" },
];

function Line({ w, dark = false }: { w: string; dark?: boolean }) {
  return <div className={`h-1.5 rounded-full ${dark ? "bg-ink/70" : "bg-ink/10"}`} style={{ width: w }} />;
}

function Visual({ kind }: { kind: Kind }) {
  switch (kind) {
    case "problem":
      return (
        <div className="w-full max-w-[260px] -rotate-2 rounded-md border border-ink/10 bg-white p-5 shadow-paper">
          <div className="flex justify-between text-[10px] text-ink/40">
            <span>Lettre recommandée</span>
            <span>A/R</span>
          </div>
          <p className="mt-4 font-serif text-[22px] leading-[1.05] text-ink">Convocation à un entretien préalable</p>
          <div className="mt-4 space-y-2">
            <Line w="100%" />
            <Line w="86%" />
            <Line w="64%" />
          </div>
          <div className="mt-4 h-6 w-20 rounded-sm border border-champagne-deep/40" />
        </div>
      );
    case "search":
      return (
        <div className="w-full max-w-[280px] rounded-2xl border border-ink/10 bg-white p-3 shadow-paper">
          <div className="flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2 text-[12.5px] text-ink">
            <span className="h-3 w-3 rounded-full border-2 border-ink/40" />
            contester un licenciement
            <span className="ml-0.5 h-3.5 w-px animate-pulse bg-ink" />
          </div>
          <ul className="mt-2 space-y-1 px-1 text-[12px] text-ink/55">
            <li className="rounded-md px-2 py-1.5 hover:bg-ink/5">contester un licenciement délai</li>
            <li className="rounded-md px-2 py-1.5">avocat licenciement près de moi</li>
            <li className="rounded-md px-2 py-1.5">licenciement abusif que faire</li>
          </ul>
        </div>
      );
    case "options":
      return (
        <div className="relative h-[170px] w-full max-w-[270px]">
          {["Cabinet A", "Cabinet B", "Cabinet C"].map((c, i) => (
            <div
              key={c}
              className="absolute w-[78%] rounded-xl border border-ink/10 bg-white p-3.5 shadow-paper"
              style={{ left: `${i * 11}%`, top: `${i * 26}px`, zIndex: 3 - i }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-semibold text-ink">{c}</span>
                <span className="h-2 w-2 rounded-full bg-ink/15" />
              </div>
              <div className="mt-2.5 space-y-1.5">
                <Line w="90%" />
                <Line w="60%" />
              </div>
            </div>
          ))}
        </div>
      );
    case "site":
      return (
        <div className="w-full max-w-[280px] overflow-hidden rounded-xl border border-ink/10 bg-white shadow-paper">
          <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
            <span className="h-4 flex-1 rounded-full bg-ink/5 px-2 text-[9.5px] leading-4 text-ink/40">cabinet-b.fr</span>
          </div>
          <div className="p-4">
            <Line w="70%" dark />
            <div className="mt-2 space-y-1.5">
              <Line w="95%" />
              <Line w="80%" />
            </div>
            <ul className="mt-4 space-y-1.5 text-[11.5px]">
              {[
                ["Spécialité claire", true],
                ["Contact simple", true],
                ["Contenus utiles", false],
              ].map(([l, ok]) => (
                <li key={String(l)} className="flex items-center gap-2 text-ink/70">
                  <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] ${ok ? "bg-ink text-ivory" : "border border-ink/30 text-ink/40"}`}>
                    {ok ? "✓" : "?"}
                  </span>
                  {String(l)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "compare":
      return (
        <div className="w-full max-w-[270px] space-y-2">
          {[5, 4, 5].map((s, i) => (
            <div key={i} className="rounded-xl border border-ink/10 bg-white px-3.5 py-3 shadow-paper" style={{ marginLeft: `${i * 14}px` }}>
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, k) => (
                  <svg key={k} width="11" height="11" viewBox="0 0 24 24" className={k < s ? "fill-champagne-deep" : "fill-ink/15"}>
                    <path d="M12 2l2.9 6.9L22 9.6l-5.5 4.8L18.2 22 12 18.1 5.8 22l1.7-7.6L2 9.6l7.1-.7z" />
                  </svg>
                ))}
              </div>
              <div className="mt-2 space-y-1.5">
                <Line w="92%" />
                <Line w="58%" />
              </div>
            </div>
          ))}
        </div>
      );
    case "contact":
      return (
        <div className="w-full max-w-[260px] rounded-xl border border-ink/10 bg-white p-4 shadow-paper">
          <div className="flex items-center justify-between rounded-lg bg-ink px-3.5 py-2.5 text-[12.5px] text-ivory">
            <span>Appeler le cabinet</span>
            <span className="text-champagne">01 •• •• •• ••</span>
          </div>
          <div className="my-3 flex items-center gap-2 text-[10px] text-ink/40">
            <span className="h-px flex-1 bg-ink/10" />
            ou
            <span className="h-px flex-1 bg-ink/10" />
          </div>
          <div className="space-y-1.5">
            {["Nom", "Téléphone", "Votre situation"].map((f) => (
              <div key={f} className="rounded-md border border-ink/10 px-2.5 py-1.5 text-[11px] text-ink/40">
                {f}
              </div>
            ))}
          </div>
        </div>
      );
    case "appointment":
      return (
        <div className="w-full max-w-[280px] rounded-xl border border-ink/10 bg-white p-4 shadow-paper">
          <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] text-ink/40">
            {["Lun", "Mar", "Mer", "Jeu", "Ven"].map((d) => (
              <span key={d}>{d}</span>
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <span
                key={i}
                className={`h-6 rounded-md ${i === 6 ? "bg-ink" : i % 4 === 0 ? "bg-ink/[.04]" : "border border-ink/10"}`}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-champagne/15 px-3 py-2 text-[12px] text-ink">
            <span>Mardi, 10 h 30</span>
            <span className="font-semibold text-champagne-deep">Confirmé</span>
          </div>
        </div>
      );
  }
}

export function ClientJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distRef = useRef(0);
  const [desktop, setDesktop] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const measure = () => {
      setDesktop(mq.matches);
      if (trackRef.current) distRef.current = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distRef.current);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (desktop) setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  return (
    <section id="parcours" aria-labelledby="parcours-titre" className="relative bg-ivory text-ink">
      <div ref={wrapRef} className="relative md:h-[420vh]">
        <div className="flex flex-col justify-center gap-10 py-24 md:sticky md:top-0 md:h-screen md:overflow-hidden md:py-0 md:pt-16">
          <div className="container-x flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionTag index="01" label="Le nouveau parcours client" tone="light" />
              <h2 id="parcours-titre" className="display-lg mt-6 max-w-[15ch]">
                Avant de devenir votre client, <span className="text-ink/40">une personne vous cherche.</span>
              </h2>
            </div>
            <div className="hidden items-center gap-1.5 md:flex" aria-hidden="true">
              {STEPS.map((s, i) => (
                <span key={s.n} className="relative h-[3px] w-8 overflow-hidden rounded-full bg-ink/10">
                  <span
                    className={`absolute inset-0 origin-left bg-champagne-deep transition-transform duration-500 ${
                      i <= active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span>
              ))}
              <span className="ml-3 font-mono text-[11px] text-ink/50">
                {STEPS[active].n}/07
              </span>
            </div>
          </div>

          <motion.div
            ref={trackRef}
            style={{ x: desktop ? x : 0 }}
            className="track-pad no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto md:w-max md:snap-none md:gap-5 md:overflow-visible"
          >
            {STEPS.map((s, i) => (
              <article
                key={s.n}
                className={`flex w-[82vw] shrink-0 snap-start flex-col rounded-[22px] border bg-paper p-6 transition-colors duration-500 sm:w-[58vw] md:w-[44vw] md:p-8 lg:w-[31vw] xl:w-[27vw] ${
                  desktop && i === active ? "border-champagne-deep/40" : "border-ink/10"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="numeral-outline font-serif text-[72px] leading-none text-ink/40 md:text-[88px]">{s.n}</span>
                  {i < STEPS.length - 1 && <span aria-hidden="true" className="mt-6 h-px w-14 bg-ink/15" />}
                </div>
                <h3 className="mt-4 font-serif text-[26px] font-semibold leading-tight md:text-[30px]">{s.title}</h3>
                <p className="mt-2 text-[14px] text-graphite">{s.note}</p>
                <div className="relative mt-6 flex h-[210px] items-center justify-center rounded-2xl bg-bone/60 px-4 md:mt-auto md:h-[230px]">
                  <span className="absolute left-3 top-2.5 text-[10px] text-ink/40">Illustration</span>
                  <Visual kind={s.kind} />
                </div>
              </article>
            ))}
          </motion.div>
          <p className="container-x -mt-4 text-[12px] text-ink/40 md:hidden">Faites glisser pour suivre le parcours.</p>
        </div>
      </div>
    </section>
  );
}
