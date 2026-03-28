"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* ─── Calculation logic ─── */

// Map Q3 answer index to midpoint weekly hours
const HOURS_MAP = [2.5, 7.5, 15, 30, 50];
// Estimated automation savings rate per process selected (Q4)
const BASE_RATE = 0.3; // 30% base automation
const PER_PROCESS_RATE = 0.08; // +8% per additional process
// Average hourly cost (€) for admin work in DACH region
const HOURLY_COST = 35;

function calculateResults(answers: number[][]) {
  const weeklyHours = HOURS_MAP[answers[2]?.[0] ?? 2] ?? 15;
  const processCount = answers[3]?.length ?? 1;
  const automationRate = Math.min(
    BASE_RATE + processCount * PER_PROCESS_RATE,
    0.75
  );
  const savedHoursWeek = Math.round(weeklyHours * automationRate);
  const yearlySavings = Math.round(savedHoursWeek * HOURLY_COST * 48); // 48 working weeks

  return {
    weeklyHours: savedHoursWeek,
    yearlySavings,
    automationRate: Math.round(automationRate * 100),
  };
}

export default function PotenzialrechnerPage() {
  const t = useTranslations("calculatorPage");

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[][]>([[], [], [], [], []]);
  const [showResult, setShowResult] = useState(false);

  const questions = ["q1", "q2", "q3", "q4", "q5"] as const;
  const isMultiSelect = step === 3; // Q4 is multi-select

  function selectOption(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      if (isMultiSelect) {
        const current = next[step] ?? [];
        if (current.includes(optionIndex)) {
          next[step] = current.filter((i) => i !== optionIndex);
        } else {
          next[step] = [...current, optionIndex];
        }
      } else {
        next[step] = [optionIndex];
      }
      return next;
    });
  }

  function goNext() {
    if (step < 4) setStep(step + 1);
    else setShowResult(true);
  }

  function goBack() {
    if (showResult) {
      setShowResult(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  }

  const currentAnswers = answers[step] ?? [];
  const hasAnswer = currentAnswers.length > 0;

  const result = showResult ? calculateResults(answers) : null;

  return (
    <main>
      {/* Hero */}
      <section className="bg-cream pt-28 pb-10 px-6 md:px-12">
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

      {/* Quiz */}
      <section className="bg-cream pb-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-8 border border-ink/8 shadow-sm"
              >
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-6">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i <= step ? "bg-accent" : "bg-ink/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-body text-xs text-ink-muted mb-2">
                  {step + 1} / 5
                </p>

                {/* Question */}
                <h3 className="font-display text-xl font-semibold text-ink mb-6">
                  {t(`${questions[step]}.label`)}
                </h3>

                {/* Options */}
                <div className="flex flex-col gap-2">
                  {(t.raw(`${questions[step]}.options`) as string[]).map(
                    (option, i) => {
                      const selected = currentAnswers.includes(i);
                      return (
                        <button
                          key={option}
                          onClick={() => selectOption(i)}
                          className={`text-left font-body text-sm px-4 py-3 rounded-lg border transition-all ${
                            selected
                              ? "border-accent bg-accent-light text-ink font-medium"
                              : "border-ink/10 hover:border-ink/20 text-ink-soft"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={goBack}
                    disabled={step === 0}
                    className="font-body text-sm text-ink-muted hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← {t("back")}
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!hasAnswer}
                    className="bg-accent text-white px-6 py-2.5 rounded-lg font-body font-medium text-sm shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {step < 4 ? t("next") : t("calculate")} →
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Results */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl p-8 border border-ink/8 shadow-sm"
              >
                <h3 className="font-display text-2xl font-bold text-ink text-center mb-8">
                  {t("resultTitle")}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <p className="font-display text-4xl font-bold text-accent mb-1">
                      {result!.weeklyHours}h
                    </p>
                    <p className="font-body text-xs text-ink-muted">{t("weeklyHours")}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-4xl font-bold text-accent mb-1">
                      €{result!.yearlySavings.toLocaleString("de-DE")}
                    </p>
                    <p className="font-body text-xs text-ink-muted">{t("yearlySavings")}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-4xl font-bold text-accent mb-1">
                      {result!.automationRate}%
                    </p>
                    <p className="font-body text-xs text-ink-muted">{t("automationRate")}</p>
                  </div>
                </div>

                <p className="font-body text-xs text-ink-muted text-center mb-8">
                  {t("disclaimer")}
                </p>

                <div className="flex flex-col items-center gap-4">
                  <Link
                    href={SITE_CONFIG.calendly}
                    className="inline-block bg-accent text-white px-8 py-4 rounded-lg shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors font-body font-medium text-[15px]"
                  >
                    {t("resultCta")}
                  </Link>
                  <button
                    onClick={goBack}
                    className="font-body text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    ← {t("back")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
