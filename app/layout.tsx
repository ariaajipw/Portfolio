import type { Metadata } from "next";
import {JetBrains_Mono } from "next/font/google";

import "./globals.css";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

const jetbrainsMono = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ariaaji.com"),

  title: {
    default: "Aria Aji — Frontend Developer",
    template: "%s | Aria Aji",
  },

  description:
    "Portofolio resmi Aria Aji, Frontend Developer asal Bandung. Spesialis Next.js, React, TypeScript, dan pembuatan aplikasi web performa tinggi.",

  keywords: [
    "Aria Aji",
    "Aria Aji Perkasa Wibowo",
    "ariaaji",
    "aria aji",
    "Rajipo",
    "Frontend Developer Bandung",
    "Front-end Developer",
    "Frontend Developer Indonesia",
    "Next.js Developer",
    "Vite Developer",
    "React Developer",
    "Web Developer Bandung",
    "Jasa Bikin Website",
    "Shopify Developer",
  ],

  authors: [
    {
      name: "Aria Aji",
      url: "https://ariaaji.com",
    },
  ],

  creator: "Aria Aji",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Aria Aji — Frontend Developer",
    description:
      "Portofolio resmi Aria Aji, Frontend Developer asal Bandung. Spesialis Next.js, React, dan web performa tinggi.",
    url: "https://ariaaji.com",
    siteName: "Aria Aji Portfolio",
    locale: "id_ID",
    type: "website",

    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Aria Aji — Frontend Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aria Aji — Frontend Developer",
    description:
      "Portofolio resmi Aria Aji, Frontend Developer asal Bandung.",
    images: ["/og-image.webp"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const themeScript = `
(function () {
  try {
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (savedTheme === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  } catch (error) {
    // Ignore localStorage errors.
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
  
    name: "Aria Aji",
  
    url: "https://ariaaji.com",
  
    jobTitle: "Frontend Developer",
  
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bandung",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
  
    sameAs: [
      "https://github.com/ariaajipw",
      "https://www.linkedin.com/in/aria-aji-627668156/",
      "https://x.com/ariaajipw",
      "https://www.instagram.com/ariaaji/",
    ],
  
    knowsAbout: [
      "Frontend Development",
      "Frontend Developer",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Web Development",
    ],
  };
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body
        className={`${jetbrainsMono.className} flex min-h-dvh flex-col`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Header />

        <main className="w-full min-w-0 flex-1 overflow-x-clip">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}