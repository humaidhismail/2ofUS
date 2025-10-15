"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatedLogo } from "@/components/animated-logo"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background with motion blur effects */}
      <div className="absolute inset-0 bg-black">
        {/* Desktop / Tablet background */}
        <Image
          src="/testdskbg.png"
          alt="Cosmic Background Desktop"
          fill
          className="hidden md:block object-cover opacity-60"
          priority
          quality={100}
        />

        {/* Mobile background */}
        <Image
          src="/mobilebg.png"
          alt="Cosmic Background Mobile"
          fill
          className="block md:hidden object-cover opacity-70"
          priority
          quality={100}
        />

        {/* Light streak overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-500/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 via-transparent to-purple-500/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl mx-auto">
            {/* Top logo */}
            <div className="flex justify-center">
              <Image
                src="/toplogo.png"
                alt="Dream Beyond Borders - Concierge Group Maldives Presents"
                width={800}
                height={400}
                className="w-full max-w-2xl h-auto"
                priority
              />
            </div>

            {/* Center animated logo and show details */}
            <div className="relative">
              {/* Animated logo */}
              <div className="relative z-10">
                <AnimatedLogo />
              </div>

              {/* Show details overlapping from top */}
              <div className="relative z-20 -mt-32 sm:-mt-40 md:-mt-48 flex justify-center">
                <Image
                  src="/images/show-details.png"
                  alt="7th NOV 2025 LIVE in Kuala Lumpur"
                  width={1000}
                  height={1000}
                  className="w-full max-w-3xl h-auto"
                  priority
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-8 sm:pt-12 pb-12 sm:pb-16 px-4">
              <Link href="/details" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#FF00FF] hover:bg-[#FF00FF]/90 text-white font-bold text-sm sm:text-base px-8 sm:px-12 py-5 sm:py-6 rounded-full shadow-[0_0_30px_rgba(255,0,255,0.6)] transition-all duration-300 hover:scale-105 uppercase tracking-wide"
                >
                  BOOK TICKETS
                </Button>
              </Link>
              <Link href="/details" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold text-sm sm:text-base px-8 sm:px-12 py-5 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 uppercase tracking-wide bg-transparent"
                >
                  SHOW DETAILS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling “Limited Tickets” banner */}
      <div className="relative z-20 bg-pink-500 py-2 overflow-hidden">
        <div className="flex animate-scroll-rtl whitespace-nowrap">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="inline-block mx-8 text-white font-bold text-sm uppercase tracking-wider"
            >
              Limited Tickets
            </span>
          ))}
        </div>
      </div>

      {/* Scrolling sponsors bar */}
      <div className="relative z-20 bg-black/90 py-3 border-t border-cyan-400/30 overflow-hidden">
        <div className="flex animate-scroll-sponsors">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={`logo-1-${i}`}
              className="flex-shrink-0 mx-6 opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src={`/images/logo-${i}.png`}
                alt={`Sponsor ${i}`}
                width={60}
                height={30}
                className="h-6 sm:h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={`logo-2-${i}`}
              className="flex-shrink-0 mx-6 opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src={`/images/logo-${i}.png`}
                alt={`Sponsor ${i}`}
                width={60}
                height={30}
                className="h-6 sm:h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
