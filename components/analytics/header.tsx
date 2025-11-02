"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function AnalyticsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive performance metrics and insights</p>
      </div>
      <Button variant="outline" className="gap-2 bg-transparent">
        <Calendar size={18} /> Select Period
      </Button>
    </div>
  )
}
