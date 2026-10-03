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
    /** Photo de profil, placée dans /public. `null` : le monogramme « HA » est affiché à la place. */
    photo: "/amos.jpg" as string | null,
    linkedin: "https://www.linkedin.com/in/amos-fructueux",
  },
  title: "Legal Growth System | Croissance digitale des cabinets d'avocats",
  description:
    "Développer la visibilité et l'acquisition des cabinets d'avocats de l'espace francophone, en Afrique et en Europe. Nous regardons votre cabinet comme le ferait un prospect, puis nous cherchons ce qui mérite d'être amélioré. Par HOUNTONDJI AMOS.",
  keywords: [
    "marketing digital avocat",
    "acquisition clients avocat",
    "SEO avocat",
    "marketing cabinet avocat",
    "visibilité avocat",
    "acquisition cabinet avocat",
    "GEO avocat",
    "automatisation cabinet avocat",
    "marketing digital avocat Afrique",
    "visibilité cabinet avocat Afrique francophone",
    "marketing avocat Belgique",
    "marketing avocat Suisse",
  ],
};

export const nav = [
  { href: "#constat", label: "Le constat" },
  { href: "#approche", label: "L'approche" },
  { href: "#exemple", label: "Un exemple" },
  { href: "#amos", label: "Qui suis-je" },
  { href: "/methode", label: "Notre méthode" },
];
