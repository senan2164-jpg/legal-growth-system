import { specialtyOptions } from "./content";
import { countryNames } from "./countries";

/** Demande d'analyse, telle qu'envoyée au script Google Apps Script. */
export type AnalysisRequest = {
  prenom: string;
  nom: string;
  cabinet: string;
  email: string;
  telephone: string;
  ville: string;
  pays: string;
  specialite: string;
  site: string;
  taille: string;
  dossiers: string[];
  source: string;
};

export const LAWYER_COUNTS = ["1", "2 à 5", "6 à 15", "16 à 50", "Plus de 50"] as const;

const MAX: Record<keyof Omit<AnalysisRequest, "dossiers">, number> = {
  prenom: 80,
  nom: 80,
  cabinet: 160,
  email: 160,
  telephone: 40,
  ville: 80,
  pays: 60,
  specialite: 80,
  site: 300,
  taille: 20,
  source: 200,
};

/** Valeur envoyée quand le cabinet n'a pas de site, éventuellement suivie d'une autre présence en ligne. */
export const NO_SITE = "Pas de site";
/** Préfixe d'un domaine saisi librement après avoir choisi « Autre ». */
export const OTHER_PREFIX = "Autre : ";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

/** Ajoute https:// si besoin. Retourne null si l'adresse n'est pas exploitable. */
export function normalizeUrl(value: string): string | null {
  if (!value) return "";
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/** Nettoie et valide une demande. Retourne la demande propre ou la liste des champs en erreur. */
export function parseAnalysisRequest(input: Record<string, unknown>):
  | { ok: true; data: AnalysisRequest }
  | { ok: false; fields: string[] } {
  const data: AnalysisRequest = {
    prenom: clean(input.prenom, MAX.prenom),
    nom: clean(input.nom, MAX.nom),
    cabinet: clean(input.cabinet, MAX.cabinet),
    email: clean(input.email, MAX.email).toLowerCase(),
    telephone: clean(input.telephone, MAX.telephone),
    ville: clean(input.ville, MAX.ville),
    pays: clean(input.pays, MAX.pays),
    specialite: clean(input.specialite, MAX.specialite),
    site: clean(input.site, MAX.site),
    taille: clean(input.taille, MAX.taille),
    dossiers: Array.isArray(input.dossiers)
      ? input.dossiers
          .map((d) => clean(d, 120))
          .filter((d) => specialtyOptions.includes(d) || d.startsWith("Autre : "))
          .slice(0, 12)
      : [],
    source: clean(input.source, MAX.source),
  };

  const fields: string[] = [];
  for (const key of ["prenom", "nom", "cabinet", "ville"] as const) if (!data[key]) fields.push(key);
  if (!EMAIL_PATTERN.test(data.email)) fields.push("email");
  if (!countryNames.includes(data.pays)) fields.push("pays");
  if (!specialtyOptions.includes(data.specialite) && !(data.specialite.startsWith(OTHER_PREFIX) && data.specialite.length > OTHER_PREFIX.length))
    fields.push("specialite");
  if (data.taille && !(LAWYER_COUNTS as readonly string[]).includes(data.taille)) fields.push("taille");
  if (!data.site.startsWith(NO_SITE)) {
    const site = normalizeUrl(data.site);
    if (site === null) fields.push("site");
    else data.site = site;
  }

  return fields.length ? { ok: false, fields } : { ok: true, data };
}
