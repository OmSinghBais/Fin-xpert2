import prisma from '@/lib/prisma'
import Link from 'next/link'
import InteractionForm from './InteractionForm'
import NotesForm from './NotesForm'
import AISummary from './AISummary'

export default async function ClientDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const client = await prisma.client.findUnique({
    where: { id },
    include: { interactions: { orderBy: { occurredAt: 'desc' } }, notes: { orderBy: { createdAt: 'desc' } }, tasks: true },
  })

  if (!client) {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Client not found</h1>
        <Link href="/dashboard/clients" style={{ color: '#2563eb' }}>Back to Clients</Link>
      </main>
    )
  }

  type InteractionItem = typeof client.interactions[number]
  type NoteItem = typeof client.notes[number]

  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>{client.name}</h1>
        <Link href="/dashboard/clients" style={{ color: '#2563eb' }}>← Back</Link>
      </div>
      <div style={{ color: '#6b7280' }}>{[client.email, client.phone].filter(Boolean).join(' · ')}</div>
      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr', alignItems: 'start' }}>
        <section style={{ display: 'grid', gap: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>AI Summary</h2>
          <AISummary clientId={client.id} />
        </section>
        <section style={{ display: 'grid', gap: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Interactions</h2>
          <InteractionForm clientId={client.id} />
          <ul style={{ display: 'grid', gap: 10, listStyle: 'none', padding: 0 }}>
            {client.interactions.map((i: InteractionItem) => (
              <li key={i.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 600 }}>{i.type}{i.channel ? ` · ${i.channel}` : ''}</div>
                <div style={{ color: '#374151', marginTop: 4 }}>{i.summary}</div>
                <div style={{ color: '#6b7280', fontSize: 12, marginTop: 6 }}>{new Date(i.occurredAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </section>
        <section style={{ display: 'grid', gap: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Notes</h2>
          <NotesForm clientId={client.id} />
          <ul style={{ display: 'grid', gap: 10, listStyle: 'none', padding: 0 }}>
            {client.notes.map((n: NoteItem) => (
              <li key={n.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
                <div>{n.content}</div>
                <div style={{ color: '#6b7280', fontSize: 12, marginTop: 6 }}>{new Date(n.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
