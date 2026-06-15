"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import OuroborosSVG from "@/components/OuroborosSVG";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

const pillarMeta = [
  { number: "I", icon: "◎", color: "#c9a84c" },
  { number: "II", icon: "◈", color: "#4a8c5c" },
  { number: "III", icon: "⬡", color: "#c9a84c" },
  { number: "IV", icon: "↺", color: "#4a8c5c" },
];

export default function AboutPage() {
  const { tr } = useLang();

  const pillars = tr.about.pillars.map((p, i) => ({
    ...pillarMeta[i],
    title: p.title,
    body: p.body,
  }));

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(74, 140, 92, 0.1) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            {tr.about.label}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold leading-[0.95] tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            {tr.about.h1}<br />
            <span className="gradient-text">{tr.about.h1b}</span>
          </motion.h1>
          <div className="divider" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {tr.about.intro}
          </motion.p>
        </div>
      </section>

      {/* FOUNDING STORY */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="flex justify-center lg:justify-start">
              <div className="animate-ouroboros">
                <OuroborosSVG size={280} glowing />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <p className="section-label">{tr.about.foundingLabel}</p>
              <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                {tr.about.foundingH2}
              </h2>
              <div className="flex flex-col gap-4">
                {tr.about.foundingParas.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* THE SYMBOL */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="section-label">{tr.about.symbolLabel}</p>
            <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
              {tr.about.symbolH2}
            </h2>
          </ScrollReveal>
          <div className="divider" />
          <ScrollReveal delay={0.1}>
            <p className="text-base leading-loose mb-6" style={{ color: "var(--text-secondary)" }}>
              {tr.about.symbolPara1}
            </p>
            <p className="text-base leading-loose" style={{ color: "var(--text-secondary)" }}>
              {tr.about.symbolPara2}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FOUR PILLARS — scroll-reveal one by one */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <p className="section-label">{tr.about.pillarsLabel}</p>
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
              {tr.about.pillarsH2}<br />
              <span className="gradient-text">{tr.about.pillarsH2b}</span>
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-px" style={{ border: "1px solid var(--border-subtle)" }}>
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.number} delay={i * 0.12}>
                <div
                  className="p-10 lg:p-14 group"
                  style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border-subtle)" }}
                >
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0">
                      <div
                        className="w-16 h-16 flex items-center justify-center text-2xl font-bold border"
                        style={{
                          borderColor: pillar.color,
                          color: pillar.color,
                          background: `rgba(${pillar.color === "#c9a84c" ? "201, 168, 76" : "74, 140, 92"}, 0.06)`,
                        }}
                      >
                        {pillar.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "var(--text-muted)" }}>
                        {tr.about.pillarLabel} {pillar.number}
                      </p>
                      <h3 className="text-2xl font-bold mb-6" style={{ color: pillar.color }}>
                        {pillar.title}
                      </h3>
                      <div className="flex flex-col gap-4">
                        {pillar.body.split("\n\n").map((para, j) => (
                          <p key={j} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <ScrollReveal>
          <p className="section-label">{tr.about.ctaLabel}</p>
          <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            {tr.about.ctaH2}<br />
            <span className="gradient-text">{tr.about.ctaH2b}</span>
          </h2>
        </ScrollReveal>
        <div className="divider" />
        <ScrollReveal delay={0.1} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/apply" className="btn-primary animate-breathe">
            {tr.about.ctaBtn}
          </Link>
          <Link href="/paths/pour" className="btn-outline inline-flex items-center gap-2">
            {tr.about.ctaOutline} <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
