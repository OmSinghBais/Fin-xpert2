import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 400 })
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

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are an assistant for a financial advisor CRM. Create a concise client summary and 3 next-best-actions focused on engagement and AUM growth. Keep under 150 words.

Client data:
${JSON.stringify(details, null, 2)}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const summary = response.text()

    return NextResponse.json({ summary })
  } catch (e) {
    console.error('Gemini API error:', e)
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 })
  }
}

