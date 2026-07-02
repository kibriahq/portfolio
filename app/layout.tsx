import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kibria | Full Stack Developer (Next.js, React, Node.js & Laravel)",
  description: "Full-stack developer building fast, scalable web applications with Next.js, React, Node.js, Laravel, Supabase, MySQL, PostgreSQL & MongoDB.",
  authors: [{ name: "Kibria" }],
  keywords: ["Full Stack Developer", "React", "Next.js", "Laravel", "Node.js", "Portfolio", "Web Developer", "Create Website", "React developer", "Next js developer", "Laravel developer", "Node js developer", "Software Engineer", "MERN Stack Developer"]
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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Geist:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
      <body className="text-on-background selection:bg-primary selection:text-on-primary">{children}</body>
    </html>
  );
}
