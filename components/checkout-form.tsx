"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CreditCard, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export function CheckoutForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Store order data in sessionStorage
    sessionStorage.setItem("orderData", JSON.stringify(formData))

    // Navigate to confirmation page
    router.push("/confirmation")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
            <Label htmlFor="fullName" className="text-muted-grey mb-2 block">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="bg-background border-electric-purple/30 text-white focus:border-neon-magenta"
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-muted-grey mb-2 block">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-background border-electric-purple/30 text-white focus:border-neon-magenta"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-muted-grey mb-2 block">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="bg-background border-electric-purple/30 text-white focus:border-neon-magenta"
              placeholder="+60 12-345 6789"
            />
          </div>
        </div>
      </Card>

      {/* Payment Information */}
      <Card className="bg-surface border-electric-purple/30 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-neon-magenta" />
          <h2
            className="text-xl sm:text-2xl font-bold text-white uppercase gradient-text"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Payment Details
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <Label htmlFor="cardNumber" className="text-muted-grey mb-2 block">
              Card Number
            </Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              type="text"
              required
              value={formData.cardNumber}
              onChange={handleChange}
              className="bg-background border-electric-purple/30 text-white focus:border-neon-magenta"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="expiryDate" className="text-muted-grey mb-2 block">
                Expiry Date
              </Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="text"
                required
                value={formData.expiryDate}
                onChange={handleChange}
                className="bg-background border-electric-purple/30 text-white focus:border-neon-magenta"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>

            <div>
              <Label htmlFor="cvv" className="text-muted-grey mb-2 block">
                CVV
              </Label>
              <Input
                id="cvv"
                name="cvv"
                type="text"
                required
                value={formData.cvv}
                onChange={handleChange}
                className="bg-background border-electric-purple/30 text-white focus:border-neon-magenta"
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-4 sm:mt-6 flex items-center gap-2 text-muted-grey text-xs sm:text-sm">
          <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-electric-blue flex-shrink-0" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-neon-magenta hover:bg-hot-pink text-white font-bold py-5 sm:py-6 rounded-lg neon-glow transition-all duration-300 hover:scale-105 uppercase tracking-wide text-base sm:text-lg"
      >
        Complete Purchase
      </Button>
    </form>
  )
}
