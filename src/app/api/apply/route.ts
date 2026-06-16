import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const PATH_LABELS: Record<string, string> = {
  pour: "Mixology",
  build: "Programming",
  unsure: "Not sure yet",
};

const CYCLE_LABELS: Record<string, string> = {
  cycle9: "Cycle 9 — July 2026",
  cycle10: "Cycle 10 — September 2026",
  notify: "Notify me of future cycles",
};

export async function POST(req: Request) {
  try {
    const { email, answers } = await req.json();

    const path = PATH_LABELS[answers.path] ?? answers.path;
    const readiness = CYCLE_LABELS[answers.readiness] ?? answers.readiness;

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e5e5e5; padding: 40px; border-radius: 8px;">
        <h1 style="color: #c9a84c; font-size: 24px; margin-bottom: 4px;">New Application — Orabora Academy</h1>
        <p style="color: #888; font-size: 14px; margin-bottom: 32px;">Submitted by <strong style="color: #e5e5e5;">${email}</strong></p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 4px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 180px;">Path</td>
            <td style="padding: 4px 0; color: #c9a84c; font-weight: bold;">${path}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">When to start</td>
            <td style="padding: 4px 0; color: #e5e5e5;">${readiness}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />

        <div style="margin-bottom: 24px;">
          <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">What are they trying to shed?</p>
          <p style="color: #e5e5e5; line-height: 1.7; white-space: pre-wrap;">${answers.why ?? "—"}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Moment they surprised themselves</p>
          <p style="color: #e5e5e5; line-height: 1.7; white-space: pre-wrap;">${answers.evidence ?? "—"}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">What would make them quit?</p>
          <p style="color: #e5e5e5; line-height: 1.7; white-space: pre-wrap;">${answers.commitment ?? "—"}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />
        <p style="color: #555; font-size: 12px; text-align: center;">Orabora Academy · orabora-academy.com</p>
      </div>
    `;

    await resend.emails.send({
      from: "Orabora Academy <onboarding@resend.dev>",
      to: "info@orabora-academy.com",
      replyTo: email,
      subject: `New Application — ${path} · ${email}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
