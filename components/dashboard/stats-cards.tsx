"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Target, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Clients",
    value: "248",
    change: "+12%",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Active Campaigns",
    value: "12",
    change: "+3 this week",
    icon: Target,
    color: "text-accent",
  },
  {
    title: "Products Distributed",
    value: "156",
    change: "+24 this month",
    icon: TrendingUp,
    color: "text-secondary",
  },
  {
    title: "Revenue (This Month)",
    value: "₹2.4Cr",
    change: "+18% YoY",
    icon: DollarSign,
    color: "text-primary",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx} className="border-border hover:shadow-lg transition">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
                {stat.title}
                <Icon className={`${stat.color}`} size={20} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
