"use client";

import Link from "next/link";
import OuroborosSVG from "./OuroborosSVG";
import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { tr } = useLang();

  const footerLinks = [
    {
      header: tr.footer.pathsHeader,
      links: [
        { label: tr.footer.links.pour, href: "/paths/pour" },
        { label: tr.footer.links.build, href: "/paths/build" },
        // { label: tr.footer.links.community, href: "/community" }, // hidden
      ],
    },
    {
      header: tr.footer.learnHeader,
      links: [
        { label: tr.footer.links.philosophy, href: "/about" },
        { label: tr.footer.links.apply, href: "/apply" },
      ],
    },
  ];

  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--border-subtle)", background: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10">
                <OuroborosSVG size={40} glowing={false} />
              </div>
              <span className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-primary)" }}>
                {tr.nav.brand}
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-muted)" }}>
              {tr.footer.tagline}
            </p>
            <div className="mt-8">
              <p className="section-label">{tr.footer.ctaLabel}</p>
              <Link href="/apply" className="btn-primary inline-block text-xs">
                {tr.footer.ctaBtn}
              </Link>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/oraboraacademy?igsh=ZjN2ejY5aDMyNXJ3&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-secondary)" }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/14e6cibb24Q/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text-secondary)" }}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.header}>
              <p className="section-label">{section.header}</p>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:opacity-100"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {tr.footer.copyright}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs" style={{ color: "var(--text-muted)" }}>{tr.footer.privacy}</Link>
            <Link href="/terms" className="text-xs" style={{ color: "var(--text-muted)" }}>{tr.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
