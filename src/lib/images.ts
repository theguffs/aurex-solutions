/**
 * Ogni foto gallery appare una sola volta.
 * Hero: immagine ristorante Unsplash.
 */
export const IMAGES = {
  hero: {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80",
    alt: "Sala ristorante",
  },
  horeca: {
    src: "/gallery/banchetto.png",
    alt: "Sala banchetti e hospitality",
  },
  logistica: {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
    alt: "Magazzino e logistica",
  },
  commerciale: {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    alt: "Formazione e vendita in team",
  },
} as const;
