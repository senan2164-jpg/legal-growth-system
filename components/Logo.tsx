export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="4" stroke="currentColor" strokeOpacity=".25" />
        <path d="M8.5 7.5V24h16" stroke="currentColor" strokeWidth="1.4" />
        <path d="M11.5 20.5 16 15.5l3.4 2.5 5.1-7" stroke="#C6A86C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24.5" cy="11" r="2" fill="#C6A86C" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[20px] font-semibold tracking-tight">Legal Growth</span>
          <span className="mt-[3px] text-[9.5px] font-semibold tracking-[.38em] text-champagne">SYSTEM</span>
        </span>
      )}
    </span>
  );
}
