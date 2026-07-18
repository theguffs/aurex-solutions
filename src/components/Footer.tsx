import Link from "next/link";
import { ROLES } from "@/lib/roles";
import { mailLink, SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-col">
          <p className="brand footer-brand">{SITE.name}</p>
          <p className="muted">
            Selezione hospitality a {SITE.city}: candidature riservate, contatto
            diretto quando c’è una posizione.
          </p>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Ruoli</h3>
          <nav className="footer-links" aria-label="Ruoli">
            {ROLES.map((role) => (
              <Link key={role.id} href={`/${role.slug}`}>
                {role.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Contatti</h3>
          <nav className="footer-links" aria-label="Contatti">
            <a href={mailLink()}>{SITE.email}</a>
            <Link href="/#contatti">Sezione contatti</Link>
          </nav>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Info</h3>
          <nav className="footer-links" aria-label="Info">
            <Link href="/#chi-siamo">Chi siamo</Link>
            <Link href="/candidati">Candidati</Link>
            <Link href="/#come-funziona">Come funziona</Link>
            <a href="/privacy">Policy e Privacy</a>
          </nav>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p className="muted">
          © {year} {SITE.name}. Tutti i diritti riservati.{" "}
          <a href="/privacy">Policy e Privacy</a>
        </p>
      </div>
    </footer>
  );
}
