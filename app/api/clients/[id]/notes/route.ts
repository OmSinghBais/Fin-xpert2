import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const clientId = Number(params.id)
    const body = await req.json()
    const { content } = body || {}
    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'content is required' }, { status: 400 })
    }
    const note = await prisma.note.create({ data: { clientId, content } })
    return NextResponse.json({ note }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
  }
}
