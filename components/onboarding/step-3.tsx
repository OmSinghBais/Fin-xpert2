"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Check } from "lucide-react"

interface OnboardingStep3Props {
  data: any
  setData: (data: any) => void
}

const features = [
  "Client Management & CRM",
  "Product Distribution Platform",
  "Campaign Automation",
  "Real-Time Analytics & Reports",
  "AI-Powered Insights",
  "Transaction Tracking",
]

export function OnboardingStep3({ data, setData }: OnboardingStep3Props) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">You're All Set!</h2>
        <p className="text-muted-foreground">Here's what you'll get access to</p>
      </div>

      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} className="text-primary" />
                </div>
                <span className="text-foreground text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Free 30-Day Trial</h3>
            <p className="text-sm text-muted-foreground">
              No credit card required. Full access to all features. Cancel anytime.
            </p>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm text-muted-foreground">I agree to the Terms of Service and Privacy Policy</span>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
