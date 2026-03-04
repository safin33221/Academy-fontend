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
  metadataBase: new URL("https://nexaali.academy"),

  title: {
    default: "Nexaali Academy | Modern E-Learning Platform",
    template: "%s | nexaali Academy",
  },

  description:
    "Nexaali Academy is a modern e-learning platform offering professional courses, structured batches, and industry-ready skills development.",

  keywords: [
    "Nexaali Academy",
    "E-learning platform",
    "Online courses",
    "Professional training",
    "Skill development",
    "Batch based learning",
  ],

  authors: [{ name: "nexaali Academy Team" }],

  openGraph: {
    title: "nexaali Academy | Modern E-Learning Platform",
    description:
      "Join nexaali Academy to learn industry-ready skills through structured courses and guided learning.",
    url: "https://nexaali.academy",
    siteName: "nexaali Academy",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "nexaali Academy",
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