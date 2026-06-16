import colorsys
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm

W, H = A4  # 595 x 842 pt

# ── Palette data ──────────────────────────────────────────────────────────────

DARK_COLORS = [
    ("#0a0c0a", "Void",          "Main background"),
    ("#0f130f", "Deep Forest",   "Section backgrounds"),
    ("#111611", "Midnight Green","Cards / inputs"),
    ("#c9a84c", "Old Gold",      "Buttons / highlights"),
    ("#e2c060", "Pale Gold",     "Button hover / gradient start"),
    ("#8a6f2e", "Dark Gold",     "Muted gold accents"),
    ("#2d5a3d", "Forest",        "Deep green fills"),
    ("#4a8c5c", "Sage",          "Labels / tags / icons"),
    ("#e8e4d9", "Parchment",     "Primary text"),
    ("#9a9585", "Stone",         "Body paragraphs"),
    ("#5a5750", "Ash",           "Captions / metadata"),
]

LIGHT_COLORS = [
    ("#f6f1e8", "Linen",         "Main background"),
    ("#ede7d8", "Cream",         "Section backgrounds"),
    ("#faf7f0", "Ivory",         "Cards / inputs"),
    ("#9a7230", "Aged Gold",     "Buttons / highlights"),
    ("#b88a3a", "Warm Gold",     "Button hover"),
    ("#7a5820", "Deep Gold",     "Muted accents"),
    ("#2d5a3d", "Forest",        "Shared accent"),
    ("#2a6640", "Deep Sage",     "Labels / tags / icons"),
    ("#1c1a12", "Charcoal",      "Primary text"),
    ("#5c5544", "Walnut",        "Body paragraphs"),
    ("#9a9080", "Driftwood",     "Captions / metadata"),
]

GRADIENTS = [
    ("#e2c060", "#c9a84c", "#4a8c5c", "Serpent",   "Gradient text, heading accents"),
    ("#4a8c5c", "#2d5a3d", "#1a3a28", "Body Ring",  "Ouroboros SVG fill"),
    ("#4a8c5c", "#c9a84c", None,       "Progress",   "Dashboard progress ring"),
]

FUNCTIONAL = [
    ("Border subtle (dark)",  "rgba(201,168,76, 10%)",  "Default card borders — dark"),
    ("Border subtle (light)", "rgba(100,80,20, 12%)",   "Default card borders — light"),
    ("Border glow (dark)",    "rgba(74,140,92, 28%)",   "Hover / active borders — dark"),
    ("Border glow (light)",   "rgba(42,102,64, 25%)",   "Hover / active borders — light"),
    ("Shadow card (dark)",    "rgba(0,0,0, 40%)",       "Card elevation — dark"),
    ("Shadow card (light)",   "rgba(0,0,0, 7%)",        "Card elevation — light"),
]

RADII = [
    ("Buttons",     "100 px",  "Full pill"),
    ("Cards",       "14 px",   "Rounded cards, accordions"),
    ("Inputs",      "10 px",   "Form inputs, textareas"),
    ("Icon buttons","50%",     "Circle nav buttons"),
]

TYPE_SCALE = [
    ("Hero H1",    "5.8 rem / 104 px", "Playfair Display", "700", "Homepage hero"),
    ("H2 Section", "3.2–3.8 rem / 57–68 px", "Playfair Display", "700", "Section headings"),
    ("H2 CTA",     "4.5 rem / 81 px",  "Playfair Display", "700", "CTA blocks"),
    ("H3 Card",    "1.2–2 rem / 22–36 px", "Playfair Display", "500–700", "Card titles"),
    ("Body",       "1 rem / 18 px",    "DM Sans", "400", "All paragraphs"),
    ("Small Body", "0.85 rem / 15 px", "DM Sans", "400", "Secondary text"),
    ("Card Body",  "0.78 rem / 14 px", "DM Sans", "400", "Card body text"),
    ("Label",      "0.6 rem / 11 px",  "DM Sans", "700", "Section labels (CAPS + tracking)"),
    ("Button",     "0.67 rem / 12 px", "DM Sans", "700", "CTA text (CAPS + tracking)"),
    ("Nav Link",   "0.67 rem / 12 px", "DM Sans", "400", "Navigation links"),
]

