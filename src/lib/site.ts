/** Contatti e brand pubblici — aggiorna questi valori. */
export const SITE = {
  name: "Aurex Solutions",
  city: "Roma",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@hreysolutions.com",
  mapsUrl: "https://www.google.com/maps/place/Roma+RM/@41.9102415,12.3711917,11z",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Roma,+Italy&hl=it&z=11&output=embed",
} as const;

export function mailLink() {
  return `mailto:${SITE.email}`;
}
