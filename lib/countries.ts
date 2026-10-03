/** Pays de l'espace francophone proposés dans le formulaire, avec leur indicatif téléphonique. */
export type Country = { name: string; dial: string; region: "Afrique" | "Europe" };

const AFRIQUE: [string, string][] = [
  ["Algérie", "+213"],
  ["Bénin", "+229"],
  ["Burkina Faso", "+226"],
  ["Burundi", "+257"],
  ["Cameroun", "+237"],
  ["Centrafrique", "+236"],
  ["Comores", "+269"],
  ["Congo", "+242"],
  ["Côte d'Ivoire", "+225"],
  ["Djibouti", "+253"],
  ["Gabon", "+241"],
  ["Guinée", "+224"],
  ["Guinée équatoriale", "+240"],
  ["Madagascar", "+261"],
  ["Mali", "+223"],
  ["Maroc", "+212"],
  ["Maurice", "+230"],
  ["Mauritanie", "+222"],
  ["Niger", "+227"],
  ["République démocratique du Congo", "+243"],
  ["Rwanda", "+250"],
  ["Sénégal", "+221"],
  ["Seychelles", "+248"],
  ["Tchad", "+235"],
  ["Togo", "+228"],
  ["Tunisie", "+216"],
];

const EUROPE: [string, string][] = [
  ["Belgique", "+32"],
  ["France", "+33"],
  ["Luxembourg", "+352"],
  ["Monaco", "+377"],
  ["Suisse", "+41"],
];

export const countries: Country[] = [
  ...AFRIQUE.map(([name, dial]) => ({ name, dial, region: "Afrique" as const })),
  ...EUROPE.map(([name, dial]) => ({ name, dial, region: "Europe" as const })),
];

export const OTHER_COUNTRY = "Autre pays";

export const countryNames = [...countries.map((c) => c.name), OTHER_COUNTRY];

export function dialFor(name: string): string {
  return countries.find((c) => c.name === name)?.dial ?? "+";
}
