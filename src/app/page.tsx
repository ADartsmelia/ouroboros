"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import OuroborosSVG from "@/components/OuroborosSVG";
import ParticleField from "@/components/ParticleField";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

const pathHrefs = ["/paths/pour", "/paths/build"];
const pathSlugs = ["pour", "build"];

export default function Home() {
  const { tr } = useLang();

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45, 90, 61, 0.12) 0%, rgba(10, 12, 10, 0) 70%)",
          }}
        />
        <div
          className="absolute inset-0 animate-fog"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 30% 60%, rgba(74, 140, 92, 0.06) 0%, transparent 70%)",
          }}
        />
        <ParticleField />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-0"
          >
            <motion.div variants={fadeUp} className="mb-5 sm:mb-6 relative">
              <div className="animate-ouroboros sm:hidden">
                <OuroborosSVG size={140} glowing />
              </div>
              <div className="animate-ouroboros hidden sm:block lg:hidden">
                <OuroborosSVG size={180} glowing />
              </div>
              <div className="animate-ouroboros hidden lg:block">
                <OuroborosSVG size={200} glowing />
              </div>
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(circle, rgba(74, 140, 92, 0.12) 0%, transparent 60%)",
                  transform: "scale(1.5)",
                }}
              />
            </motion.div>

            <motion.p variants={fadeUp} className="section-label mb-3">
              {tr.hero.label}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="display text-[2.1rem] sm:text-[3.4rem] lg:text-[5rem] font-bold leading-[1.04] mb-4"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.025em",
              }}
            >
              {tr.hero.h1}
              <br />
              <em className="gradient-text not-italic">{tr.hero.h1b}</em>
            </motion.h1>

            <div className="divider" style={{ margin: "0.75rem auto" }} />

            <motion.p
              variants={fadeUp}
              className="text-[0.85rem] sm:text-[0.95rem] max-w-sm sm:max-w-lg leading-relaxed mb-6 px-2 sm:px-0"
              style={{ color: "var(--text-secondary)" }}
            >
              {tr.hero.body}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-row gap-3 items-center flex-wrap justify-center"
            >
              <Link href="/apply" className="btn-primary animate-breathe">
                {tr.hero.cta}
              </Link>
              <Link href="/about" className="btn-outline">
                {tr.hero.ctaOutline}
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-[0.58rem] tracking-[0.14em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              {tr.hero.fine}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <span
            className="text-[0.55rem] tracking-[0.22em] uppercase"
            style={{ color: "var(--text-muted)" }}
          ></span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-px h-6"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-gold), transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* MANIFESTO */}
      <section
        className="py-20 sm:py-32 px-5 sm:px-6"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="section-label">{tr.manifesto.label}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="display text-[1.9rem] sm:text-[3rem] lg:text-[3.8rem] font-bold leading-[1.1] mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              {tr.manifesto.h2}
              <br />
              <em className="gradient-text not-italic">{tr.manifesto.h2b}</em>
            </h2>
          </ScrollReveal>
          <div className="divider" />
          <ScrollReveal delay={0.2}>
            <p
              className="text-[0.85rem] sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {tr.manifesto.body}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3} className="mt-10">
            <Link
              href="/about"
              className="btn-outline inline-flex items-center gap-2"
            >
              {tr.manifesto.link} <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* PATHS */}
      <section
        className="py-20 sm:py-32 px-4 sm:px-6"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-10 sm:mb-16">
            <p className="section-label">{tr.paths.label}</p>
            <h2
              className="display text-[1.8rem] sm:text-[2.4rem] lg:text-[3rem] font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {tr.paths.h2}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tr.paths.items.map((path, i) => (
              <ScrollReveal key={pathSlugs[i]} delay={i * 0.15}>
                <Link href={pathHrefs[i]}>
                  <div
                    className="card-glow p-7 sm:p-10 h-full cursor-pointer group"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <span className="section-label" style={{ margin: 0 }}>
                        {path.tag}
                      </span>
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: "var(--accent-green-bright)" }}
                      />
                    </div>
                    <p
                      className="text-[0.6rem] tracking-[0.2em] uppercase mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {path.subtitle}
                    </p>
                    <h3
                      className="display text-[1.6rem] sm:text-[2rem] font-medium mb-4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {path.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {path.desc}
                    </p>
                    <div
                      className="mt-8 pt-6 border-t"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <span
                        className="text-xs tracking-widest uppercase"
                        style={{ color: "var(--accent-gold)" }}
                      >
                        {path.link}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="py-24 sm:py-40 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(74, 140, 92, 0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex justify-center mb-6 sm:mb-8">
              <div
                className="animate-ouroboros"
                style={{ width: 64, height: 64 }}
              >
                <OuroborosSVG size={64} glowing />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="display text-[2rem] sm:text-[3.4rem] lg:text-[4.5rem] font-bold leading-[1.06] mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              {tr.cta.h2}
              <br />
              <em className="gradient-text not-italic">{tr.cta.h2b}</em>
            </h2>
          </ScrollReveal>
          <div className="divider" />
          <ScrollReveal delay={0.2}>
            <p
              className="text-[0.85rem] sm:text-base mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              {tr.cta.body}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link href="/apply" className="btn-primary animate-breathe">
              {tr.cta.btn}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
