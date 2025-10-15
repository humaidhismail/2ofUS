"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle2, Accessibility } from "lucide-react"

const VenueSeating = () => {
  // ---- Types ----
  type SeatRowLayout = {
    left: number[]
    center: number[]
    right: number[]
    zone: string
    price: number
  }

  // ---- Upper layout ----
  const seatLayout: Record<string, SeatRowLayout> = {
    A: { left: [1,2,3,4,5,6,7,8,9], center: [10,11,12,13,14,15,16,17,18,19,20], right: [21,22,23,24,25,26,27,28], zone: "red", price: 80 },
    B: { left: [1,2,3,4,5,6,7,8,9,10], center: [11,12,13,14,15,16,17,18,19,20,21,22], right: [23,24,25,26,27,28,29,30,31,32], zone: "red", price: 80 },
    C: { left: [1,2,3,4,5,6,7,8,9,10], center: [11,12,13,14,15,16,17,18,19,20,21,22], right: [23,24,25,26,27,28,29,30,31,32], zone: "red", price: 80 },
    D: { left: [1,2,3,4,5,6,7,8,9,10], center: [11,12,13,14,15,16,17,18,19,20,21,22], right: [23,24,25,26,27,28,29,30,31,32], zone: "red", price: 80 },
    E: { left: [1,2,3,4,5,6,7,8,9,10], center: [11,12,13,14,15,16,17,18,19,20,21,22], right: [23,24,25,26,27,28,29,30,31], zone: "black", price: 70 },
    F: { left: [1,2,3,4,5,6,7,8,9,10], center: [11,12,13,14,15,16,17,18,19,20,21,22], right: [23,24,25,26,27,28,29,30,31], zone: "black", price: 70 },
    G: { left: [1,2,3,4,5,6,7,8,9], center: [10,11,12,13,14,15,16,17,18,19,20,21,22], right: [23,24,25,26,27,28,29,30,31], zone: "black", price: 70 },
    H: { left: [1,2,3,4,5,6,7,8,9], center: [10,11,12,13,14,15,16,17,18,19,20,21], right: [22,23,24,25,26,27,28,29,30], zone: "black", price: 70 },
    // J row has red segments; base zone kept "green" for the band visuals
    J: { left: [1,2,3,4,5,6,7,8,9], center: [10,11,12,13,14,15,16,17,18,19,20,21,22], right: [23,24,25,26,27,28,29,30,31], zone: "green", price: 50 },
    K: { left: [1,2,3,4,5,6,7,8,9], center: [10,11,12,13,14,15,16,17,18,19,20,21,22], right: [23,24,25,26,27,28,29,30,31], zone: "blue", price: 0 },
    L: { left: [1,2,3,4,5,6,7,8,9], center: [10,11,12,13,14,15,16,17,18,19,20,21,22], right: [24,25,26,27,28,29,30,31,32], zone: "blue", price: 0 },
    M: { left: [1,2,3,4,5,6,7,8,9], center: [10,11,12,13,14,15,16,17,18,19,20,21,22,23], right: [24,25,26,27,28,29,30,31,32], zone: "purple", price: 0 },
    N: { left: [1,2,3,4,5,6,7,8,9], center: [11,12,13,14,15,16,17,18,19,20,21,22], right: [23,24,25,26,27,28,29,30,31,32], zone: "purple", price: 0 },
    P: { left: [1,2,3,4,5,6,7,8,9], center: [11,12,13,14,15,16,17,18,19,20,21,22,23], right: [24,25,26,27,28,29,30,31,32], zone: "purple", price: 0 },
    R: { left: [1,2,3,4,5,6,7,8], center: [9,10,11,12,13,14,15], right: [16,17,18,19,20,21,22,23], zone: "red", price: 80 },
    S: { left: [1,2,3,4,5,6,7,8], center: [9,10,11,12,13,14,15], right: [16,17,18,19,20,21,22,23], zone: "red", price: 80 },
    T: { left: [1,2,3,4,5,6,7,8], center: [9,10,11,12,13,14,15,16], right: [16,17,18,19,20,21,22,23,24], zone: "red", price: 80 },
    U: { left: [1,2,3,4,5,6,7,8], center: [], right: [], zone: "red", price: 80 },
  }

  // ---- Lower layout ----
  const lowerSeatLayout = {
    LA: { left: [1,2,3,4,5,6,7,8], center: [9,10,11,12,13,14,15,16,17,18,19], right: [20,21,22,23,24,25,26,27,28], zone: "red", price: 80 },
    LB: { left: [1,2,3,4,5,6,7,8,9,10], center: [11,12,13,14,15,16,17,18,19,20,21,22], right: [23,24,25,26,27,28,29,30,31,32], zone: "red", price: 80 },
    LC: { left: [1,2,3,4,5,6,7,8,9,10], center: [11,12,13,14,15,16,17,18,19,20,21,22,23], right: [24,25,26,27,28,29,30,31,32,33], zone: "red", price: 80 },
    LD: { left: [1,2,3,4,5,6,7,8,9], center: [10,11,12,13,14,15,16,17,18,19,20,21,22,23], right: [24,25,26,27,28,29,30,31,32], zone: "red", price: 80 },
    LE: { left: [1,2,3,4,5,6,7,8,9], center: [10,11,12,13], right: [14,15,16,17,18,19,20,21,22], zone: "red", price: 80 },
    LF: { left: [1,2,3,4,5,6,7,8,9], center: [10,11,12,13], right: [14,15,16,17,18,19,20,21,22], zone: "red", price: 80 },
  }

  // ---- Colors ----
  const zoneColors = {
    red:   { border: "border-[#E83033]", hover: "hover:shadow-[0_0_15px_rgba(232,48,51,0.8)]", selected: "bg-[#E83033] border-[#E83033] shadow-[0_0_20px_rgba(232,48,51,1)] ring-2 ring-[#E83033]/50", text: "text-white", label: "text-[#E83033]" },
    gold:  { border: "border-[#FDC70C]", hover: "hover:shadow-[0_0_15px_rgba(253,199,12,0.8)]", selected: "bg-[#FDC70C] border-[#FDC70C] shadow-[0_0_20px_rgba(253,199,12,1)] ring-2 ring-[#FDC70C]/50", text: "text-black", label: "text-[#FDC70C]" },
    green: { border: "border-[#11D369]", hover: "hover:shadow-[0_0_15px_rgba(17,211,105,0.8)]", selected: "bg-[#11D369] border-[#11D369] shadow-[0_0_20px_rgba(17,211,105,1)] ring-2 ring-[#11D369]/50", text: "text-white", label: "text-[#11D369]" },
    black: { border: "border-black",      hover: "hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]", selected: "bg-black border-black shadow-[0_0_20px_rgba(255,255,255,0.25)] ring-2 ring-white/30", text: "text-white", label: "text-white" },
    blue:  { border: "border-[#E83033]", hover: "hover:shadow-[0_0_15px_rgba(232,48,51,0.8)]", selected: "bg-[#E83033] border-[#E83033] shadow-[0_0_20px_rgba(232,48,51,1)] ring-2 ring-[#E83033]/50", text: "text-white", label: "text-[#E83033]" },
    purple:{ border: "border-[#E83033]", hover: "hover:shadow-[0_0_15px_rgba(232,48,51,0.8)]", selected: "bg-[#E83033] border-[#E83033] shadow-[0_0_20px_rgba(232,48,51,1)] ring-2 ring-[#E83033]/50", text: "text-white", label: "text-[#E83033]" },
  } as const

  const zoneHex: Record<string, string> = {
    red: "#E83033",
    gold: "#FDC70C",
    green: "#11D369",
    black: "#000000",
    blue: "#E83033",
    purple: "#E83033",
  }

  // ---- Selection state ----
  const [selectedSeats, setSelectedSeats] = useState<{ id: string; zone: string; price: number }[]>([])

  const toggleSeat = (seatId: string, zone: string, price: number) => {
    setSelectedSeats((prev) => {
      const existing = prev.find((s) => s.id === seatId)
      if (existing) return prev.filter((s) => s.id !== seatId)
      return [...prev, { id: seatId, zone, price }]
    })
  }

  const clearSelection = () => setSelectedSeats([])

  // ---- Availability / special lists ----
  const unavailableSeatsGroup1 = ["A-1","A-2","A-3","B-1","B-2","B-3","C-1","C-2","C-3","A-26","A-27","A-28","B-29","B-30","B-31","B-32","C-29","C-30","C-31","S-12","T-12","T-13","LA-1","LA-2","LA-3","LA-4","LA-5","LA-6","LA-7","LA-8","LA-9","LA-10","LA-11","LA-12","LA-13","LA-14","LA-15","LA-16","LA-17","LA-18","LA-19","LA-20","LA-21","LA-22","LA-23","LA-24","LA-25","LA-26","LA-27","LA-28"]
  const unavailableSeatsGroup2 = ["J-1","J-2","J-30","J-31","N-15","N-16","N-17","N-18","P-15","P-16","P-17","P-18"]

  const vipSeats = [
    "E-11","E-12","E-13","E-14","E-15","E-16","E-17","E-18","E-19","E-20","E-21","E-22",
    "F-11","F-12","F-13","F-14","F-15","F-16","F-17","F-18","F-19","F-20","F-21","F-22",
    "G-10","G-11","G-12","G-13","G-14","G-15","G-16","G-17","G-18","G-19","G-20","G-21","G-22",
    "H-10","H-11","H-12","H-13","H-14","H-15","H-16","H-17","H-18","H-19","H-20","H-21",
    "J-10","J-11","J-12","J-13","J-14","J-15","J-16","J-17","J-18","J-19","J-20","J-21","J-22",
    "K-10","K-11","K-12","K-13","K-14","K-15","K-16","K-17","K-18","K-19","K-20","K-21","K-22",
    "L-10","L-11","L-12","L-13","L-14","L-15","L-16","L-17","L-18","L-19","L-20","L-21","L-22","L-23",
    "M-10","M-11","M-12","M-13","M-14","M-15","M-16","M-17","M-18","M-19","M-20","M-21","M-22","M-23",
  ]
  const wheelchairSeats = ["A-6","A-7","A-8","A-9","A-21","A-22","A-23","A-24"]

  // Lower-section (LB–LF) black bookable seats
  const blackBookableSeats: string[] = []
  ;["LB","LC","LD","LE","LF"].forEach((row) => {
    const rowData = lowerSeatLayout[row as keyof typeof lowerSeatLayout]
    if (rowData) [...rowData.left, ...rowData.center, ...rowData.right].forEach((n) => blackBookableSeats.push(`${row}-${n}`))
  })

  // ---------- PRICING ----------
  const PRICES = { VIP: 120, STANDARD_MID: 100, STANDARD: 80, BLACK: 70, WHEELCHAIR: 50 }

  // J row red segments: J3–J9 and J23–J29
  const isJRowRed = (row: string, n: number) =>
    row === "J" && ((n >= 3 && n <= 9) || (n >= 23 && n <= 29))

  // E/F/G/H red-like-D23 segments
  const isUpperRedLikeD23 = (row: string, n: number) => {
    if (row === "E") return (n >= 1 && n <= 10) || (n >= 23 && n <= 31)
    if (row === "F") return (n >= 1 && n <= 10) || (n >= 23 && n <= 31)
    if (row === "G") return (n >= 1 && n <= 9)  || (n >= 23 && n <= 31)
    if (row === "H") return (n >= 1 && n <= 9)  || (n >= 22 && n <= 30)
    return false
  }

  const getSeatPrice = (row: string, number: number, zone: string): number => {
    const seatId = `${row}-${number}`
    if (wheelchairSeats.includes(seatId)) return PRICES.WHEELCHAIR
    if (vipSeats.includes(seatId)) return PRICES.VIP
    if (isJRowRed(row, number)) return PRICES.STANDARD
    if (isUpperRedLikeD23(row, number)) return PRICES.STANDARD
    if (zone === "black" || blackBookableSeats.includes(seatId)) return PRICES.BLACK
    if (zone === "red") {
      const isAD = ["A", "B", "C", "D"].includes(row)
      const inCenter = isAD && seatLayout[row as keyof typeof seatLayout]?.center?.includes(number)
      return isAD && inCenter ? PRICES.STANDARD_MID : PRICES.STANDARD
    }
    return 0
  }

  // ---- Seat ----
  const Seat = ({ row, number, zone }: { row: string; number: number; zone: string }) => {
    const seatId = `${row}-${number}`
    const isSelected = selectedSeats.some((s) => s.id === seatId)
    const isUnavailableGroup1 = unavailableSeatsGroup1.includes(seatId)
    const isUnavailableGroup2 = unavailableSeatsGroup2.includes(seatId)
    const isVIP = vipSeats.includes(seatId)
    const isWheelchair = wheelchairSeats.includes(seatId)
    const isBlackBookable = blackBookableSeats.includes(seatId)
    const isLowerSection = row.startsWith("L")

    // Treat J and upper red-exceptions as red for styling + price
    const effectiveZone =
      isJRowRed(row, number) || isUpperRedLikeD23(row, number) ? "red" : zone

    const palette = isWheelchair
      ? zoneColors.green
      : isVIP
        ? zoneColors.gold
        : effectiveZone in zoneColors
          ? zoneColors[effectiveZone as keyof typeof zoneColors]
          : zoneColors.red

    const computedPrice = getSeatPrice(row, number, effectiveZone)

    // Inline fill/border to guarantee visible highlight
    const hex = isWheelchair
      ? zoneHex.green
      : isVIP
        ? zoneHex.gold
        : zoneHex[effectiveZone] ?? zoneHex.red

    const selectedStyle = isSelected
      ? { backgroundColor: hex, borderColor: hex }
      : { backgroundColor: "transparent", borderColor: hex }

    if (isBlackBookable && !isUpperRedLikeD23(row, number)) {
      const blackHex = "#000000"
      return (
        <button
          onClick={() => toggleSeat(seatId, "black", PRICES.BLACK)}
          style={isSelected ? { backgroundColor: blackHex, borderColor: blackHex } : { backgroundColor: "transparent", borderColor: blackHex }}
          className={`w-8 h-8 text-xs rounded border-2 transition-all relative font-semibold ${
            isSelected
              ? `text-white scale-110 ring-2 ring-white/30 shadow-[0_0_20px_rgba(255,255,255,0.25)]`
              : `text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]`
          }`}
          title={`${row}${number} - MYR ${PRICES.BLACK}`}
        >
          {number}
        </button>
      )
    }

    if (isUnavailableGroup1) {
      return (
        <button
          disabled
          className={`w-8 h-8 text-xs rounded border-2 border-[#1EA9E1] bg-[#1EA9E1] font-semibold cursor-not-allowed opacity-80 ${
            isLowerSection ? "text-black" : "text-white"
          }`}
          title={`${row}${number} - Unavailable`}
        >
          {number}
        </button>
      )
    }

    if (isUnavailableGroup2) {
      return (
        <button
          disabled
          className="w-8 h-8 text-xs rounded border-2 border-[#8F489B] bg-[#8F489B] text-white font-semibold cursor-not-allowed opacity-80"
          title={`${row}${number} - Unavailable`}
        >
          {number}
        </button>
      )
    }

    // Wheelchair / VIP / Standard (incl. red-exceptions)
    return (
      <button
        onClick={() =>
          toggleSeat(
            seatId,
            isVIP ? "gold" : effectiveZone,
            isWheelchair ? PRICES.WHEELCHAIR : isVIP ? PRICES.VIP : computedPrice
          )
        }
        style={selectedStyle}
        className={`w-8 h-8 text-xs rounded border-2 transition-all relative font-semibold ${
          isSelected
            ? `scale-110 ring-2 shadow-lg ${palette.text}`
            : `bg-transparent ${palette.hover} ${palette.label}`
        }`}
        title={
          isWheelchair
            ? `${row}${number} - Wheelchair Accessible - MYR ${PRICES.WHEELCHAIR}`
            : isVIP
              ? `${row}${number} - VIP - MYR ${PRICES.VIP}`
              : `${row}${number} - MYR ${computedPrice}`
        }
      >
        {number}
      </button>
    )
  }

  // ---- Row ----
  const SeatRow = ({ row, seats }: { row: string; seats: SeatRowLayout }) => {
    const leftSeats = seats.left
    const centerSeats = seats.center
    const rightSeats = seats.right

    return (
      <div className="mb-2">
        {row === "A" && (
          <div className="flex items-center gap-4 mb-1">
            <div className="w-8"></div>
            <div className="flex gap-1 justify-start" style={{ width: "360px" }}>
              <div className="flex items-center justify-center" style={{ marginLeft: "160px", width: "128px" }}>
                <Accessibility className="w-5 h-5 text-[#11D369]" />
              </div>
            </div>
            <div className="w-12"></div>
            <div className="flex gap-1 justify-start" style={{ width: "440px" }}></div>
            <div className="w-12"></div>
            <div className="flex gap-1 justify-start" style={{ width: "360px" }}>
              <div className="flex items-center justify-center" style={{ width: "128px" }}>
                <Accessibility className="w-5 h-5 text-[#11D369]" />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* Row label */}
          <div className="w-8 text-center font-semibold text-white text-sm">{row}</div>

          <div className="flex gap-1 justify-start" style={{ width: "360px" }}>
            {leftSeats.map((n) => <Seat key={`${row}-${n}`} row={row} number={n} zone={seats.zone} />)}
          </div>

          <div className="w-12"></div>

          <div className="flex gap-1 justify-start" style={{ width: "440px" }}>
            {centerSeats.map((n) => <Seat key={`${row}-${n}`} row={row} number={n} zone={seats.zone} />)}
          </div>

          <div className="w-12"></div>

          <div className="flex gap-1 justify-start" style={{ width: "360px" }}>
            {rightSeats.map((n) => <Seat key={`${row}-${n}`} row={row} number={n} zone={seats.zone} />)}
          </div>
        </div>
      </div>
    )
  }

  // ---- Checkout prep ----
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0)

  const handleBooking = () => {
    if (selectedSeats.length === 0) return
    const seatsData = selectedSeats.map((s) => ({
      id: s.id,
      row: s.id.split("-")[0],
      number: Number.parseInt(s.id.split("-")[1]),
      zone: s.zone,
      price: s.price,
    }))
    sessionStorage.setItem("selectedSeats", JSON.stringify(seatsData))
    window.location.href = "/checkout"
  }

  // ---- Render ----
  return (
    <div className="min-h-screen bg-dark-navy p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-surface rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 border border-electric-purple/30">

          {/* >>> Place this right after Ticket Categories on your page <<< */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-2xl border border-cyan-400/30 bg-black/50 shadow-[0_0_40px_rgba(0,255,255,0.08)] backdrop-blur-sm overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3 border-b border-cyan-400/20 bg-black/40">
                <h3 className="text-base sm:text-lg font-semibold tracking-wide text-white">
                  Actual Seating Area
                </h3>
                <span className="text-xs sm:text-sm text-cyan-300/80">
                  Reference photo of the venue section
                </span>
              </div>

              {/* Image */}
              <div className="relative w-full">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/seatings.jpeg"   
                    alt="Actual seating area"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="px-5 sm:px-6 py-4 text-xs sm:text-sm text-white/70">
                *Image for guidance; final seat mapping follows the interactive layout.
              </div>
            </div>
          </section>

          {/* Title */}
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 text-white uppercase"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            2ofUS Malaysia Venue
          </h1>
          <p className="text-center text-muted-grey mb-6 sm:mb-8 text-sm sm:text-base">Select your seats</p>

          {/* Stage */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="bg-gradient-to-b from-electric-purple to-neon-magenta text-white text-center py-3 sm:py-4 rounded-t-lg shadow-lg shadow-electric-purple/50">
              <div
                className="text-base sm:text-lg md:text-xl font-semibold tracking-wide uppercase"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                STAGE
              </div>
            </div>
            <div className="h-2 bg-gradient-to-b from-neon-magenta to-transparent"></div>
          </div>

          {/* Upper Section label */}
          <div className="mb-4">
            <div className="text-center">
              <span className="bg-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-semibold text-gray-700">
                UPPER SECTION
              </span>
            </div>
          </div>

          {/* Upper seat map */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-block min-w-full">
              {Object.entries(seatLayout).map(([row, seats]) => (
                <SeatRow key={row} row={row} seats={seats} />
              ))}
            </div>
          </div>

          <div className="my-8 border-t-2 border-gray-600"></div>

          {/* Lower Section label */}
          <div className="mb-4">
            <div className="text-center">
              <span className="bg-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-semibold text-gray-700">
                LOWER SECTION
              </span>
            </div>
          </div>

          {/* Lower seat map */}
          <div className="bg-[#e5e5e5] rounded-lg p-4 sm:p-6">
            <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="inline-block min-w-full">
                {Object.entries(lowerSeatLayout).map(([row, seats]) => (
                  <SeatRow key={row} row={row} seats={seats} />
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-transparent border-2 border-[#11D369] rounded flex-shrink-0 shadow-[0_0_10px_rgba(17,211,105,0.6)]"></div>
              <span className="text-xs sm:text-sm text-white flex items-center gap-1">
                <Accessibility className="w-3 h-3 sm:w-4 sm:h-4" />
                Wheelchair Access — MYR 50
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-transparent border-2 border-[#FDC70C] rounded flex-shrink-0 shadow-[0_0_10px_rgba(253,199,12,0.6)]"></div>
              <span className="text-xs sm:text-sm text-white">VIP (Gold) — MYR 120</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-transparent border-2 border-[#E83033] rounded flex-shrink-0 shadow-[0_0_10px_rgba(232,48,51,0.6)]"></div>
              <span className="text-xs sm:text-sm text-white">Standard (Rows A–D Center) — MYR 100</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-transparent border-2 border-[#E83033] rounded flex-shrink-0 shadow-[0_0_10px_rgba(232,48,51,0.6)]"></div>
              <span className="text-xs sm:text-sm text-white">Standard (Others) — MYR 80</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded flex-shrink-0 bg-black border-2 border-white/70 shadow-[0_0_10px_rgba(255,255,255,0.25)] ring-1 ring-white/20"></div>
              <span className="text-xs sm:text-sm text-white">Black Zone — MYR 70</span>
            </div>
          </div>

          {/* Booking Summary */}
          {selectedSeats.length > 0 && (
            <div className="mt-6 sm:mt-8 bg-surface border-2 border-electric-purple rounded-lg p-4 sm:p-6 shadow-lg shadow-electric-purple/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="w-full sm:w-auto">
                  <h3
                    className="text-base sm:text-lg font-semibold text-white mb-2 uppercase"
                    style={{ fontFamily: "var(--font-anton)" }}
                  >
                    Selected Seats
                  </h3>

                  <div className="text-sm sm:text-base text-white break-words">
                    {selectedSeats.map((s, i) => (
                      <span key={s.id}>
                        {s.id} <span className="text-muted-grey">(MYR {s.price})</span>
                        {i < selectedSeats.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-muted-grey mt-1">
                    Total: {selectedSeats.length} seat(s)
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-neon-cyan mt-2">
                    MYR {totalPrice.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full sm:w-auto bg-gradient-to-r from-electric-purple to-neon-magenta hover:from-neon-magenta hover:to-electric-purple text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all shadow-lg shadow-electric-purple/50 hover:shadow-neon-magenta/50 flex items-center justify-center gap-2 uppercase text-sm sm:text-base"
                  style={{ fontFamily: "var(--font-anton)" }}
                >
                  <CheckCircle2 size={18} className="sm:w-5 sm:h-5" />
                  Book Now
                </button>
              </div>
            </div>
          )}

          {/* Unselect All */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={clearSelection}
              disabled={selectedSeats.length === 0}
              className="px-5 py-2 rounded-lg font-semibold uppercase text-sm bg-white/10 text-white border border-white/30 hover:bg-white/15 transition disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              Unselect all seats
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VenueSeating
