"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { specialtyOptions } from "@/lib/content";
import { EMAIL_PATTERN, normalizeUrl } from "@/lib/lead";
import { site } from "@/lib/site";

type Fields = {
  prenom: string;
  nom: string;
  cabinet: string;
  email: string;
  telephone: string;
  ville: string;
  specialite: string;
  site: string;
};
type FieldName = keyof Fields;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: Fields = { prenom: "", nom: "", cabinet: "", email: "", telephone: "", ville: "", specialite: "", site: "" };

const MESSAGES: Partial<Record<FieldName, string>> = {
  prenom: "Indiquez votre prénom.",
  nom: "Indiquez votre nom.",
  cabinet: "Indiquez le nom du cabinet.",
  email: "Indiquez une adresse email valide.",
  ville: "Indiquez la ville du cabinet.",
  specialite: "Choisissez une spécialité.",
  site: "Cette adresse de site ne semble pas valide.",
};

function validate(f: Fields): Partial<Record<FieldName, string>> {
  const e: Partial<Record<FieldName, string>> = {};
  for (const k of ["prenom", "nom", "cabinet", "ville", "specialite"] as const) if (!f[k].trim()) e[k] = MESSAGES[k];
  if (!EMAIL_PATTERN.test(f.email.trim())) e.email = MESSAGES.email;
  if (f.site.trim() && normalizeUrl(f.site.trim()) === null) e.site = MESSAGES.site;
  return e;
}

/** Source de la visite : paramètres utm ou ref de l'URL, sinon site référent. */
function readSource(): string {
  const params = new URLSearchParams(window.location.search);
  const utm = ["utm_source", "utm_medium", "utm_campaign"].map((k) => params.get(k)).filter(Boolean).join(" / ");
  if (utm) return utm;
  const ref = params.get("ref");
  if (ref) return ref;
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : "";
    return host && host !== window.location.hostname ? host : "Accès direct";
  } catch {
    return "";
  }
}

