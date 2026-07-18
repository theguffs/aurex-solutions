import { mailLink, SITE } from "@/lib/site";

export function ContactSection() {
  return (
    <section className="section section-alt" id="contatti">
      <div className="shell">
        <h2>Contatti</h2>
        <p className="section-lead">
          Per chiarimenti puoi scriverci. Ti ricontattiamo sulle posizioni solo
          quando c’è un posto adatto.
        </p>

        <ul className="contact-list">
          <li>
            <span className="contact-label">Email</span>
            <a href={mailLink()}>{SITE.email}</a>
          </li>
          <li>
            <span className="contact-label">Zona</span>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.city} — apri su Google Maps
            </a>
          </li>
        </ul>

        <h3 className="contact-map-title">Dove operiamo</h3>
        <div className="contact-map">
          <iframe
            title="Google Maps — Roma"
            src={SITE.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
