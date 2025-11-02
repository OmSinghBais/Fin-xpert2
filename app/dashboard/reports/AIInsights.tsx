'use client'

import { useState } from 'react'

type Metrics = {
  clients: { total: number; newThisWeek: number }
  interactions: { last7: number; last30: number }
  campaigns: { total: number }
  messages: { pending: number; sent: number; failed: number }
  generatedAt: string
}

export default function AIInsights({ metrics }: { metrics: Metrics }) {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  async function generate() {
    setLoading(true)
    setError(null)
    setText('')
    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to generate insights')
      setText(data.analysis || '')
    } catch (e: any) {
      setError(e?.message || 'Failed to generate insights')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button onClick={generate} disabled={loading} style={{ padding: '8px 12px', borderRadius: 6, background: '#111827', color: '#fff', width: 'fit-content' }}>
        {loading ? 'Generating…' : 'Generate AI Insights'}
      </button>
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      {text && (
        <div style={{ whiteSpace: 'pre-wrap', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>{text}</div>
      )}
      <div style={{ color: '#6b7280', fontSize: 12 }}>Requires OPENAI_API_KEY to be set.</div>
    </div>
  )
}
