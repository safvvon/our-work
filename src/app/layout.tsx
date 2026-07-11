import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GREENFRAME | Cinematic Web Design & Development Agency Portfolio",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#050505] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
