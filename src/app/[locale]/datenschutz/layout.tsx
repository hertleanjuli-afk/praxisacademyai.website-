import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von PraxisAcademy AI. Informationen zur Datenverarbeitung gemäß DSGVO.",
  alternates: {
    languages: {
      de: "/de/datenschutz",
      en: "/en/privacy",
    },
  },
};

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
