import { SeatSelection } from "@/components/seat-selection"
import { TicketCategories } from "@/components/ticket-categories"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DetailsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-electric-purple/20 bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-muted-grey hover:text-white gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold gradient-text uppercase" style={{ fontFamily: "var(--font-anton)" }}>
              Select Your Seats
            </h1>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Ticket Categories */}
          <TicketCategories />

          {/* Seat Selection */}
          <SeatSelection />
        </div>
      </div>
    </main>
  )
}
