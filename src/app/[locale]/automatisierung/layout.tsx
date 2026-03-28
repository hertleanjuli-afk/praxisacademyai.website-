import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Automatisierung",
  description:
    "Projektbasierte KI-Automatisierung Ihrer Geschäftsprozesse. Individuell, ohne monatliche Retainer. 25% Pilot-Rabatt.",
  alternates: {
    languages: {
      de: "/de/automatisierung",
      en: "/en/automatisierung",
    },
  },
};

export default function AutomatisierungLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
