"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, Target, AlertCircle } from "lucide-react"

const recommendations = [
  {
    id: 1,
    title: "Increase Contact with High-Value Clients",
    description: "Clients with portfolios above ₹2Cr show 40% higher engagement when contacted bi-weekly",
    impact: "Potential Revenue Impact: +₹12 Lac/month",
    icon: Target,
    action: "Create Campaign",
    priority: "High",
  },
  {
    id: 2,
    title: "Recommend Index Funds to New Clients",
    description: "Based on client profiles, 73% of new clients would be suitable for index fund investments",
    impact: "Potential AUM Addition: ₹8 Cr",
    icon: TrendingUp,
    action: "View Analysis",
    priority: "High",
  },
  {
    id: 3,
    title: "Follow-up with Inactive Clients",
    description: "28 clients have not been contacted in 30+ days. Previous follow-ups showed 35% re-engagement rate",
    impact: "Potential Revenue Recovery: +₹5 Lac",
    icon: AlertCircle,
    action: "Schedule Follow-ups",
    priority: "Medium",
  },
  {
    id: 4,
    title: "Optimize Campaign Timing",
    description:
      "Your clients show highest engagement on Thursdays at 2-3 PM. Current campaigns run at suboptimal times",
    impact: "Potential Open Rate: +25%",
    icon: Zap,
    action: "Update Schedule",
    priority: "Medium",
  },
]

export function AIRecommendations() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">AI Recommendations</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon
          return (
            <Card key={rec.id} className="border-border hover:shadow-lg transition">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base">{rec.title}</CardTitle>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                      rec.priority === "High"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                    }`}
                  >
                    {rec.priority}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                  <p className="text-sm font-semibold text-foreground">{rec.impact}</p>
                </div>
                <Button size="sm" className="w-full">
                  {rec.action}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
