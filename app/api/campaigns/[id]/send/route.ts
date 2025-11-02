import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    const campaign = await prisma.campaign.findUnique({ where: { id } })
    if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // For MVP: target all clients in the campaign's organization
    const clients = await prisma.client.findMany({ where: { orgId: campaign.orgId } })

    // Create Message entries (pending) for each client
    const created = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Upsert status to 'sent' (or 'scheduled' if scheduledAt)
      await tx.campaign.update({
        where: { id: campaign.id },
        data: { status: campaign.scheduledAt ? 'scheduled' : 'sent' },
      })
      if (clients.length === 0) return []
      const messages = await tx.message.createMany({
        data: clients.map((c: { id: number }) => ({ campaignId: campaign.id, clientId: c.id, status: 'pending' })),
      })
      return messages
    })

    // Stub delivery: we are not integrating real providers here
    return NextResponse.json({ ok: true, enqueued: clients.length })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to send campaign' }, { status: 500 })
  }
}
