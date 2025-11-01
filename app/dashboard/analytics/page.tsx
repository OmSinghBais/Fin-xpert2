"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { AnalyticsHeader } from "@/components/analytics/header"
import { PerformanceMetrics } from "@/components/analytics/performance-metrics"
import { DetailedCharts } from "@/components/analytics/charts"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <AnalyticsHeader />
        <PerformanceMetrics />
        <DetailedCharts />
      </div>
    </DashboardLayout>
  )
}
