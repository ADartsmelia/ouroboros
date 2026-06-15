"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OuroborosSVG from "@/components/OuroborosSVG";
import { useLang } from "@/components/LanguageProvider";

const questionMeta = [
  { id: "path", type: "radio" as const, optionValues: ["pour", "build", "unsure"] },
  { id: "why", type: "textarea" as const, optionValues: [] },
  { id: "evidence", type: "textarea" as const, optionValues: [] },
  { id: "commitment", type: "textarea" as const, optionValues: [] },
  { id: "readiness", type: "radio" as const, optionValues: ["cycle9", "cycle10", "notify"] },
];

export default function ApplyPage() {
  const { tr } = useLang();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const questions = questionMeta.map((meta, i) => {
    const text = tr.apply.questions[i];
    return {
      id: meta.id,
      type: meta.type,
      label: text.label,
      sublabel: text.sublabel || undefined,
      placeholder: text.placeholder || undefined,
      options:
        meta.type === "radio"
          ? meta.optionValues.map((value, j) => ({
              value,
              label: text.options[j].label,
              sub: text.options[j].sub,
            }))
          : undefined,
    };
  });

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const canAdvance = answers[q.id] && answers[q.id].trim().length > 0;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ background: "var(--bg-primary)" }} className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center"
        >
          <div className="flex justify-center mb-10">
            <div className="animate-ouroboros">
              <OuroborosSVG size={120} glowing />
            </div>
          </div>
          <p className="section-label">{tr.apply.successLabel}</p>
          <h1 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            {tr.apply.successH1}<br />
            <span className="gradient-text">{tr.apply.successH1b}</span>
          </h1>
          <div className="divider" />
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
            {tr.apply.successBody}
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {tr.apply.successMetaPre}{" "}
            <a href="/about" style={{ color: "var(--accent-gold)" }}>{tr.apply.successMetaLink1}</a>{" "}
            {tr.apply.successMetaMid}{" "}
            <a href="/stories" style={{ color: "var(--accent-gold)" }}>{tr.apply.successMetaLink2}</a>.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* HERO */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(74, 140, 92, 0.07) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-2xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label">
            {tr.apply.heroLabel}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold leading-[0.92] tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            {tr.apply.heroH1}<br />
            <span className="gradient-text">{tr.apply.heroH1b}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {tr.apply.heroBody}
          </motion.p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16 px-6 pb-32">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between mb-3">
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                {tr.apply.questionOf} {current + 1} {tr.apply.questionMid} {questions.length}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {Math.round(((current + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-px" style={{ background: "var(--border-subtle)" }}>
              <motion.div
                className="h-px"
                style={{ background: "var(--accent-gold)" }}
                animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                {q.label}
              </h2>
              {q.sublabel && (
                <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
                  {q.sublabel}
                </p>
              )}
              {!q.sublabel && <div className="mb-8" />}

              {q.type === "radio" && (
                <div className="flex flex-col gap-3">
                  {q.options?.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.value }))}
                      className="text-left p-5 border transition-all duration-200"
                      style={{
                        borderColor: answers[q.id] === opt.value ? "var(--border-glow)" : "var(--border-subtle)",
                        background: answers[q.id] === opt.value ? "rgba(74, 140, 92, 0.07)" : "var(--bg-card)",
                        boxShadow: answers[q.id] === opt.value ? "var(--glow-green)" : "none",
                      }}
                    >
                      <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{opt.label}</p>
                      {opt.sub && (
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{opt.sub}</p>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {q.type === "textarea" && (
                <textarea
                  value={answers[q.id] || ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                  placeholder={q.placeholder}
                  rows={5}
                  className="w-full p-5 text-sm resize-none"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                    outline: "none",
                    lineHeight: "1.7",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--border-glow)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Email (last step only) */}
          {isLast && canAdvance && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <label className="section-label block mb-3">{tr.apply.emailLabel}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-5 py-4 text-sm"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--border-glow)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
              />
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            {current > 0 ? (
              <button
                onClick={() => setCurrent((c) => c - 1)}
                className="text-sm tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                {tr.apply.back}
              </button>
            ) : (
              <div />
            )}
            {isLast ? (
              <button
                onClick={handleSubmit}
                disabled={!canAdvance || !email}
                className="btn-primary text-sm"
                style={{ opacity: !canAdvance || !email ? 0.4 : 1 }}
              >
                {tr.apply.submit}
              </button>
            ) : (
              <button
                onClick={() => setCurrent((c) => c + 1)}
                disabled={!canAdvance}
                className="btn-primary text-sm"
                style={{ opacity: !canAdvance ? 0.4 : 1 }}
              >
                {tr.apply.continue}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* NOTE */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 border-l-2" style={{ borderColor: "var(--accent-gold)", background: "rgba(201, 168, 76, 0.04)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>{tr.apply.noteStrong}</strong> {tr.apply.noteBody}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
