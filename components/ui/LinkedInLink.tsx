import { Linkedin } from "lucide-react";
import { site } from "@/lib/site";

type Props = { tone?: "button" | "link"; className?: string };

/** « Échangez avec moi sur LinkedIn », ouvert dans un nouvel onglet. */
export function LinkedInLink({ tone = "button", className = "" }: Props) {
  const look =
    tone === "button"
      ? "rounded-full border border-ivory/20 px-6 py-3.5 text-[14.5px] font-semibold text-ivory hover:border-[#0A66C2] hover:bg-[#0A66C2]"
      : "text-[14px] text-ivory/70 underline decoration-ivory/25 underline-offset-[5px] hover:text-ivory hover:decoration-ivory";
  return (
    <a
      href={site.founder.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 transition-colors ${look} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex items-center justify-center rounded-[5px] bg-[#0A66C2] text-white transition-colors ${
          tone === "button" ? "h-6 w-6 group-hover:bg-white group-hover:text-[#0A66C2]" : "h-5 w-5"
        }`}
      >
        <Linkedin className={tone === "button" ? "h-3.5 w-3.5" : "h-3 w-3"} fill="currentColor" strokeWidth={0} />
      </span>
      Échangez avec moi sur LinkedIn
      <span className="sr-only">(nouvel onglet)</span>
    </a>
  );
}
