"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatedLogo } from "./animated-logo"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <Image
          src="/images/cosmic-background.png"
          alt="Cosmic Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 👇 Adjusted padding-top for balanced spacing */}
        <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto pt-8 sm:pt-10 md:pt-12">
          {/* Logo */}
          <div className="flex justify-center mb-2 sm:mb-4">
            <Image
              src="/concierge.png"
              alt="Concierge Group Maldives"
              width={200}
              height={60}
              className="w-32 sm:w-40 md:w-48 h-auto"
              priority
            />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-gold uppercase tracking-widest font-light">Presents</p>

          {/* Animated Logo */}
          <div className="scale-75 sm:scale-90 md:scale-100">
            <AnimatedLogo />
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight gradient-text px-2"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Dream Beyond Borders
          </h1>

          {/* Subtitle */}
          <div className="space-y-2 pt-2">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-grey font-medium">
              7th November 2025
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8 px-4">
            <Link href="/details" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-neon-magenta hover:bg-hot-pink text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg neon-glow transition-all duration-300 hover:scale-105 uppercase tracking-wide"
              >
                Book Tickets
              </Button>
            </Link>

            <Link href="/details" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-background font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg transition-all duration-300 hover:scale-105 uppercase tracking-wide bg-transparent"
              >
                Show Details
              </Button>
            </Link>
          </div>

          {/* Ticket counter */}
          <div className="pt-8 sm:pt-12">
            <div className="inline-block bg-surface/80 backdrop-blur-sm border border-electric-purple rounded-lg px-4 sm:px-6 py-2 sm:py-3">
              <p className="text-muted-grey text-xs sm:text-sm uppercase tracking-wider">
                Limited Tickets Available
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
                <span className="text-neon-magenta">247</span> / 684
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
