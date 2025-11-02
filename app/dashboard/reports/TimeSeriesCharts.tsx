'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts'

export default function TimeSeriesCharts({ data }: { data: Array<{ date: string; interactions: number; messages: number }> }) {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700 }}>Activity (Interactions vs Messages)</h2>
      <div style={{ width: '100%', height: 320, border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="interactions" stroke="#2563eb" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="messages" stroke="#10b981" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
