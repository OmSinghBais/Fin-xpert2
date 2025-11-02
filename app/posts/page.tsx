import prisma from '@/lib/prisma'
import PostCreator from './PostCreator'

export default async function PostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  type PostItem = Awaited<ReturnType<typeof prisma.post.findMany>>[number]
  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Posts</h1>
      <PostCreator />
      <ul style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0 }}>
        {posts.map((p: PostItem) => (
          <li key={p.id} style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
            <div style={{ fontWeight: 600 }}>{p.title}</div>
            {p.content ? <div style={{ color: '#374151', marginTop: 4 }}>{p.content}</div> : null}
            <div style={{ color: '#6b7280', fontSize: 12, marginTop: 6 }}>
              {new Date(p.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
