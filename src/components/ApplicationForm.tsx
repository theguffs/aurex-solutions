"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ROLES, type RoleId } from "@/lib/roles";
import {
  CERTIFICAZIONE_STATI,
  type CertificazioneStatoId,
  DISPONIBILITA_CONTRATTUALE,
  type DisponibilitaContrattualeId,
} from "@/lib/form-options";

type Props = {
  defaultRuoli?: RoleId[];
};

export function ApplicationForm({ defaultRuoli = [] }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<RoleId[]>(defaultRuoli);
  const [disponibilita, setDisponibilita] = useState<DisponibilitaContrattualeId[]>(
    [],
  );
  const [haccp, setHaccp] = useState<CertificazioneStatoId>("non-in-possesso");
  const [sicurezza, setSicurezza] =
    useState<CertificazioneStatoId>("non-in-possesso");

  function toggleRole(id: RoleId) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  }

  function toggleDisponibilita(id: DisponibilitaContrattualeId) {
    setDisponibilita((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    data.delete("ruoli");
    data.delete("disponibilitaContrattuale");
    selected.forEach((role) => data.append("ruoli", role));
    disponibilita.forEach((item) => data.append("disponibilitaContrattuale", item));
    data.set("certHaccp", haccp);
    data.set("certSicurezza", sicurezza);

    try {
      const res = await fetch("/api/candidatura", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(json.error || "Invio non riuscito.");
        return;
      }
      setStatus("success");
      form.reset();
      setSelected(defaultRuoli);
      setDisponibilita([]);
      setHaccp("non-in-possesso");
      setSicurezza("non-in-possesso");
    } catch {
      setStatus("error");
      setError("Connessione non disponibile. Riprova.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>Candidatura inviata</h3>
        <p>
          Grazie. Ti contatteremo per telefono o WhatsApp se c’è una posizione
          adatta al tuo profilo.
        </p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
          Invia un’altra candidatura
        </button>
      </div>
    );
  }

  return (
    <form className="application-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="nome">Nome e cognome</label>
        <input id="nome" name="nome" type="text" required autoComplete="name" />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="telefono">Telefono / WhatsApp</label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+39 ..."
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <fieldset className="field">
        <legend>Ruolo che cerchi</legend>
        <div className="role-checks">
          {ROLES.map((role) => (
            <label key={role.id} className="check">
              <input
                type="checkbox"
                checked={selected.includes(role.id)}
                onChange={() => toggleRole(role.id)}
              />
              <span>{role.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="field">
        <legend>Disponibilità contrattuale</legend>
        <p className="field-hint">Puoi selezionarne più di una.</p>
        <div className="role-checks">
          {DISPONIBILITA_CONTRATTUALE.map((item) => (
            <label key={item.id} className="check">
              <input
                type="checkbox"
                checked={disponibilita.includes(item.id)}
                onChange={() => toggleDisponibilita(item.id)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="esperienza">Esperienza</label>
        <input
          id="esperienza"
          name="esperienza"
          type="text"
          placeholder="Es. 2 anni in sala"
        />
      </div>

      <fieldset className="field">
        <legend>Certificazioni</legend>
        <p className="field-hint">
          Indica se le hai e se sono ancora in corso di validità.
        </p>
        <div className="cert-grid">
          <div className="field">
            <label htmlFor="certHaccp">HACCP</label>
            <select
              id="certHaccp"
              value={haccp}
              onChange={(e) => setHaccp(e.target.value as CertificazioneStatoId)}
            >
              {CERTIFICAZIONE_STATI.map((stato) => (
                <option key={stato.id} value={stato.id}>
                  {stato.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="certSicurezza">Sicurezza sul lavoro</label>
            <select
              id="certSicurezza"
              value={sicurezza}
              onChange={(e) =>
                setSicurezza(e.target.value as CertificazioneStatoId)
              }
            >
              {CERTIFICAZIONE_STATI.map((stato) => (
                <option key={stato.id} value={stato.id}>
                  {stato.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="messaggio">Note (opzionale)</label>
        <textarea id="messaggio" name="messaggio" rows={3} />
      </div>

      <div className="field">
        <label htmlFor="cv">CV in PDF (opzionale, max 5 MB)</label>
        <input id="cv" name="cv" type="file" accept="application/pdf,.pdf" />
      </div>

      <label className="check privacy-check">
        <input type="checkbox" name="privacy" required />
        <span>
          Acconsento al trattamento e alla conservazione dei miei dati personali
          e del CV ai sensi del GDPR, secondo l’{" "}
          <Link href="/privacy">informativa privacy</Link>. Campo obbligatorio.
        </span>
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Invio in corso…" : "Invia candidatura"}
      </button>
    </form>
  );
}
