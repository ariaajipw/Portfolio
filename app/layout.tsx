import type { Metadata } from "next";
import { Montserrat_Alternates, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const montserratAlternates = Montserrat_Alternates({
  weight: "400",
  subsets: ["latin"],
});

const jetbrains_mono = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aria Aji",
  description: "Portfolio",
};

const themeScript = `
(function () {
  try {
    const savedTheme = localStorage.getItem("theme");

    const isDark =
      savedTheme === "dark" ||
      (
        savedTheme === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );

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
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={jetbrainsMono.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body
        className={`${jetbrains_mono.className} ${montserratAlternates.className}`}
        suppressHydrationWarning
      >
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
