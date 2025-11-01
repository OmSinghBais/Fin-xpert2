"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Calendar, MoreVertical } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Index Fund - Nifty 50",
    category: "Index Funds",
    aum: "₹45 Cr",
    advisors: 156,
    distributionDate: "Oct 1, 2024",
    status: "Active",
    performance: "+12.5%",
  },
  {
    id: 2,
    name: "Balanced Advantage Fund",
    category: "Hybrid Funds",
    aum: "₹38 Cr",
    advisors: 142,
    distributionDate: "Sep 15, 2024",
    status: "Active",
    performance: "+8.3%",
  },
  {
    id: 3,
    name: "Liquid Fund",
    category: "Liquid Funds",
    aum: "₹22 Cr",
    advisors: 98,
    distributionDate: "Aug 20, 2024",
    status: "Active",
    performance: "+5.1%",
  },
  {
    id: 4,
    name: "Small Cap Fund",
    category: "Equity",
    aum: "₹15 Cr",
    advisors: 64,
    distributionDate: "Sep 1, 2024",
    status: "Featured",
    performance: "+18.7%",
  },
  {
    id: 5,
    name: "Corporate Bond Fund",
    category: "Debt",
    aum: "₹28 Cr",
    advisors: 112,
    distributionDate: "Aug 10, 2024",
    status: "Active",
    performance: "+6.2%",
  },
  {
    id: 6,
    name: "Gold Fund",
    category: "Commodity",
    aum: "₹12 Cr",
    advisors: 48,
    distributionDate: "Jul 25, 2024",
    status: "Active",
    performance: "+3.8%",
  },
]

export function ProductsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="border-border hover:shadow-lg transition">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base">{product.name}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
              </div>
              <button className="p-1 rounded hover:bg-muted transition flex-shrink-0">
                <MoreVertical size={16} className="text-muted-foreground" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status & Performance */}
            <div className="flex justify-between items-center">
              <Badge variant={product.status === "Featured" ? "default" : "secondary"}>{product.status}</Badge>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold">
                <TrendingUp size={16} />
                {product.performance}
              </div>
            </div>

            {/* AUM */}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Assets Under Management</p>
              <p className="text-lg font-bold text-foreground">{product.aum}</p>
            </div>

            {/* Distribution Info */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Users size={14} />
                  <span className="text-xs">Advisors</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{product.advisors}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Calendar size={14} />
                  <span className="text-xs">Distribution</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{product.distributionDate}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                View Details
              </Button>
              <Button size="sm" className="flex-1">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
