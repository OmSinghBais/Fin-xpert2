"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FX</span>
            </div>
            <span className="font-bold text-lg text-foreground">FinXpert</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-foreground hover:text-primary transition">
              Features
            </Link>
            <Link href="#benefits" className="text-sm text-foreground hover:text-primary transition">
              Benefits
            </Link>
            <Link href="#pricing" className="text-sm text-foreground hover:text-primary transition">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/onboarding">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="#features" className="block text-sm text-foreground hover:text-primary">
              Features
            </Link>
            <Link href="#benefits" className="block text-sm text-foreground hover:text-primary">
              Benefits
            </Link>
            <Link href="#pricing" className="block text-sm text-foreground hover:text-primary">
              Pricing
            </Link>
            <Link href="#contact" className="block text-sm text-foreground hover:text-primary">
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/onboarding">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
