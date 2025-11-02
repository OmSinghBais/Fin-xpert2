"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Eye, MouseIcon as MouseClick, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Emails Sent",
    value: "2,847",
    description: "This month",
    icon: Send,
    color: "text-primary",
  },
  {
    title: "Open Rate",
    value: "34.2%",
    description: "Average across campaigns",
    icon: Eye,
    color: "text-accent",
  },
  {
    title: "Click Rate",
    value: "8.5%",
    description: "Average CTR",
    icon: MouseClick,
    color: "text-secondary",
  },
  {
    title: "ROI",
    value: "₹4.2x",
    description: "Return on investment",
    icon: TrendingUp,
    color: "text-primary",
  },
]

export function CampaignStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx} className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
                {stat.title}
                <Icon className={stat.color} size={20} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
