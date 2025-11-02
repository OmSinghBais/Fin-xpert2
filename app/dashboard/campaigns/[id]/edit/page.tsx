import prisma from '@/lib/prisma'
import Link from 'next/link'
import Editor from './Editor'

export default async function CampaignEditPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const campaign = await prisma.campaign.findUnique({ where: { id }, include: { org: true } })
  if (!campaign) {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Campaign not found</h1>
        <Link href="/dashboard/campaigns/manage" style={{ color: '#2563eb' }}>← Back to Manage</Link>
      </main>
    )
  }
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Edit Template · {campaign.name}</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href={`/dashboard/campaigns/${campaign.id}`} style={{ color: '#2563eb' }}>View</Link>
          <Link href="/dashboard/campaigns/manage" style={{ color: '#2563eb' }}>← Back</Link>
        </div>
      </div>
      <Editor id={campaign.id} initial={campaign.template} orgName={campaign.org.name} />
    </main>
  )
}
