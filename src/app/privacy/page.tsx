import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Informativa privacy",
  description:
    "Informativa privacy GDPR di Aurex Solutions sul trattamento dei dati personali e dei CV raccolti tramite candidature.",
  path: "/privacy",
  keywords: ["privacy", "GDPR", "trattamento dati"],
});

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <h1>Informativa privacy</h1>
          <p>Ultimo aggiornamento: luglio 2026</p>
        </div>
      </section>
      <section className="shell prose">
        <p>
          Questo sito raccoglie candidature per opportunità di lavoro a Roma nei
          ruoli di cameriere, barista, cuoco e hostess. I dati sono trattati per
          valutare il profilo e ricontattarti in caso di posizione adatta.
        </p>

        <h2>Titolare del trattamento</h2>
        <p>
          Il titolare è Aurex Solutions. Per esercitare i tuoi
          diritti puoi scrivere all’indirizzo email indicato nella sezione
          contatti del sito.
        </p>

        <h2>Dati raccolti</h2>
        <p>
          Attraverso il form possiamo raccogliere: nome e cognome, numero di
          telefono / WhatsApp, email, ruolo richiesto, esperienza, disponibilità
          contrattuale (part-time, full-time, weekend, solo eventi, P.IVA),
          certificazioni (HACCP e sicurezza sul lavoro con stato di validità),
          note e CV in formato PDF. Il consenso privacy GDPR è obbligatorio per
          l’invio della candidatura.
        </p>

        <h2>Finalità e base giuridica</h2>
        <p>
          I dati sono usati esclusivamente per la gestione delle candidature e
          per contattarti in merito a opportunità di lavoro. La base giuridica è
          il consenso e, ove applicabile, l’esecuzione di misure precontrattuali
          su tua richiesta.
        </p>

        <h2>Conservazione</h2>
        <p>
          Conserviamo i dati per il tempo necessario alle finalità di recruiting
          e comunque non oltre i termini consentiti dalla normativa, salvo tua
          richiesta di cancellazione.
        </p>

        <h2>Diritti dell’interessato</h2>
        <p>
          Hai diritto di accesso, rettifica, cancellazione, limitazione,
          opposizione e portabilità dei dati, nonché di revocare il consenso. Hai
          anche diritto di proporre reclamo al Garante per la protezione dei dati
          personali.
        </p>

        <h2>Cookie e analytics</h2>
        <p>
          Se attivi Google Analytics o Meta Pixel, potranno essere usati cookie o
          identificatori simili per misurare le visite e le campagne
          pubblicitarie. Puoi gestirli dalle impostazioni del browser.
        </p>
      </section>
    </>
  );
}