export function AnalysisRequestForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);
  const source = useRef("");
  const sentRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    source.current = readSource();
  }, []);

  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  function set<K extends FieldName>(name: K, value: string) {
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(fields);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    const honeypot = (e.currentTarget.elements.namedItem("website_confirm") as HTMLInputElement | null)?.value ?? "";

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          site: fields.site.trim() ? normalizeUrl(fields.site.trim()) : "",
          source: source.current,
          startedAt: startedAt.current,
          website_confirm: honeypot,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: string[] };
      if (res.ok && json.ok) {
        setStatus("sent");
        setFields(EMPTY);
        return;
      }
      if (json.fields?.length) {
        const fromServer: Partial<Record<FieldName, string>> = {};
        for (const f of json.fields) if (f in EMPTY) fromServer[f as FieldName] = MESSAGES[f as FieldName] ?? "Champ à vérifier.";
        setErrors(fromServer);
      }
      setServerError(json.error ?? "La demande n'a pas pu être transmise.");
      setStatus("error");
    } catch {
      setServerError("La connexion a échoué. Vérifiez votre réseau.");
      setStatus("error");
    }
  }

  const fieldProps = (name: FieldName) => ({
    id: name,
    name,
    value: fields[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-erreur` : undefined,
    className: `field ${errors[name] ? "border-rose-300/60" : ""}`,
  });

  const errorText = (name: FieldName) =>
    errors[name] ? (
      <p id={`${name}-erreur`} className="mt-1.5 text-[12.5px] text-rose-200">
        {errors[name]}
      </p>
    ) : null;

  if (status === "sent") {
    return (
      <div className="rounded-[28px] border border-white/[.09] bg-night/70 p-6 shadow-console sm:p-10">
        <div ref={sentRef} tabIndex={-1} role="status" className="flex min-h-[300px] flex-col justify-center outline-none">
          <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne text-xl text-ink">
            ✓
          </span>
          <h3 className="mt-6 font-serif text-[34px] leading-tight">C&apos;est noté.</h3>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ivory/75">
            Je regarde votre cabinet et je reviens vers vous par email. Une confirmation vient de vous être envoyée.
          </p>
          <p className="mt-6 text-[13px] text-ivory/45">{site.founder.displayName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-white/[.09] bg-night/70 p-5 shadow-console sm:p-8 md:p-10">
      <form onSubmit={onSubmit} noValidate aria-busy={status === "sending"} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="prenom" className="field-label">Prénom *</label>
            <input {...fieldProps("prenom")} required autoComplete="given-name" onChange={(e) => set("prenom", e.target.value)} />
            {errorText("prenom")}
          </div>
          <div>
            <label htmlFor="nom" className="field-label">Nom *</label>
            <input {...fieldProps("nom")} required autoComplete="family-name" onChange={(e) => set("nom", e.target.value)} />
            {errorText("nom")}
          </div>
          <div>
            <label htmlFor="cabinet" className="field-label">Cabinet *</label>
            <input {...fieldProps("cabinet")} required autoComplete="organization" onChange={(e) => set("cabinet", e.target.value)} />
            {errorText("cabinet")}
          </div>
          <div>
            <label htmlFor="email" className="field-label">Email professionnel *</label>
            <input {...fieldProps("email")} type="email" required autoComplete="email" inputMode="email" onChange={(e) => set("email", e.target.value)} />
            {errorText("email")}
          </div>
          <div>
            <label htmlFor="telephone" className="field-label">Téléphone</label>
            <input {...fieldProps("telephone")} type="tel" autoComplete="tel" onChange={(e) => set("telephone", e.target.value)} />
          </div>
          <div>
            <label htmlFor="ville" className="field-label">Ville *</label>
            <input {...fieldProps("ville")} required list="villes" autoComplete="address-level2" onChange={(e) => set("ville", e.target.value)} />
            <datalist id="villes">
              {site.cities.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {errorText("ville")}
          </div>
          <div>
            <label htmlFor="specialite" className="field-label">Spécialité principale *</label>
            <select {...fieldProps("specialite")} required onChange={(e) => set("specialite", e.target.value)}>
              <option value="" disabled>
                Choisir
              </option>
              {specialtyOptions.map((s) => (
                <option key={s} value={s} className="bg-night">
                  {s}
                </option>
              ))}
            </select>
            {errorText("specialite")}
          </div>
          <div>
            <label htmlFor="site" className="field-label">Site internet</label>
            <input
              {...fieldProps("site")}
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="www.votre-cabinet.fr"
              onChange={(e) => set("site", e.target.value)}
            />
            {errorText("site")}
          </div>
        </div>

        {/* Champ piège anti-spam, invisible pour les visiteurs */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website_confirm">Ne pas remplir</label>
          <input id="website_confirm" name="website_confirm" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-champagne px-7 text-[15px] font-semibold text-ink transition-colors hover:bg-champagne-soft disabled:cursor-wait disabled:opacity-60"
          >
            {status === "sending" ? "Envoi en cours…" : "Demander mon analyse"}
          </button>
          <p className="text-[12.5px] text-ivory/45">* Champs obligatoires</p>
        </div>

        {status === "error" && (
          <p ref={errorRef} tabIndex={-1} role="alert" className="rounded-xl border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-[13.5px] leading-relaxed text-rose-100 outline-none">
            {serverError} Vos informations sont toujours dans le formulaire : vous pouvez réessayer
            {site.email ? <>, ou écrire à <a href={`mailto:${site.email}`} className="underline">{site.email}</a></> : null}.
          </p>
        )}

        <p className="border-t border-white/[.07] pt-5 text-[12.5px] leading-relaxed text-ivory/50">
          Vos informations servent uniquement à répondre à cette demande. <Link href="/confidentialite" className="underline underline-offset-2 hover:text-ivory">Politique de confidentialité</Link>.
        </p>
      </form>
    </div>
  );
}
