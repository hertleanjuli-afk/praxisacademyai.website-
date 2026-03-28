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

function TeamCard({
  initials,
  name,
  role,
  bio,
  index,
}: {
  initials: string;
  name: string;
  role: string;
  bio: string;
  index: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      variants={fadeUp}
      className="bg-cream rounded-2xl p-8 border border-ink/8"
    >
      <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center font-display text-xl font-bold mb-5">
        {initials}
      </div>
      <h3 className="font-display text-xl font-semibold text-ink mb-1">{name}</h3>
      <p className="font-body text-sm text-accent font-medium mb-3">{role}</p>
      <p className="font-body text-sm text-ink-soft font-light leading-relaxed">{bio}</p>
    </motion.div>
  );
}

export default function UeberUnsPage() {
  const t = useTranslations("aboutPage");
  const values: { title: string; description: string }[] = t.raw("values");

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

      {/* Team */}
      <section className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-3xl font-bold text-ink text-center mb-14"
          >
            {t("teamTitle")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamCard
              initials="AH"
              name={t("anjuli.name")}
              role={t("anjuli.role")}
              bio={t("anjuli.bio")}
              index={1}
            />
            <TeamCard
              initials="SM"
              name={t("samantha.name")}
              role={t("samantha.role")}
              bio={t("samantha.bio")}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-dark py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-3xl font-bold text-ink text-center mb-14"
          >
            {t("valuesTitle")}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fadeUp}
                className="bg-white rounded-xl p-7 border border-ink/8"
              >
                <h3 className="font-display text-lg font-semibold text-ink mb-2">{v.title}</h3>
                <p className="font-body text-sm text-ink-soft font-light leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sister Company */}
      <section className="bg-cream py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display text-xl font-semibold text-ink mb-3"
          >
            {t("sisterTitle")}
          </motion.h3>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="font-body text-sm text-ink-soft font-light leading-relaxed mb-5"
          >
            {t("sisterText")}
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
            <a
              href={SITE_CONFIG.sister.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-ink/15 text-ink px-6 py-3 rounded-lg font-body font-medium text-sm hover:border-ink/30 transition-colors"
            >
              {t("sisterCta")} →
            </a>
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
            {t("cta")}
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}>
            <Link
              href={SITE_CONFIG.calendly}
              className="inline-block bg-accent text-white px-8 py-4 rounded-lg shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors font-body font-medium text-[15px]"
            >
              Erstgespräch buchen
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
