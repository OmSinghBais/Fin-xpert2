import prisma from '@/lib/prisma'
import Link from 'next/link'
import ClientCreate from './ClientCreate'

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' } })
  type ClientItem = Awaited<ReturnType<typeof prisma.client.findMany>>[number]
  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Clients</h1>
      <ClientCreate />
      <ul style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0 }}>
        {clients.map((c: ClientItem) => (
          <li key={c.id} style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{c.name}</div>
              <div style={{ color: '#6b7280', fontSize: 12 }}>{[c.email, c.phone].filter(Boolean).join(' · ')}</div>
            </div>
            <Link href={`/dashboard/clients/${c.id}`} style={{ color: '#2563eb' }}>Open →</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
