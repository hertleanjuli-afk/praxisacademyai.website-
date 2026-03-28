import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1:1 KI-Coaching",
  description:
    "Individuelles KI-Coaching per Zoom. 60- oder 90-Minuten Sessions, flexibel als Einzel- oder Paketpreis buchbar.",
  alternates: {
    languages: {
      de: "/de/coaching",
      en: "/en/coaching",
    },
  },
};

export default function CoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
