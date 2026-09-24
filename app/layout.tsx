import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Montserrat_Alternates, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const montserrat_alternates = Montserrat_Alternates({
  weight: '400',
  subsets: ['latin'],
});

const jetbrains_mono = JetBrains_Mono({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Aria Aji",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const isDark = localStorage.theme === 'dark' || 
                            (!('theme' in localStorage) && 
                            window.matchMedia('(prefers-color-scheme: dark)').matches);
              document.documentElement.classList.toggle('dark', isDark);
            } catch (e) {}
          `
        }} />
      </head>
      {/* <body
        className={`${montserrat_alternates.className} antialiased`}
      > */}
      <body className={`${jetbrains_mono.className} bg-[#EDDBB5] text-[#488067] dark:bg-[#1B3E5C] dark:text-[#F2B138]`}
        suppressHydrationWarning>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
