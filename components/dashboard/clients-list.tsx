"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"

const clients = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    portfolio: "₹50 Lac",
    status: "Active",
    lastContact: "2 days ago",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 98765 43211",
    portfolio: "₹1.2 Cr",
    status: "Active",
    lastContact: "5 days ago",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 98765 43212",
    portfolio: "₹75 Lac",
    status: "Inactive",
    lastContact: "3 weeks ago",
  },
  {
    id: 4,
    name: "Neha Gupta",
    email: "neha@example.com",
    phone: "+91 98765 43213",
    portfolio: "₹2.5 Cr",
    status: "Active",
    lastContact: "1 day ago",
  },
]

export function ClientsList() {
  return (
    <Card className="border-border lg:col-span-2">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Recent Clients</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 overflow-x-auto">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{client.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{client.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-foreground">{client.portfolio}</p>
                  <p className="text-xs text-muted-foreground">{client.lastContact}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    client.status === "Active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {client.status}
                </span>
                <button className="p-1 rounded opacity-0 group-hover:opacity-100 transition">
                  <MoreVertical size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
