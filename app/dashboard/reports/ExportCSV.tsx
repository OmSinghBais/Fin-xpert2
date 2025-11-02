'use client'

export default function ExportCSV({ metrics, series }: { metrics: any; series: Array<{ date: string; interactions: number; messages: number }> }) {
  function download() {
    const rows: string[] = []
    rows.push('Section,Key,Value')
    rows.push(`Clients,total,${metrics.clients?.total ?? ''}`)
    rows.push(`Clients,newThisWeek,${metrics.clients?.newThisWeek ?? ''}`)
    rows.push(`Campaigns,total,${metrics.campaigns?.total ?? ''}`)
    rows.push(`Messages,pending,${metrics.messages?.pending ?? ''}`)
    rows.push(`Messages,sent,${metrics.messages?.sent ?? ''}`)
    rows.push(`Messages,failed,${metrics.messages?.failed ?? ''}`)
    rows.push('')
    rows.push('Date,Interactions,Messages')
    for (const p of series) rows.push(`${p.date},${p.interactions},${p.messages}`)
    const csv = rows.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reports_${(metrics.range ?? '30')}d.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button onClick={download} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb' }}>
      Export CSV
    </button>
  )
}
