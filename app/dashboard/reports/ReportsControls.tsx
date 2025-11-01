'use client'

import { useSearchParams, useRouter } from 'next/navigation'

const ranges = [
  { label: '7d', value: '7' },
  { label: '30d', value: '30' },
  { label: '90d', value: '90' },
]

export default function ReportsControls() {
  const params = useSearchParams()
  const router = useRouter()
  const current = params.get('range') || '30'

  function setRange(v: string) {
    const sp = new URLSearchParams(params.toString())
    sp.set('range', v)
    router.push(`/dashboard/reports?${sp.toString()}`)
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {ranges.map((r) => (
        <button
          key={r.value}
          onClick={() => setRange(r.value)}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #e5e7eb',
            background: current === r.value ? '#111827' : '#fff',
            color: current === r.value ? '#fff' : '#111827',
          }}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}
