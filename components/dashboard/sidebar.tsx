"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, BarChart3, MessageSquare, Target, Settings, LogOut, Menu, X, Zap, TrendingUp } from "lucide-react"
import { signOut } from "next-auth/react"

const menuItems = [
  { icon: Users, label: "Clients", href: "/dashboard" },
  { icon: TrendingUp, label: "Transactions", href: "/dashboard/transactions" },
  { icon: MessageSquare, label: "Campaigns", href: "/dashboard/campaigns" },
  { icon: Target, label: "Products", href: "/dashboard/products" },
  { icon: Zap, label: "AI Insights", href: "/dashboard/insights" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-muted md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-card border-r border-border flex flex-col transition-all z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">FX</span>
          </div>
          <div>
            <p className="font-bold text-foreground">FinXpert</p>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="border-t border-border p-4 space-y-2">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
          >
            <Settings size={20} />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 bg-transparent" 
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
