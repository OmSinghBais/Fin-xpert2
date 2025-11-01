"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Zap, Target } from "lucide-react"

const metrics = [
  {
    title: "Total Revenue",
    value: "₹72.5 Lac",
    change: "+18% vs last month",
    icon: TrendingUp,
    color: "text-primary",
  },
  {
    title: "Active Clients",
    value: "165",
    change: "+8 this week",
    icon: Users,
    color: "text-accent",
  },
  {
    title: "Conversion Rate",
    value: "34%",
    change: "+5% improvement",
    icon: Target,
    color: "text-secondary",
  },
  {
    title: "Engagement Score",
    value: "8.7/10",
    change: "+0.5 from last month",
    icon: Zap,
    color: "text-primary",
  },
]

export function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon
        return (
          <Card key={idx} className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
                {metric.title}
                <Icon className={metric.color} size={20} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
