"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function StoriesPage() {
  const { tr } = useLang();
  const stories = tr.storiesPage.items;

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201, 168, 76, 0.06) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label">
            {tr.storiesPage.label}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold leading-[0.92] tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            {tr.storiesPage.h1}<br />
            <span className="gradient-text">{tr.storiesPage.h1b}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {tr.storiesPage.intro}
          </motion.p>
        </div>
      </section>

      {/* STORIES */}
      {stories.map((story, storyIdx) => (
        <section
          key={story.name}
          className="py-24 px-6"
          style={{ background: storyIdx % 2 === 0 ? "var(--bg-primary)" : "var(--bg-secondary)" }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-8 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <div>
                  <p className="section-label">{story.path} · {story.cohort}</p>
                  <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{story.name}</h2>
                  <p className="text-sm mt-2" style={{ color: "var(--accent-green-bright)" }}>{story.status}</p>
                </div>
                <blockquote
                  className="text-sm italic max-w-xs text-right"
                  style={{ color: "var(--accent-gold)" }}
                >
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              </div>
            </ScrollReveal>

            {/* Three-part narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {[story.before, story.during, story.after].map((section, i) => (
                <ScrollReveal key={section.title} delay={i * 0.12}>
                  <div>
                    <div
                      className="flex items-center gap-3 mb-5"
                    >
                      <div
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold border"
                        style={{
                          borderColor: i === 0 ? "var(--text-muted)" : i === 1 ? "var(--accent-green-bright)" : "var(--accent-gold)",
                          color: i === 0 ? "var(--text-muted)" : i === 1 ? "var(--accent-green-bright)" : "var(--accent-gold)",
                        }}
                      >
                        {i + 1}
                      </div>
                      <h3 className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--text-secondary)" }}>
                        {section.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-3">
                      {section.body.split("\n\n").map((para, j) => (
                        <p key={j} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-32 px-6 text-center" style={{ background: "var(--bg-secondary)" }}>
        <ScrollReveal>
          <p className="section-label">{tr.storiesPage.ctaLabel}</p>
          <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            {tr.storiesPage.ctaH2}<br />
            <span className="gradient-text">{tr.storiesPage.ctaH2b}</span>
          </h2>
        </ScrollReveal>
        <div className="divider" />
        <ScrollReveal delay={0.1} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <span className="btn-primary animate-breathe opacity-50 cursor-not-allowed pointer-events-none">
            {tr.storiesPage.ctaBtn}
          </span>
          <Link href="/community" className="btn-outline inline-flex items-center gap-2">
            {tr.storiesPage.ctaOutline} <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
