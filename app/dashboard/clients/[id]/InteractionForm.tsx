'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InteractionForm({ clientId }: { clientId: number }) {
  const router = useRouter()
  const [type, setType] = useState('call')
  const [channel, setChannel] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!type || !summary.trim()) {
      setError('Type and summary are required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/clients/${clientId}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, channel, summary })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Failed to add interaction')
      }
      setSummary('')
      setChannel('')
      setType('call')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
      <h3 style={{ fontWeight: 600 }}>Add Interaction</h3>
      <input value={type} onChange={(e)=>setType(e.target.value)} placeholder="Type (call, meeting, whatsapp)" disabled={loading} style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }} />
      <input value={channel} onChange={(e)=>setChannel(e.target.value)} placeholder="Channel (optional)" disabled={loading} style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }} />
      <textarea value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Summary" rows={3} disabled={loading} style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }} />
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ padding: 10, borderRadius: 6, background: '#111827', color: 'white' }}>{loading ? 'Saving…' : 'Save Interaction'}</button>
    </form>
  )
}
