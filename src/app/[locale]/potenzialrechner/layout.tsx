import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Potenzialrechner",
  description:
    "Berechnen Sie in 2 Minuten, wie viel Zeit und Geld KI Ihrem Unternehmen sparen kann. Kostenloser ROI-Rechner.",
  alternates: {
    languages: {
      de: "/de/potenzialrechner",
      en: "/en/roi-calculator",
    },
  },
};

export default function PotenzialrechnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
