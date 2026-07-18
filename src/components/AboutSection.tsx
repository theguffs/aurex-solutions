import Image from "next/image";
import { IMAGES } from "@/lib/images";

const SECTORS = [
  {
    title: "Ho.Re.Ca.",
    text: "Hotellerie, ristorazione e catering: ricerchiamo e selezioniamo figure professionali.",
    image: IMAGES.horeca,
  },
  {
    title: "Logistica",
    text: "Affianchiamo aziende del settore con la selezione di autisti, magazzinieri e store manager.",
    image: IMAGES.logistica,
  },
  {
    title: "Settore commerciale",
    text: "Individuiamo profili sales, coach e formatori specializzati nella vendita.",
    image: IMAGES.commerciale,
  },
] as const;

export function AboutSection() {
  return (
    <section className="section section-alt" id="chi-siamo">
      <div className="shell">
        <h2>Chi siamo</h2>
        <p className="section-lead">
          Aurex Solutions è una società di recruiting che opera su tutto il
          territorio nazionale, dal 2021 specializzata nella selezione e nel
          collocamento di personale qualificato per aziende di diversi settori.
        </p>

        <p className="about-text">I nostri ambiti di competenza sono i settori:</p>

        <ul className="about-sectors">
          {SECTORS.map((sector) => (
            <li key={sector.title} className="about-sector">
              <div className="about-sector-media">
                <Image
                  src={sector.image.src}
                  alt={sector.image.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 280px"
                  className="about-sector-img"
                />
              </div>
              <div className="about-sector-copy">
                <strong>{sector.title}</strong>
                <span>{sector.text}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="about-text">
          Siamo sempre alla ricerca di risorse da inserire in realtà strutturate
          e in contesti professionali di qualità.
        </p>

        <p className="about-text about-closing">
          Il nostro approccio si fonda su una conoscenza approfondita delle
          dinamiche di ciascun settore in cui operiamo e su un rapporto di
          fiducia costruito nel tempo con le aziende partner, con l’obiettivo di
          offrire ai candidati non solo un’opportunità di lavoro, ma un percorso
          di crescita professionale duraturo.
        </p>
      </div>
    </section>
  );
}
