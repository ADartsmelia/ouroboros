"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, MessageCircle, FileText, ChevronRight, Lock, Play, CheckCircle } from "lucide-react";

type Lesson = { title: string; duration: string; completed: boolean; current?: boolean; locked?: boolean };
type Module = { id: number; chamber: string; title: string; duration: string; completed: boolean; current?: boolean; locked?: boolean; lessons: Lesson[] };

const modules: Module[] = [
  {
    id: 1,
    chamber: "Chamber 1",
    title: "The Empty Glass",
    duration: "Week 1",
    completed: true,
    lessons: [
      { title: "Orientation: entering the cycle", duration: "12 min", completed: true },
      { title: "Sensory calibration — the 12-glass exercise", duration: "34 min", completed: true },
      { title: "Spirit taxonomy: the five families", duration: "28 min", completed: true },
      { title: "Assignment: your first tasting journal", duration: "Exercise", completed: true },
    ],
  },
  {
    id: 2,
    chamber: "Chamber 2",
    title: "Tools of the Circle",
    duration: "Week 2",
    completed: false,
    current: true,
    lessons: [
      { title: "The shake — principle, not technique", duration: "22 min", completed: true },
      { title: "The stir — when and why", duration: "18 min", completed: true },
      { title: "Build, float, layer", duration: "26 min", completed: false, current: true },
      { title: "Assignment: speed drill", duration: "Exercise", completed: false, locked: false },
    ],
  },
  {
    id: 3,
    chamber: "Chamber 3",
    title: "The Language of Flavor",
    duration: "Weeks 3–4",
    completed: false,
    locked: false,
    lessons: [
      { title: "Balance theory: the four axes", duration: "30 min", completed: false, locked: true },
      { title: "Diagnosing imbalance by taste", duration: "25 min", completed: false, locked: true },
      { title: "Acid in cocktails", duration: "20 min", completed: false, locked: true },
      { title: "Assignment: fix three broken drinks", duration: "Exercise", completed: false, locked: true },
    ],
  },
];

const progress = {
  overall: 42,
  chambersCompleted: 1,
  totalChambers: 6,
  weeksCurrent: 2,
  totalWeeks: 8,
};

