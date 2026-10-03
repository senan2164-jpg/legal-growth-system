"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ModuleId } from "@/lib/content";
import { EASE } from "@/lib/motion";

/** Version HTML des schémas, pour les petits écrans où le texte SVG deviendrait illisible. */
function MobileFlow({ inputs, hub, output, outputItems }: { inputs: string[]; hub: string; output?: string; outputItems?: string[] }) {
  return (
    <div className="flex flex-col items-center gap-3 px-2 py-6">
      <ul className="flex flex-wrap justify-center gap-2">
        {inputs.map((i) => (
          <li key={i} className="rounded-full border border-white/15 bg-night px-3.5 py-1.5 text-[13px] text-ivory/85">
            {i}
          </li>
        ))}
      </ul>
      <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-champagne/30">
        <span className="absolute inset-x-0 top-0 h-3 animate-[flowdown_1.6s_linear_infinite] bg-champagne" />
      </span>
      <div className="rounded-2xl border border-champagne bg-navy px-6 py-3 text-center font-serif text-[22px] leading-tight">{hub}</div>
      {output && (
        <>
          <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-champagne/30">
            <span className="absolute inset-x-0 top-0 h-3 animate-[flowdown_1.6s_linear_infinite] bg-champagne" />
          </span>
          <div className="rounded-2xl bg-champagne px-6 py-3 text-center text-ink">
            <div className="font-serif text-[22px] font-semibold leading-tight">{output}</div>
            {outputItems && <div className="mt-1 text-[12.5px]">{outputItems.join(" · ")}</div>}
          </div>
        </>
      )}
    </div>
  );
}

const label = { fill: "#F3EEE3", fontSize: 12, fontFamily: "var(--font-sans)", textAnchor: "middle" as const };

/* ---------------- 01 Visibility : réseau ---------------- */
function VisibilityViz() {
  const SAT = ["Google", "Google Maps", "SEO", "Contenu", "Recherche IA", "Réputation"];
  const c = { x: 280, y: 200 };
  const R = 150;
  const pts = SAT.map((s, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { s, x: c.x + R * Math.cos(a), y: c.y + R * 0.92 * Math.sin(a) };
  });
  return (
    <>
      <div className="sm:hidden"><MobileFlow inputs={SAT} hub="Votre cabinet" /></div>
      <svg viewBox="0 0 560 400" className="hidden h-full w-full sm:block" role="img" aria-label="Réseau de visibilité : Google, Google Maps, SEO, contenu, recherche IA et réputation reliés au cabinet">
      <defs>
        <radialGradient id="mv-core">
          <stop offset="0%" stopColor="#C6A86C" stopOpacity=".35" />
          <stop offset="100%" stopColor="#C6A86C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={c.x} cy={c.y} r="120" fill="url(#mv-core)" />
      <ellipse cx={c.x} cy={c.y} rx={R} ry={R * 0.92} fill="none" stroke="rgba(243,238,227,.07)" />
      {pts.map((p, i) => (
        <g key={p.s}>
          <line x1={c.x} y1={c.y} x2={p.x} y2={p.y} stroke="rgba(198,168,108,.5)" className="flow" />
          <circle r="2.5" fill="#E2CE9E">
            <animateMotion dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" path={`M${p.x},${p.y} L${c.x},${c.y}`} />
          </circle>
        </g>
      ))}
      {pts.map((p, i) => (
        <motion.g key={`n-${p.s}`} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.08, ease: EASE }} style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
          <circle cx={p.x} cy={p.y} r="40" fill="#0A1424" stroke="rgba(243,238,227,.14)" />
          <text x={p.x} y={p.y + 4} {...label} fontSize={11}>{p.s}</text>
        </motion.g>
      ))}
      <circle cx={c.x} cy={c.y} r="52" fill="#07090D" stroke="#C6A86C" />
      <circle cx={c.x} cy={c.y} r="52" fill="none" stroke="#C6A86C">
        <animate attributeName="r" values="52;84" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".5;0" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x={c.x} y={c.y - 2} {...label} fontFamily="var(--font-serif)" fontSize={19}>Votre</text>
      <text x={c.x} y={c.y + 18} {...label} fontFamily="var(--font-serif)" fontSize={19}>cabinet</text>
    </svg>
    </>
  );
}

