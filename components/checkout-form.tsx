"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { SeatData } from "@/types/seats"

export function CheckoutForm({ seats }: { seats: SeatData[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [accepted, setAccepted] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accepted) {
      setError("Please agree to the terms before proceeding.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const seatIds = seats.map((seat) => seat.id)

      const payload = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        seat_ids: seatIds,
      }

      const response = await fetch(`http://127.0.0.1:8000/api/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order")
      }

      if (data.redirect_url) {
        window.location.href = data.redirect_url
      } else {
        throw new Error("Payment redirect URL not received")
      }
    } catch (err: any) {
      console.error("Order creation failed:", err)
      setError(err.message || "Failed to process order. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Error Message */}
      {error && (
        <Card className="bg-red-500/10 border-red-500/30 p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </Card>
      )}

      {/* Personal Information */}
      <Card className="bg-surface border-electric-purple/30 p-4 sm:p-6">
        <h2
          className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 uppercase gradient-text"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Personal Information
        </h2>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <Label htmlFor="customer_name" className="text-muted-grey mb-2 block">
              Full Name
            </Label>
            <Input
              id="customer_name"
              name="customer_name"
              type="text"
              required
              value={formData.customer_name}
              onChange={handleChange}
              className="bg-background border-electric-purple/30 text-white focus:border-neon-magenta"
              placeholder="John Doe"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="customer_email" className="text-muted-grey mb-2 block">
              Email Address
            </Label>
            <Input
              id="customer_email"
              name="customer_email"
              type="email"
              required
              value={formData.customer_email}
              onChange={handleChange}
              className="bg-background border-electric-purple/30 text-white focus:border-neon-magenta"
              placeholder="john@example.com"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="customer_phone" className="text-muted-grey mb-2 block">
              Phone Number
            </Label>
            <Input
              id="customer_phone"
              name="customer_phone"
              type="tel"
              required
              value={formData.customer_phone}
              onChange={handleChange}
              className="bg-background border-electric-purple/30 text-white focus:border-neon-magenta"
              placeholder="+60 12-345 6789"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </Card>

      {/* Payment Notice + Consent */}
      <Card className="bg-surface border-electric-purple/30 p-4 sm:p-6">
        <div className="space-y-3">
          <h2
            className="text-xl sm:text-2xl font-bold text-white uppercase gradient-text"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Payment
          </h2>
          <p className="text-muted-grey text-sm">
            After clicking <strong>“Proceed to Payment”</strong>, you will be redirected to our secure payment gateway to
            complete your purchase.
          </p>

          {/* ✅ Consent checkbox */}
          <label className="mt-2 flex items-start gap-2 text-xs sm:text-sm text-white/90">
            <input
              type="checkbox"
              className="mt-0.5"
              checked={accepted}
              onChange={(e) => setAccepted(e.currentTarget.checked)}
              required
            />
            <span>
              I have read and accept the <strong>Terms</strong>, <strong>Privacy Policy</strong> and{" "}
              <strong>Refund Policy</strong>, and I understand this purchase is <strong>non-refundable</strong>.
            </span>
          </label>
        </div>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || seats.length === 0 || !accepted}
        className="w-full bg-neon-magenta hover:bg-hot-pink text-white font-bold py-5 sm:py-6 rounded-lg neon-glow transition-all duration-300 hover:scale-105 uppercase tracking-wide text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Processing...
          </>
        ) : (
          "Proceed to Payment"
        )}
      </Button>
    </form>
  )
}
