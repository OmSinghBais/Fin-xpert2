"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

export function CampaignsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Campaign Management</h1>
        <p className="text-muted-foreground">Create, automate, and track marketing campaigns</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search campaigns..." className="pl-10 bg-muted/50" />
        </div>
        <Button className="gap-2 whitespace-nowrap">
          <Plus size={18} /> Create Campaign
        </Button>
      </div>
    </div>
  )
}
