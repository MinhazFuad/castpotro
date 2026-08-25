import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ['400', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Castpotro - Global Digital Radio, Youth Community & Growth Network",
  description: "Castpotro is an international digital radio network and personal growth community empowering youth through podcasts, cultural exchange, Chatter Box speaking circles, and career incubation.",
  keywords: ["Castpotro", "Digital Radio", "Podcasts", "Youth Community", "Chatter Box", "Bookverse", "Aptitude Assessment", "Internship Program"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
