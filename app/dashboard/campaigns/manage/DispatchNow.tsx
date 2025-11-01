'use client'

import { useState } from 'react'

export default function DispatchNow() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function run() {
    setLoading(true)
    setMsg(null)
    setErr(null)
    try {
      const res = await fetch('/api/dispatch/email', { method: 'POST' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Dispatch failed')
      setMsg(`Processed ${data?.processed ?? 0} messages`)
    } catch (e: any) {
      setErr(e?.message || 'Dispatch failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={run} disabled={loading} style={{ padding: '8px 12px', borderRadius: 6, background: '#111827', color: 'white' }}>
        {loading ? 'Dispatching…' : 'Dispatch Now'}
      </button>
      {msg && <span style={{ color: '#059669', fontSize: 12 }}>{msg}</span>}
      {err && <span style={{ color: 'crimson', fontSize: 12 }}>{err}</span>}
    </div>
  )
}
