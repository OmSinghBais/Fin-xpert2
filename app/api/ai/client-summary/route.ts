import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY is not configured' }, { status: 400 })
    }
    const body = await req.json().catch(() => ({} as any))
    const clientId = Number(body?.clientId)
    if (!clientId) return NextResponse.json({ error: 'clientId is required' }, { status: 400 })

    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: { interactions: true, notes: true },
    })
    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 })

    const details = {
      name: client.name,
      email: client.email,
      phone: client.phone,
      riskProfile: client.riskProfile,
      kycStatus: client.kycStatus,
      notes: client.notes?.map((n: { content: string }) => n.content) ?? [],
      interactions:
        client.interactions?.map((i: { type: string; channel: string | null; summary: string; occurredAt: Date }) => ({
          type: i.type,
          channel: i.channel,
          summary: i.summary,
          occurredAt: i.occurredAt,
        })) ?? [],
    }

    const clientAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await clientAI.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.5,
      messages: [
        { role: 'system', content: 'You are an assistant for a financial advisor CRM. Create a concise client summary and 3 next-best-actions focused on engagement and AUM growth. Keep under 150 words.' },
        { role: 'user', content: `Client data (JSON): ${JSON.stringify(details)}` },
      ],
    })

    const summary = completion.choices?.[0]?.message?.content || ''
    return NextResponse.json({ summary })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 })
  }
}
