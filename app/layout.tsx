import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "Rondo the Monkey — PFP Generator",
  description: "Build, copy, and download your own Rondo PFP.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", type: "image/x-icon", sizes: "64x64" },
      { url: "/favicon.png?v=3", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/favicon.png?v=3",
  },
  openGraph: { title: "Rondo the Monkey", description: "Make your Rondo.", images: [{ url: "/og.png?v=3", width: 2172, height: 724, alt: "Rondo the Monkey swinging through the jungle" }] },
  twitter: { card: "summary_large_image", title: "Rondo the Monkey", description: "Make your Rondo.", images: ["/og.png?v=3"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
