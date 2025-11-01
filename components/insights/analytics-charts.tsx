"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const performanceData = [
  { month: "Jan", revenue: 45000, clients: 120, aum: 2200 },
  { month: "Feb", revenue: 52000, clients: 135, aum: 2500 },
  { month: "Mar", revenue: 48000, clients: 128, aum: 2400 },
  { month: "Apr", revenue: 61000, clients: 150, aum: 2900 },
  { month: "May", revenue: 58000, clients: 142, aum: 2800 },
  { month: "Jun", revenue: 72000, clients: 165, aum: 3200 },
]

const distributionData = [
  { name: "Index Funds", value: 35 },
  { name: "Hybrid Funds", value: 28 },
  { name: "Equity", value: 22 },
  { name: "Debt", value: 15 },
]

export function AnalyticsCharts() {
  return (
    <div className="space-y-4 lg:col-span-2">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: "var(--color-primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Product Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
              />
              <Bar dataKey="value" fill="var(--color-accent)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
