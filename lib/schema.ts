import { site } from "./site";
import { pillars } from "./content";
import { countries } from "./countries";

/** Données structurées : uniquement des informations vraies et vérifiables. */
export function buildJsonLd() {
  const org = `${site.url}/#organization`;
  const founder = `${site.url}/#founder`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": founder,
        name: site.founder.displayName,
        givenName: site.founder.givenName,
        familyName: site.founder.familyName,
        jobTitle: site.founder.role,
        ...(site.founder.photo ? { image: `${site.url}${site.founder.photo}` } : {}),
        worksFor: { "@id": org },
      },
      {
        "@type": "Organization",
        "@id": org,
        name: site.name,
        url: site.url,
        ...(site.email ? { email: site.email } : {}),
        logo: `${site.url}/logo.svg`,
        founder: { "@id": founder },
        description:
          "Méthode d'analyse et de croissance digitale conçue pour les cabinets d'avocats : visibilité, acquisition, conversion et suivi.",
        areaServed: countries.map((c) => ({ "@type": "Country", name: c.name })),
        knowsAbout: [
          "Marketing digital pour cabinets d'avocats",
          "Référencement naturel",
          "Visibilité locale",
          "Visibilité dans les moteurs de recherche IA",
          "Conversion",
          "Automatisation du suivi des prospects",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "fr-FR",
        publisher: { "@id": org },
      },
      {
        "@type": "Service",
        "@id": `${site.url}/#service`,
        name: "Analyse de croissance digitale pour cabinets d'avocats",
        serviceType: "Conseil en stratégie de croissance digitale et acquisition",
        description:
          "Analyse de la visibilité, de la concurrence et du parcours de contact d'un cabinet d'avocats, à partir de données publiques observées, puis recommandations priorisées.",
        provider: { "@id": org },
        audience: { "@type": "BusinessAudience", audienceType: "Cabinets d'avocats" },
        areaServed: countries.map((c) => ({ "@type": "Country", name: c.name })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Les quatre volets de Legal Growth System",
          itemListElement: pillars.map((p) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: p.name, description: p.line },
          })),
        },
      },
    ],
  };
}
