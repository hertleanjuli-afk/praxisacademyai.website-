"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

/* ─── Shared animation variants (Section 2.4) ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* ═══════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════ */
function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="bg-cream pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="font-body text-xs uppercase tracking-widest text-ink-muted font-medium mb-4"
        >
          {t("overline")}
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="font-display text-hero font-bold text-ink text-balance leading-tight mb-2"
        >
          {t("title")}{" "}
          <span className="italic text-accent">{t("titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="font-body text-base md:text-lg text-ink-soft font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
        >
          <Link
            href={SITE_CONFIG.calendly}
            className="inline-block bg-accent text-white px-8 py-4 rounded-lg shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors font-body font-medium text-[15px]"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICES SECTION (3 cards)
   ═══════════════════════════════════════════════════ */
function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();

  const services = [
    { key: "workshop", href: `/${locale}/workshop` },
    { key: "coaching", href: `/${locale}/coaching` },
    { key: "automatisierung", href: `/${locale}/automatisierung` },
  ] as const;

  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="font-body text-xs uppercase tracking-widest text-ink-muted font-medium mb-3 text-center"
        >
          {t("overline")}
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeUp}
          className="font-display text-3xl md:text-4xl font-bold text-ink text-center mb-14"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ key, href }, i) => (
            <motion.div
              key={key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 2}
              variants={fadeUp}
            >
              <Link href={href} className="block group">
                <div className="bg-white rounded-xl p-7 border border-ink/8 hover:-translate-y-1 hover:shadow-lg transition-all h-full">
                  <h3 className="font-display text-xl font-semibold text-ink mb-3">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="font-body text-sm text-ink-soft font-light leading-relaxed mb-5">
                    {t(`${key}.description`)}
                  </p>
                  <span className="font-body text-sm text-accent font-medium group-hover:underline">
                    {t(`${key}.cta`)} →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOR WHOM SECTION (industries)
   ═══════════════════════════════════════════════════ */
function IndustriesSection() {
  const t = useTranslations("industries");
  const items: string[] = t.raw("items");

  return (
    <section className="bg-cream py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="font-body text-xs uppercase tracking-widest text-ink-muted font-medium mb-3"
        >
          {t("overline")}
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeUp}
          className="font-display text-3xl md:text-4xl font-bold text-ink mb-12 max-w-3xl mx-auto"
        >
          {t("title")}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3">
          {items.map((item, i) => (
            <motion.span
              key={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 2}
              variants={fadeUp}
              className="font-body text-sm font-medium text-ink bg-white px-5 py-2.5 rounded-full border border-ink/8"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PROCESS SECTION (3 numbered steps)
   ═══════════════════════════════════════════════════ */
function ProcessSection() {
  const t = useTranslations("process");
  const steps = ["step1", "step2", "step3"] as const;

  return (
    <section className="bg-cream-dark py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="font-body text-xs uppercase tracking-widest text-ink-muted font-medium mb-3 text-center"
        >
          {t("overline")}
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeUp}
          className="font-display text-3xl md:text-4xl font-bold text-ink text-center mb-14"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 2}
              variants={fadeUp}
              className="bg-white rounded-xl p-7 border border-ink/8"
            >
              <span className="font-display text-4xl font-bold text-accent/20 mb-4 block">
                {t(`${step}.number`)}
              </span>
              <span className="inline-block font-body text-xs uppercase tracking-widest text-accent font-medium bg-accent-light px-3 py-1 rounded-full mb-4">
                {t(`${step}.tag`)}
              </span>
              <h3 className="font-display text-lg font-semibold text-ink mb-2">
                {t(`${step}.title`)}
              </h3>
              <p className="font-body text-sm text-ink-soft font-light leading-relaxed">
                {t(`${step}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   DARK CTA SECTION
   ═══════════════════════════════════════════════════ */
function CtaSection() {
  const t = useTranslations("ctaSection");

  return (
    <section className="bg-ink text-white py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,82,42,0.15)_0%,_transparent_70%)]" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="font-display text-3xl md:text-4xl font-bold text-white mb-4"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeUp}
          className="font-body text-base text-white/60 font-light mb-8"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          variants={fadeUp}
        >
          <Link
            href={SITE_CONFIG.calendly}
            className="inline-block bg-accent text-white px-8 py-4 rounded-lg shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors font-body font-medium text-[15px]"
          >
            {t("button")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE COMPOSITION
   ═══════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <IndustriesSection />
      <ProcessSection />
      <CtaSection />
    </main>
  );
}
