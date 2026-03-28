"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import PricingCard from "@/components/PricingCard";
import { SITE_CONFIG } from "@/config/site";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const p = SITE_CONFIG.produkte.workshop;

export default function WorkshopPage() {
  const t = useTranslations("workshopPage");

  return (
    <main>
      {/* Hero */}
      <section className="bg-cream pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial="hidden" animate="visible" custom={0} variants={fadeUp}
            className="font-body text-xs uppercase tracking-widest text-ink-muted font-medium mb-4"
          >
            {t("overline")}
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display text-hero font-bold text-ink text-balance leading-tight mb-4"
          >
            {t("title")}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="font-body text-base md:text-lg text-ink-soft font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-3xl font-bold text-ink text-center mb-14"
          >
            {t("modulesTitle")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basis */}
            <PricingCard
              title={t("basis.title")}
              subtitle={t("basis.duration")}
              pilotPrice={p.pilot}
              regularPrice={p.regular}
              features={t.raw("basis.features")}
              animationIndex={1}
            />

            {/* Deep-Dive */}
            <PricingCard
              title={t("deepDive.title")}
              subtitle={t("deepDive.duration")}
              pilotPrice={p.pilot}
              regularPrice={p.regular}
              features={t.raw("deepDive.features")}
              animationIndex={2}
            />

            {/* Paket — Featured */}
            <PricingCard
              title={t("paket.title")}
              subtitle={t("paket.duration")}
              pilotPrice={p.paketPilot}
              regularPrice={p.paketRegular}
              features={t.raw("paket.features")}
              badge={t("paket.badge")}
              popular={true}
              animationIndex={3}
            />
          </div>

          {/* Notes */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4} variants={fadeUp}
            className="mt-10 text-center"
          >
            <p className="font-body text-xs text-ink-muted mb-2">
              {t("pilotNote")}
            </p>
            <div className="mt-6 p-4 bg-cream rounded-xl inline-block">
              <p className="font-body text-sm font-medium text-ink mb-1">{t("perPersonTitle")}</p>
              <p className="font-body text-xs text-ink-soft">{t("perPersonNote")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,82,42,0.15)_0%,_transparent_70%)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}>
            <Link
              href={SITE_CONFIG.calendly}
              className="inline-block bg-accent text-white px-8 py-4 rounded-lg shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors font-body font-medium text-[15px]"
            >
              {t("cta")}
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
