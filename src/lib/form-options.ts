export const DISPONIBILITA_CONTRATTUALE = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "weekend", label: "Weekend" },
  { id: "occasionale", label: "Occasionale" },
] as const;

export type DisponibilitaContrattualeId =
  (typeof DISPONIBILITA_CONTRATTUALE)[number]["id"];

export const PIVA_STATI = [
  { id: "non-in-possesso", label: "Non in possesso" },
  { id: "in-possesso", label: "In possesso" },
] as const;

export type PivaStatoId = (typeof PIVA_STATI)[number]["id"];

export const CERTIFICAZIONE_STATI = [
  { id: "non-in-possesso", label: "Non in possesso" },
  { id: "valida", label: "In possesso e valida" },
  { id: "non-valida", label: "In possesso ma non più valida / in rinnovo" },
] as const;

export type CertificazioneStatoId = (typeof CERTIFICAZIONE_STATI)[number]["id"];

export const CERTIFICAZIONE_LABELS = {
  haccp: "HACCP",
  sicurezza: "Sicurezza sul lavoro",
} as const;

export function labelDisponibilita(ids: string[]) {
  return ids
    .map(
      (id) =>
        DISPONIBILITA_CONTRATTUALE.find((item) => item.id === id)?.label ?? id,
    )
    .join(", ");
}

export function labelPiva(stato: string) {
  return PIVA_STATI.find((item) => item.id === stato)?.label ?? stato;
}

export function labelCertificazione(stato: string) {
  return (
    CERTIFICAZIONE_STATI.find((item) => item.id === stato)?.label ?? stato
  );
}
