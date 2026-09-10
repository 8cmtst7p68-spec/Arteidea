import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arteidea Genova | Bomboniere, bijoux e creazioni artigianali",
  description: "Bomboniere, articoli per cerimonie, bijoux, idee regalo, decorazioni e creazioni del laboratorio Arteidea a Genova Sampierdarena.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