/* ---------------- 02 Acquisition : flux ---------------- */
function AcquisitionViz() {
  const SRC = ["SEO", "Google Ads", "Contenu", "Campagnes", "Audiences"];
  const hub = { x: 300, y: 200 };
  return (
    <>
      <div className="sm:hidden"><MobileFlow inputs={SRC} hub="Landing pages" output="Demandes qualifiées" /></div>
      <svg viewBox="0 0 560 400" className="hidden h-full w-full sm:block" role="img" aria-label="Flux d'acquisition : SEO, Google Ads, contenu, campagnes et audiences mènent aux landing pages puis aux demandes">
      {SRC.map((s, i) => {
        const y = 60 + i * 70;
        const d = `M140,${y} C210,${y} 200,${hub.y} 245,${hub.y}`;
        return (
          <g key={s}>
            <path d={d} fill="none" stroke="rgba(243,238,227,.12)" />
            <path d={d} fill="none" stroke="rgba(198,168,108,.55)" className="flow" />
            <circle r="3" fill="#E2CE9E">
              <animateMotion dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
            </circle>
            <motion.g initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, ease: EASE }}>
              <rect x="20" y={y - 17} width="120" height="34" rx="17" fill="#0A1424" stroke="rgba(243,238,227,.14)" />
              <text x="80" y={y + 4} {...label}>{s}</text>
            </motion.g>
          </g>
        );
      })}
      <rect x="245" y="160" width="120" height="80" rx="14" fill="#102039" stroke="#C6A86C" />
      <text x="305" y="196" {...label} fontFamily="var(--font-serif)" fontSize={18}>Landing</text>
      <text x="305" y="216" {...label} fontFamily="var(--font-serif)" fontSize={18}>pages</text>
      <path d="M365,200 L420,200" stroke="#C6A86C" className="flow" />
      <circle r="3.5" fill="#F3EEE3">
        <animateMotion dur="1.4s" repeatCount="indefinite" path="M365,200 L420,200" />
      </circle>
      <rect x="420" y="170" width="120" height="60" rx="30" fill="#C6A86C" />
      <text x="480" y="197" {...label} fill="#07090D" fontWeight={700}>Demandes</text>
      <text x="480" y="213" {...label} fill="#07090D" fontSize={10.5}>qualifiées</text>
    </svg>
    </>
  );
}

