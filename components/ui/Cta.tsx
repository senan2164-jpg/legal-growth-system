"use client";
import { ArrowRight } from "lucide-react";
import type { MouseEvent } from "react";
import { scrollToHash } from "@/lib/scroll";

type Props = { tone?: "solid" | "link"; className?: string; children?: string; href?: string };

/** Le seul appel à l'action du site : il mène au formulaire. */
export function Cta({ tone = "solid", className = "", children = "Demander mon analyse", href = "#analyse" }: Props) {
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith("#") && scrollToHash(href)) e.preventDefault();
  }
  const look =
    tone === "solid"
      ? "cta-live rounded-full bg-champagne px-7 py-4 text-[15px] font-semibold text-ink hover:bg-champagne-soft"
      : "text-[15px] font-semibold text-current underline decoration-champagne/60 underline-offset-[6px] hover:decoration-current";
  return (
    <a href={href} onClick={onClick} className={`group inline-flex items-center gap-3 transition-colors ${look} ${className}`}>
      {children}
      <span aria-hidden="true" className="cta-arrow inline-flex">
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  );
}
