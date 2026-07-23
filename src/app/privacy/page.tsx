import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Informativa privacy",
  description:
    "Informativa privacy GDPR di Aurex Solutions FZ-LLC sul trattamento dei dati personali e dei CV raccolti tramite candidature.",
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
          Il titolare del trattamento è{" "}
          <strong>Aurex Solutions FZ-LLC</strong>, con sede in VUET2142 Compass
          Building, Al Hulaila, Al Hulaila Industrial Zone-FZ, Ras Al Khaimah,
          Emirati Arabi Uniti (licenza RAK Economic Zone n. 47028176).
        </p>
        <p>
          Per richieste privacy (accesso, rettifica, cancellazione e altri
          diritti) puoi scrivere a{" "}
          <a href="mailto:admin@aurex.solutions">admin@aurex.solutions</a>.
          Contatto telefonico:{" "}
          <a href="tel:+971585978920">+971 58 597 8920</a>.
        </p>

        <h2>Dati raccolti</h2>
        <p>
          Attraverso il form possiamo raccogliere: nome e cognome, numero di
          telefono / WhatsApp, email, ruolo richiesto, P.IVA (in possesso / non
          in possesso), disponibilità contrattuale, certificazioni (HACCP e
          sicurezza sul lavoro con stato di validità), note e CV in formato PDF.
          Il consenso privacy GDPR è obbligatorio per l’invio della candidatura.
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
          Conserviamo i CV e i dati di candidatura per un massimo di{" "}
          <strong>12 mesi</strong> dalla ricezione, salvo tua richiesta di
          cancellazione anticipata o obblighi di legge diversi.
        </p>

        <h2>Destinatari</h2>
        <p>
          I dati possono essere trattati, nei limiti delle finalità indicate, da
          fornitori tecnici che ci supportano nell’hosting del sito e
          nell’invio/gestione delle notifiche di candidatura. Non vendiamo i
          tuoi dati a terzi.
        </p>

        <h2>Diritti dell’interessato</h2>
        <p>
          Hai diritto di accesso, rettifica, cancellazione, limitazione,
          opposizione e portabilità dei dati, nonché di revocare il consenso. Hai
          anche diritto di proporre reclamo al Garante per la protezione dei dati
          personali. Per esercitare i diritti scrivi a{" "}
          <a href="mailto:admin@aurex.solutions">admin@aurex.solutions</a>.
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
