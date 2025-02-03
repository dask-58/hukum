import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AuthWrapper from "@/components/AuthWrapper";
import "./globals.css";
import type React from "react";
import { Toaster } from "@/components/ui/toaster";

const ibmSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-sans",
});

// const ibmMono = IBM_Plex_Mono({
//   subsets: ["latin"],
//   weight: ["400"],
//   variable: "--font-ibm-mono",
// });

export const metadata: Metadata = {
  title: "HUKUM | Next-Gen Face Recognition",
  description:
    "HUKUM harnesses cutting-edge AI and face recognition technology to deliver secure, scalable, and innovative security solutions. Developed by a team of visionary computer science students at IIIT Dharwad, our platform sets new standards in digital security.",
  keywords: [
    "HUKUM",
    "face recognition",
    "AI security",
    "machine learning",
    "digital security",
    "IIIT Dharwad",
    "next-gen technology",
  ],
  openGraph: {
    title: "HUKUM | Next-Gen Face Recognition",
    description:
      "Discover HUKUM – a revolutionary platform that utilizes advanced AI and face recognition technology to secure your digital world. Built by innovative minds from IIIT Dharwad.",
    url: "https://hukum-rose.vercel.app",
    siteName: "HUKUM",
    locale: "en_US",
    type: "website",
  }
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={`${ibmSans.className} antialiased`}>
          <AuthWrapper>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </AuthWrapper>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
