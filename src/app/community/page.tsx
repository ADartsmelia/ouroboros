"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import OuroborosSVG from "@/components/OuroborosSVG";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.735.454 3.366 1.247 4.778L2 22l5.345-1.217A9.956 9.956 0 0 0 12 22c5.522 0 10-4.478 10-10S17.521 2 12 2z" />
  </svg>
);

const socialIcons = [<FacebookIcon key="fb" />, <InstagramIcon key="ig" />, <WhatsAppIcon key="wa" />];

export default function CommunityPage() {
  const { tr } = useLang();

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(74, 140, 92, 0.08) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label">
            {tr.community.label}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold leading-[0.92] tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            {tr.community.h1}<br />
            <span className="gradient-text">{tr.community.h1b}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {tr.community.intro}
          </motion.p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="flex justify-center">
              <div className="animate-ouroboros">
                <OuroborosSVG size={220} glowing />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.15}>
            <p className="section-label">{tr.community.philosophyLabel}</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              {tr.community.philosophyH2}<br />
              <span className="gradient-text">{tr.community.philosophyH2b}</span>
            </h2>
            <div className="flex flex-col gap-5">
              {tr.community.roles.map(({ role, desc }) => (
                <div key={role} className="flex gap-4">
                  <div
                    className="w-20 h-7 flex-shrink-0 flex items-center justify-center text-xs tracking-widest uppercase"
                    style={{
                      border: "1px solid var(--border-subtle)",
                      color: "var(--accent-gold)",
                      background: "rgba(201, 168, 76, 0.05)",
                    }}
                  >
                    {role}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SOCIAL CHANNELS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tr.community.features.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="card-glow p-8 h-full flex flex-col" style={{ background: "var(--bg-card)" }}>
                  <div className="mb-4" style={{ color: "var(--accent-green-bright)" }}>{socialIcons[i]}</div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                  <Link href="#" className="mt-6 text-xs tracking-widest uppercase" style={{ color: "var(--accent-gold)" }}>
                    {item.action}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center" style={{ background: "var(--bg-secondary)" }}>
        <ScrollReveal>
          <p className="section-label">{tr.community.ctaLabel}</p>
          <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            {tr.community.ctaH2}<br />
            <span className="gradient-text">{tr.community.ctaH2b}</span>
          </h2>
        </ScrollReveal>
        <div className="divider" />
        <ScrollReveal delay={0.1} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <span className="btn-primary animate-breathe opacity-50 cursor-not-allowed pointer-events-none">
            {tr.community.ctaBtn}
          </span>
          <Link href="/about" className="btn-outline inline-flex items-center gap-2">
            {tr.community.ctaOutline} <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
