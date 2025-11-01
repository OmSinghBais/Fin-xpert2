import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import OpenAI from 'openai'

export async function GET() {
  try {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const [clientsTotal, clientsNewWeek, interactions7, interactions30, campaigns, messages] = await Promise.all([
      prisma.client.count(),
      prisma.client.count({ where: { createdAt: { gte: weekAgo } } }),
      prisma.interaction.count({ where: { occurredAt: { gte: weekAgo } } }),
      prisma.interaction.count({ where: { occurredAt: { gte: monthAgo } } }),
      prisma.campaign.count(),
      prisma.message.groupBy({ by: ['status'], _count: { status: true } })
    ])

    const msgMap: Record<string, number> = { pending: 0, sent: 0, failed: 0 }
    for (const m of messages) {
      msgMap[m.status] = m._count.status
    }

    return NextResponse.json({
      clients: { total: clientsTotal, newThisWeek: clientsNewWeek },
      interactions: { last7: interactions7, last30: interactions30 },
      campaigns: { total: campaigns },
      messages: msgMap,
      generatedAt: now.toISOString(),
    })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to compute insights' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY is not configured' }, { status: 400 })
    }
    const body = await req.json().catch(() => ({} as any))
    const metrics = body?.metrics
    if (!metrics) return NextResponse.json({ error: 'metrics are required' }, { status: 400 })
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      messages: [
        { role: 'system', content: 'You are an analytics assistant for a financial advisor CRM. Provide a succinct analysis (<=120 words) and 3 action items that can increase AUM and engagement.' },
        { role: 'user', content: `Metrics (JSON): ${JSON.stringify(metrics)}` },
      ],
    })
    const text = completion.choices?.[0]?.message?.content || ''
    return NextResponse.json({ analysis: text })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 })
  }
}
