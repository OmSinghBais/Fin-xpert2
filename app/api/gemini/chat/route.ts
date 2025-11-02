import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 400 })
    }
    const body = await req.json().catch(() => ({} as any))
    const messages = Array.isArray(body?.messages) ? body.messages : []
    const prompt = typeof body?.prompt === 'string' ? body.prompt : ''
    
    // Prepare input messages
    let inputMessages = messages.length
      ? messages.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`).join('\n')
      : prompt || 'Say hello'

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const result = await model.generateContent(inputMessages)
    const response = await result.response
    const reply = response.text()

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('Gemini API error:', err)
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 })
  }
}

