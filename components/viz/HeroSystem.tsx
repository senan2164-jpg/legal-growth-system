"use client";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const W = 520;
const H = 580;
const NODES = [
  { n: "01", label: "Problème juridique", sub: "Un courrier, un litige", x: 170, y: 70 },
  { n: "02", label: "Recherche", sub: "Moteur, assistant IA", x: 350, y: 160 },
  { n: "03", label: "Comparaison", sub: "Sites, avis, contenus", x: 170, y: 250 },
  { n: "04", label: "Cabinet", sub: "Spécialité, proximité", x: 350, y: 340 },
  { n: "05", label: "Contact", sub: "Formulaire, appel", x: 170, y: 430 },
  { n: "06", label: "Rendez-vous", sub: "Créneau confirmé", x: 350, y: 515 },
];

const PATH = NODES.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const a = NODES[i - 1];
  const my = (a.y + p.y) / 2;
  return `${d} C ${a.x} ${my}, ${p.x} ${my}, ${p.x} ${p.y}`;
}, "");

export function HeroSystem() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Console principale */}
      <div className="relative overflow-hidden rounded-[22px] border border-white/[.08] bg-night/70 shadow-console backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-white/[.06] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-champagne" />
            <span className="text-[12px] text-ivory/70">Du problème au rendez-vous</span>
          </div>
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10.5px] text-ivory/55">Illustration</span>
        </div>

        <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="hs-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="rgba(243,238,227,.06)" />
              </pattern>
              <linearGradient id="hs-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E2CE9E" stopOpacity=".2" />
                <stop offset="100%" stopColor="#C6A86C" />
              </linearGradient>
              <radialGradient id="hs-halo">
                <stop offset="0%" stopColor="#E2CE9E" stopOpacity=".55" />
                <stop offset="100%" stopColor="#E2CE9E" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width={W} height={H} fill="url(#hs-dots)" />
            <path d={PATH} fill="none" stroke="rgba(243,238,227,.10)" strokeWidth="1" />
            <motion.path
              d={PATH}
              fill="none"
              stroke="url(#hs-gold)"
              strokeWidth="1.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, delay: 0.4, ease: EASE }}
            />
            <path d={PATH} fill="none" stroke="#C6A86C" strokeOpacity=".45" strokeWidth="1" className="flow" />

            <circle r="14" fill="url(#hs-halo)">
              <animateMotion dur="7s" repeatCount="indefinite" path={PATH} begin="2.6s" />
            </circle>
            <circle r="3.5" fill="#F3EEE3">
              <animateMotion dur="7s" repeatCount="indefinite" path={PATH} begin="2.6s" />
            </circle>

            {NODES.map((p, i) => (
              <motion.g
                key={p.n}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.28, duration: 0.6 }}
              >
                <circle cx={p.x} cy={p.y} r="9" fill="#0A1424" stroke="#C6A86C" strokeOpacity=".6" />
                <circle cx={p.x} cy={p.y} r="3" fill="#C6A86C" />
                {i === NODES.length - 1 && (
                  <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="#C6A86C">
                    <animate attributeName="r" values="9;26" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values=".6;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                )}
              </motion.g>
            ))}
          </svg>

          {NODES.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, x: i % 2 === 0 ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75 + i * 0.28, duration: 0.7, ease: EASE }}
              className="absolute w-[28%]"
              style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
            >
              <div
                className={`-translate-y-1/2 rounded-lg border border-white/10 bg-ink/80 px-2.5 py-1.5 backdrop-blur sm:px-3 sm:py-2 ${
                  i % 2 === 0 ? "translate-x-[calc(-100%_-_16px)]" : "translate-x-[16px]"
                } ${i === NODES.length - 1 ? "border-champagne/40" : ""}`}
              >
                <div className="font-mono text-[9px] text-champagne sm:text-[10px]">{p.n}</div>
                <div className="text-[10.5px] font-semibold leading-tight text-ivory sm:text-[12.5px]">{p.label}</div>
                <div className="hidden text-[10.5px] leading-tight text-fog sm:block">{p.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Carte flottante : recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9, ease: EASE }}
        className="absolute -right-6 top-14 hidden w-[230px] xl:-right-14 lg:block"
      >
        <div className="animate-float rounded-2xl border border-white/10 bg-navy/90 p-3.5 shadow-console backdrop-blur-md">
          <div className="flex items-center gap-2 rounded-lg bg-white/[.05] px-2.5 py-2 text-[11.5px] text-ivory/85">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            avocat licenciement paris
          </div>
          <ul className="mt-2.5 space-y-1.5 text-[11px]">
            {["Cabinet A", "Cabinet B", "Cabinet Démo"].map((c) => (
              <li
                key={c}
                className={`flex items-center justify-between rounded-md px-2 py-1.5 ${
                  c === "Cabinet Démo" ? "bg-champagne/10 text-champagne-soft ring-1 ring-champagne/30" : "text-ivory/60"
                }`}
              >
                {c}
                <span className="h-1 w-10 rounded-full bg-current opacity-30" />
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-[10px] text-ivory/45">Simulation visuelle, exemple fictif</p>
        </div>
      </motion.div>

      {/* Carte flottante : réponse IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.9, ease: EASE }}
        className="absolute -left-8 bottom-10 hidden w-[250px] xl:-left-16 lg:block"
      >
        <div className="animate-float rounded-2xl border border-white/10 bg-navy/90 p-3.5 shadow-console backdrop-blur-md [animation-delay:-3s]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-ivory/80">Assistant IA</span>
            <span className="text-[10px] text-ivory/45">simulation fictive</span>
          </div>
          <p className="mt-2 rounded-lg rounded-tr-sm bg-white/[.06] px-2.5 py-2 text-[11px] text-ivory/75">
            Quel avocat consulter pour un licenciement à Paris ?
          </p>
          <div className="mt-2 space-y-1.5">
            <div className="shimmer h-1.5 w-full rounded-full" />
            <div className="shimmer h-1.5 w-4/5 rounded-full" />
            <div className="shimmer h-1.5 w-3/5 rounded-full" />
          </div>
          <div className="mt-2.5 inline-flex rounded-full border border-champagne/30 px-2 py-0.5 text-[10px] text-champagne-soft">
            Votre cabinet est-il compris ?
          </div>
        </div>
      </motion.div>
    </div>
  );
}
