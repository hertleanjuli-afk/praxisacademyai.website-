"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import PricingCard from "@/components/PricingCard";
import SubpageNav from "@/components/SubpageNav";
import { SITE_CONFIG } from "@/config/site";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const c = SITE_CONFIG.produkte.coaching;

export default function CoachingPage() {
  const t = useTranslations("coachingPage");
  const tCommon = useTranslations("common");

  const flowSteps = ["step1", "step2", "step3"] as const;

  return (
    <main>
      <SubpageNav />
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

      {/* How It Works (3 flow steps) */}
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-3xl font-bold text-ink text-center mb-14"
          >
            {t("flowTitle")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flowSteps.map((step, i) => (
              <motion.div
                key={step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fadeUp}
                className="bg-cream rounded-xl p-7 border border-ink/8 text-center"
              >
                <span className="inline-block w-10 h-10 rounded-full bg-accent text-white font-body font-medium text-sm leading-10 mb-4">
                  {i + 1}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink mb-2">
                  {t(`flow.${step}.title`)}
                </h3>
                <p className="font-body text-sm text-ink-soft font-light leading-relaxed">
                  {t(`flow.${step}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 60-Min Pricing */}
      <section className="bg-cream py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-2xl md:text-3xl font-bold text-ink text-center mb-10"
          >
            {t("s60Title")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCard
              title={t("einzelsession")}
              subtitle="60 Min"
              pilotPrice={c.s60.pilot}
              regularPrice={c.s60.regular}
              animationIndex={1}
            />
            <PricingCard
              title={t("paket5")}
              subtitle="5 × 60 Min"
              regularPrice={c.s60.paket5}
              perSession={`${tCommon("proSession")}: €258`}
              discount="11% Rabatt"
              animationIndex={2}
            />
            <PricingCard
              title={t("paket10")}
              subtitle="10 × 60 Min"
              regularPrice={c.s60.paket10}
              perSession={`${tCommon("proSession")}: €199`}
              discount="31% Rabatt"
              popular={true}
              badge={tCommon("beliebteste")}
              animationIndex={3}
            />
          </div>
        </div>
      </section>

      {/* 90-Min Pricing */}
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-2xl md:text-3xl font-bold text-ink text-center mb-10"
          >
            {t("s90Title")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCard
              title={t("einzelsession")}
              subtitle="90 Min"
              pilotPrice={c.s90.pilot}
              regularPrice={c.s90.regular}
              animationIndex={1}
            />
            <PricingCard
              title={t("paket5")}
              subtitle="5 × 90 Min"
              regularPrice={c.s90.paket5}
              perSession={`${tCommon("proSession")}: €318`}
              discount="18% Rabatt"
              animationIndex={2}
            />
            <PricingCard
              title={t("paket10")}
              subtitle="10 × 90 Min"
              regularPrice={c.s90.paket10}
              perSession={`${tCommon("proSession")}: €249`}
              discount="36% Rabatt"
              popular={true}
              badge={tCommon("bestesAngebot")}
              animationIndex={3}
            />
          </div>

          {/* Pilot note */}
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4} variants={fadeUp}
            className="font-body text-xs text-ink-muted text-center mt-10"
          >
            {t("pilotNote")}
          </motion.p>
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
