# Ouroboros — Color Palette

---

## Dark Theme

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Void** | `#0a0c0a` | `--bg-primary` | Main background, hero, most pages |
| **Deep Forest** | `#0f130f` | `--bg-secondary` | Alternate section backgrounds |
| **Midnight Green** | `#111611` | `--bg-card` | Cards, accordions, inputs |
| **Old Gold** | `#c9a84c` | `--accent-gold` | Primary buttons, borders, highlights |
| **Pale Gold** | `#e2c060` | `--accent-gold-light` | Button hover state, gradient start |
| **Dark Gold** | `#8a6f2e` | `--accent-gold-dim` | Muted gold, secondary accents |
| **Forest** | `#2d5a3d` | `--accent-green` | Avatar backgrounds, deep green fills |
| **Sage** | `#4a8c5c` | `--accent-green-bright` | Section labels, tags, active links, icons |
| **Parchment** | `#e8e4d9` | `--text-primary` | Headings, primary body copy |
| **Stone** | `#9a9585` | `--text-secondary` | Body paragraphs, descriptions |
| **Ash** | `#5a5750` | `--text-muted` | Captions, timestamps, metadata |

---

## Light Theme

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Linen** | `#f6f1e8` | `--bg-primary` | Main background |
| **Cream** | `#ede7d8` | `--bg-secondary` | Alternate section backgrounds |
| **Ivory** | `#faf7f0` | `--bg-card` | Cards, inputs |
| **Aged Gold** | `#9a7230` | `--accent-gold` | Primary buttons, highlights |
| **Warm Gold** | `#b88a3a` | `--accent-gold-light` | Button hover |
| **Deep Gold** | `#7a5820` | `--accent-gold-dim` | Muted accents |
| **Forest** | `#2d5a3d` | `--accent-green` | Shared with dark |
| **Deep Sage** | `#2a6640` | `--accent-green-bright` | Section labels, tags, icons |
| **Charcoal** | `#1c1a12` | `--text-primary` | Headings, primary body copy |
| **Walnut** | `#5c5544` | `--text-secondary` | Body paragraphs |
| **Driftwood** | `#9a9080` | `--text-muted` | Captions, metadata |

---

## Gradient

| Name | Value | Usage |
|------|-------|-------|
| **Serpent** | `#e2c060 → #c9a84c → #4a8c5c` | All gradient text (headings, italic accents) |
| **Body Ring** | `#4a8c5c → #2d5a3d → #1a3a28` | Ouroboros SVG body fill |
| **Progress** | `#4a8c5c → #c9a84c` | Dashboard progress ring |

---

## Functional Tokens

| Token | Dark | Light | Usage |
|-------|------|-------|-------|
| `--border-subtle` | `rgba(201,168,76, 0.10)` | `rgba(100,80,20, 0.12)` | Default card/input borders |
| `--border-glow` | `rgba(74,140,92, 0.28)` | `rgba(42,102,64, 0.25)` | Hover/active borders, focus rings |
| `--glow-green` | `0 0 32px rgba(74,140,92, 0.16)` | `0 0 24px rgba(42,102,64, 0.12)` | Card hover shadow |
| `--shadow-card` | `0 2px 24px rgba(0,0,0, 0.40)` | `0 2px 20px rgba(0,0,0, 0.07)` | Default card elevation |

---

## Typography Scale (desktop, 18px root)

| Level | Size | Font | Weight | Usage |
|-------|------|------|--------|-------|
| Hero H1 | `5.8rem → 104px` | Playfair Display | 700 | Homepage hero |
| H2 Section | `3.2–3.8rem → 57–68px` | Playfair Display | 700 | Section headings |
| H2 CTA | `4.5rem → 81px` | Playfair Display | 700 | CTA blocks |
| H3 Card | `1.2–2rem → 22–36px` | Playfair Display | 500–700 | Card titles |
| Body | `1rem → 18px` | DM Sans | 400 | All paragraphs |
| Small Body | `0.85rem → 15px` | DM Sans | 400 | Secondary descriptions |
| Card Body | `0.78rem → 14px` | DM Sans | 400 | Card body text |
| Label | `0.6rem → 11px` | DM Sans | 700 | Section labels (ALL CAPS + tracking) |
| Button | `0.67rem → 12px` | DM Sans | 700 | CTA text (ALL CAPS + tracking) |
| Nav Link | `0.67rem → 12px` | DM Sans | 400 | Navigation |

---

## Border Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-btn` | `100px` | All buttons (full pill) |
| `--radius-card` | `14px` | All cards, accordions |
| `--radius-input` | `10px` | Form inputs, textareas |
| Nav hamburger | `100%` | Circle icon button |
