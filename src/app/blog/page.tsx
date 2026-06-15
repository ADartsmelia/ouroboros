"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

const slugs = [
  "why-bartenders-are-the-best-founders",
  "the-myth-of-the-right-moment",
  "what-the-negroni-taught-me-about-product-design",
  "shipping-vs-finishing",
  "balance-without-a-recipe",
  "the-emotional-cost-of-building-alone",
];

export default function BlogPage() {
  const { tr } = useLang();

  const posts = tr.blog.posts.map((post, i) => ({
    slug: slugs[i],
    ...post,
  }));

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(74, 140, 92, 0.06) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label">
            {tr.blog.label}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold leading-[0.92] tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            {tr.blog.h1}<br />
            <span className="gradient-text">{tr.blog.h1b}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {tr.blog.intro}
          </motion.p>
        </div>
      </section>

      {/* POSTS */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Featured post */}
          <ScrollReveal className="mb-12">
            <Link href={`/blog/${posts[0].slug}`}>
              <div
                className="card-glow p-10 group cursor-pointer"
                style={{ background: "var(--bg-card)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="section-label" style={{ margin: 0 }}>{posts[0].category}</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                    style={{ color: "var(--accent-green-bright)" }}
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                  {posts[0].title}
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{posts[0].date}</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>·</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{posts[0].readTime} {tr.blog.readLabel}</span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Grid of remaining posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.slice(1).map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`}>
                  <div
                    className="card-glow p-7 h-full group cursor-pointer flex flex-col"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="section-label" style={{ margin: 0, fontSize: "0.6rem" }}>{post.category}</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1 flex-shrink-0"
                        style={{ color: "var(--accent-green-bright)" }}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-3 flex-1" style={{ color: "var(--text-primary)" }}>
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: "var(--border-subtle)" }}>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.date}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>·</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.readTime} {tr.blog.readLabel}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="section-label">{tr.blog.newsletterLabel}</p>
            <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              {tr.blog.newsletterH2}
            </h2>
            <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
              {tr.blog.newsletterBody}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 text-sm"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--border-glow)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
              />
              <button type="submit" className="btn-primary whitespace-nowrap text-xs">
                {tr.blog.newsletterBtn}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
