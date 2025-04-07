"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Bot, Shield, Zap, X } from "lucide-react"
import gsap from "gsap"
import Link from "next/link"

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  const titleRef = useRef(null)
  const heroRef = useRef(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    gsap.set("#theGradient", { attr: { x1: -1000, x2: 0 } })
    gsap.to("#theGradient", {
      duration: 3,
      attr: { x1: 1000, x2: 2000 },
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
      ease: "none"
    })

    const tl = gsap.timeline()

    tl.fromTo(heroRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )

    const cards = cardsRef.current?.children
    if (cards) {
      tl.fromTo(cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        },
        "-=0.5"
      )
    }

    tl.fromTo(ctaRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
  }, [])

  const features = [
    {
      icon: <Bot className="w-10 h-10" />,
      title: "AI-Driven Insights",
      description: "Utilizing advanced AI algorithms to provide accurate attendance statistics and analytics."
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Real-time Analytics",
      description: "Get instant statistics on attendance patterns with live updates across all devices."
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "High Accuracy & Security",
      description: "Ensuring high accuracy in attendance tracking while keeping your data secure and private."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16 space-y-24">
        {/* Announcement Banner */}
        {showAnnouncement && (
          <div className="mb-8 relative">
            <Card className="bg-destructive text-white shadow-lg">
              <CardContent className="text-center relative">
                <button
                  className="absolute top-2 right-2 text-white"
                  aria-label="Close Announcement"
                  onClick={() => setShowAnnouncement(false)}
                >
                  <X size={20} />
                </button>
                <h3 className="text-xl font-bold mb-2">Service Announcement</h3>
                <p>
                  We have shut down our services which lasted from <strong>March 8th, 2025</strong> to <strong>April 7th, 2025</strong>. We did not want to shut down our platform, but a lack of funds to support our ML model's server made it impossible to continue. A big thanks to the most important people our users for providing us the opportunity to serve you.
                  If you would like to support our future projects, please check out our{" "}
                  <Link href="/pricing" className="underline">
                  Pricing
                  </Link>{" "}
                  page and contact us through our{" "}
                  <Link href="/about" className="underline">
                  About
                  </Link>{" "}
                  page.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-center space-y-12">
          <div ref={titleRef} className="w-full max-w-6xl mx-auto">
            <svg viewBox="0 0 1000 200" className="w-full h-auto min-h-[100px] md:min-h-[150px]">
              <defs>
                <mask id="masker">
                  <rect className="gradientBox" fill="url(#theGradient)" x="0" y="0" width="1000" height="200"/>
                </mask>
                <linearGradient id="theGradient" gradientUnits="userSpaceOnUse" x1="-1000" y1="100" x2="0" y2="100">
                  <stop offset="0" style={{ stopColor: "#fff" }}/>
                  <stop offset="1" style={{ stopColor: "#000" }}/>
                </linearGradient>
              </defs>
              <g mask="url(#masker)">
                <text transform="translate(500 140)" textAnchor="middle" fontSize="130" fill="#fff">HUKUM!</text>
              </g>
            </svg>
          </div>
          
          <div ref={heroRef} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
              Image Processing based Attendance Management System
            </h2>
            <p className="text-muted-foreground/80">
              Streamline your attendance tracking with our intuitive and powerful platform.
            </p>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card stats-card overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="rounded-full w-16 h-16 flex items-center justify-center bg-white/5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div ref={ctaRef} className="text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="group bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                asChild
              >
                <Link href="/sign-in" className="flex items-center text-white">
                  Try for FREE!
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}