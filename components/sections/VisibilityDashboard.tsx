"use client";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Reveal } from "../ui/Reveal";
import { SectionTag } from "../ui/SectionTag";

/* Toutes les valeurs de cette section sont fictives : elles montrent le type d'information produit par une analyse. */

const KPIS = [
  { label: "Spécialité", value: "Droit du travail", text: true },
  { label: "Ville", value: "Paris", text: true },
  { label: "Requêtes testées", value: "20" },
  { label: "Présent dans le top 10", value: "6", suffix: "sur 20" },
  { label: "Concurrents observés", value: "5" },
  { label: "Opportunités relevées", value: "3", accent: true },
];

const POSITIONS: { q: string; pos: number | null; pack: boolean }[] = [
  { q: "avocat droit du travail paris", pos: 7, pack: false },
  { q: "avocat licenciement paris", pos: 4, pack: false },
  { q: "avocat licenciement abusif paris", pos: null, pack: false },
  { q: "avocat rupture conventionnelle paris", pos: null, pack: false },
  { q: "avocat prud'hommes paris", pos: 9, pack: false },
  { q: "avocat faute grave paris", pos: 2, pack: true },
  { q: "contester un licenciement délai", pos: null, pack: false },
];

const MIX = [
  { l: "Principales", v: 4 },
  { l: "Forte intention", v: 8 },
  { l: "Informationnelles", v: 5 },
  { l: "Comparatives", v: 3 },
];
const MIX_TOTAL = MIX.reduce((a, b) => a + b.v, 0);

const PACK = [
  { slot: "1", name: "Cabinet A" },
  { slot: "2", name: "Cabinet C" },
  { slot: "3", name: "Cabinet B" },
];

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/[.07] bg-ink/40 p-4 sm:p-5 ${className}`}>
      <h3 className="mb-4 text-[13.5px] font-semibold text-ivory/90">{title}</h3>
      {children}
    </div>
  );
}

function PositionTrack({ pos }: { pos: number | null }) {
  if (pos === null) {
    return <span className="rounded-full border border-dashed border-white/20 px-2.5 py-0.5 text-[11.5px] text-ivory/55">Absent du top 10</span>;
  }
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-1.5 flex-1 rounded-full bg-white/[.08]" aria-hidden="true">
        <motion.span
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne"
          initial={{ left: "100%", opacity: 0 }}
          whileInView={{ left: `${((pos - 1) / 9) * 100}%`, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        />
      </div>
      <span className="w-14 shrink-0 text-right text-[12.5px] text-ivory">Position {pos}</span>
    </div>
  );
}

export function VisibilityDashboard() {
  return (
    <section id="visibilite" aria-labelledby="visibilite-titre" className="relative overflow-hidden bg-night py-24 md:py-36">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div aria-hidden="true" className="absolute left-1/2 top-40 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(40,80,150,.22),transparent_65%)]" />

      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <SectionTag index="02" label="Visibilité" />
            <h2 id="visibilite-titre" className="display-lg mt-6">
              Être présent ne suffit pas.
              <span className="block text-ivory/45">Il faut être visible au moment où la demande apparaît.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-fog lg:justify-self-end">
            Ce tableau montre le type d&apos;information qu&apos;une analyse produit : des positions observées, requête par requête. Les valeurs ci-dessous sont fictives.
          </p>
        </div>

        <Reveal className="mt-14 md:mt-20">
          <div className="overflow-hidden rounded-[26px] border border-white/[.08] bg-navy/40 shadow-console">
            <div className="flex items-center justify-center gap-3 bg-champagne px-4 py-2.5 text-center text-ink">
              <span className="text-[12px] font-bold tracking-[.18em] sm:text-[13px]">DÉMONSTRATION — DONNÉES FICTIVES</span>
            </div>

            <div className="p-3 sm:p-4 md:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 px-1 pb-4">
                <span className="font-serif text-2xl">Tableau de visibilité</span>
                <span className="text-[12px] text-ivory/45">Cabinet fictif, exemple de présentation</span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {KPIS.map((k) => (
                  <div
                    key={k.label}
                    className={`rounded-xl border p-4 ${k.accent ? "border-champagne/30 bg-champagne/[.07]" : "border-white/[.06] bg-ink/40"}`}
                  >
                    <div className="text-[11.5px] text-ivory/55">{k.label}</div>
                    <div className={`mt-2 ${k.text ? "text-[15px] font-semibold" : "font-serif text-[34px] leading-none"} ${k.accent ? "text-champagne-soft" : "text-ivory"}`}>
                      {k.value}
                      {k.suffix && <span className="ml-1.5 font-sans text-[12px] text-ivory/50">{k.suffix}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 grid gap-2 lg:grid-cols-3">
                <Panel title="Position observée par requête" className="lg:col-span-2">
                  <ul className="divide-y divide-white/[.05]">
                    {POSITIONS.map((r) => (
                      <li key={r.q} className="grid gap-2 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
                        <span className="text-[13px] text-ivory/85">{r.q}</span>
                        <PositionTrack pos={r.pos} />
                        <span className={`justify-self-start text-[11.5px] sm:justify-self-end ${r.pack ? "text-champagne-soft" : "text-ivory/40"}`}>
                          {r.pack ? "Dans le pack local" : "Hors pack local"}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[12px] text-ivory/45">
                    Dans une vraie analyse, chaque ligne indique aussi la date, la ville simulée, l&apos;appareil et la capture correspondante.
                  </p>
                </Panel>

                <div className="grid gap-2">
                  <Panel title="Requêtes testées, par type">
                    <ul className="space-y-3.5">
                      {MIX.map((m, i) => (
                        <li key={m.l}>
                          <div className="mb-1.5 flex justify-between text-[12.5px]">
                            <span className="text-ivory/70">{m.l}</span>
                            <span className="text-ivory">{m.v}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/[.05]">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-champagne-deep to-champagne-soft"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(m.v / MIX_TOTAL) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.15 + i * 0.1, duration: 1, ease: EASE }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Panel>

                  <Panel title="Pack local sur « avocat licenciement paris »">
                    <ol className="space-y-2">
                      {PACK.map((p) => (
                        <li key={p.slot} className="flex items-center gap-3 rounded-lg border border-white/[.06] px-3 py-2 text-[13px]">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[.08] text-[11px]">{p.slot}</span>
                          {p.name}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 text-[12px] text-ivory/50">Cabinet de démonstration : absent des trois fiches affichées.</p>
                  </Panel>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
