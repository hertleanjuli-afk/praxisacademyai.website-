"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const nextLocale = locale === "de" ? "en" : "de";
    // Replace the current locale prefix with the new one
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 border border-ink/15 rounded-lg px-3 py-1.5 text-sm font-body font-medium text-ink hover:border-ink/30 transition-colors"
      aria-label={locale === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
    >
      <span className={locale === "de" ? "font-bold" : "text-ink-muted"}>DE</span>
      <span className="text-ink-muted">/</span>
      <span className={locale === "en" ? "font-bold" : "text-ink-muted"}>EN</span>
    </button>
  );
}
