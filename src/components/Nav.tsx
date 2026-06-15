"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import OuroborosSVG from "./OuroborosSVG";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "./LanguageProvider";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { tr } = useLang();

  const links = [
    { href: "/", label: tr.nav.home },
    { href: "/about", label: tr.nav.philosophy },
    { href: "/paths/pour", label: tr.nav.pour },
    { href: "/paths/build", label: tr.nav.build },
    { href: "/community", label: tr.nav.community },
    { href: "/apply", label: tr.nav.cta },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "var(--nav-scrolled-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--nav-scrolled-border)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div
              className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{ width: 28, height: 28 }}
            >
              <OuroborosSVG size={28} glowing={false} />
            </div>
            <span
              className="display text-[0.85rem] font-medium tracking-[0.16em] uppercase hidden sm:block"
              style={{ color: "var(--text-primary)" }}
            >
              {tr.nav.brand}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {links.slice(1, -1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.67rem] tracking-[0.12em] uppercase transition-colors duration-200"
                style={{
                  color: pathname === link.href ? "var(--accent-gold)" : "var(--text-secondary)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <ThemeToggle />

            {/* Hamburger — visible below lg */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full"
              style={{
                color: "var(--text-secondary)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            {/* Desktop-only CTA */}
            <div className="hidden lg:block">
              <Link href="/apply" className="btn-primary" style={{ fontSize: "0.62rem", padding: "0.55rem 1.3rem" }}>
                {tr.nav.cta}
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "var(--mobile-menu-bg)", backdropFilter: "blur(20px)" }}
          >
            {/* Close row */}
            <div className="flex items-center justify-between px-5 h-14">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
                <OuroborosSVG size={28} glowing={false} />
                <span className="display text-[0.85rem] font-medium tracking-[0.16em] uppercase" style={{ color: "var(--text-primary)" }}>
                  {tr.nav.brand}
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{
                  color: "var(--text-secondary)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col justify-center flex-1 px-8 pb-16 gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="display block py-3 text-[2rem] font-light leading-tight border-b"
                    style={{
                      color: pathname === link.href ? "var(--accent-gold)" : "var(--text-primary)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.04 + 0.1 }}
                className="mt-8"
              >
                <Link href="/apply" className="btn-primary w-full justify-center" onClick={() => setMenuOpen(false)}>
                  {tr.hero.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
