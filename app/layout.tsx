import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalSchema from "@/components/schemas/GlobalSchema";
import Cursor from "@/components/Cursor";

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
    "Building fast, scalable web applications using Next.js, React, Node.js, Laravel, Supabase, MySQL, PostgreSQL, and MongoDB.",
  authors: [{ name: "Md Kibria" }],
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
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
      "Building fast, scalable web applications using Next.js, React, Node.js, Laravel, Supabase, MySQL, PostgreSQL, and MongoDB.",
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
      "Building fast, scalable web applications using Next.js, React, Node.js, Laravel, Supabase, MySQL, PostgreSQL, and MongoDB.",
    images: ["/og.png"],
    creator: "@kibria_dev",
  },
  // verification: {
  //   google: "google-site-verification",
  // },
};

// Runs before hydration to apply the saved theme and avoid a flash of the
// wrong theme. Dark is the default; only the `.light` class is toggled.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var isLight = stored ? stored === 'light' : prefersLight;
    if (isLight) document.documentElement.classList.add('light');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <GlobalSchema />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