# ── Helpers ───────────────────────────────────────────────────────────────────

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def hex_to_hsl(h):
    r, g, b = [x/255 for x in hex_to_rgb(h)]
    hh, ll, ss = colorsys.rgb_to_hls(r, g, b)
    return round(hh*360), round(ss*100), round(ll*100)

def is_dark(h):
    r, g, b = hex_to_rgb(h)
    return (0.299*r + 0.587*g + 0.114*b) < 160

def label_color(h):
    return white if is_dark(h) else HexColor("#1c1a12")

def swatch_text(c, x, y, sw, sh, hex_val, name, usage, show_values=True):
    fill = HexColor(hex_val)
    lc   = label_color(hex_val)
    r, g, b = hex_to_rgb(hex_val)
    hh, ss, ll = hex_to_hsl(hex_val)

    # Swatch rectangle
    c.setFillColor(fill)
    c.roundRect(x, y, sw, sh, 6, fill=1, stroke=0)

    # Subtle inner border
    c.setStrokeColor(HexColor("#ffffff") if is_dark(hex_val) else HexColor("#000000"))
    c.setLineWidth(0.3)
    c.setStrokeAlpha(0.08)
    c.roundRect(x, y, sw, sh, 6, fill=0, stroke=1)
    c.setStrokeAlpha(1)

    pad = 8
    ty  = y + sh - pad - 9

    # Name
    c.setFillColor(lc)
    c.setFillAlpha(1)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(x + pad, ty, name)
    ty -= 12

    # Hex
    c.setFont("Helvetica", 7.5)
    c.setFillAlpha(0.9)
    c.drawString(x + pad, ty, hex_val.upper())
    ty -= 10

    if show_values:
        c.setFillAlpha(0.7)
        c.setFont("Helvetica", 6.5)
        c.drawString(x + pad, ty, f"RGB  {r}  {g}  {b}")
        ty -= 9
        c.drawString(x + pad, ty, f"HSL  {hh}°  {ss}%  {ll}%")
        ty -= 9

    # Usage — bottom of swatch
    c.setFillAlpha(0.55)
    c.setFont("Helvetica", 6)
    # Wrap usage to swatch width
    max_chars = int((sw - pad*2) / 3.5)
    if len(usage) > max_chars:
        usage = usage[:max_chars-1] + "…"
    c.drawString(x + pad, y + pad, usage)
    c.setFillAlpha(1)

# ── Draw section title ─────────────────────────────────────────────────────────

def section_title(c, x, y, text, bg_hex=None, text_hex="#c9a84c"):
    if bg_hex:
        c.setFillColor(HexColor(bg_hex))
        c.roundRect(x-6, y-5, W - x*2 + 12, 20, 3, fill=1, stroke=0)
    c.setFillColor(HexColor(text_hex))
    c.setFont("Helvetica-Bold", 11)
    c.drawString(x, y+2, text)

def rule(c, y, color="#c9a84c", alpha=0.25):
    c.setStrokeColor(HexColor(color))
    c.setLineWidth(0.5)
    c.setStrokeAlpha(alpha)
    c.line(30, y, W-30, y)
    c.setStrokeAlpha(1)

# ── PAGE BUILDER ──────────────────────────────────────────────────────────────

