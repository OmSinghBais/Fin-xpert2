import prisma from '@/lib/prisma'
import AIInsights from './AIInsights'
import Link from 'next/link'

export default async function ReportsPage() {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const [clientsTotal, clientsNewWeek, interactions7, interactions30, campaigns, messages] = await Promise.all([
    prisma.client.count(),
    prisma.client.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.interaction.count({ where: { occurredAt: { gte: weekAgo } } }),
    prisma.interaction.count({ where: { occurredAt: { gte: monthAgo } } }),
    prisma.campaign.count(),
    prisma.message.groupBy({ by: ['status'], _count: { status: true } })
  ])

  const msgMap: Record<string, number> = { pending: 0, sent: 0, failed: 0 }
  for (const m of messages) {
    msgMap[m.status] = m._count.status
  }

  const metrics = {
    clients: { total: clientsTotal, newThisWeek: clientsNewWeek },
    interactions: { last7: interactions7, last30: interactions30 },
    campaigns: { total: campaigns },
    messages: msgMap as { pending: number; sent: number; failed: number },
    generatedAt: now.toISOString(),
  }

  const cards = [
    { title: 'Clients', value: metrics.clients.total, sub: `New this week: ${metrics.clients.newThisWeek}` },
    { title: 'Interactions', value: metrics.interactions.last7, sub: `Last 30 days: ${metrics.interactions.last30}` },
    { title: 'Campaigns', value: metrics.campaigns.total, sub: `Pending: ${metrics.messages.pending}` },
    { title: 'Messages Sent', value: metrics.messages.sent, sub: `Failed: ${metrics.messages.failed}` },
  ]

  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Reports</h1>
        <Link href="/dashboard/insights" style={{ color: '#2563eb' }}>Insights →</Link>
      </div>

      <section style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {cards.map((c, idx) => (
          <div key={idx} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 14, color: '#6b7280' }}>{c.title}</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{c.value}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{c.sub}</div>
          </div>
        ))}
      </section>

      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>AI Insights</h2>
        <AIInsights metrics={metrics as any} />
      </section>
    </main>
  )
}
