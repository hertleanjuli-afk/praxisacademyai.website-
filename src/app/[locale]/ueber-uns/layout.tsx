import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Anjuli Hertle und Samantha Meyer — die Gründerinnen von PraxisAcademy AI. Praxisnahe KI-Trainings, branchenübergreifend und bilingual.",
  alternates: {
    languages: {
      de: "/de/ueber-uns",
      en: "/en/about",
    },
  },
};

export default function UeberUnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
