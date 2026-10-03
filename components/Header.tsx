"use client";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { nav } from "@/lib/site";
import { scrollToHash } from "@/lib/scroll";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const onHome = usePathname() === "/";
  /** Hors de l'accueil, les ancres renvoient vers l'accueil. */
  const to = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Verrouillage du défilement, Échap, focus et fermeture au passage en desktop.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  /**
   * Ferme le menu, libère le défilement, puis navigue.
   * Le défilement est lancé à l'image suivante, une fois le verrou retiré.
   */
  const go = useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#") || !onHome) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    setOpen(false);
    document.documentElement.style.overflow = "";
    requestAnimationFrame(() => {
      if (!scrollToHash(href)) window.location.hash = href;
    });
  }, [onHome]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled || open ? "border-white/[.06] bg-ink/90 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-[72px]">
          <a href={onHome ? "#top" : "/"} aria-label="Legal Growth System, retour en haut" className="text-ivory" onClick={(e) => go(e, "#top")}>
            <Logo />
          </a>

          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={to(item.href)}
                onClick={(e) => go(e, item.href)}
                aria-current={!onHome && item.href === "/methode" ? "page" : undefined}
                className="link-underline text-[13.5px] text-ivory/70 transition-colors hover:text-ivory aria-[current=page]:text-ivory"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={to("#analyse")}
              onClick={(e) => go(e, "#analyse")}
              className="cta-live hidden rounded-full border border-champagne/40 px-5 py-2.5 text-[13px] font-semibold text-champagne-soft transition-colors hover:bg-champagne hover:text-ink sm:inline-flex"
            >
              Demander mon analyse
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ivory lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/*
        Le panneau est volontairement hors du <header> : le backdrop-filter du header
        ferait de celui-ci le repère des éléments `fixed` et écraserait le panneau.
      */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-ink px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 lg:hidden"
      >
        <nav aria-label="Navigation mobile">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-white/[.07]">
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={to(item.href)}
                  onClick={(e) => go(e, item.href)}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="w-6 font-serif text-base italic text-champagne">{i + 1}</span>
                  <span className="font-serif text-[34px] leading-none">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={to("#analyse")}
          onClick={(e) => go(e, "#analyse")}
          className="cta-live mt-8 flex w-full items-center justify-center rounded-full bg-champagne py-4 text-[15px] font-semibold text-ink"
        >
          Demander mon analyse
        </a>
      </div>
    </>
  );
}
