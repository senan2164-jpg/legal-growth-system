import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

export default function Page() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        HOUNTONDJI AMOS, consultant en stratégie de croissance digitale et acquisition.
        <br />
        QUANTEX SARL.
      </p>
      <h2>Directeur de la publication</h2>
      <p>HOUNTONDJI AMOS.</p>
      <h2>Propriété intellectuelle</h2>
      <p>Les contenus de ce site sont protégés. Toute reproduction sans autorisation préalable est interdite.</p>
    </LegalPage>
  );
}
