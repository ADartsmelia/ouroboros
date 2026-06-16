"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import OuroborosSVG from "@/components/OuroborosSVG";
import { useLang } from "@/components/LanguageProvider";

type Form = {
  course: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
};

const empty: Form = {
  course: "",
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  phone: "",
};

export default function ApplyPage() {
  const { tr } = useLang();
  const [form, setForm] = useState<Form>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid =
    form.course &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.dob &&
    form.email.includes("@") &&
    form.phone.trim().length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    try {
      await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        style={{ background: "var(--bg-primary)" }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-lg text-center"
        >
          <div className="flex justify-center mb-10">
            <div className="animate-ouroboros">
              <OuroborosSVG size={100} glowing />
            </div>
          </div>
          <p className="section-label">{tr.apply.successLabel}</p>
          <h1
            className="text-4xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            {tr.apply.successH1}
            <br />
            <span className="gradient-text">{tr.apply.successH1b}</span>
          </h1>
          <div className="divider" />
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {tr.apply.successBody}
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {tr.apply.successMetaPre}{" "}
            <a href="/about" style={{ color: "var(--accent-gold)" }}>
              {tr.apply.successMetaLink1}
            </a>{" "}
            {tr.apply.successMetaMid}{" "}
            <a href="/stories" style={{ color: "var(--accent-gold)" }}>
              {tr.apply.successMetaLink2}
            </a>
            .
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg-primary)" }}>
      {/* HERO */}
      <section className="relative pt-40 pb-12 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(74,140,92,0.07) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-label"
          >
            {tr.apply.heroLabel}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold leading-[0.95] tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {tr.apply.heroH1}
            <br />
            <span className="gradient-text">{tr.apply.heroH1b}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
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
      <section className="py-12 px-6 pb-32">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto flex flex-col gap-8"
        >
          {/* Course selector */}
          <div>
            <p className="section-label mb-4">{tr.apply.courseLabel}</p>
            <div className="flex flex-col gap-3">
              {tr.apply.courses.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, course: c.value }))}
                  className="text-left p-5 border transition-all duration-200"
                  style={{
                    borderColor:
                      form.course === c.value
                        ? "var(--border-glow)"
                        : "var(--border-subtle)",
                    background:
                      form.course === c.value
                        ? "rgba(74,140,92,0.07)"
                        : "var(--bg-card)",
                    boxShadow:
                      form.course === c.value ? "var(--glow-green)" : "none",
                  }}
                >
                  <p
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.label}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {c.sub}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <Field
              label={tr.apply.firstName}
              type="text"
              value={form.firstName}
              onChange={set("firstName")}
              placeholder="სახელი"
            />
            <Field
              label={tr.apply.lastName}
              type="text"
              value={form.lastName}
              onChange={set("lastName")}
              placeholder="გვარი"
            />
          </div>

          {/* DOB */}
          <Field
            label={tr.apply.dob}
            type="date"
            value={form.dob}
            onChange={set("dob")}
            placeholder=""
          />

          {/* Email */}
          <Field
            label={tr.apply.email}
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@email.com"
          />

          {/* Phone */}
          <Field
            label={tr.apply.phone}
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="+995 5XX XXX XXX"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={!valid || loading}
            className="btn-primary w-full text-center"
            style={{
              opacity: !valid || loading ? 0.45 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? tr.apply.submitting : tr.apply.submit}
          </button>

          <p
            className="text-xs text-center"
            style={{ color: "var(--text-muted)" }}
          >
            {tr.apply.requiredNote}
          </p>
        </motion.form>
      </section>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-xs tracking-widest uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full px-5 py-4 text-sm"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-primary)",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--border-glow)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
      />
    </div>
  );
}
