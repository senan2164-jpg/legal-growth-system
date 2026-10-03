import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

export default function Page() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        {site.founder.displayName}, {site.founder.role.toLowerCase()}.
        <br />
        Statut juridique, adresse et numéro d&apos;immatriculation : [à compléter].
        <br />
        Contact : {site.email ?? "[adresse email à compléter]"}.
      </p>
      <h2>Directeur de la publication</h2>
      <p>{site.founder.displayName}.</p>
      <h2>Hébergement</h2>
      <p>Vercel Inc. [adresse postale de l&apos;hébergeur, à reporter depuis les conditions publiées par Vercel].</p>
      <h2>Propriété intellectuelle</h2>
      <p>Les contenus de ce site sont protégés. Toute reproduction sans autorisation préalable est interdite.</p>
      <h2>Démonstrations</h2>
      <p>
        Les interfaces, tableaux, cabinets et analyses présentés à titre de démonstration sont fictifs. Ils ne décrivent aucun
        cabinet réel et ne constituent pas des résultats obtenus.
      </p>
    </LegalPage>
  );
}
