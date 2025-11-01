"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter } from "lucide-react"

export function ProductsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Product Distribution</h1>
        <p className="text-muted-foreground">Manage and distribute financial products to advisors</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10 bg-muted/50" />
        </div>
        <Button variant="outline" className="gap-2 whitespace-nowrap bg-transparent">
          <Filter size={18} /> Filter
        </Button>
        <Button className="gap-2 whitespace-nowrap">
          <Plus size={18} /> Add Product
        </Button>
      </div>
    </div>
  )
}
