import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";

// English display font — same Parisian high-contrast DNA as GL Parizuli
const cormorant = Cormorant_Garamond({
  variable: "--font-display-en",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Orabora — Begin Your Cycle",
  description:
    "Orabora is a transformative learning community built on destruction, unlocking, iteration, and the eternal return. Two Paths: The Art of the Pour and Build from Nothing.",
  openGraph: {
    title: "Orabora — Begin Your Cycle",
    description: "Transformative education for those ready to shed what they were.",
    siteName: "Orabora",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" className={`${cormorant.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('ou-theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();` }} />
        <Script id="lang-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `(function(){var l=localStorage.getItem('ou-lang')||'ka';document.documentElement.lang=l;})();` }} />
        <ThemeProvider>
          <LanguageProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
