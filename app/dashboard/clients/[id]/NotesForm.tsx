'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotesForm({ clientId }: { clientId: number }) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!content.trim()) {
      setError('Note content is required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/clients/${clientId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Failed to add note')
      }
      setContent('')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
      <h3 style={{ fontWeight: 600 }}>Add Note</h3>
      <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Write a note..." rows={3} disabled={loading} style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }} />
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ padding: 10, borderRadius: 6, background: '#111827', color: 'white' }}>{loading ? 'Saving…' : 'Save Note'}</button>
    </form>
  )
}
