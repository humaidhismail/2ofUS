"use server"

import { Seat } from "@/types/seats";

const API_URL = process.env.API_URL!;

export async function verifyPayment( transactionId: string )
{
    try {
        const response = await fetch(`${API_URL}/api/payments/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ "transactionId": transactionId })
        })

        if (!response.ok) {
            return { success: false, message: "Verification Failed. Please Try Again Later" }
        }

        const data = await response.json()
        return { success: true, message: "Verified Successfully", data: data }
    } catch ( error ) {
        console.log(`An Error Occurred While Verifying the Payment: ${error}`)
        return { success: false, message: "An Error Occurred While Verifying the Payment" }
    }
}

export async function createOrder(formData: FormData, seats: Seat[]) {
    const seatIds = seats.map((seat) => seat.id)

    const payload = {
        customer_name: formData.get("customer_name"),
        customer_email: formData.get("customer_email"),
        customer_phone: formData.get("customer_phone"),
        seat_ids: seatIds,
      }

    try {
        const response = await fetch(`${API_URL}/api/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

       const data = await response.json()
       if (data.redirect_url) {
            return { success: true, url: data.redirect_url }
       }

       return { success: false, url: null }
    } catch ( error ) {
        console.log(`An Error Occurred While Creating the Order: ${error}`)
        return { success: false, url: null }
    }
}
