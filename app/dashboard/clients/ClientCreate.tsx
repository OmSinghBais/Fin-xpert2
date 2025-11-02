'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientCreate() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [riskProfile, setRiskProfile] = useState('')
  const [kycStatus, setKycStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim()) {
      setError('Name is required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, riskProfile, kycStatus })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Failed to create client')
      }
      setName('')
      setEmail('')
      setPhone('')
      setRiskProfile('')
      setKycStatus('')
      router.refresh()
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 700 }}>
      <h2 style={{ fontWeight: 600 }}>Create Client</h2>
      <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} disabled={loading} style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }} />
      <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading} style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }} />
      <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} disabled={loading} style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }} />
      <input placeholder="Risk Profile" value={riskProfile} onChange={(e)=>setRiskProfile(e.target.value)} disabled={loading} style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }} />
      <input placeholder="KYC Status" value={kycStatus} onChange={(e)=>setKycStatus(e.target.value)} disabled={loading} style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }} />
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ padding: 10, borderRadius: 6, background: '#111827', color: 'white' }}>{loading ? 'Creating…' : 'Create'}</button>
    </form>
  )
}
