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
  const prevStart = new Date(start.getTime() - range * 24 * 60 * 60 * 1000)
  const prevEnd = new Date(start)

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

  // KPI 1: Top engaged clients (by interactions count in range)
  const topInteractions = await prisma.interaction.groupBy({
    by: ['clientId'],
    where: { occurredAt: { gte: start } },
    _count: { clientId: true },
    _max: { occurredAt: true },
    orderBy: { _count: { clientId: 'desc' } },
    take: 10,
  })
  const topClientIds = topInteractions.map((t) => t.clientId)
  const topClients = await prisma.client.findMany({ where: { id: { in: topClientIds } }, select: { id: true, name: true, email: true } })
  const clientMap: Record<number, { name: string | null; email: string | null }> = {}
  topClients.forEach((c) => { clientMap[c.id] = { name: c.name, email: c.email } })

  // KPI 2: Campaign performance (messages counts by campaign in range)
  const msgByCampaign = await prisma.message.groupBy({
    by: ['campaignId', 'status'],
    where: { createdAt: { gte: start } },
    _count: { campaignId: true },
  })
  const campaignIds = Array.from(new Set(msgByCampaign.map((m) => m.campaignId)))
  const campaignsInfo = await prisma.campaign.findMany({ where: { id: { in: campaignIds } }, select: { id: true, name: true, channel: true, createdAt: true } })
  const campMap: Record<number, { name: string; channel: string; createdAt: Date }> = {}
  campaignsInfo.forEach((c) => { campMap[c.id] = { name: c.name, channel: String(c.channel), createdAt: c.createdAt } })
  const campAgg: Record<number, { sent: number; pending: number; failed: number }> = {}
  msgByCampaign.forEach((m) => {
    if (!campAgg[m.campaignId]) campAgg[m.campaignId] = { sent: 0, pending: 0, failed: 0 }
    if (m.status === 'sent' || m.status === 'pending' || m.status === 'failed') {
      ;(campAgg[m.campaignId] as any)[m.status] = (campAgg[m.campaignId] as any)[m.status] + m._count.campaignId
    }
  })

  // KPI 3: Growth funnel with previous period comparison
  const [clientsCurr, clientsPrev, interCurr, interPrev, sentCurr, sentPrev] = await Promise.all([
    prisma.client.count({ where: { createdAt: { gte: start } } }),
    prisma.client.count({ where: { createdAt: { gte: prevStart, lt: prevEnd } } }),
    prisma.interaction.count({ where: { occurredAt: { gte: start } } }),
    prisma.interaction.count({ where: { occurredAt: { gte: prevStart, lt: prevEnd } } }),
    prisma.message.count({ where: { createdAt: { gte: start }, status: 'sent' } }),
    prisma.message.count({ where: { createdAt: { gte: prevStart, lt: prevEnd }, status: 'sent' } }),
  ])
  function pct(curr: number, prev: number) {
    if (prev === 0) return curr > 0 ? '+∞%' : '0%'
    const v = ((curr - prev) / prev) * 100
    const sign = v > 0 ? '+' : ''
    return `${sign}${v.toFixed(1)}%`
  }

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

      {/* Growth funnel */}
      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Growth Funnel ({range}d)</h2>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 14, color: '#6b7280' }}>New Clients</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{clientsCurr}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>vs prev: {clientsPrev} ({pct(clientsCurr, clientsPrev)})</div>
          </div>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 14, color: '#6b7280' }}>Interactions</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{interCurr}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>vs prev: {interPrev} ({pct(interCurr, interPrev)})</div>
          </div>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 14, color: '#6b7280' }}>Messages Sent</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{sentCurr}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>vs prev: {sentPrev} ({pct(sentCurr, sentPrev)})</div>
          </div>
        </div>
      </section>

      {/* Top engaged clients */}
      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Top Engaged Clients</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: 8 }}>Client</th>
                <th style={{ padding: 8 }}>Email</th>
                <th style={{ padding: 8 }}>Interactions</th>
                <th style={{ padding: 8 }}>Last Interaction</th>
              </tr>
            </thead>
            <tbody>
              {topInteractions.map((t) => (
                <tr key={t.clientId} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: 8 }}>{clientMap[t.clientId]?.name ?? `#${t.clientId}`}</td>
                  <td style={{ padding: 8 }}>{clientMap[t.clientId]?.email ?? '-'}</td>
                  <td style={{ padding: 8 }}>{t._count.clientId}</td>
                  <td style={{ padding: 8 }}>{t._max.occurredAt ? new Date(t._max.occurredAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Campaign performance */}
      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Campaign Performance ({range}d)</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: 8 }}>Campaign</th>
                <th style={{ padding: 8 }}>Channel</th>
                <th style={{ padding: 8 }}>Sent</th>
                <th style={{ padding: 8 }}>Pending</th>
                <th style={{ padding: 8 }}>Failed</th>
                <th style={{ padding: 8 }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(campAgg).map((idStr) => {
                const id = Number(idStr)
                const agg = campAgg[id]
                const meta = campMap[id]
                if (!meta) return null
                return (
                  <tr key={id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: 8 }}>{meta.name}</td>
                    <td style={{ padding: 8 }}>{meta.channel.toUpperCase()}</td>
                    <td style={{ padding: 8 }}>{agg.sent}</td>
                    <td style={{ padding: 8 }}>{agg.pending}</td>
                    <td style={{ padding: 8 }}>{agg.failed}</td>
                    <td style={{ padding: 8 }}>{new Date(meta.createdAt).toLocaleDateString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>AI Insights</h2>
        <AIInsights metrics={metrics as any} />
      </section>
    </main>
  )
}
