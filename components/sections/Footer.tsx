import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "../Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-abyss pb-28 pt-20 md:pb-12">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-fog">
              Conçu par {site.founder.displayName}, {site.founder.role.toLowerCase()}.
            </p>
          </div>
          <nav aria-label="Pied de page">
            <h2 className="text-[12px] text-ivory/45">Navigation</h2>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={`/${n.href}`} className="text-ivory/75 hover:text-ivory">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-[12px] text-ivory/45">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li>
                <Link href="/#analyse" className="text-champagne-soft hover:text-champagne">
                  Demander mon analyse
                </Link>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="break-all text-ivory/75 hover:text-ivory">
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="text-[12px] text-ivory/45">Informations</h2>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li>
                <Link href="/mentions-legales" className="text-ivory/75 hover:text-ivory">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-ivory/75 hover:text-ivory">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p aria-hidden="true" className="mt-20 select-none whitespace-nowrap font-serif text-[clamp(2.5rem,10vw,10rem)] font-semibold leading-none tracking-[-0.03em] text-ivory/[.06]">
          Legal Growth System
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/[.06] pt-6 text-[12px] text-ivory/45 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Les interfaces de démonstration présentées sur ce site contiennent des données fictives.</span>
        </div>
      </div>
    </footer>
  );
}
