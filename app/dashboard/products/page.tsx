"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { ProductsHeader } from "@/components/products/header"
import { ProductsGrid } from "@/components/products/grid"
import { ProductMetrics } from "@/components/products/metrics"

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProductsHeader />
        <ProductMetrics />
        <ProductsGrid />
      </div>
    </DashboardLayout>
  )
}
