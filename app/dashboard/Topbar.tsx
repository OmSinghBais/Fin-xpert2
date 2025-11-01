'use client'

import { signOut } from 'next-auth/react'

export default function Topbar({ email }: { email: string }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ fontWeight: 700 }}>FinXpert Dashboard</div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ color: '#6b7280', fontSize: 14 }}>{email}</span>
        <button onClick={() => signOut()} style={{ padding: '6px 10px', borderRadius: 6, background: '#111827', color: '#fff' }}>Sign out</button>
      </div>
    </header>
  )
}
