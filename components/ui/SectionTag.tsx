type Props = { index: string; label: string; tone?: "dark" | "light"; className?: string };

/** Numérotation façon article de code : « § 04  La concurrence ». */
export function SectionTag({ index, label, tone = "dark", className = "" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`font-serif text-xl italic ${dark ? "text-champagne" : "text-champagne-deep"}`}>§ {index}</span>
      <span className={`h-px w-12 ${dark ? "bg-ivory/20" : "bg-ink/20"}`} />
      <span className={`text-[13px] ${dark ? "text-ivory/55" : "text-ink/55"}`}>{label}</span>
    </div>
  );
}
