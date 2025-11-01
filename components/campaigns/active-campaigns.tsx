"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Eye, MouseIcon as MouseClick, MoreVertical } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const campaigns = [
  {
    id: 1,
    name: "Q4 Investment Strategy",
    status: "Active",
    recipients: 248,
    sent: 248,
    opened: 85,
    clicked: 28,
    startDate: "Oct 1, 2024",
    endDate: "Oct 31, 2024",
    type: "Educational",
  },
  {
    id: 2,
    name: "Diwali Special Offers",
    status: "Active",
    recipients: 195,
    sent: 195,
    opened: 72,
    clicked: 18,
    startDate: "Oct 15, 2024",
    endDate: "Nov 5, 2024",
    type: "Promotional",
  },
  {
    id: 3,
    name: "Year-End Tax Planning",
    status: "Scheduled",
    recipients: 312,
    sent: 0,
    opened: 0,
    clicked: 0,
    startDate: "Dec 1, 2024",
    endDate: "Dec 31, 2024",
    type: "Compliance",
  },
  {
    id: 4,
    name: "New Product Launch - Index Funds",
    status: "Completed",
    recipients: 428,
    sent: 428,
    opened: 156,
    clicked: 52,
    startDate: "Sep 1, 2024",
    endDate: "Sep 30, 2024",
    type: "Product",
  },
]

export function ActiveCampaigns() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Active & Scheduled Campaigns</h2>
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((campaign) => {
          const openRate = campaign.sent > 0 ? Math.round((campaign.opened / campaign.sent) * 100) : 0
          const clickRate = campaign.sent > 0 ? Math.round((campaign.clicked / campaign.sent) * 100) : 0

          return (
            <Card key={campaign.id} className="border-border hover:shadow-lg transition">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-base">{campaign.name}</CardTitle>
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        {campaign.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {campaign.startDate}
                      </span>
                      <span className="hidden sm:flex items-center gap-1">
                        <Users size={14} />
                        {campaign.recipients} recipients
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <button className="p-1 rounded hover:bg-muted transition">
                      <MoreVertical size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Sent</p>
                    <p className="text-lg font-bold text-foreground">{campaign.sent}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Eye size={14} />
                      <p className="text-xs">Opened</p>
                    </div>
                    <p className="text-lg font-bold text-foreground">{openRate}%</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <MouseClick size={14} />
                      <p className="text-xs">Clicked</p>
                    </div>
                    <p className="text-lg font-bold text-foreground">{clickRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Conversions</p>
                    <p className="text-lg font-bold text-foreground">{campaign.clicked}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {campaign.status === "Active" && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Campaign Progress</p>
                    <Progress value={65} className="h-2" />
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {campaign.status === "Active" ? (
                    <>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        View Report
                      </Button>
                      <Button size="sm" className="flex-1">
                        Pause
                      </Button>
                    </>
                  ) : campaign.status === "Scheduled" ? (
                    <>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        Launch Now
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      View Report
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
