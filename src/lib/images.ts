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
    src: "/gallery/catering-chef.png",
    alt: "Chef e catering professionale",
  },
  logistica: {
    src: "/gallery/coffee-break.png",
    alt: "Coffee break e servizio corporate",
  },
  commerciale: {
    src: "/gallery/catering-eventi.png",
    alt: "Catering per eventi",
  },
} as const;
