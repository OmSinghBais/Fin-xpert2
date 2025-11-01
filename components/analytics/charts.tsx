"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const revenueData = [
  { week: "W1", revenue: 15000, target: 16000 },
  { week: "W2", revenue: 18000, target: 16000 },
  { week: "W3", revenue: 17500, target: 16000 },
  { week: "W4", revenue: 22000, target: 20000 },
]

const clientGrowth = [
  { month: "Jan", clients: 120, revenue: 2.4 },
  { month: "Feb", clients: 128, revenue: 2.6 },
  { month: "Mar", clients: 135, revenue: 2.8 },
  { month: "Apr", clients: 142, revenue: 2.9 },
  { month: "May", clients: 155, revenue: 3.1 },
  { month: "Jun", clients: 165, revenue: 3.3 },
]

const sourceData = [
  { name: "Referrals", value: 35 },
  { name: "Direct", value: 28 },
  { name: "Campaign", value: 22 },
  { name: "Other", value: 15 },
]

const colors = ["var(--color-primary)", "var(--color-accent)", "var(--color-secondary)", "var(--color-chart-5)"]

export function DetailedCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Target */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Revenue vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="var(--color-primary)" />
                <Bar dataKey="target" fill="var(--color-muted)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Client Growth */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Client Growth & Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={clientGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                />
                <Area
                  type="monotone"
                  dataKey="clients"
                  fill="var(--color-primary)"
                  stroke="var(--color-primary)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Client Source */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Client Acquisition Source</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sourceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
