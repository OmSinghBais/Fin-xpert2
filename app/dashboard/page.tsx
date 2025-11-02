"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ClientsList } from "@/components/dashboard/clients-list"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader />
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ClientsList />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  )
}
