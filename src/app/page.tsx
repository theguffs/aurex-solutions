import type { Metadata } from "next";
import Link from "next/link";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { RolesSection } from "@/components/RolesSection";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: SITE.name,
  description:
    "Aurex Solutions seleziona camerieri, baristi, cuochi e hostess a Roma. Invia la candidatura: ti contattiamo se c’è una posizione adatta.",
  path: "/",
  keywords: [
    "agenzia recruiting Roma",
    "lavoro ristorazione Roma",
    "selezione personale hospitality",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <RolesSection />
      <HowItWorks />
      <ContactSection />
      <section className="cta-band">
        <div className="shell cta-panel">
          <div>
            <h2>Pronto a candidarti?</h2>
            <p>
              Compila il form con telefono e CV. Ti richiamiamo solo se c’è un
              posto in linea con il tuo profilo.
            </p>
          </div>
          <Link href="/candidati" className="btn btn-primary">
            Vai al form
          </Link>
        </div>
      </section>
    </>
  );
}
