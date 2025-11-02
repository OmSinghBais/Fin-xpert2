"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const benefits = [
  "Save 10+ hours per week on administrative tasks",
  "Increase client retention with personalized engagement",
  "Boost sales with intelligent product recommendations",
  "Automate marketing campaigns for better ROI",
  "Make data-driven decisions with real-time insights",
  "Scale your business without adding headcount",
  "Secure client data with enterprise-grade security",
  "Integrate with existing financial tools seamlessly",
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Transform How You Do Business
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              FinXpert empowers financial professionals to work smarter, not harder. Automate routine tasks, deepen
              client relationships, and grow revenue with intelligent insights.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <Card className="border border-border bg-card shadow-xl">
              <CardHeader className="pb-4">
                <div className="space-y-3">
                  <div className="h-3 bg-primary/20 rounded-full w-3/4" />
                  <div className="h-3 bg-primary/20 rounded-full w-full" />
                  <div className="h-3 bg-primary/20 rounded-full w-5/6" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="h-2 bg-primary/30 rounded w-1/3" />
                    <div className="h-2 bg-accent/30 rounded w-1/4" />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="h-2 bg-primary/30 rounded w-2/3" />
                    <div className="h-2 bg-accent/30 rounded w-1/3" />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="h-2 bg-primary/30 rounded w-1/2" />
                    <div className="h-2 bg-accent/30 rounded w-1/3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
