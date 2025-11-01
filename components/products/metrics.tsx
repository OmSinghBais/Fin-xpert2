"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package, Award, Clock } from "lucide-react"

const metrics = [
  {
    title: "Total Products",
    value: "24",
    description: "Active product offerings",
    icon: Package,
  },
  {
    title: "Distribution Rate",
    value: "87%",
    description: "Advisors distributing products",
    icon: TrendingUp,
  },
  {
    title: "Top Product",
    value: "Index Funds",
    description: "₹45 Cr AUM",
    icon: Award,
  },
  {
    title: "Avg Time to Distribution",
    value: "2.3 Days",
    description: "From launch to first distribution",
    icon: Clock,
  },
]

export function ProductMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon
        return (
          <Card key={idx} className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
                {metric.title}
                <Icon className="text-primary" size={20} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
