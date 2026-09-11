import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arteidea Genova | Bomboniere, bijoux e creazioni artigianali",
  description: "Bomboniere, articoli per cerimonie, bijoux, idee regalo, decorazioni e creazioni del laboratorio Arteidea a Genova Sampierdarena.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { capable: true, title: "Arteidea", statusBarStyle: "default" },
};

export const viewport: Viewport = { themeColor: "#701137" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
