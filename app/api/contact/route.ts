import { NextResponse } from "next/server";
import { parseAnalysisRequest } from "@/lib/lead";

export const runtime = "nodejs";

const MAX_BODY = 10_000;
const MIN_FILL_MS = 2_000;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

/* Limitation simple par IP. Mémoire propre à chaque instance serverless : protection légère, volontairement. */
const recent = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

function fail(status: number, error: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, error, ...extra }, { status });
}

export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > MAX_BODY) return fail(413, "Demande trop volumineuse.");

  let input: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("format");
    input = parsed as Record<string, unknown>;
  } catch {
    return fail(400, "Format de demande invalide.");
  }

  // Champ piège : invisible pour un humain, rempli par les robots. On ignore sans enregistrer.
  if (typeof input.website_confirm === "string" && input.website_confirm.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const startedAt = Number(input.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS) {
    return fail(422, "Le formulaire a été envoyé trop rapidement. Merci de réessayer.");
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "inconnue";
  if (isRateLimited(ip)) return fail(429, "Trop de demandes envoyées depuis cette connexion. Merci de réessayer dans quelques minutes.");

  const result = parseAnalysisRequest(input);
  if (!result.ok) return fail(422, "Certains champs sont à corriger.", { fields: result.fields });
  const lead = result.data;

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.LEAD_SHARED_SECRET;
  if (!scriptUrl || !secret) {
    // Journalisée pour ne pas être perdue, mais signalée comme un échec à l'utilisateur.
    console.error("[demande-analyse] formulaire non connecté (GOOGLE_SCRIPT_URL ou LEAD_SHARED_SECRET manquant)", JSON.stringify(lead));
    return fail(503, "Le formulaire n'est pas encore connecté.");
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Le pays est joint à la ville : le script Google et la feuille restent inchangés.
      body: JSON.stringify({ secret, lead: { ...lead, ville: `${lead.ville}, ${lead.pays}` } }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const text = await res.text();
    let reply: { ok?: boolean; error?: string } = {};
    try {
      reply = JSON.parse(text) as typeof reply;
    } catch {
      throw new Error(`Réponse inattendue du script (HTTP ${res.status})`);
    }
    if (!res.ok || reply.ok !== true) throw new Error(reply.error ?? `HTTP ${res.status}`);
  } catch (err) {
    console.error("[demande-analyse] échec de transmission", err, JSON.stringify(lead));
    return fail(502, "La demande n'a pas pu être transmise.");
  }

  return NextResponse.json({ ok: true });
}
