import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ clients })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to list clients' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { orgId = 1, name, email, phone, riskProfile, kycStatus } = body || {}
    if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 })
    const client = await prisma.client.create({ data: { orgId, name, email, phone, riskProfile, kycStatus } })
    return NextResponse.json({ client }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