export default function DashboardPage() {
  const [activeModule, setActiveModule] = useState(2);
  const [activeLesson, setActiveLesson] = useState(2);

  const currentModule = modules.find((m) => m.id === activeModule);

  return (
    <div style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      {/* Dashboard Nav override */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 justify-between"
        style={{
          background: "rgba(10, 12, 10, 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <Link href="/" className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-primary)" }}>
          Ouroboros
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-1" style={{ background: "rgba(74, 140, 92, 0.15)", color: "var(--accent-green-bright)", border: "1px solid var(--border-glow)" }}>
            Seeker · Art of the Pour · Cycle 9
          </span>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--accent-green)", color: "var(--accent-gold)" }}
          >
            Y
          </div>
        </div>
      </nav>

      <div className="pt-14 flex h-screen">
        {/* Sidebar */}
        <aside
          className="hidden lg:flex flex-col w-72 flex-shrink-0 overflow-y-auto"
          style={{
            background: "var(--bg-secondary)",
            borderRight: "1px solid var(--border-subtle)",
          }}
        >
          {/* Progress */}
          <div className="p-6 border-b" style={{ borderColor: "var(--border-subtle)" }}>
            <p className="section-label">Your progress</p>
            <div className="relative w-20 h-20 mx-auto mb-4">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border-subtle)" strokeWidth="6" />
                <motion.circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - progress.overall / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4a8c5c" />
                    <stop offset="100%" stopColor="#c9a84c" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold gradient-text">{progress.overall}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              {[
                [`${progress.chambersCompleted}/${progress.totalChambers}`, "Chambers"],
                [`Week ${progress.weeksCurrent}`, "of " + progress.totalWeeks],
              ].map(([val, label]) => (
                <div key={label} className="p-2" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <p className="text-sm font-bold gradient-text">{val}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Module list */}
          <div className="flex-1 p-4">
            <p className="section-label px-2">Chambers</p>
            <div className="flex flex-col gap-1">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => !mod.locked && setActiveModule(mod.id)}
                  className="text-left p-3 rounded-sm transition-all duration-200 flex items-center gap-3"
                  style={{
                    background: activeModule === mod.id ? "rgba(74, 140, 92, 0.1)" : "transparent",
                    border: activeModule === mod.id ? "1px solid var(--border-glow)" : "1px solid transparent",
                    opacity: mod.locked ? 0.4 : 1,
                    cursor: mod.locked ? "not-allowed" : "pointer",
                  }}
                >
                  <div className="flex-shrink-0">
                    {mod.completed ? (
                      <CheckCircle size={14} style={{ color: "var(--accent-green-bright)" }} />
                    ) : mod.current ? (
                      <Play size={14} style={{ color: "var(--accent-gold)" }} />
                    ) : mod.locked ? (
                      <Lock size={14} style={{ color: "var(--text-muted)" }} />
                    ) : (
                      <div className="w-3.5 h-3.5 border rounded-full" style={{ borderColor: "var(--text-muted)" }} />
                    )}
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>
                      {mod.chamber}
                    </p>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{mod.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="p-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            {[
              { icon: <MessageCircle size={14} />, label: "Cohort Chat" },
              { icon: <FileText size={14} />, label: "My Notes" },
              { icon: <BookOpen size={14} />, label: "Resources" },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 p-3 text-sm transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Lesson area */}
          <div className="max-w-3xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-xs" style={{ color: "var(--text-muted)" }}>
              <span>{currentModule?.chamber}</span>
              <ChevronRight size={12} />
              <span style={{ color: "var(--text-primary)" }}>
                {currentModule?.lessons[activeLesson]?.title}
              </span>
            </div>

            {/* Video player placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full mb-8 rounded-sm overflow-hidden flex items-center justify-center"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                aspectRatio: "16/9",
              }}
            >
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer transition-transform hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-green) 0%, var(--bg-card) 100%)",
                    border: "2px solid var(--border-glow)",
                    boxShadow: "var(--glow-green)",
                  }}
                >
                  <Play size={24} style={{ color: "var(--accent-gold)", marginLeft: "3px" }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {currentModule?.lessons[activeLesson]?.title}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {currentModule?.lessons[activeLesson]?.duration}
                </p>
              </div>
            </motion.div>

            {/* Lesson list */}
            <div className="mb-8">
              <p className="section-label mb-4">{currentModule?.chamber} — {currentModule?.title}</p>
              <div className="flex flex-col gap-2">
                {currentModule?.lessons.map((lesson, i) => (
                  <button
                    key={i}
                    onClick={() => !lesson.locked && setActiveLesson(i)}
                    className="flex items-center gap-4 p-4 text-left transition-all"
                    style={{
                      background: activeLesson === i ? "rgba(74, 140, 92, 0.08)" : "var(--bg-card)",
                      border: activeLesson === i ? "1px solid var(--border-glow)" : "1px solid var(--border-subtle)",
                      opacity: lesson.locked ? 0.4 : 1,
                      cursor: lesson.locked ? "not-allowed" : "pointer",
                    }}
                  >
                    <div className="flex-shrink-0">
                      {lesson.completed ? (
                        <CheckCircle size={16} style={{ color: "var(--accent-green-bright)" }} />
                      ) : lesson.current ? (
                        <Play size={16} style={{ color: "var(--accent-gold)" }} />
                      ) : lesson.locked ? (
                        <Lock size={16} style={{ color: "var(--text-muted)" }} />
                      ) : (
                        <div className="w-4 h-4 border rounded-full" style={{ borderColor: "var(--text-muted)" }} />
                      )}
                    </div>
                    <p className="flex-1 text-sm" style={{ color: activeLesson === i ? "var(--text-primary)" : "var(--text-secondary)" }}>
                      {lesson.title}
                    </p>
                    <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                      {lesson.duration}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes area */}
            <div>
              <p className="section-label mb-4">My notes</p>
              <textarea
                placeholder="Write your observations here. This is your tasting journal, your build log, your inner record."
                rows={6}
                className="w-full p-5 text-sm resize-none"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                  outline: "none",
                  lineHeight: "1.7",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--border-glow)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-subtle)")}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
