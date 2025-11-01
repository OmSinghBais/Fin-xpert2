import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: 'desc' } } },
  })

  if (!campaign) {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Campaign not found</h1>
        <Link href="/dashboard/campaigns/manage" style={{ color: '#2563eb' }}>← Back to Manage</Link>
      </main>
    )
  }

  type MessageItem = typeof campaign.messages[number]
  type Counts = { total: number; pending: number; sent: number; failed: number }

  const counts = campaign.messages.reduce(
    (acc: Counts, m: MessageItem) => {
      acc.total += 1
      // narrow status to known keys
      if (m.status === 'pending' || m.status === 'sent' || m.status === 'failed') {
        const key: keyof Counts = m.status
        acc[key] = (acc[key] ?? 0) + 1
      }
      return acc
    },
    { total: 0, pending: 0, sent: 0, failed: 0 } as Counts
  )

  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>{campaign.name}</h1>
        <Link href="/dashboard/campaigns/manage" style={{ color: '#2563eb' }}>← Back</Link>
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ color: '#6b7280' }}>Channel: {campaign.channel.toUpperCase()} · Status: {campaign.status}{campaign.scheduledAt ? ` · Scheduled: ${new Date(campaign.scheduledAt).toLocaleString()}` : ''}</div>
        <div style={{ color: '#6b7280' }}>Created: {new Date(campaign.createdAt).toLocaleString()}</div>
        <div style={{ color: '#6b7280' }}>Messages: total {counts.total} · pending {counts.pending} · sent {counts.sent} · failed {counts.failed}</div>
      </div>

      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Template</h2>
        <pre style={{ whiteSpace: 'pre-wrap', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>{campaign.template}</pre>
      </section>

      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Message Logs</h2>
        <ul style={{ display: 'grid', gap: 10, listStyle: 'none', padding: 0 }}>
          {campaign.messages.map((m: MessageItem) => (
            <li key={m.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
              <div><strong>Status:</strong> {m.status}{m.sentAt ? ` · ${new Date(m.sentAt).toLocaleString()}` : ''}</div>
              {m.error ? <div style={{ color: '#ef4444' }}><strong>Error:</strong> {m.error}</div> : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
