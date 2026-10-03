import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "../Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/[.06] bg-abyss py-12">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Logo />
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-ivory/60">
          <li>
            <Link href="/mentions-legales" className="hover:text-ivory">Mentions légales</Link>
          </li>
          <li>
            <Link href="/confidentialite" className="hover:text-ivory">Confidentialité</Link>
          </li>
          {site.email && (
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-ivory">{site.email}</a>
            </li>
          )}
        </ul>
      </div>
      <p className="container-x mt-8 text-[12px] text-ivory/35">
        © {new Date().getFullYear()} {site.name} · {site.founder.displayName}
      </p>
    </footer>
  );
}
