import type { Metadata } from "next";
import { Montserrat_Alternates, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

const jetbrainsMono = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const montserratAlternates = Montserrat_Alternates({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montserrat-alternates",
  display: "swap",
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
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${montserratAlternates.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body
        className={`${jetbrainsMono.className} flex min-h-dvh flex-col`}
        suppressHydrationWarning
      >
        <Header />

        <main className="w-full min-w-0 flex-1 overflow-x-clip">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}