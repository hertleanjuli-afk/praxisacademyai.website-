import { useTranslations } from "next-intl";
import { SITE_CONFIG } from "@/config/site";

export default function ImpressumPage() {
  const t = useTranslations("impressumPage");

  return (
    <main className="bg-cream pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-8">
          {t("title")}
        </h1>

        <div className="space-y-8 font-body text-sm text-ink-soft font-light leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-2">
              {t("company")}
            </h2>
            <p>{t("represented")}: {t("founders")}</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-2">
              {t("contact")}
            </h2>
            <p>E-Mail: <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent hover:text-accent-hover transition-colors">{SITE_CONFIG.email}</a></p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-2">
              {t("disclaimer")}
            </h2>
            <p>{t("disclaimerText")}</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-2">
              {t("copyright")}
            </h2>
            <p>{t("copyrightText")}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
