import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700', '800']
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ['400', '500', '600', '700', '800']
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Castpotro — Editorial Soft Neo-Brutalist Digital Radio & IELTS Suite",
  description: "Castpotro is an international digital radio network, youth community, and personal growth ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${newsreader.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
