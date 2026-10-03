import type { ReactNode } from "react";

type Props = { index: number; total: number; name: string; children: ReactNode };

/** Le cadre sombre des modules : titre, position dans la série, fond quadrillé. */
export function ModuleCard({ index, total, name, children }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-ink text-ivory shadow-[0_40px_90px_-40px_rgba(7,9,13,.55)] sm:rounded-[40px]">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-50" />
      <div className="relative flex items-center justify-between border-b border-white/[.06] px-6 py-5 sm:px-10 sm:py-6">
        <span className="text-[15px] text-ivory/60 sm:text-[17px]">
          Module {String(index + 1).padStart(2, "0")}, {name}
        </span>
        <span className="flex items-center gap-2" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`h-2 rounded-full ${i === index ? "w-8 bg-champagne" : "w-2 bg-white/20"}`} />
          ))}
        </span>
      </div>
      <div className="relative px-4 py-8 sm:px-8 sm:py-10">{children}</div>
    </div>
  );
}
