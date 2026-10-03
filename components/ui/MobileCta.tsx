"use client";
import { useEffect, useState, type MouseEvent } from "react";
import { scrollToHash } from "@/lib/scroll";

/** Bouton fixe mobile : visible après la hero, masqué quand le formulaire est à l'écran. */
export function MobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const target = document.getElementById("analyse");
    let io: IntersectionObserver | undefined;
    if (target) {
      io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.02 });
      io.observe(target);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const show = pastHero && !formVisible;

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    scrollToHash("#analyse");
  }

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 transition-[transform,opacity] duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href="#analyse"
        onClick={onClick}
        tabIndex={show ? 0 : -1}
        className="flex items-center justify-center rounded-full bg-champagne py-3.5 text-[15px] font-semibold text-ink shadow-console"
      >
        Demander mon analyse
      </a>
    </div>
  );
}
