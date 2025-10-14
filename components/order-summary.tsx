"use client"

import { useEffect, useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface Seat {
  id: string
  row: string
  number: number
  zone: string
  price: number
}

export function OrderSummary() {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  useEffect(() => {
    const storedSeats = sessionStorage.getItem("selectedSeats")
    if (storedSeats) {
      try {
        const seats = JSON.parse(storedSeats)
        setSelectedSeats(seats)
      } catch (error) {
        console.error("Failed to parse selected seats:", error)
      }
    }
  }, []) // Empty dependency array - only run once

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = "/details"
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const subtotal = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  }, [selectedSeats])

  const serviceFee = useMemo(() => {
    return selectedSeats.length * 5
  }, [selectedSeats.length])

  const total = useMemo(() => {
    return subtotal + serviceFee
  }, [subtotal, serviceFee])

  const progressPercentage = useMemo(() => {
    return (timeLeft / 600) * 100
  }, [timeLeft])

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60)
    const secs = timeLeft % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }, [timeLeft])

  const getZoneDisplay = (zone: string) => {
    const zoneMap: Record<string, string> = {
      yellow: "Yellow VIP",
      red: "Red Zone",
      black: "Black Zone",
      green: "Green Zone",
    }
    return zoneMap[zone] || zone
  }

  return (
    <Card className="bg-surface border-electric-purple/30 p-4 sm:p-6 sticky top-24 space-y-4 sm:space-y-6">
      {/* Timer */}
      <div className="bg-background rounded-lg p-3 sm:p-4 border border-electric-blue/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-electric-blue" />
            <span className="text-muted-grey text-xs sm:text-sm uppercase tracking-wider">Time Remaining</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">{formattedTime}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-background rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-electric-blue to-cyber-cyan transition-all duration-1000 neon-glow-blue"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-muted-grey text-xs mt-2">Your seats are reserved for 10 minutes</p>
      </div>

      {/* Order Details */}
      <div>
        <h3
          className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 uppercase gradient-text"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Order Summary
        </h3>

        <div className="space-y-2 sm:space-y-3 mb-4 max-h-48 overflow-y-auto">
          {selectedSeats.map((seat) => (
            <div key={seat.id} className="flex justify-between items-center text-xs sm:text-sm">
              <div>
                <span className="text-white font-medium">Seat {seat.id}</span>
                <span className="text-muted-grey ml-2">({getZoneDisplay(seat.zone)})</span>
              </div>
              <span className="text-white font-bold">MYR {seat.price}</span>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="border-t border-electric-purple/30 pt-4 space-y-2">
          <div className="flex justify-between text-muted-grey text-xs sm:text-sm">
            <span>Subtotal ({selectedSeats.length} tickets)</span>
            <span>MYR {subtotal}</span>
          </div>
          <div className="flex justify-between text-muted-grey text-xs sm:text-sm">
            <span>Service Fee</span>
            <span>MYR {serviceFee}</span>
          </div>
          <div className="flex justify-between text-white text-base sm:text-lg font-bold pt-2 border-t border-electric-purple/30">
            <span>Total</span>
            <span className="text-neon-magenta">MYR {total}</span>
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="border-t border-electric-purple/30 pt-4">
        <h4 className="text-white font-bold mb-2 uppercase text-xs sm:text-sm">Event Details</h4>
        <div className="space-y-1 text-xs sm:text-sm text-muted-grey">
          <p>Dream Beyond Borders - 2ofus LIVE</p>
          <p>7th November 2025</p>
          <p>Stage 1 Theatre, Petaling Jaya Performing Arts Centre</p>
        </div>
      </div>
    </Card>
  )
}
