"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function InsightsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={24} className="text-primary" />
          <h1 className="text-3xl font-bold text-foreground">AI-Powered Insights</h1>
        </div>
        <p className="text-muted-foreground">Intelligent recommendations to optimize your business</p>
      </div>
      <Button variant="outline">Configure AI Settings</Button>
    </div>
  )
}
