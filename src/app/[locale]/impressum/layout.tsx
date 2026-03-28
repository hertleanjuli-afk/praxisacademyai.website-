import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Angaben von PraxisAcademy AI.",
  alternates: {
    languages: {
      de: "/de/impressum",
      en: "/en/legal-notice",
    },
  },
};

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
