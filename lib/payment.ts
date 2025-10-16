"use server"

const API_URL = process.env.API_URL!;

export async function verifyPayment( transactionId: string )
{
    try {
        const response = await fetch(`${API_URL}/payments/verify`, {
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
