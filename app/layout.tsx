import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Resolvia — Espace outils", template: "%s · Resolvia" },
  description: "Espace privé des outils Resolvia.",
  robots: { index: false, follow: false },
  icons: { icon: "/logo.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#697e73" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-BE">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;600;700&family=Alegreya+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
