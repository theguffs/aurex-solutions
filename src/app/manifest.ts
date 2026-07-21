import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Aurex",
    description:
      "Recruiting hospitality a Roma: camerieri, baristi, cuochi e hostess.",
    start_url: "/",
    display: "standalone",
    background_color: "#07111f",
    theme_color: "#e8b923",
    lang: "it",
    icons: [
      {
        src: "/favicon.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo-aurex.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
