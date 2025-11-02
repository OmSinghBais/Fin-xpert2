'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CampaignCreate() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [channel, setChannel] = useState<'email' | 'sms' | 'whatsapp'>('email')
  const [template, setTemplate] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !template.trim()) {
      setError('Name and template are required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, channel, template, scheduledAt: scheduledAt || undefined })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to create campaign')
      setName('')
      setChannel('email')
      setTemplate('')
      setScheduledAt('')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 800 }}>
      <h2 style={{ fontWeight: 600 }}>Create Campaign</h2>
      <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} disabled={loading} style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }} />
      <select value={channel} onChange={(e)=>setChannel(e.target.value as any)} disabled={loading} style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }}>
        <option value="email">Email</option>
        <option value="sms">SMS</option>
        <option value="whatsapp">WhatsApp</option>
      </select>
      <textarea placeholder="Template (use {{name}} etc.)" value={template} onChange={(e)=>setTemplate(e.target.value)} rows={5} disabled={loading} style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }} />
      <input type="datetime-local" value={scheduledAt} onChange={(e)=>setScheduledAt(e.target.value)} disabled={loading} style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }} />
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ padding: 10, borderRadius: 6, background: '#111827', color: 'white', width: 'fit-content' }}>{loading ? 'Creating…' : 'Create Campaign'}</button>
    </form>
  )
}
