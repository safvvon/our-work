import type { Metadata } from "next";
const interVariable = "font-sans";
const spaceGroteskVariable = "font-mono";

export const metadata: Metadata = {
  metadataBase: new URL("https://intellex.studio"),
  title: "INTELLEX | Cinematic Web Design & Development Agency Portfolio",
  description:
    "Explore our collection of custom-designed, high-performance websites built for world-class brands. Immersive rotating film roll navigation and interactive 3D website previews.",
  keywords: [
    "Web Design",
    "Web Development",
    "Portfolio",
    "Next.js Portfolio",
    "Tailwind CSS",
    "GSAP Animations",
    "Premium Web Agency",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "INTELLEX | Cinematic Web Design & Development Agency Portfolio",
    description:
      "Explore our collection of custom-designed, high-performance websites built for world-class brands.",
    url: "https://intellex.studio",
    siteName: "INTELLEX",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "INTELLEX Cinematic Design & Development Studio Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INTELLEX | Cinematic Web Design & Development Agency Portfolio",
    description:
      "Explore our collection of custom-designed, high-performance websites built for world-class brands.",
    images: ["/og-image.jpg"],
  },
};

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
