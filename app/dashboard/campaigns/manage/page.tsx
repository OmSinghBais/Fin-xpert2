import prisma from '@/lib/prisma'
import Link from 'next/link'
import CampaignCreate from './CampaignCreate'
import ManageActions from './ManageActions'
import DispatchNow from './DispatchNow'

export default async function CampaignManagePage() {
  const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: 'desc' }, include: { messages: true } })
  type CampaignItem = Awaited<ReturnType<typeof prisma.campaign.findMany>>[number]
  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Manage Campaigns</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <DispatchNow />
          <Link href="/dashboard/campaigns" style={{ color: '#2563eb' }}>← Back</Link>
        </div>
      </div>

      <CampaignCreate />

      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>All Campaigns</h2>
        <ul style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0 }}>
          {campaigns.map((c: CampaignItem) => (
            <li key={c.id} style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{c.name} <span style={{ color: '#6b7280' }}>· {c.channel.toUpperCase()}</span></div>
                <div style={{ color: '#6b7280', fontSize: 12 }}>Status: {c.status}{c.scheduledAt ? ` · Sched: ${new Date(c.scheduledAt).toLocaleString()}` : ''}</div>
                {(() => {
                  type Counts = { total: number; pending: number; sent: number; failed: number }
                  type Msg = typeof c.messages[number]
                  const counts = c.messages.reduce(
                    (acc: Counts, m: Msg) => {
                      acc.total += 1
                      if (m.status === 'pending' || m.status === 'sent' || m.status === 'failed') {
                        const key: keyof Counts = m.status
                        acc[key] += 1
                      }
                      return acc
                    },
                    { total: 0, pending: 0, sent: 0, failed: 0 } as Counts
                  )
                  return (
                    <div style={{ color: '#6b7280', fontSize: 12 }}>
                      Msg: total {counts.total} · pending {counts.pending} · sent {counts.sent} · failed {counts.failed}
                    </div>
                  )
                })()}
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Link href={`/dashboard/campaigns/${c.id}`} style={{ color: '#2563eb' }}>View</Link>
                <ManageActions id={c.id} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
