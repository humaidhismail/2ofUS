// ============================================
// FILE: components/order-summary.tsx
// ============================================
"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Clock, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SeatData } from "@/types/seats"

export function OrderSummary({ seats }: { seats: SeatData[] }) {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(600)

  // Modals (informational only)
  const [showPolicies, setShowPolicies] = useState(false)
  const [showSecurity, setShowSecurity] = useState(false)

  // Display-only FX rate for MYR -> MVR
  const MYR_TO_MVR = 3.74

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/details")
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  const totalMYR = useMemo(
    () => seats.reduce((sum, seat) => sum + seat.price, 0),
    [seats]
  )

  const totalMVR = useMemo(
    () => Math.round(totalMYR * MYR_TO_MVR * 100) / 100,
    [totalMYR]
  )

  const progressPercentage = useMemo(() => (timeLeft / 600) * 100, [timeLeft])

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60)
    const secs = timeLeft % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }, [timeLeft])

  return (
    <>
      <Card className="bg-surface border-electric-purple/30 p-4 sm:p-6 sticky top-24 space-y-4 sm:space-y-6">
        {/* Timer */}
        <div className="bg-background rounded-lg p-3 sm:p-4 border border-electric-blue/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-electric-blue" />
              <span className="text-muted-grey text-xs sm:text-sm uppercase tracking-wider">
                Time Remaining
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white">
              {formattedTime}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-background rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-electric-blue to-cyber-cyan transition-all duration-1000 neon-glow-blue"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-muted-grey text-xs mt-2">
            Your seats are reserved for 10 minutes
          </p>
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
            {seats.map((seat) => (
              <div
                key={seat.id}
                className="flex justify-between items-center text-xs sm:text-sm"
              >
                <div>
                  <span className="text-white font-medium">
                    Seat {seat.seatRowNumber}
                  </span>
                  <span className="text-muted-grey ml-2">({seat.category})</span>
                </div>
                <span className="text-white font-bold">MYR {seat.price}</span>
              </div>
            ))}
            {seats.length === 0 && (
              <p className="text-white/60 text-sm">No seats selected.</p>
            )}
          </div>

          {/* Pricing (no service fee) */}
          <div className="space-y-2">
            <div className="flex justify-between text-white text-base sm:text-lg font-bold pt-2 border-t border-electric-purple/30">
              <span>Total</span>
              <span className="text-neon-magenta">MYR {totalMYR.toFixed(2)}</span>
            </div>

            {/* MVR conversion + charge note */}
            <div className="pt-1">
              <p className="text-[11px] sm:text-xs text-white/80">
                ≈ <strong>{totalMVR.toFixed(2)} MVR</strong>{" "}
                <span className="text-white/60">
                  (rate {MYR_TO_MVR.toFixed(2)} MVR per MYR, indicative)
                </span>
              </p>
              <p className="text-[10px] sm:text-[11px] text-white/60 mt-1">
                Your card will be charged in <strong>MVR</strong>. The final amount
                may vary based on your bank’s FX rate and fees.
              </p>
            </div>
          </div>
        </div>

        {/* Payment (brands + redirect note ONLY — no checkbox here) */}
        <div className="border-t border-electric-purple/30 pt-4">
          <h4 className="text-white font-bold mb-2 uppercase text-xs sm:text-sm">
            Payment
          </h4>

          <div className="bg-background/60 border border-white/10 rounded-lg p-3 flex items-center justify-center">
            <Image
              src="/cardslogo.jpeg" // change if your strip lives elsewhere
              alt="Accepted card brands"
              width={640}
              height={130}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <p className="text-[11px] sm:text-xs text-white/80 mt-3">
            After clicking <strong>"Proceed to Payment"</strong>, you will be
            redirected to our secure payment gateway to complete your purchase.
          </p>

          <p className="text-[11px] sm:text-xs text-white/70 mt-3">
            We accept the cards shown above. Transactions are processed securely
            over TLS; card data is never stored on our servers.
          </p>
        </div>

        {/* Quick links to Policies/Security (informational) */}
        <div className="border-t border-electric-purple/30 pt-4 space-y-3">
          <h4 className="text-white font-bold uppercase text-xs sm:text-sm">
            Purchase Terms
          </h4>
          <ul className="text-xs sm:text-sm text-white/85 space-y-1 list-disc pl-4">
            <li>
              <strong>Non-Refundable:</strong> All ticket purchases are final and
              non-refundable.
            </li>
            <li>
              Transaction currency: <strong>MVR</strong> (Maldivian Rufiyaa).
            </li>
            <li>Please keep a copy of your receipt and the policies.</li>
          </ul>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setShowPolicies(true)}
              className="underline text-electric-blue hover:text-cyber-cyan"
            >
              View Terms, Refund & Privacy
            </button>
            <span className="text-white/40">•</span>
            <button
              type="button"
              onClick={() => setShowSecurity(true)}
              className="underline text-electric-blue hover:text-cyber-cyan"
            >
              Security
            </button>
          </div>
        </div>

        {/* Event Info */}
        <div className="border-t border-electric-purple/30 pt-4">
          <h4 className="text-white font-bold mb-2 uppercase text-xs sm:text-sm">
            Event Details
          </h4>
          <div className="space-y-1 text-xs sm:text-sm text-muted-grey">
            <p>Dream Beyond Borders - 2ofus LIVE</p>
            <p>7th November 2025</p>
            <p>Stage 1 Theatre, Petaling Jaya Performing Arts Centre</p>
          </div>
        </div>
      </Card>

      {/* Policies Modal */}
      {showPolicies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowPolicies(false)}
            aria-hidden
          />
          <div className="relative z-10 w-[92vw] max-w-2xl max-h-[80vh] overflow-y-auto bg-surface border border-electric-purple/40 rounded-2xl p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-lg font-bold">Policies</h3>
              <button
                className="text-white/70 hover:text-white"
                onClick={() => setShowPolicies(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-sm leading-6 text-white/90">
              <section>
                <h4 className="font-semibold text-white mb-1">
                  Terms & Conditions
                </h4>
                <p>
                  Tickets grant one-time entry to the specified event, date, and
                  venue. Resale, duplication, or tampering voids entry. You agree
                  to comply with venue rules and security checks. Schedule and
                  lineup may change without notice.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-white mb-1">
                  Refund & Cancellation
                </h4>
                <p>
                  <strong>All sales are final and non-refundable.</strong> In the
                  unlikely event of a full cancellation by the organiser, you may
                  be offered an alternative date or an organiser-managed refund at
                  their discretion.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-white mb-1">Privacy Policy</h4>
                <p>
                  We collect the minimum necessary data to process your order
                  (e.g., name, email). Payment details are processed securely by
                  our payment partners and are not stored on our servers.
                </p>
              </section>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:text-white"
                onClick={() => setShowPolicies(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Modal */}
      {showSecurity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowSecurity(false)}
            aria-hidden
          />
          <div className="relative z-10 w-[92vw] max-w-2xl max-h-[80vh] overflow-y-auto bg-surface border border-electric-purple/40 rounded-2xl p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-lg font-bold">Security</h3>
              <button
                className="text-white/70 hover:text-white"
                onClick={() => setShowSecurity(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-sm leading-6 text-white/90">
              <section>
                <h4 className="font-semibold text-white mb-1">
                  Payment Processing
                </h4>
                <p>
                  Card transactions are handled by a PCI-DSS–compliant processor.
                  We do not store raw card numbers on our servers.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-white mb-1">Encryption</h4>
                <p>
                  All traffic uses HTTPS (TLS 1.2+). Sensitive card data is
                  tokenized and never persists in plaintext.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-white mb-1">
                  Fraud Prevention
                </h4>
                <p>
                  3-D Secure / OTP may be required by your bank. CVV/issuer checks
                  are performed where applicable.
                </p>
              </section>
              <section>
                <h4 className="font-semibold text-white mb-1">Data Privacy</h4>
                <p>
                  Personal information is handled under our Privacy Policy.{" "}
                </p>
              </section>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:text-white"
                onClick={() => setShowSecurity(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
