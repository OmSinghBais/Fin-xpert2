"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, FileText, DollarSign, Bell } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "email",
    title: "Campaign Sent",
    description: "Q4 Investment Strategy sent to 45 clients",
    timestamp: "2 hours ago",
    icon: Mail,
  },
  {
    id: 2,
    type: "document",
    title: "Document Created",
    description: "Portfolio Review for Rajesh Kumar",
    timestamp: "4 hours ago",
    icon: FileText,
  },
  {
    id: 3,
    type: "transaction",
    title: "Transaction Completed",
    description: "Mutual Fund Purchase - ₹5 Lac",
    timestamp: "6 hours ago",
    icon: DollarSign,
  },
  {
    id: 4,
    type: "reminder",
    title: "Follow-up Reminder",
    description: "Annual review meeting with Priya Singh",
    timestamp: "1 day ago",
    icon: Bell,
  },
]

const colorMap: Record<string, string> = {
  email: "text-primary",
  document: "text-accent",
  transaction: "text-secondary",
  reminder: "text-orange-500",
}

export function RecentActivity() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition">
                <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`${colorMap[activity.type]}`} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