def make_pdf(path):
    c = canvas.Canvas(path, pagesize=A4)

    # ── PAGE 1: DARK THEME ────────────────────────────────────────────────────
    # Background
    c.setFillColor(HexColor("#0a0c0a"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Header band
    c.setFillColor(HexColor("#111611"))
    c.rect(0, H-54, W, 54, fill=1, stroke=0)
    c.setFillColor(HexColor("#c9a84c"))
    c.setFont("Helvetica-Bold", 18)
    c.drawString(30, H-34, "OUROBOROS")
    c.setFont("Helvetica", 9)
    c.setFillColor(HexColor("#9a9585"))
    c.drawString(162, H-34, "Color Palette")
    c.setFont("Helvetica", 7)
    c.setFillColor(HexColor("#5a5750"))
    c.drawRightString(W-30, H-34, "Dark Theme  ·  Page 1 of 3")
    # Gold rule below header
    c.setStrokeColor(HexColor("#c9a84c"))
    c.setLineWidth(1)
    c.setStrokeAlpha(0.4)
    c.line(0, H-54, W, H-54)
    c.setStrokeAlpha(1)

    # Section label
    c.setFillColor(HexColor("#4a8c5c"))
    c.setFont("Helvetica-Bold", 7)
    c.drawString(30, H-72, "DARK THEME")
    rule(c, H-78)

    # Swatches — 3 columns × 4 rows (last row partial)
    cols = 3
    margin_x = 30
    gap = 10
    sw = (W - margin_x*2 - gap*(cols-1)) / cols
    sh = 108
    row_gap = 12
    start_y = H - 88

    for i, (hex_val, name, usage) in enumerate(DARK_COLORS):
        col = i % cols
        row = i // cols
        x = margin_x + col*(sw+gap)
        y = start_y - row*(sh+row_gap) - sh
        swatch_text(c, x, y, sw, sh, hex_val, name, usage)

    # Typography section — bottom of page 1
    ty_y = start_y - 4*(sh+row_gap) - sh - 24
    c.setFillColor(HexColor("#4a8c5c"))
    c.setFont("Helvetica-Bold", 7)
    c.drawString(30, ty_y, "TYPOGRAPHY SCALE  (desktop root 18 px)")
    rule(c, ty_y-6)

    ty_y -= 18
    headers = ["Level", "Size", "Font", "Weight", "Usage"]
    col_w = [72, 110, 100, 48, 150]
    c.setFillColor(HexColor("#1c1a14"))
    c.rect(30, ty_y-6, W-60, 14, fill=1, stroke=0)
    for j, (h, cw) in enumerate(zip(headers, col_w)):
        cx = 30 + sum(col_w[:j]) + j*4
        c.setFillColor(HexColor("#c9a84c"))
        c.setFont("Helvetica-Bold", 6.5)
        c.drawString(cx+3, ty_y-2, h)

    ty_y -= 8
    for k, (level, size, font, weight, usage) in enumerate(TYPE_SCALE):
        ty_y -= 13
        row_bg = "#0f130f" if k % 2 == 0 else "#111611"
        c.setFillColor(HexColor(row_bg))
        c.rect(30, ty_y-4, W-60, 13, fill=1, stroke=0)
        row_data = [level, size, font, weight, usage]
        for j, (cell, cw) in enumerate(zip(row_data, col_w)):
            cx = 30 + sum(col_w[:j]) + j*4
            c.setFillColor(HexColor("#e8e4d9") if j==0 else HexColor("#9a9585"))
            c.setFont("Helvetica-Bold" if j==0 else "Helvetica", 6.5)
            c.drawString(cx+3, ty_y, cell)

    c.showPage()

    # ── PAGE 2: LIGHT THEME + GRADIENTS + TOKENS ──────────────────────────────
    # Background
    c.setFillColor(HexColor("#f6f1e8"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Header band
    c.setFillColor(HexColor("#ede7d8"))
    c.rect(0, H-54, W, 54, fill=1, stroke=0)
    c.setFillColor(HexColor("#9a7230"))
    c.setFont("Helvetica-Bold", 18)
    c.drawString(30, H-34, "OUROBOROS")
    c.setFont("Helvetica", 9)
    c.setFillColor(HexColor("#5c5544"))
    c.drawString(162, H-34, "Color Palette")
    c.setFont("Helvetica", 7)
    c.setFillColor(HexColor("#9a9080"))
    c.drawRightString(W-30, H-34, "Light Theme  ·  Page 2 of 3")
    c.setStrokeColor(HexColor("#9a7230"))
    c.setLineWidth(1)
    c.setStrokeAlpha(0.4)
    c.line(0, H-54, W, H-54)
    c.setStrokeAlpha(1)

    c.setFillColor(HexColor("#2a6640"))
    c.setFont("Helvetica-Bold", 7)
    c.drawString(30, H-72, "LIGHT THEME")
    rule(c, H-78, color="#9a7230")

    start_y2 = H - 88
    for i, (hex_val, name, usage) in enumerate(LIGHT_COLORS):
        col = i % cols
        row = i // cols
        x = margin_x + col*(sw+gap)
        y = start_y2 - row*(sh+row_gap) - sh
        swatch_text(c, x, y, sw, sh, hex_val, name, usage)

    # Gradient section
    grad_y = start_y2 - 4*(sh+row_gap) - sh - 20
    c.setFillColor(HexColor("#2a6640"))
    c.setFont("Helvetica-Bold", 7)
    c.drawString(30, grad_y, "GRADIENTS")
    rule(c, grad_y-6, color="#9a7230")

    grad_y -= 20
    gw = (W - 60 - 20) / 3
    for gi, (h1, h2, h3, gname, gusage) in enumerate(GRADIENTS):
        gx = 30 + gi*(gw+10)

        # Draw gradient as 40 thin rectangles
        steps = 60
        step_w = gw / steps
        if h3:
            stops = [h1, h2, h3]
        else:
            stops = [h1, h2]

        for si in range(steps):
            t = si / (steps-1)
            if h3:
                if t < 0.5:
                    t2 = t*2
                    c1, c2 = stops[0], stops[1]
                else:
                    t2 = (t-0.5)*2
                    c1, c2 = stops[1], stops[2]
            else:
                t2, c1, c2 = t, stops[0], stops[1]

            r1, g1, b1 = hex_to_rgb(c1)
            r2, g2, b2 = hex_to_rgb(c2)
            ri = int(r1 + (r2-r1)*t2)
            gi2 = int(g1 + (g2-g1)*t2)
            bi = int(b1 + (b2-b1)*t2)
            c.setFillColorRGB(ri/255, gi2/255, bi/255)
            c.rect(gx + si*step_w, grad_y-40, step_w+0.5, 40, fill=1, stroke=0)

        # Border
        c.setStrokeColor(HexColor("#9a7230"))
        c.setLineWidth(0.4)
        c.setStrokeAlpha(0.25)
        c.roundRect(gx, grad_y-40, gw, 40, 4, fill=0, stroke=1)
        c.setStrokeAlpha(1)

        c.setFillColor(HexColor("#1c1a12"))
        c.setFont("Helvetica-Bold", 7.5)
        c.drawString(gx, grad_y-55, gname)
        c.setFont("Helvetica", 6.5)
        c.setFillColor(HexColor("#5c5544"))
        c.drawString(gx, grad_y-65, gusage)

        # Stop hexes
        stop_hexes = [h1, h2] + ([h3] if h3 else [])
        for si, sh_val in enumerate(stop_hexes):
            sx = gx + (si / max(len(stop_hexes)-1, 1)) * gw
            c.setFillColor(HexColor(sh_val))
            c.circle(sx, grad_y-40, 5, fill=1, stroke=0)
            c.setFillColor(HexColor("#1c1a12"))
            c.setFont("Helvetica", 5.5)
            c.drawCentredString(sx, grad_y-55-18, sh_val.upper())

    # Functional tokens
    func_y = grad_y - 90
    c.setFillColor(HexColor("#2a6640"))
    c.setFont("Helvetica-Bold", 7)
    c.drawString(30, func_y, "FUNCTIONAL TOKENS  (opacity / glow / shadow)")
    rule(c, func_y-6, color="#9a7230")

    func_y -= 16
    for fi, (fname, fval, fusage) in enumerate(FUNCTIONAL):
        c.setFillColor(HexColor("#ede7d8") if fi%2==0 else HexColor("#e8e3d8"))
        c.rect(30, func_y-6, W-60, 14, fill=1, stroke=0)
        c.setFillColor(HexColor("#1c1a12"))
        c.setFont("Helvetica-Bold", 6.5)
        c.drawString(34, func_y-1, fname)
        c.setFont("Helvetica", 6.5)
        c.setFillColor(HexColor("#5c5544"))
        c.drawString(175, func_y-1, fval)
        c.drawString(330, func_y-1, fusage)
        func_y -= 14

    # Border radii
    func_y -= 10
    c.setFillColor(HexColor("#2a6640"))
    c.setFont("Helvetica-Bold", 7)
    c.drawString(30, func_y, "BORDER RADII")
    rule(c, func_y-6, color="#9a7230")

    func_y -= 16
    for ri2, (rname, rval, rusage) in enumerate(RADII):
        c.setFillColor(HexColor("#ede7d8") if ri2%2==0 else HexColor("#e8e3d8"))
        c.rect(30, func_y-6, W-60, 14, fill=1, stroke=0)
        c.setFillColor(HexColor("#1c1a12"))
        c.setFont("Helvetica-Bold", 6.5)
        c.drawString(34, func_y-1, rname)
        c.setFont("Helvetica", 6.5)
        c.setFillColor(HexColor("#9a7230"))
        c.drawString(175, func_y-1, rval)
        c.setFillColor(HexColor("#5c5544"))
        c.drawString(330, func_y-1, rusage)
        func_y -= 14

    c.showPage()

    # ── PAGE 3: LARGE SWATCHES — VIDEO/DESIGN REFERENCE ──────────────────────
    c.setFillColor(HexColor("#0a0c0a"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Header
    c.setFillColor(HexColor("#111611"))
    c.rect(0, H-54, W, 54, fill=1, stroke=0)
    c.setFillColor(HexColor("#c9a84c"))
    c.setFont("Helvetica-Bold", 18)
    c.drawString(30, H-34, "OUROBOROS")
    c.setFont("Helvetica", 9)
    c.setFillColor(HexColor("#9a9585"))
    c.drawString(162, H-34, "Color Palette")
    c.setFont("Helvetica", 7)
    c.setFillColor(HexColor("#5a5750"))
    c.drawRightString(W-30, H-34, "Video / Design Reference  ·  Page 3 of 3")
    c.setStrokeColor(HexColor("#c9a84c"))
    c.setLineWidth(1)
    c.setStrokeAlpha(0.4)
    c.line(0, H-54, W, H-54)
    c.setStrokeAlpha(1)

    # Two-column full-width swatches: dark left, light right
    all_pairs = list(zip(DARK_COLORS, LIGHT_COLORS))
    n = len(all_pairs)
    avail_h = H - 54 - 20 - 16  # space below header
    row_h = avail_h / n - 2

    c.setFillColor(HexColor("#4a8c5c"))
    c.setFont("Helvetica-Bold", 7)
    c.drawString(30, H-68, "DARK")
    c.drawString(W/2 + 10, H-68, "LIGHT")
    rule(c, H-74)

    for pi, ((dh, dn, du), (lh, ln, lu)) in enumerate(all_pairs):
        y = H - 76 - pi*(row_h+2) - row_h
        half = (W - 64) / 2

        # Dark swatch
        c.setFillColor(HexColor(dh))
        c.roundRect(30, y, half, row_h, 4, fill=1, stroke=0)
        dr, dg, db = hex_to_rgb(dh)
        dhh, dss, dll = hex_to_hsl(dh)
        dlc = label_color(dh)
        c.setFillColor(dlc)
        c.setFillAlpha(1)
        c.setFont("Helvetica-Bold", 7)
        c.drawString(36, y + row_h - 10, dn)
        c.setFont("Helvetica", 6.5)
        c.drawString(36, y + row_h - 19, dh.upper())
        c.setFillAlpha(0.75)
        c.setFont("Helvetica", 6)
        c.drawString(36, y + row_h - 27, f"RGB {dr} {dg} {db}")
        c.drawString(36, y + row_h - 34, f"HSL {dhh}° {dss}% {dll}%")
        c.setFillAlpha(0.5)
        c.drawString(36, y + 4, du)

        # Light swatch
        c.setFillAlpha(1)
        c.setFillColor(HexColor(lh))
        c.roundRect(W/2 + 10, y, half, row_h, 4, fill=1, stroke=0)
        lr2, lg2, lb2 = hex_to_rgb(lh)
        lhh, lss, lll = hex_to_hsl(lh)
        llc = label_color(lh)
        c.setFillColor(llc)
        c.setFillAlpha(1)
        c.setFont("Helvetica-Bold", 7)
        c.drawString(W/2 + 16, y + row_h - 10, ln)
        c.setFont("Helvetica", 6.5)
        c.drawString(W/2 + 16, y + row_h - 19, lh.upper())
        c.setFillAlpha(0.75)
        c.setFont("Helvetica", 6)
        c.drawString(W/2 + 16, y + row_h - 27, f"RGB {lr2} {lg2} {lb2}")
        c.drawString(W/2 + 16, y + row_h - 34, f"HSL {lhh}° {lss}% {lll}%")
        c.setFillAlpha(0.5)
        c.drawString(W/2 + 16, y + 4, lu)
        c.setFillAlpha(1)

    # Footer
    c.setFillColor(HexColor("#5a5750"))
    c.setFont("Helvetica", 6.5)
    c.drawCentredString(W/2, 14, "Ouroboros Brand — Color System 2026  ·  ouroboros.com")

    c.save()
    print(f"Saved → {path}")

make_pdf("/Users/anzordartsmelia/Desktop/ouroboros/ouroboros-color-palette.pdf")
