import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <p className="font-display text-xl font-bold mb-3">
              {SITE_CONFIG.name}
            </p>
            <p className="font-body text-sm text-white/60 font-light leading-relaxed">
              {t("description")}
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-block mt-4 font-body text-sm text-accent hover:text-accent-hover transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          {/* Column 2: Services */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-white/40 font-medium mb-4">
              {t("leistungen")}
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                href={`/${locale}/workshop`}
                className="font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                {tNav("workshop")}
              </Link>
              <Link
                href={`/${locale}/coaching`}
                className="font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                {tNav("coaching")}
              </Link>
              <Link
                href={`/${locale}/automatisierung`}
                className="font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                {tNav("automatisierung")}
              </Link>
              <Link
                href={`/${locale}/potenzialrechner`}
                className="font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                {tNav("potenzialrechner")}
              </Link>
            </div>
          </div>

          {/* Column 3: Legal + Sister */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-white/40 font-medium mb-4">
              {t("rechtliches")}
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                href={`/${locale}/impressum`}
                className="font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                {t("impressum")}
              </Link>
              <Link
                href={`/${locale}/datenschutz`}
                className="font-body text-sm text-white/70 hover:text-white transition-colors"
              >
                {t("datenschutz")}
              </Link>
            </div>

            {/* Sister Company */}
            <p className="font-body text-xs uppercase tracking-widest text-white/40 font-medium mt-8 mb-3">
              {t("sister")}
            </p>
            <a
              href={SITE_CONFIG.sister.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-accent hover:text-accent-hover transition-colors"
            >
              {SITE_CONFIG.sister.name} →
            </a>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            {t("copyright", { year })}
          </p>
          {SITE_CONFIG.social.linkedin !== "PLACEHOLDER_LINKEDIN_URL" && (
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-white/40 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
