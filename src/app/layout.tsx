import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexxali.academy"),

  title: {
    default: "Nexxali Academy | Modern E-Learning Platform",
    template: "%s | Nexxali Academy",
  },

  description:
    "Nexxali Academy is a modern e-learning platform offering professional courses, structured batches, and industry-ready skills development.",

  keywords: [
    "Nexxali Academy",
    "E-learning platform",
    "Online courses",
    "Professional training",
    "Skill development",
    "Batch based learning",
  ],

  authors: [{ name: "Nexxali Academy Team" }],

  openGraph: {
    title: "Nexxali Academy | Modern E-Learning Platform",
    description:
      "Join Nexxali Academy to learn industry-ready skills through structured courses and guided learning.",
    url: "https://nexxali.academy",
    siteName: "Nexxali Academy",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nexxali Academy",
    description:
      "Professional online learning platform for modern skills.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="top-center" />

      </body>
    </html>
  );
}