import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Enneagramtest – Skjelett",
  description: "Utforsk din personlighet med denne norske Enneagram-testen. Kun for refleksjon og selvutvikling.",
  keywords: ["enneagram", "personlighetstest", "selvutvikling", "personlighet", "norsk"],
  authors: [{ name: "Enneagramtest" }],
  robots: "index,follow",
  openGraph: {
    title: "Enneagramtest – Skjelett",
    description: "Utforsk din personlighet med denne norske Enneagram-testen",
    type: "website",
    locale: "nb_NO",
    siteName: "Enneagramtest",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enneagramtest – Skjelett",
    description: "Utforsk din personlighet med denne norske Enneagram-testen",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={inter.variable}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-white">
        <ClientBody>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CookieConsent />
        </ClientBody>
      </body>
    </html>
  );
}
