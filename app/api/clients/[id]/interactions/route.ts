import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const clientId = Number(params.id)
    const body = await req.json()
    const { type, channel, summary, occurredAt } = body || {}
    if (!type || !summary) {
      return NextResponse.json({ error: 'type and summary are required' }, { status: 400 })
    }
    const interaction = await prisma.interaction.create({
      data: { clientId, type, channel, summary, occurredAt: occurredAt ? new Date(occurredAt) : undefined },
    })
    return NextResponse.json({ interaction }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create interaction' }, { status: 500 })
  }
}
