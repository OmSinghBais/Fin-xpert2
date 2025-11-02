"use client"

import { Card, CardContent } from "@/components/ui/card"

const professions = [
  { id: "ifa", label: "Independent Financial Advisor", icon: "👔" },
  { id: "mfd", label: "Mutual Fund Distributor (MFD)", icon: "📊" },
  { id: "wm", label: "Wealth Manager", icon: "💼" },
  { id: "am", label: "Asset Manager", icon: "🏦" },
]

interface OnboardingStep1Props {
  data: any
  setData: (data: any) => void
}

export function OnboardingStep1({ data, setData }: OnboardingStep1Props) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Welcome to FinXpert</h2>
        <p className="text-muted-foreground">Tell us a bit about your role in the financial industry</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {professions.map((profession) => (
          <button
            key={profession.id}
            onClick={() => setData({ ...data, profession: profession.id })}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              data.profession === profession.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 bg-card"
            }`}
          >
            <div className="text-3xl mb-2">{profession.icon}</div>
            <div className="font-semibold text-foreground text-sm">{profession.label}</div>
          </button>
        ))}
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="pt-6">
          <p className="text-sm text-foreground">
            Your profession helps us customize FinXpert to your specific needs and compliance requirements.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
