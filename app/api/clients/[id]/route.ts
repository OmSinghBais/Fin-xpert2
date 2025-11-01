import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    const client = await prisma.client.findUnique({
      where: { id },
      include: { interactions: true, notes: true, tasks: true },
    })
    if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ client })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to get client' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    const body = await req.json()
    const { name, email, phone, riskProfile, kycStatus } = body || {}
    const client = await prisma.client.update({
      where: { id },
      data: { name, email, phone, riskProfile, kycStatus },
    })
    return NextResponse.json({ client })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    await prisma.client.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 })
  }
}
