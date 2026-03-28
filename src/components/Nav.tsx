"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LocaleSwitcher from "./LocaleSwitcher";
import { SITE_CONFIG } from "@/config/site";

const navLinks = [
  { key: "workshop", href: "/workshop" },
  { key: "coaching", href: "/coaching" },
  { key: "automatisierung", href: "/automatisierung" },
  { key: "ueberUns", href: "/ueber-uns" },
  { key: "potenzialrechner", href: "/potenzialrechner" },
] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/80 backdrop-blur-lg border-b border-ink/8 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16">
        {/* Logo / Brand */}
        <Link
          href={`/${locale}`}
          className="font-display text-lg font-bold text-ink hover:text-accent transition-colors"
        >
          {SITE_CONFIG.name}
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={`/${locale}${href}`}
              className="font-body text-sm text-ink-soft hover:text-ink transition-colors"
            >
              {t(key)}
            </Link>
          ))}
        </div>

        {/* Desktop Right: Locale + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <LocaleSwitcher />
          <Link
            href={SITE_CONFIG.calendly}
            className="bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-body font-medium shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors"
          >
            {t("erstgespraech")}
          </Link>
        </div>

        {/* Mobile: Locale + Hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <LocaleSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-ink origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-ink"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-ink origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-cream/95 backdrop-blur-lg border-b border-ink/8 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-base text-ink-soft hover:text-ink transition-colors py-1"
                >
                  {t(key)}
                </Link>
              ))}
              <Link
                href={SITE_CONFIG.calendly}
                onClick={() => setMobileOpen(false)}
                className="mt-2 bg-accent text-white px-6 py-3 rounded-lg text-center font-body font-medium shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors"
              >
                {t("erstgespraech")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
