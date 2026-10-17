import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Resolvia — Espace outils", template: "%s · Resolvia" },
  description: "Espace privé des outils Resolvia.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-BE">
      <body>{children}</body>
    </html>
  );
}
