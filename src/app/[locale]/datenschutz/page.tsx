import { useTranslations } from "next-intl";
import { SITE_CONFIG } from "@/config/site";

export default function DatenschutzPage() {
  const t = useTranslations("datenschutzPage");

  const sections = ["s1", "s2", "s3", "s4", "s5", "s6", "s7"] as const;

  return (
    <main className="bg-cream pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-8">
          {t("title")}
        </h1>

        <div className="space-y-8 font-body text-sm text-ink-soft font-light leading-relaxed">
          {sections.map((s) => (
            <section key={s}>
              <h2 className="font-display text-xl font-semibold text-ink mb-2">
                {t(`${s}Title`)}
              </h2>
              <p>{t(`${s}Text`)}</p>
            </section>
          ))}

          <section className="border-t border-ink/10 pt-8">
            <p>
              {SITE_CONFIG.name} — <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent hover:text-accent-hover transition-colors">{SITE_CONFIG.email}</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
