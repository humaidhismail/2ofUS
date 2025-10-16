export type SeatData = {
  id: string
  number: number
  status: "available" | "unavailable"
  category: "VIP" | "Wheelchair" | "Black" | "Standard" | "Standard_Mid"
  price: number
}

export type SeatRowLayout = {
  left: SeatData[]
  center: SeatData[]
  right: SeatData[]
  zone: string
}
