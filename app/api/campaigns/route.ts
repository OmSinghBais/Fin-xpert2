import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ campaigns })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to list campaigns' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any))
    const { orgId = 1, name, channel, template, scheduledAt } = body || {}
    if (!name || !channel || !template) {
      return NextResponse.json({ error: 'name, channel, and template are required' }, { status: 400 })
    }
    const campaign = await prisma.campaign.create({
      data: { orgId, name, channel, template, scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined },
    })
    return NextResponse.json({ campaign }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}
