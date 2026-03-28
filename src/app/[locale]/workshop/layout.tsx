import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Workshops",
  description:
    "Modulare KI-Workshops für Teams bis 12 Teilnehmer. Basis, Deep-Dive oder Komplett-Paket — praxisnah und auf Ihre Aufgaben zugeschnitten.",
  alternates: {
    languages: {
      de: "/de/workshop",
      en: "/en/workshop",
    },
  },
};

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
