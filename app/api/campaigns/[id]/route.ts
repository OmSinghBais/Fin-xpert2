import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: { messages: true },
    })
    if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ campaign })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to get campaign' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    const body = await req.json().catch(() => ({} as any))
    const { name, channel, template, scheduledAt, status } = body || {}
    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        name,
        channel,
        template,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
        status,
      },
    })
    return NextResponse.json({ campaign })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    await prisma.message.deleteMany({ where: { campaignId: id } })
    await prisma.campaign.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 })
  }
}
