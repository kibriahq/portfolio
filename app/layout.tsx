import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalSchema from "@/components/schemas/GlobalSchema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kibria.dev"),
  title: {
    default: "Md Kibria | Full Stack Developer",
    template: "%s | Md Kibria",
  },
  description:
    "Full Stack Developer specializing in Next.js, React, Node.js, and Laravel. Building fast, scalable web applications with modern technologies.",
  authors: [{ name: "Md Kibria" }],
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Laravel",
    "Node.js",
    "Portfolio",
    "Web Developer",
    "Create Website",
    "React developer",
    "Next js developer",
    "Laravel developer",
    "Node js developer",
    "Software Engineer",
    "MERN Stack Developer",
  ],
  creator: "Md Kibria",
  alternates: {
    canonical: "https://kibria.dev",
  },
  openGraph: {
    title: "Md Kibria | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, Node.js, and Laravel. Building fast, scalable web applications with modern technologies.",
    url: "https://kibria.dev",
    siteName: "Md Kibria",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Md Kibria - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Kibria | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, Node.js, and Laravel. Building fast, scalable web applications with modern technologies.",
    images: ["/og.png"],
    creator: "@kibria_dev",
  },
  // verification: {
  //   google: "google-site-verification",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GlobalSchema />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Geist:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet"
      />
      <body className="text-on-background selection:bg-primary selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
