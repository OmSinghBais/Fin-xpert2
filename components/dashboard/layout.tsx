"use client"

import type React from "react"

import { Sidebar } from "@/components/dashboard/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-8">{children}</div>
      </main>
    </div>
  )
}
