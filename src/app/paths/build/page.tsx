"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronDown, Check, ArrowRight, Zap } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function BuildPathPage() {
  const { tr } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(0);

  const modules = tr.build.modules;
  const faqs = tr.build.faqs;
  const stack = tr.build.stack;

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(74, 140, 92, 0.1) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5"
            style={{
              background: "rgba(74, 140, 92, 0.1)",
              border: "1px solid var(--border-glow)",
            }}
          >
            <Zap size={12} style={{ color: "var(--accent-green-bright)" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--accent-green-bright)" }}>
              {tr.build.badge}
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label"
          >
            {tr.build.heroLabel}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl sm:text-7xl font-bold leading-[0.92] tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            {tr.build.h1}
            {tr.build.h1b && (
              <><br /><span className="gradient-text">{tr.build.h1b}</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-xl leading-relaxed mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            {tr.build.heroBody}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <span className="btn-primary animate-breathe opacity-50 cursor-not-allowed pointer-events-none">
              {tr.build.heroBtn}
            </span>
            <div className="flex items-center gap-6">
              {tr.build.stats.map(([n, l]) => (
                <div key={l}>
                  <p className="text-2xl font-bold gradient-text">{n}</p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO IT'S FOR + PRICING */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <p className="section-label">{tr.build.whoLabel}</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              {tr.build.whoH2}<br />
              <span className="gradient-text">{tr.build.whoH2b}</span>
            </h2>
            <div className="flex flex-col gap-3 mt-6">
              {tr.build.whoItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-green-bright)" }} />
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="section-label">{tr.build.pricingLabel}</p>
            <div className="card-glow p-8" style={{ background: "var(--bg-card)" }}>
              <div className="mb-6">
                <p className="text-5xl font-bold gradient-text">{tr.build.price}</p>
                <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "var(--text-muted)" }}>
                  {tr.build.priceSub}
                </p>
              </div>
              <div className="flex flex-col gap-3 mb-8">
                {tr.build.pricingItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full" style={{ background: "var(--accent-gold)" }} />
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</p>
                  </div>
                ))}
              </div>
              <span className="btn-primary w-full text-center block opacity-50 cursor-not-allowed pointer-events-none">
                {tr.build.applyBtn}
              </span>
              <p className="text-xs text-center mt-4" style={{ color: "var(--text-muted)" }}>
                {tr.build.pricingNote}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-12">
            <p className="section-label">{tr.build.stackLabel}</p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              {tr.build.stackH2}<br />
              <span className="gradient-text">{tr.build.stackH2b}</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stack.map((category, i) => (
              <ScrollReveal key={category.label} delay={i * 0.08}>
                <div className="card-glow p-6 h-full" style={{ background: "var(--bg-card)" }}>
                  <p className="section-label" style={{ marginBottom: "1rem" }}>{category.label}</p>
                  <ul className="flex flex-col gap-2">
                    {category.items.map((item) => (
                      <li key={item} className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-12">
            <p className="section-label">{tr.build.curriculumLabel}</p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              {tr.build.curriculumH2}<br />
              <span className="gradient-text">{tr.build.curriculumH2b}</span>
            </h2>
          </ScrollReveal>
          <div className="flex flex-col gap-2">
            {modules.map((mod, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className="border overflow-hidden cursor-pointer"
                  style={{
                    borderColor: openModule === i ? "var(--border-glow)" : "var(--border-subtle)",
                    background: "var(--bg-card)",
                    boxShadow: openModule === i ? "var(--glow-green)" : "none",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                >
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-6">
                      <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                        {mod.chamber}
                      </span>
                      <div>
                        <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>{mod.title}</h3>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{mod.duration}</p>
                      </div>
                    </div>
                    <ChevronDown
                      size={16}
                      style={{
                        color: "var(--text-muted)",
                        transform: openModule === i ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                  {openModule === i && (
                    <div className="px-6 pb-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                      <p className="text-sm leading-relaxed mt-4 mb-5" style={{ color: "var(--text-secondary)" }}>
                        {mod.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mod.skills.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-3 py-1 tracking-wide"
                            style={{
                              background: "rgba(74, 140, 92, 0.1)",
                              border: "1px solid var(--border-glow)",
                              color: "var(--accent-green-bright)",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <p className="section-label">{tr.build.schedule.label}</p>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              {tr.build.schedule.h2}
            </h2>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-green-bright)" }}>
              {tr.build.schedule.start}
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {tr.build.schedule.recurrence}
            </p>
          </ScrollReveal>
          <div className="flex flex-col gap-1">
            {tr.build.schedule.lessons.map((lesson, i) => (
              <ScrollReveal key={i} delay={i * 0.02}>
                <div
                  className="flex items-center gap-4 px-5 py-3"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  <span className="text-xs font-mono w-5 flex-shrink-0 text-right" style={{ color: "var(--text-muted)" }}>
                    {lesson.num}
                  </span>
                  <span className="text-xs w-32 flex-shrink-0" style={{ color: "var(--accent-green-bright)" }}>
                    {lesson.date}
                  </span>
                  <span className="text-xs w-28 flex-shrink-0 hidden sm:block" style={{ color: "var(--text-muted)" }}>
                    {lesson.time}
                  </span>
                  <span className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>
                    {lesson.title}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-12">
            <p className="section-label">{tr.build.instructorLabel}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="card-glow overflow-hidden" style={{ background: "var(--bg-card)" }}>
              {/* green header strip */}
              <div
                className="h-20 w-full"
                style={{ background: "linear-gradient(135deg, rgba(74,140,92,0.18) 0%, rgba(74,140,92,0.04) 100%)" }}
              />
              <div className="px-10 pb-10 grid grid-cols-1 md:grid-cols-3 gap-10 -mt-14">
                {/* Left: photo + identity */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="relative mb-5">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(74,140,92,0.45) 0%, transparent 70%)",
                        filter: "blur(12px)",
                        transform: "scale(1.3)",
                      }}
                    />
                    <img
                      src="/instructor-anri.png"
                      alt={tr.build.instructorName}
                      className="relative w-32 h-32 object-cover object-top rounded-full z-10"
                      style={{
                        border: "2px solid var(--border-glow)",
                        boxShadow: "0 0 28px rgba(74,140,92,0.35)",
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center md:text-left" style={{ color: "var(--text-primary)" }}>
                    {tr.build.instructorName}
                  </h3>
                  <p className="text-xs tracking-widest uppercase mt-1 text-center md:text-left" style={{ color: "var(--text-muted)" }}>
                    {tr.build.instructorRole}
                  </p>
                  <div className="flex flex-col gap-2 mt-5 w-full">
                    {tr.build.instructorCreds.map((cred) => (
                      <div
                        key={cred}
                        className="flex items-start gap-2 px-3 py-2 text-xs"
                        style={{
                          background: "rgba(74,140,92,0.08)",
                          border: "1px solid var(--border-glow)",
                          color: "var(--accent-green-bright)",
                        }}
                      >
                        <span className="flex-shrink-0">·</span>
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right: bio + quote */}
                <div className="md:col-span-2 flex flex-col justify-center gap-5 pt-6 md:pt-16">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{tr.build.instructorBio1}</p>
                  {tr.build.instructorBio2 && (
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{tr.build.instructorBio2}</p>
                  )}
                  <blockquote
                    className="mt-2 px-5 py-4 border-l-2 text-sm italic leading-relaxed"
                    style={{
                      borderColor: "var(--accent-gold)",
                      color: "var(--accent-gold)",
                      background: "rgba(212,175,55,0.05)",
                    }}
                  >
                    &ldquo;{tr.build.instructorQuote}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="mb-12">
            <p className="section-label">{tr.build.faqLabel}</p>
            <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              {tr.build.faqH2}
            </h2>
          </ScrollReveal>
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className="border overflow-hidden cursor-pointer"
                  style={{
                    borderColor: openFaq === i ? "var(--border-glow)" : "var(--border-subtle)",
                    background: "var(--bg-card)",
                    transition: "border-color 0.3s ease",
                  }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between p-6">
                    <p className="font-medium pr-4" style={{ color: "var(--text-primary)" }}>{faq.q}</p>
                    <ChevronDown
                      size={16}
                      className="flex-shrink-0"
                      style={{
                        color: "var(--text-muted)",
                        transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                  {openFaq === i && (
                    <div className="px-6 pb-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                      <p className="text-sm leading-relaxed mt-4" style={{ color: "var(--text-secondary)" }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REFUND POLICY */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="mb-8">
            <p className="section-label">{tr.build.refund.label}</p>
          </ScrollReveal>
          <div className="flex flex-col gap-2">
            {tr.build.refund.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className="flex items-start gap-4 px-5 py-4"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-green-bright)" }}>—</span>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center" style={{ background: "var(--bg-secondary)" }}>
        <ScrollReveal>
          <p className="section-label">{tr.build.ctaLabel}</p>
          <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            {tr.build.ctaH2}<br />
            <span className="gradient-text">{tr.build.ctaH2b}</span>
          </h2>
        </ScrollReveal>
        <div className="divider" />
        <ScrollReveal delay={0.1} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <span className="btn-primary animate-breathe opacity-50 cursor-not-allowed pointer-events-none">
            {tr.build.ctaBtn}
          </span>
          <Link href="/paths/pour" className="btn-outline inline-flex items-center gap-2">
            {tr.build.ctaOutline} <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
