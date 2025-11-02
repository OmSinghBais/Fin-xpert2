"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OnboardingStep1 } from "@/components/onboarding/step-1"
import { OnboardingStep2 } from "@/components/onboarding/step-2"
import { OnboardingStep3 } from "@/components/onboarding/step-3"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    profession: "",
    name: "",
    email: "",
    phone: "",
    companyName: "",
    aum: "",
  })

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleComplete = () => {
    // Simulate signup completion
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b border-border py-4 px-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FX</span>
            </div>
            <span className="font-bold text-foreground hidden sm:inline">FinXpert</span>
          </Link>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => s < step && setStep(s)}
                className={`h-2 rounded-full transition-all ${s <= step ? "w-8 bg-primary" : "w-2 bg-muted"}`}
                aria-label={`Step ${s}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {step === 1 && <OnboardingStep1 data={data} setData={setData} />}
          {step === 2 && <OnboardingStep2 data={data} setData={setData} />}
          {step === 3 && <OnboardingStep3 data={data} setData={setData} />}

          {/* Navigation Buttons */}
          <div className="flex gap-3 justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="flex-1 sm:flex-none bg-transparent"
            >
              Back
            </Button>
            {step < 3 ? (
              <Button onClick={handleNext} className="flex-1 sm:flex-none">
                Next
              </Button>
            ) : (
              <Button onClick={handleComplete} className="flex-1 sm:flex-none">
                Complete Setup
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
