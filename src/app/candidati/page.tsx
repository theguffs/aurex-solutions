import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Invia candidatura",
  description:
    "Form di candidatura Aurex Solutions: lavoro a Roma come cameriere, barista, cuoco o hostess. Invia CV e contatti in pochi minuti.",
  path: "/candidati",
  keywords: [
    "candidatura lavoro Roma",
    "invia CV hospitality",
    "form lavoro cameriere Roma",
  ],
});

export default function CandidatiPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Candidati", path: "/candidati" },
        ])}
      />
      <section className="page-hero">
        <div className="shell">
          <h1>Invia la tua candidatura</h1>
          <p>
            Lascia i contatti e, se vuoi, il CV. Se c’è una posizione adatta, ti
            contattiamo.
          </p>
        </div>
      </section>
      <section className="form-section">
        <div className="shell">
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
