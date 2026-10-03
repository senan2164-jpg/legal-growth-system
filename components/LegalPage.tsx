import Link from "next/link";
import { Logo } from "./Logo";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-ink/10">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" aria-label="Retour à l'accueil">
            <Logo />
          </Link>
          <Link href="/" className="text-sm text-graphite hover:text-ink">
            Retour au site
          </Link>
        </div>
      </header>
      <main className="container-x max-w-3xl py-20">
        <h1 className="display-md">{title}</h1>
        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-graphite [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink">
          {children}
        </div>
      </main>
    </div>
  );
}
