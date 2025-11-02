"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

const transactions = [
  {
    id: 1,
    client: "Rajesh Kumar",
    type: "Purchase",
    product: "Index Fund - Nifty 50",
    amount: "₹5,00,000",
    date: "2 hours ago",
    status: "Completed",
  },
  {
    id: 2,
    client: "Priya Singh",
    type: "Redemption",
    product: "Liquid Fund",
    amount: "₹2,50,000",
    date: "4 hours ago",
    status: "Completed",
  },
  {
    id: 3,
    client: "Amit Patel",
    type: "Purchase",
    product: "Balanced Advantage Fund",
    amount: "₹3,75,000",
    date: "Yesterday",
    status: "Completed",
  },
  {
    id: 4,
    client: "Neha Gupta",
    type: "Purchase",
    product: "Small Cap Fund",
    amount: "₹7,50,000",
    date: "2 days ago",
    status: "Pending",
  },
]

export function TransactionTracking() {
  return (
    <Card className="border-border lg:col-span-1">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {transactions.map((txn) => (
          <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  {txn.type === "Purchase" ? (
                    <ArrowDownLeft size={12} className="text-primary" />
                  ) : (
                    <ArrowUpRight size={12} className="text-accent" />
                  )}
                </div>
                <p className="text-sm font-medium text-foreground truncate">{txn.client}</p>
              </div>
              <p className="text-xs text-muted-foreground ml-8 truncate">{txn.product}</p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-3">
              <p className="text-sm font-semibold text-foreground">{txn.amount}</p>
              <Badge variant={txn.status === "Completed" ? "secondary" : "outline"} className="text-xs">
                {txn.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
