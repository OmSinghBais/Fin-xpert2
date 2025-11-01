import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY is not configured' }, { status: 400 })
    }
    const body = await req.json().catch(() => ({} as any))
    const messages = Array.isArray(body?.messages) ? body.messages : []
    const prompt = typeof body?.prompt === 'string' ? body.prompt : ''
    const inputMessages = messages.length
      ? messages
      : [{ role: 'user', content: prompt || 'Say hello' }]

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, ...inputMessages],
      temperature: 0.7,
    })

    const reply = completion.choices?.[0]?.message?.content || ''
    return NextResponse.json({ reply })
  } catch (err) {
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 })
  }
}
