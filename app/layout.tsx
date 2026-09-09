import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arteidea Genova | Bomboniere, bijoux e creazioni artigianali",
  description: "Creazioni artigianali personalizzate, bomboniere, bijoux, idee regalo e allestimenti a Genova Sampierdarena.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
