type Props = { children?: React.ReactNode; tone?: "dark" | "light"; className?: string };

export function DemoBadge({ children = "Démo, données fictives", tone = "dark", className = "" }: Props) {
  const dark = tone === "dark";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10.5px] tracking-wide ${
        dark ? "border-champagne/30 bg-champagne/[.07] text-champagne-soft" : "border-champagne-deep/30 bg-champagne/10 text-champagne-deep"
      } ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-champagne" />
      </span>
      {children}
    </span>
  );
}
