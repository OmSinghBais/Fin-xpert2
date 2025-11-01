import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getResend, getFromAddress } from '@/lib/email'
import { wrapHtml } from '@/lib/emailTemplate'

function renderTemplate(template: string, vars: Record<string, string | undefined>) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => vars[key] ?? '')
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export async function POST(req: Request) {
  try {
    const token = process.env.DISPATCH_TOKEN
    if (token) {
      const header = req.headers.get('authorization') || req.headers.get('Authorization')
      const expected = `Bearer ${token}`
      if (header !== expected) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }
    const resend = getResend()
    const from = getFromAddress()
    const now = new Date()

    // Batch size and retry policy
    const BATCH = 20
    const MAX_ATTEMPTS = 3

    // Find pending email messages whose campaign is due (scheduledAt <= now or null)
    const messages = await prisma.message.findMany({
      where: {
        status: 'pending',
        OR: [
          { nextAttemptAt: null },
          { nextAttemptAt: { lte: now } },
        ],
        campaign: {
          channel: 'email' as any,
          OR: [
            { scheduledAt: null },
            { scheduledAt: { lte: now } },
          ],
        },
        client: { email: { not: null } },
      },
      include: { campaign: { include: { org: true } }, client: true },
      take: BATCH,
      orderBy: { createdAt: 'asc' },
    })

    if (messages.length === 0) {
      return NextResponse.json({ ok: true, processed: 0 })
    }

    let processed = 0
    for (const m of messages) {
      const to = m.client!.email!
      const subject = m.campaign!.name
      const htmlBody = renderTemplate(m.campaign!.template, {
        // client vars
        name: m.client!.name ?? undefined,
        email: m.client!.email ?? undefined,
        phone: m.client!.phone ?? undefined,
        riskProfile: (m.client as any)?.riskProfile ?? undefined,
        // campaign vars
        campaign: m.campaign!.name,
        // organization vars
        org: m.campaign!.org.name,
        orgName: m.campaign!.org.name,
      })
      const brandedHtml = wrapHtml(htmlBody, { orgName: m.campaign!.org.name })
      const text = stripHtml(brandedHtml)

      try {
        await resend.emails.send({ from, to, subject, html: brandedHtml, text })
        await prisma.message.update({
          where: { id: m.id },
          data: { status: 'sent', sentAt: new Date(), attempts: { increment: 1 }, lastAttemptAt: new Date(), error: null },
        })
      } catch (err: any) {
        const attempts = m.attempts + 1
        const base = Math.min(60 * 60, Math.pow(2, attempts) * 30) // up to 1h
        const next = new Date(Date.now() + base * 1000)
        await prisma.message.update({
          where: { id: m.id },
          data: {
            status: attempts >= MAX_ATTEMPTS ? 'failed' : 'pending',
            error: String(err?.message ?? 'send failed'),
            attempts,
            lastAttemptAt: new Date(),
            nextAttemptAt: next,
          },
        })
      }
      processed += 1
    }

    return NextResponse.json({ ok: true, processed })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Dispatch failed' }, { status: 500 })
  }
}
