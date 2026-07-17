import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arus Kita - Ekosistem Logistik Kebencanaan",
    short_name: "Arus Kita",
    description: "Platform logistik kebencanaan terpadu: peta bencana real-time, pesanan logistik otonom, rantai kustodi.",
    start_url: "/splashscreen",
    display: "standalone",
    background_color: "#028090",
    theme_color: "#028090",
    icons: [
      {
        src: "/icon/aruskita-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
