'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PostCreator() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Failed to create')
      }
      setTitle('')
      setContent('')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }}
      />
      <textarea
        placeholder="Content (optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
        rows={4}
        style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }}
      />
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ padding: 10, borderRadius: 6, background: '#111827', color: 'white' }}>
        {loading ? 'Creating…' : 'Create Post'}
      </button>
    </form>
  )
}
