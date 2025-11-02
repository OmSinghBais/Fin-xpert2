import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ posts })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, content } = body || {}
    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'title is required' }, { status: 400 })
    }
    const post = await prisma.post.create({ data: { title, content } })
    return NextResponse.json({ post }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