/* ---------------- 03 Conversion : interactif ---------------- */
const CONV = ["Recherche", "Page", "Compréhension", "Contact", "Qualification", "Rendez-vous"];
function ConversionScreen({ i }: { i: number }) {
  const box = "rounded-xl border border-white/10 bg-white/[.03]";
  switch (i) {
    case 0:
      return (
        <div className={`${box} flex items-center gap-3 px-4 py-3 text-[14px] text-ivory/80`}>
          <span className="h-3 w-3 rounded-full border-2 border-ivory/40" /> avocat rupture conventionnelle
        </div>
      );
    case 1:
      return (
        <div className={`${box} p-5`}>
          <div className="text-[11px] text-champagne">Droit du travail</div>
          <div className="mt-1 font-serif text-2xl">Rupture conventionnelle : vos options</div>
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
          </div>
          <div className="mt-4 inline-flex rounded-full bg-champagne px-4 py-1.5 text-[12px] font-semibold text-ink">Être rappelé</div>
        </div>
      );
    case 2:
      return (
        <div className={`${box} p-5`}>
          <div className="text-[12px] text-ivory/50">Ce que la page doit faire comprendre en quelques secondes</div>
          <ul className="mt-3 space-y-2 text-[13.5px]">
            {["La spécialité et le type de dossiers", "Le lieu et la zone d'intervention", "Comment se passe le premier rendez-vous", "Comment joindre le cabinet"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      );
    case 3:
      return (
        <div className={`${box} space-y-2.5 p-5`}>
          {["Nom", "Téléphone", "Votre situation en une phrase"].map((f) => (
            <div key={f} className="rounded-lg border border-white/10 px-3 py-2 text-[12.5px] text-ivory/40">{f}</div>
          ))}
        </div>
      );
    case 4:
      return (
        <div className={`${box} p-5`}>
          <div className="text-[12px] text-ivory/50">Qualification de la demande</div>
          <div className="mt-3 flex flex-wrap gap-2 text-[12.5px]">
            {["Salarié", "Rupture en cours", "Paris", "Urgence moyenne"].map((t) => (
              <span key={t} className="rounded-full bg-white/[.07] px-3 py-1">{t}</span>
            ))}
          </div>
          <div className="mt-4 text-[12px] text-champagne-soft">Le cabinet sait à quoi s&apos;attendre avant de rappeler</div>
        </div>
      );
    default:
      return (
        <div className={`${box} p-5`}>
          <div className="grid grid-cols-4 gap-2 text-center text-[12px]">
            {["9 h 00", "10 h 30", "14 h 00", "16 h 30"].map((s, k) => (
              <span key={s} className={`rounded-lg py-2 ${k === 1 ? "bg-champagne font-semibold text-ink" : "border border-white/10 text-ivory/60"}`}>{s}</span>
            ))}
          </div>
          <div className="mt-4 text-[13px] text-ivory/70">Créneau choisi, confirmation envoyée.</div>
        </div>
      );
  }
}
function ConversionViz() {
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (touched) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % CONV.length), 2600);
    return () => window.clearInterval(id);
  }, [touched]);
  return (
    <div className="flex h-full flex-col justify-center gap-8 px-2 py-6 sm:p-6">
      <div className="relative">
        <div className="absolute left-0 right-0 top-[15px] h-px bg-white/10" />
        <motion.div className="absolute left-0 top-[15px] h-px bg-champagne" animate={{ width: `${(i / (CONV.length - 1)) * 100}%` }} transition={{ duration: 0.6, ease: EASE }} />
        <div className="relative flex justify-between">
          {CONV.map((s, k) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setTouched(true);
                setI(k);
              }}
              aria-pressed={i === k}
              className="group flex flex-col items-center gap-2"
            >
              <span className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border text-[11px] transition-colors ${k <= i ? "border-champagne bg-champagne text-ink" : "border-white/20 bg-night text-ivory/50 group-hover:border-white/40"}`}>
                {k + 1}
              </span>
              <span className={`hidden text-[12px] sm:block ${k === i ? "text-ivory" : "text-ivory/45"}`}>{s}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="-mt-4 text-center text-[13px] font-semibold text-ivory sm:hidden">{CONV[i]}</p>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: EASE }} className="mx-auto w-full max-w-md">
          <ConversionScreen i={i} />
        </motion.div>
      </AnimatePresence>
      <p className="text-center text-[11.5px] text-ivory/35">Cliquez sur une étape pour l&apos;explorer.</p>
    </div>
  );
}

/* ---------------- 04 Automation : workflow ---------------- */
const FLOW = [
  { t: "Nouveau contact", k: "Déclencheur" },
  { t: "Notification", k: "Action" },
  { t: "Qualification", k: "Condition" },
  { t: "Organisation", k: "Action" },
  { t: "Suivi", k: "Action" },
  { t: "Relance", k: "Délai" },
  { t: "Rendez-vous", k: "Résultat" },
];
function AutomationViz() {
  const [a, setA] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setA((v) => (v + 1) % (FLOW.length + 2)), 1100);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="flex h-full items-center justify-center px-2 py-6 sm:p-6">
      <ol className="relative w-full max-w-sm">
        {FLOW.map((n, i) => {
          const done = i < a;
          const current = i === a;
          return (
            <li key={n.t} className="relative flex items-center gap-4 pb-3 last:pb-0">
              {i < FLOW.length - 1 && (
                <span className="absolute left-[19px] top-10 h-[calc(100%-28px)] w-px bg-white/10">
                  <span className={`absolute inset-x-0 top-0 bg-champagne transition-all duration-700 ${done ? "h-full" : "h-0"}`} />
                </span>
              )}
              <span
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-mono text-[11px] transition-all duration-500 ${
                  done ? "border-champagne bg-champagne text-ink" : current ? "border-champagne text-champagne shadow-glow" : "border-white/15 bg-night text-ivory/40"
                }`}
              >
                {done ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
              <div className={`flex flex-1 items-center justify-between rounded-xl border px-4 py-2.5 transition-colors duration-500 ${current ? "border-champagne/40 bg-champagne/[.06]" : "border-white/[.07] bg-white/[.02]"}`}>
                <span className="text-[13.5px] text-ivory/90">{n.t}</span>
                <span className="font-mono text-[10px] text-ivory/40">{n.k}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------------- 05 Intelligence : convergence ---------------- */
function IntelligenceViz() {
  const IN = ["Analytics", "Données", "Recherche", "Concurrence", "IA"];
  const c = { x: 300, y: 200 };
  return (
    <>
      <div className="sm:hidden"><MobileFlow inputs={IN} hub="Synthèse" output="Décisions" outputItems={["Prioriser", "Ajuster", "Investir"]} /></div>
      <svg viewBox="0 0 560 400" className="hidden h-full w-full sm:block" role="img" aria-label="Analytics, données, recherche, concurrence et IA convergent vers des décisions">
      {IN.map((s, i) => {
        const y = 60 + i * 70;
        const d = `M135,${y} C220,${y} 220,${c.y} ${c.x - 48},${c.y}`;
        return (
          <g key={s}>
            <path d={d} fill="none" stroke="rgba(243,238,227,.1)" />
            <circle r="2.8" fill="#E2CE9E">
              <animateMotion dur="2.2s" begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} />
            </circle>
            <text x="125" y={y + 4} {...label} textAnchor="end" fill="rgba(243,238,227,.75)">{s}</text>
            <circle cx="135" cy={y} r="3" fill="#C6A86C" />
          </g>
        );
      })}
      <polygon points={Array.from({ length: 6 }).map((_, k) => { const a = (Math.PI / 3) * k; return `${c.x + 48 * Math.cos(a)},${c.y + 48 * Math.sin(a)}`; }).join(" ")} fill="#102039" stroke="#C6A86C" />
      <polygon points={Array.from({ length: 6 }).map((_, k) => { const a = (Math.PI / 3) * k + Math.PI / 6; return `${c.x + 30 * Math.cos(a)},${c.y + 30 * Math.sin(a)}`; }).join(" ")} fill="none" stroke="rgba(198,168,108,.4)">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${c.x} ${c.y}`} to={`360 ${c.x} ${c.y}`} dur="18s" repeatCount="indefinite" />
      </polygon>
      <text x={c.x} y={c.y + 5} {...label} fontSize={11}>Synthèse</text>
      <path d={`M${c.x + 48},${c.y} L410,${c.y}`} stroke="#C6A86C" className="flow" />
      <rect x="410" y="150" width="130" height="100" rx="16" fill="#C6A86C" />
      <text x="475" y="180" {...label} fill="#07090D" fontFamily="var(--font-serif)" fontSize={20} fontWeight={600}>Décisions</text>
      {["Prioriser", "Ajuster", "Investir"].map((t, k) => (
        <text key={t} x="475" y={204 + k * 15} {...label} fill="#07090D" fontSize={11}>{t}</text>
      ))}
    </svg>
    </>
  );
}

export function ModuleViz({ id }: { id: ModuleId }) {
  switch (id) {
    case "visibility":
      return <VisibilityViz />;
    case "acquisition":
      return <AcquisitionViz />;
    case "conversion":
      return <ConversionViz />;
    case "automation":
      return <AutomationViz />;
    case "intelligence":
      return <IntelligenceViz />;
  }
}
