import type { Metadata, Viewport } from "next";
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

/*
 * Light mode situs TIDAK boleh dibalik oleh Chrome ("Darken websites" / Auto
 * Dark Mode). Mode gelap hanya dari toggle situs (class `dark`), yang di
 * globals.css memasang `color-scheme: dark` dan menang atas meta ini.
 */
export const viewport: Viewport = {
  colorScheme: "only light",
};

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

/*
 * Default SELALU light. Dark hanya kalau pengunjung pernah menekan toggle
 * (tersimpan "dark" di localStorage). Pengaturan tema HP/OS sengaja tidak
 * dipakai, supaya palet light tidak berubah sendiri.
 */
const themeScript = `
(function () {
  var isDark = false;
  try {
    isDark = localStorage.getItem("theme") === "dark";
  } catch (error) {
    // localStorage tidak tersedia -> tetap light.
  }
  document.documentElement.classList.toggle("dark", isDark);
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