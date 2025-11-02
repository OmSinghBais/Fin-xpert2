"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Transform Your Business?</h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Join financial professionals who are already using FinXpert to scale their business, automate operations, and
          deliver better client experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link href="/onboarding">
              Get Started Free <ArrowRight size={18} />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            asChild
          >
            <Link href="mailto:contact@finxpert.com">Contact Sales</Link>
          </Button>
        </div>
        <p className="mt-8 text-sm opacity-75">No credit card required. 30-day free trial.</p>
      </div>
    </section>
  )
}
