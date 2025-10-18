"use server"

const API_URL = process.env.API_URL!;

export async function downloadTicket(orderNo: string) {
    try {
        const response = await fetch(`${API_URL}/tickets/${orderNo}/download`, {
            method: "GET",
            headers: {
                "Accept": "application/pdf",
            },
        })

        if (!response.ok) {
            throw new Error("Failed to download ticket")
        }

        const blob = await response.blob()

        const buffer = await blob.arrayBuffer()
        const base64 = Buffer.from(buffer).toString('base64')

        return {
            success: true,
            data: base64,
            filename: `Tickets-${orderNo}.pdf`,
            contentType: 'application/pdf'
        }
    } catch (error) {
        console.error("Download ticket error:", error)
        return {
            success: false,
            data: null,
            filename: null,
            contentType: null,
            error: error instanceof Error ? error.message : "Failed to download ticket"
        }
    }
}
