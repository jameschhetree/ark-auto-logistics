import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ark Auto Logistics | Reliable Vehicle Transportation",
  description:
    "Licensed & insured auto transport across the United States. Open & enclosed carrier options for dealers, auctions, businesses, and individuals. Get a free quote today.",
  keywords:
    "auto transport, car shipping, vehicle transportation, dealer transport, auction transport, enclosed transport",
  openGraph: {
    title: "Ark Auto Logistics | Reliable Vehicle Transportation",
    description:
      "Licensed & insured auto transport across the United States. Get a free quote today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
