"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function AutomatisierungPage() {
  const t = useTranslations("automationPage");

  const steps = ["step1", "step2", "step3"] as const;
  const useCases: { title: string; description: string }[] = t.raw("useCases");
  const tools: string[] = t.raw("tools");

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

      {/* 3-Step Process */}
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-3xl font-bold text-ink text-center mb-14"
          >
            {t("processTitle")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fadeUp}
                className="bg-cream rounded-xl p-7 border border-ink/8 relative"
              >
                <span className="font-display text-4xl font-bold text-accent/20 block mb-2">
                  0{i + 1}
                </span>
                <span className="inline-block font-body text-xs uppercase tracking-widest text-accent font-medium bg-accent-light px-3 py-1 rounded-full mb-4">
                  {t(`${step}.price`)}
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

      {/* 6 Use Case Cards */}
      <section className="bg-cream-dark py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-3xl font-bold text-ink text-center mb-14"
          >
            {t("useCasesTitle")}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fadeUp}
                className="bg-white rounded-xl p-7 border border-ink/8 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <h3 className="font-display text-lg font-semibold text-ink mb-2">
                  {uc.title}
                </h3>
                <p className="font-body text-sm text-ink-soft font-light leading-relaxed">
                  {uc.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools + Pilot Note */}
      <section className="bg-cream py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-xl font-semibold text-ink mb-6"
          >
            {t("toolsTitle")}
          </motion.h3>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {tools.map((tool) => (
              <span
                key={tool}
                className="font-body text-sm font-medium text-ink bg-white px-5 py-2.5 rounded-full border border-ink/8"
              >
                {tool}
              </span>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="inline-block bg-accent-light text-accent font-body text-sm font-medium px-6 py-3 rounded-xl"
          >
            {t("pilotNote")}
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
