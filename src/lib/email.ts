import { Resend } from "resend";
import type { CandidaturaRecord } from "./store";
import { SITE } from "./site";
import { labelCertificazione, labelDisponibilita } from "./form-options";

export async function sendCandidaturaEmail(
  record: CandidaturaRecord,
  cv?: { buffer: Buffer; fileName: string } | null,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || SITE.email;
  const from =
    process.env.RESEND_FROM || `${SITE.name} <onboarding@resend.dev>`;

  if (!apiKey) {
    console.warn(
      "Candidatura salvata localmente: manca RESEND_API_KEY, email non inviata.",
    );
    return { sent: false as const, reason: "missing_config" as const };
  }

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

  await resend.emails.send({
    from,
    to: [to],
    subject: `Nuova candidatura: ${record.nome} (${ruoli})`,
    text: [
      `Nuova candidatura da ${SITE.name}`,
      ``,
      `Nome: ${record.nome}`,
      `Telefono / WhatsApp: ${record.telefono}`,
      `Email: ${record.email}`,
      `Ruoli: ${ruoli}`,
      `Esperienza: ${record.esperienza || "—"}`,
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

  return { sent: true as const };
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
