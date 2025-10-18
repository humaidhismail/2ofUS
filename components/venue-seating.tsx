"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { SeatRowLayout, SeatData } from "@/types/seats"
import { useRouter } from "next/navigation"

type VenueSeatingProps = {
  seats: Record<string, SeatRowLayout>
}

// -------- Zone Colors --------
const zoneColors: Record<string, { border: string; hover: string; selected: string; text: string }> = {
  "VIP Zone": { border: "#FDC70C", hover: "rgba(253,199,12,0.8)", selected: "#FDC70C", text: "text-[#FDC70C]" },
  "Wheelchair Access": { border: "#11D369", hover: "rgba(17,211,105,0.8)", selected: "#11D369", text: "text-[#11D369]" },
  "Standard Zone": { border: "#E83033", hover: "rgba(232,48,51,0.8)", selected: "#E83033", text: "text-[#E83033]" },
  "Standard Zone (Mid)": { border: "#FF6B6B", hover: "rgba(255,107,107,0.8)", selected: "#FF6B6B", text: "text-[#FF6B6B]" },
  "Lower Section": { border: "#9B59B6", hover: "rgba(155,89,182,0.8)", selected: "#9B59B6", text: "text-[#9B59B6]" },
}

// -------- VenueSeating Component --------
const VenueSeating = ({ seats }: VenueSeatingProps) => {
    const router = useRouter()
    const [selectedSeats, setSelectedSeats] = useState<SeatData[]>([])

    const handleBookNow = () => {
        const seatsData = selectedSeats.map(seat => ({
        id: seat.id,
        seatRowNumber: seat.seatRowNumber,
        number: seat.number,
        category: seat.category,
        price: seat.price
        }))

        const query = encodeURIComponent(JSON.stringify(seatsData))
        router.push(`/checkout?seats=${query}`)
    }

    const toggleSeat = (seat: SeatData) => {
    setSelectedSeats((prev) => {
        const exists = prev.find((s) => s.seatRowNumber === seat.seatRowNumber)
        if (exists) return prev.filter((s) => s.seatRowNumber !== seat.seatRowNumber)
        return [...prev, seat]
    })
    }

    const clearSelection = () => setSelectedSeats([])

    const Seat = ({ row, seat }: { row: string; seat: SeatData }) => {
    const isSelected = selectedSeats.some((s) => s.seatRowNumber === seat.seatRowNumber)

    // Seat status flags
    const isUnavailable = seat.status === "unavailable"
    const isReserved = seat.status === "reserved"
    const isBooked = seat.status === "booked"

    const palette = zoneColors[seat.category] || zoneColors["Standard Zone"]

    // Determine colors and styles based on status
    let bgColor = "transparent"
    let textColor = palette.text
    let cursor = "cursor-pointer"
    let ringClass = ""
    let shadowClass = ""

    if (isSelected) {
        bgColor = palette.selected
        textColor = "text-black"
        ringClass = "ring-2 ring-offset-1 ring-black/20"
        shadowClass = "shadow-lg"
    } else if (isUnavailable) {
        bgColor = "#00d8ff"
        textColor = "text-black opacity-60"
        cursor = "cursor-not-allowed"
    } else if (isReserved) {
        bgColor = "#FFD700" // gold/yellow
        textColor = "text-black opacity-70"
        cursor = "cursor-not-allowed"
    } else if (isBooked) {
        bgColor = "#FF3B3B" // red
        textColor = "text-white opacity-80"
        cursor = "cursor-not-allowed"
    }

    return (
        <button
        onClick={() => !isUnavailable && !isReserved && !isBooked && toggleSeat(seat)}
        disabled={isUnavailable || isReserved || isBooked}
        style={{
            backgroundColor: bgColor,
            borderColor: palette.border,
        }}
        className={`w-8 h-8 text-xs rounded border-2 font-semibold transition-all duration-300 ease-in-out
            ${isSelected ? `scale-110 ${ringClass} ${shadowClass}` : ""}
            ${
            !isUnavailable && !isReserved && !isBooked
                ? `hover:shadow-[0_0_15px_${palette.hover}]`
                : ""
            }
            ${textColor} ${cursor}
        `}
        title={`${row}${seat.number} - ${
            isUnavailable
            ? "Unavailable"
            : isReserved
            ? "Reserved"
            : isBooked
            ? "Booked"
            : "MYR " + seat.price
        }`}
        >
        {seat.number}
        </button>
    )
    }


    const SeatRow = ({ row, seats }: { row: string; seats: SeatRowLayout }) => {
    const leftSeats = seats?.left || []
    const centerSeats = seats?.center || []
    const rightSeats = seats?.right || []

    return (
      <div className="mb-2 flex justify-center">
        <div className="grid items-center gap-3" style={{ gridTemplateColumns: "32px 1fr 48px 1fr 48px 1fr" }}>
          {/* Row Label */}
          <div className="text-center font-semibold text-white text-sm">{row}</div>

          {/* Left Section - Grid with 10 columns (max seats in left) */}
          <div className="grid gap-1 justify-items-center" style={{ gridTemplateColumns: "repeat(10, 32px)" }}>
            {leftSeats.map((s) => <Seat key={`${row}-${s.number}`} row={row} seat={s} />)}
          </div>

          {/* Aisle */}
          <div></div>

          {/* Center Section - Grid with 14 columns (max seats in center) */}
          <div className="grid gap-1 justify-items-center" style={{ gridTemplateColumns: "repeat(14, 32px)" }}>
            {centerSeats.map((s) => <Seat key={`${row}-${s.number}`} row={row} seat={s} />)}
          </div>

          {/* Aisle */}
          <div></div>

          {/* Right Section - Grid with 10 columns (max seats in right) */}
          <div className="grid gap-1 justify-items-center" style={{ gridTemplateColumns: "repeat(10, 32px)" }}>
            {rightSeats.map((s) => <Seat key={`${row}-${s.number}`} row={row} seat={s} />)}
          </div>
        </div>
      </div>
    )
  }

  const totalPrice = selectedSeats.reduce((sum, s) => sum + Number(s.price || 0), 0);

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 text-white uppercase">2ofUS Malaysia Venue</h1>
        <p className="text-center text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">Select your seats</p>

        <div className="overflow-x-auto pb-4">
          <div className="min-w-max">
            {Object.entries(seats).map(([row, rowSeats]) => (
              <SeatRow key={row} row={row} seats={rowSeats} />
            ))}
          </div>
        </div>

        {/* Booking Summary */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-gray-800 border-2 border-purple-500 rounded-lg p-4 sm:p-6 shadow-lg shadow-purple-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 uppercase">Selected Seats</h3>
                <div className="text-sm sm:text-base text-white break-words">
                  {selectedSeats.map((s, i) => (
                    <span key={s.id}>
                      {s.seatRowNumber} <span className="text-gray-400">(MYR {s.price})</span>
                      {i < selectedSeats.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Total: {selectedSeats.length} seat(s)</p>
                <p className="text-lg sm:text-xl font-bold text-cyan-400 mt-2">MYR {Number.isFinite(totalPrice) ? totalPrice.toFixed(2) : "0.00"}</p>
              </div>
              <button onClick={handleBookNow} className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/50 hover:shadow-pink-500/50 flex items-center justify-center gap-2 uppercase text-sm sm:text-base">
                <CheckCircle2 size={18} /> Book Now
              </button>
            </div>
          </div>
        )}

        {/* Unselect All */}
        <div className="mt-4 flex justify-center">
          <button onClick={clearSelection} disabled={selectedSeats.length === 0} className="px-5 py-2 rounded-lg font-semibold uppercase text-sm bg-white/10 text-white border border-white/30 hover:bg-white/15 transition disabled:opacity-40 disabled:cursor-not-allowed">
            Unselect all seats
          </button>
        </div>
      </div>
    </div>
  )
}

export default VenueSeating
