import { site } from "./site";
import { faqs, systemModules } from "./content";

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
          "Méthode d'analyse et de croissance digitale conçue pour les cabinets d'avocats : visibilité, acquisition, conversion, automatisation et pilotage.",
        areaServed: { "@type": "Country", name: "France" },
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
        areaServed: { "@type": "Country", name: "France" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Les cinq dimensions de Legal Growth System",
          itemListElement: systemModules.map((m) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: m.fr, description: m.desc },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
