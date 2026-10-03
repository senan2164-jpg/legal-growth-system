export type ModuleId = "visibility" | "acquisition" | "conversion" | "automation" | "intelligence";

export const systemModules: { id: ModuleId; n: string; name: string; fr: string; desc: string; parts: string[] }[] = [
  {
    id: "visibility",
    n: "01",
    name: "Visibility",
    fr: "Visibilité",
    desc: "Où le cabinet apparaît quand la demande se forme : moteurs, cartes, contenus, réputation, assistants IA.",
    parts: ["Google", "Google Maps", "SEO", "Contenu", "Réputation", "Recherche IA"],
  },
  {
    id: "acquisition",
    n: "02",
    name: "Acquisition",
    fr: "Acquisition",
    desc: "Capter la demande qui existe déjà, par le référencement, les contenus et, si c'est pertinent, des campagnes.",
    parts: ["SEO", "Contenus", "Campagnes", "Audiences", "Landing pages"],
  },
  {
    id: "conversion",
    n: "03",
    name: "Conversion",
    fr: "Conversion",
    desc: "Ce qui se passe entre la visite et le rendez-vous : compréhension, contact, qualification.",
    parts: ["Recherche", "Page", "Compréhension", "Contact", "Qualification", "Rendez-vous"],
  },
  {
    id: "automation",
    n: "04",
    name: "Automation",
    fr: "Automatisation",
    desc: "Répondre vite, organiser, relancer, en réduisant les tâches manuelles du cabinet.",
    parts: ["Nouveau contact", "Notification", "Qualification", "Organisation", "Relance", "Rendez-vous"],
  },
  {
    id: "intelligence",
    n: "05",
    name: "Intelligence",
    fr: "Pilotage",
    desc: "Suivre les bons signaux pour décider où agir, quoi ajuster, quoi arrêter.",
    parts: ["Analytics", "Recherches", "Concurrence", "Performance", "IA"],
  },
];

export const specialties = [
  {
    name: "Droit du travail et social",
    text: "Une demande souvent déclenchée par un événement daté : licenciement, rupture, contrôle. Le moment de la recherche compte.",
    tags: ["Événementiel", "Local", "Salariés ou employeurs"],
  },
  {
    name: "Droit des affaires",
    text: "Des dirigeants qui comparent dans la durée. La lisibilité de l'expertise pèse plus que l'immédiateté.",
    tags: ["Cycle long", "B2B", "Réputation"],
  },
  {
    name: "Droit des sociétés",
    text: "Création, cession, gouvernance : des besoins récurrents, souvent prescrits par un expert-comptable ou un conseil.",
    tags: ["Récurrent", "B2B", "Prescription"],
  },
  {
    name: "Droit fiscal",
    text: "Des questions techniques, posées par des interlocuteurs informés. Le contenu expert est souvent le premier filtre.",
    tags: ["Expertise", "Entreprises et patrimoine", "Contenu"],
  },
  {
    name: "Contentieux commercial",
    text: "Impayés, ruptures de contrat, litiges entre sociétés : une recherche qui mêle urgence et comparaison.",
    tags: ["Urgence", "B2B", "Comparaison"],
  },
  {
    name: "Droit immobilier",
    text: "Baux, transactions, copropriété : une demande très ancrée géographiquement, liée à un bien précis.",
    tags: ["Très local", "Mixte", "Documents"],
  },
  {
    name: "Droit de la construction",
    text: "Malfaçons, sinistres, marchés : des parcours longs et documentés, entre professionnels et particuliers.",
    tags: ["Cycle long", "Technique", "Mixte"],
  },
  {
    name: "Responsabilité et indemnisation",
    text: "Accidents, préjudices, assurances : des personnes qui cherchent d'abord à comprendre leurs droits.",
    tags: ["Information", "Particuliers", "Confiance"],
  },
  {
    name: "Droit pénal des affaires",
    text: "Une urgence parfois immédiate et une exigence de discrétion. La joignabilité devient un critère de choix.",
    tags: ["Urgence", "Discrétion", "Dirigeants"],
  },
];

/** Options du formulaire, alignées sur les spécialités présentées. */
export const specialtyOptions = [...specialties.map((s) => s.name), "Autre"];

export const faqs = [
  {
    q: "En quoi consiste l'analyse ?",
    a: "J'observe les informations publiques autour de votre cabinet : vos positions sur des recherches liées à votre spécialité, votre fiche Google, votre site, le parcours de contact et les cabinets qui apparaissent à côté de vous. Chaque constat est daté et accompagné de sa source.",
  },
  {
    q: "Est-ce un audit SEO ?",
    a: "Pas seulement. Le référencement est une partie de l'analyse. Elle porte aussi sur la présence locale, la concurrence, la conversion, le suivi des demandes et les assistants IA.",
  },
  {
    q: "L'analyse garantit-elle de nouveaux dossiers ?",
    a: "Non. Elle sert à identifier des observations, des opportunités et des points d'amélioration. Aucun résultat commercial n'est garanti.",
  },
  {
    q: "Travaillez-vous uniquement avec les cabinets d'avocats ?",
    a: "Oui. Legal Growth System est conçu pour eux : leurs spécialités, leurs parcours clients et le cadre déontologique qui encadre leur communication. L'analyse porte sur l'environnement d'acquisition, jamais sur le fond du droit.",
  },
  {
    q: "Dois-je changer mon site actuel ?",
    a: "Pas nécessairement. Un site existant est souvent une bonne base. L'analyse dit s'il est trouvé, compris et s'il facilite la prise de contact, puis ce qui mérite d'être modifié.",
  },
  {
    q: "Utilisez-vous uniquement Google ?",
    a: "Google et Google Maps sont au centre, parce que la demande s'y exprime largement. L'analyse regarde aussi les annuaires et plateformes visibles, et des tests ponctuels dans des assistants IA comme ChatGPT, Perplexity ou Gemini.",
  },
  {
    q: "Travaillez-vous avec notre développeur ou notre agence ?",
    a: "Oui. Leur rôle et le mien sont complémentaires : je regarde comment les pièces fonctionnent ensemble et je priorise ; l'exécution peut rester chez eux.",
  },
  {
    q: "Combien coûte un accompagnement ?",
    a: "Cela dépend de ce que l'analyse fait apparaître. Une proposition n'est faite que si un besoin réel est identifié, avec un périmètre précis.",
  },
  {
    q: "Qui est derrière Legal Growth System ?",
    a: "HOUNTONDJI AMOS, consultant en stratégie de croissance digitale et acquisition. Il réalise lui-même les analyses.",
  },
];
