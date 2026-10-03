import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" } };

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité">
      <h2>Responsable du traitement</h2>
      <p>
        {site.founder.displayName}. Contact : {site.email ?? "[adresse email à compléter]"}.
      </p>
      <h2>Données collectées</h2>
      <p>
        Via le formulaire « Demander mon analyse » : prénom, nom, cabinet, email professionnel, téléphone (facultatif), ville,
        spécialité, site internet, nombre approximatif d&apos;avocats, types de dossiers à développer, et la source de la visite
        lorsqu&apos;elle est disponible (paramètres de campagne ou site référent).
      </p>
      <h2>Finalité</h2>
      <p>Ces données servent uniquement à répondre à la demande d&apos;analyse et à échanger avec vous à ce sujet.</p>
      <h2>Stockage et destinataires</h2>
      <p>
        Les demandes sont enregistrées dans un tableur Google Sheets et notifiées par email, via les services de Google. Elles ne
        sont ni revendues ni cédées. Seul {site.founder.displayName} y a accès.
      </p>
      <h2>Durée de conservation</h2>
      <p>[Durée à définir, par exemple 3 ans à compter du dernier échange.]</p>
      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l&apos;accès à vos données, leur rectification ou leur suppression en écrivant à{" "}
        {site.email ?? "[adresse email à compléter]"}. Vous pouvez également saisir l&apos;autorité de protection des données de votre pays (par exemple la CNIL en France, l&apos;APD en Belgique, la CDP au Sénégal ou l&apos;APDP au Bénin).
      </p>
      <h2>Cookies</h2>
      <p>Ce site n&apos;utilise ni cookie publicitaire ni outil de mesure d&apos;audience à ce jour.</p>
    </LegalPage>
  );
}
