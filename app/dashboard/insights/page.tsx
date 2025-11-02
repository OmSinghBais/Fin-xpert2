"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { InsightsHeader } from "@/components/insights/header"
import { AIRecommendations } from "@/components/insights/ai-recommendations"
import { TransactionTracking } from "@/components/insights/transaction-tracking"
import { AnalyticsCharts } from "@/components/insights/analytics-charts"

export default function InsightsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <InsightsHeader />
        <AIRecommendations />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalyticsCharts />
          <TransactionTracking />
        </div>
      </div>
    </DashboardLayout>
  )
}
