"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

const links = [
  { key: "workshop", href: "/workshop" },
  { key: "coaching", href: "/coaching" },
  { key: "automatisierung", href: "/automatisierung" },
] as const;

export default function SubpageNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="bg-cream-dark border-b border-ink/8">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex items-center gap-2 text-sm font-body">
        <span className="text-ink-muted text-xs mr-1">
          {locale === "de" ? "Unsere Angebote:" : "Our Services:"}
        </span>
        {links.map(({ key, href }, i) => {
          const fullHref = `/${locale}${href}`;
          const isActive = pathname === fullHref;
          return (
            <span key={key} className="flex items-center gap-2">
              {i > 0 && <span className="text-ink/20">|</span>}
              <Link
                href={fullHref}
                className={`transition-colors ${
                  isActive
                    ? "text-accent font-medium"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {t(key)}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
