import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ['400', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Castpotro - Talent Acquisition",
  description: "Join the Castpotro global community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable}`}>
        {children}
      </body>
    </html>
  );
}
