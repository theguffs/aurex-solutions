import { NextResponse } from "next/server";
import { ROLES, type RoleId } from "@/lib/roles";
import {
  CERTIFICAZIONE_STATI,
  type CertificazioneStatoId,
  DISPONIBILITA_CONTRATTUALE,
  type DisponibilitaContrattualeId,
} from "@/lib/form-options";
import { saveCandidatura } from "@/lib/store";
import { forwardToWebhook, sendCandidaturaEmail } from "@/lib/email";

export const runtime = "nodejs";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const VALID_ROLES = new Set(ROLES.map((r) => r.id));
const VALID_DISP = new Set(DISPONIBILITA_CONTRATTUALE.map((d) => d.id));
const VALID_CERT = new Set(CERTIFICAZIONE_STATI.map((c) => c.id));

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function isCertStato(value: string): value is CertificazioneStatoId {
  return VALID_CERT.has(value as CertificazioneStatoId);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const nome = String(form.get("nome") || "").trim();
    const telefono = String(form.get("telefono") || "").trim();
    const email = String(form.get("email") || "").trim();
    const esperienza = String(form.get("esperienza") || "").trim();
    const messaggio = String(form.get("messaggio") || "").trim();
    const privacy =
      form.get("privacy") === "on" || form.get("privacy") === "true";
    const ruoliRaw = form.getAll("ruoli").map((v) => String(v));
    const ruoli = ruoliRaw.filter((id): id is RoleId =>
      VALID_ROLES.has(id as RoleId),
    );
    const dispRaw = form.getAll("disponibilitaContrattuale").map((v) => String(v));
    const disponibilitaContrattuale = dispRaw.filter(
      (id): id is DisponibilitaContrattualeId =>
        VALID_DISP.has(id as DisponibilitaContrattualeId),
    );
    const certHaccp = String(form.get("certHaccp") || "non-in-possesso");
    const certSicurezza = String(form.get("certSicurezza") || "non-in-possesso");

    if (!nome || nome.length < 2) {
      return NextResponse.json({ error: "Inserisci nome e cognome." }, { status: 400 });
    }
    if (!isValidPhone(telefono)) {
      return NextResponse.json(
        { error: "Inserisci un numero di telefono / WhatsApp valido." },
        { status: 400 },
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Inserisci un’email valida." }, { status: 400 });
    }
    if (ruoli.length === 0) {
      return NextResponse.json(
        { error: "Seleziona almeno un ruolo." },
        { status: 400 },
      );
    }
    if (disponibilitaContrattuale.length === 0) {
      return NextResponse.json(
        { error: "Seleziona almeno un tipo di disponibilità contrattuale." },
        { status: 400 },
      );
    }
    if (!isCertStato(certHaccp) || !isCertStato(certSicurezza)) {
      return NextResponse.json(
        { error: "Indica lo stato delle certificazioni." },
        { status: 400 },
      );
    }
    if (!privacy) {
      return NextResponse.json(
        {
          error:
            "Il consenso privacy GDPR è obbligatorio per inviare la candidatura.",
        },
        { status: 400 },
      );
    }

    const cvEntry = form.get("cv");
    let cv: { buffer: Buffer; fileName: string } | null = null;

    if (cvEntry && typeof cvEntry !== "string" && "arrayBuffer" in cvEntry) {
      const file = cvEntry as File;
      if (file.size > 0) {
        if (file.size > MAX_CV_BYTES) {
          return NextResponse.json(
            { error: "Il CV deve essere un PDF entro 5 MB." },
            { status: 400 },
          );
        }
        const type = file.type || "";
        const name = file.name || "cv.pdf";
        if (!type.includes("pdf") && !name.toLowerCase().endsWith(".pdf")) {
          return NextResponse.json(
            { error: "Carica il CV in formato PDF." },
            { status: 400 },
          );
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        cv = { buffer, fileName: name };
      }
    }

    const record = await saveCandidatura({
      nome,
      telefono,
      email,
      ruoli,
      esperienza,
      disponibilitaContrattuale,
      certHaccp,
      certSicurezza,
      messaggio,
      privacyConsent: true,
      cvFileName: cv?.fileName ?? null,
      cv,
    });

    const emailResult = await sendCandidaturaEmail(record, cv);
    if (!emailResult.sent) {
      console.error("Email candidatura non inviata:", emailResult);
    }
    await Promise.allSettled([forwardToWebhook(record)]);

    return NextResponse.json({
      ok: true,
      id: record.id,
      emailSent: emailResult.sent,
    });
  } catch (error) {
    console.error("candidatura error", error);
    return NextResponse.json(
      { error: "Errore durante l’invio. Riprova tra poco." },
      { status: 500 },
    );
  }
}
