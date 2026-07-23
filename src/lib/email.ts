import { Resend } from "resend";
import type { CandidaturaRecord } from "./store";
import { SITE } from "./site";
import { labelCertificazione, labelDisponibilita, labelPiva } from "./form-options";

function parseEmails(value: string | undefined) {
  if (!value) return [];
  return value
    .split(/[,;]+/)
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function sendCandidaturaEmail(
  record: CandidaturaRecord,
  cv?: { buffer: Buffer; fileName: string } | null,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = parseEmails(process.env.NOTIFY_EMAIL);
  if (to.length === 0 && SITE.email) to.push(SITE.email);

  /** Copia nascosta per conteggio contatti / fatturazione (es. tua email). */
  const bcc = parseEmails(process.env.TRACKING_EMAIL).filter(
    (email) => !to.includes(email),
  );

  const from =
    process.env.RESEND_FROM ||
    `${SITE.name} <candidature@lavorohospitalityroma.it>`;

  if (!apiKey) {
    console.warn(
      "Candidatura salvata localmente: manca RESEND_API_KEY, email non inviata.",
    );
    return { sent: false as const, reason: "missing_config" as const };
  }

  if (to.length === 0) {
    console.warn("Candidatura: manca NOTIFY_EMAIL, email non inviata.");
    return { sent: false as const, reason: "missing_config" as const };
  }

  console.info("Invio candidatura Resend:", {
    from,
    to,
    bccCount: bcc.length,
  });

  const resend = new Resend(apiKey);
  const ruoli = record.ruoli.join(", ");

  const attachments =
    cv != null
      ? [
          {
            filename: cv.fileName,
            content: cv.buffer,
          },
        ]
      : undefined;

  const { data, error } = await resend.emails.send({
    from,
    to,
    ...(bcc.length > 0 ? { bcc } : {}),
    subject: `Nuova candidatura: ${record.nome} (${ruoli})`,
    text: [
      `Nuova candidatura da ${SITE.name}`,
      ``,
      `Nome: ${record.nome}`,
      `Telefono / WhatsApp: ${record.telefono}`,
      `Email: ${record.email}`,
      `Ruoli: ${ruoli}`,
      `P.IVA: ${labelPiva(record.piva)}`,
      `Disponibilità contrattuale: ${labelDisponibilita(record.disponibilitaContrattuale) || "—"}`,
      `HACCP: ${labelCertificazione(record.certHaccp)}`,
      `Sicurezza: ${labelCertificazione(record.certSicurezza)}`,
      `Messaggio: ${record.messaggio || "—"}`,
      `Consenso privacy GDPR: ${record.privacyConsent ? "sì" : "no"}`,
      `CV: ${record.cvFileName || "non allegato"}`,
      `ID: ${record.id}`,
      `Data: ${record.createdAt}`,
    ].join("\n"),
    attachments,
  });

  if (error) {
    console.error("Resend error:", error);
    return { sent: false as const, reason: "resend_error" as const, error };
  }

  return { sent: true as const, id: data?.id };
}

export async function forwardToWebhook(record: CandidaturaRecord) {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return { sent: false as const };

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });

  return { sent: true as const };
}
