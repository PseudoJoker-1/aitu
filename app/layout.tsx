import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { LanguageProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aituevents.kz — Ивент-агентство | Организация мероприятий в Казахстане",
  description: "Aituevents.kz — агентство событийного маркетинга полного цикла. Корпоративы, конференции, свадьбы, фестивали, разработка сайтов. Астана, Алматы, Казахстан.",
  keywords: "ивент агентство, организация мероприятий, корпоратив, конференция, свадьба, фестиваль, Казахстан, Астана, Алматы, aituevents.kz, разработка сайтов",
  metadataBase: new URL("https://aituevents.kz"),
  openGraph: {
    title: "Aituevents.kz — Ивент-агентство",
    description: "Создаем незабываемые события. Корпоративы, конференции, свадьбы, фестивали.",
    url: "https://aituevents.kz",
    siteName: "Aituevents.kz",
    type: "website",
    locale: "ru_KZ",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://aituevents.kz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
