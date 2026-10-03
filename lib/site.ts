const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;

export const site = {
  name: "Legal Growth System",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://legal-growth-system.vercel.app").replace(/\/$/, ""),
  /** Adresse publique de contact. `null` tant qu'elle n'est pas configurée : rien n'est alors affiché. */
  email: contactEmail,
  founder: {
    displayName: "HOUNTONDJI AMOS",
    givenName: "Amos",
    familyName: "HOUNTONDJI",
    role: "Consultant en stratégie de croissance digitale et acquisition",
  },
  title: "Legal Growth System | Croissance digitale des cabinets d'avocats",
  description:
    "Legal Growth System est une méthode d'analyse et de croissance digitale conçue pour les cabinets d'avocats : visibilité, acquisition, conversion, automatisation et pilotage. Conçue par HOUNTONDJI AMOS.",
  keywords: [
    "marketing digital avocat",
    "acquisition clients avocat",
    "SEO avocat",
    "marketing cabinet avocat",
    "visibilité avocat",
    "acquisition cabinet avocat",
    "GEO avocat",
    "automatisation cabinet avocat",
  ],
  cities: ["Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse", "Nantes", "Strasbourg", "Nice"],
};

export const nav = [
  { href: "#parcours", label: "Parcours" },
  { href: "#systeme", label: "Système" },
  { href: "#methode", label: "Méthode" },
  { href: "#demo", label: "Démonstration" },
  { href: "#faq", label: "FAQ" },
];
