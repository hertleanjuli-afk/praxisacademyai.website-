import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { SITE_CONFIG } from "@/config/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup";
import CookieBanner from "@/components/CookieBanner";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const baseUrl = `https://www.${SITE_CONFIG.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "PraxisAcademy AI | KI-Schulung, Coaching & Automatisierung",
    template: "%s | PraxisAcademy AI",
  },
  description:
    "Praxisnahe KI-Workshops, 1:1 Coaching und Automatisierung für jede Branche. Bilingual DE/EN.",
  openGraph: {
    locale: "de_DE",
    type: "website",
    siteName: "PraxisAcademy AI",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      de: `${baseUrl}/de`,
      en: `${baseUrl}/en`,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PraxisAcademy AI",
  url: baseUrl,
  email: SITE_CONFIG.email,
  founder: ["Anjuli Hertle", "Samantha Meyer"],
  areaServed: ["DE", "AT", "CH", "GB", "US"],
  knowsLanguage: ["de", "en"],
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-cream text-ink">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
          <Popup />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
