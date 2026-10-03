"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Check, Search } from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { EASE } from "@/lib/motion";
import { useSequence } from "@/lib/useSequence";

/** Les schémas sont dessinés dans un repère fixe ; le texte suit la largeur du cadre sans devenir illisible. */
const box: CSSProperties = { containerType: "inline-size" };
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/* ───────────── 01 Visibility : le cabinet au centre de ses points de contact ───────────── */

const SATELLITES = [
  { label: "Google", x: 50, y: 14 },
  { label: "Google Maps", x: 83.8, y: 32 },
  { label: "SEO", x: 83.8, y: 68 },
  { label: "Contenu", x: 50, y: 86 },
  { label: "Recherche IA", x: 16.2, y: 68 },
  { label: "Réputation", x: 16.2, y: 32 },
];

export function VisibilityViz() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} style={box} className="relative mx-auto aspect-square w-full max-w-[560px]" role="img" aria-label="Google, Google Maps, SEO, contenu, recherche IA et réputation, reliés à votre cabinet">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,168,108,.22),transparent_68%)]" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <ellipse cx="50" cy="50" rx="39" ry="38" fill="none" stroke="rgba(243,238,227,.07)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx="50" cy="50" r="20.5" fill="none" stroke="rgba(243,238,227,.07)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {SATELLITES.map((s, i) => {
          // Du bord du satellite au bord du cabinet
          const dx = s.x - 50;
          const dy = s.y - 50;
          const d = Math.hypot(dx, dy);
          const from = { x: 50 + (dx / d) * (d - 10.5), y: 50 + (dy / d) * (d - 10.5) };
          const to = { x: 50 + (dx / d) * 13.5, y: 50 + (dy / d) * 13.5 };
          const path = `M${from.x},${from.y} L${to.x},${to.y}`;
          return (
            <g key={s.label}>
              <path d={path} stroke="rgba(198,168,108,.55)" strokeWidth="1" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
              <circle r="0.9" fill="#E2CE9E">
                <animateMotion dur="2.6s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={path} />
              </circle>
            </g>
          );
        })}
      </svg>

      {SATELLITES.map((s, i) => (
        <div key={s.label} className="absolute w-[21%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={on ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.09, duration: 0.6, ease: EASE }}
            className="flex aspect-square items-center justify-center rounded-full border border-white/[.12] bg-night px-1 text-center text-[clamp(10px,2.6cqw,15px)] leading-tight text-ivory"
          >
            {s.label}
          </motion.div>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 w-[27%] -translate-x-1/2 -translate-y-1/2">
        <span aria-hidden="true" className="ripple absolute inset-0 rounded-full border border-champagne/60" />
        <div className="relative flex aspect-square items-center justify-center rounded-full border border-champagne bg-ink text-center font-serif text-[clamp(14px,4.6cqw,27px)] leading-[1.05]">
          Votre
          <br />
          cabinet
        </div>
      </div>
    </div>
  );
}

/* ───────────── 02 Acquisition : plusieurs sources, une page, des demandes ───────────── */

const SOURCES = ["SEO", "Google Ads", "Contenu", "Campagnes", "Audiences"];
const AW = 900;
const AH = 720;

export function AcquisitionViz() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.4 });
  const ys = SOURCES.map((_, i) => 145 + i * 107.5);

  return (
    <div ref={ref} style={box} className="relative mx-auto aspect-[900/720] w-full max-w-[640px]" role="img" aria-label="SEO, Google Ads, contenu, campagnes et audiences mènent à des landing pages, puis à des demandes qualifiées">
      <svg viewBox={`0 0 ${AW} ${AH}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {ys.map((y, i) => {
          const d = `M235,${y} C320,${y} 330,360 396,360`;
          return (
            <g key={i}>
              <motion.path
                d={d}
                fill="none"
                stroke="rgba(198,168,108,.5)"
                strokeWidth="1.5"
                strokeDasharray="5 6"
                initial={{ pathLength: 0 }}
                animate={on ? { pathLength: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.9, ease: EASE }}
              />
              <circle r="5" fill="#E2CE9E">
                <animateMotion dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          );
        })}
        <path d="M580,360 L665,360" stroke="#C6A86C" strokeWidth="1.5" strokeDasharray="6 7" />
        <circle cx="580" cy="360" r="6" fill="#F3EEE3" />
        <circle r="4" fill="#F3EEE3">
          <animateMotion dur="1.4s" repeatCount="indefinite" path="M580,360 L665,360" />
        </circle>
      </svg>

      {SOURCES.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, x: -12 }}
          animate={on ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
          className="absolute flex items-center justify-center rounded-full border border-white/[.12] bg-night text-[clamp(10px,2.1cqw,18px)] text-ivory"
          style={{ left: pct(50, AW), top: pct(ys[i] - 26, AH), width: pct(185, AW), height: pct(52, AH) }}
        >
          {s}
        </motion.div>
      ))}

      <div
        className="absolute flex items-center justify-center rounded-[14px] border border-champagne bg-navy text-center font-serif text-[clamp(12px,2.9cqw,26px)] leading-[1.1]"
        style={{ left: pct(396, AW), top: pct(300, AH), width: pct(184, AW), height: pct(120, AH) }}
      >
        Landing
        <br />
        pages
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={on ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1, duration: 0.6, ease: EASE }}
        className="absolute flex flex-col items-center justify-center rounded-full bg-champagne text-center text-ink"
        style={{ left: pct(665, AW), top: pct(314, AH), width: pct(183, AW), height: pct(92, AH) }}
      >
        <span className="text-[clamp(10px,2.1cqw,19px)] font-bold leading-tight">Demandes</span>
        <span className="text-[clamp(9px,1.7cqw,15px)] leading-tight">qualifiées</span>
      </motion.div>
    </div>
  );
}

/* ───────────── 03 Conversion : de la recherche au rendez-vous ───────────── */

const CONVERSION = ["Recherche", "Page", "Contact", "Qualification", "Rendez-vous"];

function ConversionScreen({ step }: { step: number }) {
  const panel = "rounded-2xl border border-white/10 bg-white/[.03] p-5 sm:p-7";
  switch (step) {
    case 0:
      return (
        <div className={`${panel} !py-5`}>
          <div className="flex items-center gap-3 rounded-full border border-white/15 px-4 py-3 text-[14px] text-ivory/85 sm:text-[16px]">
            <Search className="h-4 w-4 text-ivory/45" /> avocat droit des affaires abidjan
          </div>
        </div>
      );
    case 1:
      return (
        <div className={panel}>
          <p className="text-[12px] text-champagne">Droit des affaires</p>
          <p className="mt-1 font-serif text-[24px] leading-tight sm:text-[28px]">Créer votre société : ce qu&apos;il faut prévoir</p>
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-champagne px-4 py-2 text-[13px] font-semibold text-ink">Être rappelé</span>
            <span className="rounded-full border border-white/15 px-4 py-2 text-[13px] text-ivory/80">WhatsApp</span>
          </div>
        </div>
      );
    case 2:
      return (
        <div className={`${panel} space-y-3`}>
          {["Nom", "Téléphone ou WhatsApp", "Votre situation en une phrase"].map((f) => (
            <div key={f} className="rounded-xl border border-white/10 px-4 py-3 text-[14px] text-ivory/40">
              {f}
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <div className={panel}>
          <p className="text-[13px] text-ivory/50">Qualification de la demande</p>
          <div className="mt-4 flex flex-wrap gap-2 text-[13.5px]">
            {["Dirigeant", "Création de société", "Abidjan", "Urgence moyenne"].map((t) => (
              <span key={t} className="rounded-full bg-white/[.07] px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-5 text-[13.5px] text-champagne-soft">Le cabinet sait à quoi s&apos;attendre avant de rappeler.</p>
        </div>
      );
    default:
      return (
        <div className={panel}>
          <div className="grid grid-cols-4 gap-2 text-center text-[13px] sm:gap-3 sm:text-[17px]">
            {["9 h 00", "10 h 30", "14 h 00", "16 h 30"].map((t, k) => (
              <span key={t} className={`rounded-xl py-3 ${k === 1 ? "bg-champagne font-semibold text-ink" : "border border-white/10 text-ivory/60"}`}>
                {t}
              </span>
            ))}
          </div>
          <p className="mt-5 text-center text-[14px] text-ivory/75 sm:text-[17px]">Rendez-vous confirmé, rappel envoyé la veille.</p>
        </div>
      );
  }
}

export function ConversionViz() {
  const { ref, step, setStep } = useSequence(CONVERSION.length, { interval: 2600, hold: 3600 });

  return (
    <div ref={ref} className="mx-auto w-full max-w-[640px]">
      <div className="relative">
        <span aria-hidden="true" className="absolute inset-x-0 top-[18px] h-px bg-white/10 sm:top-[22px]" />
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-[18px] h-px bg-champagne sm:top-[22px]"
          initial={false}
          animate={{ width: `${10 + (step / (CONVERSION.length - 1)) * 80}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        />
        <ol className="relative grid grid-cols-5">
          {CONVERSION.map((s, k) => (
            <li key={s}>
              <button type="button" onClick={() => setStep(k)} aria-pressed={step === k} className="group flex w-full flex-col items-center gap-2.5">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-[14px] transition-colors duration-500 sm:h-11 sm:w-11 sm:text-[16px] ${
                    k <= step ? "border-champagne bg-champagne text-ink" : "border-white/20 bg-ink text-ivory/50 group-hover:border-white/40"
                  }`}
                >
                  {k + 1}
                </span>
                <span className={`text-[11px] transition-colors sm:text-[15px] ${k === step ? "text-ivory" : "text-ivory/45"}`}>{s}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 min-h-[190px] sm:min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <ConversionScreen step={step} />
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-6 text-center text-[13px] text-ivory/35 sm:text-[15px]">Cliquez sur une étape pour l&apos;explorer.</p>
    </div>
  );
}

/* ───────────── 04 Automation : chaque demande suit le même chemin ───────────── */

const WORKFLOW = [
  { t: "Nouveau contact", k: "Déclencheur" },
  { t: "Notification", k: "Action" },
  { t: "Qualification", k: "Condition" },
  { t: "CRM", k: "Action" },
  { t: "Relance", k: "Délai" },
  { t: "Rendez-vous", k: "Résultat" },
];

export function AutomationViz() {
  // Une étape de plus que la liste : tout est validé avant de recommencer.
  const { ref, step } = useSequence(WORKFLOW.length + 1, { interval: 1100, hold: 2200 });

  return (
    <div ref={ref} className="mx-auto w-full max-w-[640px]">
      <ol>
        {WORKFLOW.map((n, i) => {
          const done = i < step;
          const current = i === step;
          const next = i === step + 1;
          return (
            <li key={n.t} className="relative flex items-center gap-3 pb-3 last:pb-0 sm:gap-5 sm:pb-4">
              {i < WORKFLOW.length - 1 && (
                <span aria-hidden="true" className="absolute left-[23px] top-12 h-[calc(100%-36px)] w-px bg-white/10 sm:left-[27px] sm:top-14 sm:h-[calc(100%-40px)]">
                  <span className={`absolute inset-x-0 top-0 bg-champagne transition-all duration-700 ${done ? "h-full" : "h-0"}`} />
                </span>
              )}
              <span
                className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border font-mono text-[13px] transition-all duration-500 sm:h-14 sm:w-14 sm:text-[15px] ${
                  done
                    ? "border-champagne bg-champagne text-ink"
                    : current
                      ? "border-champagne bg-champagne/30 text-ink/60 shadow-glow"
                      : "border-white/15 bg-navy/70 text-ivory/45"
                }`}
              >
                {done || current ? <Check className="h-4 w-4" strokeWidth={2.5} /> : String(i + 1).padStart(2, "0")}
              </span>
              <div
                className={`flex min-w-0 flex-1 items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-colors duration-500 sm:px-6 sm:py-4 ${
                  current ? "border-champagne/50 bg-champagne/[.05]" : next ? "border-champagne/20 bg-white/[.02]" : "border-white/[.08] bg-white/[.02]"
                }`}
              >
                <span className="truncate text-[15px] text-ivory/90 sm:text-[19px]">{n.t}</span>
                <span className="shrink-0 font-mono text-[11px] text-ivory/40 sm:text-[13px]">{n.k}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ───────────── 05 Intelligence : les signaux convergent vers une décision ───────────── */

const SIGNALS = ["Analytics", "Données", "Recherche", "Concurrence", "IA"];
const IW = 878;
const IH = 700;
const HEX = { x: 469, y: 351, r: 72 };

function hexagon(r: number, offset = 0) {
  return Array.from({ length: 6 })
    .map((_, k) => {
      const a = (Math.PI / 3) * k + offset;
      return `${HEX.x + r * Math.cos(a)},${HEX.y + r * Math.sin(a)}`;
    })
    .join(" ");
}

export function IntelligenceViz() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.4 });
  const ys = SIGNALS.map((_, i) => 141 + i * 104.75);

  return (
    <div ref={ref} style={box} className="relative mx-auto aspect-[878/700] w-full max-w-[640px]" role="img" aria-label="Analytics, données, recherche, concurrence et IA convergent vers une synthèse, puis vers des décisions : prioriser, ajuster, investir">
      <svg viewBox={`0 0 ${IW} ${IH}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {ys.map((y, i) => {
          const d = `M222,${y} C330,${y} 330,${HEX.y} ${HEX.x - HEX.r},${HEX.y}`;
          return (
            <g key={i}>
              <motion.path
                d={d}
                fill="none"
                stroke="rgba(243,238,227,.14)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={on ? { pathLength: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.9, ease: EASE }}
              />
              <circle r="5" fill="#E2CE9E">
                <animateMotion dur="2.2s" begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} />
              </circle>
              <circle cx="222" cy={y} r="6" fill="#C6A86C" />
            </g>
          );
        })}
        <polygon points={hexagon(HEX.r)} fill="#102039" stroke="#C6A86C" strokeWidth="1.5" />
        <polygon points={hexagon(45, Math.PI / 6)} fill="none" stroke="rgba(243,238,227,.3)" strokeWidth="1.5">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${HEX.x} ${HEX.y}`} to={`360 ${HEX.x} ${HEX.y}`} dur="18s" repeatCount="indefinite" />
        </polygon>
        <path d={`M${HEX.x + HEX.r + 8},${HEX.y} L634,${HEX.y}`} stroke="#C6A86C" strokeWidth="1.5" strokeDasharray="6 8" />
      </svg>

      {SIGNALS.map((s, i) => (
        <span
          key={s}
          className="absolute -translate-y-1/2 text-right text-[clamp(10px,2.1cqw,18px)] text-ivory/80"
          style={{ right: pct(IW - 200, IW), top: pct(ys[i], IH) }}
        >
          {s}
        </span>
      ))}

      <span
        className="absolute -translate-x-1/2 -translate-y-1/2 text-[clamp(9px,1.9cqw,17px)] text-ivory"
        style={{ left: pct(HEX.x, IW), top: pct(HEX.y, IH) }}
      >
        Synthèse
      </span>

      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={on ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
        className="absolute flex flex-col items-center justify-center rounded-[18px] bg-champagne text-center text-ink"
        style={{ left: pct(634, IW), top: pct(276, IH), width: pct(194, IW), height: pct(149, IH) }}
      >
        <span className="font-serif text-[clamp(13px,3.1cqw,28px)] font-semibold leading-none">Décisions</span>
        <span className="mt-[0.6em] text-[clamp(8.5px,1.75cqw,16px)] leading-snug">
          Prioriser
          <br />
          Ajuster
          <br />
          Investir
        </span>
      </motion.div>
    </div>
  );
}
