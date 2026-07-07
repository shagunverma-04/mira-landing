import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const { name, email, phone, properties } = await request.json()

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Mira Landing" <${process.env.GMAIL_USER}>`,
      to: 'miraoncall@gmail.com',
      replyTo: email,
      subject: `Demo Request — ${name}`,
      html: `
        <div style="font-family:'DM Sans',sans-serif;background:#0F0E0C;padding:32px;border-radius:16px;max-width:560px;margin:0 auto;">
          <div style="font-size:28px;color:#D94F3D;margin-bottom:8px;">✳</div>
          <h2 style="font-family:Georgia,serif;font-style:italic;font-size:24px;color:#F5F0E8;margin:0 0 24px;">New Demo Request</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:10px 16px 10px 0;color:#8A7E72;white-space:nowrap;vertical-align:top;">Name</td>
              <td style="padding:10px 0;color:#F5F0E8;font-weight:500;">${name}</td>
            </tr>
            <tr style="border-top:1px solid rgba(255,255,255,0.06);">
              <td style="padding:10px 16px 10px 0;color:#8A7E72;white-space:nowrap;vertical-align:top;">Email</td>
              <td style="padding:10px 0;color:#F5F0E8;">${email}</td>
            </tr>
            <tr style="border-top:1px solid rgba(255,255,255,0.06);">
              <td style="padding:10px 16px 10px 0;color:#8A7E72;white-space:nowrap;vertical-align:top;">Phone</td>
              <td style="padding:10px 0;color:#F5F0E8;">${phone}</td>
            </tr>
            <tr style="border-top:1px solid rgba(255,255,255,0.06);">
              <td style="padding:10px 16px 10px 0;color:#8A7E72;white-space:nowrap;vertical-align:top;">Properties</td>
              <td style="padding:10px 0;color:#F5F0E8;">${properties || '—'}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:rgba(201,168,130,0.06);border:1px solid rgba(201,168,130,0.15);border-radius:10px;">
            <p style="font-size:12px;color:#8A7E72;margin:0;">Reply to this email to reach <strong style="color:#C9A882;">${name}</strong> directly.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
