export const ROLES = [
  {
    id: "cameriere",
    label: "Cameriere",
    slug: "lavoro-cameriere-roma",
    title: "Lavoro cameriere a Roma",
    description:
      "Cerca lavoro come cameriere a Roma? Invia la candidatura ad Aurex Solutions: selezione hospitality riservata per posizioni di sala. Ti contattiamo se c’è un posto adatto.",
    blurb: "Sala, servizio e ospitalità nei locali di Roma.",
    keywords: [
      "lavoro cameriere Roma",
      "cercasi cameriere Roma",
      "lavoro sala Roma",
      "cameriere ristorante Roma",
    ],
    seoBody:
      "Aurex Solutions raccoglie candidature per camerieri e personale di sala a Roma e in tutta Italia. Compila il form con disponibilità e CV: quando emerge una posizione in linea, ti ricontattiamo direttamente.",
  },
  {
    id: "barista",
    label: "Barista",
    slug: "lavoro-barista-roma",
    title: "Lavoro barista a Roma",
    description:
      "Lavoro barista a Roma con Aurex Solutions. Candidati per bar, caffetterie e hospitality: ti contattiamo se c’è un’apertura adatta al tuo profilo.",
    blurb: "Bar, caffetteria e bancone in città.",
    keywords: [
      "lavoro barista Roma",
      "cercasi barista Roma",
      "lavoro bar Roma",
      "barista caffetteria Roma",
    ],
    seoBody:
      "Se cerchi lavoro come barista a Roma, lascia i tuoi contatti. Selezioniamo profili per bar, hotel e locali Ho.Re.Ca. e ti ricontattiamo solo in caso di match concreto.",
  },
  {
    id: "cuoco",
    label: "Cuoco",
    slug: "lavoro-cuoco-roma",
    title: "Lavoro cuoco a Roma",
    description:
      "Lavoro cuoco a Roma: candidati con Aurex Solutions per cucina e brigata. Invia CV e disponibilità, ti ricontattiamo se il profilo è in linea.",
    blurb: "Cucina, brigata e servizio gastronomico.",
    keywords: [
      "lavoro cuoco Roma",
      "lavoro cucina Roma",
      "cercasi cuoco Roma",
      "chef Roma lavoro",
    ],
    seoBody:
      "Raccogliamo candidature per cuochi e figure di cucina a Roma. Indica esperienze e certificazioni (HACCP, sicurezza): ti contattiamo quando c’è una ricerca attiva compatibile.",
  },
  {
    id: "hostess",
    label: "Hostess",
    slug: "lavoro-hostess-roma",
    title: "Lavoro hostess a Roma",
    description:
      "Lavoro hostess a Roma per accoglienza, eventi e front desk. Candidati con Aurex Solutions: ti contattiamo se emerge una posizione adatta.",
    blurb: "Accoglienza, eventi e front desk.",
    keywords: [
      "lavoro hostess Roma",
      "hostess eventi Roma",
      "lavoro accoglienza Roma",
      "hostess hotel Roma",
    ],
    seoBody:
      "Cerchiamo hostess e figure di accoglienza per hotel, eventi e hospitality a Roma. Invia la candidatura e resta nel nostro archivio riservato fino al prossimo match.",
  },
] as const;

export type RoleId = (typeof ROLES)[number]["id"];

export function getRoleBySlug(slug: string) {
  return ROLES.find((role) => role.slug === slug);
}

export function getRoleById(id: string) {
  return ROLES.find((role) => role.id === id);
}
