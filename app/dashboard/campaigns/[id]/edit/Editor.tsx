'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { wrapHtml } from '@/lib/emailTemplate'

export default function Editor({ id, initial, orgName }: { id: number; initial: string; orgName: string }) {
  const router = useRouter()
  const [html, setHtml] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const preview = useMemo(() => wrapHtml(html || '', { orgName }), [html, orgName])

  useEffect(() => {
    const t = setTimeout(() => setMsg(null), 3000)
    return () => clearTimeout(t)
  }, [msg])

  async function save() {
    setSaving(true)
    setErr(null)
    setMsg(null)
    try {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template: html })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Failed to save')
      setMsg('Saved')
      router.refresh()
    } catch (e: any) {
      setErr(e?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={save} disabled={saving} style={{ padding: '8px 12px', borderRadius: 6, background: '#111827', color: 'white' }}>{saving ? 'Saving…' : 'Save'}</button>
          {msg && <span style={{ color: '#059669', fontSize: 12 }}>{msg}</span>}
          {err && <span style={{ color: 'crimson', fontSize: 12 }}>{err}</span>}
        </div>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={16}
          placeholder="Enter HTML template. You can use variables like {{name}}, {{email}}, {{campaign}}, {{orgName}}."
          style={{ width: '100%', padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
        />
      </div>
      <div>
        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Preview</h3>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          <iframe title="preview" style={{ width: '100%', height: 420, border: '0' }} srcDoc={preview} />
        </div>
      </div>
    </div>
  )
}
