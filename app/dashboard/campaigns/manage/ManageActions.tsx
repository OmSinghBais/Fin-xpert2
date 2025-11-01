'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ManageActions({ id }: { id: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState<'send' | 'delete' | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function send() {
    setError(null)
    setLoading('send')
    try {
      const res = await fetch(`/api/campaigns/${id}/send`, { method: 'POST' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Failed to send')
      router.refresh()
    } catch (e: any) {
      setError(e?.message || 'Failed to send')
    } finally {
      setLoading(null)
    }
  }

  async function remove() {
    setError(null)
    setLoading('delete')
    try {
      const res = await fetch(`/api/campaigns/${id}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Failed to delete')
      router.refresh()
    } catch (e: any) {
      setError(e?.message || 'Failed to delete')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={send} disabled={loading !== null} style={{ padding: '6px 10px', borderRadius: 6, background: '#111827', color: 'white' }}>
        {loading === 'send' ? 'Sending…' : 'Send'}
      </button>
      <button onClick={remove} disabled={loading !== null} style={{ padding: '6px 10px', borderRadius: 6, background: '#ef4444', color: 'white' }}>
        {loading === 'delete' ? 'Deleting…' : 'Delete'}
      </button>
      {error && <span style={{ color: 'crimson', fontSize: 12 }}>{error}</span>}
    </div>
  )
}
