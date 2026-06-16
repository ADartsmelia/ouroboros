import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const COURSE_LABELS: Record<string, string> = {
  mixology:    "Mixology — 6 weeks · 450 ₾ · Starts Jul 14",
  programming: "Programming — 6 weeks · 800 ₾ · Starts Jul 16",
};

export async function POST(req: Request) {
  try {
    const { course, firstName, lastName, dob, email, phone } = await req.json();

    const courseLabel = COURSE_LABELS[course] ?? course;

    const html = `
      <div style="font-family:sans-serif;max-width:580px;margin:0 auto;background:#0a0a0a;color:#e5e5e5;padding:40px;border-radius:8px;">
        <h1 style="color:#c9a84c;font-size:22px;margin-bottom:4px;">New Registration — Orabora Academy</h1>
        <p style="color:#666;font-size:13px;margin-bottom:32px;">Submitted via orabora-academy.com</p>

        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr style="border-bottom:1px solid #1a1a1a;">
            <td style="padding:12px 0;color:#888;width:160px;">Course</td>
            <td style="padding:12px 0;color:#c9a84c;font-weight:bold;">${courseLabel}</td>
          </tr>
          <tr style="border-bottom:1px solid #1a1a1a;">
            <td style="padding:12px 0;color:#888;">Name</td>
            <td style="padding:12px 0;color:#e5e5e5;">${firstName} ${lastName}</td>
          </tr>
          <tr style="border-bottom:1px solid #1a1a1a;">
            <td style="padding:12px 0;color:#888;">Date of birth</td>
            <td style="padding:12px 0;color:#e5e5e5;">${dob}</td>
          </tr>
          <tr style="border-bottom:1px solid #1a1a1a;">
            <td style="padding:12px 0;color:#888;">Email</td>
            <td style="padding:12px 0;"><a href="mailto:${email}" style="color:#4a8c5c;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#888;">Phone</td>
            <td style="padding:12px 0;"><a href="tel:${phone}" style="color:#4a8c5c;">${phone}</a></td>
          </tr>
        </table>

        <hr style="border:none;border-top:1px solid #1a1a1a;margin:32px 0;" />
        <p style="color:#444;font-size:12px;text-align:center;">Orabora Academy · orabora-academy.com</p>
      </div>
    `;

    await resend.emails.send({
      from: "Orabora Academy <onboarding@resend.dev>",
      to: "info@orabora-academy.com",
      replyTo: email,
      subject: `New Registration — ${firstName} ${lastName} · ${courseLabel.split("—")[0].trim()}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
