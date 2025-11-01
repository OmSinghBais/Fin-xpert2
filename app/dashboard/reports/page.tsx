import prisma from '@/lib/prisma'
import AIInsights from './AIInsights'
import ReportsControls from './ReportsControls'
import TimeSeriesCharts from './TimeSeriesCharts'
import ExportCSV from './ExportCSV'
import Link from 'next/link'

type Range = 7 | 30 | 90

function toDateKey(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default async function ReportsPage({ searchParams }: { searchParams: { [k: string]: string | string[] | undefined } }) {
  const now = new Date()
  const rangeParam = Array.isArray(searchParams?.range) ? searchParams.range[0] : searchParams?.range
  const range: Range = (rangeParam === '7' || rangeParam === '90') ? Number(rangeParam) as Range : 30
  const start = new Date(now.getTime() - range * 24 * 60 * 60 * 1000)

  const [clientsTotal, clientsNewWeek, interactionsSince, messagesSince, campaigns, messagesStatus] = await Promise.all([
    prisma.client.count(),
    prisma.client.count({ where: { createdAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) } } }),
    prisma.interaction.findMany({ where: { occurredAt: { gte: start } }, select: { occurredAt: true } }),
    prisma.message.findMany({ where: { createdAt: { gte: start } }, select: { createdAt: true } }),
    prisma.campaign.count(),
    prisma.message.groupBy({ by: ['status'], _count: { status: true } })
  ])

  const msgMap: Record<string, number> = { pending: 0, sent: 0, failed: 0 }
  for (const m of messagesStatus) msgMap[m.status] = m._count.status

  // Build day buckets
  const days: string[] = []
  for (let i = range; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    days.push(toDateKey(d))
  }
  const interMap: Record<string, number> = Object.fromEntries(days.map((d) => [d, 0]))
  const msgMapTS: Record<string, number> = Object.fromEntries(days.map((d) => [d, 0]))
  interactionsSince.forEach((x: { occurredAt: Date }) => {
    interMap[toDateKey(new Date(x.occurredAt))] = (interMap[toDateKey(new Date(x.occurredAt))] ?? 0) + 1
  })
  messagesSince.forEach((x: { createdAt: Date }) => {
    msgMapTS[toDateKey(new Date(x.createdAt))] = (msgMapTS[toDateKey(new Date(x.createdAt))] ?? 0) + 1
  })
  const series = days.map((d) => ({ date: d, interactions: interMap[d] ?? 0, messages: msgMapTS[d] ?? 0 }))

  const metrics = {
    clients: { total: clientsTotal, newThisWeek: clientsNewWeek },
    interactions: { last7: interactionsSince.filter((x: { occurredAt: Date }) => x.occurredAt >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)).length, last30: interactionsSince.length },
    campaigns: { total: campaigns },
    messages: msgMap as { pending: number; sent: number; failed: number },
    generatedAt: now.toISOString(),
    range,
  }

  const cards = [
    { title: 'Clients', value: metrics.clients.total, sub: `New this week: ${metrics.clients.newThisWeek}` },
    { title: `Interactions (${range}d)`, value: metrics.interactions.last30, sub: `Last 7 days: ${metrics.interactions.last7}` },
    { title: 'Campaigns', value: metrics.campaigns.total, sub: `Pending: ${metrics.messages.pending}` },
    { title: 'Messages Sent', value: metrics.messages.sent, sub: `Failed: ${metrics.messages.failed}` },
    { title: 'AUM (placeholder)', value: '—', sub: 'Model portfolios to enable' },
  ]

  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Reports</h1>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <ReportsControls />
          <ExportCSV metrics={metrics as any} series={series} />
          <Link href="/dashboard/insights" style={{ color: '#2563eb' }}>Insights →</Link>
        </div>
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

      <TimeSeriesCharts data={series} />

      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>AI Insights</h2>
        <AIInsights metrics={metrics as any} />
      </section>
    </main>
  )
}
