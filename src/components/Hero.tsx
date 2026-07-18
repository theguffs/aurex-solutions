import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <Image
          src={IMAGES.hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-media-img"
        />
      </div>
      <div className="shell hero-content">
        <p className="hero-brand">{SITE.name}</p>
        <h1>Selezione hospitality a Roma</h1>
        <p className="hero-lead">
          Camerieri, baristi, cuochi e hostess. Invia il profilo: ti contattiamo
          solo se c’è una posizione adatta.
        </p>
        <div className="hero-cta">
          <Link href="/candidati" className="btn btn-primary">
            Invia candidatura
          </Link>
          <a href="#come-funziona" className="btn btn-ghost">
            Come funziona
          </a>
        </div>
      </div>
    </section>
  );
}
