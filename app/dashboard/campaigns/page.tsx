"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { CampaignsHeader } from "@/components/campaigns/header"
import { CampaignStats } from "@/components/campaigns/stats"
import { ActiveCampaigns } from "@/components/campaigns/active-campaigns"
import { CampaignTemplates } from "@/components/campaigns/templates"

export default function CampaignsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <CampaignsHeader />
        <CampaignStats />
        <ActiveCampaigns />
        <CampaignTemplates />
      </div>
    </DashboardLayout>
  )
}
