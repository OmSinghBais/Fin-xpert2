"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Financial Platform</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance leading-tight">
              Manage Clients, Distribute Products, and <span className="text-primary">Scale Your Business</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              FinXpert is the all-in-one CRM and distribution platform built for financial advisors, MFDs, and wealth
              managers to automate marketing, track transactions, and gain AI-powered insights.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/onboarding">
                Start Free Trial <ArrowRight size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contact">Schedule Demo</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="pt-8 text-sm text-muted-foreground">
            <p className="mb-3">Trusted by 500+ financial professionals</p>
            <div className="flex justify-center gap-4">
              {["IFA", "MFD", "Wealth Mgmt", "Asset Mgmt"].map((type) => (
                <span key={type} className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
