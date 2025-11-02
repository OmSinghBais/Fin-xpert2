"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BarChart3, Zap, MessageSquare, Target, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Client Management CRM",
    description: "Centralized client database with automated follow-ups and relationship tracking",
    color: "text-primary",
  },
  {
    icon: Target,
    title: "Product Distribution",
    description: "Seamless platform to distribute financial products and track sales performance",
    color: "text-accent",
  },
  {
    icon: MessageSquare,
    title: "Campaign Automation",
    description: "Create and automate marketing campaigns with personalized messaging",
    color: "text-secondary",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track metrics, transactions, and performance with comprehensive dashboards",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "Get intelligent recommendations to optimize client relationships and sales",
    color: "text-accent",
  },
  {
    icon: TrendingUp,
    title: "Transaction Tracking",
    description: "Monitor all client transactions and portfolio performance in real-time",
    color: "text-secondary",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed for financial professionals to manage clients and grow revenue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card key={idx} className="border border-border hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <Icon className={`${feature.color} mb-2`} size={28} />
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
