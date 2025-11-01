"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Copy } from "lucide-react"

const templates = [
  {
    id: 1,
    name: "Quarterly Investment Review",
    category: "Educational",
    description: "Comprehensive quarterly portfolio review and market insights",
    uses: 45,
  },
  {
    id: 2,
    name: "Product Launch Announcement",
    category: "Product",
    description: "New product introduction with key features and benefits",
    uses: 32,
  },
  {
    id: 3,
    name: "Tax Planning Tips",
    category: "Compliance",
    description: "Year-end tax planning strategies for individual investors",
    uses: 58,
  },
  {
    id: 4,
    name: "Client Testimonial",
    category: "Social Proof",
    description: "Client success stories and positive feedback",
    uses: 24,
  },
  {
    id: 5,
    name: "Market Update",
    category: "Informational",
    description: "Weekly/monthly market analysis and investment insights",
    uses: 72,
  },
  {
    id: 6,
    name: "Special Offer",
    category: "Promotional",
    description: "Limited-time promotional campaigns and offers",
    uses: 38,
  },
]

export function CampaignTemplates() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Campaign Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="border-border hover:shadow-lg transition">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mail size={16} className="text-primary flex-shrink-0" />
                    {template.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{template.category}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <div className="text-xs text-muted-foreground">
                <p>
                  Used <span className="font-semibold text-foreground">{template.uses}</span> times this month
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1 bg-transparent">
                  <Copy size={14} /> Duplicate
                </Button>
                <Button size="sm" className="flex-1">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
