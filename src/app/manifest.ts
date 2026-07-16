import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PijarNusa - Ekosistem Logistik Kebencanaan",
    short_name: "PijarNusa",
    description: "Platform logistik kebencanaan terpadu: peta bencana real-time, pesanan logistik otonom, rantai kustodi.",
    start_url: "/splashscreen",
    display: "standalone",
    background_color: "#feffff",
    theme_color: "#028090",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
