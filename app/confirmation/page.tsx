import { TicketConfirmation } from "@/components/ticket-confirmation"
import { verifyPayment } from "@/lib/payment"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PaymentFailed from "@/components/payment-failed"

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const transactionId = (await searchParams).transactionId

  if (!transactionId) {
    return (
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-electric-purple/20 bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" className="text-muted-grey hover:text-white gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back Home
                </Button>
              </Link>
              <h1
                className="text-2xl font-bold gradient-text uppercase"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                Ticket Confirmation
              </h1>
              <div className="w-24" />
            </div>
          </div>
        </div>

        {/* Error State */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-surface/50 backdrop-blur-sm border border-electric-purple/20 rounded-lg p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-electric-purple/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-electric-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">No Valid Transaction ID</h2>
              <p className="text-muted-grey mb-8">
                Please ensure you have completed your payment before visiting this page.
              </p>
              <Link href="/">
                <Button className="bg-electric-purple hover:bg-electric-purple/90">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const verification = await verifyPayment(transactionId)

  // ✅ Return the conditional JSX
  return verification.data.payment_status === "CONFIRMED" ? (
    <main className="min-h-screen bg-background">
      <TicketConfirmation paymentStatus={verification.data} />
    </main>
  ) : (
    <main className="min-h-screen bg-background">
      <PaymentFailed />
    </main>
  )
}
