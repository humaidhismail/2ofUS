"use client"

import VenueSeating from "./venue-seating"
import { SeatRowLayout } from "@/types/seats"

type SeatSelectionProps = {
  seats: Record<string, SeatRowLayout>
}

export function SeatSelection({ seats }: SeatSelectionProps) {
  return (
    <div className="w-full">
      <VenueSeating seats={seats}/>
    </div>
  )
}
