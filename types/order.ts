import { Ticket } from "./ticket"

export interface Order {
    id: string
    order_no: string
    customer_name: string
    customer_email: string
    customer_phone: string
    payment_status: "pending" | "paid" | "failed"
    total_price: number
    transaction_id?: string
    tickets?: Ticket[]
    created_at?: string
    updated_at?: string
}
