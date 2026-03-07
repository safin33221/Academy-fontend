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
    default: "Nexaali Academy | Learn Modern Tech Skills Online",
    template: "%s | Nexaali Academy",
  },

  description:
    "Nexaali Academy is a modern e-learning platform providing industry-ready courses, structured batch learning, mentorship, and practical training to build real-world tech skills.",

  keywords: [
    "Nexaali Academy",
    "Online programming courses",
    "Web development course",
    "Next.js course",
    "Full stack development",
    "Tech learning platform",
    "Programming academy",
    "Software development training",
    "Professional skill development",
    "Batch based learning",
  ],

  authors: [{ name: "Nexaali Academy Team" }],
  creator: "Nexaali Academy",
  publisher: "Nexaali Academy",
  category: "Education",

  alternates: {
    canonical: "https://nexaali.academy",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Nexaali Academy | Learn Modern Tech Skills Online",
    description:
      "Join Nexaali Academy to learn modern development skills through structured courses, guided batches, and real-world projects.",
    url: "https://nexaali.academy",
    siteName: "Nexaali Academy",
    images: [
      {
        url: "https://nexaali.academy/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexaali Academy E-learning Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nexaali Academy | Learn Modern Tech Skills",
    description:
      "Professional online learning platform for developers and modern tech skills.",
    images: ["https://nexaali.academy/og-image.png"],
    creator: "@nexaali",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  // verification: {
  //   google: "google-site-verification-code",
  // },
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