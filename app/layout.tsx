import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bingo — PFP Generator",
  description: "Build, copy, and download your own Bingo PFP.",
  icons: { icon: "/artwork/bingo.png" },
  openGraph: { title: "Bingo", description: "Make your Bingo.", images: [{ url: "/og.png", width: 1500, height: 500 }] },
  twitter: { card: "summary_large_image", title: "Bingo", description: "Make your Bingo.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
