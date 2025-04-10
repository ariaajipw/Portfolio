import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

const montserrat_alternates = Montserrat_Alternates({
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
    <html lang="en" suppressHydrationWarning>
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
      <body className={`${montserrat_alternates.className} bg-white dark:bg-zinc-950 text-gray-900 dark:text-white`}>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
