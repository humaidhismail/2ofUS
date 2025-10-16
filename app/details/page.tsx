import { SeatSelection } from "@/components/seat-selection"
import { TicketCategories } from "@/components/ticket-categories"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSeats } from "@/lib/seats"

export default async function DetailsPage() {
    const seats = await getSeats();

    if (!seats.success) {
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
                            <div className="w-24" />
                        </div>
                    </div>
                </div>

                {/* Error State */}
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-surface/50 backdrop-blur-sm border border-electric-purple/20 rounded-lg p-12 text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-electric-purple/10 flex items-center justify-center">
                                <svg className="w-8 h-8 text-electric-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">Unable to Load Seats</h2>
                            <p className="text-muted-grey mb-8">
                                We're having trouble loading the seat information. Please try again later.
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
          <SeatSelection seats={seats.response.data}/>
        </div>
      </div>
    </main>
  )
}
