'use client'

import { useState } from 'react'

export default function AISummary({ clientId }: { clientId: number }) {
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function generate() {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/ai/client-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to generate summary')
      setSummary(data.summary || '')
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button onClick={generate} disabled={loading} style={{ padding: 10, borderRadius: 6, background: '#111827', color: 'white', width: 'fit-content' }}>
        {loading ? 'Generating…' : 'Generate AI Summary'}
      </button>
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      {summary && (
        <div style={{ whiteSpace: 'pre-wrap', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>{summary}</div>
      )}
      <div style={{ color: '#6b7280', fontSize: 12 }}>Requires OPENAI_API_KEY to be set.</div>
    </div>
  )
}
