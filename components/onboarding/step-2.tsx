"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface OnboardingStep2Props {
  data: any
  setData: (data: any) => void
}

export function OnboardingStep2({ data, setData }: OnboardingStep2Props) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Personal Information</h2>
        <p className="text-muted-foreground">Help us personalize your experience</p>
      </div>

      <Card className="border-border">
        <CardContent className="pt-6 space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="bg-muted/50 border-input"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="bg-muted/50 border-input"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="bg-muted/50 border-input"
            />
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-foreground font-medium">
              Company / Firm Name
            </Label>
            <Input
              id="company"
              placeholder="Your Company Ltd."
              value={data.companyName}
              onChange={(e) => setData({ ...data, companyName: e.target.value })}
              className="bg-muted/50 border-input"
            />
          </div>

          {/* AUM */}
          <div className="space-y-2">
            <Label htmlFor="aum" className="text-foreground font-medium">
              Assets Under Management (AUM)
            </Label>
            <select
              id="aum"
              value={data.aum}
              onChange={(e) => setData({ ...data, aum: e.target.value })}
              className="w-full px-3 py-2 bg-muted/50 border border-input rounded-lg text-foreground"
            >
              <option value="">Select range</option>
              <option value="0-50l">0 - 50 Lakh</option>
              <option value="50l-1cr">50 Lakh - 1 Crore</option>
              <option value="1cr-10cr">1 Crore - 10 Crore</option>
              <option value="10cr-50cr">10 Crore - 50 Crore</option>
              <option value="50cr+">50 Crore+</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
