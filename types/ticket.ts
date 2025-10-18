import { ApiSeat } from "./seats"

export interface Ticket {
    id: string
    ticket_no: string
    order_id: string
    seat_id: string
    ticket_status: "pending" | "issued" | "rejected"
    seat?: ApiSeat  // Changed from Seat to ApiSeat
    created_at?: string
    updated_at?: string
}
