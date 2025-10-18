import { Category } from "./category"

export type SeatStatus = "available" | "unavailable" | "reserved" | "booked"
export type SeatCategoryType = "VIP" | "Wheelchair" | "Black" | "Standard" | "Standard_Mid"

export interface ApiSeat {
    id: string
    seat_no: string
    section: string
    seat_status: SeatStatus
    category_id: string
    category: Category
    created_at?: string
    updated_at?: string
}

export type Seat = {
    id: string
    seatRowNumber: string
    number: number
    status: SeatStatus
    category: SeatCategoryType
    price: number
}

export type SeatRowLayout = {
    left: Seat[]
    center: Seat[]
    right: Seat[]
    zone: string
}


export type SeatData = Seat | ApiSeat
