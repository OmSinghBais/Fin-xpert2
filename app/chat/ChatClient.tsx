'use client'

import { useState } from 'react'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

export default function ChatClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const content = input.trim()
    if (!content) return
    const next: ChatMessage[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Request failed')
      }
      const data = await res.json()
      const reply = (data?.reply as string) || ''
      setMessages((m) => [...m, { role: 'assistant', content: reply } as ChatMessage])
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>AI Chat</h1>
      <div style={{ display: 'grid', gap: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            background: m.role === 'user' ? '#eef2ff' : '#f1f5f9',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: 12
          }}>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{m.role.toUpperCase()}</div>
            <div>{m.content}</div>
          </div>
        ))}
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
        <input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          style={{ flex: 1, padding: 10, border: '1px solid #d1d5db', borderRadius: 6 }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 14px', borderRadius: 6, background: '#111827', color: 'white' }}>
          {loading ? 'Sending…' : 'Send'}
        </button>
      </form>
      <div style={{ color: '#6b7280', fontSize: 12 }}>
        Note: Requires OPENAI_API_KEY in your environment.
      </div>
    </div>
  )
}
