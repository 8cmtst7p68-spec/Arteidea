import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arteidea Genova",
    short_name: "Arteidea",
    description: "Bomboniere, bijoux, idee regalo e creazioni artigianali a Genova Sampierdarena.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8e8",
    theme_color: "#701137",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
